"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[517],{5167:function(e,t,a){a.d(t,{Z:function(){return c}});var r=function(){var e=this,t=e._self._c;return e.field.array?t("span",[e.field.object?t("span",e._l(e._get(e.props.item,e.field.ruta),(function(a,r){return t("code",{key:`${e.field.text}-${r}`,attrs:{STYLE:"margin:4px"}},[e.field.keyShow?t("span",[e._v(e._s(e.field.date?e.mostrarFecha(a[e.field.keyShow],e.field.time):a[e.field.keyShow]||"0"==a[e.field.keyShow]?a[e.field.keyShow]:"S/D"))]):t("span",e._l(a,(function(o,s,i){return t("span",{key:`${e.field.text}-${r}-${s}`},[e._v(e._s(s)+": "),t("kbd",[e._v(e._s(isNaN(o)&&"Invalid Date"!==e.mostrarFecha(o,e.field.time)?e.mostrarFecha(o,e.field.time)||"S/D":o||"0"==o?o:"S/D"))]),i!=Object.keys(a).length-1?t("span",[e._v(e._s("\n"))]):e._e()])})),0)])})),0):t("span",e._l(e._get(e.props.item,e.field.ruta),(function(a,r){return t("code",{key:`${e.field.text}-${r}`,attrs:{STYLE:"margin:4px"}},[e._v(e._s(e.field.date?e.mostrarFecha(a,e.field.time):a||"0"==a?a:"S/D"))])})),0)]):e.field.object?t("span",[t("code",{attrs:{STYLE:"margin:4px"}},[e.field.keyShow?t("span",[e._v(e._s(e.field.date?e.mostrarFecha(e._get(e.props.item,e.field.ruta)[e.field.keyShow],e.field.time):e._get(e.props.item,e.field.ruta)[e.field.keyShow]||"0"==e._get(e.props.item,e.field.ruta)[e.field.keyShow]?e._get(e.props.item,e.field.ruta)[e.field.keyShow]:"--------"))]):t("span",e._l(e._get(e.props.item,e.field.ruta),(function(a,r,o){return t("span",{key:`${e.field.text}-${r}`},[e._v(e._s(r)+": "),t("kbd",[e._v(e._s(isNaN(a)&&"Invalid Date"!==e.mostrarFecha(a,e.field.time)?`${e.mostrarFecha(a,e.field.time)}`||"S/D":a||"0"==a?`${a}`:"S/D"))]),o!=Object.keys(e._get(e.props.item,e.field.ruta)).length-1?t("span",[e._v(e._s("\n"))]):e._e()])})),0)])]):t("span",{style:""+(e.field.numeric&&e._get(e.props.item,e.field.ruta)<0?"color: red;":"")},[e._v(e._s(e.field.date?e.mostrarFecha(e.props.item[e.field.ruta],e.field.time):e.field.boolean?""+(e._get(e.props.item,e.field.ruta)&&"false"!=e._get(e.props.item,e.field.ruta)&&"0"!=e._get(e.props.item,e.field.ruta)?"Si":"No"):e._get(e.props.item,e.field.ruta)||"0"==e._get(e.props.item,e.field.ruta)?e._get(e.props.item,e.field.ruta):"--------"))])},o=[],s={name:"body-data-table-dinamic",props:["props","field"]},i=s,l=a(1001),n=(0,l.Z)(i,r,o,!1,null,null,null),c=n.exports},5967:function(e,t,a){a.d(t,{Z:function(){return p}});var r=a(6961),o=a(683),s=a(9456),i=a(5084),l=a(4618),n=function(){var e=this,t=e._self._c;return t(s.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(o.Z,{attrs:{xs12:"","px-2":""}},[t(i.Z,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:a}){return[t(l.h,e._g({attrs:{clearable:!e.soloLect&&!!e.clear,"background-color":e.soloLect?`${e.color} lighten-2`:`${e.color} lighten-5`,label:e.label,"prepend-icon":e.prepend,readonly:"",color:`${e.color} darken-3`,rules:e.req?e.validate:[]},on:{"click:clear":function(t){return e.$emit("input","")}},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}},a))]}}]),model:{value:e.menufecha1,callback:function(t){e.menufecha1=t},expression:"menufecha1"}},[t(r.Z,{attrs:{readonly:e.soloLect,"allowed-dates":e.allowedDates,min:e.fecMin,max:e.fecMax,color:`${e.color} darken-3`,"header-color":`${e.color} darken-1`,locale:"mx"},on:{input:function(t){e.menufecha1=!1,e.$emit("input",t)}},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}})],1)],1)],1)},c=[],d={name:"date-select",props:["value","label","icon","color","soloLectura","requerido","min","max","filtro","clearable"],data(){return{menufecha1:!1,validate:[e=>e?""===e.trim()?"Este campo es requerido.":!(e&&e.length<10)||"Ingrese fecha valida (AAAA-MM-DD).":"Este campo es requerido."]}},computed:{fecha:function(){return this.value},soloLect:function(){return this.soloLectura||!1},prepend:function(){return this.icon||"event"},req:function(){return this.requerido||!1},clear:function(){return this.clearable||!1},fecMin:function(){return"-1"===this.min?new Date((new Date).setFullYear((new Date).getFullYear()-1)).toISOString().substr(0,10):this.min?this.min:void 0},fecMax:function(){return"+1"===this.max?new Date((new Date).setFullYear((new Date).getFullYear()+1)).toISOString().substr(0,10):this.max?this.max:void 0},restriction:function(){return this.filtro||[]}},methods:{allowedDates:function(e){return!this.restriction.includes(new Date(e).getUTCDay())}}},u=d,m=a(1001),f=(0,m.Z)(u,n,c,!1,null,null,null),p=f.exports},7519:function(e,t,a){a.r(t),a.d(t,{default:function(){return $}});var r=a(8469),o=a(7416),s=a(6194),i=a(8956),l=a(2353),n=a(9418),c=a(7441),d=a(6530),u=a(7352),m=a(108),f=a(683),p=a(3667),h=a(9456),g=a(6446),x=a(8143),_=a(4618),b=function(){var e=this,t=e._self._c;return t(d.Z,{attrs:{fluid:"","grid-list-xs":""}},[t(h.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(f.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(l.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Patrimonio ======")])],1)],1),t(f.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-1"}},[t(l.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== ====== Consultas de Insumos ====== ======")])],1),t(i.Z,{staticClass:"elevation-6",attrs:{color:"grey lighten-2"}},[t(l.ZB,{staticClass:"px-0"},[t(h.Z,{attrs:{row:"",wrap:""}},[t(x.Cl),t(f.Z,{attrs:{xs12:"",sm5:"",md4:"","px-2":""}},[t("dateSelect",{staticClass:"capitalizar",attrs:{value:e.filtro.desde,color:"cuarto",label:"Fecha Desde",icon:"event"},model:{value:e.filtro.desde,callback:function(t){e.$set(e.filtro,"desde",t)},expression:"filtro.desde"}})],1),t(x.Cl),t(m.Z,{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),t(x.Cl),t(f.Z,{attrs:{xs12:"",sm5:"",md4:"","px-2":""}},[t("dateSelect",{staticClass:"capitalizar",attrs:{value:e.filtro.hasta,color:"cuarto",label:"Fecha Hasta",icon:"event"},model:{value:e.filtro.hasta,callback:function(t){e.$set(e.filtro,"hasta",t)},expression:"filtro.hasta"}})],1),t(x.Cl)],1),t(h.Z,{attrs:{row:"",wrap:""}},[t(x.Cl),t(f.Z,{attrs:{xs12:"",sm6:"",md5:"","px-3":""}},[t(o.Z,{staticClass:"capitalizar",attrs:{"item-value":"id","item-text":"area",items:e.areas,label:"Area","prepend-icon":"location_city",color:"cuarto","background-color":"cuarto lighten-5","validate-on-blur":""},model:{value:e.filtro.area,callback:function(t){e.$set(e.filtro,"area",t)},expression:"filtro.area"}})],1),t(f.Z,{attrs:{xs12:"",sm6:"",md5:"","px-3":""}},[t(o.Z,{staticClass:"capitalizar",attrs:{"item-value":"id","item-text":"modelo",items:e.objetos,label:"Objeto Modelo","prepend-icon":"more",color:"cuarto","background-color":"cuarto lighten-5","validate-on-blur":""},model:{value:e.filtro.objeto,callback:function(t){e.$set(e.filtro,"objeto",t)},expression:"filtro.objeto"}})],1),t(x.Cl)],1)],1),t(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(s.Z,{staticClass:"white--text",attrs:{round:"",color:"cuarto lighten-1",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.cargarmes()}}},[e._v("Cargar Mes Actual")]),t(x.Cl),t(x.Cl),t(x.Cl),t(s.Z,{staticClass:"white--text",attrs:{round:"",color:"cuarto darken-3",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.buscar(e.filtro)}}},[e._v(" Buscar"),t(p.Z,{attrs:{color:"white",right:""}},[e._v("search")])],1),t(x.Cl)],1)],1)],1),t(f.Z,{attrs:{"pa-1":"","ma-2":"",terciary:"","lighten-1":"",xs12:""}},[t(n.Z,{staticClass:"title text-uppercase elevation-6"},[t(p.Z,{attrs:{left:"",color:"dark"}},[e._v("library_books")]),e._v(" Historial de Movimientos de Insumos "),t(x.Cl),t(_.h,{attrs:{"append-icon":"search",label:"Filtrar","single-line":"",color:"terciary lighten-4","hide-details":"",clearable:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),t(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","lighten-2":""}},[t(f.Z,{attrs:{"px-3":""}},[t(p.Z,{attrs:{medium:"",color:"white",left:""}},[e._v("info")]),t("span",{staticClass:"body-2 white--text"},[e._v("Seleccione los que descargara como excel")])],1),t(x.Cl),t(m.Z,{staticClass:"hidden-xs-only mx-2 my-1 black",attrs:{vertical:""}}),t(s.Z,{staticClass:"white--text",attrs:{round:"",color:"terciary darken-1",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.$router.push({name:"PatrimonioBuscar"})}}},[t(p.Z,{attrs:{color:"white",left:""}},[e._v("search")]),e._v("Buscar Objetos")],1)],1),t(u.Z,{staticClass:"elevation-6",staticStyle:{"table-layout":"fixed"},attrs:{id:"tablita",headers:e.headers,items:e.movimientos,"item-key":"_id",pagination:e.paginacion,loading:e.loading.estado,search:e.search,"select-all":""},on:{"update:pagination":function(t){e.paginacion=t}},scopedSlots:e._u([{key:"no-data",fn:function(){return[t(r.Z,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[e._v(" No hay datos para mostrar. ")])]},proxy:!0},{key:"no-results",fn:function(){return[t(r.Z,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[e._v(' No se encontraron resultados para "'+e._s(e.search)+'". ')])]},proxy:!0},{key:"items",fn:function(a){return[t("tr",{staticClass:"background-color: terciary lighten-5"},[t("td",[t(c.Z,{attrs:{color:"terciary darken-2","hide-details":""},model:{value:a.selected,callback:function(t){e.$set(a,"selected",t)},expression:"props.selected"}})],1),t("td",{staticClass:"text-sm-right font-weight-bold",style:a.item.orden_compra?"":"color: red"},[e._v(" "+e._s(a.item.cantidad)+" ")]),e._l(e.headersDinamics,(function(e){return t("td",{key:e.text,class:e.class},[t("bodyDataTableDinamic",{attrs:{props:a,field:e}})],1)}))],2)]}}]),model:{value:e.seleccionados,callback:function(t){e.seleccionados=t},expression:"seleccionados"}},[t(g.Z,{attrs:{color:"blue",indeterminate:""}})],1),t(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","lighten-2":""}},[t(x.Cl),t(m.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),t("download-excel",{attrs:{data:e.seleccionados,fields:e.columnasExcel,name:e.nombreExcel,worksheet:"Hoja1",type:"xls","before-finish":e.ocultarLoading}},[t(s.Z,{staticClass:"white--text",attrs:{round:"",color:"terciary darken-1",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.descargarExcel()}}},[t(p.Z,{attrs:{color:"white",left:""}},[e._v("far fa-file-excel")]),e._v("Descargar Excel de Seleccionados")],1)],1)],1)],1)],1)],1)},v=[],y=a(629),k=a(5967),w=a(5167),C={name:"PatrimonioInsumosConsultas",components:{dateSelect:k.Z,bodyDataTableDinamic:w.Z},data:()=>({areas:[{area:"No buscar por Area",id:""}],objetos:[{modelo:"No buscar por Objeto",id:""}],filtro:{desde:`${(new Date).getFullYear()-1}-${((new Date).getMonth()+1).toString().padStart(2,0)}-01`,hasta:"",area:"",objeto:""},movimientos:[],search:"",paginacion:{sortBy:"fec_solicitud",descending:!0,page:1,rowsPerPage:10},headers:[{text:"Cantidad",value:"cantidad",ignore:!0},{text:"Motivo",value:"motivo",class:"text-sm-left",ruta:"motivo"},{text:"Fecha de Solicitud",value:"fec_solicitud",class:"text-sm-center",ruta:"fec_solicitud",date:!0},{text:"Area",value:"area_solicita.area",class:"text-sm-left text-capitalize",ruta:"area_solicita.area"},{text:"Objeto Modelo",value:"id_objeto.modelo",class:"text-sm-left text-capitalize",ruta:"id_objeto.modelo"},{text:"Apellido y Nombre",value:"persona_solicitante",class:"text-sm-left text-capitalize",ruta:"persona_solicitante"},{text:"Nro. Legajo",value:"persona_legajo",class:"text-sm-right",ruta:"persona_legajo"},{text:"Orden de Compra",value:"orden_compra",class:"text-sm-right",ruta:"orden_compra"},{text:"Impresora Consume",value:"modelo_impresora",class:"text-sm-center",ruta:"modelo_impresora"},{text:"# Inv Consume",value:"inventario_consume",class:"text-sm-center",ruta:"inventario_consume"}],seleccionados:[],columnasExcel:{"Fecha de Solicitud":{field:"fec_solicitud",callback:e=>{try{let t=new Date(e).toISOString().substr(0,10);return`${t}`}catch(t){return`${e}`}}},Area:"area_solicita.area","Objeto Modelo":"id_objeto.modelo",Motivo:"motivo",Cantidad:{callback:e=>e.orden_compra?`+${e.cantidad}`:`-${e.cantidad}`},"Apellido y Nombre":"persona_solicitante","Nro. Legajo":"persona_legajo","Orden de Compra":"orden_compra","Modelo de Impresora":"modelo_impresora","Nro. de inventario":"inventario_consume"}}),computed:{...(0,y.rn)(["APIURL","axiosConfig","loading","hoy","persona"]),nombreExcel(){return`PatrimonioInsumosConsultas-${this.hoy}.xls`},headersDinamics(){return this.headers.filter((e=>!0!==e.ignore))}},async created(){this.filtro.hasta=this.hoy,this.areas.push(...await this.buscarAreaFiltros({filtro:"todos",populate:"no",select:"area"})),this.cargarObjetos()},methods:{...(0,y.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),...(0,y.nv)("main_areas",["buscarAreaFiltros"]),async cargarObjetos(){let e=JSON.stringify({categoria:"Insumos"});try{this.mostrarLoading({titulo:"Cargando datos...",color:"primary"});let a=await this.axios.get(`${this.APIURL}/patrimonio/buscar?filtro=${e}&select=modelo`,this.axiosConfig);if(a.data.ok){let e=Object.assign([],a.data.objetos);this.objetos.push(...e)}else try{this.mostrarError({errores:"",mensaje:a.data.err.message,titulo:a.status})}catch(t){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(t){try{this.mostrarError({errores:t.response.data.err.errors,mensaje:t.response.data.err.message,titulo:t.response.status})}catch(t){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}this.$router.push({name:"PatrimonioBuscar"})}finally{this.ocultarLoading()}},async buscar(e){try{this.mostrarLoading({titulo:"Cargando datos...",color:"primary"});let a=await this.axios.get(`${this.APIURL}/patrimonioStock/buscar?inicio=${e.desde}&fin=${e.hasta}&obj=${e.objeto}&area=${e.area}`,this.axiosConfig);if(a.data.ok)this.movimientos=a.data.movimientos;else try{this.mostrarError({errores:"",mensaje:a.data.err.message,titulo:a.status})}catch(t){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(t){try{this.mostrarError({errores:t.response.data.err.errors,mensaje:t.response.data.err.message,titulo:t.response.status})}catch(t){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}finally{this.ocultarLoading()}},async cargarmes(){let e=new Date,t={objeto:"",area:""};t.desde=new Date(e.getFullYear(),e.getMonth(),1).toISOString().substr(0,10),t.hasta=new Date(e.getFullYear(),e.getMonth()+1,0).toISOString().substr(0,10),this.buscar(t)},descargarExcel:function(){0===this.seleccionados.length?this.mostrarError({errores:"",mensaje:"No se ha seleccionado ningun elemento.",titulo:"Capa 8"}):this.mostrarLoading({titulo:"Creando Excel...",color:"primary"})}}},Z=C,j=a(1001),S=(0,j.Z)(Z,b,v,!1,null,null,null),$=S.exports}}]);