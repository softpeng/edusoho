<?php

namespace Biz\Question\Adapter;

use Codeages\Biz\ItemBank\Item\Constant\ItemDifficulty;
use ExamParser\Constants\QuestionElement;
use ExamParser\Constants\QuestionErrors;
use Topxia\Service\Common\ServiceKernel;

class QuestionParseAdapter
{
    use ChoiceAdapterTrait;
    use TrueOrFalseAdapterTrait;
    use FillAdapterTrait;
    use EssayAdapterTrait;
    use MaterialAdapterTrait;

    public function adapt($parseResult)
    {
        $questions = json_decode($parseResult, true);
        $questions = $this->escapeCodeInQuestions($questions); // 转义Code
        return $this->adaptQuestions($questions);
    }

    private function adaptQuestions($questions)
    {
        $adaptedQuestions = [];
        $adaptMethods = $this->getAdaptMethods();
        foreach ($questions as $question) {
            if (empty($question['type'])) {
                continue;
            }
            $adaptMethod = $adaptMethods[$question['type']];
            $adaptedQuestions[] = $this->$adaptMethod($question);
        }

        return $adaptedQuestions;
    }

    private function adaptQuestion($question)
    {
        $adaptedQuestion = [
            'stem' => $this->adaptStem($question['title'] ?? ''),
            'difficulty' => $this->adaptDifficulty($question),
            'score' => $question['score'] ?? 2,
            'analysis' => $question['analysis'] ?? '',
        ];
        $errors = $this->adaptCommonErrors($question);
        if ($errors) {
            $adaptedQuestion['errors'] = $errors;
        }

        return $adaptedQuestion;
    }

    private function adaptDifficulty($question)
    {
        if (empty($question['difficulty'])) {
            return ItemDifficulty::NORMAL;
        }
        $difficulties = [
            '简单' => ItemDifficulty::SIMPLE,
            '一般' => ItemDifficulty::NORMAL,
            '困难' => ItemDifficulty::DIFFICULTY,
        ];

        return $difficulties[$question['difficulty']] ?? ItemDifficulty::NORMAL;
    }

    private function adaptStem($stem)
    {
        preg_match_all('/^<p>.*/', $stem, $match);
        if (empty($match[0])) {
            $stem = "<p>{$stem}</p>";
        }

        return $stem;
    }

    private function adaptCommonErrors($question)
    {
        if (empty($question['errors'])) {
            return [];
        }
        $errors = [];
        foreach ($question['errors'] as $error) {
            if ('TITLE_MISSING' == $error['code']) {
                $errors[QuestionElement::STEM] = $this->adaptError(QuestionElement::STEM, QuestionErrors::NO_STEM);
            }
        }

        return $errors;
    }

    private function adaptError($element, $code, $index = -1)
    {
        return [
            'element' => $element,
            'index' => $index,
            'code' => $code,
            'message' => QuestionErrors::getErrorMsg($code),
        ];
    }

    private function getAdaptMethods()
    {
        return [
            'choice' => 'adaptChoice',
            'multipleChoice' => 'adaptMultipleChoice',
            'uncertainChoice' => 'adaptUncertainChoice',
            'trueOrFalse' => 'adaptTrueOrFalse',
            'fill' => 'adaptFill',
            'essay' => 'adaptEssay',
            'material' => 'adaptMaterial',
        ];
    }

    /**
     *  1. 题目导入的时候默认要转义 HTML 代码，避免 XSS 注入漏洞；
     *  2. 对于本身题目中就需要 HTML 的客户，提供额外的标记包裹之后，不转义。
     *
     * 包裹标记为：```
     * 例子：```<script>alert(1)</script>```
     *
     *  see issue: https://redmine.codeages.work/issues/110729
     *
     * @param $text
     * @return mixed
     */

    private function escapeCode($text)
    {
        // 使用正则表达式查找被 ``` 包裹的部分，并将其分开
        $parts = preg_split('/(```.*?```)/s', $text, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);

        // 创建一个数组来存储处理后的部分
        $escapedParts = [];

        foreach ($parts as $part) {
            // 如果是被 ``` 包裹的部分，去掉前后的 ```
            if (preg_match('/^```(.*?)```$/s', $part, $matches)) {
                // 对被包裹的部分进行转义
                $escapedParts[] = htmlspecialchars($matches[1], ENT_QUOTES, 'UTF-8');
            } else {
                // 否则保留原样, 但要处理恶意代码
                $escapedParts[] = $this->purifyHtml($part, true);
            }
        }

        // 合并所有部分
        return implode('', $escapedParts);
    }

    private function purifyHtml($html, $trusted = false)
    {
        return ServiceKernel::instance()->getBiz()['html_helper']->purify($html, $trusted, ['allowedOuterLink' => true, 'allowedImgSrc' => true]);
    }


    protected function escapeCodeInQuestions($questions) {
        // 检查 questions 是否为数组
        if (!is_array($questions)) {
            return $questions; // 忽略并原样返回
        }

        foreach ($questions as &$question) {
            // 检查题目标题
            if (isset($question['title']) && is_string($question['title'])) {
                $question['title'] = $this->escapeCode($question['title']);
            }

            // 检查选项并逐个转义内容
            if (isset($question['body']['options']) && is_array($question['body']['options'])) {
                foreach ($question['body']['options'] as &$option) {
                    if (isset($option['content']) && is_string($option['content'])) {
                        $option['content'] = $this->escapeCode($option['content']);
                    }
                }
            }

            // 检查答案并进行转义
            if (isset($question['answer']['correct'])) {
                if (is_array($question['answer']['correct'])) {
                    foreach ($question['answer']['correct'] as &$correctAnswer) {
                        // 处理多选题答案
                        if (is_string($correctAnswer)) {
                            $correctAnswer = $this->escapeCode($correctAnswer);
                        } elseif (is_array($correctAnswer)) {
                            // 处理填空题的答案
                            foreach ($correctAnswer as &$fillAnswer) {
                                if (isset($fillAnswer['content']) && is_string($fillAnswer['content'])) {
                                    $fillAnswer['content'] = $this->escapeCode($fillAnswer['content']);
                                }
                            }
                        }
                    }
                }
            }

            // 检查题目解析
            if (isset($question['analysis']) && is_string($question['analysis'])) {
                $question['analysis'] = $this->escapeCode($question['analysis']);
            }

            // 处理材料题中的子题目
            if (isset($question['children']) && is_array($question['children'])) {
                $question['children'] = $this->escapeCodeInQuestions($question['children']);
            }
        }

        return $questions; // 返回修改后的 questions
    }
}
