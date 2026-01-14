<?php

namespace Codeages\Biz\ItemBank\Item\Wrapper;

use Biz\File\Service\UploadFileService;
use Codeages\Biz\Framework\Context\Biz;
use Codeages\Biz\Framework\Util\ArrayToolkit;
use Codeages\Biz\ItemBank\Item\Service\AttachmentService;

class AttachmentWrapper
{
    protected $biz;

    public function __construct(Biz $biz)
    {
        $this->biz = $biz;
    }

    public function wrap($item)
    {
        if (empty($item)) {
            return [];
        }

        $item['attachments'] = $this->getAttachmentService()->findAttachmentsByTargetIdAndTargetType($item['id'], 'item');
        $item['attachments'] = ArrayToolkit::sort($item['attachments'], 'seq', SORT_ASC);
        if (empty($item['questions'])) {
            return $item;
        }

        $attachments = $this->getAttachmentService()->findAttachmentsByTargetIdsAndTargetType(
            ArrayToolkit::column($item['questions'], 'id'),
            'question'
        );
        $attachments = ArrayToolkit::sort($attachments, 'seq', SORT_ASC);
        $globalIds = ArrayToolkit::column($attachments, 'global_id');
        $attachments = ArrayToolkit::group($attachments, 'target_id');
        $files = $globalIds ? $this->getUploadFileService()->searchCloudFilesFromLocal([
            'globalIds' => $globalIds,
            'questionBank' => 1,
            'resType' => 'attachment',
        ], [], 0, PHP_INT_MAX) : [];
        $files = ArrayToolkit::index($files, 'globalId');
        foreach ($item['questions'] as &$question) {
            $question['attachments'] = empty($attachments[$question['id']]) ? [] : $attachments[$question['id']];
            foreach ($question['attachments'] as &$attachment) {
                $attachment['length'] = $files[$attachment['global_id']]['length'] ?? 0;
                if ('video' == $attachment['file_type']) {
                    $attachment['thumbnail'] = $files[$attachment['global_id']]['thumbnail'] ?? null;
                }
            }
        }

        return $item;
    }

    public function wrapItems($items)
    {
        if (empty($items)) {
            return [];
        }

        // 获取所有 item 的附件
        $itemIds = ArrayToolkit::column($items, 'id');
        $attachments = $this->getAttachmentService()->findAttachmentsByTargetIdsAndTargetType($itemIds, 'item');
        $attachments = ArrayToolkit::sort($attachments, 'seq', SORT_ASC);
        $attachments = ArrayToolkit::group($attachments, 'target_id');

        // 获取所有问题的 ID
        $questionIds = [];
        foreach ($items as $item) {
            if (!empty($item['questions'])) {
                $questionIds = array_merge($questionIds, ArrayToolkit::column($item['questions'], 'id'));
            }
        }

        // 获取所有问题的附件
        $questionAttachments = $this->getAttachmentService()->findAttachmentsByTargetIdsAndTargetType($questionIds, 'question');
        $questionAttachments = ArrayToolkit::sort($questionAttachments, 'seq', SORT_ASC);
        $globalIds = ArrayToolkit::column($questionAttachments, 'global_id');
        $questionAttachments = ArrayToolkit::group($questionAttachments, 'target_id');

        // 一次性获取所有云文件
        $files = $globalIds ? $this->getUploadFileService()->searchCloudFilesFromLocal([
            'globalIds' => $globalIds,
            'questionBank' => 1,
            'resType' => 'attachment',
        ], [], 0, PHP_INT_MAX) : [];
        $files = ArrayToolkit::index($files, 'globalId');

        // 处理每个 item
        foreach ($items as &$item) {
            $item['attachments'] = empty($attachments[$item['id']]) ? [] : $attachments[$item['id']];

            if (empty($item['questions'])) {
                continue;
            }

            foreach ($item['questions'] as &$question) {
                $question['attachments'] = empty($questionAttachments[$question['id']]) ? [] : $questionAttachments[$question['id']];
                foreach ($question['attachments'] as &$attachment) {
                    $attachment['length'] = $files[$attachment['global_id']]['length'] ?? 0;
                    if ('video' == $attachment['file_type']) {
                        $attachment['thumbnail'] = $files[$attachment['global_id']]['thumbnail'] ?? null;
                    }
                }
            }
        }

        return $items;
    }

    /**
     * @return AttachmentService
     */
    protected function getAttachmentService()
    {
        return $this->biz->service('ItemBank:Item:AttachmentService');
    }

    /**
     * @return UploadFileService
     */
    protected function getUploadFileService()
    {
        return $this->biz->service('File:UploadFileService');
    }
}
