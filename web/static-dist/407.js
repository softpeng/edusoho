(window.webpackJsonp=window.webpackJsonp||[]).push([[407],{30:function(t,e,n){"use strict";function o(t,e,n,o,i,r,s,a){var c,d="function"==typeof t?t.options:t;if(e&&(d.render=e,d.staticRenderFns=n,d._compiled=!0),o&&(d.functional=!0),r&&(d._scopeId="data-v-"+r),s?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},d._ssrRegister=c):i&&(c=a?function(){i.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:i),c)if(d.functional){d._injectStyles=c;var l=d.render;d.render=function(t,e){return c.call(e),l(t,e)}}else{var u=d.beforeCreate;d.beforeCreate=u?[].concat(u,c):[c]}return{exports:t,options:d}}n.d(e,"a",(function(){return o}))},934:function(t,e,n){"use strict";n.r(e);var o={name:"DataPreview",methods:{getIframeStatus:function(){var t,e,n=document.getElementById("iframe"),o=n.contentWindow;"complete"===o.document.readyState?(t=o.document.documentElement.scrollWidth,e=o.document.documentElement.scrollHeight,n.width=t,n.height=e):setTimeout(this.getIframeStatus,10)}},created:function(){setTimeout(this.getIframeStatus,10)}},i=n(30),r=Object(i.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"student-manage"},[e("iframe",{staticStyle:{position:"inherit",left:"0",top:"0","min-height":"600px",height:"100%",width:"100%",border:"0px"},attrs:{id:"iframe",src:"/admin/v2/multi_class/overview/"+this.$route.params.id,frameborder:"0",allowfullscreen:"true",scrolling:"yes",allow:"screen-wake-lock"}})])}),[],!1,null,null,null);e.default=r.exports}}]);