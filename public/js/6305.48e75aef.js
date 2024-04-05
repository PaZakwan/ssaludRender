"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[6305],{56305:(t,e,a)=>{a.d(e,{Z:()=>Z});var o=a(67416),i=a(16579),r=a(77441),s=a(73089),n=a(60683),l=a(73667),c=a(59456),u=a(70918),d=a(58459),h=a(14036),p=a(25730),m=function(){var t=this,e=t._self._c;return e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(o.Z,{attrs:{readonly:t.soloLectura,clearable:!t.soloLectura,"background-color":t.soloLectura?"terciary":"terciary lighten-5",items:t.optionsJson.opcZonasSanitarias,"item-value":"description","item-text":"description",label:"Zona Sanitaria","prepend-icon":"fa-solid fa-house-medical-flag",color:"terciary",rules:[...t.rules.requerido]},on:{"click:clear":function(e){t.$nextTick((()=>t.historial_unico.zona_sanitaria=null))}},model:{value:t.historial_unico.zona_sanitaria,callback:function(e){t.$set(t.historial_unico,"zona_sanitaria",e)},expression:"historial_unico.zona_sanitaria"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}}),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(r.Z,{attrs:{readonly:t.soloLectura,"background-color":t.soloLectura?"terciary":"",color:"terciary","prepend-icon":"fa-solid fa-baby"},scopedSlots:t._u([{key:"label",fn:function(){return[e("span",{class:{"terciary--text":t.historial_unico.prematuro}},[t._v("Prematuro: "+t._s(t.historial_unico.prematuro?"Si":"No"))])]},proxy:!0}]),model:{value:t.historial_unico.prematuro,callback:function(e){t.$set(t.historial_unico,"prematuro",e)},expression:"historial_unico.prematuro"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(h.r,{attrs:{readonly:t.soloLectura,"background-color":t.soloLectura?"terciary":"terciary lighten-5",items:["Entre 2500 y 3800 gr.","Menor a 2500 gr.","Mayor a 3800 gr."],label:"Peso al Nacer [gr]","prepend-icon":"fas fa-weight",color:"terciary"},model:{value:t.peso_nacer,callback:function(e){t.peso_nacer=e},expression:"peso_nacer"}})],1),e(n.Z,{attrs:{xs12:"","px-3":""}},[e(h.r,{attrs:{readonly:t.soloLectura,clearable:!t.soloLectura,"background-color":t.soloLectura?"terciary":"terciary lighten-5",items:t.optionsJson.hiclem.consulta_antecedentes,label:"Antecedentes Patologicos","prepend-icon":"fas fa-diagnoses",color:"terciary",multiple:"",chips:"","deletable-chips":""},model:{value:t.historial_unico.antecedentes_patologicos,callback:function(e){t.$set(t.historial_unico,"antecedentes_patologicos",e)},expression:"historial_unico.antecedentes_patologicos"}})],1),e(n.Z,{staticClass:"text-xs-center grey lighten-4",attrs:{xs12:"",md4:"","px-3":""}},[e(s.Z,{staticClass:"grey lighten-3 title",attrs:{"text-color":"black",selected:""}},[e(i.Z,{staticClass:"white"},[e(l.Z,{attrs:{color:"cyan"}},[t._v("gpp_maybe")])],1),t._v(" Inmunodeprimida ")],1),e(d.Z,{staticClass:"justify-center mt-1 pa-0",attrs:{disabled:t.soloLectura,rules:[...t.rules.requerido],row:""},model:{value:t.historial_unico.inmunodeprimida,callback:function(e){t.$set(t.historial_unico,"inmunodeprimida",e)},expression:"historial_unico.inmunodeprimida"}},[e(u.Z,{attrs:{label:"No",color:"red",value:!1}}),e(u.Z,{attrs:{label:"Si",color:"success",value:!0}})],1)],1),e(n.Z,{staticClass:"text-xs-center grey lighten-4",attrs:{xs12:"",md4:"","px-3":""}},[e(s.Z,{staticClass:"grey lighten-3 title",attrs:{"text-color":"black",selected:""}},[e(i.Z,{staticClass:"white"},[e(l.Z,{attrs:{color:"brown"}},[t._v("smoking_rooms")])],1),t._v(" Fuma ")],1),e(d.Z,{staticClass:"justify-center mt-1 pa-0",attrs:{disabled:t.soloLectura,rules:[...t.rules.requerido],row:""},model:{value:t.historial_unico.fuma,callback:function(e){t.$set(t.historial_unico,"fuma",e)},expression:"historial_unico.fuma"}},[e(u.Z,{attrs:{label:"No",color:"red",value:!1}}),e(u.Z,{attrs:{label:"Si",color:"success",value:!0}})],1)],1),e(n.Z,{staticClass:"text-xs-center grey lighten-4",attrs:{xs12:"",md4:"","px-3":""}},[e(s.Z,{staticClass:"grey lighten-3 title",attrs:{"text-color":"black",selected:""}},[e(i.Z,{staticClass:"white"},[e(l.Z,{attrs:{color:"purple"}},[t._v("warning")])],1),t._v(" Grupo de Riesgo ")],1),e(d.Z,{staticClass:"justify-center mt-1 pa-0",attrs:{disabled:t.soloLectura,rules:[...t.rules.requerido],row:""},model:{value:t.historial_unico.riesgo,callback:function(e){t.$set(t.historial_unico,"riesgo",e)},expression:"historial_unico.riesgo"}},[e(u.Z,{attrs:{label:"No",color:"red",value:!1}}),e(u.Z,{attrs:{label:"Si",color:"success",value:!0}})],1)],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":"","mt-3":""}},[e(r.Z,{staticClass:"mt-1",attrs:{readonly:t.soloLectura,"background-color":t.soloLectura?"terciary":"",color:"terciary","prepend-icon":"fa-solid fa-hospital-user"},scopedSlots:t._u([{key:"label",fn:function(){return[e("span",{class:{"terciary--text":t.historial_unico.personal_salud}},[t._v("Personal de Salud: "+t._s(t.historial_unico.personal_salud?"Si":"No"))])]},proxy:!0}]),model:{value:t.historial_unico.personal_salud,callback:function(e){t.$set(t.historial_unico,"personal_salud",e)},expression:"historial_unico.personal_salud"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":"","mt-3":""}},[e(r.Z,{staticClass:"mt-1",attrs:{readonly:t.soloLectura,"background-color":t.soloLectura?"terciary":"",color:"terciary","prepend-icon":"engineering"},scopedSlots:t._u([{key:"label",fn:function(){return[e("span",{class:{"terciary--text":t.historial_unico.personal_esencial}},[t._v("Personal de Esencial: "+t._s(t.historial_unico.personal_esencial?"Si":"No"))])]},proxy:!0}]),model:{value:t.historial_unico.personal_esencial,callback:function(e){t.$set(t.historial_unico,"personal_esencial",e)},expression:"historial_unico.personal_esencial"}})],1),"Femenino"===t.sexo?e(n.Z,{staticClass:"text-xs-center grey lighten-4",attrs:{xs12:"","px-3":""}},[e(d.Z,{staticClass:"justify-center mt-1 pa-0",attrs:{disabled:t.soloLectura,rules:[...t.rules.requerido],row:""},model:{value:t.femenino,callback:function(e){t.femenino=e},expression:"femenino"}},[e(u.Z,{attrs:{color:"pink",value:"embarazada"},scopedSlots:t._u([{key:"label",fn:function(){return[e(s.Z,{staticClass:"grey lighten-3 title",attrs:{"text-color":"black",selected:"embarazada"===t.femenino}},[e(i.Z,{staticClass:"white"},[e(l.Z,{attrs:{color:"pink"}},[t._v("pregnant_woman")])],1),t._v(" Embarazada ")],1)]},proxy:!0}],null,!1,67125772)}),e(u.Z,{attrs:{color:"orange",value:"puerpera"},scopedSlots:t._u([{key:"label",fn:function(){return[e(s.Z,{staticClass:"grey lighten-3 title",attrs:{"text-color":"black",selected:"puerpera"===t.femenino}},[e(i.Z,{staticClass:"white"},[e(l.Z,{attrs:{color:"orange"}},[t._v("hotel")])],1),t._v(" Puerpera ")],1)]},proxy:!0}],null,!1,1586065034)}),e(u.Z,{attrs:{color:"green",value:"no"},scopedSlots:t._u([{key:"label",fn:function(){return[e(s.Z,{staticClass:"grey lighten-3 title",attrs:{"text-color":"black",selected:"no"===t.femenino}},[t._v(" Ninguna ")])]},proxy:!0}],null,!1,1488177595)})],1)],1):t._e(),t.historial_unico.embarazada||"embarazada"===t.femenino?e(n.Z,{attrs:{xs12:"","px-3":""}},[e("dateSelect",{attrs:{soloLectura:t.soloLectura,clearable:!t.soloLectura,color:"terciary",label:"Inicio Embarazo",icon:"pregnant_woman",value:t.historial_unico.embarazada,max:t.hoy,requerido:"true"},model:{value:t.historial_unico.embarazada,callback:function(e){t.$set(t.historial_unico,"embarazada",e)},expression:"historial_unico.embarazada"}})],1):t._e(),e(n.Z,{attrs:{xs12:"","px-3":""}},[e(p.Z,{attrs:{readonly:t.soloLectura,clearable:!t.soloLectura,"background-color":t.soloLectura?"terciary":"terciary lighten-5","auto-grow":"",rows:"2",label:"Observacion General",color:"terciary","prepend-icon":"description"},model:{value:t.historial_unico.observacion,callback:function(e){t.$set(t.historial_unico,"observacion",e)},expression:"historial_unico.observacion"}})],1)],1)},_=[],f=a(20629),g=a(27720);const v={name:"formHistorial",props:["historial_unico","sexo","refreshState","soloLectura"],components:{dateSelect:g.Z},data(){return{profesionalesDB:[],optionsJson:{opcZonasSanitarias:[],hiclem:{}},peso_nacer:"Entre 2500 y 3800 gr.",femenino:void 0}},computed:{...(0,f.rn)(["hoy","rules"])},watch:{async refreshState(t){t&&(this.femenino=void 0,this.peso_nacer="Entre 2500 y 3800 gr.",setTimeout((async()=>{this.optionsJson.opcZonasSanitarias=await this.returnOptionsJSON({key:"106",opcion:"opcZonasSanitarias"}),this.optionsJson.hiclem=await this.returnOptionsJSON({key:"hiclem",opcion:"base"}),this.profesionalesDB=await this.cargarProfesionalesBusqueda()}),350))},peso_nacer(t){switch(t){case"Entre 2500 y 3800 gr.":delete this.historial_unico.peso_nacer_menor_2500,delete this.historial_unico.peso_nacer_mayor_3800;break;case"Menor a 2500 gr.":delete this.historial_unico.peso_nacer_mayor_3800,this.historial_unico.peso_nacer_menor_2500=!0;break;case"Mayor a 3800 gr.":delete this.historial_unico.peso_nacer_menor_2500,this.historial_unico.peso_nacer_mayor_3800=!0;break}},femenino(t){switch(t){case"puerpera":this.historial_unico.puerpera=!0,this.historial_unico.embarazada=null;break;case"embarazada":this.historial_unico.puerpera=null;break;default:this.historial_unico.puerpera=null,this.historial_unico.embarazada=null;break}}},methods:{...(0,f.nv)(["returnOptionsJSON"]),...(0,f.nv)("profesional",["cargarProfesionalesBusqueda"])}},b=v;var y=a(1001),x=(0,y.Z)(b,m,_,!1,null,null,null);const Z=x.exports},70918:(t,e,a)=>{a.d(e,{Z:()=>h});var o=a(99524),i=a(34692),r=a(75766),s=a(38197),n=a(75721),l=a(69489),c=a(30021),u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(t[o]=a[o])}return t};function d(t){if(Array.isArray(t)){for(var e=0,a=Array(t.length);e<t.length;e++)a[e]=t[e];return a}return Array.from(t)}const h={name:"v-radio",mixins:[r.Z,s.Z,(0,c.f)("radio","v-radio","v-radio-group"),n.Z],inheritAttrs:!1,props:{color:{type:String,default:"accent"},disabled:Boolean,label:String,onIcon:{type:String,default:"$vuetify.icons.radioOn"},offIcon:{type:String,default:"$vuetify.icons.radioOff"},readonly:Boolean,value:null},data:function(){return{isActive:!1,isFocused:!1,parentError:!1}},computed:{computedData:function(){return this.setTextColor(!this.parentError&&this.isActive&&this.color,{staticClass:"v-radio",class:u({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses)})},computedColor:function(){return this.isActive?this.color:this.radio.validationState||!1},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},hasState:function(){return this.isActive||!!this.radio.validationState},isDisabled:function(){return this.disabled||!!this.radio.disabled},isReadonly:function(){return this.readonly||!!this.radio.readonly}},mounted:function(){this.radio.register(this)},beforeDestroy:function(){this.radio.unregister(this)},methods:{genInput:function(){for(var t,e=arguments.length,a=Array(e),o=0;o<e;o++)a[o]=arguments[o];return(t=l.Z.options.methods.genInput).call.apply(t,[this].concat(d(a)))},genLabel:function(){return this.$createElement(i.Z,{on:{click:this.onChange},attrs:{for:this.id},props:{color:this.radio.validationState||"",dark:this.dark,focused:this.hasState,light:this.light}},this.$slots.label||this.label)},genRadio:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("radio",u({name:this.radio.name||!!this.radio._uid&&"v-radio-"+this.radio._uid,value:this.value},this.$attrs)),this.genRipple(this.setTextColor(this.computedColor)),this.$createElement(o.Z,this.setTextColor(this.computedColor,{props:{dark:this.dark,light:this.light}}),this.computedIcon)])},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onChange:function(){this.isDisabled||this.isReadonly||this.isDisabled||this.isActive&&this.radio.mandatory||this.$emit("change",this.value)},onKeydown:function(){}},render:function(t){return t("div",this.computedData,[this.genRadio(),this.genLabel()])}}},58459:(t,e,a)=>{a.d(e,{Z:()=>s});a(33782);var o=a(49204),i=a(73112),r=a(30021);const s=o.Z.extend({name:"v-radio-group",mixins:[i.Z,(0,r.J)("radio")],model:{prop:"value",event:"change"},provide:function(){return{radio:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},mandatory:{type:Boolean,default:!0},name:String,row:Boolean,value:{default:null}},data:function(){return{internalTabIndex:-1,radios:[]}},computed:{classes:function(){return{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row}}},watch:{hasError:"setErrorState",internalValue:"setActiveRadio"},mounted:function(){this.setErrorState(this.hasError),this.setActiveRadio()},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{role:"radiogroup"}},o.Z.options.methods.genDefaultSlot.call(this))},onRadioChange:function(t){this.disabled||(this.hasInput=!0,this.internalValue=t,this.setActiveRadio(),this.$nextTick(this.validate))},onRadioBlur:function(t){t.relatedTarget&&t.relatedTarget.classList.contains("v-radio")||(this.hasInput=!0,this.$emit("blur",t))},register:function(t){t.isActive=this.valueComparator(this.internalValue,t.value),t.$on("change",this.onRadioChange),t.$on("blur",this.onRadioBlur),this.radios.push(t)},setErrorState:function(t){for(var e=this.radios.length;--e>=0;)this.radios[e].parentError=t},setActiveRadio:function(){for(var t=this.radios.length;--t>=0;){var e=this.radios[t];e.isActive=this.valueComparator(this.internalValue,e.value)}},unregister:function(t){t.$off("change",this.onRadioChange),t.$off("blur",this.onRadioBlur);var e=this.radios.findIndex((function(e){return e===t}));e>-1&&this.radios.splice(e,1)}}})}}]);