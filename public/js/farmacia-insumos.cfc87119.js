"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[991],{5716:function(a,e,t){t.d(e,{Z:function(){return u}});var o=function(){var a=this,e=a._self._c;return a.field.array?e("span",[a.field.object?e("span",a._l(a._get(a.props.item,a.field.ruta),(function(t,o){return e("code",{key:`${a.field.text}-${o}`,attrs:{STYLE:"margin:4px"}},[a.field.keyShow?e("span",[a._v(a._s(a.field.date?a.mostrarFecha(t[a.field.keyShow],a.field.time)||"--------":t[a.field.keyShow]??"--------"))]):e("span",a._l(t,(function(i,s,r){return e("span",{key:`${a.field.text}-${o}-${s}`},[a._v(a._s(s)+": "),e("kbd",[a._v(a._s(isNaN(i)&&"Invalid Date"!==a.mostrarFecha(i,a.field.time)?a.mostrarFecha(i,a.field.time)||"--------":i??"--------"))]),r!=Object.keys(t).length-1?e("span",[a._v(a._s("\n"))]):a._e()])})),0)])})),0):e("span",a._l(a._get(a.props.item,a.field.ruta),(function(t,o){return e("code",{key:`${a.field.text}-${o}`,attrs:{STYLE:"margin:4px"}},[a._v(a._s(a.field.date?a.mostrarFecha(t,a.field.time)||"--------":t??"--------"))])})),0)]):a.field.object?e("span",[e("code",{attrs:{STYLE:"margin:4px"}},[a.field.keyShow?e("span",[a._v(a._s(a.field.date?a.mostrarFecha(a._get(a.props.item,a.field.ruta)[a.field.keyShow],a.field.time)||"--------":a._get(a.props.item,a.field.ruta)[a.field.keyShow]??"--------"))]):e("span",a._l(a._get(a.props.item,a.field.ruta),(function(t,o,i){return e("span",{key:`${a.field.text}-${o}`},[a._v(a._s(o)+": "),e("kbd",[a._v(a._s(isNaN(t)&&"Invalid Date"!==a.mostrarFecha(t,a.field.time)?`${a.mostrarFecha(t,a.field.time)}`||"--------":t??"--------"))]),i!=Object.keys(a._get(a.props.item,a.field.ruta)).length-1?e("span",[a._v(a._s("\n"))]):a._e()])})),0)])]):e("span",{style:""+(a.field.numeric&&a._get(a.props.item,a.field.ruta)<0?"color: red;":"")},[a._v(a._s(a.field.date?a.mostrarFecha(a.props.item[a.field.ruta],a.field.time)||"--------":a.field.boolean?""+(a._get(a.props.item,a.field.ruta)&&"false"!=a._get(a.props.item,a.field.ruta)&&"0"!=a._get(a.props.item,a.field.ruta)?"Si":"No"):a._get(a.props.item,a.field.ruta)?.toLocaleString("es-AR")??"--------"))])},i=[],s={name:"body-data-table-dinamic",props:["props","field"]},r=s,n=t(1001),l=(0,n.Z)(r,o,i,!1,null,null,null),u=l.exports},723:function(a,e,t){t.r(e),t.d(e,{default:function(){return O}});var o=t(8469),i=t(6194),s=t(8956),r=t(2353),n=t(9418),l=t(5050),u=t(7352),c=t(108),d=t(683),m=t(3667),p=t(9456),h=t(6446),g=t(8143),f=t(4618),_=t(1415),v=function(){var a=this,e=a._self._c;return e(l.Z,{attrs:{fluid:"","grid-list-xs":""}},[e(p.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(d.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(s.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(r.ZB,{staticClass:"px-0 text-uppercase"},[a._v("====== Gestion de Farmacia ======")])],1)],1),e(d.Z,{attrs:{"pa-1":"","ma-1":"",red:"","darken-2":"",xs12:""}},[e(s.Z,{attrs:{color:"yellow darken-1"}},[e(r.ZB,{staticClass:"px-3 font-weight-medium"},[e("p",[e(m.Z,{attrs:{color:"red darken-3",left:""}},[a._v(" warning ")]),e("b",[e("u",[a._v("Antes de Crear un Nuevo Insumo:")])])],1),a._v(" Por favor, utilizar la funcion de "),e("b",[e("u",[a._v("Buscar")])]),a._v(" para ver si ya esta "),e("b",[e("u",[a._v("Creado")])]),a._v(" dicho Insumo porque al generar un nuevo Insumo con nombre similar va generar "),e("b",[e("u",[a._v("confusion")])]),a._v(" y "),e("b",[e("u",[a._v("reportes erroneos")])]),a._v(", si conoce al Insumo por otro "),e("b",[e("u",[a._v("sinonimo")])]),a._v(" puede agregarselo al ya Creado utilizando el boton de "),e("b",[e("u",[a._v("Edicion")])]),a._v(" y agregando dicho sinonimo a su "),e("b",[e("u",[a._v("Nombre")])]),a._v(" (Visible en todas las etapas) o "),e("b",[e("u",[a._v("Descripcion")])]),a._v(" (Visible solamente al momento de generar un Ingreso o Solicitudes). ")])],1)],1),e(d.Z,{attrs:{"pa-1":"","ma-1":"",xs12:"",cuarto:"","lighten-1":""}},[e(s.Z,{staticClass:"elevation-6"},[e(p.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[e(d.Z,{attrs:{"px-3":""}},[e(m.Z,{attrs:{medium:"",color:"white",left:""}},[a._v("fa-solid fa-pills")]),e("span",{staticClass:"title white--text"},[a._v("Gestion de Insumos")])],1),e(g.Cl),e(c.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),e(i.Z,{staticClass:"mb-2",attrs:{color:"primary",disabled:a.loading.estado},on:{click:a.recargarDataTable}},[e(m.Z,{attrs:{medium:"",left:""}},[a._v("refresh")]),a._v(" Recargar Insumos")],1)],1),e("div",[e(n.Z,[e(d.Z,{attrs:{xs12:"",sm4:"","px-2":""}},[e(f.h,{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":"",clearable:""},model:{value:a.search,callback:function(e){a.search=e},expression:"search"}})],1),e(g.Cl),e(c.Z,{staticClass:"hidden-xs-only mx-2 primary",attrs:{inset:"",vertical:""}}),e(i.Z,{staticClass:"mb-2",attrs:{color:"primary",disabled:a.soloLectura||a.loading.estado},on:{click:function(e){return a.actualizarDialogInsumo({state:!0})}}},[e(m.Z,{attrs:{medium:"",left:""}},[a._v("add_circle_outline")]),a._v(" Nuevo Insumo")],1)],1),e(u.Z,{staticClass:"elevation-6",staticStyle:{"table-layout":"fixed"},attrs:{id:"tablita",headers:a.headers,items:a.dataTable,"item-key":"_id",pagination:a.paginacion,"rows-per-page-items":[5,10,25,50],loading:a.loading.estado,search:a.search},on:{"update:pagination":function(e){a.paginacion=e}},scopedSlots:a._u([{key:"no-results",fn:function(){return[e(o.Z,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[a._v(' No se encontraron resultados para "'+a._s(a.search)+'". ')])]},proxy:!0},{key:"no-data",fn:function(){return[e(o.Z,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[a._v(" No hay datos para mostrar. ")])]},proxy:!0},{key:"items",fn:function(t){return[e("tr",{class:a.backgroundClass(t.item)},[e("td",{staticClass:"text-sm-left"},[e("div",{staticClass:"text-xs-center",staticStyle:{width:"60px"}},[e(_.Z,{attrs:{top:""},scopedSlots:a._u([{key:"activator",fn:function({on:o}){return[e(m.Z,a._g({staticClass:"mr-2",attrs:{disabled:a.soloLectura||a.loading.estado,color:"primary"},on:{click:function(e){return a.actualizarDialogInsumo({state:!0,id:t.item.id})}}},o),[a._v(" edit ")])]}}],null,!0)},[e("span",[a._v("Editar - "+a._s(t.item.nombre))])]),e(_.Z,{attrs:{top:""},scopedSlots:a._u([{key:"activator",fn:function({on:o}){return[e(m.Z,a._g({attrs:{disabled:a.soloLectura||a.loading.estado,color:"error"},on:{click:function(e){return a.borrarInsumo({insumo:t.item})}}},o),[a._v(" delete ")])]}}],null,!0)},[e("span",[a._v("Borrar - "+a._s(t.item.nombre))])])],1)]),a._l(a.headersDinamics,(function(a){return e("td",{key:a.text,class:a.class},[e("bodyDataTableDinamic",{attrs:{props:t,field:a}})],1)}))],2)]}}])},[e(h.Z,{attrs:{color:"blue",indeterminate:""}})],1)],1)],1)],1)],1),e("dialogInsumo",{attrs:{close:a.close}})],1)},b=[],y=t(629),x=t(5716),I=t(7416),k=t(5049),w=t(445),Z=t(4036),C=t(4920),L=t(5730),$=function(){var a=this,e=a._self._c;return e(k.Z,{attrs:{"max-width":"80%",persistent:"",scrollable:""},model:{value:a.dialogInsumo.state,callback:function(e){a.$set(a.dialogInsumo,"state",e)},expression:"dialogInsumo.state"}},[e(s.Z,[e(C.Z,{attrs:{color:"grey lighten-2",height:"auto",window:""}},[e(m.Z,{attrs:{medium:"",color:"black darken-2"}},[a._v("fa-solid fa-pills")]),e("span",{staticClass:"display-1 font-weight-bold black--text text--darken-2"},[a._v(a._s(a.dialogInsumo.id?`Editar: ${a.insumo.nombre}`:"Nuevo Insumo"))]),e(g.Cl),e(m.Z,{attrs:{large:"",disabled:a.loading.estado,color:"error darken-1"},on:{click:a.close}},[a._v("cancel_presentation")])],1),e(r.ZB,[e(w.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:a.valido,callback:function(e){a.valido=e},expression:"valido"}},[e(p.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(d.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(I.Z,{staticClass:"capitalizar",attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5",items:a.optionsJsonFarmacia.insumo_categorias,label:"Categoria","prepend-icon":"description",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.insumo.categoria,callback:function(e){a.$set(a.insumo,"categoria",e)},expression:"insumo.categoria"}})],1),e(d.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(f.h,{attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5","prepend-icon":"fa-solid fa-pills",label:"Nombre",type:"text",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.insumo.nombre,callback:function(e){a.$set(a.insumo,"nombre",e)},expression:"insumo.nombre"}})],1),e(d.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(f.h,{attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5","prepend-icon":"pin",label:"Codigo Unico (opcional)",type:"text",color:"primary"},model:{value:a.insumo.unique_code,callback:function(e){a.$set(a.insumo,"unique_code",e)},expression:"insumo.unique_code"}})],1),e(d.Z,{attrs:{xs12:"","px-3":""}},[e(L.Z,{attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5",label:"Descripcion",color:"primary","prepend-icon":"description","auto-grow":"",rows:"2"},model:{value:a.insumo.descripcion,callback:function(e){a.$set(a.insumo,"descripcion",e)},expression:"insumo.descripcion"}})],1),"Vacuna"===a.insumo.categoria?e(d.Z,{attrs:{xs12:"","px-3":""}},[e(Z.r,{attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-2":"primary lighten-5",items:a.optionsJsonFarmacia.vacunas_condiciones,label:"Condiciones de Aplicacion (Opcional)","prepend-icon":"block",color:"primary","menu-props":{auto:!0},multiple:"",chips:"","deletable-chips":""},model:{value:a.insumo.condiciones,callback:function(e){a.$set(a.insumo,"condiciones",e)},expression:"insumo.condiciones"}})],1):a._e(),"Vacuna"===a.insumo.categoria?e(d.Z,{attrs:{"pa-1":"","ma-1":"",red:"","darken-2":"",xs12:""}},[e(s.Z,[e(r.ZB,{staticClass:"px-3 font-weight-medium"},[e("p",[e(m.Z,{attrs:{color:"yellow darken-3",left:""}},[a._v(" warning ")]),e("b",[e("u",[a._v("Los Antecedentes Patologicos son los siguientes:")])])],1),e("ul",a._l(a.optionsJsonHiclem.consulta_antecedentes,(function(t,o){return e("li",{key:`antecedentes-${t}`,attrs:{type:"square"}},[e("b",[a._v(a._s(t))]),a._v(". ")])})),0)])],1)],1):a._e(),"Vacuna"===a.insumo.categoria?e(d.Z,{attrs:{xs12:"","px-3":""}},[e(Z.r,{attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-2":"primary lighten-5",items:a.optionsJsonFarmacia.vacunas_dosis_posibles,label:"Opciones de Dosis al Aplicar la Vacuna","prepend-icon":"list",color:"primary","menu-props":{auto:!0},rules:[...a.rules.requerido],multiple:"",chips:"","deletable-chips":""},model:{value:a.insumo.dosis_posibles,callback:function(e){a.$set(a.insumo,"dosis_posibles",e)},expression:"insumo.dosis_posibles"}})],1):a._e()],1)],1)],1),e(r.h7,[e(p.Z,{attrs:{row:"",wrap:""}},[e(g.Cl),e(i.Z,{staticClass:"red darken-1 white--text",attrs:{disabled:a.loading.estado,round:"",loading:a.loading.estado},on:{click:function(e){return a.close()}}},[e(m.Z,{attrs:{left:""}},[a._v("cancel_presentation")]),a._v("Cancelar ")],1),e(i.Z,{staticClass:"primary darken-1 white--text",attrs:{disabled:a.loading.estado||a.dialogInsumo.soloLectura,loading:a.loading.estado,round:""},on:{click:function(e){return a.guardarInsumo()}}},[e(m.Z,{attrs:{left:""}},[a._v("save")]),a._v(a._s(a.valido?a.dialogInsumo.id?"Guardar":"Crear":"Formulario No valido")+" ")],1)],1)],1)],1)],1)},D=[],B={name:"dialogInsumo",props:["close"],data:()=>({valido:!0,optionsJsonFarmacia:{},optionsJsonHiclem:{},insumo:{},insumoBase:{categoria:"",nombre:"",descripcion:"",unique_code:"",condiciones:[],dosis_posibles:[],estado:!0}}),computed:{...(0,y.rn)(["loading","persona","rules"]),...(0,y.rn)("farmacia",["dialogInsumo"])},watch:{async"dialogInsumo.state"(a){a?(setTimeout((async()=>{this.dialogInsumo.id?this.insumo=Object.assign(this._cloneDeep(this.insumoBase),{estado:!1},...await this.buscarInsumosFiltro({filtro:{_id:this.dialogInsumo.id}})):this.insumo=this._cloneDeep(this.insumoBase),this.$refs.form.resetValidation()}),350),this.optionsJsonFarmacia=await this.returnOptionsJSON({key:"farmacia",opcion:"base"})):(this.insumo=this._cloneDeep(this.insumoBase),this.$refs.form.resetValidation())},"insumo.categoria"(a){"Vacuna"!==a&&(this.insumo.condiciones=[],this.insumo.dosis_posibles=[])}},async beforeMount(){this.insumo=this._cloneDeep(this.insumoBase),this.optionsJsonFarmacia=await this.returnOptionsJSON({key:"farmacia",opcion:"base"}),this.optionsJsonHiclem=await this.returnOptionsJSON({key:"hiclem",opcion:"base"})},methods:{...(0,y.OI)(["mostrarLoading","mostrarError","mostrarMensaje","ocultarLoading"]),...(0,y.nv)(["returnOptionsJSON","requestAPI"]),...(0,y.nv)("farmacia",["buscarInsumosFiltro"]),async guardarInsumo(){if(!this.$refs.form.validate())return this.mostrarError({mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."}),!1;try{let a=this._cloneDeep(this.insumo);if(a._id){if(!await this.$root.$confirm.open({titulo:"EDITAR",msj:["Las modificaciones efectuadas repercutiran en todas las cargas Futuras y Ya Realizadas de este Insumo.","¿Desea continuar?"]}))return!1}else{let e=this.isVacio(a,!0);if(!0===e.vacio)return this.mostrarError({mensaje:"Complete por lo menos un dato.",titulo:"Valores Requeridos"}),!1;a=e.dato}this.mostrarLoading({titulo:"Guardando Insumo..."});let e=null;return e=await this.requestAPI({method:"put",url:"/farmacia/insumo",update:a}),!!e?.data?.ok&&(this.mostrarMensaje({msj:[`Insumo ${a._id?"Editado":"Guardado"} exitosamente.`],titulo:"Completado"}),this.close(),!0)}catch(a){return this.mostrarError({mensaje:a,titulo:"Inesperado (guardarInsumo)"}),!1}finally{this.ocultarLoading()}}}},j=B,V=t(1001),F=(0,V.Z)(j,$,D,!1,null,null,null),S=F.exports,E={name:"insumoBuscar",components:{bodyDataTableDinamic:x.Z,dialogInsumo:S},data:()=>({dataTable:[],search:"",paginacion:{sortBy:"nombre",descending:!1,rowsPerPage:10,page:1},headers:[{text:"Acciones",value:"id",align:"center",sortable:!1,width:"5%",ruta:"area",ignore:!0},{text:"Categoria",value:"categoria",align:"left",class:"text-xs-left",width:"15%",ruta:"categoria"},{text:"Nombre",value:"nombre",align:"left",class:"text-xs-left",width:"30%",ruta:"nombre"},{text:"Descripcion",value:"descripcion",align:"left",class:"text-xs-left",width:"35%",ruta:"descripcion"},{text:"Codigo Unico (opcional)",value:"unique_code",align:"left",class:"text-xs-left",width:"15%",ruta:"unique_code"}]}),computed:{...(0,y.rn)(["loading","persona"]),soloLectura(){return!(this.persona.farmacia.insumos||this.persona.farmacia.general?.admin)},headersDinamics(){return[...this.headers.filter((a=>!0!==a.ignore))]}},async created(){this.recargarDataTable()},methods:{...(0,y.OI)(["mostrarLoading","mostrarError","mostrarMensaje","ocultarLoading"]),...(0,y.nv)(["requestAPI"]),...(0,y.nv)("farmacia",["actualizarDialogInsumo","buscarInsumosFiltro"]),backgroundClass(a){if(!a)return"";try{return!0===a.estado?"background-color: primary lighten-5":"background-color: error lighten-4"}catch(e){return""}},close(){this.actualizarDialogInsumo({state:!1}),this.recargarDataTable()},async recargarDataTable(){this.dataTable=await this.buscarInsumosFiltro(),this.paginacion.page>Math.ceil(this.dataTable?.length/this.paginacion.rowsPerPage)&&(this.paginacion.page=1)},async borrarInsumo({insumo:a}){if(await this.$root.$confirm.open({titulo:"ELIMINAR",msj:["Podra Eliminarlo solamente si todavia no se utilizo para ningun ingreso/solicitud.","Dejara de estar disponible para la carga de ingresos y filtros de busqueda.",`El Insumo: ${a.nombre}, sera Eliminado.\n¿Desea continuar?`]}))try{this.mostrarLoading({titulo:"Borrando Insumo..."});let e=null;return e=await this.requestAPI({method:"delete",url:`/farmacia/insumo/${a.id}`}),!!e?.data?.ok&&(this.mostrarMensaje({msj:["Borrado exitosamente."],titulo:"Borrado Exitoso"}),this.recargarDataTable(),!0)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (borrarInsumo)"}),!1}finally{this.ocultarLoading()}}}},N=E,q=(0,V.Z)(N,v,b,!1,null,null,null),O=q.exports},445:function(a,e,t){t.d(e,{Z:function(){return i}});var o=t(21),i={name:"v-form",mixins:[(0,o.J)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var a=Object.values(this.errorBag).includes(!0);this.$emit("input",!a)},deep:!0,immediate:!0}},methods:{watchInput:function(a){var e=this,t=function(a){return a.$watch("hasError",(function(t){e.$set(e.errorBag,a._uid,t)}),{immediate:!0})},o={_uid:a._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?o.shouldValidate=a.$watch("shouldValidate",(function(i){i&&(e.errorBag.hasOwnProperty(a._uid)||(o.valid=t(a)))})):o.valid=t(a),o},validate:function(){var a=this.inputs.filter((function(a){return!a.validate(!0)})).length;return!a},reset:function(){for(var a=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout((function(){a.errorBag={}}),0)},resetValidation:function(){for(var a=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout((function(){a.errorBag={}}),0)},register:function(a){var e=this.watchInput(a);this.inputs.push(a),this.watchers.push(e)},unregister:function(a){var e=this.inputs.find((function(e){return e._uid===a._uid}));if(e){var t=this.watchers.find((function(a){return a._uid===e._uid}));t.valid&&t.valid(),t.shouldValidate&&t.shouldValidate(),this.watchers=this.watchers.filter((function(a){return a._uid!==e._uid})),this.inputs=this.inputs.filter((function(a){return a._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(a){var e=this;return a("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(a){return e.$emit("submit",a)}}},this.$slots.default)}}}}]);