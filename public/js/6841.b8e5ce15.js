"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[6841],{86499:(e,t,a)=>{a.d(t,{Z:()=>k});var r=a(67416),n=a(18956),i=a(32353),o=a(50108),s=a(84791),l=a(94694),d=a(60683),u=a(73667),c=a(59456),p=a(14036),h=a(74618),y=a(25730),f=function(){var e=this,t=e._self._c;return"root"===e.treeRead.type||!e.soloLectura&&e.data[e.treeRead.key]&&e.treeRead.sublist?.length>0||e.soloLectura&&!e.isVacio(e.data[e.treeRead.key]).vacio&&e.treeRead.sublist?.length>0?t(s.Z,{attrs:{focusable:""}},[t(l.Z,{class:"grey lighten-"+("root"===e.treeRead.type?"2":e.changeColorPanel?"3":"5"),attrs:{ripple:{class:`${e.treeRead.color?e.treeRead.color:e.colorInput}--text`},lazy:!!e.soloLectura},scopedSlots:e._u([{key:"header",fn:function(){return[t(d.Z,{staticClass:"black--text subheading",attrs:{xs12:""}},[t(u.Z,{attrs:{left:""}},[e._v(e._s(e.treeRead.icon))]),e._v(e._s(e.treeRead.title))],1)]},proxy:!0}],null,!1,1383350921)},["root"===e.treeRead.type&&e.mensajeSoloLectura?t(c.Z,{attrs:{row:"",wrap:""}},[t(d.Z,{attrs:{xs12:"","mb-1":""}},[t(n.Z,[t(c.Z,{staticClass:"info lighten-3",attrs:{"align-center":"","justify-center":"",row:""}},[t(u.Z,{attrs:{right:"",color:"white"}},[e._v(e._s(e.mensajeSoloLectura.icon))]),t(i.ZB,{staticClass:"white--text"},[e._v(e._s(e.mensajeSoloLectura.msj))])],1)],1)],1)],1):e._e(),t(c.Z,{attrs:{row:"",wrap:""}},e._l(e.treeRead.sublist,(function(a){return t("tree-properties",{key:`${e.treeRead.key}-${a.key}`,attrs:{data:"root"===e.treeRead.type?e.data:e.data[e.treeRead.key],treeRead:a,opcionesSelect:e.opcionesSelect,soloLectura:e.soloLectura,editando:e.editando,areas:e.areas,colorInput:"root"===e.treeRead.type?e.treeRead.color:e.colorInput,changeColorPanel:!e.changeColorPanel}})})),1),"root"!==e.treeRead.type?t(o.Z):e._e()],1)],1):e.soloLectura&&!e.isVacio(e.data[e.treeRead.key]).vacio?t(d.Z,{attrs:{xs12:"",sm6:"","px-3":""}},["select"===e.treeRead.type?t(p.r,{attrs:{readonly:"","item-value":"id","item-text":"label",items:e.opcionesSelect[e.treeRead.opcion],label:e.treeRead.label,"prepend-icon":e.treeRead.icon,color:e.colorInput,"background-color":`${e.colorInput} lighten-2`,multiple:""},model:{value:e.data[e.treeRead.key],callback:function(t){e.$set(e.data,e.treeRead.key,t)},expression:"data[treeRead.key]"}}):"selectArray"===e.treeRead.type?t(y.Z,{attrs:{readonly:"",value:e.selectArray,"prepend-icon":e.treeRead.icon,label:e.treeRead.label,color:e.colorInput,"background-color":`${e.colorInput} lighten-2`,rows:"1","auto-grow":""}}):"areaArray"===e.treeRead.type?t(y.Z,{attrs:{readonly:"",value:e.areaArray,"prepend-icon":e.treeRead.icon,label:e.treeRead.label,color:e.colorInput,"background-color":`${e.colorInput} lighten-2`,rows:"1","auto-grow":""}}):"text"===e.treeRead.type||"number"===e.treeRead.type||"email"===e.treeRead.type?t(h.h,{attrs:{readonly:"",value:e.data[e.treeRead.key],"prepend-icon":e.treeRead.icon,label:e.treeRead.label,type:"text",color:e.colorInput,"background-color":`${e.colorInput} lighten-2`}}):"area"===e.treeRead.type?t(h.h,{attrs:{readonly:"",value:e.data[e.treeRead.key].area,"prepend-icon":e.treeRead.icon,label:e.treeRead.label,type:"text",color:e.colorInput,"background-color":`${e.colorInput} lighten-2`}}):"textArea"===e.treeRead.type?t(y.Z,{attrs:{readonly:"",value:e.data[e.treeRead.key],"prepend-icon":e.treeRead.icon,label:e.treeRead.label,color:e.colorInput,"background-color":`${e.colorInput} lighten-2`,"auto-grow":"",rows:"1"}}):e._e()],1):e.soloLectura?e._e():t(d.Z,{class:"xs12 "+("areaArray"===e.treeRead.type||"selectArray"===e.treeRead.type||"textArea"===e.treeRead.type?"":"sm6"),attrs:{"px-3":""}},["select"===e.treeRead.type?t(p.r,{attrs:{clearable:"","background-color":`${e.colorInput} lighten-5`,"item-value":"id","item-text":"label",items:e.opcionesSelect[e.treeRead.opcion],"prepend-icon":e.treeRead.icon,label:e.treeRead.label,color:e.colorInput,rules:e.rule,"validate-on-blur":""},model:{value:e.data[e.treeRead.key],callback:function(t){e.$set(e.data,e.treeRead.key,t)},expression:"data[treeRead.key]"}}):"selectArray"===e.treeRead.type?t(r.Z,{attrs:{clearable:"","background-color":`${e.colorInput} lighten-5`,"item-value":"id","item-text":"label",items:e.opcionesSelect[e.treeRead.opcion],"prepend-icon":e.treeRead.icon,label:e.treeRead.label,color:e.colorInput,rules:e.rule,"menu-props":{auto:!0},multiple:"",chips:"","deletable-chips":"","validate-on-blur":""},model:{value:e.data[e.treeRead.key],callback:function(t){e.$set(e.data,e.treeRead.key,t)},expression:"data[treeRead.key]"}}):"areaArray"===e.treeRead.type?t(r.Z,{attrs:{clearable:"","background-color":`${e.colorInput} lighten-5`,"prepend-icon":e.treeRead.icon,label:e.treeRead.label,items:e.areaOptions,"item-value":"id","item-text":"area",color:e.colorInput,rules:e.rule,"validate-on-blur":"","menu-props":{auto:!0},multiple:"",chips:"","deletable-chips":""},model:{value:e.data[e.treeRead.key],callback:function(t){e.$set(e.data,e.treeRead.key,t)},expression:"data[treeRead.key]"}}):"text"===e.treeRead.type||"number"===e.treeRead.type||"email"===e.treeRead.type?t(h.h,{attrs:{clearable:"","background-color":`${e.colorInput} lighten-5`,"prepend-icon":e.treeRead.icon,label:e.treeRead.label,type:e.treeRead.type,color:e.colorInput,rules:e.rule,"validate-on-blur":""},model:{value:e.data[e.treeRead.key],callback:function(t){e.$set(e.data,e.treeRead.key,t)},expression:"data[treeRead.key]"}}):"area"===e.treeRead.type?t(r.Z,{attrs:{clearable:"","background-color":`${e.colorInput} lighten-5`,"prepend-icon":e.treeRead.icon,label:e.treeRead.label,items:e.areas,"item-value":"id","item-text":"area",color:e.colorInput,rules:e.rule,"validate-on-blur":""},model:{value:e.data[e.treeRead.key],callback:function(t){e.$set(e.data,e.treeRead.key,t)},expression:"data[treeRead.key]"}}):e._e()],1)},m=[],v=(a(70560),a(20629));const R={name:"tree-properties",props:["data","treeRead","opcionesSelect","soloLectura","mensajeSoloLectura","areas","editando","colorInput","changeColorPanel"],computed:{...(0,v.rn)(["rules"]),areaArray(){if(this.soloLectura&&"areaArray"===this.treeRead.type&&!this.isVacio(this.data[this.treeRead.key]).vacio){let e=this.data[this.treeRead.key].map((e=>e.area));return e[0]=`• ${e[0]}`,e.join(";\n• ")}return""},selectArray(){if(this.soloLectura&&"selectArray"===this.treeRead.type&&!this.isVacio(this.data[this.treeRead.key]).vacio){let e=this.data[this.treeRead.key];return e[0]=`• ${e[0]}`,e.join(";\n• ")}return""},areaOptions(){return"areaArray"===this.treeRead.type&&this.treeRead.filter?this.areas.filter((e=>!!e[this.treeRead.filter])):this.areas},rule(){let e=[];return this.treeRead.rules&&(this.treeRead.rules.requerido&&e.push(...this.rules.requerido),this.treeRead.rules.soloNumero&&e.push(...this.rules.soloNumero),this.treeRead.rules.minNumber&&e.push(this.rules.minNumber(this.treeRead.rules.minNumber)),this.treeRead.rules.maxNumber&&e.push(this.rules.maxNumber(this.treeRead.rules.maxNumber))),e}}},b=R;var g=a(1001),x=(0,g.Z)(b,f,m,!1,null,null,null);const k=x.exports},84791:(e,t,a)=>{a.d(t,{Z:()=>s});var r=a(75721),n=a(30021),i=a(45530),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e};const s=(0,i.Z)(r.Z,(0,n.J)("expansionPanel")).extend({name:"v-expansion-panel",provide:function(){return{expansionPanel:this}},props:{disabled:Boolean,readonly:Boolean,expand:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,value:{type:[Number,Array],default:function(){return null}}},data:function(){return{items:[],open:[]}},computed:{classes:function(){return o({"v-expansion-panel--focusable":this.focusable,"v-expansion-panel--popout":this.popout,"v-expansion-panel--inset":this.inset},this.themeClasses)}},watch:{expand:function(e){var t=-1;if(!e){var a=this.open.reduce((function(e,t){return t?e+1:e}),0),r=Array(this.items.length).fill(!1);1===a&&(t=this.open.indexOf(!0)),t>-1&&(r[t]=!0),this.open=r}this.$emit("input",e?this.open:t>-1?t:null)},value:function(e){this.updateFromValue(e)}},mounted:function(){null!==this.value&&this.updateFromValue(this.value)},methods:{updateFromValue:function(e){if(!Array.isArray(e)||this.expand){var t=Array(this.items.length).fill(!1);"number"===typeof e?t[e]=!0:null!==e&&(t=e),this.updatePanels(t)}},updatePanels:function(e){this.open=e;for(var t=0;t<this.items.length;t++)this.items[t].toggle(e&&e[t])},panelClick:function(e){for(var t=this.expand?this.open.slice():Array(this.items.length).fill(!1),a=0;a<this.items.length;a++)this.items[a]._uid===e&&(t[a]=!this.open[a],!this.expand&&this.$emit("input",t[a]?a:null));this.updatePanels(t),this.expand&&this.$emit("input",t)},register:function(e){var t=this.items.push(e)-1;null!==this.value&&this.updateFromValue(this.value),e.toggle(!!this.open[t])},unregister:function(e){var t=this.items.findIndex((function(t){return t._uid===e._uid}));this.items.splice(t,1),this.open.splice(t,1)}},render:function(e){return e("ul",{staticClass:"v-expansion-panel",class:this.classes},this.$slots.default)}})},94694:(e,t,a)=>{a.d(t,{Z:()=>p});var r=a(22482),n=a(76815),i=a(54735),o=a(38197),s=a(30021),l=a(99524),d=a(45530),u=a(28219);function c(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}const p=(0,d.Z)(n.Z,i.Z,o.Z,(0,s.f)("expansionPanel","v-expansion-panel-content","v-expansion-panel")).extend({name:"v-expansion-panel-content",props:{disabled:Boolean,readonly:Boolean,expandIcon:{type:String,default:"$vuetify.icons.expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{height:"auto"}},computed:{containerClasses:function(){return{"v-expansion-panel__container--active":this.isActive,"v-expansion-panel__container--disabled":this.isDisabled}},isDisabled:function(){return this.expansionPanel.disabled||this.disabled},isReadonly:function(){return this.expansionPanel.readonly||this.readonly}},beforeMount:function(){this.expansionPanel.register(this),"undefined"!==typeof this.value&&(0,u.Kd)("v-model has been deprecated",this)},beforeDestroy:function(){this.expansionPanel.unregister(this)},methods:{onKeydown:function(e){13===e.keyCode&&this.$el===document.activeElement&&this.expansionPanel.panelClick(this._uid)},onHeaderClick:function(){this.isReadonly||this.expansionPanel.panelClick(this._uid)},genBody:function(){return this.$createElement("div",{ref:"body",class:"v-expansion-panel__body",directives:[{name:"show",value:this.isActive}]},this.showLazyContent(this.$slots.default))},genHeader:function(){var e=[].concat(c(this.$slots.header||[]));return this.hideActions||e.push(this.genIcon()),this.$createElement("div",{staticClass:"v-expansion-panel__header",directives:[{name:"ripple",value:this.ripple}],on:{click:this.onHeaderClick}},e)},genIcon:function(){var e=this.$slots.actions||[this.$createElement(l.Z,this.expandIcon)];return this.$createElement("transition",{attrs:{name:"fade-transition"}},[this.$createElement("div",{staticClass:"v-expansion-panel__header__icon",directives:[{name:"show",value:!this.isDisabled}]},e)])},toggle:function(e){var t=this;e&&(this.isBooted=!0),this.$nextTick((function(){return t.isActive=e}))}},render:function(e){return e("li",{staticClass:"v-expansion-panel__container",class:this.containerClasses,attrs:{tabindex:this.isReadonly||this.isDisabled?null:0,"aria-expanded":Boolean(this.isActive)},on:{keydown:this.onKeydown}},[this.$slots.header&&this.genHeader(),e(r.Fx,[this.genBody()])])}})},50445:(e,t,a)=>{a.d(t,{Z:()=>n});var r=a(30021);const n={name:"v-form",mixins:[(0,r.J)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var e=Object.values(this.errorBag).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(e){var t=this,a=function(e){return e.$watch("hasError",(function(a){t.$set(t.errorBag,e._uid,a)}),{immediate:!0})},r={_uid:e._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?r.shouldValidate=e.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(e._uid)||(r.valid=a(e)))})):r.valid=a(e),r},validate:function(){var e=this.inputs.filter((function(e){return!e.validate(!0)})).length;return!e},reset:function(){for(var e=this,t=this.inputs.length;t--;)this.inputs[t].reset();this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){for(var e=this,t=this.inputs.length;t--;)this.inputs[t].resetValidation();this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},register:function(e){var t=this.watchInput(e);this.inputs.push(e),this.watchers.push(t)},unregister:function(e){var t=this.inputs.find((function(t){return t._uid===e._uid}));if(t){var a=this.watchers.find((function(e){return e._uid===t._uid}));a.valid&&a.valid(),a.shouldValidate&&a.shouldValidate(),this.watchers=this.watchers.filter((function(e){return e._uid!==t._uid})),this.inputs=this.inputs.filter((function(e){return e._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}}}}]);