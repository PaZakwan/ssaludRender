"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[4375],{59148:(t,a,s)=>{s.r(a),s.d(a,{default:()=>N});var o=s(81166),e=s(55669),i=s(15852),r=s(1899),n=s(37471),l=s(16717),c=s(48122),d=s(85832),u=s(67926),f=s(16251),m=s(41614),p=s(46227),g=s(69155),_=s(11210),h=s(31911),A=s(63286),x=s(55731),v=s(57e3),I=s(66816),y=function(){var t=this,a=t._self._c;return a(c.A,{attrs:{fluid:""}},[a(g.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[a(m.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[a(i.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[a(r.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== Bromatologia ======")])],1)],1),a(m.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[a(i.A,{staticClass:"white--text",attrs:{color:"cuarto darken-1"}},[a(r.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== ====== Buscar ====== ======")])],1),a(i.A,{staticClass:"elevation-6",attrs:{color:"grey lighten-2"}},[a(r.OQ,{staticClass:"px-0"},[a(g.A,{attrs:{row:"",wrap:""}},[a(x.hc),a(m.A,{attrs:{xs12:"",sm5:"",md4:"","mx-3":""}},[a(_.A,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function({on:s}){return[a(v.W,t._g({staticClass:"input__menu__text--align",staticStyle:{"--align":"center"},attrs:{label:"Fecha de Inspeccion, Desde:","prepend-icon":"event",readonly:"",color:"cuarto darken-3"},model:{value:t.desde,callback:function(a){t.desde=a},expression:"desde"}},s))]}}]),model:{value:t.menufecha1,callback:function(a){t.menufecha1=a},expression:"menufecha1"}},[a(u.A,{attrs:{color:"cuarto darken-3","header-color":"cuarto darken-1",locale:"mx",max:t.hasta},on:{input:function(a){t.menufecha1=!1}},model:{value:t.desde,callback:function(a){t.desde=a},expression:"desde"}})],1)],1),a(x.hc),a(f.A,{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),a(x.hc),a(m.A,{attrs:{xs12:"",sm5:"",md4:"","mx-3":""}},[a(_.A,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function({on:s}){return[a(v.W,t._g({staticClass:"input__menu__text--align",staticStyle:{"--align":"center"},attrs:{label:"Fecha de Inspeccion, Hasta:","prepend-icon":"event",readonly:"",color:"cuarto darken-3"},model:{value:t.hasta,callback:function(a){t.hasta=a},expression:"hasta"}},s))]}}]),model:{value:t.menufecha2,callback:function(a){t.menufecha2=a},expression:"menufecha2"}},[a(u.A,{attrs:{color:"cuarto darken-3","header-color":"cuarto darken-1",locale:"mx",min:t.desde},on:{input:function(a){t.menufecha2=!1}},model:{value:t.hasta,callback:function(a){t.hasta=a},expression:"hasta"}})],1)],1),a(x.hc)],1),t.persona.bromatologia>1?a(g.A,{attrs:{row:"",wrap:""}},[a(x.hc),a(m.A,{attrs:{xs12:"",sm3:"","d-flex":"","mx-3":""}},[a(A.d,{staticClass:"select__text--align select__text--color",staticStyle:{"--align":"center","--color":"white"},attrs:{items:t.tipoValidos,label:"Mostrar",color:"cuarto darken-4","background-color":"cuarto lighten-2"},model:{value:t.validos,callback:function(a){t.validos=a},expression:"validos"}})],1),a(x.hc)],1):t._e()],1),a(g.A,{attrs:{wrap:""}},[a(e.A,{staticClass:"white--text",attrs:{round:"",color:"cuarto lighten-1",disabled:t.loading.estado,loading:t.loading.estado},on:{click:function(a){return t.cargarmes()}}},[t._v(" Cargar Mes Actual + Mes anterior")]),a(x.hc),a(x.hc),a(x.hc),a(e.A,{staticClass:"white--text",attrs:{round:"",color:"cuarto darken-3",disabled:t.loading.estado,loading:t.loading.estado},on:{click:function(a){return t.buscar(t.desde,t.hasta)}}},[t._v(" Buscar"),a(p.A,{attrs:{color:"white",right:""}},[t._v("search")])],1),a(x.hc)],1)],1)],1),a(m.A,{attrs:{"pa-1":"","ma-1":"",terciary:"","lighten-1":"",xs12:""}},[a(n.A,{staticClass:"title text-capitalize elevation-6"},[a(p.A,{attrs:{color:"white",left:""}},[t._v("colorize")]),a("span",{staticClass:"white--text"},[t._v("Analisis")]),a(x.hc),a(v.W,{attrs:{"append-icon":"search",label:"Filtrar","background-color":"terciary lighten-4",color:"black","single-line":"","hide-details":"",clearable:""},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1),a(n.A,{attrs:{color:"terciary lighten-2"}},[a(g.A,{attrs:{"align-center":"",row:"",wrap:""}},[a(p.A,{attrs:{medium:"",color:"white",left:""}},[t._v("info")]),a("div",[a(g.A,{attrs:{row:""}},[a("span",{staticClass:"body-2 white--text"},[t._v("Click en la fila para mas informacion")])]),a(g.A,{attrs:{row:""}},[a("span",{staticClass:"body-2 white--text"},[t._v("Seleccione los que descargara como excel")])])],1),a(f.A,{staticClass:"mx-3 terciary darken-2 hidden-xs-only",attrs:{vertical:""}}),a(x.hc),a(e.A,{staticClass:"white--text",attrs:{round:"",to:{name:"BromatologiaCrear"},color:"terciary darken-1",disabled:t.persona.bromatologia<2||t.loading.estado,loading:t.loading.estado}},[a(p.A,{attrs:{color:"white",left:""}},[t._v("colorize")]),t._v("Crear Analisis")],1)],1)],1),a(d.A,{staticClass:"elevation-6",staticStyle:{"table-layout":"fixed"},attrs:{id:"tablita",headers:t.headers,items:t.listAnalisis,"item-key":"_id",pagination:t.paginacion,"rows-per-page-items":[5,10,25,50],loading:t.loading.estado,search:t.search,"select-all":""},on:{"update:pagination":function(a){t.paginacion=a}},scopedSlots:t._u([{key:"no-data",fn:function(){return[a(o.A,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[t._v(" No hay datos para mostrar. ")])]},proxy:!0},{key:"no-results",fn:function(){return[a(o.A,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[t._v(' No se encontraron resultados para "'+t._s(t.search)+'". ')])]},proxy:!0},{key:"items",fn:function(s){return[a("tr",{class:t.backgroundClass(s.item)},[a("td",[null!==s.item.fec_verificado&&s.item.estado?a(l.A,{attrs:{color:"terciary darken-2","hide-details":""},model:{value:s.selected,callback:function(a){t.$set(s,"selected",a)},expression:"props.selected"}}):t._e()],1),a("td",{staticClass:"text-sm-left"},[a("div",{staticClass:"text-xs-center",staticStyle:{width:"88px"}},[a(I.A,{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:o}){return[a(e.A,t._g({attrs:{small:"",flat:"",icon:"","mx-0":"",disabled:(t.persona.bromatologia<2||t.loading.estado||t.editValidado(s.item.usuario_verifico))&&(s.item.estado||t.editValidado(s.item.usuario_verifico)),to:{name:"BromatologiaEditar",params:{id:s.item._id}},color:"gray"}},o),[a(p.A,{attrs:{color:"primary"}},[t._v(" edit ")])],1)]}}],null,!0)},[a("span",[t._v("Editar Analisis")])]),a(I.A,{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:o}){return[a(e.A,t._g({attrs:{small:"",flat:"",icon:"","mx-0":"",disabled:t.persona.bromatologia<3||t.loading.estado||!s.item.estado||null!==s.item.fec_verificado&&t.editValidado(s.item.usuario_verifico),color:"gray"},on:{click:function(a){return t.deleteAnalisis(s.item)}}},o),[a(p.A,{attrs:{color:"error"}},[t._v(" delete ")])],1)]}}],null,!0)},[a("span",[t._v("Borrar Analisis")])])],1)]),a(I.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:o}){return[a("td",t._g({on:{click:function(a){return t.datosInfoOn(s.item)}}},o),[t._v(t._s(s.item.orden))]),a("td",t._g({staticClass:"text-sm-left",on:{click:function(a){return t.datosInfoOn(s.item)}}},o),[t._v(" "+t._s(t.mostrarFecha(s.item.fec_inspeccion))+" ")]),a("td",t._g({staticClass:"text-sm-left",on:{click:function(a){return t.datosInfoOn(s.item)}}},o),[t._v(" "+t._s(s.item.tipo_analisis)+" ")]),a("td",t._g({staticClass:"text-sm-left",on:{click:function(a){return t.datosInfoOn(s.item)}}},o),[t._v(" "+t._s(s.item.origen)+" ")]),a("td",t._g({staticClass:"text-sm-left text-capitalize",on:{click:function(a){return t.datosInfoOn(s.item)}}},o),[t._v(" "+t._s(s.item.titular)+" ")]),a("td",t._g({staticClass:"text-sm-left text-capitalize",on:{click:function(a){return t.datosInfoOn(s.item)}}},o),[t._v(" "+t._s(s.item.rubro)+" ")]),a("td",t._g({staticClass:"text-sm-left text-capitalize",on:{click:function(a){return t.datosInfoOn(s.item)}}},o),[t._v(" "+t._s(s.item.dir_calle)+" "+t._s(s.item.dir_numero)+" ")]),a("td",t._g({staticClass:"text-sm-left text-capitalize",on:{click:function(a){return t.datosInfoOn(s.item)}}},o),[t._v(" "+t._s(s.item.dir_barrio)+" ")]),a("td",t._g({staticClass:"text-sm-left text-capitalize",on:{click:function(a){return t.datosInfoOn(s.item)}}},o),[t._v(" "+t._s(s.item.inspector)+" ")])]}}],null,!0)},[a("span",[t._v("Click para mas informacion "+t._s(s.item.orden?` - ${s.item.orden}`:"")+" ")])])],1)]}}]),model:{value:t.seleccionados,callback:function(a){t.seleccionados=a},expression:"seleccionados"}},[a(h.A,{attrs:{color:"blue",indeterminate:""}})],1),a(n.A,{attrs:{flat:"",color:"terciary lighten-2"}},[a("download-excel",{attrs:{data:t.selecteccionFiltroExcel(t.listAnalisis),fields:t.columnasExcel,name:t.nombreExcel,type:"xls","before-finish":t.ocultarLoading}},[a(e.A,{staticClass:"white--text",attrs:{round:"",color:"terciary darken-1",disabled:t.loading.estado,loading:t.loading.estado},on:{click:function(a){return t.descargarExcel(t.listAnalisis)}}},[a(p.A,{attrs:{color:"white",left:""}},[t._v("far fa-file-excel")]),t._v("Exportar a Excel")],1)],1),a(x.hc),a(f.A,{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),a("download-excel",{attrs:{data:t.selecteccionFiltroExcel(t.seleccionados),fields:t.columnasExcel,name:t.nombreExcel,type:"xls","before-finish":t.ocultarLoading}},[a(e.A,{staticClass:"white--text",attrs:{round:"",color:"terciary darken-1",disabled:t.loading.estado,loading:t.loading.estado},on:{click:function(a){return t.descargarExcel(t.seleccionados)}}},[a(p.A,{attrs:{color:"white",left:""}},[t._v("far fa-file-excel")]),t._v("Descargar Excel de Seleccionados")],1)],1)],1),a("analisisInfo",{attrs:{persona:t.persona,loading:t.loading,mostrarFecha:t.mostrarFecha,imprimirAnalisis:t.imprimirAnalisis,descargarAnalisis:t.descargarAnalisis,datosInfo:t.datosInfo,datosInfoOff:t.datosInfoOff}})],1)],1)],1)},b=[],C=(s(44114),s(95353)),k=s(52111),w=s(51257),O=function(){var t=this,a=t._self._c;return a(k.A,{attrs:{color:"terciary",persistent:"","max-width":"80%",scrollable:""},model:{value:t.datosInfo.estado,callback:function(a){t.$set(t.datosInfo,"estado",a)},expression:"datosInfo.estado"}},[a(i.A,{attrs:{color:"terciary lighten-5"}},[a(n.A,[a(g.A,{attrs:{row:"",wrap:""}},[a("span",{staticClass:"display-1"},[t._v(" ANALISIS ")]),a(f.A,{staticClass:"mx-2",attrs:{light:"",vertical:""}}),"Bacteriologico"===t.datosInfo.datos.tipo_analisis?a("span",{staticClass:"display-1 mx-4"},[t._v(" Bacteriológico de Agua "+t._s(t.datosInfo.datos.orden?` - ${t.datosInfo.datos.orden}`:"")+" ")]):t._e(),"Fisico-Quimico"===t.datosInfo.datos.tipo_analisis?a("span",{staticClass:"display-1 mx-4"},[t._v(" Fisicoquímico de Agua "+t._s(t.datosInfo.datos.orden?` - ${t.datosInfo.datos.orden}`:"")+" ")]):t._e(),"Alimento"===t.datosInfo.datos.tipo_analisis?a("span",{staticClass:"display-1 mx-4"},[t._v(" Alimentos "+t._s(t.datosInfo.datos.orden?` - ${t.datosInfo.datos.orden}`:"")+" ")]):t._e(),a(x.hc),a(I.A,{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:s}){return[a(p.A,t._g({attrs:{color:"error darken-1","x-large":""},on:{click:t.datosInfoOff}},s),[t._v(" cancel ")])]}}])},[a("span",[t._v("Cerrar")])])],1)],1),a(f.A),a(r.OQ,[a(c.A,{attrs:{terciary:"","lighten-1":"","grid-list-sm":""}},[a(g.A,{attrs:{row:"",wrap:""}},[a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Nro. Orden : "+t._s(t.datosInfo.datos.orden))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Fecha de Solicitud : "+t._s(t.mostrarFecha(t.datosInfo.datos.fec_solicitud)))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Nro. Muestra : "+t._s(t.datosInfo.datos.muestra))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Fecha de Inspeccion : "+t._s(t.mostrarFecha(t.datosInfo.datos.fec_inspeccion)))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Nro. Expediente : "+t._s(t.datosInfo.datos.expediente))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Fecha de Resultado : "+t._s(t.mostrarFecha(t.datosInfo.datos.fec_resultado)))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Inspector : "+t._s(t.datosInfo.datos.inspector))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Tipo de Analisis : "+t._s(t.datosInfo.datos.tipo_analisis))])],1)],1)],1),a(f.A,{staticClass:"my-2"}),a(g.A,{attrs:{row:"",wrap:""}},[a(r.OQ,{staticClass:"px-2 headline"},[t._v("Datos del Interesado")]),a(m.A,{attrs:{xs12:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Razon Social o Titular : "+t._s(t.datosInfo.datos.titular))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Direccion : "+t._s(t.datosInfo.datos.dir_calle)+" "+t._s(t.datosInfo.datos.dir_numero))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Rubro : "+t._s(t.datosInfo.datos.rubro))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Entre : "+t._s(t.datosInfo.datos.dir_entre))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Barrio : "+t._s(t.datosInfo.datos.dir_barrio))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Telefono : "+t._s(t.datosInfo.datos.telefono))])],1)],1)],1),a(f.A,{staticClass:"my-2"}),"Bacteriologico"===t.datosInfo.datos.tipo_analisis?a(r.OQ,{staticClass:"px-2 headline"},[t._v("Resultado - Bacteriológico de Agua")]):t._e(),"Fisico-Quimico"===t.datosInfo.datos.tipo_analisis?a(r.OQ,{staticClass:"px-2 headline"},[t._v("Resultado - Fisicoquímico de Agua")]):t._e(),"Alimento"===t.datosInfo.datos.tipo_analisis?a(r.OQ,{staticClass:"px-2 headline"},[t._v("Resultado - Análisis de Alimentos")]):t._e(),"Bacteriologico"===t.datosInfo.datos.tipo_analisis?a(g.A,{attrs:{row:"",wrap:""}},[a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Fuente de Analisis : "+t._s(t.datosInfo.datos.fuente_analisis))])],1)],1),a(m.A,{attrs:{xs12:"",md6:"","px-3":""}}),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("mesofilas : "+t._s(t.datosInfo.datos.mesofilas?t.datosInfo.datos.mesofilas:"---")+" UFC/ml")])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[t.datosInfo.datos.coliformes||0===t.datosInfo.datos.coliformes?a(r.OQ,{staticClass:"px-2 title"},[t._v("coliformes : "+t._s(Number(t.datosInfo.datos.coliformes)<3?"<3":t.datosInfo.datos.coliformes)+" / 100 ml")]):a(r.OQ,{staticClass:"px-2 title"},[t._v("coliformes : --- / 100 ml")])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title font-italic"},[t._v("Escherichia coli : "+t._s(t.datosInfo.datos.echerihia?t.datosInfo.datos.echerihia:"---"))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[t.datosInfo.datos.pseudomonaAeruginosa?a(r.OQ,{staticClass:"px-2 title font-italic"},[t._v("Pseudomona aeruginosa : "+t._s(t.datosInfo.datos.pseudomonaAeruginosa?t.datosInfo.datos.pseudomonaAeruginosa:"---"))]):a(r.OQ,{staticClass:"px-2 title font-italic"},[t._v("Pseudomona aeruginosa : --- ")])],1)],1),a(m.A,{attrs:{xs12:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"text-sm-left px-2 title"},[t._v(" Observacion : "),a(w.A,{attrs:{readonly:"","auto-grow":"",rows:"2",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:t.datosInfo.datos.observacion,callback:function(a){t.$set(t.datosInfo.datos,"observacion",a)},expression:"datosInfo.datos.observacion"}})],1)],1)],1)],1):t._e(),"Fisico-Quimico"===t.datosInfo.datos.tipo_analisis?a(g.A,{attrs:{row:"",wrap:""}},[a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Fuente de Analisis : "+t._s(t.datosInfo.datos.fuente_analisis))])],1)],1),a(m.A,{attrs:{xs12:"",md6:"","px-3":""}}),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Color : "+t._s(t.datosInfo.datos.color))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Olor : "+t._s(t.datosInfo.datos.olor))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Aspecto : "+t._s(t.datosInfo.datos.aspecto))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("pH : "+t._s(t.datosInfo.datos.ph))])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Nitratos : "+t._s(t.datosInfo.datos.nitratos?t.datosInfo.datos.nitratos:"---")+" mg/l")])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Nitritos : "+t._s(t.datosInfo.datos.nitritos?t.datosInfo.datos.nitritos:"---")+" mg/l")])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[t.datosInfo.datos.sulfato||0===t.datosInfo.datos.sulfato?a(r.OQ,{staticClass:"px-2 title"},[t._v("Sulfato : "+t._s(Number(t.datosInfo.datos.sulfato)<200?"<200":t.datosInfo.datos.sulfato)+" mg/l ")]):a(r.OQ,{staticClass:"px-2 title"},[t._v("Sulfato : --- mg/l")])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[t.datosInfo.datos.arsenico||0===t.datosInfo.datos.arsenico?a(r.OQ,{staticClass:"px-2 title"},[t._v("Arsenico : "+t._s(Number(t.datosInfo.datos.arsenico)<.01?"<0.01":t.datosInfo.datos.arsenico)+" mg/l ")]):a(r.OQ,{staticClass:"px-2 title"},[t._v("Arsenico : --- mg/l")])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Cloruros : "+t._s(t.datosInfo.datos.cloruros?t.datosInfo.datos.cloruros:"---")+" mg/l")])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Dureza : "+t._s(t.datosInfo.datos.dureza?t.datosInfo.datos.dureza:"---")+" mg CaCO3/l")])],1)],1),a(m.A,{attrs:{xs12:"",md6:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"px-2 title"},[t._v("Alcalinidad : "+t._s(t.datosInfo.datos.alcalinidad?t.datosInfo.datos.alcalinidad:"---")+" mg CaCO3/l")])],1)],1),a(m.A,{attrs:{xs12:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"text-sm-left px-2 title"},[t._v(" Observacion : "),a(w.A,{attrs:{readonly:"","auto-grow":"",rows:"2",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:t.datosInfo.datos.observacion,callback:function(a){t.$set(t.datosInfo.datos,"observacion",a)},expression:"datosInfo.datos.observacion"}})],1)],1)],1)],1):t._e(),"Alimento"===t.datosInfo.datos.tipo_analisis?a(g.A,{attrs:{row:"",wrap:""}},[a(m.A,{attrs:{xs12:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"text-sm-left px-2 title"},[t._v(" Observacion del Alimento : "),a(w.A,{attrs:{readonly:"","auto-grow":"",rows:"2",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:t.datosInfo.datos.observacionAlimento,callback:function(a){t.$set(t.datosInfo.datos,"observacionAlimento",a)},expression:"datosInfo.datos.observacionAlimento"}})],1)],1)],1),a(m.A,{attrs:{xs12:""}},[a(i.A,{attrs:{color:"terciary lighten-4"}},[a(r.OQ,{staticClass:"text-sm-left px-2 title"},[t._v(" Observacion : "),a(w.A,{attrs:{readonly:"","auto-grow":"",rows:"2",type:"text",color:"terciary","background-color":"terciary lighten-2"},model:{value:t.datosInfo.datos.observacion,callback:function(a){t.$set(t.datosInfo.datos,"observacion",a)},expression:"datosInfo.datos.observacion"}})],1)],1)],1)],1):t._e(),t.datosInfo.datos.fec_verificado?a(f.A,{staticClass:"my-2"}):t._e(),t.datosInfo.datos.fec_verificado?a(g.A,{attrs:{"my-2":"",row:"",wrap:""}},[a(r.OQ,{staticClass:"px-2 headline"},[t._v("Conclusion")]),a(m.A,{attrs:{xs12:""}},[a(w.A,{staticClass:"text-sm-left px-2 title",attrs:{readonly:"","auto-grow":"",rows:"2",type:"text",color:"terciary","background-color":""+(t.datosInfo.datos.conclusion.toLowerCase().includes("no cumple")?"red":"green lighten-1")},model:{value:t.datosInfo.datos.conclusion,callback:function(a){t.$set(t.datosInfo.datos,"conclusion",a)},expression:"datosInfo.datos.conclusion"}})],1)],1):t._e()],1)],1),a(r.SL,[a(g.A,{attrs:{"align-center":"","justify-center":"",row:""}},[a(i.A,{class:""+(t.datosInfo.datos.fec_verificado&&t.datosInfo.datos.estado?"green":"red darken-1")},[a(r.OQ,{staticClass:"px-2 title text-capitalize"},[t._v(" "+t._s(""+(t.datosInfo.datos.estado?"":"BORRADO, "))+" "+t._s(t.datosInfo.datos.fec_verificado?`Verificado por: ${t.datosInfo.datos.usuario_verifico.nombreC}`:"Falta verificar")+" ")])],1),a(x.hc),a(f.A,{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),t.datosInfo.datos.fec_verificado?a(i.A,{staticClass:"terciary lighten-1"},[a(e.A,{staticClass:"px-4 mx-2",attrs:{disabled:t.persona.bromatologia<1||t.loading.estado||!t.datosInfo.datos.estado,color:"terciary darken-2",dark:"",round:""},on:{click:function(a){return t.descargarAnalisis(t.datosInfo.datos)}}},[t._v("Descargar")]),a(e.A,{staticClass:"px-4 mx-2",attrs:{disabled:t.persona.bromatologia<1||t.loading.estado||!t.datosInfo.datos.estado,color:"terciary darken-2",dark:"",round:""},on:{click:function(a){return t.imprimirAnalisis(t.datosInfo.datos)}}},[t._v("Imprimir")])],1):a(i.A,{class:{"terciary darken-3":t.persona.bromatologia<3||t.loading.estado,"terciary lighten-1":3===t.persona.bromatologia}},[t.datosInfo?.datos?._id?a(e.A,{staticClass:"px-4 mx-2",attrs:{disabled:t.persona.bromatologia<3||t.loading.estado||!t.datosInfo.datos.estado,color:"terciary darken-2",dark:"",round:"",to:{name:"BromatologiaValidar",params:{id:t.datosInfo.datos._id}}},on:{click:t.datosInfoOff}},[t._v("Validar")]):t._e()],1)],1)],1)],1)],1)},Q=[];const F={name:"analisisInfo",props:["persona","loading","mostrarFecha","imprimirAnalisis","descargarAnalisis","datosInfo","datosInfoOff"],data:()=>({computed:{},methods:{}})},S=F;var E=s(81656),$=(0,E.A)(S,O,Q,!1,null,null,null);const D=$.exports,B={name:"analisisBuscar",components:{analisisInfo:D},data:()=>({listAnalisis:[],menufecha1:!1,menufecha2:!1,desde:(new Date).getFullYear()-1+"-"+((new Date).getMonth()+1).toString().padStart(2,0)+"-01",hasta:"",validos:"Ambos",tipoValidos:[{text:"Verificados y No Verificados",value:"Ambos"},"Verificados","No Verificados"],search:"",paginacion:{sortBy:"orden",descending:!0,rowsPerPage:25,page:1},headers:[{text:"Acciones",value:"_id",sortable:!1,width:"5%"},{text:"Número de Orden",value:"orden",width:"5%"},{text:"Fecha de Inspeccion",value:"fec_inspeccion",width:"5%"},{text:"Tipo de Analisis",value:"tipo_analisis",width:"5%"},{text:"Origen",value:"origen",width:"5%"},{text:"Titular",value:"titular",width:"25%"},{text:"Rubro",value:"rubro",width:"10%"},{text:"Direccion",value:"dir_calle",width:"20%"},{text:"Barrio",value:"dir_barrio",width:"10%"},{text:"Inspector",value:"inspector",width:"10%"}],seleccionados:[],columnasExcel:{"# Orden":"orden","Fecha de Solicitud":{field:"fec_solicitud",callback:t=>{try{let a=new Date(t).toISOString().substring(0,10);return`${a}`}catch(a){return`${t}`}}},"# Muestra":"muestra",Inspector:"inspector","Fecha de Inspeccion":{field:"fec_inspeccion",callback:t=>{try{let a=new Date(t).toISOString().substring(0,10);return`${a}`}catch(a){return`${t}`}}},"# Expediente":"expediente","Fecha de Resultado":{field:"fec_resultado",callback:t=>{try{let a=new Date(t).toISOString().substring(0,10);return`${a}`}catch(a){return`${t}`}}},"Razon Social o Titular":"titular",Rubro:"rubro",Direccion:"dir_calle",Altura:"dir_numero",Entre:"dir_entre",Barrio:"dir_barrio",Telefono:"telefono",Observacion:"observacion","Tipo de Analisis":"tipo_analisis",Origen:"origen",Conclusion:"conclusion","Fuente de Analisis":"fuente_analisis",mesofilas:"mesofilas",coliformes:"coliformes",echerihia:"echerihia","Pseudomona Aeruginosa":"pseudomonaAeruginosa",Color:"color",Olor:"olor",Aspecto:"aspecto",Ph:"ph",Nitratos:"nitratos",Nitritos:"nitritos",Sulfato:"sulfato",Arsenico:"arsenico",Cloruros:"cloruros",Dureza:"dureza",Alcalinidad:"alcalinidad","Alimento Observacion":"observacionAlimento"}}),computed:{...(0,C.aH)(["loading","hoy","persona","datosInfo"]),nombreExcel(){let t=this.hoy,a="BromatologiaAnalisis-";return a+t+".xls"}},created(){this.hasta=this.hoy,this.cargarmes()},methods:{...(0,C.PY)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje","datosInfoOn","datosInfoOff","mostrarDialogIframe"]),...(0,C.i0)(["requestAPI"]),backgroundClass(t){if(!t)return"";try{let a="";return t.fec_verificado&&t.conclusion.toLowerCase().includes("no cumple")?a="background-color: red":t.fec_verificado?a="background-color: green":t.fec_verificado||(a="background-color: yellow"),t.estado?`${a} lighten-4`:`${a} darken-2`}catch(a){return""}},async cargarmes(){try{this.mostrarLoading({titulo:"Cargando datos..."});let t=new Date,a=new Date(t.getFullYear(),t.getMonth()-1,1).toISOString().substring(0,10),s=new Date(t.getFullYear(),t.getMonth()+1,0).toISOString().substring(0,10),o=null;return o=await this.requestAPI({method:"get",url:`/bromatologia/buscar?inicio=${a}&fin=${s}&validos=${this.validos}`}),!!o?.data?.ok&&(this.listAnalisis=o.data.analisis,this.paginacion.page>Math.ceil(this.listAnalisis.length/this.paginacion.rowsPerPage)&&(this.paginacion.page=1),!0)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado"}),!1}finally{this.ocultarLoading()}},async deleteAnalisis(t){if(await this.$root.$confirm.open({titulo:"BORRAR",msj:["Dejara de ser Visible para los demas usuarios.\nPara re-Activarlo debera modificar su 'Estado' desde la edicion del mismo.",`Analisis: ${t.orden}, sera BORRADO.\n¿Desea continuar?`]}))try{this.mostrarLoading({titulo:"Borrando Analisis..."});let a=null;return a=await this.requestAPI({method:"delete",url:`/bromatologia/${t._id}`}),!!a?.data?.ok&&(t.estado=!1,this.mostrarMensaje({msj:"Analisis Eliminado Exitosamente.",titulo:"Analisis Eliminado"}),!0)}catch(a){return this.mostrarError({mensaje:a,titulo:"Inesperado"}),!1}finally{this.ocultarLoading()}},imprimirAnalisis(t){this.datosInfoOff();let a=this.$router.resolve({name:"BromatologiaImprimir",params:{id:t._id},query:{descarga:!1}});this.mostrarDialogIframe({src:a.href,titulo_name:"Vista Previa del PDF"})},descargarAnalisis(t){this.datosInfoOff(),this.mostrarMensaje({msj:["Generando PDF en una ventana nueva del navegador.","PDF del Analisis NºOrden = "+t.orden,"Si tiene problemas para ver el documento, revise los permisos del navegador para popups o bloqueadores(Adblock)."],titulo:"Generar PDF."});let a=this.$router.resolve({name:"BromatologiaImprimir",params:{id:t._id},query:{descarga:!0}});window.open(a.href,"_blank")},async buscar(t,a){try{this.mostrarLoading({titulo:"Cargando datos..."});let s=null;return s=await this.requestAPI({method:"get",url:`/bromatologia/buscar?inicio=${t}&fin=${a}&validos=${this.validos}`}),!!s?.data?.ok&&(this.listAnalisis=s.data.analisis,this.paginacion.page>Math.ceil(this.listAnalisis.length/this.paginacion.rowsPerPage)&&(this.paginacion.page=1),!0)}catch(s){return this.mostrarError({mensaje:s,titulo:"Inesperado"}),!1}finally{this.ocultarLoading()}},descargarExcel(t){0===this.selecteccionFiltroExcel(t).length?this.mostrarError({errores:"",mensaje:"No hay elementos para exportar.",titulo:""}):this.mostrarLoading({titulo:"Creando Excel...",color:"primary"})},selecteccionFiltroExcel(t){let a=[];for(let s=0;s<t.length;s++)null!==t[s].fec_verificado&&t[s].estado&&a.push(t[s]);return a},editValidado(t){return!!t&&t.id!==this.persona.id}}},P=B;var z=(0,E.A)(P,y,b,!1,null,null,null);const N=z.exports}}]);