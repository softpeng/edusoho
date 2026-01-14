// 短信验证设置页面JavaScript
$(document).ready(function() {
    // 页面加载时检查初始状态
    checkExportWarningState();
    
    // 表单提交处理
    $('#sms-secondary-verification-form').on('submit', function(e) {
        // 可以在这里添加表单验证逻辑
        console.log('SMS Secondary Verification form submitted');
    });
    
    // 用户信息导出短信验证开关变化处理
    $('input[type=radio][name=sms_secondary_verification_export]').on('change', function() {
        checkExportWarningState();
        console.log('Export SMS verification changed:', $(this).val() === '1' ? 'enabled' : 'disabled');
    });
    
    // 删除用户短信验证开关变化处理
    $('input[type=radio][name=sms_secondary_verification_delete_user]').on('change', function() {
        var isEnabled = $(this).val() === '1';
        console.log('Delete user SMS verification changed:', isEnabled ? 'enabled' : 'disabled');
    });
    
    // 检查导出警告显示状态的函数
    function checkExportWarningState() {
        var $warning = $('#export-warning');
        var isEnabled = $('input[type=radio][name=sms_secondary_verification_export]:checked').val() === '1';
        
        if (isEnabled) {
            // 开启状态，隐藏警告
            $warning.hide();
        } else {
            // 关闭状态，显示警告
            $warning.show();
        }
    }
});
