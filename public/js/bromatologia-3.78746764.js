"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[212],{1188:(a,e,r)=>{r.r(e),r.d(e,{default:()=>B});var s=r(6194),i=r(8956),t=r(2353),o=r(5050),n=r(108),l=r(683),c=r(445),d=r(3667),u=r(9456),p=r(8143),m=function(){var a=this,e=a._self._c;return e(o.Z,{attrs:{"grid-list-xs":""}},[e(u.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(l.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(i.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(t.ZB,{staticClass:"px-0 text-uppercase"},[a._v("====== Bromatologia ======")])],1)],1),e(l.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(u.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","darken-2":""}},[e(l.Z,{attrs:{"px-3":""}},[e(d.Z,{attrs:{medium:"",color:"white",left:""}},[a._v("colorize")]),e("span",{staticClass:"title white--text"},[a._v("Validar Analisis")])],1),e(p.Cl),e(n.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),e(s.Z,{staticClass:"white--text",attrs:{round:"",to:{name:"BromatologiaBuscar"},color:"terciary darken-1",disabled:a.loading.estado,loading:a.loading.estado}},[a._v("Buscar Analisis")])],1),e(i.Z,{staticClass:"elevation-6"},[e(t.ZB,[e(c.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:a.valido,callback:function(e){a.valido=e},expression:"valido"}},[e("formValidar",{attrs:{analisis:a.analisis,persona:a.persona}})],1)],1),e(u.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","lighten-2":""}},[e(p.Cl),e(n.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),e(s.Z,{class:{"terciary darken-1":a.valido,"error darken-1":!a.valido},attrs:{round:"",dark:"",disabled:a.loading.estado,loading:a.loading.estado},on:{click:a.validar}},[a._v(" "+a._s(a.valido?"Validar Analisis":"Formulario No valido"))])],1)],1)],1)],1)],1)},h=[],g=(r(7658),r(629)),b=r(4618),x=r(5730),y=function(){var a=this,e=a._self._c;return e("div",[e(u.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(l.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"terciary darken-1"}},[e(t.ZB,{staticClass:"px-0 text-uppercase"},[a._v(" === Datos Generales === ")])],1)],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"","prepend-icon":"assignment",label:"# Orden",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.orden,callback:function(e){a.$set(a.analisis,"orden",e)},expression:"analisis.orden"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"assignment",label:"Fecha de Solicitud",type:"date",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.fec_solicitud,callback:function(e){a.$set(a.analisis,"fec_solicitud",e)},expression:"analisis.fec_solicitud"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"assignment",label:"# Muestra",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.muestra,callback:function(e){a.$set(a.analisis,"muestra",e)},expression:"analisis.muestra"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"assignment",label:"Fecha de Inspeccion",type:"date",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.fec_inspeccion,callback:function(e){a.$set(a.analisis,"fec_inspeccion",e)},expression:"analisis.fec_inspeccion"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"","prepend-icon":"assignment",label:"# Expediente",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.expediente,callback:function(e){a.$set(a.analisis,"expediente",e)},expression:"analisis.expediente"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"assignment",label:"Fecha de Resultado",type:"date",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.fec_resultado,callback:function(e){a.$set(a.analisis,"fec_resultado",e)},expression:"analisis.fec_resultado"}})],1),e(l.Z,{attrs:{xs12:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"person",label:"Inspector",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.inspector,callback:function(e){a.$set(a.analisis,"inspector",e)},expression:"analisis.inspector"}})],1),e(l.Z,{attrs:{xs12:"","px-3":""}},[e(x.Z,{attrs:{readonly:"","auto-grow":"",rows:"2","prepend-icon":"description",label:"Observacion",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.observacion,callback:function(e){a.$set(a.analisis,"observacion",e)},expression:"analisis.observacion"}})],1),e(l.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"terciary darken-1"}},[e(t.ZB,{staticClass:"px-0 text-uppercase"},[a._v(" === Datos Especiales === ")])],1)],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"colorize",label:"Tipo de Analisis",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.tipo_analisis,callback:function(e){a.$set(a.analisis,"tipo_analisis",e)},expression:"analisis.tipo_analisis"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"fas fa-archway",label:"Origen",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.origen,callback:function(e){a.$set(a.analisis,"origen",e)},expression:"analisis.origen"}})],1),"Fisico-Quimico"===a.analisis.tipo_analisis?e(u.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"search",label:"Fuente de Analisis",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.fuente_analisis,callback:function(e){a.$set(a.analisis,"fuente_analisis",e)},expression:"analisis.fuente_analisis"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"invert_colors_on",label:"Color",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.color,callback:function(e){a.$set(a.analisis,"color",e)},expression:"analisis.color"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"graphic_eq",label:"Olor",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.olor,callback:function(e){a.$set(a.analisis,"olor",e)},expression:"analisis.olor"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"pie_chart",label:"Aspecto",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.aspecto,callback:function(e){a.$set(a.analisis,"aspecto",e)},expression:"analisis.aspecto"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":Number(a.analisis.ph).toFixed(2)<6.5||7.5<Number(a.analisis.ph).toFixed(2)},attrs:{readonly:"",rules:a.requerido,"prepend-icon":"PH",label:"PH",type:"number",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.ph,callback:function(e){a.$set(a.analisis,"ph",e)},expression:"analisis.ph"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":45<Number(a.analisis.nitratos).toFixed(2)},attrs:{readonly:"",rules:a.requerido,"prepend-icon":"grain",label:"Nitratos (mg/L)",type:"number",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.nitratos,callback:function(e){a.$set(a.analisis,"nitratos",e)},expression:"analisis.nitratos"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":.1<Number(a.analisis.nitritos).toFixed(2)},attrs:{readonly:"","prepend-icon":"grain",label:"Nitritos (mg/L)",type:"number",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.nitritos,callback:function(e){a.$set(a.analisis,"nitritos",e)},expression:"analisis.nitritos"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":400<Number(a.analisis.sulfato).toFixed(2)},attrs:{readonly:"",rules:a.requerido,"prepend-icon":"grain",label:"Sulfato (mg/L)",type:"number",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.sulfato,callback:function(e){a.$set(a.analisis,"sulfato",e)},expression:"analisis.sulfato"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":.01<Number(a.analisis.arsenico).toFixed(2)},attrs:{readonly:"",rules:a.requerido,"prepend-icon":"AS",label:"Arsenico (mg/L)",type:"number",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.arsenico,callback:function(e){a.$set(a.analisis,"arsenico",e)},expression:"analisis.arsenico"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":250<Number(a.analisis.cloruros).toFixed(2)},attrs:{readonly:"",rules:a.requerido,"prepend-icon":"CL",label:"Cloruros (mg/L)",type:"number",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.cloruros,callback:function(e){a.$set(a.analisis,"cloruros",e)},expression:"analisis.cloruros"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":400<Number(a.analisis.dureza).toFixed(2)},attrs:{readonly:"",rules:a.requerido,"prepend-icon":"texture",label:"Dureza (mg CaCO3/L)",type:"number",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.dureza,callback:function(e){a.$set(a.analisis,"dureza",e)},expression:"analisis.dureza"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":400<Number(a.analisis.alcalinidad).toFixed(2)},attrs:{readonly:"",rules:a.requerido,"prepend-icon":"radio_button_checked",label:"Alcalinidad (mg CaCO3/L)",type:"number",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.alcalinidad,callback:function(e){a.$set(a.analisis,"alcalinidad",e)},expression:"analisis.alcalinidad"}})],1)],1):a._e(),"Bacteriologico"===a.analisis.tipo_analisis?e(u.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{attrs:{readonly:"",rules:a.requerido,"prepend-icon":"search",label:"Fuente de Analisis",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.fuente_analisis,callback:function(e){a.$set(a.analisis,"fuente_analisis",e)},expression:"analisis.fuente_analisis"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":">500"===a.analisis.mesofilas},attrs:{readonly:"","prepend-icon":"exposure",label:"Bacterias mesofilas en agar",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.mesofilas,callback:function(e){a.$set(a.analisis,"mesofilas",e)},expression:"analisis.mesofilas"}})],1),e(l.Z,{attrs:{id:"italic",xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":"Contiene"===a.analisis.echerihia},attrs:{readonly:"","prepend-icon":"bug_report",label:"Escherichia coli",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.echerihia,callback:function(e){a.$set(a.analisis,"echerihia",e)},expression:"analisis.echerihia"}})],1),e(l.Z,{attrs:{id:"italic",xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":"Contiene"===a.analisis.pseudomonaAeruginosa},attrs:{readonly:"","prepend-icon":"bug_report",label:"Pseudomona aeruginosa",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.pseudomonaAeruginosa,callback:function(e){a.$set(a.analisis,"pseudomonaAeruginosa",e)},expression:"analisis.pseudomonaAeruginosa"}})],1),e(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b.h,{class:{"background-color: error lighten-1":3<Number(a.analisis.coliformes).toFixed(2)},attrs:{readonly:"","prepend-icon":"bug_report",label:"Bacterias coliformes",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.coliformesFormato,callback:function(e){a.coliformesFormato=e},expression:"coliformesFormato"}})],1),e(l.Z,{attrs:{xs0:"",sm6:""}})],1):a._e(),"Alimento"===a.analisis.tipo_analisis?e(u.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(l.Z,{attrs:{xs12:"","px-3":""}},[e(x.Z,{attrs:{readonly:"","auto-grow":"",rows:"2","prepend-icon":"description",label:"Observacion del Alimento",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:a.analisis.observacionAlimento,callback:function(e){a.$set(a.analisis,"observacionAlimento",e)},expression:"analisis.observacionAlimento"}})],1)],1):a._e(),e(l.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"terciary darken-1"}},[e(t.ZB,{staticClass:"px-0 text-uppercase"},[a._v(" === Conclusion === ")])],1)],1),e(l.Z,{attrs:{xs12:"","mx-3":"","my-4":""}},[e(x.Z,{attrs:{rules:a.requerido,label:"Conclusion",color:"terciary","background-color":"terciary lighten-5","prepend-icon":"description",clearable:""},model:{value:a.analisis.conclusion,callback:function(e){a.$set(a.analisis,"conclusion",e)},expression:"analisis.conclusion"}})],1)],1)],1)},f=[];const v={name:"formValidar",props:["analisis","persona"],data(){return{requerido:[a=>a&&""!==a.trim()||"Este campo es requerido."]}},computed:{coliformesFormato:function(){return this.analisis.coliformes?Number(this.analisis.coliformes)<3?"<3":this.analisis.coliformes:""}}},k=v;var _=r(1001),Z=(0,_.Z)(k,y,f,!1,null,null,null);const w=Z.exports,$={name:"analisisValidar",components:{formValidar:w},data(){return{valido:!0,analisis:{orden:"",origen:"",muestra:"",expediente:"",titular:"",rubro:"",dir_calle:"",dir_numero:"",dir_entre:"",dir_barrio:"",telefono:"",inspector:"",fec_solicitud:"",fec_inspeccion:"",fec_resultado:"",observacion:"",tipo_analisis:"",fuente_analisis:"",conclusion:"LA MUESTRA CUMPLE/NO CUMPLE CON LOS CRITERIOS DE POTABILIDAD SEGÚN EL CÓDIGO ALIMENTARIO ARGENTINO (CAA).",mesofilas:"",coliformes:"",echerihia:"",pseudomonaAeruginosa:"",color:"",olor:"",aspecto:"",ph:"",nitratos:"",nitritos:"",sulfato:"",arsenico:"",cloruros:"",dureza:"",alcalinidad:"",observacionAlimento:"",estado:!0}}},computed:{...(0,g.rn)(["APIURL","axiosConfig","loading","persona"])},created(){let{id:a}=this.$route.params;this.cargarAnalisis(a)},methods:{...(0,g.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),async cargarAnalisis(a){try{this.mostrarLoading({titulo:"Cargando datos...",color:"primary"});let r=await this.axios.get(this.APIURL+"/bromatologia/buscar/"+a,this.axiosConfig);if(r.data.ok)for(const a in r.data.analisis)r.data.analisis.hasOwnProperty(a)&&("conclusion"!==a||r.data.analisis[a])&&("fec_inspeccion"===a||"fec_resultado"===a||"fec_solicitud"===a||"fec_verificado"===a?this.analisis[a]=this.mostrarFecha(r.data.analisis[a]):"number"===typeof r.data.analisis[a]||"boolean"===typeof r.data.analisis[a]?this.analisis[a]=r.data.analisis[a].toString():this.analisis[a]=r.data.analisis[a]);else try{this.mostrarError({errores:"",mensaje:r.data.err.message,titulo:r.status})}catch(e){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(e){try{this.mostrarError({errores:e.response.data.err.errors,mensaje:e.response.data.err.message,titulo:e.response.status})}catch(e){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}this.$router.push({name:"BromatologiaBuscar"})}finally{this.ocultarLoading()}},async validar(){if(this.$refs.form.validate()){if(await this.$root.$confirm.open({titulo:"VALIDAR",msj:["Verifique que todos los datos esten cargados correctamente,\nuna vez Validado no se podra modificar.","Los Analisis Validados se podran descargar/imprimir, ademas de ser visibles para los usuarios con permiso de solo lectura.\n¿Desea continuar?"]}))try{this.mostrarLoading({titulo:"Validando Analisis...",color:"primary"});let e=await this.axios.put(this.APIURL+"/bromatologia/validar/"+this.analisis.id,this.analisis,this.axiosConfig);if(e.data.ok)this.analisis.usuario_verifico={},this.analisis.usuario_verifico.nombreC=this.persona.nombreC,this.analisis.fec_verificado=new Date,this.analisis.conclusion=this.analisis.conclusion,this.mostrarMensaje({msj:"Validacion efectuada exitosamente.",titulo:"Validacion Exitosa"}),this.$router.push({name:"BromatologiaBuscar"});else try{this.mostrarError({errores:"",mensaje:e.data.err.message,titulo:e.status})}catch(a){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(a){try{this.mostrarError({errores:a.response.data.err.errors,mensaje:a.response.data.err.message,titulo:a.response.status})}catch(a){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}finally{this.ocultarLoading()}}else this.mostrarError({errores:"",mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."})}}},A=$;var C=(0,_.Z)(A,m,h,!1,null,null,null);const B=C.exports},445:(a,e,r)=>{r.d(e,{Z:()=>i});var s=r(21);const i={name:"v-form",mixins:[(0,s.J)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var a=Object.values(this.errorBag).includes(!0);this.$emit("input",!a)},deep:!0,immediate:!0}},methods:{watchInput:function(a){var e=this,r=function(a){return a.$watch("hasError",(function(r){e.$set(e.errorBag,a._uid,r)}),{immediate:!0})},s={_uid:a._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?s.shouldValidate=a.$watch("shouldValidate",(function(i){i&&(e.errorBag.hasOwnProperty(a._uid)||(s.valid=r(a)))})):s.valid=r(a),s},validate:function(){var a=this.inputs.filter((function(a){return!a.validate(!0)})).length;return!a},reset:function(){for(var a=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout((function(){a.errorBag={}}),0)},resetValidation:function(){for(var a=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout((function(){a.errorBag={}}),0)},register:function(a){var e=this.watchInput(a);this.inputs.push(a),this.watchers.push(e)},unregister:function(a){var e=this.inputs.find((function(e){return e._uid===a._uid}));if(e){var r=this.watchers.find((function(a){return a._uid===e._uid}));r.valid&&r.valid(),r.shouldValidate&&r.shouldValidate(),this.watchers=this.watchers.filter((function(a){return a._uid!==e._uid})),this.inputs=this.inputs.filter((function(a){return a._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(a){var e=this;return a("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(a){return e.$emit("submit",a)}}},this.$slots.default)}}}}]);