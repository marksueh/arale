define("#dropdown/0.9.0/dropdown",["jquery","base","overlay"],function(a,b,c){var d=a("jquery"),e=a("base"),f=a("overlay"),g=f.extend({getElem:function(){return this.srcNode},toggle:function(){d(this.srcNode).toggle()}}),h=e.extend({options:{trigger:"",triggerType:"hover",target:".ui-dropdown",position:"left",container:"ui-content",animateType:"",width:"auto",height:"auto",speed:"200",x:0,y:0,z:999},initOverlay:function(){var a=this.options,b=d(a.trigger),c=d(a.target),e=new g({template:'<div class="ui-dropdown"></div>',content:c.html(),parentNode:b.parent()[0],width:a.width,height:a.heigth,zIndex:a.z,baseObject:{element:b[0],x:0,y:b.height()}});return e},initialize:function(a){if(!a||!a.trigger)throw"options/trigger missing";this.setOptions(a);var b=this,c=this.options,e;d(c.trigger).on(c.triggerType,function(){e||(e=b.initOverlay()),e.render().show()}),d(c.trigger).parent().on("hover",d.noop,function(){e&&e.hide()})}});c.exports=h});