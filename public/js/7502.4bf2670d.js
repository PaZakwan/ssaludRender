"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[7502],{17502:(t,e,i)=>{i.d(e,{A:()=>O});var n=i(41614),s=i(69155),u=i(21522),o=i(57e3),r=i(38213),l=i(66951),a=i(72006);const h=(0,a.A)(r.A).extend({name:"v-time-picker-title",props:{ampm:Boolean,disabled:Boolean,hour:Number,minute:Number,second:Number,period:{type:String,validator:function(t){return"am"===t||"pm"===t}},readonly:Boolean,useSeconds:Boolean,selecting:Number},methods:{genTime:function(){var t=this.hour;this.ampm&&(t=t?(t-1)%12+1:12);var e=null==this.hour?"--":this.ampm?String(t):(0,l.A)(t),i=null==this.minute?"--":(0,l.A)(this.minute),n=[this.genPickerButton("selecting",M.hour,e,this.disabled),this.$createElement("span",":"),this.genPickerButton("selecting",M.minute,i,this.disabled)];if(this.useSeconds){var s=null==this.second?"--":(0,l.A)(this.second);n.push(this.$createElement("span",":")),n.push(this.genPickerButton("selecting",M.second,s,this.disabled))}return this.$createElement("div",{class:"v-time-picker-title__time"},n)},genAmPm:function(){return this.$createElement("div",{staticClass:"v-time-picker-title__ampm"},[this.genPickerButton("period","am","am",this.disabled||this.readonly),this.genPickerButton("period","pm","pm",this.disabled||this.readonly)])}},render:function(t){var e=[this.genTime()];return this.ampm&&e.push(this.genAmPm()),t("div",{staticClass:"v-time-picker-title"},e)}});var c=i(47971),d=i(677),m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t};const p=(0,a.A)(c.A,d.A).extend({name:"v-time-picker-clock",props:{allowedValues:Function,disabled:Boolean,double:Boolean,format:{type:Function,default:function(t){return t}},max:{type:Number,required:!0},min:{type:Number,required:!0},scrollable:Boolean,readonly:Boolean,rotate:{type:Number,default:0},step:{type:Number,default:1},value:Number},data:function(){return{inputValue:this.value,isDragging:!1,valueOnMouseDown:null,valueOnMouseUp:null}},computed:{count:function(){return this.max-this.min+1},degreesPerUnit:function(){return 360/this.roundCount},degrees:function(){return this.degreesPerUnit*Math.PI/180},displayedValue:function(){return null==this.value?this.min:this.value},innerRadiusScale:function(){return.62},roundCount:function(){return this.double?this.count/2:this.count}},watch:{value:function(t){this.inputValue=t}},methods:{wheel:function(t){t.preventDefault();var e=Math.sign(-t.deltaY||1),i=this.displayedValue;do{i+=e,i=(i-this.min+this.count)%this.count+this.min}while(!this.isAllowed(i)&&i!==this.displayedValue);i!==this.displayedValue&&this.update(i)},isInner:function(t){return this.double&&t-this.min>=this.roundCount},handScale:function(t){return this.isInner(t)?this.innerRadiusScale:1},isAllowed:function(t){return!this.allowedValues||this.allowedValues(t)},genValues:function(){for(var t=[],e=this.min;e<=this.max;e+=this.step){var i=e===this.value&&(this.color||"accent");t.push(this.$createElement("span",this.setBackgroundColor(i,{staticClass:"v-time-picker-clock__item",class:{"v-time-picker-clock__item--active":e===this.displayedValue,"v-time-picker-clock__item--disabled":this.disabled||!this.isAllowed(e)},style:this.getTransform(e),domProps:{innerHTML:"<span>"+this.format(e)+"</span>"}})))}return t},genHand:function(){var t="scaleY("+this.handScale(this.displayedValue)+")",e=this.rotate+this.degreesPerUnit*(this.displayedValue-this.min),i=null!=this.value&&(this.color||"accent");return this.$createElement("div",this.setBackgroundColor(i,{staticClass:"v-time-picker-clock__hand",class:{"v-time-picker-clock__hand--inner":this.isInner(this.value)},style:{transform:"rotate("+e+"deg) "+t}}))},getTransform:function(t){var e=this.getPosition(t),i=e.x,n=e.y;return{left:50+50*i+"%",top:50+50*n+"%"}},getPosition:function(t){var e=this.rotate*Math.PI/180;return{x:Math.sin((t-this.min)*this.degrees+e)*this.handScale(t),y:-Math.cos((t-this.min)*this.degrees+e)*this.handScale(t)}},onMouseDown:function(t){t.preventDefault(),this.valueOnMouseDown=null,this.valueOnMouseUp=null,this.isDragging=!0,this.onDragMove(t)},onMouseUp:function(){this.isDragging=!1,null!==this.valueOnMouseUp&&this.isAllowed(this.valueOnMouseUp)&&this.$emit("change",this.valueOnMouseUp)},onDragMove:function(t){if(t.preventDefault(),this.isDragging||"click"===t.type){var e=this.$refs.clock.getBoundingClientRect(),i=e.width,n=e.top,s=e.left,u=this.$refs.innerClock.getBoundingClientRect(),o=u.width,r="touches"in t?t.touches[0]:t,l=r.clientX,a=r.clientY,h={x:i/2,y:-i/2},c={x:l-s,y:n-a},d=Math.round(this.angle(h,c)-this.rotate+360)%360,m=this.double&&this.euclidean(h,c)<(o+o*this.innerRadiusScale)/4,p=(Math.round(d/this.degreesPerUnit)+(m?this.roundCount:0))%this.count+this.min,f=void 0;f=d>=360-this.degreesPerUnit/2?m?this.max-this.roundCount+1:this.min:p,this.isAllowed(p)&&(null===this.valueOnMouseDown&&(this.valueOnMouseDown=f),this.valueOnMouseUp=f,this.update(f))}},update:function(t){this.inputValue!==t&&(this.inputValue=t,this.$emit("input",t))},euclidean:function(t,e){var i=e.x-t.x,n=e.y-t.y;return Math.sqrt(i*i+n*n)},angle:function(t,e){var i=2*Math.atan2(e.y-t.y-this.euclidean(t,e),e.x-t.x);return Math.abs(180*i/Math.PI)}},render:function(t){var e=this,i={staticClass:"v-time-picker-clock",class:m({"v-time-picker-clock--indeterminate":null==this.value},this.themeClasses),on:this.readonly||this.disabled?void 0:Object.assign({mousedown:this.onMouseDown,mouseup:this.onMouseUp,mouseleave:function(){return e.isDragging&&e.onMouseUp()},touchstart:this.onMouseDown,touchend:this.onMouseUp,mousemove:this.onDragMove,touchmove:this.onDragMove},this.scrollable?{wheel:this.wheel}:{}),ref:"clock"};return t("div",i,[t("div",{staticClass:"v-time-picker-clock__inner",ref:"innerClock"},[this.genHand(),this.genValues()])])}});var f=i(55710),g=i(69463),v=function(){function t(t,e){var i=[],n=!0,s=!1,u=void 0;try{for(var o,r=t[Symbol.iterator]();!(n=(o=r.next()).done);n=!0)if(i.push(o.value),e&&i.length===e)break}catch(l){s=!0,u=l}finally{try{!n&&r["return"]&&r["return"]()}finally{if(s)throw u}}return i}return function(e,i){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),y=(0,g.Sd)(24),w=(0,g.Sd)(12),b=w.map((function(t){return t+12})),k=(0,g.Sd)(60),M={hour:1,minute:2,second:3},S={1:"hour",2:"minute",3:"second"};const A=(0,a.A)(f.A).extend({name:"v-time-picker",props:{allowedHours:Function,allowedMinutes:Function,allowedSeconds:Function,disabled:Boolean,format:{type:String,default:"ampm",validator:function(t){return["ampm","24hr"].includes(t)}},min:String,max:String,readonly:Boolean,scrollable:Boolean,useSeconds:Boolean,value:null},data:function(){return{inputHour:null,inputMinute:null,inputSecond:null,lazyInputHour:null,lazyInputMinute:null,lazyInputSecond:null,period:"am",selecting:M.hour}},computed:{selectingHour:{get:function(){return this.selecting===M.hour},set:function(t){this.selecting=M.hour}},selectingMinute:{get:function(){return this.selecting===M.minute},set:function(t){this.selecting=M.minute}},selectingSecond:{get:function(){return this.selecting===M.second},set:function(t){this.selecting=M.second}},isAllowedHourCb:function(){var t=this;if(!this.min&&!this.max)return this.allowedHours;var e=this.min?Number(this.min.split(":")[0]):0,i=this.max?Number(this.max.split(":")[0]):23;return function(n){return n>=1*e&&n<=1*i&&(!t.allowedHours||t.allowedHours(n))}},isAllowedMinuteCb:function(){var t=this,e=!this.allowedHours||this.allowedHours(this.inputHour);if(!this.min&&!this.max)return e?this.allowedMinutes:function(){return!1};var i=this.min?this.min.split(":").map(Number):[0,0],n=v(i,2),s=n[0],u=n[1],o=this.max?this.max.split(":").map(Number):[23,59],r=v(o,2),l=r[0],a=r[1],h=60*s+1*u,c=60*l+1*a;return function(i){var n=60*t.inputHour+i;return n>=h&&n<=c&&e&&(!t.allowedMinutes||t.allowedMinutes(i))}},isAllowedSecondCb:function(){var t=this,e=!this.allowedHours||this.allowedHours(this.inputHour),i=!this.allowedMinutes||this.allowedMinutes(this.inputMinute);if(!this.min&&!this.max)return e&&i?this.allowedSeconds:function(){return!1};var n=this.min?this.min.split(":").map(Number):[0,0,0],s=v(n,3),u=s[0],o=s[1],r=s[2],l=this.max?this.max.split(":").map(Number):[23,59,59],a=v(l,3),h=a[0],c=a[1],d=a[2],m=3600*u+60*o+1*(r||0),p=3600*h+60*c+1*(d||0);return function(n){var s=3600*t.inputHour+60*t.inputMinute+n;return s>=m&&s<=p&&e&&i&&(!t.allowedSeconds||t.allowedSeconds(n))}},isAmPm:function(){return"ampm"===this.format}},watch:{value:"setInputData"},mounted:function(){this.setInputData(this.value)},methods:{genValue:function(){return null==this.inputHour||null==this.inputMinute||this.useSeconds&&null==this.inputSecond?null:(0,l.A)(this.inputHour)+":"+(0,l.A)(this.inputMinute)+(this.useSeconds?":"+(0,l.A)(this.inputSecond):"")},emitValue:function(){var t=this.genValue();null!==t&&this.$emit("input",t)},setPeriod:function(t){if(this.period=t,null!=this.inputHour){var e=this.inputHour+("am"===t?-12:12);this.inputHour=this.firstAllowed("hour",e),this.emitValue()}},setInputData:function(t){if(null==t||""===t)this.inputHour=null,this.inputMinute=null,this.inputSecond=null;else if(t instanceof Date)this.inputHour=t.getHours(),this.inputMinute=t.getMinutes(),this.inputSecond=t.getSeconds();else{var e=t.trim().toLowerCase().match(/^(\d+):(\d+)(:(\d+))?([ap]m)?$/)||new Array(6),i=v(e,6),n=i[1],s=i[2],u=i[4],o=i[5];this.inputHour=o?this.convert12to24(parseInt(n,10),o):parseInt(n,10),this.inputMinute=parseInt(s,10),this.inputSecond=parseInt(u||0,10)}this.period=null==this.inputHour||this.inputHour<12?"am":"pm"},convert24to12:function(t){return t?(t-1)%12+1:12},convert12to24:function(t,e){return t%12+("pm"===e?12:0)},onInput:function(t){this.selecting===M.hour?this.inputHour=this.isAmPm?this.convert12to24(t,this.period):t:this.selecting===M.minute?this.inputMinute=t:this.inputSecond=t,this.emitValue()},onChange:function(t){this.$emit("click:"+S[this.selecting],t);var e=this.selecting===(this.useSeconds?M.second:M.minute);if(this.selecting===M.hour?this.selecting=M.minute:this.useSeconds&&this.selecting===M.minute&&(this.selecting=M.second),this.inputHour!==this.lazyInputHour||this.inputMinute!==this.lazyInputMinute||this.useSeconds&&this.inputSecond!==this.lazyInputSecond){var i=this.genValue();null!==i&&(this.lazyInputHour=this.inputHour,this.lazyInputMinute=this.inputMinute,this.useSeconds&&(this.lazyInputSecond=this.inputSecond),e&&this.$emit("change",i))}},firstAllowed:function(t,e){var i="hour"===t?this.isAllowedHourCb:"minute"===t?this.isAllowedMinuteCb:this.isAllowedSecondCb;if(!i)return e;var n="minute"===t||"second"===t?k:this.isAmPm?e<12?w:b:y,s=n.find((function(t){return i((t+e)%n.length+n[0])}));return((s||0)+e)%n.length+n[0]},genClock:function(){return this.$createElement(p,{props:{allowedValues:this.selecting===M.hour?this.isAllowedHourCb:this.selecting===M.minute?this.isAllowedMinuteCb:this.isAllowedSecondCb,color:this.color,dark:this.dark,disabled:this.disabled,double:this.selecting===M.hour&&!this.isAmPm,format:this.selecting===M.hour?this.isAmPm?this.convert24to12:function(t){return t}:function(t){return(0,l.A)(t,2)},light:this.light,max:this.selecting===M.hour?this.isAmPm&&"am"===this.period?11:23:59,min:this.selecting===M.hour&&this.isAmPm&&"pm"===this.period?12:0,readonly:this.readonly,scrollable:this.scrollable,size:Number(this.width)-(!this.fullWidth&&this.landscape?80:20),step:this.selecting===M.hour?1:5,value:this.selecting===M.hour?this.inputHour:this.selecting===M.minute?this.inputMinute:this.inputSecond},on:{input:this.onInput,change:this.onChange},ref:"clock"})},genPickerBody:function(){return this.$createElement("div",{staticClass:"v-time-picker-clock__container",key:this.selecting},[this.genClock()])},genPickerTitle:function(){var t=this;return this.$createElement(h,{props:{ampm:this.isAmPm,disabled:this.disabled,hour:this.inputHour,minute:this.inputMinute,second:this.inputSecond,period:this.period,readonly:this.readonly,useSeconds:this.useSeconds,selecting:this.selecting},on:{"update:selecting":function(e){return t.selecting=e},"update:period":this.setPeriod},ref:"title",slot:"title"})}},render:function(){return this.genPicker("v-picker--time")}});var x=function(){var t=this,e=t._self._c;return e(s.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.A,{attrs:{xs12:"",sm6:"","px-2":""}},[e(u.A,{ref:"menu",attrs:{"close-on-content-click":!1,"nudge-right":40,"return-value":t.time1,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","max-width":"290px","min-width":"290px"},on:{"update:returnValue":function(e){t.time1=e},"update:return-value":function(e){t.time1=e}},scopedSlots:t._u([{key:"activator",fn:function({on:i}){return[e(o.W,t._g({attrs:{"background-color":t.color+" "+(t.readOnly?"lighten-2":"lighten-5"),color:t.color,readonly:"",label:"Hora Inicial"+(t.readOnly?" (Solo Lectura)":""),"prepend-icon":"access_time",rules:t.req?t.validate:[]},model:{value:t.time1,callback:function(e){t.time1=e},expression:"time1"}},i))]}}]),model:{value:t.menu2,callback:function(e){t.menu2=e},expression:"menu2"}},[t.menu2?e(A,{attrs:{"background-color":t.color+" "+(t.readOnly?"lighten-2":"lighten-5"),color:t.color,readonly:t.readOnly,disabled:t.readOnly,"full-width":"",min:"6:00",max:t.time2,"allowed-minutes":t.allowedMinutes,format:"24hr"},on:{input:function(e){return t.$emit("input1",e)},"click:minute":function(e){return t.$refs.menu.save(t.time1)}},model:{value:t.time1,callback:function(e){t.time1=e},expression:"time1"}}):t._e()],1)],1),e(n.A,{attrs:{xs12:"",sm6:"","px-2":""}},[e(u.A,{ref:"menu3",attrs:{"close-on-content-click":!1,"nudge-right":40,"return-value":t.time2,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","max-width":"290px","min-width":"290px"},on:{"update:returnValue":function(e){t.time2=e},"update:return-value":function(e){t.time2=e}},scopedSlots:t._u([{key:"activator",fn:function({on:i}){return[e(o.W,t._g({attrs:{"background-color":t.color+" "+(t.readOnly?"lighten-2":"lighten-5"),color:t.color,readonly:"",label:"Hora Final"+(t.readOnly?" (Solo Lectura)":""),"prepend-icon":"access_time",rules:t.req?t.validate:[]},model:{value:t.time2,callback:function(e){t.time2=e},expression:"time2"}},i))]}}]),model:{value:t.menu4,callback:function(e){t.menu4=e},expression:"menu4"}},[t.menu4?e(A,{attrs:{"background-color":t.color+" "+(t.readOnly?"lighten-2":"lighten-5"),color:t.color,readonly:t.readOnly,disabled:t.readOnly,"full-width":"",min:t.time1,max:"20:00","allowed-minutes":t.allowedMinutes,format:"24hr"},on:{input:function(e){return t.$emit("input2",e)},"click:minute":function(e){return t.$refs.menu3.save(t.time2)}},model:{value:t.time2,callback:function(e){t.time2=e},expression:"time2"}}):t._e()],1)],1)],1)},H=[];const _={name:"time-range",props:["value","color","turno","requerido","readonly"],data(){return{time1:this.value[0],time2:this.value[1],menu2:!1,menu4:!1,req:this.requerido||!1,readOnly:this.readonly||!1,validate:[t=>t&&""!==t.trim()||"Este campo es requerido."]}},computed:{restriction:function(){return this.turno||15}},methods:{allowedMinutes:function(t){return"40"===this.restriction?t%20===0:t%this.restriction===0}}},C=_;var P=i(81656),I=(0,P.A)(C,x,H,!1,null,null,null);const O=I.exports}}]);