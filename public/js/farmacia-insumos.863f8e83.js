"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[991],{5716:(t,a,e)=>{e.d(a,{Z:()=>u});var i=function(){var t=this,a=t._self._c;return t.field.array?a("span",[t.field.object?a("span",t._l(t._get(t.props.item,t.field.ruta),(function(e,i){return a("code",{key:`${t.field.text}-${i}`,attrs:{STYLE:"margin:4px"}},[t.field.keyShow?a("span",[t._v(t._s(t.field.date?t.mostrarFecha(e[t.field.keyShow],t.field.time)||"--------":e[t.field.keyShow]??"--------"))]):a("span",t._l(e,(function(r,s,o){return a("span",{key:`${t.field.text}-${i}-${s}`},[t._v(t._s(s)+": "),a("kbd",[t._v(t._s(isNaN(r)&&"Invalid Date"!==t.mostrarFecha(r,t.field.time)?t.mostrarFecha(r,t.field.time)||"--------":r??"--------"))]),o!=Object.keys(e).length-1?a("span",[t._v(t._s("\n"))]):t._e()])})),0)])})),0):a("span",t._l(t._get(t.props.item,t.field.ruta),(function(e,i){return a("code",{key:`${t.field.text}-${i}`,attrs:{STYLE:"margin:4px"}},[t._v(t._s(t.field.date?t.mostrarFecha(e,t.field.time)||"--------":e??"--------"))])})),0)]):t.field.object?a("span",[a("code",{attrs:{STYLE:"margin:4px"}},[t.field.keyShow?a("span",[t._v(t._s(t.field.date?t.mostrarFecha(t._get(t.props.item,t.field.ruta)[t.field.keyShow],t.field.time)||"--------":t._get(t.props.item,t.field.ruta)[t.field.keyShow]??"--------"))]):a("span",t._l(t._get(t.props.item,t.field.ruta),(function(e,i,r){return a("span",{key:`${t.field.text}-${i}`},[t._v(t._s(i)+": "),a("kbd",[t._v(t._s(isNaN(e)&&"Invalid Date"!==t.mostrarFecha(e,t.field.time)?`${t.mostrarFecha(e,t.field.time)}`||"--------":e??"--------"))]),r!=Object.keys(t._get(t.props.item,t.field.ruta)).length-1?a("span",[t._v(t._s("\n"))]):t._e()])})),0)])]):a("span",{style:""+(t.field.numeric&&t._get(t.props.item,t.field.ruta)<0?"color: red;":"")},[t._v(t._s(t.field.date?t.mostrarFecha(t.props.item[t.field.ruta],t.field.time)||"--------":t.field.boolean?""+(t._get(t.props.item,t.field.ruta)&&"false"!=t._get(t.props.item,t.field.ruta)&&"0"!=t._get(t.props.item,t.field.ruta)?"Si":"No"):t._get(t.props.item,t.field.ruta)?.toLocaleString("es-AR")??"--------"))])},r=[];const s={name:"body-data-table-dinamic",props:["props","field"]},o=s;var n=e(1001),l=(0,n.Z)(o,i,r,!1,null,null,null);const u=l.exports},2301:(t,a,e)=>{e.r(a),e.d(a,{default:()=>F});var i=e(8469),r=e(6194),s=e(8956),o=e(2353),n=e(9418),l=e(6530),u=e(7352),d=e(108),c=e(683),m=e(3667),p=e(9456),h=e(6446),f=e(8143),g=e(4618),_=e(1415),v=function(){var t=this,a=t._self._c;return a(l.Z,{attrs:{fluid:"","grid-list-xs":""}},[a(p.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[a(c.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[a(s.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[a(o.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Gestion de Farmacia ======")])],1)],1),a(c.Z,{attrs:{"pa-1":"","ma-1":"",xs12:"",cuarto:"","lighten-1":""}},[a(s.Z,{staticClass:"elevation-6"},[a(p.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[a(c.Z,{attrs:{"px-3":""}},[a(m.Z,{attrs:{medium:"",color:"white",left:""}},[t._v("fa-solid fa-pills")]),a("span",{staticClass:"title white--text"},[t._v("Gestion de Insumos")])],1),a(f.Cl),a(d.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),a(r.Z,{staticClass:"mb-2",attrs:{color:"primary",disabled:t.loading.estado},on:{click:t.recargarDataTable}},[a(m.Z,{attrs:{medium:"",left:""}},[t._v("refresh")]),t._v(" Recargar Insumos")],1)],1),a("div",[a(n.Z,[a(c.Z,{attrs:{xs12:"",sm4:"","px-2":""}},[a(g.h,{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":"",clearable:""},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1),a(f.Cl),a(d.Z,{staticClass:"hidden-xs-only mx-2 primary",attrs:{inset:"",vertical:""}}),a(r.Z,{staticClass:"mb-2",attrs:{color:"primary",disabled:t.soloLectura||t.loading.estado},on:{click:function(a){return t.actualizarDialogInsumo({state:!0})}}},[a(m.Z,{attrs:{medium:"",left:""}},[t._v("add_circle_outline")]),t._v(" Nuevo Insumo")],1)],1),a(u.Z,{staticClass:"elevation-6",staticStyle:{"table-layout":"fixed"},attrs:{id:"tablita",headers:t.headers,items:t.dataTable,"item-key":"_id",pagination:t.paginacion,"rows-per-page-items":[5,10,25,50],loading:t.loading.estado,search:t.search},on:{"update:pagination":function(a){t.paginacion=a}},scopedSlots:t._u([{key:"no-results",fn:function(){return[a(i.Z,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[t._v(' No se encontraron resultados para "'+t._s(t.search)+'". ')])]},proxy:!0},{key:"no-data",fn:function(){return[a(i.Z,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[t._v(" No hay datos para mostrar. ")])]},proxy:!0},{key:"items",fn:function(e){return[a("tr",{class:t.backgroundClass(e.item)},[a("td",{staticClass:"text-sm-left"},[a("div",{staticClass:"text-xs-center",staticStyle:{width:"60px"}},[a(_.Z,{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:i}){return[a(m.Z,t._g({staticClass:"mr-2",attrs:{disabled:t.soloLectura||t.loading.estado,color:"primary"},on:{click:function(a){return t.actualizarDialogInsumo({state:!0,id:e.item.id})}}},i),[t._v(" edit ")])]}}],null,!0)},[a("span",[t._v("Editar - "+t._s(e.item.nombre))])]),a(_.Z,{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:i}){return[a(m.Z,t._g({attrs:{disabled:t.soloLectura||t.loading.estado,color:"error"},on:{click:function(a){return t.borrarInsumo({insumo:e.item})}}},i),[t._v(" delete ")])]}}],null,!0)},[a("span",[t._v("Borrar - "+t._s(e.item.nombre))])])],1)]),t._l(t.headersDinamics,(function(t){return a("td",{key:t.text,class:t.class},[a("bodyDataTableDinamic",{attrs:{props:e,field:t}})],1)}))],2)]}}])},[a(h.Z,{attrs:{color:"blue",indeterminate:""}})],1)],1)],1)],1)],1),a("dialogInsumo",{attrs:{close:t.close}})],1)},b=[],y=e(629),x=e(5716),I=e(7416),k=e(5049),w=e(445),Z=e(4920),C=e(5730),L=function(){var t=this,a=t._self._c;return a(k.Z,{attrs:{"max-width":"80%",persistent:"",scrollable:""},model:{value:t.dialogInsumo.state,callback:function(a){t.$set(t.dialogInsumo,"state",a)},expression:"dialogInsumo.state"}},[a(s.Z,[a(Z.Z,{attrs:{color:"grey lighten-2",height:"auto",window:""}},[a(m.Z,{attrs:{medium:"",color:"black darken-2"}},[t._v("fa-solid fa-pills")]),a("span",{staticClass:"display-1 font-weight-bold text-capitalize black--text text--darken-2"},[t._v(t._s(t.dialogInsumo.id?`Editar: ${t.insumo.nombre}`:"Nuevo Insumo"))]),a(f.Cl),a(m.Z,{attrs:{large:"",disabled:t.loading.estado,color:"error darken-1"},on:{click:t.close}},[t._v("cancel_presentation")])],1),a(o.ZB,[a(w.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valido,callback:function(a){t.valido=a},expression:"valido"}},[a(l.Z,{attrs:{"grid-list-md":"","pa-0":""}},[a(p.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[a(c.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(I.Z,{staticClass:"capitalizar",attrs:{readonly:t.dialogInsumo.soloLectura,clearable:!t.dialogInsumo.soloLectura,"background-color":t.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5",items:t.insumoCategorias,label:"Categoria","prepend-icon":"description",color:"primary",rules:[...t.rules.requerido],"validate-on-blur":""},model:{value:t.insumo.categoria,callback:function(a){t.$set(t.insumo,"categoria",a)},expression:"insumo.categoria"}})],1),a(c.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(g.h,{attrs:{readonly:t.dialogInsumo.soloLectura,clearable:!t.dialogInsumo.soloLectura,"background-color":t.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5","prepend-icon":"fa-solid fa-pills",label:"Nombre",type:"text",color:"primary",rules:[...t.rules.requerido],"validate-on-blur":""},model:{value:t.insumo.nombre,callback:function(a){t.$set(t.insumo,"nombre",a)},expression:"insumo.nombre"}})],1),a(c.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[a(g.h,{attrs:{readonly:t.dialogInsumo.soloLectura,clearable:!t.dialogInsumo.soloLectura,"background-color":t.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5","prepend-icon":"pin",label:"Codigo Unico (opcional)",type:"text",color:"primary"},model:{value:t.insumo.unique_code,callback:function(a){t.$set(t.insumo,"unique_code",a)},expression:"insumo.unique_code"}})],1),a(c.Z,{attrs:{xs12:"","mx-3":""}},[a(C.Z,{attrs:{readonly:t.dialogInsumo.soloLectura,clearable:!t.dialogInsumo.soloLectura,"background-color":t.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5",label:"Descripcion",color:"primary","prepend-icon":"description","auto-grow":"",rows:"2"},model:{value:t.insumo.descripcion,callback:function(a){t.$set(t.insumo,"descripcion",a)},expression:"insumo.descripcion"}})],1)],1)],1)],1)],1),a(o.h7,[a(p.Z,{attrs:{row:"",wrap:""}},[a(f.Cl),a(r.Z,{staticClass:"red darken-1 white--text",attrs:{disabled:t.loading.estado,round:"",loading:t.loading.estado},on:{click:function(a){return t.close()}}},[a(m.Z,{attrs:{left:""}},[t._v("cancel_presentation")]),t._v("Cancelar ")],1),a(r.Z,{staticClass:"primary darken-1 white--text",attrs:{disabled:t.loading.estado||t.dialogInsumo.soloLectura,loading:t.loading.estado,round:""},on:{click:function(a){return t.guardarInsumo()}}},[a(m.Z,{attrs:{left:""}},[t._v("save")]),t._v(t._s(t.valido?t.dialogInsumo.id?"Guardar":"Crear":"Formulario No valido")+" ")],1)],1)],1)],1)],1)},$=[];const D={name:"dialogInsumo",props:["close"],components:{},data:()=>({valido:!0,insumo:{},insumoBase:{categoria:"",nombre:"",descripcion:"",unique_code:"",estado:!0},insumoCategorias:["Medicamento","Vacuna","Higiene/Limpieza","Enfermeria/Medico","Alimento","Varios"]}),computed:{...(0,y.rn)(["loading","persona","rules"]),...(0,y.rn)("farmacia",["dialogInsumo"])},watch:{async"dialogInsumo.state"(t){t?setTimeout((async()=>{this.dialogInsumo.id?this.insumo=Object.assign(this._cloneDeep(this.insumoBase),{estado:!1},...await this.buscarInsumosFiltro({filtro:{_id:this.dialogInsumo.id}})):this.insumo=this._cloneDeep(this.insumoBase),this.$refs.form.resetValidation()}),350):(this.insumo=this._cloneDeep(this.insumoBase),this.$refs.form.resetValidation())}},beforeMount(){this.insumo=this._cloneDeep(this.insumoBase)},methods:{...(0,y.OI)(["mostrarLoading","mostrarError","mostrarMensaje","ocultarLoading"]),...(0,y.nv)(["requestAPI"]),...(0,y.nv)("farmacia",["buscarInsumosFiltro"]),async guardarInsumo(){if(!this.$refs.form.validate())return this.mostrarError({mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."}),!1;try{this.mostrarLoading({titulo:"Efectuando cambios..."});let t=this._cloneDeep(this.insumo);if(!t._id){let a=this.isVacio(t,!0);if(!0===a.vacio)return this.mostrarError({mensaje:"Complete por lo menos un dato.",titulo:"Valores Requeridos"}),!1;t=a.dato}let a=null;if(a=await this.requestAPI({method:"put",url:"/farmacia/insumo",update:t}),a?.data?.ok){let a=t._id?"Editado":"Guardado";return this.mostrarMensaje({msj:[`Insumo ${a} exitosamente.`],titulo:"Completado"}),this.close(),!0}return!1}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (guardarInsumo)"}),!1}finally{this.ocultarLoading()}}}},B=D;var j=e(1001),E=(0,j.Z)(B,L,$,!1,null,null,null);const T=E.exports,V={name:"insumoBuscar",components:{bodyDataTableDinamic:x.Z,dialogInsumo:T},data:()=>({dataTable:[],search:"",paginacion:{sortBy:"nombre",descending:!1,rowsPerPage:10,page:1},headers:[{text:"Acciones",value:"id",align:"center",sortable:!1,width:"5%",ruta:"area",ignore:!0},{text:"Categoria",value:"categoria",align:"left",class:"text-xs-left",width:"15%",ruta:"categoria"},{text:"Nombre",value:"nombre",align:"left",class:"text-xs-left",width:"30%",ruta:"nombre"},{text:"Descripcion",value:"descripcion",align:"left",class:"text-xs-left",width:"35%",ruta:"descripcion"},{text:"Codigo Unico (opcional)",value:"unique_code",align:"left",class:"text-xs-left",width:"15%",ruta:"unique_code"}]}),computed:{...(0,y.rn)(["loading","persona"]),soloLectura(){return!(this.persona.farmacia.insumos||this.persona.farmacia.general?.admin)},headersDinamics(){return[...this.headers.filter((t=>!0!==t.ignore))]}},async created(){this.recargarDataTable()},methods:{...(0,y.OI)(["mostrarLoading","mostrarError","mostrarMensaje","ocultarLoading"]),...(0,y.nv)(["requestAPI"]),...(0,y.nv)("farmacia",["actualizarDialogInsumo","buscarInsumosFiltro"]),backgroundClass(t){if(!t)return"";try{return!0===t.estado?"background-color: primary lighten-5":"background-color: error lighten-4"}catch(a){return""}},close(){this.actualizarDialogInsumo({state:!1}),this.recargarDataTable()},async recargarDataTable(){this.dataTable=await this.buscarInsumosFiltro(),this.paginacion.page>Math.ceil(this.dataTable.length/this.paginacion.rowsPerPage)&&(this.paginacion.page=1)},async borrarInsumo(t){let a=t.insumo.nombre.trim().split(" ");if(a=a.filter((t=>""!==t)),a=a.map((t=>t[0].toUpperCase()+t.substring(1).toLowerCase())).reduce(((t,a)=>`${t} ${a}`)),confirm(`Esta seguro que desea ELIMINAR\n Este Insumo: ${a}?\n\n          Dejara de Existir si todavia no se utilizo.`))try{this.mostrarLoading({titulo:"Borrando Insumo..."});let a=null;return a=await this.requestAPI({method:"delete",url:`/farmacia/insumo/${t.insumo.id}`}),!!a?.data?.ok&&(this.mostrarMensaje({msj:["Borrado exitosamente."],titulo:"Borrado Exitoso"}),this.recargarDataTable(),!0)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (borrarInsumo)"}),!1}finally{this.ocultarLoading()}}}},S=V;var q=(0,j.Z)(S,v,b,!1,null,null,null);const F=q.exports},445:(t,a,e)=>{e.d(a,{Z:()=>r});var i=e(21);const r={name:"v-form",mixins:[(0,i.J)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var a=this,e=function(t){return t.$watch("hasError",(function(e){a.$set(a.errorBag,t._uid,e)}),{immediate:!0})},i={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(r){r&&(a.errorBag.hasOwnProperty(t._uid)||(i.valid=e(t)))})):i.valid=e(t),i},validate:function(){var t=this.inputs.filter((function(t){return!t.validate(!0)})).length;return!t},reset:function(){for(var t=this,a=this.inputs.length;a--;)this.inputs[a].reset();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){for(var t=this,a=this.inputs.length;a--;)this.inputs[a].resetValidation();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},register:function(t){var a=this.watchInput(t);this.inputs.push(t),this.watchers.push(a)},unregister:function(t){var a=this.inputs.find((function(a){return a._uid===t._uid}));if(a){var e=this.watchers.find((function(t){return t._uid===a._uid}));e.valid&&e.valid(),e.shouldValidate&&e.shouldValidate(),this.watchers=this.watchers.filter((function(t){return t._uid!==a._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==a._uid})),this.$delete(this.errorBag,a._uid)}}},render:function(t){var a=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return a.$emit("submit",t)}}},this.$slots.default)}}}}]);