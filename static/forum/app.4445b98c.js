(function(t){function e(e){for(var r,s,o=e[0],c=e[1],u=e[2],f=0,d=[];f<o.length;f++)s=o[f],i[s]&&d.push(i[s][0]),i[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},i={app:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"26c4":function(t,e,n){"use strict";var r=n("b623"),i=n.n(r);i.a},"4f87":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("canvas",{attrs:{id:"bg"}}),n("header-bar"),n("transition",{attrs:{name:"changepage",mode:"out-in"}},[n("router-view",{staticClass:"content"})],1)],1)},a=[],s=(n("6c7b"),n("d225")),o=n("b0b4");function c(t,e){var n=function(){function t(e,n,r){Object(s["a"])(this,t),this.x=e,this.y=n,this.r=r||3,this.mx=2*Math.random()-1,this.my=2*Math.random()-1,this.lineColor="#ddd",this.color="#ddd"}return Object(o["a"])(t,[{key:"draw",value:function(){a.beginPath(a),a.arc(this.x,this.y,this.r,0,360),a.closePath,a.fillStyle=this.color,a.fill()}},{key:"drawcurrent",value:function(){a.beginPath(),a.arc(this.x,this.y,this.r,0,360),a.closePath,a.fillStyle=this.color,a.fill()}},{key:"move",value:function(){this.mx=this.x>0&&this.x<u?this.mx:-this.mx,this.my=this.y>0&&this.y<l?this.my:-this.my,this.x+=this.mx/2,this.y+=this.my/2}},{key:"line",value:function(t){var e=this.x-t.x,n=this.y-t.y,r=Math.sqrt(e*e+n*n);r<150&&(a.beginPath(),a.moveTo(this.x,this.y),a.lineTo(t.x,t.y),a.lineWidth=1,a.strokeStyle=this.lineColor,a.stroke(),a.closePath())}}]),t}();function r(){a.clearRect(0,0,u,l);for(var t=0;t<c.length;t++){c[t].draw();for(var e=0;e<c.length;e++)c[t].line(c[e]);c[t].move()}for(var n=0;n<c.length;n++)p.line(c[n]);return requestAnimationFrame(r)}var i=document.getElementById(t),a=i.getContext("2d"),c=[];i.width=1*i.offsetWidth,i.height=1*i.offsetHeight;for(var u=i.width,l=i.height,f=0;f<e;f++){var d=new n(Math.random()*u,Math.random()*l);c.push(d)}var p=new n(0,0,3);return i.addEventListener("mousemove",function(t){p.x=1*t.offsetX,p.y=1*t.offsetY}),r()}var u=c,l=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},f=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header-bar"},[n("div",{staticClass:"login-resign-btn"},[t._v("登录/注册")])])}],d={},p=d,h=(n("5e6a"),n("2877")),v=Object(h["a"])(p,l,f,!1,null,"963e724a",null),m=v.exports,b={name:"App",components:{HeaderBar:m},mounted:function(){u("bg",80)}},y=b,g=(n("26c4"),Object(h["a"])(y,i,a,!1,null,"2bc2ad82",null)),_=g.exports,x=n("8c4f"),w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"index"},[n("topic-tab",{attrs:{"topic-list":t.topicList}}),n("div",{staticClass:"post-list-box"},[t._m(0),n("div",{staticClass:"post-list"},t._l(t.postList,function(e){return n("div",{key:e.id,staticClass:"post-item"},[n("div",{staticClass:"title"},[t._v(t._s(e.title))]),n("div",{staticClass:"user"},[t._v(t._s(e.user.name))]),n("div",{staticClass:"topic"},[t._v(t._s(e.topic.title))]),n("div",{staticClass:"like"},[t._v("LIKE:"+t._s(e.like))]),n("div",{staticClass:"collect-count"},[t._v("收藏数："+t._s(e.collect_count))]),n("div",{staticClass:"time"},[t._v("时间：{post.updated_at}}")])])}),0)])],1)},C=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header"},[n("button",[t._v("发帖")])])}],O=(n("96cf"),n("3b8d")),j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"topic-tab"},[n("div",{staticClass:"header"},[t._v("主题分类")]),n("div",{staticClass:"topic-list"},[n("div",{staticClass:"topic-item"},[t._v("热门推荐")]),t._l(t.topicList,function(e){return n("div",{key:e.id,staticClass:"topic-item"},[t._v(t._s(e.title))])})],2)])},k=[],P={name:"topic-tab",props:["topicList"]},L=P,E=(n("bdcb"),Object(h["a"])(L,j,k,!1,null,"ad85a4dc",null)),M=E.exports,S=n("bc3a"),T=n.n(S),R=T.a,$="//39.108.174.110/api/v1",q={getTopicList:function(){var t=Object(O["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,R.get($+"/topic");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)}));function e(){return t.apply(this,arguments)}return e}(),getPostList:function(){var t=Object(O["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,R.get($+"/post");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)}));function e(){return t.apply(this,arguments)}return e}()},A={components:{TopicTab:M},data:function(){return{topicList:[],postList:[]}},mounted:function(){var t=Object(O["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,q.getTopicList();case 3:return e=t.sent,this.topicList=e.data.data.rows,t.next=7,q.getPostList();case 7:n=t.sent,this.postList=n.data.data.rows,console.log(n),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),alert(t.t0);case 15:case"end":return t.stop()}},t,this,[[0,12]])}));function e(){return t.apply(this,arguments)}return e}()},B=A,H=(n("675c"),Object(h["a"])(B,w,C,!1,null,"ad99e762",null)),I=H.exports;r["a"].use(x["a"]);var J=new x["a"]({routes:[{path:"/",name:"indexPage",component:I}]}),W=n("2f62");r["a"].use(W["a"]);var F=new W["a"].Store({state:{},mutations:{},actions:{}});n("4f87");r["a"].config.productionTip=!1,new r["a"]({router:J,store:F,render:function(t){return t(_)}}).$mount("#app")},5708:function(t,e,n){},"5e6a":function(t,e,n){"use strict";var r=n("5708"),i=n.n(r);i.a},"675c":function(t,e,n){"use strict";var r=n("9eac"),i=n.n(r);i.a},"9eac":function(t,e,n){},b623:function(t,e,n){},bdcb:function(t,e,n){"use strict";var r=n("dbab"),i=n.n(r);i.a},dbab:function(t,e,n){}});
//# sourceMappingURL=app.4445b98c.js.map