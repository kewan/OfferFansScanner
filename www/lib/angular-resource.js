/*
 AngularJS v1.2.5
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(H,a,z){'use strict';function C(q,l){l=l||{};a.forEach(l,function(a,h){delete l[h]});for(var h in q)q.hasOwnProperty(h)&&"$$"!==h.substr(0,2)&&(l[h]=q[h]);return l}var v=a.$$minErr("$resource"),B=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;a.module("ngResource",["ng"]).factory("$resource",["$http","$q",function(q,l){function h(a,k){this.template=a;this.defaults=k||{};this.urlParams={}}function t(m,k,n){function E(c,d){var e={};d=w({},k,d);s(d,function(b,d){u(b)&&(b=b());var g;if(b&&b.charAt&&"@"==
b.charAt(0)){g=c;var a=b.substr(1);if(null==a||""===a||"hasOwnProperty"===a||!B.test("."+a))throw v("badmember",a);for(var a=a.split("."),f=0,k=a.length;f<k&&g!==z;f++){var h=a[f];g=null!==g?g[h]:z}}else g=b;e[d]=g});return e}function e(a){return a.resource}function f(a){C(a||{},this)}var F=new h(m);n=w({},A,n);s(n,function(c,d){var k=/^(POST|PUT|PATCH)$/i.test(c.method);f[d]=function(b,d,g,h){var r={},m,n,x;switch(arguments.length){case 4:x=h,n=g;case 3:case 2:if(u(d)){if(u(b)){n=b;x=d;break}n=d;
x=g}else{r=b;m=d;n=g;break}case 1:u(b)?n=b:k?m=b:r=b;break;case 0:break;default:throw v("badargs",arguments.length);}var t=this instanceof f,p=t?m:c.isArray?[]:new f(m),y={},A=c.interceptor&&c.interceptor.response||e,B=c.interceptor&&c.interceptor.responseError||z;s(c,function(a,b){"params"!=b&&("isArray"!=b&&"interceptor"!=b)&&(y[b]=G(a))});k&&(y.data=m);F.setUrlParams(y,w({},E(m,c.params||{}),r),c.url);r=q(y).then(function(b){var d=b.data,g=p.$promise;if(d){if(a.isArray(d)!==!!c.isArray)throw v("badcfg",
c.isArray?"array":"object",a.isArray(d)?"array":"object");c.isArray?(p.length=0,s(d,function(b){p.push(new f(b))})):(C(d,p),p.$promise=g)}p.$resolved=!0;b.resource=p;return b},function(b){p.$resolved=!0;(x||D)(b);return l.reject(b)});r=r.then(function(b){var a=A(b);(n||D)(a,b.headers);return a},B);return t?r:(p.$promise=r,p.$resolved=!1,p)};f.prototype["$"+d]=function(b,a,g){u(b)&&(g=a,a=b,b={});b=f[d].call(this,b,this,a,g);return b.$promise||b}});f.bind=function(a){return t(m,w({},k,a),n)};return f}
var A={get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}},D=a.noop,s=a.forEach,w=a.extend,G=a.copy,u=a.isFunction;h.prototype={setUrlParams:function(m,k,h){var l=this,e=h||l.template,f,q,c=l.urlParams={};s(e.split(/\W/),function(a){if("hasOwnProperty"===a)throw v("badname");!/^\d+$/.test(a)&&(a&&RegExp("(^|[^\\\\]):"+a+"(\\W|$)").test(e))&&(c[a]=!0)});e=e.replace(/\\:/g,":");k=k||{};s(l.urlParams,function(d,c){f=k.hasOwnProperty(c)?
k[c]:l.defaults[c];a.isDefined(f)&&null!==f?(q=encodeURIComponent(f).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),e=e.replace(RegExp(":"+c+"(\\W|$)","g"),q+"$1")):e=e.replace(RegExp("(/?):"+c+"(\\W|$)","g"),function(a,d,c){return"/"==c.charAt(0)?c:d+c})});e=e.replace(/\/+$/,"");e=e.replace(/\/\.(?=\w+($|\?))/,".");m.url=e.replace(/\/\\\./,"/.");s(k,function(a,c){l.urlParams[c]||
(m.params=m.params||{},m.params[c]=a)})}};return t}])})(window,window.angular);
//# sourceMappingURL=angular-resource.min.js.map
