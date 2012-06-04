define("#validator/0.8.0/core",["jquery","./async","widget","./parser","./item","./rule"],function(require,exports,module){function stampItem(item){var set=item.element.attr(DATA_ATTR_NAME);return set||(set=item.cid,item.element.attr(DATA_ATTR_NAME,set)),set}function getAttrsFromDataset(dataset,input){var result={};return $.each(dataset,function(key,obj){$.each(obj,function(msg,selector){if(input.is($(selector)))return result[key]=msg,!1})}),result}var $=require("jquery"),async=require("./async"),Widget=require("widget"),parser=require("./parser"),Item=require("./item"),validators=[],helpers={},Validator=Widget.extend({attrs:{triggerType:"blur",checkOnSubmit:!0,stopOnError:!1,autoSubmit:!0,checkNull:!0},setup:function(){this.element.attr("novalidate","novalidate"),this.items=[];var that=this;this.get("checkOnSubmit")&&this.element.submit(function(e){e.preventDefault(),that.execute(function(err){err||that.get("autoSubmit")&&that.element.get(0).submit()})})},Statics:$.extend({},require("./rule"),{autoRun:function(){var forms=$("form[data-enable-validate=true]");forms.each(function(i,form){var validator=new Validator({element:form});validators.push(validator),$(":input",form).each(function(i,input){if(!validator.query(input)){input=$(input);var options={},type=input.attr("type");type=="radio"||type=="checkbox"?options.element=$(":"+input.attr("type")+"[name="+input.attr("name")+"]",validator.element):options.element=input;var obj=parser.parseDom(input),attrs=getAttrsFromDataset(validator.dataset,input);$.extend(options,attrs,obj),options.onItemValidate=Validator.helper(obj.onItemValidate),options.onItemValidated=Validator.helper(obj.onItemValidated),validator.addItem(options)}})})},query:function(selector){var target=$(selector),result=null;return $.each(validators,function(i,validator){if(target.is(validator.element))return result=validator,!1;var item=validator.query(target);if(item)return result=item,!1}),result},helper:function(name,fn){return fn?(helpers[name]=fn,this):helpers[name]}}),addItem:function(cfg){var item=new Item($.extend({triggerType:this.get("triggerType")},cfg));return this.items.push(item),item.set("_handler",function(){if(!item.get("required")&&!item.element.val())return;if(!item.get("checkNull")&&!item.element.val())return;item.execute()}),this.element.on(item.get("triggerType"),"["+DATA_ATTR_NAME+"="+stampItem(item)+"]",item.get("_handler")),item.on("all",function(eventName){this.trigger.apply(this,[].slice.call(arguments,0))},this),this},removeItem:function(selector){var target=selector instanceof Item?selector.element:$(selector),items=this.items,that=this,j;return $.each(this.items,function(i,item){if(target.is(item.element))return j=i,that.element.off(item.get("triggerType"),"["+DATA_ATTR_NAME+"="+stampItem(item)+"]",item.get("_handler")),item.destroy(),!1}),j!==undefined&&this.items.splice(j,0),this},execute:function(callback){var that=this;this.trigger("formValidate");var complete=function(err){that.trigger("formValidated",Boolean(err)),callback&&callback(Boolean(err))};if(this.get("stopOnError")){var tasks={};$.each(this.items,function(i,item){tasks[i]=function(cb){item.execute(cb)}}),async.series(tasks,complete)}else async.forEach(this.items,function(item,cb){item.execute(cb)},complete);return this},destroy:function(){this.element.unbind("submit");var that=this;$.each(this.items,function(i,item){that.removeItem(item)}),Validator.superclass.destroy.call(this)},query:function(selector){var target=$(selector);if(target.length==0||!this.element.find(target))return null;var result=null;return $.each(this.items,function(i,item){if(target.is(item.element))return result=item,!1}),result}}),DATA_ATTR_NAME="data-validator-set";module.exports=Validator});