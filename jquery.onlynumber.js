/**
 * jQuery-onlyNumber-Plugin
 * https://github.com/mlinquan/jQuery-onlyNumber-Plugin
 *
 * @version
 * 0.0.1 (April 29, 2015)
 *
 * @copyright
 * Copyright (C) 2015 LinQuan.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
 (function($){
    $.fn.onlynumber = function(options) {
        if(!options) {
            options = {};
        }
        var opt = $.extend({
            when: "change",
            decimal: 0,
            min: 0,
            max: Infinity
        }, options);
        return this.each(function() {
            var obj = this;
            var $that = $(obj);
            $that.on(opt.when, function() {
                var r;
                var val = $that.val().toString();
                if($that.data("predata") && val == $that.data("predata")) {
                    return;
                }
                var h = "";
                if (val.charAt(0) == "-") {
                    h = "-";
                    val = val.slice(1);
                }
                val = val.replace(/[^0-9\.]/g, '');
                vals = val.split('.');
                r = vals[0].replace(/^0+/, '0');
                if(Number(r) > 0) {
                    r = Number(r);
                }
                if(val.indexOf('.') != -1) {
                    r += '.' + vals[1];
                    if(vals[1].length && vals[1].length > opt.decimal) {
                        r = (parseInt(r * Math.pow(10, opt.decimal)) / Math.pow(10, opt.decimal)).toFixed(opt.decimal);
                    }
                }
                r = h + r;
                if(Number(r) < opt.min) {
                    r = opt.min;
                }
                if(Number(r) > opt.max) {
                    r = opt.max;
                }
                $that.val(r);
                $that.data("predata", r);
                if(opt.callback && $.isFunction(opt.callback)) {
                    opt.callback(obj, r);
                }
            });
        });
    };
})(jQuery);