define("#base/0.9.3/attrs",["./util"],function(a,b){function e(a){a=c.merge({},a);for(var b in a){var e=a[b];if(c.isPlainObject(e)&&f(e,d))continue;a[b]={value:e}}return a}function f(a,b){for(var c=0,d=b.length;c<d;c++)if(a.hasOwnProperty(b[c]))return!0;return!1}function g(a){return"_onChange"+a.charAt(0).toUpperCase()+a.substring(1)}var c=a("./util");b.initAttrs=function(a){this.hasOwnProperty("attrs")||(this.attrs={});var b=this.attrs;b.__defaults||(b.__defaults=c.getInherited(this,"attrs",e),c.merge(b,b.__defaults));var d={silent:!0};for(var f in b){a&&a.hasOwnProperty(f)&&(this.set(f,a[f],d),delete a[f]);var h=g(f);this[h]&&this.on("change:"+f,this[h])}},b.get=function(a){var b=this.attrs[a]||{},c=b.value;return b.getter?b.getter.call(this,c,a):c},b.set=function(a,b,d){var e={};c.isString(a)?e[a]=b:(e=a,d=b),d||(d={});var f=this.attrs,g=d.silent;for(a in e){var h=f[a]||(f[a]={});b=e[a];if(h.validator){var i=h.validator.call(this,b,a);if(i!==!0){d.error&&d.error.call(this,i);continue}}h.setter&&(b=h.setter.call(this,b,a));var j=this.get(a);c.isPlainObject(j)&&c.isPlainObject(b)&&(b=c.merge(c.merge({},j),b)),f[a].value=b,!g&&this.trigger&&this.trigger("change:"+a,b,j,a)}};var d=["value","getter","setter","validator"]});