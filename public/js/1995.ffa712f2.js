"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[1995],{91995:function(e,t,a){a.d(t,{A:function(){return x}});var o=a(28597),i=a(76139),r=a(16717),s=a(52562),n=a(41614),l=a(21527),c=a(69155),u=a(8805),d=a(65582),h=a(87202),p=a(57e3),m=a(45621),_=function(){var e=this,t=e._self._c;return t(c.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(n.A,{attrs:{xs12:"",sm6:"","px-3":""}},[t(o.A,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5",items:e.optionsJson.opcZonasSanitarias,"item-value":"description","item-text":"description",label:"Zona Sanitaria","prepend-icon":"fa-solid fa-house-medical-flag",color:"terciary",rules:[...e.rules.requerido]},on:{"click:clear":function(t){e.$nextTick((()=>e.historial_unico.zona_sanitaria=null))}},model:{value:e.historial_unico.zona_sanitaria,callback:function(t){e.$set(e.historial_unico,"zona_sanitaria",t)},expression:"historial_unico.zona_sanitaria"}})],1),t(n.A,{attrs:{xs12:"",sm6:"","px-3":""}}),t(n.A,{attrs:{xs12:"",sm6:"","px-3":""}},[t(r.A,{attrs:{readonly:e.soloLectura,"background-color":e.soloLectura?"terciary":"",color:"terciary","prepend-icon":"fa-solid fa-baby"},scopedSlots:e._u([{key:"label",fn:function(){return[t("span",{class:{"terciary--text":e.historial_unico.prematuro}},[e._v("Prematuro: "+e._s(e.historial_unico.prematuro?"Si":"No"))])]},proxy:!0}]),model:{value:e.historial_unico.prematuro,callback:function(t){e.$set(e.historial_unico,"prematuro",t)},expression:"historial_unico.prematuro"}})],1),t(n.A,{attrs:{xs12:"",sm6:"","px-3":""}},[t(h.d,{attrs:{readonly:e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5",items:["Entre 2500 y 3800 gr.","Menor a 2500 gr.","Mayor a 3800 gr."],label:"Peso al Nacer [gr]","prepend-icon":"fas fa-weight",color:"terciary"},model:{value:e.peso_nacer,callback:function(t){e.peso_nacer=t},expression:"peso_nacer"}})],1),t(n.A,{attrs:{xs12:"","px-3":""}},[t(h.d,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5",items:e.optionsJson.hiclem.consulta_antecedentes,label:"Antecedentes Patologicos","prepend-icon":"fas fa-diagnoses",color:"terciary",multiple:"",chips:"","deletable-chips":""},model:{value:e.historial_unico.antecedentes_patologicos,callback:function(t){e.$set(e.historial_unico,"antecedentes_patologicos",t)},expression:"historial_unico.antecedentes_patologicos"}})],1),t(n.A,{staticClass:"text-xs-center grey lighten-4",attrs:{xs12:"",md4:"","px-3":""}},[t(s.A,{staticClass:"grey lighten-3 title",attrs:{"text-color":"black",selected:""}},[t(i.A,{staticClass:"white"},[t(l.A,{attrs:{color:"cyan"}},[e._v("gpp_maybe")])],1),e._v(" Inmunodeprimida ")],1),t(d.A,{staticClass:"justify-center mt-1 pa-0",attrs:{disabled:e.soloLectura,rules:e.edad_years>5?[...e.rules.requerido]:[],row:""},model:{value:e.historial_unico.inmunodeprimida,callback:function(t){e.$set(e.historial_unico,"inmunodeprimida",t)},expression:"historial_unico.inmunodeprimida"}},[t(u.A,{attrs:{label:"No",color:"red",value:!1}}),t(u.A,{attrs:{label:"Si",color:"success",value:!0}})],1)],1),t(n.A,{staticClass:"text-xs-center grey lighten-4",attrs:{xs12:"",md4:"","px-3":""}},[t(s.A,{staticClass:"grey lighten-3 title",attrs:{"text-color":"black",selected:""}},[t(i.A,{staticClass:"white"},[t(l.A,{attrs:{color:"brown"}},[e._v("smoking_rooms")])],1),e._v(" Fuma ")],1),t(d.A,{staticClass:"justify-center mt-1 pa-0",attrs:{disabled:e.soloLectura,rules:e.edad_years>5?[...e.rules.requerido]:[],row:""},model:{value:e.historial_unico.fuma,callback:function(t){e.$set(e.historial_unico,"fuma",t)},expression:"historial_unico.fuma"}},[t(u.A,{attrs:{label:"No",color:"red",value:!1}}),t(u.A,{attrs:{label:"Si",color:"success",value:!0}})],1)],1),t(n.A,{staticClass:"text-xs-center grey lighten-4",attrs:{xs12:"",md4:"","px-3":""}},[t(s.A,{staticClass:"grey lighten-3 title",attrs:{"text-color":"black",selected:""}},[t(i.A,{staticClass:"white"},[t(l.A,{attrs:{color:"purple"}},[e._v("warning")])],1),e._v(" Grupo de Riesgo ")],1),t(d.A,{staticClass:"justify-center mt-1 pa-0",attrs:{disabled:e.soloLectura,rules:e.edad_years>5?[...e.rules.requerido]:[],row:""},model:{value:e.historial_unico.riesgo,callback:function(t){e.$set(e.historial_unico,"riesgo",t)},expression:"historial_unico.riesgo"}},[t(u.A,{attrs:{label:"No",color:"red",value:!1}}),t(u.A,{attrs:{label:"Si",color:"success",value:!0}})],1)],1),t(n.A,{attrs:{xs12:"",sm6:"","px-3":"","mt-3":""}},[t(r.A,{staticClass:"mt-1",attrs:{readonly:e.soloLectura,"background-color":e.soloLectura?"terciary":"",color:"terciary","prepend-icon":"fa-solid fa-hospital-user"},scopedSlots:e._u([{key:"label",fn:function(){return[t("span",{class:{"terciary--text":e.historial_unico.personal_salud}},[e._v("Personal de Salud: "+e._s(e.historial_unico.personal_salud?"Si":"No"))])]},proxy:!0}]),model:{value:e.historial_unico.personal_salud,callback:function(t){e.$set(e.historial_unico,"personal_salud",t)},expression:"historial_unico.personal_salud"}})],1),t(n.A,{attrs:{xs12:"",sm6:"","px-3":"","mt-3":""}},[t(r.A,{staticClass:"mt-1",attrs:{readonly:e.soloLectura,"background-color":e.soloLectura?"terciary":"",color:"terciary","prepend-icon":"engineering"},scopedSlots:e._u([{key:"label",fn:function(){return[t("span",{class:{"terciary--text":e.historial_unico.personal_esencial}},[e._v("Personal Esencial: "+e._s(e.historial_unico.personal_esencial?"Si":"No"))])]},proxy:!0}]),model:{value:e.historial_unico.personal_esencial,callback:function(t){e.$set(e.historial_unico,"personal_esencial",t)},expression:"historial_unico.personal_esencial"}})],1),"Femenino"===e.sexo&&e.edad_years>10?t(n.A,{staticClass:"text-xs-center grey lighten-4",attrs:{xs12:"","px-3":""}},[t(d.A,{staticClass:"justify-center mt-1 pa-0",attrs:{disabled:e.soloLectura,rules:[...e.rules.requerido],row:""},model:{value:e.femenino,callback:function(t){e.femenino=t},expression:"femenino"}},[t(u.A,{attrs:{color:"pink",value:"embarazada"},scopedSlots:e._u([{key:"label",fn:function(){return[t(s.A,{staticClass:"grey lighten-3 title v-chip-pointer",attrs:{"text-color":"black",selected:"embarazada"===e.femenino}},[t(i.A,{staticClass:"white"},[t(l.A,{attrs:{color:"pink"}},[e._v("pregnant_woman")])],1),e._v(" Embarazada ")],1)]},proxy:!0}],null,!1,4221442003)}),t(u.A,{attrs:{color:"orange",value:"puerpera"},scopedSlots:e._u([{key:"label",fn:function(){return[t(s.A,{staticClass:"grey lighten-3 title v-chip-pointer",attrs:{"text-color":"black",selected:"puerpera"===e.femenino}},[t(i.A,{staticClass:"white"},[t(l.A,{attrs:{color:"orange"}},[e._v("hotel")])],1),e._v(" Puerpera ")],1)]},proxy:!0}],null,!1,3376876821)}),t(u.A,{attrs:{color:"green",value:"no"},scopedSlots:e._u([{key:"label",fn:function(){return[t(s.A,{staticClass:"grey lighten-3 title v-chip-pointer",attrs:{"text-color":"black",selected:"no"===e.femenino}},[e._v(" Ninguna ")])]},proxy:!0}],null,!1,867095236)})],1)],1):e._e(),"embarazada"===e.femenino?t(n.A,{attrs:{xs12:"",sm6:"","px-3":""}},[t(p.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5",color:"terciary",label:"Semana de Embarazo",icon:"pregnant_woman",type:"number",rules:[...e.rules.requerido,...e.rules.soloNumero,e.rules.minNumber(1)],"validate-on-blur":""},model:{value:e.historial_unico.embarazada_semana,callback:function(t){e.$set(e.historial_unico,"embarazada_semana",t)},expression:"historial_unico.embarazada_semana"}})],1):e._e(),t(n.A,{attrs:{xs12:"","px-3":""}},[t(m.A,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","auto-grow":"",rows:"2",label:"Observacion General",color:"terciary","prepend-icon":"description"},model:{value:e.historial_unico.observacion,callback:function(t){e.$set(e.historial_unico,"observacion",t)},expression:"historial_unico.observacion"}})],1)],1)},f=[],g=a(95353),v={name:"formHistorial",props:["historial_unico","sexo","edad_years","refreshState","soloLectura"],components:{},data(){return{profesionalesDB:[],optionsJson:{opcZonasSanitarias:[],hiclem:{}},peso_nacer:"Entre 2500 y 3800 gr.",femenino:void 0}},computed:{...(0,g.aH)(["hoy","rules"])},watch:{async refreshState(e){e&&(this.femenino=void 0,this.peso_nacer="Entre 2500 y 3800 gr.",setTimeout((async()=>{this.optionsJson.opcZonasSanitarias=await this.returnOptionsJSON({key:"106",opcion:"opcZonasSanitarias"}),this.optionsJson.hiclem=await this.returnOptionsJSON({key:"hiclem",opcion:"base"})}),350))},peso_nacer(e){switch(e){case"Entre 2500 y 3800 gr.":delete this.historial_unico.peso_nacer_menor_2500,delete this.historial_unico.peso_nacer_mayor_3800;break;case"Menor a 2500 gr.":delete this.historial_unico.peso_nacer_mayor_3800,this.historial_unico.peso_nacer_menor_2500=!0;break;case"Mayor a 3800 gr.":delete this.historial_unico.peso_nacer_menor_2500,this.historial_unico.peso_nacer_mayor_3800=!0;break}},femenino(e){switch(e){case"puerpera":this.historial_unico.puerpera=!0,this.historial_unico.embarazada_semana="";break;case"embarazada":this.historial_unico.puerpera=null;break;default:this.historial_unico.puerpera=null,this.historial_unico.embarazada_semana="";break}}},methods:{...(0,g.i0)(["returnOptionsJSON"])}},y=v,b=a(81656),A=(0,b.A)(y,_,f,!1,null,null,null),x=A.exports},8805:function(e,t,a){a.d(t,{A:function(){return h}});var o=a(54582),i=a(89668),r=a(47971),s=a(61004),n=a(677),l=a(30050),c=a(88e3),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};function d(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}var h={name:"v-radio",mixins:[r.A,s.A,(0,c.W)("radio","v-radio","v-radio-group"),n.A],inheritAttrs:!1,props:{color:{type:String,default:"accent"},disabled:Boolean,label:String,onIcon:{type:String,default:"$vuetify.icons.radioOn"},offIcon:{type:String,default:"$vuetify.icons.radioOff"},readonly:Boolean,value:null},data:function(){return{isActive:!1,isFocused:!1,parentError:!1}},computed:{computedData:function(){return this.setTextColor(!this.parentError&&this.isActive&&this.color,{staticClass:"v-radio",class:u({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses)})},computedColor:function(){return this.isActive?this.color:this.radio.validationState||!1},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},hasState:function(){return this.isActive||!!this.radio.validationState},isDisabled:function(){return this.disabled||!!this.radio.disabled},isReadonly:function(){return this.readonly||!!this.radio.readonly}},mounted:function(){this.radio.register(this)},beforeDestroy:function(){this.radio.unregister(this)},methods:{genInput:function(){for(var e,t=arguments.length,a=Array(t),o=0;o<t;o++)a[o]=arguments[o];return(e=l.A.options.methods.genInput).call.apply(e,[this].concat(d(a)))},genLabel:function(){return this.$createElement(i.A,{on:{click:this.onChange},attrs:{for:this.id},props:{color:this.radio.validationState||"",dark:this.dark,focused:this.hasState,light:this.light}},this.$slots.label||this.label)},genRadio:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("radio",u({name:this.radio.name||!!this.radio._uid&&"v-radio-"+this.radio._uid,value:this.value},this.$attrs)),this.genRipple(this.setTextColor(this.computedColor)),this.$createElement(o.A,this.setTextColor(this.computedColor,{props:{dark:this.dark,light:this.light}}),this.computedIcon)])},onFocus:function(e){this.isFocused=!0,this.$emit("focus",e)},onBlur:function(e){this.isFocused=!1,this.$emit("blur",e)},onChange:function(){this.isDisabled||this.isReadonly||this.isDisabled||this.isActive&&this.radio.mandatory||this.$emit("change",this.value)},onKeydown:function(){}},render:function(e){return e("div",this.computedData,[this.genRadio(),this.genLabel()])}}},65582:function(e,t,a){a.d(t,{A:function(){return s}});a(82754);var o=a(70369),i=a(77798),r=a(88e3),s=o.A.extend({name:"v-radio-group",mixins:[i.A,(0,r.G)("radio")],model:{prop:"value",event:"change"},provide:function(){return{radio:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},mandatory:{type:Boolean,default:!0},name:String,row:Boolean,value:{default:null}},data:function(){return{internalTabIndex:-1,radios:[]}},computed:{classes:function(){return{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row}}},watch:{hasError:"setErrorState",internalValue:"setActiveRadio"},mounted:function(){this.setErrorState(this.hasError),this.setActiveRadio()},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{role:"radiogroup"}},o.A.options.methods.genDefaultSlot.call(this))},onRadioChange:function(e){this.disabled||(this.hasInput=!0,this.internalValue=e,this.setActiveRadio(),this.$nextTick(this.validate))},onRadioBlur:function(e){e.relatedTarget&&e.relatedTarget.classList.contains("v-radio")||(this.hasInput=!0,this.$emit("blur",e))},register:function(e){e.isActive=this.valueComparator(this.internalValue,e.value),e.$on("change",this.onRadioChange),e.$on("blur",this.onRadioBlur),this.radios.push(e)},setErrorState:function(e){for(var t=this.radios.length;--t>=0;)this.radios[t].parentError=e},setActiveRadio:function(){for(var e=this.radios.length;--e>=0;){var t=this.radios[e];t.isActive=this.valueComparator(this.internalValue,t.value)}},unregister:function(e){e.$off("change",this.onRadioChange),e.$off("blur",this.onRadioBlur);var t=this.radios.findIndex((function(t){return t===e}));t>-1&&this.radios.splice(t,1)}}})}}]);