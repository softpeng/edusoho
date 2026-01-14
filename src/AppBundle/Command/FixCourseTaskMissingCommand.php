<?php

namespace AppBundle\Command;

use AppBundle\Common\ArrayToolkit;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class FixCourseTaskMissingCommand extends BaseCommand
{
    /**
     * @var Logger
     */
    private $logger;

    protected function configure()
    {
        $this->setName('fix:course-task-missing')
            ->addArgument('id', InputArgument::REQUIRED, '课程ID(计划ID, courseId)')
            ->addOption('real', null, InputOption::VALUE_NONE, '是否进行真正的数据修复')
            ->setDescription('修复课程计划任务无法排序的问题')
            ->setHelp(<<<'HELP'
修复课程计划的任务无法排序的问题。出现此问题的原因：存在 course_chapter 记录，但不存在 course_task 记录的问题。

处理方式：直接删除 有问题的 course_chapter 记录。

命令的使用：
* 修复某一个课程：app/console fix:course-task-missing 课程ID
* 批量修复所有课程：app/console fix:course-task-missing all

注意事项：请仔细核对日志的输出，核对完毕后，加上 --real 参数执行命令，此命令会进行真正的数据修复。 

HELP
            );
    }

    protected function initialize(InputInterface $input, OutputInterface $output)
    {
        $biz = $this->getBiz();
        $logger = new Logger('>');
        $logger->pushHandler(new StreamHandler('php://stdout', Logger::DEBUG));
        $logger->pushHandler(new StreamHandler("{$biz['log_directory']}/course-task-missing.log", Logger::DEBUG));
        $this->logger = $logger;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $logger = $this->logger;
        $courseId = $input->getArgument('id');
        $real = $input->getOption('real');
        $db = $this->getBiz()['db'];

        if ($courseId == 'all') {
            $courses = $db->fetchAll("SELECT * FROM course_v8 ORDER BY id ASC");
            $courseIds = ArrayToolkit::column($courses, 'id');
        } else {
            $courseIds = [$courseId];
        }

        $totalCourseCount = count($courseIds);

        $logger->info("共查询到 $totalCourseCount 个课程。");

        foreach ($courseIds as $courseId) {
            $course = $db->fetchAssoc("SELECT * FROM course_v8 WHERE id = {$courseId}");
            if (!$course) {
                $logger->error("ERROR: 课程计划不存在，ID: {$courseId}");
                continue ;
            }

            $courseSet = $db->fetchAssoc("SELECT * FROM course_set_v8 WHERE id = {$course['courseSetId']}");
            if (!$courseSet) {
                $logger->error("ERROR: 课程不存在，ID: {$course['courseSetId']}");
                continue ;
            }

            $logger->info("《${courseSet['title']}》 -> 「{$course['title']}」 /course_set/${course['courseSetId']}/manage/course/${course['id']}/tasks");

            $chapters = $db->fetchAll("SELECT * FROM course_chapter WHERE courseId = {$courseId} AND type = 'lesson' ORDER BY seq ASC");
            foreach ($chapters as $chapter) {
                $tasks = $db->fetchAll("SELECT * FROM course_task WHERE categoryId = {$chapter['id']}");
                $taskCount = count($tasks);

                $error = '';
                if ($taskCount == 0) {
                    $error = '异常: 无Task';
                }

                if (!$error) {
                    continue ;
                }

                $logger->error("========== " . json_encode($chapter, JSON_UNESCAPED_UNICODE) . ' ' . $error);

                if ($real) {
                    $deleted = $db->delete('course_chapter', array('id' => $chapter['id']));
                    $logger->info("@@ 删除 course_chapter: id:{$chapter['id']}\t, deleted: {$deleted}");
                }
            }

        }
    }
}