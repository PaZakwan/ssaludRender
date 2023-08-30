"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[590],{7685:function(e,a,i){i.r(a),i.d(a,{default:function(){return _}});var t=i(6194),s=i(8956),r=i(2353),o=i(5050),n=i(108),l=i(683),c=i(445),u=i(3667),d=i(9456),p=i(8143),m=function(){var e=this,a=e._self._c;return a(o.Z,{attrs:{"grid-list-xs":""}},[a(d.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[a(l.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[a(s.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[a(r.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Bromatologia ======")])],1)],1),a(l.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[a(d.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","darken-2":""}},[a(l.Z,{attrs:{"px-3":""}},[a(u.Z,{attrs:{medium:"",color:"white",left:""}},[e._v("colorize")]),a("span",{staticClass:"title white--text"},[e._v("Crear Analisis")])],1),a(p.Cl),a(n.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),a(t.Z,{staticClass:"white--text",attrs:{round:"",to:{name:"BromatologiaBuscar"},color:"terciary darken-1",disabled:e.loading.estado,loading:e.loading.estado}},[a(u.Z,{attrs:{color:"white",left:""}},[e._v("search")]),e._v("Buscar Analisis")],1)],1),a(s.Z,{staticClass:"elevation-6"},[a(r.ZB,[a(c.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valido,callback:function(a){e.valido=a},expression:"valido"}},[a("formAnalisis",{attrs:{analisis:e.analisis,crear:!0,persona:e.persona}})],1)],1),a(d.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","lighten-2":""}},[a(p.Cl),a(n.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),a(t.Z,{class:{"terciary darken-1":e.valido,"error darken-1":!e.valido},attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.crear}},[e._v(" "+e._s(e.valido?"Crear Analisis":"Formulario No valido"))])],1)],1)],1)],1)],1)},h=[],f=(i(7658),i(629)),b=i(7413),g={name:"analisisCrear",components:{formAnalisis:b.Z},data(){return{valido:!0,analisis:{orden:"",origen:"",titular:"",rubro:"",dir_calle:"",dir_numero:"",dir_entre:"",dir_barrio:"",telefono:"",fec_solicitud:"",fec_inspeccion:"",tipo_analisis:"",mesofilas:"",coliformes:"",echerihia:"",pseudomonaAeruginosa:"",color:"",olor:"",aspecto:"",ph:"",nitratos:"",nitritos:"",sulfato:"",arsenico:"",cloruros:"",dureza:"",alcalinidad:"",observacionAlimento:"",estado:!0},Bacteriologico:["mesofilas","coliformes","echerihia","pseudomonaAeruginosa"],fisico_quimico:["color","olor","aspecto","ph","nitratos","nitritos","sulfato","arsenico","cloruros","dureza","alcalinidad"],Alimento:["observacionAlimento"]}},computed:{...(0,f.rn)(["APIURL","axiosConfig","loading","persona"])},methods:{...(0,f.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),async crear(){if(this.$refs.form.validate()){let a=Object.assign({},this.analisis);"Bacteriologico"===a.tipo_analisis&&(this.fisico_quimico.forEach((e=>{delete a[e]})),this.Alimento.forEach((e=>{delete a[e]}))),"Fisico-Quimico"===a.tipo_analisis&&(this.Bacteriologico.forEach((e=>{delete a[e]})),this.Alimento.forEach((e=>{delete a[e]}))),"Alimento"===a.tipo_analisis&&(this.Bacteriologico.forEach((e=>{delete a[e]})),this.fisico_quimico.forEach((e=>{delete a[e]})));try{this.mostrarLoading({titulo:"Enviando datos...",color:"primary"});let i=await this.axios.post(this.APIURL+"/bromatologia",a,this.axiosConfig);if(i.data.ok){this.mostrarMensaje({msj:["Analisis creado exitosamente.","<##> Nro de ORDEN: "+i.data.analisis.orden.toString()+"<##>"],titulo:"Registro Exitoso"});for(let e in this.analisis)this.analisis.hasOwnProperty(e)&&(this.analisis[e]="","estado"===e&&(this.analisis[e]=!0));this.$refs.form.resetValidation(),this.$router.push({name:"BromatologiaBuscar"})}else try{this.mostrarError({errores:"",mensaje:i.data.err.message,titulo:i.status})}catch(e){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(e){try{this.mostrarError({errores:e.response.data.err.errors,mensaje:e.response.data.err.message,titulo:e.response.status})}catch(e){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}finally{this.ocultarLoading()}}else this.mostrarError({errores:"",mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."})}}},v=g,x=i(1001),y=(0,x.Z)(v,m,h,!1,null,null,null),_=y.exports},7498:function(e,a,i){i.r(a),i.d(a,{default:function(){return F}});var t=i(6194),s=i(8956),r=i(2353),o=i(5050),n=i(108),l=i(683),c=i(445),u=i(3667),d=i(9456),p=i(8143),m=i(5730),h=function(){var e=this,a=e._self._c;return a(o.Z,{attrs:{"grid-list-xs":""}},[a(d.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[a(l.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[a(s.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[a(r.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Bromatologia ======")])],1)],1),a(l.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[a(d.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","darken-2":""}},[a(l.Z,{attrs:{"px-3":""}},[a(u.Z,{attrs:{medium:"",color:"white",left:""}},[e._v("colorize")]),a("span",{staticClass:"title white--text"},[e._v("Editar Analisis")])],1),a(p.Cl),a(n.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),a(t.Z,{staticClass:"white--text",attrs:{round:"",to:{name:"BromatologiaBuscar"},color:"terciary darken-1",disabled:e.loading.estado,loading:e.loading.estado}},[e._v("Buscar Analisis")])],1),a(s.Z,{staticClass:"elevation-6"},[a(r.ZB,[a(c.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valido,callback:function(a){e.valido=a},expression:"valido"}},[a("formAnalisis",{attrs:{analisis:e.analisis,crear:!1,persona:e.persona}}),a("formBacteriologico",{attrs:{analisis:e.analisis,crear:!1}}),a("formFisicoQuimico",{attrs:{analisis:e.analisis,crear:!1}}),a("formAlimento",{attrs:{analisis:e.analisis,crear:!1}}),e.editValidado?a(l.Z,{attrs:{xs12:"","ma-2":""}},[a(s.Z,{attrs:{dark:"",color:"terciary darken-1"}},[a(r.ZB,{staticClass:"px-0 text-uppercase"},[e._v(" === Conclusion === ")])],1)],1):e._e(),e.editValidado?a(l.Z,{attrs:{xs12:"","mx-3":"","my-4":""}},[a(m.Z,{attrs:{rules:e.requerido,label:"Conclusion",color:"terciary","background-color":"terciary lighten-5","prepend-icon":"description",clearable:""},model:{value:e.analisis.conclusion,callback:function(a){e.$set(e.analisis,"conclusion",a)},expression:"analisis.conclusion"}})],1):e._e()],1)],1),a(d.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","lighten-2":""}},[a(p.Cl),a(n.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),a(t.Z,{class:{"terciary darken-1":e.valido,"error darken-1":!e.valido},attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.editar}},[e._v(" "+e._s(e.valido?"Editar Analisis":"Formulario No valido"))])],1)],1)],1)],1)],1)},f=[],b=(i(7658),i(629)),g=i(7413),v=i(4036),x=i(4618),y=function(){var e=this,a=e._self._c;return a("div",["Bacteriologico"!==e.analisis.tipo_analisis||e.crear?e._e():a(d.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(v.r,{attrs:{rules:e.requerido,items:e.fuenteAnalisis,label:"Fuente de Analisis","prepend-icon":"search",color:"terciary","background-color":"terciary lighten-5"},model:{value:e.analisis.fuente_analisis,callback:function(a){e.$set(e.analisis,"fuente_analisis",a)},expression:"analisis.fuente_analisis"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(v.r,{attrs:{"item-value":"valor","item-text":"label",items:e.positivoNegativoOpcional,label:"Bacterias mesofilas en agar","prepend-icon":"exposure",color:"terciary","background-color":"terciary lighten-5"},model:{value:e.analisis.mesofilas,callback:function(a){e.$set(e.analisis,"mesofilas",a)},expression:"analisis.mesofilas"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(v.r,{staticClass:"v-label--italic",attrs:{"item-value":"valor","item-text":"label",items:e.contieneNocontieneOpcional,label:"Escherichia coli","prepend-icon":"bug_report",color:"terciary","background-color":"terciary lighten-5"},model:{value:e.analisis.echerihia,callback:function(a){e.$set(e.analisis,"echerihia",a)},expression:"analisis.echerihia"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(v.r,{staticClass:"v-label--italic",attrs:{"item-value":"valor","item-text":"label",items:e.contieneNocontieneOpcional,label:"Pseudomona aeruginosa","prepend-icon":"bug_report",color:"terciary","background-color":"terciary lighten-5"},model:{value:e.analisis.pseudomonaAeruginosa,callback:function(a){e.$set(e.analisis,"pseudomonaAeruginosa",a)},expression:"analisis.pseudomonaAeruginosa"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"bug_report",label:"Bacterias coliformes",type:"number",rules:e.positivo,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.coliformes,callback:function(a){e.$set(e.analisis,"coliformes",a)},expression:"analisis.coliformes"}})],1),a(l.Z,{attrs:{xs0:"",sm6:""}})],1)],1)},_=[],k={name:"formBacteriologico",props:["analisis","crear"],data(){return{requerido:[e=>e&&""!==e.trim()||"Este campo es requerido."],positivo:[e=>isNaN(e)?"Debe ser un numero valido.":!(Number(e)<0)||"El valor debe ser mayor o igual a cero."],fuenteAnalisis:["Tanque-Red","Tanque-Pozo","Pozo Directo","Red Directa"],positivoNegativo:["hola","chau"],positivoNegativoOpcional:[{label:">500",valor:">500"},{label:"<500",valor:"<500"},{label:"-----",valor:""}],contieneNocontiene:[{label:"Contiene",valor:"Contiene"},{label:"No Contiene",valor:"No Contiene"}],contieneNocontieneOpcional:[{label:"Contiene",valor:"Contiene"},{label:"No Contiene",valor:"No Contiene"},{label:"-----",valor:""}]}}},Z=k,w=i(1001),A=(0,w.Z)(Z,y,_,!1,null,null,null),E=A.exports,C=function(){var e=this,a=e._self._c;return a("div",["Fisico-Quimico"!==e.analisis.tipo_analisis||e.crear?e._e():a(d.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(v.r,{attrs:{rules:e.requerido,items:e.fuenteAnalisis,label:"Fuente de Analisis","prepend-icon":"search",color:"terciary","background-color":"terciary lighten-5"},model:{value:e.analisis.fuente_analisis,callback:function(a){e.$set(e.analisis,"fuente_analisis",a)},expression:"analisis.fuente_analisis"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"invert_colors_on",label:"Color",type:"text",rules:e.requerido,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.color,callback:function(a){e.$set(e.analisis,"color",a)},expression:"analisis.color"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"graphic_eq",label:"Olor",type:"text",rules:e.requerido,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.olor,callback:function(a){e.$set(e.analisis,"olor",a)},expression:"analisis.olor"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"pie_chart",label:"Aspecto",type:"text",rules:e.requerido,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.aspecto,callback:function(a){e.$set(e.analisis,"aspecto",a)},expression:"analisis.aspecto"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"PH",label:"PH",type:"number",step:"0.1",rules:e.positivo,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.ph,callback:function(a){e.$set(e.analisis,"ph",a)},expression:"analisis.ph"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"grain",label:"Nitratos (mg/L)",type:"number",rules:e.positivo,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.nitratos,callback:function(a){e.$set(e.analisis,"nitratos",a)},expression:"analisis.nitratos"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"grain",label:"Nitritos (mg/L)",type:"number",step:"0.1",color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.nitritos,callback:function(a){e.$set(e.analisis,"nitritos",a)},expression:"analisis.nitritos"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"grain",label:"Sulfato (mg/L)",type:"number",rules:e.positivo,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.sulfato,callback:function(a){e.$set(e.analisis,"sulfato",a)},expression:"analisis.sulfato"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"AS",label:"Arsenico (mg/L)",type:"number",step:"0.01",rules:e.positivo,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.arsenico,callback:function(a){e.$set(e.analisis,"arsenico",a)},expression:"analisis.arsenico"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"CL",label:"Cloruros (mg/L)",type:"number",rules:e.positivo,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.cloruros,callback:function(a){e.$set(e.analisis,"cloruros",a)},expression:"analisis.cloruros"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"texture",label:"Dureza (mg CaCO3/L)",type:"number",rules:e.positivo,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.dureza,callback:function(a){e.$set(e.analisis,"dureza",a)},expression:"analisis.dureza"}})],1),a(l.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(x.h,{attrs:{"prepend-icon":"radio_button_checked",label:"Alcalinidad (mg CaCO3/L)",type:"number",rules:e.positivo,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.alcalinidad,callback:function(a){e.$set(e.analisis,"alcalinidad",a)},expression:"analisis.alcalinidad"}})],1)],1)],1)},B=[],$={name:"formFisicoQuimico",props:["analisis","crear"],data(){return{requerido:[e=>e&&""!==e.trim()||"Este campo es requerido."],positivo:[e=>e?""===e.trim()?"Este campo es requerido.":isNaN(e)?"Debe ser un numero valido.":!(Number(e)<0)||"El valor debe ser mayor o igual a cero.":"Este campo es requerido."],fuenteAnalisis:["Tanque-Red","Tanque-Pozo","Pozo Directo","Red Directa"]}}},I=$,q=(0,w.Z)(I,C,B,!1,null,null,null),S=q.exports,V=function(){var e=this,a=e._self._c;return a("div",["Alimento"!==e.analisis.tipo_analisis||e.crear?e._e():a(d.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[a(l.Z,{attrs:{xs12:"","px-3":""}},[a(m.Z,{attrs:{rules:e.requerido,label:"Observacion del Alimento",color:"terciary","background-color":"terciary lighten-5","prepend-icon":"description",clearable:""},model:{value:e.analisis.observacionAlimento,callback:function(a){e.$set(e.analisis,"observacionAlimento",a)},expression:"analisis.observacionAlimento"}})],1)],1)],1)},N=[],j={name:"formAlimento",props:["analisis","crear"],data(){return{requerido:[e=>e&&""!==e.trim()||"Este campo es requerido."]}}},O=j,D=(0,w.Z)(O,V,N,!1,null,null,null),z=D.exports,P={name:"analisisEditar",components:{formAnalisis:g.Z,formBacteriologico:E,formFisicoQuimico:S,formAlimento:z},data:()=>({requerido:[e=>e&&""!==e.trim()||"Este campo es requerido."],valido:!0,Bacteriologico:["mesofilas","coliformes","echerihia","pseudomonaAeruginosa"],fisico_quimico:["color","olor","aspecto","ph","nitratos","nitritos","sulfato","arsenico","cloruros","dureza","alcalinidad"],Alimento:["observacionAlimento"],analisis:{orden:"",origen:"",muestra:null,expediente:null,titular:"",rubro:"",dir_calle:"",dir_numero:"",dir_entre:"",dir_barrio:"",telefono:"",inspector:"",fec_solicitud:"",fec_inspeccion:"",fec_resultado:"",fec_verificado:"",observacion:"",tipo_analisis:"",fuente_analisis:"",conclusion:"",usuario_verifico:{},mesofilas:"",coliformes:"",echerihia:"",pseudomonaAeruginosa:"",color:"",olor:"",aspecto:"",ph:"",nitratos:"",nitritos:"",sulfato:"",arsenico:"",cloruros:"",dureza:"",alcalinidad:"",observacionAlimento:"",estado:!0}}),computed:{...(0,b.rn)(["APIURL","axiosConfig","loading","persona"]),editValidado:function(){return!!this.analisis.usuario_verifico&&this.analisis.usuario_verifico.id===this.persona.id}},created(){let{id:e}=this.$route.params;this.cargarAnalisis(e)},methods:{...(0,b.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),async cargarAnalisis(e){try{this.mostrarLoading({titulo:"Cargando datos...",color:"primary"});let i=await this.axios.get(this.APIURL+"/bromatologia/buscar/"+e,this.axiosConfig);if(i.data.ok)for(const e in i.data.analisis)i.data.analisis.hasOwnProperty(e)&&("fec_inspeccion"===e||"fec_resultado"===e||"fec_solicitud"===e||"fec_verificado"===e?this.analisis[e]=this.mostrarFecha(i.data.analisis[e]):"number"===typeof i.data.analisis[e]||"boolean"===typeof i.data.analisis[e]?this.analisis[e]=i.data.analisis[e].toString():this.analisis[e]=i.data.analisis[e]);else try{this.mostrarError({errores:"",mensaje:i.data.err.message,titulo:i.status})}catch(a){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(a){try{this.mostrarError({errores:a.response.data.err.errors,mensaje:a.response.data.err.message,titulo:a.response.status})}catch(a){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}this.$router.push({name:"BromatologiaBuscar"})}finally{this.ocultarLoading()}},async editar(){if(this.$refs.form.validate()){let a=Object.assign({},this.analisis);"Bacteriologico"===a.tipo_analisis&&(this.fisico_quimico.forEach((e=>{delete a[e]})),this.Alimento.forEach((e=>{delete a[e]}))),"Fisico-Quimico"===a.tipo_analisis&&(this.Bacteriologico.forEach((e=>{delete a[e]})),this.Alimento.forEach((e=>{delete a[e]}))),"Alimento"===a.tipo_analisis&&(delete a["fuente_analisis"],this.Bacteriologico.forEach((e=>{delete a[e]})),this.fisico_quimico.forEach((e=>{delete a[e]})));try{this.mostrarLoading({titulo:"Enviando datos...",color:"primary"});let i=await this.axios.put(this.APIURL+"/bromatologia/"+this.analisis._id,a,this.axiosConfig);if(i.data.ok)this.mostrarMensaje({msj:["Analisis Editado exitosamente.","<##> Nro de ORDEN: "+i.data.analisis.orden.toString()+"<##>"],titulo:"Modificacion Exitosa"}),this.$router.push({name:"BromatologiaBuscar"});else try{this.mostrarError({errores:"",mensaje:i.data.err.message,titulo:i.status})}catch(e){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(e){try{this.mostrarError({errores:e.response.data.err.errors,mensaje:e.response.data.err.message,titulo:e.response.status})}catch(e){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}finally{this.ocultarLoading()}}else this.mostrarError({errores:"",mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."})}}},R=P,L=(0,w.Z)(R,h,f,!1,null,null,null),F=L.exports},7413:function(e,a,i){i.d(a,{Z:function(){return v}});var t=i(8956),s=i(2353),r=i(6961),o=i(683),n=i(9456),l=i(5084),c=i(4036),u=i(4618),d=i(5730),p=function(){var e=this,a=e._self._c;return a("div",[a(n.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[a(o.Z,{attrs:{xs12:"","ma-2":""}},[a(t.Z,{attrs:{dark:"",color:"terciary darken-1"}},[a(s.ZB,{staticClass:"px-0 text-uppercase"},[e._v(" === Datos Generales === ")])],1)],1),e.crear?e._e():a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(u.h,{attrs:{readonly:"","prepend-icon":"assignment",label:"# Orden",type:"text",hint:"Numero de Orden","persistent-hint":"",color:"terciary","background-color":"terciary lighten-2"},model:{value:e.analisis.orden,callback:function(a){e.$set(e.analisis,"orden",a)},expression:"analisis.orden"}})],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(l.Z,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:i}){return[a(u.h,e._g({attrs:{label:"Fecha Solicitud","prepend-icon":"event",readonly:"",rules:e.requerido,color:"terciary darken-3"},model:{value:e.analisis.fec_solicitud,callback:function(a){e.$set(e.analisis,"fec_solicitud",a)},expression:"analisis.fec_solicitud"}},i))]}}]),model:{value:e.menufecha1,callback:function(a){e.menufecha1=a},expression:"menufecha1"}},[a(r.Z,{attrs:{color:"terciary darken-3","header-color":"terciary darken-1",locale:"mx"},on:{input:function(a){e.menufecha1=!1}},model:{value:e.analisis.fec_solicitud,callback:function(a){e.$set(e.analisis,"fec_solicitud",a)},expression:"analisis.fec_solicitud"}})],1)],1),e.crear?e._e():a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(u.h,{attrs:{rules:e.requeridoMuestra,"prepend-icon":"assignment",label:"# Muestra",type:"text",hint:"Numero de Muestra","persistent-hint":"",color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.muestra,callback:function(a){e.$set(e.analisis,"muestra",a)},expression:"analisis.muestra"}})],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(l.Z,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:i}){return[a(u.h,e._g({attrs:{label:"Fecha Inspeccion","prepend-icon":"event",readonly:"",rules:e.requerido,color:"terciary darken-3"},model:{value:e.analisis.fec_inspeccion,callback:function(a){e.$set(e.analisis,"fec_inspeccion",a)},expression:"analisis.fec_inspeccion"}},i))]}}]),model:{value:e.menufecha2,callback:function(a){e.menufecha2=a},expression:"menufecha2"}},[a(r.Z,{attrs:{color:"terciary darken-3","header-color":"terciary darken-1",locale:"mx"},on:{input:function(a){e.menufecha2=!1}},model:{value:e.analisis.fec_inspeccion,callback:function(a){e.$set(e.analisis,"fec_inspeccion",a)},expression:"analisis.fec_inspeccion"}})],1)],1),e.crear?e._e():a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(u.h,{attrs:{rules:e.requeridoExpediente,"prepend-icon":"folder",label:"# Expediente",type:"text",hint:"Numero de Expediente","persistent-hint":"",color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.expediente,callback:function(a){e.$set(e.analisis,"expediente",a)},expression:"analisis.expediente"}})],1),e.crear?e._e():a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(l.Z,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:i}){return[a(u.h,e._g({attrs:{label:"Fecha Resultado","prepend-icon":"event",readonly:"",rules:e.requerido,color:"terciary darken-3"},model:{value:e.analisis.fec_resultado,callback:function(a){e.$set(e.analisis,"fec_resultado",a)},expression:"analisis.fec_resultado"}},i))]}}],null,!1,1324243471),model:{value:e.menufecha3,callback:function(a){e.menufecha3=a},expression:"menufecha3"}},[a(r.Z,{attrs:{color:"terciary darken-3","header-color":"terciary darken-1",locale:"mx"},on:{input:function(a){e.menufecha3=!1}},model:{value:e.analisis.fec_resultado,callback:function(a){e.$set(e.analisis,"fec_resultado",a)},expression:"analisis.fec_resultado"}})],1)],1),a(o.Z,{attrs:{xs12:"","px-3":""}},[a(u.h,{attrs:{"prepend-icon":"person",label:"Inspector",type:"text",rules:e.crear?"":e.requerido,color:"terciary","background-color":"terciary lighten-5"},model:{value:e.analisis.inspector,callback:function(a){e.$set(e.analisis,"inspector",a)},expression:"analisis.inspector"}})],1),a(o.Z,{attrs:{xs12:"","px-3":""}},[a(d.Z,{attrs:{label:"Observacion",color:"terciary","background-color":"terciary lighten-5","prepend-icon":"description",clearable:""},model:{value:e.analisis.observacion,callback:function(a){e.$set(e.analisis,"observacion",a)},expression:"analisis.observacion"}})],1),3!==e.persona.bromatologia||e.crear?e._e():a(o.Z,{attrs:{xs12:"","ma-2":""}},[a(t.Z,{attrs:{dark:"",color:"error darken-1"}},[a(s.ZB,{staticClass:"px-0 text-uppercase"},[e._v(" === Estado del Analisis === ")])],1)],1),3!==e.persona.bromatologia||e.crear?e._e():a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(c.r,{attrs:{"item-value":"valor","item-text":"label",items:e.estados,label:"Estado","prepend-icon":"visibility",color:"terciary","background-color":"true"==e.analisis.estado?"blue lighten-1":"error lighten-1"},model:{value:e.analisis.estado,callback:function(a){e.$set(e.analisis,"estado",a)},expression:"analisis.estado"}})],1),a(o.Z,{attrs:{xs12:"","ma-2":""}},[a(t.Z,{attrs:{dark:"",color:"terciary darken-1"}},[a(s.ZB,{staticClass:"px-0 text-uppercase"},[e._v(" === Titular === ")])],1)],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(u.h,{attrs:{"prepend-icon":"person",label:"Nombre de titular",type:"text",rules:e.requerido,color:"terciary","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.titular,callback:function(a){e.$set(e.analisis,"titular",a)},expression:"analisis.titular"}})],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(u.h,{attrs:{"prepend-icon":"store",label:"Rubro",type:"text",rules:e.requerido,color:"terciary","background-color":"terciary lighten-5"},model:{value:e.analisis.rubro,callback:function(a){e.$set(e.analisis,"rubro",a)},expression:"analisis.rubro"}})],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(u.h,{attrs:{"prepend-icon":"place",label:"Direccion",type:"text",rules:e.requerido,color:"terciary","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.dir_calle,callback:function(a){e.$set(e.analisis,"dir_calle",a)},expression:"analisis.dir_calle"}})],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(u.h,{attrs:{onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'","prepend-icon":"#",label:"Nro",type:"number",rules:e.positivo,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.dir_numero,callback:function(a){e.$set(e.analisis,"dir_numero",a)},expression:"analisis.dir_numero"}})],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(u.h,{attrs:{"prepend-icon":"add_location",label:"Entre las calles",type:"text",color:"terciary",clearable:"","background-color":"terciary lighten-5"},model:{value:e.analisis.dir_entre,callback:function(a){e.$set(e.analisis,"dir_entre",a)},expression:"analisis.dir_entre"}})],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(u.h,{attrs:{"prepend-icon":"domain",label:"Barrio",type:"text",color:"terciary",clearable:"","background-color":"terciary lighten-5"},model:{value:e.analisis.dir_barrio,callback:function(a){e.$set(e.analisis,"dir_barrio",a)},expression:"analisis.dir_barrio"}})],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(u.h,{attrs:{"prepend-icon":"phone",label:"Telefono",type:"text",rules:e.telefono,color:"terciary",clearable:"","background-color":"terciary lighten-5","validate-on-blur":""},model:{value:e.analisis.telefono,callback:function(a){e.$set(e.analisis,"telefono",a)},expression:"analisis.telefono"}})],1),a(o.Z,{attrs:{xs0:"",sm6:""}}),a(o.Z,{attrs:{xs12:"","ma-2":""}},[a(t.Z,{attrs:{dark:"",color:"terciary darken-1"}},[a(s.ZB,{staticClass:"px-0 text-uppercase"},[e._v(" === Datos Especiales === ")])],1)],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(c.r,{attrs:{rules:e.validacionTipo,items:e.tipoAnalisis,label:"Tipo de Analisis","prepend-icon":"colorize",color:"terciary","background-color":"terciary lighten-5"},model:{value:e.analisis.tipo_analisis,callback:function(a){e.$set(e.analisis,"tipo_analisis",a)},expression:"analisis.tipo_analisis"}})],1),a(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(c.r,{attrs:{rules:e.requerido,items:e.tipoOrigen,label:"Origen","prepend-icon":"fas fa-archway",color:"terciary","background-color":"terciary lighten-5"},model:{value:e.analisis.origen,callback:function(a){e.$set(e.analisis,"origen",a)},expression:"analisis.origen"}})],1)],1)],1)},m=[],h={name:"formAnalisis",props:["analisis","crear","persona"],data(){return{requerido:[e=>e&&""!==e.trim()||"Este campo es requerido."],requeridoMuestra:[e=>e&&""!==e.trim()||(this.analisis.muestra=null,"Este campo es requerido.")],requeridoExpediente:[e=>e&&""!==e.trim()||(this.analisis.expediente=null,!0)],positivo:[e=>isNaN(e)?"Debe ser un numero valido.":!(e&&Number(e)<=0)||"El numero debe ser positivo."],telefono:[e=>!e||(""===e.trim()||(isNaN(e)?"Debe ser un numero valido.":!(Number(e)<=0)||"El telefono no puede ser negativo."))],validacionTipo:[e=>e?""===e.trim()?"Este campo es requerido.":"Bacteriologico"===e?(this.analisis.color="",this.analisis.olor="",this.analisis.aspecto="",this.analisis.ph="",this.analisis.nitratos="",this.analisis.nitritos="",this.analisis.sulfato="",this.analisis.arsenico="",this.analisis.cloruros="",this.analisis.dureza="",this.analisis.alcalinidad="",this.analisis.observacionAlimento="",!0):"Fisico-Quimico"===e?(this.analisis.mesofilas="",this.analisis.coliformes="",this.analisis.echerihia="",this.analisis.pseudomonaAeruginosa="",this.analisis.destino="",this.analisis.observacionAlimento="",!0):"Alimento"===e?(this.analisis.mesofilas="",this.analisis.coliformes="",this.analisis.echerihia="",this.analisis.pseudomonaAeruginosa="",this.analisis.destino="",this.analisis.color="",this.analisis.olor="",this.analisis.aspecto="",this.analisis.ph="",this.analisis.nitratos="",this.analisis.nitritos="",this.analisis.sulfato="",this.analisis.arsenico="",this.analisis.cloruros="",this.analisis.dureza="",this.analisis.alcalinidad="",this.analisis.fuente_analisis="",!0):"Valor del campo no valido.":"Este campo es requerido."],estados:[{label:"ACTIVO",valor:"true"},{label:"BORRADO",valor:"false"}],tipoAnalisis:["Bacteriologico","Fisico-Quimico","Alimento"],tipoOrigen:["Bromatologia","Salud"],menufecha1:!1,menufecha2:!1,menufecha3:!1}}},f=h,b=i(1001),g=(0,b.Z)(f,p,m,!1,null,null,null),v=g.exports},1232:function(e,a,i){i(7448);var t=i(1395),s=i(7416),r=i(8131);a.Z={name:"v-combobox",extends:s.Z,props:{delimiters:{type:Array,default:function(){return[]}},returnObject:{type:Boolean,default:!0}},data:function(){return{editingIndex:-1}},computed:{counterValue:function(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot:function(){return t.Z.options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed:function(){return!0},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)}},methods:{onFilteredItemsChanged:function(){},onInternalSearchChanged:function(e){if(e&&this.multiple&&this.delimiters.length){var a=this.delimiters.find((function(a){return e.endsWith(a)}));null!=a&&(this.internalSearch=e.slice(0,e.length-a.length),this.updateTags())}this.updateMenuDimensions()},genChipSelection:function(e,a){var i=this,s=t.Z.options.methods.genChipSelection.call(this,e,a);return this.multiple&&(s.componentOptions.listeners.dblclick=function(){i.editingIndex=a,i.internalSearch=i.getText(e),i.selectedIndex=-1}),s},onChipInput:function(e){t.Z.options.methods.onChipInput.call(this,e),this.editingIndex=-1},onEnterDown:function(e){e.preventDefault(),t.Z.options.methods.onEnterDown.call(this),this.getMenuIndex()>-1||this.updateSelf()},onKeyDown:function(e){var a=e.keyCode;t.Z.options.methods.onKeyDown.call(this,e),this.multiple&&a===r.Do.left&&0===this.$refs.input.selectionStart&&this.updateSelf(),this.changeSelectedIndex(a)},onTabDown:function(e){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return e.preventDefault(),e.stopPropagation(),this.updateTags();s.Z.options.methods.onTabDown.call(this,e)},selectItem:function(e){this.editingIndex>-1?this.updateEditing():s.Z.options.methods.selectItem.call(this,e)},setSelectedItems:function(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.internalSearch;t.Z.options.methods.setValue.call(this,e)},updateEditing:function(){var e=this.internalValue.slice();e[this.editingIndex]=this.internalSearch,this.setValue(e),this.editingIndex=-1},updateCombobox:function(){var e=Boolean(this.$scopedSlots.selection)||this.hasChips;e&&!this.searchIsDirty||(this.internalSearch!==this.getText(this.internalValue)&&this.setValue(),e&&(this.internalSearch=void 0))},updateSelf:function(){this.multiple?this.updateTags():this.updateCombobox()},updateTags:function(){var e=this.getMenuIndex();if(!(e<0)||this.searchIsDirty){if(this.editingIndex>-1)return this.updateEditing();var a=this.selectedItems.indexOf(this.internalSearch);if(a>-1){var i=this.internalValue.slice();i.splice(a,1),this.setValue(i)}if(e>-1)return this.internalSearch=null;this.selectItem(this.internalSearch),this.internalSearch=null}}}}},445:function(e,a,i){i.d(a,{Z:function(){return s}});var t=i(21),s={name:"v-form",mixins:[(0,t.J)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var e=Object.values(this.errorBag).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(e){var a=this,i=function(e){return e.$watch("hasError",(function(i){a.$set(a.errorBag,e._uid,i)}),{immediate:!0})},t={_uid:e._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?t.shouldValidate=e.$watch("shouldValidate",(function(s){s&&(a.errorBag.hasOwnProperty(e._uid)||(t.valid=i(e)))})):t.valid=i(e),t},validate:function(){var e=this.inputs.filter((function(e){return!e.validate(!0)})).length;return!e},reset:function(){for(var e=this,a=this.inputs.length;a--;)this.inputs[a].reset();this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){for(var e=this,a=this.inputs.length;a--;)this.inputs[a].resetValidation();this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},register:function(e){var a=this.watchInput(e);this.inputs.push(e),this.watchers.push(a)},unregister:function(e){var a=this.inputs.find((function(a){return a._uid===e._uid}));if(a){var i=this.watchers.find((function(e){return e._uid===a._uid}));i.valid&&i.valid(),i.shouldValidate&&i.shouldValidate(),this.watchers=this.watchers.filter((function(e){return e._uid!==a._uid})),this.inputs=this.inputs.filter((function(e){return e._uid!==a._uid})),this.$delete(this.errorBag,a._uid)}}},render:function(e){var a=this;return e("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(e){return a.$emit("submit",e)}}},this.$slots.default)}}},4036:function(e,a,i){i.d(a,{r:function(){return f},Z:function(){return b}});var t=i(1395),s=i(7416),r=s.Z,o=i(2556),n=i(8205),l=i(8219),c=r.extend({name:"v-overflow-btn",props:{segmented:Boolean,editable:Boolean,transition:t.Z.options.props.transition},computed:{classes:function(){return Object.assign(r.options.computed.classes.call(this),{"v-overflow-btn":!0,"v-overflow-btn--segmented":this.segmented,"v-overflow-btn--editable":this.editable})},isAnyValueAllowed:function(){return this.editable||r.options.computed.isAnyValueAllowed.call(this)},isSingle:function(){return!0},computedItems:function(){return this.segmented?this.allItems:this.filteredItems},$_menuProps:function(){var e=r.options.computed.$_menuProps.call(this);return e.transition=e.transition||"v-menu-transition",e}},methods:{genSelections:function(){return this.editable?r.options.methods.genSelections.call(this):t.Z.options.methods.genSelections.call(this)},genCommaSelection:function(e,a,i){return this.segmented?this.genSegmentedBtn(e):t.Z.options.methods.genCommaSelection.call(this,e,a,i)},genInput:function(){var e=o.Z.options.methods.genInput.call(this);return e.data.domProps.value=this.editable?this.internalSearch:"",e.data.attrs.readonly=!this.isAnyValueAllowed,e},genLabel:function(){if(this.editable&&this.isFocused)return null;var e=o.Z.options.methods.genLabel.call(this);return e?(e.data.style={},e):e},genSegmentedBtn:function(e){var a=this,i=this.getValue(e),t=this.computedItems.find((function(e){return a.getValue(e)===i}))||e;return t.text&&t.callback?this.$createElement(n.Z,{props:{flat:!0},on:{click:function(e){e.stopPropagation(),t.callback(e)}}},[t.text]):((0,l.Kd)("When using 'segmented' prop without a selection slot, items must contain both a text and callback property",this),null)}}}),u=c,d=i(1232),p=d.Z,m=i(8135),h=i(6505),f={functional:!0,$_wrapperFor:t.Z,props:{autocomplete:Boolean,combobox:Boolean,multiple:Boolean,tags:Boolean,editable:Boolean,overflow:Boolean,segmented:Boolean},render:function(e,a){var i=a.props,s=a.data,o=a.slots,n=a.parent;(0,h.Z)(s);var c=(0,m.Z)(o(),e);return i.autocomplete&&(0,l.Rn)("<v-select autocomplete>","<v-autocomplete>",f,n),i.combobox&&(0,l.Rn)("<v-select combobox>","<v-combobox>",f,n),i.tags&&(0,l.Rn)("<v-select tags>","<v-combobox multiple>",f,n),i.overflow&&(0,l.Rn)("<v-select overflow>","<v-overflow-btn>",f,n),i.segmented&&(0,l.Rn)("<v-select segmented>","<v-overflow-btn segmented>",f,n),i.editable&&(0,l.Rn)("<v-select editable>","<v-overflow-btn editable>",f,n),s.attrs=s.attrs||{},i.combobox||i.tags?(s.attrs.multiple=i.tags,e(p,s,c)):i.autocomplete?(s.attrs.multiple=i.multiple,e(r,s,c)):i.overflow||i.segmented||i.editable?(s.attrs.segmented=i.segmented,s.attrs.editable=i.editable,e(u,s,c)):(s.attrs.multiple=i.multiple,e(t.Z,s,c))}},b=f}}]);