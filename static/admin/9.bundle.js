(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{282:function(e,t,n){"use strict";n.r(t);var a=n(390),r=n(318);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);n(378);var i=n(91),s=Object(i.a)(r.default,a.a,a.b,!1,null,"464cca04",null);s.options.__file="src/page/service/depoly-manager.vue",t.default=s.exports},318:function(e,t,n){"use strict";n.r(t);var a=n(319),r=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t.default=r.a},319:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(n(89)),r=s(n(90)),o=s(n(377)),i=n(92);function s(e){return e&&e.__esModule?e:{default:e}}t.default={mounted:function(){var e=this;return(0,r.default)(a.default.mark(function t(){return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getDepolyConfig();case 2:case"end":return t.stop()}},t,e)}))()},data:function(){return{loading:!1,config:[],showDialog:!1,loadingCreate:!1,configForm:{name:"",type:"",path:"",dependencies:""}}},methods:{getDepolyConfig:function(){var e=(0,r.default)(a.default.mark(function e(){var t,n,r,i;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.loading=!0,e.next=3,o.default.getDepolyConfig();case 3:for(r in t=e.sent,n=[],t.projects)t.projects.hasOwnProperty(r)&&(i=t.projects[r],n.push({name:r,type:i.type,path:i.path,dependencies:i.dependencies||"无"}));this.config=n,this.loading=!1;case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),handleAddConfig:function(){var e=(0,r.default)(a.default.mark(function e(){return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.loadingCreate=!0,e.next=3,o.default.addAndSetDepolyConfig(this.configForm.name,this.configForm.type,this.configForm.path,this.configForm.dependencies);case 3:return"success"==e.sent.message&&i.Message.success("添加成功"),this.loadingCreate=!1,this.showDialog=!1,e.next=9,this.getDepolyConfig();case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),handleCloseDialog:function(){var e=(0,r.default)(a.default.mark(function e(){return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.configForm={name:"",type:"",path:"",dependencies:""},this.showDialog=!1;case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),handleDelete:function(e){var t=this;this.$confirm("是否删除该配置?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return o.default.deleteDepolyConfig(e)}).then(function(e){return t.$message({type:"success",message:"删除成功!"}),t.getDepolyConfig()}).catch(function(){})},handleRestart:function(e){var t=this;this.loading=!0,o.default.restartProject(e).then(function(e){i.Message.success("操作完成，详情看邮件"),t.loading=!1}).catch(function(e){i.Message.error("失败："+e),t.loading=!1})}}}},320:function(e,t,n){},377:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(n(89)),r=i(n(90)),o=i(n(140));function i(e){return e&&e.__esModule?e:{default:e}}var s="https://service.crazyball.xyz";t.default={getDepolyConfig:function(){var e=this;return(0,r.default)(a.default.mark(function t(){var n;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.default.get(s+"/api/v1/depolyConfig");case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},t,e)}))()},addAndSetDepolyConfig:function(e,t,n,i){var l=this;return(0,r.default)(a.default.mark(function r(){var c;return a.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.default.post(s+"/api/v1/depolyConfig",{name:e,type:t,path:n,dependencies:i});case 2:return c=a.sent,a.abrupt("return",c);case 4:case"end":return a.stop()}},r,l)}))()},deleteDepolyConfig:function(e){var t=this;return(0,r.default)(a.default.mark(function n(){var r;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.default.delete(s+"/api/v1/depolyConfig/"+e);case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}},n,t)}))()},restartProject:function(e){var t=this;return(0,r.default)(a.default.mark(function n(){var r;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.default.post(s+"/api/v1/depoly/"+e);case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}},n,t)}))()}}},378:function(e,t,n){"use strict";var a=n(320);n.n(a).a},390:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"depoly-manager"},[n("h1",{staticClass:"title"},[e._v("部署管理")]),e._v(" "),n("el-row",{staticClass:"add-btn-row",attrs:{type:"flex",justify:"end"}},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.showDialog=!0}}},[e._v("新增/编辑项目设置")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.config,"empty-text":"暂无数据",border:""}},[n("el-table-column",{attrs:{prop:"name",label:"项目名称",align:"center","class-name":"column-content"}}),e._v(" "),n("el-table-column",{attrs:{prop:"type",label:"项目类型",align:"center","class-name":"column-content"}}),e._v(" "),n("el-table-column",{attrs:{prop:"path",label:"项目路径",align:"center","class-name":"column-content"}}),e._v(" "),n("el-table-column",{attrs:{prop:"dependencies",label:"项目依赖",align:"center","class-name":"column-content"}}),e._v(" "),n("el-table-column",{attrs:{prop:"",label:"操作",align:"center","class-name":"column-content",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return e.handleRestart(t.row.name)}}},[e._v("重启")]),e._v(" "),n("el-button",{staticClass:"deleteBtn",attrs:{type:"text",size:"small"},on:{click:function(n){return e.handleDelete(t.row.name)}}},[e._v("删除")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:"新增/编辑设置",visible:e.showDialog,width:"420px",center:!0},on:{close:e.handleCloseDialog}},[n("p",{staticClass:"tips"},[e._v("- 以名称作为唯一索引，名称相同会覆盖旧的设置 -")]),e._v(" "),n("el-form",{attrs:{model:e.configForm,"label-width":"60px"}},[n("el-form-item",{attrs:{label:"名称："}},[n("el-input",{model:{value:e.configForm.name,callback:function(t){e.$set(e.configForm,"name",t)},expression:"configForm.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"类型："}},[n("el-input",{model:{value:e.configForm.type,callback:function(t){e.$set(e.configForm,"type",t)},expression:"configForm.type"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"路径："}},[n("el-input",{model:{value:e.configForm.path,callback:function(t){e.$set(e.configForm,"path",t)},expression:"configForm.path"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"依赖："}},[n("el-input",{model:{value:e.configForm.dependencies,callback:function(t){e.$set(e.configForm,"dependencies",t)},expression:"configForm.dependencies"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",loading:e.loadingCreate},on:{click:e.handleAddConfig}},[e._v("确 定")])],1)],1)],1)},r=[];a._withStripped=!0,n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r})}}]);