/*!
 * @project : 1433430233501
 * @version : 1.0.0
 * @author  : lixinliang
 * @update  : 2015-06-08 1:45:49 pm
 */!function(global,factory){"function"==typeof define?define("smartMask",["jquery"],function(){return factory(jQuery)}):global.SmartMask=factory(jQuery)}(this,function($){function smarkMask(conf){if(this.maskClass=conf.maskClass,this.event=conf.event,this.transition=conf.transition,this.duration=conf.duration,this.transition||(this.duration=0),this.easing=conf.easing,this.animating=!1,this.beforeShow=conf.beforeShow,this.afterShow=conf.afterShow,this.beforeHide=conf.beforeHide,this.afterHide=conf.afterHide,this.wrap=$(conf.wrap),this.offset=this.wrap.offset(),this.top=0,this.left=0,"static"===this.wrap.css("position")){var offset=this.wrap.offsetParent().offset();this.top=this.offset.top-offset.top,this.left=this.offset.left-offset.left}this.width=this.wrap.width(),this.height=this.wrap.height(),this.trigger=this.wrap.find($(conf.trigger)),this.trigger.selector=$(conf.trigger).selector,this.place={member:[],location:{}},this.mask=$(),this.maskIndex=0,this.base=$("<div>").css({background:"#000",opacity:"0.7",position:"absolute",display:"none"}).addClass(conf.maskClass),this.grid={x:[],y:[]},this.setConfig(conf.config),this.on()}var handle=["show","hide","getTriggerList","setConfig","getConfig"],option={maskClass:"",event:"click",transition:!0,duration:400,beforeShow:function(){},afterShow:function(){},beforeHide:function(){},afterHide:function(){},config:[]},prototype={getIndex:function(trigger){var ret=-1;return this.trigger.each(function(index,each){return trigger===each?(ret=index,!1):void 0}),ret},show:function(index){if("undefined"!=typeof index&&"undefined"==typeof this.index){this.index=index;var brother=this.getBrother(index);this.mask.css({width:0,height:0}),this.beforeShow.call(this.trigger.eq(index)[0],index,this.place.location,brother),this.setPlaceMember(index),this.setPlaceLocation(),this.showMask()}},hide:function(){if("undefined"!=typeof this.index){var index=this.index,brother=this.getBrother(index);this.beforeHide.call(this.trigger.eq(index)[0],index,this.place.location,brother),this.clearPlace(),this.hideMask()}},getBrother:function(index){var self=this,length=this.trigger.length,ret=[];return this.book[index]>=0?$(this.config[this.book[index]]).each(function(index,each){length>each&&ret.push(self.trigger.eq(each))}):ret.push(this.trigger.eq(index)),ret},setPlaceMember:function(index){function getOffset(direction){return Math.round(this.offset()[direction]-self.offset[direction])}var self=this;$(this.getBrother(index)).each(function(index,each){self.place.member.push({top:getOffset.call(each,"top"),left:getOffset.call(each,"left"),width:each.width(),height:each.height()})})},setPlaceLocation:function(){function min(list){return Math.min.apply(null,list)}function max(list){return Math.max.apply(null,list)}var top=[this.height],left=[this.width],right=[0],bottom=[0],self=this;$(this.place.member).each(function(index,each){top.push(each.top),left.push(each.left),right.push(each.left+each.width),bottom.push(each.top+each.height),self.grid.x.push(each.left,each.left+each.width),self.grid.y.push(each.top,each.top+each.height)});var location={top:max([min(top),0]),left:max([min(left),0]),right:min([max(right),this.width]),bottom:min([max(bottom),this.height])};location.width=location.right-location.left,location.height=location.bottom-location.top,this.place.location=location,this.place.member.length>1&&this.fixGrid()},clearPlace:function(){this.place.member=[]},fixGrid:function(){function sort(m,n){return m-n}function getIndex(val,axis){for(var list=self.grid[axis],i=list.length-1;i>=0;i--)if(list[i]==val)return i;return-1}function makeGrid(top,bottom,left,right){top=0>top?0:top,left=0>left?0:left,right=right>self.width?self.width:right,bottom=bottom>self.height?self.height:bottom,self.makeMask(self.top+top,self.left+left,right-left,bottom-top)}this.grid.x.sort(sort),this.grid.y.sort(sort);var self=this,gridPiece=[],gridOffset=[];gridPiece.length=this.grid.x.length-1,$(gridPiece).each(function(i){var temp=[];temp.length=self.grid.y.length-1,$(temp).each(function(j){temp[j]=!0}),gridPiece[i]=temp}),$(this.place.member).each(function(index,each){gridOffset.push({x:{min:getIndex(each.left,"x"),max:getIndex(each.left+each.width,"x")},y:{min:getIndex(each.top,"y"),max:getIndex(each.top+each.height,"y")}})}),$(gridOffset).each(function(index,each){for(var i=each.y.min,j=each.y.max;j>i;i++)for(var m=each.x.min,n=each.x.max;n>m;m++)gridPiece[i][m]=!1}),$(gridPiece).each(function(index,each){for(var top=self.grid.y[index],left=self.grid.x[0],right=left,bottom=self.grid.y[index+1],i=0;i<each.length;i++)each[i]?right=self.grid.x[i+1]:(makeGrid(top,bottom,left,right),left=self.grid.x[i+1],right=left);makeGrid(top,bottom,left,right)})},makeMask:function(top,left,width,height){0!==width&&0!==height&&(this.maskIndex>=this.mask.length&&(this.mask=this.mask.add(this.base.clone()),this.wrap.append(this.mask.last())),this.mask.eq(this.maskIndex).css({top:top,left:left,width:width,height:height}),this.maskIndex++)},showMask:function(){var self=this,box=this.place.location;this.makeMask(this.top,box.left,box.width,box.top),this.makeMask(this.top,box.right,this.width-box.right,this.height),this.makeMask(this.top+box.bottom,box.left,box.width,this.height-box.bottom),this.makeMask(this.top,this.left,box.left,this.height),this.animating=!0,this.mask.first().fadeIn(this.duration,function(){var index=self.index,brother=self.getBrother(index);self.animating=!1,self.afterShow.call(self.trigger.eq(index)[0],index,self.place.location,brother)}),this.mask.slice(1).fadeIn(this.duration),this.maskIndex=0},hideMask:function(){var self=this;this.grid={x:[],y:[]},this.animating=!0,this.mask.first().fadeOut(this.duration,function(){var index=self.index,brother=self.getBrother(index);self.animating=!1,self.afterHide.call(self.trigger.eq(index)[0],index,self.place.location,brother),self.index=void 0}),this.mask.slice(1).fadeOut(this.duration)},on:function(){var self=this,visibility=!1;"mouseover"==this.event?this.wrap.on(this.event,this.trigger.selector,function(){return visibility||self.animating?!1:(self.show(self.getIndex(this)),visibility=!0,void 0)}).on("mouseout",this.trigger,function(){return!visibility||self.animating?!1:(self.hide(),visibility=!1,void 0)}):("click"==this.event||"touch"==this.event)&&this.wrap.on(this.event,this.trigger.selector,function(){return self.animating?!1:(visibility?(visibility=!1,self.hide()):(self.show(self.getIndex(this)),visibility=!0),void 0)})},getTriggerList:function(){return this.trigger},setConfig:function(config){if($.isArray(config)){var self=this;this.config=config,this.book=[];for(var length=this.trigger.length,i=0;length>i;i++)this.book.push(-1);$(config).each(function(index,each){$(each).each(function(ignore,value){length>value&&(self.book[value]=index)})})}},getConfig:function(){return this.config}};for(var i in prototype)smarkMask.prototype[i]=prototype[i];return function(conf){function error(sub){throw new Error("smartMask require a correct "+sub+" selector")}$(conf.wrap).length||error("wrap"),$(conf.wrap).find($(conf.trigger)).length||error("trigger");for(var plugin=new smarkMask($.extend({},option,conf)),ret={},i=0,l=handle.length;l>i;i++)ret[handle[i]]=function(name){var ret=plugin[name].apply(plugin,Array.prototype.slice.call(arguments,1));return"undefined"==typeof ret?this:ret}.bind(ret,handle[i]);return ret.plugin=plugin,ret}});