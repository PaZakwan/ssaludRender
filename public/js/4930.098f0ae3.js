"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[4930],{12683:function(t,e,i){i.d(e,{A:function(){return o}});var s=function(){var t=this,e=t._self._c;return t.field.array?e("span",[t.field.object?e("span",t._l(t._get(t.props.item,t.field.ruta),(function(i,s){return e("code",{key:`${t.field.text}-${s}`,attrs:{STYLE:"margin:4px"}},[t.field.keyShow?e("span",[t._v(t._s(t.field.date?t.mostrarFecha(i[t.field.keyShow],t.field.time)||"--------":i[t.field.keyShow]??"--------"))]):e("span",t._l(i,(function(n,a,r){return e("span",{key:`${t.field.text}-${s}-${a}`},[t._v(t._s(a)+": "),e("kbd",[t._v(t._s(isNaN(n)&&"Invalid Date"!==t.mostrarFecha(n,t.field.time)?t.mostrarFecha(n,t.field.time)||"--------":n??"--------"))]),r!=Object.keys(i).length-1?e("span",[t._v(t._s("\n"))]):t._e()])})),0)])})),0):e("span",t._l(t._get(t.props.item,t.field.ruta),(function(i,s){return e("code",{key:`${t.field.text}-${s}`,attrs:{STYLE:"margin:4px"}},[t._v(t._s(t.field.date?t.mostrarFecha(i,t.field.time)||"--------":i??"--------"))])})),0)]):t.field.object?e("span",[e("code",{attrs:{STYLE:"margin:4px"}},[t.field.keyShow?e("span",[t._v(t._s(t.field.date?t.mostrarFecha(t._get(t.props.item,t.field.ruta)[t.field.keyShow],t.field.time)||"--------":t._get(t.props.item,t.field.ruta)[t.field.keyShow]??"--------"))]):e("span",t._l(t._get(t.props.item,t.field.ruta),(function(i,s,n){return e("span",{key:`${t.field.text}-${s}`},[t._v(t._s(s)+": "),e("kbd",[t._v(t._s(isNaN(i)&&"Invalid Date"!==t.mostrarFecha(i,t.field.time)?`${t.mostrarFecha(i,t.field.time)}`||"--------":i??"--------"))]),n!=Object.keys(t._get(t.props.item,t.field.ruta)).length-1?e("span",[t._v(t._s("\n"))]):t._e()])})),0)])]):e("span",{style:""+(t.field.numeric&&t._get(t.props.item,t.field.ruta)<0?"color: red;":"")},[t._v(t._s(t.field.date?t.mostrarFecha(t.props.item[t.field.ruta],t.field.time)||"--------":t.field.boolean?""+(t._get(t.props.item,t.field.ruta)&&"false"!=t._get(t.props.item,t.field.ruta)&&"0"!=t._get(t.props.item,t.field.ruta)?"Si":"No"):t._get(t.props.item,t.field.ruta)?.toLocaleString("es-AR")??"--------"))])},n=[],a={name:"body-data-table-dinamic",props:["props","field"]},r=a,l=i(81656),u=(0,l.A)(r,s,n,!1,null,null,null),o=u.exports},21939:function(t,e,i){i.d(e,{A:function(){return n}});var s=i(88e3),n={name:"v-form",mixins:[(0,s.G)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},s={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?s.shouldValidate=t.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(t._uid)||(s.valid=i(t)))})):s.valid=i(t),s},validate:function(){var t=this.inputs.filter((function(t){return!t.validate(!0)})).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i.valid&&i.valid(),i.shouldValidate&&i.shouldValidate(),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},69490:function(t,e,i){i.d(e,{A:function(){return h}});var s=i(40657),n=i(70369),a=i(54858),r=i(69463),l=i(73803),u=i(21961),o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t},h=n.A.extend({name:"v-slider",directives:{ClickOutside:a.A},mixins:[u.A],props:{alwaysDirty:Boolean,inverseLabel:Boolean,label:String,min:{type:[Number,String],default:0},max:{type:[Number,String],default:100},step:{type:[Number,String],default:1},ticks:{type:[Boolean,String],default:!1,validator:function(t){return"boolean"===typeof t||"always"===t}},tickLabels:{type:Array,default:function(){return[]}},tickSize:{type:[Number,String],default:1},thumbColor:{type:String,default:null},thumbLabel:{type:[Boolean,String],default:null,validator:function(t){return"boolean"===typeof t||"always"===t}},thumbSize:{type:[Number,String],default:32},trackColor:{type:String,default:null},value:[Number,String]},data:function(t){return{app:{},isActive:!1,keyPressed:0,lazyValue:"undefined"!==typeof t.value?t.value:Number(t.min),oldValue:null}},computed:{classes:function(){return{"v-input--slider":!0,"v-input--slider--ticks":this.showTicks,"v-input--slider--inverse-label":this.inverseLabel,"v-input--slider--ticks-labels":this.tickLabels.length>0,"v-input--slider--thumb-label":this.thumbLabel||this.$scopedSlots.thumbLabel}},showTicks:function(){return this.tickLabels.length>0||!this.disabled&&this.stepNumeric&&!!this.ticks},showThumbLabel:function(){return!this.disabled&&(!!this.thumbLabel||""===this.thumbLabel||this.$scopedSlots["thumb-label"])},computedColor:function(){return this.disabled?null:this.validationState||this.color||"primary"},computedTrackColor:function(){return this.disabled?null:this.trackColor||null},computedThumbColor:function(){return this.disabled||!this.isDirty?null:this.validationState||this.thumbColor||this.color||"primary"},internalValue:{get:function(){return this.lazyValue},set:function(t){var e=this.min,i=this.max,s=this.roundValue(Math.min(Math.max(t,e),i));s!==this.lazyValue&&(this.lazyValue=s,this.$emit("input",s),this.validate())}},stepNumeric:function(){return this.step>0?parseFloat(this.step):0},trackFillStyles:function(){var t=this.$vuetify.rtl?"auto":0,e=this.$vuetify.rtl?0:"auto",i=this.inputWidth+"%";return this.disabled&&(i="calc("+this.inputWidth+"% - 8px)"),{transition:this.trackTransition,left:t,right:e,width:i}},trackPadding:function(){return this.isActive||this.inputWidth>0||this.disabled?0:7},trackStyles:function(){var t=this.disabled?"calc("+this.inputWidth+"% + 8px)":this.trackPadding+"px",e=this.$vuetify.rtl?"auto":t,i=this.$vuetify.rtl?t:"auto",s=this.disabled?"calc("+(100-this.inputWidth)+"% - 8px)":"100%";return{transition:this.trackTransition,left:e,right:i,width:s}},tickStyles:function(){var t=Number(this.tickSize);return{"border-width":t+"px","border-radius":t>1?"50%":null,transform:t>1?"translateX(-"+t+"px) translateY(-"+(t-1)+"px)":null}},trackTransition:function(){return this.keyPressed>=2?"none":""},numTicks:function(){return Math.ceil((this.max-this.min)/this.stepNumeric)},inputWidth:function(){return(this.roundValue(this.internalValue)-this.min)/(this.max-this.min)*100},isDirty:function(){return this.internalValue>this.min||this.alwaysDirty}},watch:{min:function(t){t>this.internalValue&&this.$emit("input",parseFloat(t))},max:function(t){t<this.internalValue&&this.$emit("input",parseFloat(t))},value:function(t){this.internalValue=t}},mounted:function(){this.app=document.querySelector("[data-app]")||(0,l.OP)("Missing v-app or a non-body wrapping element with the [data-app] attribute",this)},methods:{genDefaultSlot:function(){var t=[this.genLabel()],e=this.genSlider();return this.inverseLabel?t.unshift(e):t.push(e),t.push(this.genProgress()),t},genListeners:function(){return{blur:this.onBlur,click:this.onSliderClick,focus:this.onFocus,keydown:this.onKeyDown,keyup:this.onKeyUp}},genInput:function(){return this.$createElement("input",{attrs:o({"aria-label":this.label,name:this.name,role:"slider",tabindex:this.disabled?-1:this.$attrs.tabindex,value:this.internalValue,readonly:!0,"aria-readonly":String(this.readonly),"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":this.internalValue},this.$attrs),on:this.genListeners(),ref:"input"})},genSlider:function(){return this.$createElement("div",{staticClass:"v-slider",class:{"v-slider--is-active":this.isActive},directives:[{name:"click-outside",value:this.onBlur}]},this.genChildren())},genChildren:function(){return[this.genInput(),this.genTrackContainer(),this.genSteps(),this.genThumbContainer(this.internalValue,this.inputWidth,this.isFocused||this.isActive,this.onThumbMouseDown)]},genSteps:function(){var t=this;if(!this.step||!this.showTicks)return null;var e=(0,r.Sd)(this.numTicks+1).map((function(e){var i=[];return t.tickLabels[e]&&i.push(t.$createElement("span",t.tickLabels[e])),t.$createElement("span",{key:e,staticClass:"v-slider__ticks",class:{"v-slider__ticks--always-show":"always"===t.ticks||t.tickLabels.length>0},style:o({},t.tickStyles,{left:e*(100/t.numTicks)+"%"})},i)}));return this.$createElement("div",{staticClass:"v-slider__ticks-container"},e)},genThumb:function(){return this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb"}))},genThumbContainer:function(t,e,i,s){var n=[this.genThumb()],a=this.getLabel(t);return this.showThumbLabel&&n.push(this.genThumbLabel(a)),this.$createElement("div",this.setTextColor(this.computedThumbColor,{staticClass:"v-slider__thumb-container",class:{"v-slider__thumb-container--is-active":i,"v-slider__thumb-container--show-label":this.showThumbLabel},style:{transition:this.trackTransition,left:(this.$vuetify.rtl?100-e:e)+"%"},on:{touchstart:s,mousedown:s}}),n)},genThumbLabel:function(t){var e=(0,r.Dg)(this.thumbSize);return this.$createElement(s.yX,{props:{origin:"bottom center"}},[this.$createElement("div",{staticClass:"v-slider__thumb-label__container",directives:[{name:"show",value:this.isFocused||this.isActive||"always"===this.thumbLabel}]},[this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb-label",style:{height:e,width:e}}),[t])])])},genTrackContainer:function(){var t=[this.$createElement("div",this.setBackgroundColor(this.computedTrackColor,{staticClass:"v-slider__track",style:this.trackStyles})),this.$createElement("div",this.setBackgroundColor(this.computedColor,{staticClass:"v-slider__track-fill",style:this.trackFillStyles}))];return this.$createElement("div",{staticClass:"v-slider__track__container",ref:"track"},t)},getLabel:function(t){return this.$scopedSlots["thumb-label"]?this.$scopedSlots["thumb-label"]({value:t}):this.$createElement("span",t)},onBlur:function(t){2!==this.keyPressed&&(this.isActive=!1,this.isFocused=!1,this.$emit("blur",t))},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onThumbMouseDown:function(t){this.oldValue=this.internalValue,this.keyPressed=2;var e={passive:!0};this.isActive=!0,this.isFocused=!1,"touches"in t?(this.app.addEventListener("touchmove",this.onMouseMove,e),(0,r.d7)(this.app,"touchend",this.onSliderMouseUp)):(this.app.addEventListener("mousemove",this.onMouseMove,e),(0,r.d7)(this.app,"mouseup",this.onSliderMouseUp)),this.$emit("start",this.internalValue)},onSliderMouseUp:function(){this.keyPressed=0;var t={passive:!0};this.isActive=!1,this.isFocused=!1,this.app.removeEventListener("touchmove",this.onMouseMove,t),this.app.removeEventListener("mousemove",this.onMouseMove,t),this.$emit("end",this.internalValue),(0,r.bD)(this.oldValue,this.internalValue)||this.$emit("change",this.internalValue)},onMouseMove:function(t){var e=this.parseMouseMove(t),i=e.value,s=e.isInsideTrack;s&&this.setInternalValue(i)},onKeyDown:function(t){if(!this.disabled&&!this.readonly){var e=this.parseKeyDown(t);null!=e&&(this.setInternalValue(e),this.$emit("change",e))}},onKeyUp:function(){this.keyPressed=0},onSliderClick:function(t){this.isFocused=!0,this.onMouseMove(t),this.$emit("change",this.internalValue)},parseMouseMove:function(t){var e=this.$refs.track.getBoundingClientRect(),i=e.left,s=e.width,n="touches"in t?t.touches[0].clientX:t.clientX,a=Math.min(Math.max((n-i)/s,0),1)||0;this.$vuetify.rtl&&(a=1-a);var r=n>=i-8&&n<=i+s+8,l=parseFloat(this.min)+a*(this.max-this.min);return{value:l,isInsideTrack:r}},parseKeyDown:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.internalValue;if(!this.disabled){var i=r.uP.pageup,s=r.uP.pagedown,n=r.uP.end,a=r.uP.home,l=r.uP.left,u=r.uP.right,o=r.uP.down,h=r.uP.up;if([i,s,n,a,l,u,o,h].includes(t.keyCode)){t.preventDefault();var d=this.stepNumeric||1,c=(this.max-this.min)/d;if([l,u,o,h].includes(t.keyCode)){this.keyPressed+=1;var m=this.$vuetify.rtl?[l,h]:[u,h],p=m.includes(t.keyCode)?1:-1,f=t.shiftKey?3:t.ctrlKey?2:1;e+=p*d*f}else if(t.keyCode===a)e=parseFloat(this.min);else if(t.keyCode===n)e=parseFloat(this.max);else{var v=t.keyCode===s?1:-1;e-=v*d*(c>100?c/10:10)}return e}}},roundValue:function(t){if(!this.stepNumeric)return t;var e=this.step.toString().trim(),i=e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0,s=this.min%this.stepNumeric,n=Math.round((t-s)/this.stepNumeric)*this.stepNumeric+s;return parseFloat(Math.max(Math.min(n,this.max),this.min).toFixed(i))},setInternalValue:function(t){this.internalValue=t}}})}}]);