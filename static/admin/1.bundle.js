(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{129:function(t,e,r){"use strict";r.r(e);var a=r(298),n=r(270);for(var s in n)"default"!==s&&function(t){r.d(e,t,function(){return n[t]})}(s);r(290);var i=r(80),u=Object(i.a)(n.default,a.a,a.b,!1,null,"36c7cf54",null);u.options.__file="src/page/blog/article-add.vue",e.default=u.exports},266:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(r(78)),n=i(r(79)),s=i(r(127));function i(t){return t&&t.__esModule?t:{default:t}}var u="https://www.crazyball.xyz";e.default={getArticleList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return(0,n.default)(a.default.mark(function n(){var i;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.default.get(u+"/article_list?page="+e+"&limit="+r);case 2:return i=t.sent,t.abrupt("return",i);case 4:case"end":return t.stop()}},n,t)}))()},createArticle:function(t){var e=this;return(0,n.default)(a.default.mark(function r(){var n;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.default.post(u+"/article",t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},r,e)}))()},deleteArticle:function(t){var e=this;return(0,n.default)(a.default.mark(function r(){var n;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.default.delete(u+"/article/"+t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},r,e)}))()},updateArticle:function(t,e){var r=this;return(0,n.default)(a.default.mark(function n(){var i;return a.default.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,s.default.put(u+"/article/"+t,e);case 2:return i=r.sent,r.abrupt("return",i);case 4:case"end":return r.stop()}},n,r)}))()},getArticle:function(t){var e=this;return(0,n.default)(a.default.mark(function r(){var n;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.default.get(u+"/article/"+t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},r,e)}))()},getAllTags:function(){var t=this;return(0,n.default)(a.default.mark(function e(){var r;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.default.get(u+"/tag/all");case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}},e,t)}))()},getTagList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return(0,n.default)(a.default.mark(function n(){var i;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.default.get(u+"/tag/list?page="+e+"&limit="+r);case 2:return i=t.sent,t.abrupt("return",i);case 4:case"end":return t.stop()}},n,t)}))()},createTag:function(t){var e=this;return(0,n.default)(a.default.mark(function r(){var n;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.default.post(u+"/tag",t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},r,e)}))()},deleteTag:function(t){var e=this;return(0,n.default)(a.default.mark(function r(){var n;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.default.delete(u+"/tag/"+t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},r,e)}))()}}},270:function(t,e,r){"use strict";r.r(e);var a=r(271),n=r.n(a);for(var s in a)"default"!==s&&function(t){r.d(e,t,function(){return a[t]})}(s);e.default=n.a},271:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=c(r(78)),n=c(r(79)),s=c(r(260)),i=r(81),u=c(r(266)),l=c(r(289));function c(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{loading:!1,pid:null,tagList:[],title:"",tags:[],summary:"",content:"",picture:"",loadingStyle:{height:"0"},editor:null,editorUploadProgress:0}},mounted:function(){var t=this;return(0,n.default)(a.default.mark(function e(){var r,n,s;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.createEditor(),e.next=3,u.default.getAllTags();case 3:if(r=e.sent,t.tagList=r.data,"articleEdit"!=t.$route.name){e.next=11;break}return t.pid=t.$route.params.pid,e.next=9,u.default.getArticle(t.$route.params.pid);case 9:200==(n=e.sent).code&&(t.title=n.data.title,t.summary=n.data.summary,t.content=n.data.content,t.editor.txt.html(t.content),t.picture=n.data.picture,s=n.data.tags.split(","),t.tagList.forEach(function(e){s.includes(e.content)&&t.tags.push(e.p_id)}));case 11:case"end":return e.stop()}},e,t)}))()},methods:{handleSubmit:function(){var t=this;this.loading=!0;var e={title:this.title,tags:this.tags.join(","),summary:this.summary,content:this.content,picture:this.picture};this.pid?u.default.updateArticle(this.pid,e).then(function(e){t.loading=!1,i.Message.success("修改成功")}).catch(function(e){t.loading=!1}):u.default.createArticle(e).then(function(e){t.loading=!1,i.Message.success("创建成功"),t.$router.push("/blog/article-list")}).catch(function(e){t.loading=!1})},uploadImg:function(t){var e=this;this.picture="",l.default.uploadFiles(t.file,function(t){e.loadingStyle.height=t+"%"}).then(function(t){200==t.code&&(i.Message.success("上传成功"),e.picture="//"+t.data[0])}).catch(function(t){i.Message.error(t)})},createEditor:function(){var t=this;this.editor=new s.default("#editor"),this.editor.customConfig.zIndex=100,this.editor.customConfig.onchange=function(e){t.content=e},this.editor.customConfig.customUploadImg=function(e,r){l.default.uploadFiles(e,function(e){t.editorUploadProgress=e}).then(function(e){t.editorUploadProgress=0,200==e.code&&(i.Message.success("上传成功"),e.data.forEach(function(t){r("//"+t)}))}).catch(function(e){t.editorUploadProgress=0,i.Message.error(e)})},this.editor.create();var e=document.querySelector(".w-e-text-container");e.style.setProperty("flex","1"),e.style.setProperty("overflow","scroll"),e.style.setProperty("background","white"),e.style.removeProperty("height")},fullScreenEditor:function(){var t=document.querySelector(".editor-warp");t.requestFullscreen?t.requestFullscreen():t.msRequestFullscreen?t.msRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullscreen&&t.webkitRequestFullscreen()}}}},272:function(t,e,r){},289:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(r(78)),n=i(r(79)),s=i(r(127));function i(t){return t&&t.__esModule?t:{default:t}}e.default={uploadFiles:function(t,e){var r=this;return(0,n.default)(a.default.mark(function n(){var i,u,l;return a.default.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(i=new FormData,!Array.isArray(t)){r.next=5;break}t.forEach(function(t){if(t.size>5242880)throw new Error("file is too large");i.append("files",t)}),r.next=8;break;case 5:if(!(t.size>5242880)){r.next=7;break}throw new Error("file is too large");case 7:i.append("files",t);case 8:return u={headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(t){var r=t.loaded/t.total*100|0;e&&e(r)}},r.next=11,s.default.post("https://file.crazyball.xyz/api/upload",i,u);case 11:return l=r.sent,r.abrupt("return",l);case 13:case"end":return r.stop()}},n,r)}))()}}},290:function(t,e,r){"use strict";var a=r(272);r.n(a).a},298:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"article-add"},[r("h1",{staticClass:"title"},[t._v("新增文章")]),t._v(" "),r("div",{staticClass:"item-box"},[r("span",[t._v("标题:")]),t._v(" "),r("el-input",{staticClass:"item-input",attrs:{placeholder:"请输入标题",clearable:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),t._v(" "),r("div",{staticClass:"item-box"},[r("span",[t._v("标签:")]),t._v(" "),r("el-select",{staticClass:"item-input",attrs:{placeholder:"请选择标签",multiple:""},model:{value:t.tags,callback:function(e){t.tags=e},expression:"tags"}},t._l(t.tagList,function(t){return r("el-option",{key:t.p_id,attrs:{label:t.content,value:t.p_id}})}),1)],1),t._v(" "),r("div",{staticClass:"item-box"},[r("span",[t._v("简介:")]),t._v(" "),r("el-input",{staticClass:"item-input",attrs:{type:"textarea",placeholder:"请输入简介",clearable:"",rows:"5"},model:{value:t.summary,callback:function(e){t.summary=e},expression:"summary"}})],1),t._v(" "),r("div",{staticClass:"item-box"},[r("span",[t._v("封面:")]),t._v(" "),r("el-upload",{staticClass:"img-uploader",attrs:{action:"","http-request":t.uploadImg,"show-file-list":!1}},[t.picture?r("img",{staticClass:"img",attrs:{src:t.picture,alt:""}}):r("div",[r("div",{staticClass:"img-uploader-icon"},[t._v(t._s(parseInt(t.loadingStyle.height)>0?t.loadingStyle.height:"+"))]),t._v(" "),r("div",{staticClass:"upload-progress",style:t.loadingStyle})])]),t._v(" "),r("el-button",{staticClass:"delete-btn",attrs:{type:"danger",icon:"el-icon-delete",circle:"",size:"mini"},on:{click:function(e){t.picture=null}}})],1),t._v(" "),r("div",{staticClass:"editor-warp"},[r("el-button",{staticClass:"full-screen-btn",attrs:{type:"primary",icon:"el-icon-full-screen",circle:"",size:"mini"},on:{click:t.fullScreenEditor}}),t._v(" "),r("el-progress",{directives:[{name:"show",rawName:"v-show",value:t.editorUploadProgress>0,expression:"editorUploadProgress > 0"}],staticClass:"upload-progress",attrs:{"text-inside":!0,"stroke-width":20,percentage:t.editorUploadProgress}}),t._v(" "),r("div",{attrs:{id:"editor"}})],1),t._v(" "),r("el-row",{staticClass:"submit-box",attrs:{type:"flex",justify:"center"}},[r("el-button",{attrs:{type:"primary",round:"",loading:t.loading},on:{click:t.handleSubmit}},[t._v("保存")])],1)],1)},n=[];a._withStripped=!0,r.d(e,"a",function(){return a}),r.d(e,"b",function(){return n})}}]);