!function(i){function r(r){for(var t,e,o=r[0],n=r[1],u=r[2],a=0,p=[];a<o.length;a++)e=o[a],Object.prototype.hasOwnProperty.call(l,e)&&l[e]&&p.push(l[e][0]),l[e]=0;for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(i[t]=n[t]);for(s&&s(r);p.length;)p.shift()();return f.push.apply(f,u||[]),c()}function c(){for(var r,t=0;t<f.length;t++){for(var e=f[t],o=!0,n=1;n<e.length;n++){var u=e[n];0!==l[u]&&(o=!1)}o&&(f.splice(t--,1),r=a(a.s=e[0]))}return r}var e={},l={172:0},f=[];function a(r){if(e[r])return e[r].exports;var t=e[r]={i:r,l:!1,exports:{}};return i[r].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=i,a.c=e,a.d=function(r,t,e){a.o(r,t)||Object.defineProperty(r,t,{enumerable:!0,get:e})},a.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},a.t=function(t,r){if(1&r&&(t=a(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(a.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)a.d(e,o,function(r){return t[r]}.bind(null,o));return e},a.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return a.d(t,"a",t),t},a.o=function(r,t){return Object.prototype.hasOwnProperty.call(r,t)},a.p="/static-dist/";var t=window.webpackJsonp=window.webpackJsonp||[],o=t.push.bind(t);t.push=r,t=t.slice();for(var n=0;n<t.length;n++)r(t[n]);var s=o;f.push([639,0]),c()}({639:function(r,t,e){"use strict";e.r(t);var o=e(97),n=($("#avatar-crop-form"),$("#avatar-crop"),new o.a({element:"#logo-crop",group:"group",cropedWidth:200,cropedHeight:200}));n.afterCrop=function(r){var t=$("#upload-picture-btn").data("url");$.post(t,{images:r},function(){document.location.href=$("#upload-picture-btn").data("reloadUrl")})},$("#upload-picture-btn").click(function(r){r.stopPropagation(),n.crop({imgs:{logo:[200,200]}})})}});