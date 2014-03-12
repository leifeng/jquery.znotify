/*
 提示框
 作者： zhangchl
 speed: fadeOut时间
 autoclose: 是否自动关闭
 position：有4个方向 top-left, top-right, bottom-left, or bottom-right
 cbFn: 关闭回调

 $.znotify({
 id:'1',
 msg:'提示信息'
 })
 */
;(function($) {
    $.znotify = function(options) { return $.fn.znotify(options); };
    $.fn.znotify = function(options) {
        var defaults = {
            speed: 'fast',
            autoclose: true,
            showtime: 1000,
            position: 'bottom-right',
            id: '',
            msg: '',
            cbFn: null
        };
        options = $.extend(defaults, options);
        if ($("#znotify").length===0) {
            $("body").append('<div id="znotify" class="'+options.position+'"></div>');
        }
        $("#znotify").append('<div class="znotify_queue" id="'+options.id+'" style="display:none"><img src="../images/close.png" class="znotify_close" alt="'+options.id+'"><div class="znotify_msg">'+options.msg+'</div></div>');
        $('#'+options.id).css('height', $('#'+options.id).height()).slideDown(options.speed);
        $('.znotify_queue').ready(function() {
            if (options.autoclose) {
                $('#' + options.id).delay(options.showtime).fadeOut(options.speed);
            }
        });
        $('.znotify_close').on('click', function() {
            var alt=$(this).attr('alt');
            $('#' + alt).fadeOut(options.speed);
            if(typeof options.cbFn=="function"){
                options.cbFn(alt);
            }
        });

    };
})(jQuery);