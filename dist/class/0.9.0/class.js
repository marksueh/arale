define("#class/0.9.0/class",[],function(){function a(b){if(!(this instanceof a)&&j(b))return c(b)}function b(b){var c,d;for(c in b)d=b[c],a.Mutators.hasOwnProperty(c)?a.Mutators[c].call(this,d):this.prototype[c]=d}function c(c){return c.extend=a.extend,c.implement=b,c}function d(){}function f(){}function g(a,b){for(var c in b)a[c]=b[c]}a.create=function(d,e){function h(){d.apply(this,arguments),this.__initialized||(this.initialize.apply(this,arguments),this.__initialized=!0)}return j(d)||(e=d,d=null),e||(e={}),d||(d=e.Extends||a),e.Extends=d,e.initialize||(e.initialize=f),d!==a&&g(h,d),b.call(h,e),c(h)},a.extend=function(b){return b||(b={}),b.Extends=this,a.create(b)},a.Mutators={Extends:function(a){var b=this.prototype,c=e(a.prototype);g(c,b),c.constructor=this,this.prototype=c,this.superclass=a.prototype},Implements:function(a){i(a)||(a=[a]);var b=this.prototype,c;while(c=a.shift())g(b,c.prototype||c)},Statics:function(a){g(this,a)}};var e=Object.__proto__?function(a){return{__proto__:a}}:function(a){return d.prototype=a,new d},h=Object.prototype.toString,i=Array.isArray;i||(i=function(a){return h.call(a)==="[object Array]"});var j=function(a){return h.call(a)==="[object Function]"};return a});