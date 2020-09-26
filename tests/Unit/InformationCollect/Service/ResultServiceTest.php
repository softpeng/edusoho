<?php

namespace Tests\Unit\InformationCollect\Service;

use Biz\BaseTestCase;
use Biz\InformationCollect\Service\ResultService;

class ResultServiceTest extends BaseTestCase
{
    public function testSubmitForm()
    {
        $event = $this->getInformationCollectEventDao()->create([
            'id' => 1,
            'title' => '测试表单',
            'action' => 'buy_after',
            'formTitle' => '测试表单',
            'status' => 'open',
            'allowSkip' => 1,
            'creator' => 2,
        ]);

        $this->getInformationCollectItemDao()->batchCreate([
            [
                'eventId' => 1,
                'code' => 'name',
                'labelName' => '姓名',
                'seq' => 1,
                'required' => 1,
            ],
            [
                'eventId' => 1,
                'code' => 'gender',
                'labelName' => '性别',
                'seq' => 2,
                'required' => 1,
            ],
        ]);

        $this->mockBiz(
            'User:UserService',
            [
                [
                    'functionName' => 'getUser',
                    'returnValue' => [
                        'id' => 1,
                    ],
                ],
            ]
        );

        $result = $this->getInformationCollectResultService()->submitForm(1, 1, ['name' => '张三', 'gender' => '男']);

        $this->assertEquals(count($result['items']), 2);
        $this->assertEquals($result['items'][0]['value'], '张三');
        $this->assertEquals($result['items'][1]['value'], '男');
    }

    /**
     * @expectedException \Biz\InformationCollect\InformationCollectionException
     * @expectedExceptionCode 4047801
     */
    public function testSubmitForm_whenEventNotFound_thenThrowException()
    {
        $this->getInformationCollectResultService()->submitForm(1, 1, ['name' => '张三', 'gender' => '男']);
    }

    /**
     * @expectedException \Biz\InformationCollect\InformationCollectionException
     * @expectedExceptionCode 5007802
     */
    public function testSubmitForm_whenEventClosed_thenThrowException()
    {
        $this->getInformationCollectEventDao()->create([
            'id' => 1,
            'title' => '测试表单',
            'action' => 'buy_after',
            'formTitle' => '测试表单',
            'status' => 'close',
            'allowSkip' => 1,
            'creator' => 2,
        ]);
        $this->getInformationCollectResultService()->submitForm(1, 1, ['name' => '张三', 'gender' => '男']);
    }

    /**
     * @expectedException \Biz\User\UserException
     * @expectedExceptionCode 4040104
     */
    public function testSubmitForm_whenUserNotFound_thenThrowException()
    {
        $this->getInformationCollectEventDao()->create([
            'id' => 1,
            'title' => '测试表单',
            'action' => 'buy_after',
            'formTitle' => '测试表单',
            'status' => 'open',
            'allowSkip' => 1,
            'creator' => 2,
        ]);

        $this->getInformationCollectResultService()->submitForm(100, 1, ['name' => '张三', 'gender' => '男']);
    }

    /**
     * @expectedException \Biz\Common\CommonException
     * @expectedExceptionCode 5000305
     */
    public function testSubmitForm_whenFormMiss_thenThrowException()
    {
        $this->getInformationCollectEventDao()->create([
            'id' => 1,
            'title' => '测试表单',
            'action' => 'buy_after',
            'formTitle' => '测试表单',
            'status' => 'open',
            'allowSkip' => 1,
            'creator' => 2,
        ]);

        $this->getInformationCollectItemDao()->batchCreate([
            [
                'eventId' => 1,
                'code' => 'name',
                'labelName' => '姓名',
                'seq' => 1,
                'required' => 1,
            ],
            [
                'eventId' => 1,
                'code' => 'gender',
                'labelName' => '性别',
                'seq' => 2,
                'required' => 1,
            ],
        ]);

        $this->mockBiz(
            'User:UserService',
            [
                [
                    'functionName' => 'getUser',
                    'returnValue' => [
                        'id' => 1,
                    ],
                ],
            ]
        );

        $this->getInformationCollectResultService()->submitForm(1, 1, ['name' => '张三', 'gender' => '']);
    }

    public function testIsSubmited()
    {
        $result = $this->getInformationCollectResultService()->isSubmited(1, 1);
        $this->assertEquals(false, $result);

        $this->getInformationCollectResultDao()->create([
            'formTitle' => '测试表单',
            'userId' => 1,
            'eventId' => 1,
        ]);

        $result = $this->getInformationCollectResultService()->isSubmited(1, 1);
        $this->assertEquals(true, $result);
    }

    public function testGetResultByUserIdAndEventId()
    {
        $this->getInformationCollectResultDao()->create([
            'id' => 1,
            'formTitle' => '测试表单',
            'userId' => 1,
            'eventId' => 1,
        ]);

        $result = $this->getInformationCollectResultService()->getResultByUserIdAndEventId(1, 1);
        $this->assertEquals(1, $result['id']);
    }

    public function testFindResultItemsByResultId()
    {
        $this->getInformationCollectResultItemDao()->batchCreate([
            ['id' => 1, 'eventId' => 1, 'resultId' => 1, 'code' => 'name', 'labelName' => '姓名', 'value' => '车凌锋'],
            ['id' => 2, 'eventId' => 1, 'resultId' => 1, 'code' => 'gender', 'labelName' => '性别', 'value' => '男'],
            ['id' => 3, 'eventId' => 1, 'resultId' => 2, 'code' => 'gender', 'labelName' => '性别', 'value' => '男'],
        ]);

        $resultItems = $this->getInformationCollectResultService()->findResultItemsByResultId(1);

        $this->assertEquals(2, count($resultItems));
    }

    public function testSearchCollectedData()
    {
        $this->mockResults();

        $result = $this->getInformationCollectResultService()->searchCollectedData(['eventId' => 1], [], 0, PHP_INT_MAX);

        $this->assertEquals(2, count($result));
    }

    protected function mockResults()
    {
        $results = $this->getInformationCollectResultDao()->batchCreate(
            [
                [
                    'formTitle' => 'test1',
                    'userId' => 2,
                    'eventId' => 1,
                    'createdTime' => time(),
                ],
                [
                    'formTitle' => 'test1',
                    'userId' => 3,
                    'eventId' => 1,
                    'createdTime' => time(),
                ],
                [
                    'formTitle' => 'test2',
                    'userId' => 2,
                    'eventId' => 2,
                    'createdTime' => time(),
                ],
            ]
        );

        return $results;
    }

    /**
     * @return ResultService
     */
    protected function getInformationCollectResultService()
    {
        return $this->createService('InformationCollect:ResultService');
    }

    protected function getInformationCollectEventDao()
    {
        return $this->createDao('InformationCollect:EventDao');
    }

    protected function getInformationCollectItemDao()
    {
        return $this->createDao('InformationCollect:ItemDao');
    }

    protected function getInformationCollectResultDao()
    {
        return $this->createDao('InformationCollect:ResultDao');
    }

    protected function getInformationCollectResultItemDao()
    {
        return $this->createDao('InformationCollect:ResultItemDao');
    }
}
