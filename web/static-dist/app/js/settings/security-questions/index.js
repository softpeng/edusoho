!function(u){function e(e){for(var t,n,r=e[0],s=e[1],i=e[2],o=0,a=[];o<r.length;o++)n=r[o],Object.prototype.hasOwnProperty.call(l,n)&&l[n]&&a.push(l[n][0]),l[n]=0;for(t in s)Object.prototype.hasOwnProperty.call(s,t)&&(u[t]=s[t]);for(p&&p(e);a.length;)a.shift()();return f.push.apply(f,i||[]),c()}function c(){for(var e,t=0;t<f.length;t++){for(var n=f[t],r=!0,s=1;s<n.length;s++){var i=n[s];0!==l[i]&&(r=!1)}r&&(f.splice(t--,1),e=o(o.s=n[0]))}return e}var n={},l={313:0},f=[];function o(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return u[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=u,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/static-dist/";var t=window.webpackJsonp=window.webpackJsonp||[],r=t.push.bind(t);t.push=e,t=t.slice();for(var s=0;s<t.length;s++)e(t[s]);var p=r;f.push([868,0]),c()}({15:function(e,t){e.exports=jQuery},868:function(e,t,n){"use strict";n.r(t);var r=n(0),s=n.n(r),i=n(1),o=n.n(i),a=n(4);new(function(){function t(e){s()(this,t),this.element=e.element,this.saveBtn=e.saveBtn,this.$q1=$("[name=question-1]"),this.$q2=$("[name=question-2]"),this.$q3=$("[name=question-3]"),this.selectOptions=[],this.init()}return o()(t,[{key:"init",value:function(){this.validator(),this.initEvent()}},{key:"initEvent",value:function(){var n=this;$(this.element);this.changeOptions(),cd.select({el:".js-cd-select"}).on("beforeChange",function(e,t){if(n.selectOptions.includes(e))throw Object(a.a)("danger",Translator.trans("user.settings.security.security_questions.type_duplicate_hint")),new Error(Translator.trans("user.settings.security.security_questions.type_duplicate_hint"))}).on("change",function(e,t){n.changeOptions()})}},{key:"changeOptions",value:function(){var t=this;this.selectOptions=[],[this.$q1,this.$q2,this.$q3].forEach(function(e){t.selectOptions.push(e.val())})}},{key:"validator",value:function(){var e=this.saveBtn;$(this.element).validate({currentDom:e,ajax:!0,rules:{"answer-1":{required:!0,maxlength:20},"answer-2":{required:!0,maxlength:20},"answer-3":{required:!0,maxlength:20},userLoginPassword:"required"},submitSuccess:function(e){Object(a.a)("success",Translator.trans(e.message)),$(".modal").modal("hide"),window.location.reload()},submitError:function(e){Object(a.a)("danger",Translator.trans(e.responseJSON.message))}})}}]),t}())({element:"#settings-security-questions-form",saveBtn:"#password-save-btn"})}});