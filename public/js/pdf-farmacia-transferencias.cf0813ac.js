"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[8987],{74688:function(e,t,a){a.r(t),a.d(t,{default:function(){return y}});var r=a(28383),s=a(15852),i=a(1899),o=a(48122),n=a(41614),l=a(69155),c=function(){var e=this,t=e._self._c;return t(o.A,{attrs:{"grid-list-xs":""}},[t(l.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(n.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(s.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(i.OQ,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?t(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(s.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.OQ,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):t(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(s.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.SL,[t(l.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(r.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.generarPDF}},[e._v(" "+e._s("true"==e.descarga?"Descargar PDF":"Mostrar PDF"))])],1)],1)],1)],1)],1)],1)},d=[],h=(a(44114),a(95353)),p=a(95350),g={name:"FarmaciaTransferenciaEstadoImprimir",components:{},data:()=>({descarga:!0,pdf:p.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","*","*","*","*","*"],headerRows:0,body:[]}},areasDB:[],insumosDB:[],data:{}}),computed:{...(0,h.aH)(["loading","localStorageTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarLocalStorageTemp(),this.areasDB=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.localStorageTemp.areas}},populate:"no",select:"area"})],this.localStorageTemp.insumos?.length&&(this.insumosDB=await this.buscarInsumosFiltro({filtro:{_id:{$in:this.localStorageTemp.insumos}},populate:"no",select:"nombre"})),await this.generarPDF()}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (created FarmaciaTransferenciaEstadoImprimir)"})}},methods:{...(0,h.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,h.i0)(["requestAPI"]),...(0,h.i0)("main",["buscarAreaFiltros"]),...(0,h.i0)("farmacia",["getRequestFilter","buscarInsumosFiltro"]),async modificarPdf(){this.pdf.info={title:`Farmacia Transferencia Estado ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_description:this.pdf.images.muni_description},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_description"}]]},margin:[0,15,0,0]},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Transferencias Estado",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.localStorageTemp.desde??"xxxx-xx-xx"}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.localStorageTemp.hasta??"xxxx-xx-xx"}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content.push({text:[{text:"\nΔ ",fontSize:15,color:"orange",bold:!0},{text:"Filtro:",fontSize:13,style:["subrayado"],bold:!0},`\n· Farmacias: ${this.areasDB.length?this.areasDB.map((e=>e.area)).join("; "):"Todas"}.`,`\n· Insumos: ${this.insumosDB.length?`${this.insumosDB.map((e=>e.nombre)).join("; ")}`:"Todos"}.`,`\n· Procedencias: ${this.localStorageTemp.procedencias?.length?`${this.localStorageTemp.procedencias.join("; ")}`:"Todas"}.`],fontSize:12,style:[],margin:[10,0,10,5]}),Object.entries(this.data).length>0?Object.entries(this.data).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:6},"","","","",""]),Object.entries(t).length>0?(a.table.headerRows+=1,a.table.body.push([{text:"Envios Pendientes",style:["centrado"],fillColor:"#EEEEEE",margin:[0,4]},{text:"Espera Envios",style:["centrado"],fillColor:"#EEEEEE",margin:[0,8]},{text:"Espera Recepcion",style:["centrado"],fillColor:"#EEEEEE",margin:[0,4]},{text:"Recepciones Pendientes",style:["centrado"],fillColor:"#EEEEEE",margin:[0,4]},{text:"Completadas",style:["centrado"],fillColor:"#EEEEEE",margin:[0,8]},{text:"Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,8]}]),a.table.body.push([{text:`${t.envio_pendiente?.toLocaleString("es-AR")}`,style:["derecha"],fillColor:""+(t.envio_pendiente>0?"#FFF9C4":"")},{text:`${t.espera_envio?.toLocaleString("es-AR")}`,style:["derecha"]},{text:`${t.espera_recepcion?.toLocaleString("es-AR")}`,style:["derecha"]},{text:`${t.recepcion_pendiente?.toLocaleString("es-AR")}`,style:["derecha"],fillColor:""+(t.recepcion_pendiente>0?"#FFE0B2":"")},{text:`${t.completadas?.toLocaleString("es-AR")}`,style:["derecha"]},{text:`${(+t.envio_pendiente+t.espera_envio+t.espera_recepcion+t.recepcion_pendiente+t.completadas)?.toLocaleString("es-AR")}`,style:["derecha"]}]),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Transferencias registradas en esta Unidad entre las fechas seleccionadas.",style:["centrado","negrita"],margin:[0,5],colSpan:6},"","","","",""]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Transferencias registradas entre las fechas seleccionadas.",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarTransferenciasEstadistica(e){try{this.mostrarLoading({titulo:"Buscando Transferencias..."});let t=await this.getRequestFilter({payload:e});if(t.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/farmacia/transferencias?${t.dato}&estadistica=1`}),!!a?.data?.ok&&a?.data?.estadistica}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarTransferenciasEstadistica)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});for(let e=0;e<this.areasDB.length;e++)this.data[this.areasDB[e].area]={};for(let e=0;e<this.localStorageTemp.areas.length;e+=10){let t=await this.buscarTransferenciasEstadistica({areas:this.localStorageTemp.areas.slice(e,e+10),desde:this.localStorageTemp.desde,hasta:this.localStorageTemp.hasta,insumos:this.localStorageTemp.insumos,procedencias:this.localStorageTemp.procedencias});if(!t)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});this.data={...this.data,...t}}await this.modificarPdf(),await(0,p.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},m=g,u=a(81656),f=(0,u.A)(m,c,d,!1,null,null,null),y=f.exports}}]);