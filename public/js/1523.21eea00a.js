"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[1523],{69006:(e,a,t)=>{t.d(a,{A:()=>p});var i=t(67926),o=t(11210),r=t(57e3),l=function(){var e=this,a=e._self._c;return a(o.A,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:t}){return[a(r.W,e._g({attrs:{clearable:!e.soloLect&&!!e.clear,"background-color":e.soloLect?`${e.color} lighten-2`:`${e.color} lighten-5`,"prepend-icon":e.prepend,label:e.label,messages:e.msg,placeholder:e.holder,readonly:"",color:`${e.color} darken-3`,rules:e.req?e.validate:[]},on:{"click:clear":function(a){return e.$emit("input","")}},model:{value:e.fecha,callback:function(a){e.fecha=a},expression:"fecha"}},t))]}}]),model:{value:e.menufecha1,callback:function(a){e.menufecha1=a},expression:"menufecha1"}},[a(i.A,{attrs:{readonly:e.soloLect,"allowed-dates":e.allowedDates,min:e.fecMin,max:e.fecMax,color:`${e.color} darken-3`,"header-color":`${e.color} darken-1`,locale:"mx"},on:{input:function(a){e.menufecha1=!1,e.$emit("input",a)}},model:{value:e.fecha,callback:function(a){e.fecha=a},expression:"fecha"}})],1)},n=[];const s={name:"date-select",props:["value","label","icon","color","soloLectura","requerido","min","max","filtro","clearable","messages","placeholder"],data(){return{menufecha1:!1,validate:[e=>e?""===e.trim()?"Este campo es requerido.":!(e&&e.length<10)||"Ingrese fecha valida (AAAA-MM-DD).":"Este campo es requerido."]}},computed:{fecha(){return this.value},soloLect(){return this.soloLectura||!1},prepend(){return this.icon||"event"},req(){return this.requerido||!1},clear(){return this.clearable||!1},msg(){return this.messages||""},holder(){return this.placeholder||""},fecMin(){return"-1"===this.min?new Date((new Date).setFullYear((new Date).getFullYear()-1)).toISOString().substring(0,10):this.min?this.min:void 0},fecMax(){return"+1"===this.max?new Date((new Date).setFullYear((new Date).getFullYear()+1)).toISOString().substring(0,10):this.max?this.max:void 0},restriction(){return this.filtro||[]}},methods:{allowedDates(e){return!this.restriction.includes(new Date(e).getUTCDay())}}},c=s;var d=t(81656),u=(0,d.A)(c,l,n,!1,null,null,null);const p=u.exports},29774:(e,a,t)=>{t.d(a,{A:()=>I});var i=t(64554),o=t(55669),r=t(15852),l=t(1899),n=t(52111),s=t(59594),c=t(46227),d=t(55844),u=t(69155),p=t(55731),m=t(49778),h=function(){var e=this,a=e._self._c;return a(n.A,{attrs:{"max-width":"80%",persistent:"",scrollable:""},model:{value:e.dialogPaciente.state,callback:function(a){e.$set(e.dialogPaciente,"state",a)},expression:"dialogPaciente.state"}},[a(r.A,{staticClass:"dialog-draggable-window",attrs:{tile:""}},[a(m.A,{key:!e.dialogPaciente.id,staticClass:"dialog-draggable ma-0 pa-0",attrs:{color:"grey lighten-2",height:"auto",window:""}},[a(c.A,{staticClass:"dialog-draggable pl-2",attrs:{medium:"",color:"black darken-2"}},[e._v(e._s(e.dialogPaciente.id?"fas fa-user-edit":"fas fa-user-plus"))]),a("span",{staticClass:"display-1 font-weight-bold text-capitalize black--text text--darken-2 dialog-draggable"},[e._v(e._s(e.dialogPaciente.id?`Editar: ${e.dataEdit.nombreC}`:"Alta Nuevo Paciente"))]),a(p.hc),a(i.A,{directives:[{name:"show",rawName:"v-show",value:e.dataEdit.validadoRENAPER,expression:"dataEdit.validadoRENAPER"}],staticClass:"mx-1",attrs:{tile:!1,size:"32px"}},[a(d.A,{attrs:{src:t(39760),alt:"renaper"}})],1),a(c.A,{attrs:{large:"",disabled:e.loading.estado,color:"error darken-1"},on:{click:function(a){return e.close()}}},[e._v("cancel_presentation")])],1),a(l.OQ,{staticClass:"my-0 py-0"},[a(s.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valido,callback:function(a){e.valido=a},expression:"valido"}},[a(u.A,{attrs:{wrap:""}},[a("formPaciente",{attrs:{paciente:e.dataEdit}})],1)],1)],1),a(l.SL,[a(u.A,{attrs:{row:"",wrap:""}},[a(p.hc),a(o.A,{staticClass:"error darken-1",attrs:{disabled:e.loading.estado,round:"",loading:e.loading.estado},on:{click:function(a){return e.close()}}},[e._v(" Cancelar ")]),a(o.A,{staticClass:"terciary darken-1 white--text",attrs:{disabled:e.loading.estado||e.dialogPaciente.soloLectura,loading:e.loading.estado,round:""},on:{click:function(a){return e.guardarPaciente()}}},[e._v(" "+e._s(e.valido?e.dialogPaciente.id?"Guardar Cambios":"Alta Paciente":"Formulario No valido")+" ")])],1)],1)],1)],1)},f=[],A=t(95353),g=t(28597),y=t(67926),b=t(41614),x=t(11210),v=t(63286),_=t(57e3),k=t(51257),L=t(66816),E=function(){var e=this,a=e._self._c;return a(u.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[a(b.A,{attrs:{xs12:"",sm6:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura||e.paciente.validadoRENAPER,clearable:!(e.soloLectura||e.paciente.validadoRENAPER),"background-color":e.soloLectura||e.paciente.validadoRENAPER?"terciary":"terciary lighten-5","prepend-icon":"person",label:"Apellido",type:"text",rules:[...e.rules.requerido,...e.rules.textoEspecial],color:"terciary","validate-on-blur":""},model:{value:e.paciente.apellido,callback:function(a){e.$set(e.paciente,"apellido",a)},expression:"paciente.apellido"}})],1),a(b.A,{attrs:{xs12:"",sm6:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura||e.paciente.validadoRENAPER,clearable:!(e.soloLectura||e.paciente.validadoRENAPER),"background-color":e.soloLectura||e.paciente.validadoRENAPER?"terciary":"terciary lighten-5","prepend-icon":"person",label:"Nombre",type:"text",rules:[...e.rules.requerido,...e.rules.textoEspecial],color:"terciary","validate-on-blur":""},model:{value:e.paciente.nombre,callback:function(a){e.$set(e.paciente,"nombre",a)},expression:"paciente.nombre"}})],1),a(b.A,{attrs:{xs12:"",sm4:"","px-3":""}},[a(g.A,{attrs:{readonly:e.soloLectura||e.paciente.validadoRENAPER,clearable:!(e.soloLectura||e.paciente.validadoRENAPER),"background-color":e.soloLectura||e.paciente.validadoRENAPER?"terciary":"terciary lighten-5",items:e.documentos,label:"Tipo de Documento","prepend-icon":"fas fa-id-card",color:"terciary","validate-on-blur":"",rules:e.paciente.documento?[...e.rules.requerido]:[]},on:{"click:clear":function(a){e.$nextTick((()=>e.paciente.tipo_doc=null))}},model:{value:e.paciente.tipo_doc,callback:function(a){e.$set(e.paciente,"tipo_doc",a)},expression:"paciente.tipo_doc"}})],1),a(b.A,{attrs:{xs12:"",sm4:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura||e.paciente.validadoRENAPER,clearable:!(e.soloLectura||e.paciente.validadoRENAPER),"background-color":e.soloLectura||e.paciente.validadoRENAPER?"terciary":"terciary lighten-5",onkeydown:"return event.key !== 'ñ' && event.key !== 'Ñ'","prepend-icon":"far fa-id-card",label:"Documento",type:"text",maxlength:"14",counter:"",rules:e.paciente.tipo_doc?"DNI"===e.paciente.tipo_doc?[...e.rules.requerido,...e.rules.soloNumero,e.rules.maxLength(14)]:[...e.rules.requerido,...e.rules.textoNumero,e.rules.maxLength(14)]:[...e.rules.textoNumero,e.rules.maxLength(14)],color:"terciary","validate-on-blur":""},model:{value:e.paciente.documento,callback:function(a){e.$set(e.paciente,"documento",a)},expression:"paciente.documento"}})],1),a(b.A,{attrs:{xs12:"",sm4:"","px-3":""}},[a(v.d,{attrs:{readonly:e.soloLectura||e.paciente.validadoRENAPER,clearable:!(e.soloLectura||e.paciente.validadoRENAPER),"background-color":e.soloLectura||e.paciente.validadoRENAPER?"terciary":"terciary lighten-5",items:e.sexos,label:"Sexo","prepend-icon":"fas fa-venus-mars",color:"terciary",rules:[...e.rules.requerido]},model:{value:e.paciente.sexo,callback:function(a){e.$set(e.paciente,"sexo",a)},expression:"paciente.sexo"}})],1),a(b.A,{class:e.paciente.fec_fallecimiento?"sm2":"sm3",attrs:{xs12:"","px-3":""}}),e.soloLectura||e.paciente.validadoRENAPER?a(b.A,{class:e.paciente.fec_fallecimiento?"sm4":"sm6",attrs:{xs12:"","px-3":""}},[a(_.W,{attrs:{readonly:"","background-color":"terciary",label:"Fecha de Nacimiento","prepend-icon":"event",color:"terciary darken-3",rules:[...e.rules.requerido,...e.rules.fecha]},model:{value:e.paciente.fec_nac,callback:function(a){e.$set(e.paciente,"fec_nac",a)},expression:"paciente.fec_nac"}})],1):a(b.A,{class:e.paciente.fec_fallecimiento?"sm4":"sm6",attrs:{xs12:"","px-3":""}},[a(x.A,{ref:"menu",attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:t}){return[a(_.W,e._g({attrs:{clearable:"","background-color":"terciary lighten-5",label:"Fecha de Nacimiento","prepend-icon":"event",readonly:"",color:"terciary darken-3",placeholder:"YYYY-MM-DD",rules:[...e.rules.requerido,...e.rules.fecha]},model:{value:e.paciente.fec_nac,callback:function(a){e.$set(e.paciente,"fec_nac",a)},expression:"paciente.fec_nac"}},t))]}}]),model:{value:e.menuFecha,callback:function(a){e.menuFecha=a},expression:"menuFecha"}},[a(y.A,{ref:"picker",attrs:{readonly:e.soloLectura,color:"terciary darken-3","header-color":"terciary darken-1",locale:"mx",max:e.hoy,min:"1900-01-01"},on:{change:e.saveDate},model:{value:e.paciente.fec_nac,callback:function(a){e.$set(e.paciente,"fec_nac",a)},expression:"paciente.fec_nac"}})],1)],1),e.paciente.fec_fallecimiento?a(b.A,{attrs:{xs12:"",sm4:"","px-3":""}},[a(_.W,{attrs:{readonly:"","background-color":"terciary",label:"Fecha de Deceso","prepend-icon":"fa-solid fa-cross fa-beat",color:"terciary darken-3",rules:[...e.rules.requerido,...e.rules.fecha]},model:{value:e.paciente.fec_fallecimiento,callback:function(a){e.$set(e.paciente,"fec_fallecimiento",a)},expression:"paciente.fec_fallecimiento"}})],1):e._e(),a(b.A,{class:e.paciente.fec_fallecimiento?"sm2":"sm3",attrs:{xs12:"","px-3":""}}),a(b.A,{attrs:{xs12:"",sm6:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","prepend-icon":"phone",label:"Telefono",type:"text",onkeydown:"return event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || /^[0-9\\s.,+=-]+$/.test(event.key)",maxlength:"15",counter:"",rules:[...e.rules.soloNumeroMas,e.rules.maxLength(15)],color:"terciary","validate-on-blur":""},model:{value:e.paciente.telefono,callback:function(a){e.$set(e.paciente,"telefono",a)},expression:"paciente.telefono"}})],1),a(b.A,{attrs:{xs12:"",sm6:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","prepend-icon":"mail",label:"E-Mail",type:"text",rules:[...e.rules.mail],color:"terciary","validate-on-blur":""},model:{value:e.paciente.email,callback:function(a){e.$set(e.paciente,"email",a)},expression:"paciente.email"}})],1),a(b.A,{attrs:{xs12:"",sm6:"","px-3":""}},[a(_.W,{directives:[{name:"show",rawName:"v-show",value:e.paciente.telefono,expression:"paciente.telefono"}],attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","prepend-icon":"add_ic_call",label:"Telefono Alternativo",type:"text",onkeydown:"return event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || /^[0-9\\s.,+=-]+$/.test(event.key)",maxlength:"15",counter:"",rules:[...e.rules.soloNumeroMas,e.rules.maxLength(15)],color:"terciary","validate-on-blur":""},model:{value:e.paciente.telefono_alt,callback:function(a){e.$set(e.paciente,"telefono_alt",a)},expression:"paciente.telefono_alt"}})],1),a(b.A,{attrs:{xs12:"",sm6:"","px-3":""}}),a(u.A,{attrs:{grey:"","lighten-3":"",row:"",wrap:""}},[a(b.A,{attrs:{xs12:"",sm6:"",md5:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","prepend-icon":"place",label:"Direccion",type:"text",color:"terciary","validate-on-blur":""},model:{value:e.paciente.dir_calle,callback:function(a){e.$set(e.paciente,"dir_calle",a)},expression:"paciente.dir_calle"}})],1),a(b.A,{attrs:{xs12:"",sm6:"",md3:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5",onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'","prepend-icon":"#",label:"Nro",type:"number",rules:[...e.rules.soloNumero,e.rules.minNumber(0)],color:"terciary","validate-on-blur":""},model:{value:e.paciente.dir_numero,callback:function(a){e.$set(e.paciente,"dir_numero",a)},expression:"paciente.dir_numero"}})],1),a(b.A,{attrs:{xs12:"",sm6:"",md2:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","prepend-icon":"far fa-building",label:"Piso",type:"text",color:"terciary"},model:{value:e.paciente.dir_piso,callback:function(a){e.$set(e.paciente,"dir_piso",a)},expression:"paciente.dir_piso"}})],1),a(b.A,{attrs:{xs12:"",sm6:"",md2:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","prepend-icon":"domain",label:"Depto",type:"text",color:"terciary"},model:{value:e.paciente.dir_depto,callback:function(a){e.$set(e.paciente,"dir_depto",a)},expression:"paciente.dir_depto"}})],1),a(b.A,{attrs:{xs12:"",sm6:"",md4:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","prepend-icon":"far fa-map",label:"Barrio",type:"text",color:"terciary"},model:{value:e.paciente.dir_barrio,callback:function(a){e.$set(e.paciente,"dir_barrio",a)},expression:"paciente.dir_barrio"}})],1),a(b.A,{attrs:{xs12:"",sm6:"",md4:"","px-3":""}},[a(g.A,{attrs:{readonly:e.soloLectura||!!e.paciente.dir_municipio&&"Moreno"!==e.paciente.dir_municipio,clearable:!(e.soloLectura||e.paciente.dir_municipio&&"Moreno"!==e.paciente.dir_municipio),"background-color":e.soloLectura||e.paciente.dir_municipio&&"Moreno"!==e.paciente.dir_municipio?"terciary":"terciary lighten-5",items:e.optionsJson.opcLocalidades,"item-value":"description","item-text":"description",label:"Localidades Moreno (Ciudad)","prepend-icon":"fas fa-city",color:"terciary",rules:[...e.rules.requerido]},on:{"click:clear":function(a){e.$nextTick((()=>e.paciente.dir_localidad=null))}},model:{value:e.paciente.dir_localidad,callback:function(a){e.$set(e.paciente,"dir_localidad",a)},expression:"paciente.dir_localidad"}})],1),a(b.A,{attrs:{xs12:"",sm6:"",md4:"","px-3":""}},[a(g.A,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5",items:e.optionsJson.opcPartidos,"item-value":"nombre","item-text":"nombre",label:"Municipio (Partido)","prepend-icon":"fas fa-landmark-flag",color:"terciary"},on:{"click:clear":function(a){e.$nextTick((()=>e.paciente.dir_municipio=null))}},model:{value:e.paciente.dir_municipio,callback:function(a){e.$set(e.paciente,"dir_municipio",a)},expression:"paciente.dir_municipio"}})],1),a(b.A,{attrs:{xs12:"","mx-3":""}},[a(k.A,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","auto-grow":"",rows:"2",label:"Descripcion del Domicilio",color:"terciary","prepend-icon":"house"},model:{value:e.paciente.dir_descripcion,callback:function(a){e.$set(e.paciente,"dir_descripcion",a)},expression:"paciente.dir_descripcion"}})],1)],1),a(b.A,{attrs:{xs12:"",sm6:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","prepend-icon":"escalator_warning",label:"Responsable Documento",type:"text",color:"terciary"},model:{value:e.paciente.doc_responsable,callback:function(a){e.$set(e.paciente,"doc_responsable",a)},expression:"paciente.doc_responsable"}})],1),a(b.A,{attrs:{xs12:"",sm6:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","prepend-icon":"fas fa-id-card-alt",label:"Cobertura Social (Opcional)",messages:"Dejar vacio si no tiene.",type:"text",color:"terciary","validate-on-blur":""},model:{value:e.paciente.oSocial,callback:function(a){e.$set(e.paciente,"oSocial",a)},expression:"paciente.oSocial"}})],1),a(b.A,{attrs:{xs12:"",sm6:"","px-3":""}},[a(_.W,{directives:[{name:"show",rawName:"v-show",value:e.paciente.oSocial,expression:"paciente.oSocial"}],attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","prepend-icon":"fas fa-id-card-alt",label:"Numero de Afiliado (Opcional)",messages:"Dejar vacio si no tiene.",type:"Number",color:"terciary","validate-on-blur":""},model:{value:e.paciente.oSocialNumero,callback:function(a){e.$set(e.paciente,"oSocialNumero",a)},expression:"paciente.oSocialNumero"}})],1),a(b.A,{attrs:{xs12:"",terciary:"","lighten-1":"","mt-1":"","pa-1":""}},[a("h4",e._g({staticClass:"title white--text"},e.on),[e._v(" N° de Historial Clinico en las Unidades de Atencion ")])]),e._l(e.paciente.hist_salitas,(function(t,i){return a(b.A,{key:`hist_salitas-${i}`,attrs:{xs12:""}},[a(u.A,{class:"grey lighten-"+(i%2===0?"3":"2"),attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[a(b.A,{attrs:{xs12:"",sm5:"","px-3":""}},[a(g.A,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5","item-value":"id","item-text":"area",items:e.unidadesAtencion,label:"Unidad de Atencion","prepend-icon":"fa-house-medical-flag",color:"terciary",rules:e.paciente.hist_salitas[i].historial||0!=i?e.rules.requerido:[]},on:{"click:clear":function(a){e.$nextTick((()=>e.paciente.hist_salitas[i].area=null))}},model:{value:e.paciente.hist_salitas[i].area,callback:function(a){e.$set(e.paciente.hist_salitas[i],"area",a)},expression:"paciente.hist_salitas[index].area"}})],1),a(b.A,{attrs:{xs12:"",sm5:"","px-3":""}},[a(_.W,{attrs:{readonly:e.soloLectura,clearable:!e.soloLectura,"background-color":e.soloLectura?"terciary":"terciary lighten-5",label:"ID de Historial en la Unidad","prepend-icon":"fas fa-file-medical",type:"text",color:"terciary","validate-on-blur":"",maxlength:e.paciente.hist_salitas[i].area||e.paciente.hist_salitas[i].historial||0!=i?"9":"",counter:!(!e.paciente.hist_salitas[i].area&&!e.paciente.hist_salitas[i].historial)||0!=i,rules:e.paciente.hist_salitas[i].area||e.paciente.hist_salitas[i].historial||0!=i?[...e.rules.requerido,...e.rules.textoNumero,e.rules.maxLength(9)]:[]},model:{value:e.paciente.hist_salitas[i].historial,callback:function(a){e.$set(e.paciente.hist_salitas[i],"historial",a)},expression:"paciente.hist_salitas[index].historial"}})],1),0===i?a(L.A,{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function({on:t}){return[a(o.A,e._g({attrs:{disabled:e.soloLectura,flat:"",icon:"",color:"blue lighten-2"},on:{click:function(a){return e.agregarFila(e.paciente.hist_salitas,{area:null,historial:""})}}},t),[a(c.A,{attrs:{large:""}},[e._v("add_circle")])],1)]}}],null,!0)},[a("span",[e._v("Agregar Historial en nueva Unidad")])]):a(L.A,{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function({on:t}){return[a(o.A,e._g({attrs:{disabled:e.soloLectura,small:"",flat:"",icon:"",color:"red lighten-2"},on:{click:function(a){return e.borrarFila(e.paciente.hist_salitas,i)}}},t),[a(c.A,[e._v("delete_forever")])],1)]}}],null,!0)},[a("span",[e._v("Eliminar Historial"+e._s(""+(e.paciente.hist_salitas[i].historial?`: ${e.paciente.hist_salitas[i].historial}`:".")))])])],1)],1)})),"ADMIN_ROLE"===e.persona.role&&e.paciente.id?a(u.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[a(b.A,{attrs:{xs12:"","ma-2":""}},[a(r.A,{attrs:{color:"error darken-1"}},[a(l.OQ,{staticClass:"px-0 text-xs-center white--text"},[e._v(" === OPCIONES DE ADMIN === ")])],1)],1),a(b.A,{attrs:{xs12:"",sm3:"","px-3":""}}),a(b.A,{attrs:{xs12:"",sm6:"","px-3":""}},[a(v.d,{attrs:{rules:[...e.rules.requerido],"item-value":"valor","item-text":"label",items:e.estados,label:"Estado (Visibilidad)","prepend-icon":"true"===e.paciente.estado?"visibility":"visibility_off","background-color":"true"===e.paciente.estado?"green lighten-1":"red lighten-1",color:"terciary"},model:{value:e.paciente.estado,callback:function(a){e.$set(e.paciente,"estado",a)},expression:"paciente.estado"}})],1),a(b.A,{attrs:{xs12:"",sm3:"","px-3":""}}),a(b.A,{attrs:{xs12:"",sm10:"","px-3":""}},[a(k.A,{attrs:{readonly:"",value:e.paciente.ps_id?.join(";• "),"prepend-icon":"far fa-id-badge",label:"IDs del PS",color:"terciary","background-color":"terciary lighten-2",rows:"1","auto-grow":""}})],1)],1):e._e()],2)},w=[];t(44114);const N={name:"formPaciente",props:["paciente"],data(){return{menuFecha:!1,unidadesAtencion:[],optionsJson:{opcLocalidades:[],opcPartidos:[]},sexos:["Masculino","Femenino"],documentos:["DNI","Cédula Mercosur","Documento Bolivia","Documento Brasil","Documento Chile","Documento Colombia","Documento Paraguay","Documento Uruguay","Pasaporte","Pasaporte extranjero","Otro documento extranjero","CI","LE","LC"],estados:[{label:"Activo",valor:"true"},{label:"Desactivado",valor:"false"}]}},computed:{...(0,A.aH)(["persona","rules","hoy"]),...(0,A.aH)({soloLectura:e=>e.paciente.dialogPaciente.soloLectura})},watch:{menuFecha(e){e&&setTimeout((()=>this.$refs.picker.activePicker="YEAR"))},"paciente.telefono"(e){e||(this.paciente.telefono_alt="")},"paciente.oSocial"(e){e||(this.paciente.oSocialNumero="")},"paciente.dir_municipio"(e){e&&"Moreno"!==e&&(this.paciente.dir_localidad="Otros")}},async mounted(){this.optionsJson.opcLocalidades=await this.returnOptionsJSON({key:"106",opcion:"opcLocalidades"}),this.optionsJson.opcPartidos=await this.returnOptionsJSON({key:"14",opcion:"opcPartidos"}),this.unidadesAtencion.push(...await this.buscarAreaFiltros({filtro:{uas:!0},populate:"no",select:"area"}))},methods:{...(0,A.i0)(["returnOptionsJSON"]),...(0,A.i0)("main",["buscarAreaFiltros"]),saveDate(e){this.$refs.menu.save(e)},agregarFila(e,a){e.push(a??"")},borrarFila(e,a){e.splice(a,1)}}},P=N;var D=t(81656),R=(0,D.A)(P,E,w,!1,null,null,null);const C=R.exports,S={name:"dialogPaciente",props:["closeFinish"],components:{formPaciente:C},data:()=>({valido:!0,dataEdit:{},dataEditBase:{apellido:"",nombre:"",tipo_doc:"",documento:"",dir_calle:"",dir_numero:"",dir_piso:"",dir_depto:"",dir_barrio:"",dir_localidad:"",dir_municipio:"",dir_descripcion:"",zona:"",telefono:"",telefono_alt:"",email:"",fec_nac:"",sexo:"",oSocial:"",oSocialNumero:"",hist_salitas:[{area:null,historial:""}],fec_fallecimiento:"",validadoRENAPER:void 0,doc_responsable:"",ps_id:[],estado:"true",nombreC:""}}),computed:{...(0,A.aH)(["loading"]),...(0,A.aH)("paciente",["dialogPaciente"])},watch:{async"dialogPaciente.state"(e){e?setTimeout((async()=>{this.dataEdit=this._cloneDeep(this.dataEditBase),this.dialogPaciente.id&&await this.buscarPacienteID(),this.$refs.form.resetValidation()}),350):(this.dataEdit=this._cloneDeep(this.dataEditBase),this.$refs.form.resetValidation())}},beforeMount(){this.dataEdit=this._cloneDeep(this.dataEditBase)},methods:{...(0,A.PY)(["mostrarLoading","mostrarError","mostrarMensaje","ocultarLoading"]),...(0,A.i0)(["requestAPI"]),...(0,A.i0)("paciente",["actualizarDialogPaciente"]),async buscarPacienteID(){try{this.mostrarLoading({titulo:"Buscando Paciente..."});let e=null;if(e=await this.requestAPI({method:"get",url:`/paciente/buscar/${this.dialogPaciente.id}`}),e?.data?.ok){let a={};for(const t in e.data.paciente)e.data.paciente.hasOwnProperty(t)&&("fec_nac"===t||e.data.paciente[t]instanceof Date?a[t]=this.mostrarFecha(e.data.paciente[t]):"number"===typeof e.data.paciente[t]||"boolean"===typeof e.data.paciente[t]?a[t]=e.data.paciente[t].toString():a[t]=e.data.paciente[t]);return 0===a.hist_salitas?.length&&(a.hist_salitas=this.dataEditBase.hist_salitas),this.dataEdit=Object.assign(this.dataEdit,a),a}return!1}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (buscarPacienteID)"}),!1}finally{this.ocultarLoading()}},async validarRENAPER(){try{if(this.mostrarLoading({titulo:"Efectuando cambios..."}),!this.dataEdit.sexo||!this.dataEdit.documento)return this.mostrarError({mensaje:"Revise los campos obligatorios.\n Documento y Sexo.",titulo:"Valores Requeridos"}),!1;if(this.dataEdit.tipo_doc&&"DNI"!==this.dataEdit.tipo_doc)return this.mostrarError({mensaje:"RENAPER solamente verifica los DNI.",titulo:"Solamente DNI"}),!1;let e=null;return e=await this.requestAPI({method:"get",url:`/paciente/renaper/buscar?dni=${this.dataEdit.documento}&sx=${this.dataEdit.sexo[0]}`}),!!e?.data?.ok&&(this.dataEdit=Object.assign(this.dataEdit,e.data.paciente),!0)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (validarRENAPER)"}),!1}finally{this.ocultarLoading()}},async guardarPaciente(){if(!this.$refs.form.validate())return this.mostrarError({mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."}),!1;try{this.mostrarLoading({titulo:"Guardando Paciente..."});let e=this._cloneDeep(this.dataEdit);if(!e._id){let a=this.isVacio(e,!0);if(!0===a.vacio)return this.mostrarError({mensaje:"Complete por lo menos un dato.",titulo:"Valores Requeridos"}),!1;e=a.dato}let a=null;return a=e._id?await this.requestAPI({method:"put",url:`/paciente/${e._id}`,update:e}):await this.requestAPI({method:"post",url:"/paciente",update:e}),!!a?.data?.ok&&(a.data.paciente?.documentoC?this.mostrarMensaje({msj:[`Paciente ${e._id?"Editado":"Guardado"} exitosamente.`,`<##> Documento: ${a.data.paciente.documentoC.toString()} <##>`],titulo:"Completado"}):this.mostrarMensaje({msj:[`Paciente ${e._id?"Editado":"Guardado"} exitosamente.`],titulo:"Completado"}),this.close(e._id?void 0:{apellido:a.data.paciente.apellido,nombre:a.data.paciente.nombre}),!0)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (guardarPaciente)"}),!1}finally{this.ocultarLoading()}},close(e){this.actualizarDialogPaciente({state:!1}),this.closeFinish?.(e)}}},B=S;var F=(0,D.A)(B,h,f,!1,null,null,null);const I=F.exports},59594:(e,a,t)=>{t.d(a,{A:()=>o});var i=t(88e3);const o={name:"v-form",mixins:[(0,i.G)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var e=Object.values(this.errorBag).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(e){var a=this,t=function(e){return e.$watch("hasError",(function(t){a.$set(a.errorBag,e._uid,t)}),{immediate:!0})},i={_uid:e._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=e.$watch("shouldValidate",(function(o){o&&(a.errorBag.hasOwnProperty(e._uid)||(i.valid=t(e)))})):i.valid=t(e),i},validate:function(){var e=this.inputs.filter((function(e){return!e.validate(!0)})).length;return!e},reset:function(){for(var e=this,a=this.inputs.length;a--;)this.inputs[a].reset();this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){for(var e=this,a=this.inputs.length;a--;)this.inputs[a].resetValidation();this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},register:function(e){var a=this.watchInput(e);this.inputs.push(e),this.watchers.push(a)},unregister:function(e){var a=this.inputs.find((function(a){return a._uid===e._uid}));if(a){var t=this.watchers.find((function(e){return e._uid===a._uid}));t.valid&&t.valid(),t.shouldValidate&&t.shouldValidate(),this.watchers=this.watchers.filter((function(e){return e._uid!==a._uid})),this.inputs=this.inputs.filter((function(e){return e._uid!==a._uid})),this.$delete(this.errorBag,a._uid)}}},render:function(e){var a=this;return e("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(e){return a.$emit("submit",e)}}},this.$slots.default)}}},39760:e=>{e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAmCAYAAAClI5npAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAB2RJREFUeJy1WGtQlGUUdsZ+OI0/bTLNTLPJzNKMUitNzEsoNaPN6JSa92RMu6pZY0qO2kxWGjljlvcLIHITFEUQSRARlMsCu9wWFlguu9xZ7iycnueVBbm2S/rOnJn9vv32e5/3nOc855wdNMjBFVFQPXjH7YKJbjdyN80N1Lm/46d1XxOu3/F1VN4sz4yyxx19n93ru5iC0S4X049O8U6pGXE8QcacSpKpPqny1oU0mXBWI08dS5AXzyZb3/ZNC90QkTPnoW3sl10+dHlo9gG8vO7lcxr5JaFIEsx1klHZIFFFNXLDWC2asvvX5zLKBF6RMSeTZJa/NsQjqWTC/9r8q5t5I2b6amPG4rT74gulrKFFbbYfIDb/Y5CNkbmy9nqOzL+YLtPgjfX4HFNskUB9hTh5p8okzxTz6jC9y4A23xqd7zT9Qpphpp9WruZVSXBOpXhnlnUxn6xyCc6tlJgii2TCA0mldXIszSyndKUSb6qVteE5Mv5Mct2cAN0ShzY/lFwybLJnSvxsf52klderzVZc08vybvZxaLYsupwpIKLywIchmXJYY1JgkgGmsLZJPoennj+dXLk6XD/TbgAz/LRnnbxTJNJYI2H51XINHujNwvFdbIlFgeSG9MjKML0i5p8pJrE0W6WmyQqw2QL+GHbdMT75n5vjBWuePp4ol+Baj6RiecVTIwuD0nu1BTCeHpkhk71SxC0iR+JKapX7+d0yeMhc3yLFdc0yEQR29tdd6ndzoB4C4hR+ihfVAj3JhpxXLyDzezOeXFfRAHLWy093CxWYL2/miaGmUdaBlCtwenrCP7tcRp9IlG9v5bv2CcA1KMN9FB6iS4/AhTYAvyUWM8dldoCuizn7a5W7wRd543yqejYdYCBS8n5whuirG2XJlSzZB2DWtjZZDL5AO+J73fyuqfYxfGkGQhW/3XHGLgC24X6biNS3tHax2uZWqWy0yj24fRXiPz8wHR6pVyn5TVSe4L3yGlKyorFFceYZHHBPfOHcHgD2xBlXjoTCJZhr4cqiXgGUIBRTfdKUm232Ok5OPhxuJx0PQLfTE1RKAiCYQ5oSabK2qeffDdB59QAABfOd4atVruoLANOKcaTs0gh4ePvnEbCNcD1JNztAK6HIkq3RebIXAuaFNF6KUHDtv1cEj6SU9wAA0SmBa6TA0mQXAMY/EQTkRjwp79G9lOSdsQXy4x2jnM8sl4+uZsk9eHUKsoQrGvLN5/5KNXfKNG4+8cKZZKV2QTB7ACwMyhDb2oUNeY/eoGqe0JYqt9+CQs4DJ3JAxmdPJqoQFFgaFYDPInNXdQA4kmpy5gs0ONFB5L6jAPi9DQCl+QIEiTygHlBNmZLUFgsIS9lGxaRnDncAgEy68AEWGqaMowA2oSjZeEBlJCE3RRoEvYOghEt2VYOwoDW3tslx1Aqq5dzA9JAOAIihC0toVGGNIo09AFh2Ge+TKDzP4eW8Nw0Zwkxwi8gV1BP5O9WkNIGheBN6UQVZdgc30LwwgzoBQG5dUDDkBhDbC2D4sc4MoFGKtRAwGliutGApCHgaAAlmA0AxJNui82V7TL68dE7TCQAq5rAHSCpmAkPH6z3xRkEGKzneDPezNDM78muaVMVkj0Ag32Nz5QGvBzzApqGDA3YCWIDYUhnJdl7z9xQxVkTKr76qUQFgBpAvN9sPx46qBweg+850Z7IDWUAAXNcRNlsYdiO+WSAcNEXycHJWxCuGKpy6QG1+GRnii6LUIwuoA+QAHwiAqxwBYKpv7iAhOh9VH+aBoMwAyvLPUD4v9IrkA8PB0FAHUHE7deBBJcy3UwltAJhaPDHvjQMQ1ostkOAD+A03phKmgpjsnFvwLDNilFJCU9eGtd9akNA3AC7qvE0H2JSeSS8VzAqKU9ORmjwUyzlDTA6gOvasBdDvdSNBJD7UlwfYmLDbfQX1n/2gbZG4vEfDcKLcjG5ajAA8Cx0Ts4tkZR2gHiB7zvcAEGeyqH5gez/9gBUuZI9XDWMfgEtlDdZWdY/Gz3XgAVs1qiJT8g+kH8tyWHs/cDCxeFEPAFyuwenufEDbrSP6FSGAcMh7cLu9Nu50EuOs3sPT2zoiaE7vHREXWuoHesLWDgCMYTTI46hRA9ikkpT+2RWKP5g3+u4JuT65pl8zClxgSnrAdYwrhWSgxrrAvoFdMca1/rti25rhmxbI1ukOYkihYS83EGPMtagJqLZs7807Y+2YC7h+TyoeNql9MmIOs4Ry6lnsgJG0uQjBF+2T0cZIg2MT85aoPKfpPqlqNmTbxU7nIrole+029ICDK2dDtOjLHNrcthC/CcjbGMaPmWCG7DKn4UrVgnNepIE3ahhhISrHBB2UU8EpSE3HUMIlmLIGDwgAF9qroXjJgfH8fwBjGjUhERMRB9D7s2OVUjxeU4Tmtf8/AB0I+SHWOHbAG3dfKCyjMXQcfdUrpYayyxaLNYAhsv1DApBWMD1i/cP8h6T7ii22DEGF+wA1fy844oFs8XANzjiARsMtxFA1/JFt/KjWv/rWvO/bgWchAAAAAElFTkSuQmCC"}}]);