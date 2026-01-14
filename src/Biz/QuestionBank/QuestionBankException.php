<?php

namespace Biz\QuestionBank;

use AppBundle\Common\Exception\AbstractException;

class QuestionBankException extends AbstractException
{
    const EXCEPTION_MODULE = 66;

    const FORBIDDEN_DELETE_CATEGORY = 4036601;

    const NOT_FOUND_BANK = 4046602;

    const FORBIDDEN_ACCESS_BANK = 4036603;

    const UNKNOWN_ERROR = 5006604; // 未知错误

    const IMAGE_DOWNLOAD_ERROR = 5006605; // 图片下载错误


    public $messages = array(
        4036601 => 'exception.question_bank.forbidden_delete_category',
        4046602 => 'exception.question_bank.not_found_bank',
        4036603 => 'exception.question_bank.forbidden_access_bank',
        5006604 => 'exception.question_bank.unknown_error',
        5006605 => 'exception.question_bank.image_download_error'
    );
}
