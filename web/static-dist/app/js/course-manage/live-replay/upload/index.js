!function(u){function e(e){for(var r,t,n=e[0],o=e[1],a=e[2],i=0,l=[];i<n.length;i++)t=n[i],Object.prototype.hasOwnProperty.call(f,t)&&f[t]&&l.push(f[t][0]),f[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(u[r]=o[r]);for(p&&p(e);l.length;)l.shift()();return s.push.apply(s,a||[]),c()}function c(){for(var e,r=0;r<s.length;r++){for(var t=s[r],n=!0,o=1;o<t.length;o++){var a=t[o];0!==f[a]&&(n=!1)}n&&(s.splice(r--,1),e=i(i.s=t[0]))}return e}var t={},f={129:0},s=[];function i(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return u[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=u,i.c=t,i.d=function(e,r,t){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(r,e){if(1&e&&(r=i(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)i.d(t,n,function(e){return r[e]}.bind(null,n));return t},i.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="/static-dist/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var p=n;s.push([602,0]),c()}({17:function(e,r){e.exports=jQuery},602:function(e,r,t){"use strict";t.r(r);var n=t(63),o=new n.a,a=$("#material-file-chooser").find("[name=fileId]");o.on("select",function(e){a.val(e.id),n.a.closeUI(),$(".jq-validate-error").remove()}),$(".js-choose-trigger").click(function(e){n.a.openUI(),a.val("")}),$("#replay-material-form").validate({rules:{fileId:{required:!0}},messages:{fileId:Translator.trans("course.manage.live_replay_upload_error_hint")}})}});