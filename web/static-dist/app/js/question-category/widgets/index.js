!function(n){var r={};function o(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=n,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/static-dist/",o(o.s=719)}({264:function(t,e,n){"use strict";n.d(e,"b",function(){return c}),n.d(e,"a",function(){return r});var c=function(t,e,n){var r=t.find(".js-remove-icon"),o=t.find(".js-remove-text");r.hasClass(e)?(r.removeClass(e).addClass(n),o&&o.text(Translator.trans("收起"))):(r.removeClass(n).addClass(e),o&&o.text(Translator.trans("展开")))},r=function(t,e,n,r){var o=1<arguments.length&&void 0!==e?e:".js-task-chapter",i=2<arguments.length&&void 0!==n?n:"es-icon-remove",a=3<arguments.length&&void 0!==r?r:"es-icon-anonymous-iconfont";$(0<arguments.length&&void 0!==t?t:"body").on("click",o,function(t){var e=$(t.currentTarget);e.nextUntil(o).animate({height:"toggle",opacity:"toggle"},"normal"),c(e,i,a)})}},719:function(t,e,n){"use strict";n.r(e);var r=n(264);$(".js-toggle-show").on("click",function(t){var e=$(t.target).closest(".js-sortable-item");e.nextUntil(".js-sortable-item").animate({height:"toggle",opacity:"toggle"},"normal"),Object(r.b)(e,"cd-icon-add","cd-icon-remove")})}});