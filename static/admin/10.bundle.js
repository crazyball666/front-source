(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{283:function(t,e,n){"use strict";n.r(e);var u=n(391),r=n(321);for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);n(379);var c=n(91),a=Object(c.a)(r.default,u.a,u.b,!1,null,"4db0c6e6",null);a.options.__file="src/page/service-go/cbapp/index.vue",e.default=a.exports},321:function(t,e,n){"use strict";n.r(e);var u=n(322),r=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);e.default=r.a},322:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{menu:[{title:"用户管理",url:"/service-go/cbapp/user"},{title:"日志查询",url:"/service-go/cbapp/logs"}]}},mounted:function(){},methods:{selectMenu:function(t,e){this.$route.path!=t&&this.$router.push(t)}}}},323:function(t,e,n){},379:function(t,e,n){"use strict";var u=n(323);n.n(u).a},391:function(t,e,n){"use strict";var u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cb-app"},[n("el-menu",{staticClass:"el-menu-demo",attrs:{mode:"horizontal","default-active":this.$route.path},on:{select:t.selectMenu}},t._l(t.menu,function(e){return n("el-menu-item",{key:e.url,attrs:{index:e.url}},[t._v("\n      "+t._s(e.title)+"\n    ")])}),1),t._v(" "),n("keep-alive",[n("router-view",{staticClass:"cb-app-content"})],1)],1)},r=[];u._withStripped=!0,n.d(e,"a",function(){return u}),n.d(e,"b",function(){return r})}}]);