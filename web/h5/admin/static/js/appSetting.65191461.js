(window.webpackJsonp=window.webpackJsonp||[]).push([["appSetting"],{5878:function(t,e,i){"use strict";i.r(e),i("8e6e"),i("8615"),i("456d"),i("ac6a");var n=i("bd86"),s=(i("7f7f"),i("ded5")),o=i("3d97"),a=i("5f16"),r=i("28fb"),u=i("515e"),c=i("92a2"),l=i("5b91"),d=i("a89d"),p=i("5e2f"),m=i("f953"),f=i("310e"),h=i.n(f),g=i("2f62");function v(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function y(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?v(Object(i),!0).forEach((function(e){Object(n.a)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):v(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var b={components:{moduleTemplate:p.a,draggable:h.a,findFooter:m.a},mixins:[l.a],data:function(){return{title:"EduSoho 微网校",modules:[],saveFlag:0,startValidate:!1,incomplete:!0,validateResults:[],currentModuleIndex:"0",baseModules:a.b,marketingModules:a.e,appBaseModules:a.a,typeCount:{},pathName:this.$route.name,currentMPVersion:"0.0.0",couponSwitch:0,moduleLength:0}},computed:y(y({},Object(g.c)(["isLoading","vipLevels","vipSettings","vipSetupStatus","vipPlugin","settings"])),{},{stopDraggleClasses:function(){return".module-frame__setting, .find-footer,.search__container, .el-dialog__header, .el-dialog__footer"},portal:function(){return c.a[this.pathName]},supportActivityVersion:function(){return!0},supportClassroomVersion:function(){return!0},supportCouponVersion:function(){return!0},supportVipVersion:function(){return this.vipSetupStatus},headImg:function(){switch(this.portal){case"miniprogram":return"static/images/miniprogram_head.jpg";case"apps":return"static/images/app_head.jpg";default:return"static/images/find_head_url.jpg"}},headTitle:function(){switch(this.portal){case"miniprogram":return"小程序";case"apps":return this.settings.name;default:return"微网校"}}}),created:function(){var t=this;"miniprogram"===this.portal&&s.a.getMPVersion().then((function(e){t.currentMPVersion=e.current_version.version})).catch((function(e){t.currentMPVersion="0.0.0",t.$message({message:e.message,type:"error"})})),this.load(),this.getCourseCategories(),this.getClassCategories(),this.getItemBankCategories(),this.getCouponSwitch()},methods:y(y({},Object(g.b)(["getCourseCategories","getClassCategories","getItemBankCategories","deleteDraft","saveDraft","getDraft"])),{},{getCouponSwitch:function(){var t=this;s.a.getCouponSetting().then((function(e){t.couponSwitch=parseInt(e.enabled,10)}))},supportVersion:function(t){return!Object(u.a)(t,this.currentMPVersion)},moduleCountInit:function(){for(var t=new r.a,e=0,i=this.modules.length;e<i;e++)t.addByType(this.modules[e].type);this.typeCount=t},isActive:function(t){return t===this.currentModuleIndex},activeModule:function(t){this.currentModuleIndex=t},updateModule:function(t,e){this.validateResults[e]=t.incomplete},removeModule:function(t,e){this.typeCount.removeByType(t.type),this.currentModuleIndex=Math.max(this.currentModuleIndex-1,0),this.modules.splice(e,1)},addModule:function(t,e){switch(t.default.type){case"vip":if(!this.vipSetupStatus)return;if(Object(u.a)("1.7.26",this.vipPlugin.version))return void this.$confirm("请升级会员插件","提示",{confirmButtonText:"去升级",cancelButtonText:"取消"}).then((function(){window.open(window.location.origin+"/admin/app/upgrades")})).catch((function(){}));if(!(this.vipSettings&&this.vipSettings.enabled&&this.vipSettings.h5Enabled))return void this.$confirm("会员功能未开启","提示",{confirmButtonText:"去开启",cancelButtonText:"取消"}).then((function(){window.open(window.location.origin+"/admin/v2/setting/vip")})).catch((function(){}));if(!this.vipLevels||!this.vipLevels.length)return void this.$confirm("请先设置会员等级","提示",{confirmButtonText:"去设置",cancelButtonText:"取消"}).then((function(){window.open(window.location.origin+"/admin/setting/vip/level")})).catch((function(){}));break;case"coupon":if(!this.couponSwitch)return void this.$confirm("优惠券功能未开通","提示",{confirmButtonText:"去开通",cancelButtonText:"取消"}).then((function(){window.open(window.location.origin+"/admin/setting/coupon")})).catch((function(){}))}if(this.typeCount.getCounterByType(t.default.type)>=5)this.$message({message:"同一类型组件最多添加 5 个",type:"warning"});else{this.moduleLength=this.moduleLength+1,this.typeCount.addByType(t.default.type);var i=JSON.stringify(t.default),n=JSON.parse(i);n.oldIndex=this.moduleLength,this.modules.push(n),this.currentModuleIndex=Math.max(this.modules.length-1,0)}},load:function(){var t=this,e=1==this.$route.query.draft?"draft":"published";this.getDraft({portal:this.portal,type:"discovery",mode:e}).then((function(e){Object.keys(e).forEach((function(i,n){e[i]=t.formateH5Display(e[i].type,e[i]),e[i].oldIndex=n})),t.moduleLength=Object.keys(e).length-1,t.modules=Object.values(e),t.moduleCountInit()})).catch((function(e){t.moduleCountInit(),t.$message({message:e.message,type:"error"})}))},formateH5Display:function(t,e){return"course_list"!==t&&"classroom_list"!==t||e.data.displayStyle||("app"===this.portal?e.data.displayStyle="distichous":"h5"===this.portal&&(e.data.displayStyle="row")),e},reset:function(){var t=this;this.deleteDraft({portal:this.portal,type:"discovery",mode:"draft"}).then((function(e){t.$message({message:"重置成功",type:"success"}),t.load()})).catch((function(e){t.$message({message:e.message||"重置失败",type:"error"})}))},save:function(t){var e=this,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.startValidate=!0,this.saveFlag++,setTimeout((function(){var n,s;n=e.modules,s="published"===t,e.startValidate=!1,e.validate(),i&&(n=Object(d.a)(e.modules,"moduleType")),e.incomplete||e.saveDraft({data:n,mode:t,portal:e.portal,type:"discovery"}).then((function(){e.saveFlag=0,s?e.$message({message:"发布成功",type:"success"}):(e.$store.commit(o.g,n),e.toPreview(s))})).catch((function(t){e.$message({message:t.message||"发布失败，请重新尝试",type:"error"})}))}),500)},toPreview:function(t){this.$router.push({name:"preview",query:{times:10,preview:t?0:1,duration:300,from:this.pathName}})},validate:function(){for(var t=0;t<this.modules.length;t++)if(this.validateResults[t])return void(this.incomplete=this.validateResults[t]);this.incomplete=!1}})},C=i("a6c2"),_=Object(C.a)(b,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",["miniprogram"===t.portal?i("div",{staticClass:"help-block"}):t._e(),i("div",{staticClass:"setting-page",class:{"setting-page-miniprogram":"miniprogram"===t.portal&&t.supportActivityVersion}},[i("img",{staticClass:"find-head-img",attrs:{src:t.headImg,alt:""}}),i("div",{staticClass:"find-navbar",class:"find-navbar-"+t.portal},["apps"===t.portal?i("i",{staticClass:"iconfont icon-search"}):t._e(),i("i",{staticClass:"h5-icon h5-icon-houtui"}),t._v(t._s(t.headTitle)+"\n    ")]),i("div",{staticClass:"find-body"},[i("draggable",{attrs:{options:{filter:t.stopDraggleClasses,preventOnFilter:!1}},model:{value:t.modules,callback:function(e){t.modules=e},expression:"modules"}},t._l(t.modules,(function(e,n){return i("module-template",{key:n,attrs:{saveFlag:t.saveFlag,startValidate:t.startValidate,index:n,module:e,active:t.isActive(n),moduleKey:e.type+"-"+n},on:{activeModule:t.activeModule,updateModule:function(e){return t.updateModule(e,n)},removeModule:function(e){return t.removeModule(e,n)}}})})),1)],1),"apps"!==t.portal?i("div",{staticClass:"multi-find-section find-section clearfix"},[i("div",{staticClass:"section-title"},[t._v("基础组件")]),i("div",{staticClass:"section-button-group clearfix"},t._l(t.baseModules,(function(e,n){return i("el-button",{key:"base-"+n,staticClass:"find-section-item",attrs:{type:"",size:"medium"},on:{click:function(i){return t.addModule(e,n)}}},[t._v("\n          "+t._s(e.name)+"\n        ")])})),1),[i("div",{staticClass:"section-title"},[t._v("\n          营销组件\n          "),i("a",{staticClass:"color-primary pull-right text-12",attrs:{href:t.createMarketingUrl,target:"_blank"}},[t._v("创建活动>>")])]),i("div",{staticClass:"section-button-group clearfix"},t._l(t.marketingModules,(function(e,n){return i("el-button",{key:"marketing-"+n,staticClass:"find-section-item",attrs:{type:"",size:"medium"},on:{click:function(i){return t.addModule(e,n)}}},[t._v("\n            "+t._s(e.name)+"\n          ")])})),1)]],2):t._e(),"apps"===t.portal?i("div",{staticClass:"multi-find-section find-section clearfix"},[i("div",{staticClass:"section-title"},[t._v("基础组件")]),i("div",{staticClass:"section-button-group clearfix"},t._l(t.appBaseModules,(function(e,n){return i("el-button",{key:"app-base-"+n,staticClass:"find-section-item",attrs:{type:"",size:"medium"},on:{click:function(i){return t.addModule(e,n)}}},[t._v("\n          "+t._s(e.name)+"\n        ")])})),1)]):t._e(),i("find-footer",{attrs:{portal:t.portal}})],1),i("div",{staticClass:"setting-button-group"},[i("el-button",{staticClass:"setting-button-group__button text-14 btn-border-primary",attrs:{size:"mini",disabled:t.isLoading},on:{click:t.reset}},[t._v("重 置")]),i("el-button",{staticClass:"setting-button-group__button text-14 btn-border-primary",attrs:{size:"mini",disabled:t.isLoading},on:{click:function(e){return t.save("draft")}}},[t._v("预 览")]),i("el-button",{staticClass:"setting-button-group__button text-14",attrs:{type:"primary",size:"mini",disabled:t.isLoading},on:{click:function(e){return t.save("published")}}},[t._v("发 布")])],1)])}),[],!1,null,null,null);e.default=_.exports}}]);