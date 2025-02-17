"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[2454],{11912:function(t,e,a){a.r(e),a.d(e,{default:function(){return x}});var s=a(28383),r=a(15852),i=a(1899),o=a(48122),n=a(41614),l=a(69155),d=a(55731),c=function(){var t=this,e=t._self._c;return e(o.A,{attrs:{"grid-list-xs":""}},[e(l.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(n.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(r.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(i.OQ,{staticClass:"px-0"},[t._v("====== GESTION DE VACUNAS ======")])],1)],1),t.loading.estado?e(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(r.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(i.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):e(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(r.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(i.SL,[e(l.A,{attrs:{row:"",wrap:""}},[e(d.hc),e(s.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.generarPDF}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),e(d.hc)],1)],1)],1)],1)],1)],1)},h=[],u=(a(44114),a(95353)),g=a(95350),m={name:"VacunaSolicitudesPendientesImprimir",components:{},data:()=>({descarga:!0,pdf:g.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","10%","10%","13%","13%","13%"],headerRows:0,body:[]}},areasDB:[],insumosDB:[],data:{}}),computed:{...(0,u.aH)(["loading","localStorageTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarLocalStorageTemp(),this.areasDB=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.localStorageTemp.areas}},populate:"no",select:"area"})],this.localStorageTemp.insumos?.length&&(this.insumosDB=await this.buscarInsumosFiltro({filtro:{_id:{$in:this.localStorageTemp.insumos}},populate:"no",select:"nombre"})),await this.generarPDF()}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (created VacunaSolicitudesPendientesImprimir)"})}},methods:{...(0,u.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,u.i0)(["requestAPI"]),...(0,u.i0)("main",["buscarAreaFiltros"]),...(0,u.i0)("vacunas",["buscarInsumosFiltro"]),async modificarPdf(){this.pdf.info={title:`Vacunatorio Solicitudes ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_description:this.pdf.images.muni_description},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(t,e,a)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${t} de ${e}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_description"}]]},margin:[0,15,0,0]},{width:"*",text:[{text:"\nPrograma De Inmunizaciones\n",style:["negrita","centrado"],fontSize:16},{text:"Solicitudes Pendientes",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.localStorageTemp.desde??"xxxx-xx-xx"}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.localStorageTemp.hasta??"xxxx-xx-xx"}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content.push({text:[{text:"\nΔ ",fontSize:15,color:"orange",bold:!0},{text:"Filtro:",fontSize:13,style:["subrayado"],bold:!0},`\n· Vacunatorios: ${this.areasDB.length?this.areasDB.map((t=>t.area)).join("; "):"Todos"}.`,`\n· Insumos: ${this.insumosDB.length?`${this.insumosDB.map((t=>t.nombre)).join("; ")}`:"Todos"}.`],fontSize:12,style:[],margin:[10,0,10,5]}),Object.entries(this.data).length>0?Object.entries(this.data).forEach((([t,e])=>{let a=this._cloneDeep(this.tablaConfig);a.table.headerRows+=1,a.table.body.push([{text:`${t}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:6},"","","","",""]),Object.entries(e).length>0?(a.table.headerRows+=1,a.table.body.push([{text:"Insumo",style:["centrado"],fillColor:"#EEEEEE",margin:[0,12,0,0],rowSpan:2},{text:"Subtotal Solicitado",style:["centrado"],fillColor:"#EEEEEE",margin:[0,2],colSpan:3},"","",{text:"Total \nSolicitado",style:["centrado"],fillColor:"#EEEEEE",margin:[0,7,0,0],rowSpan:2},{text:"Tienen en \nStock",style:["centrado"],fillColor:"#EEEEEE",margin:[0,7,0,0],rowSpan:2}]),a.table.headerRows+=1,a.table.body.push([{text:"",key:"insumoDB",key_style:["izquierda"]},{text:"Rutina",style:["centrado"],fillColor:"#BBDEFB",margin:[0,2],key:"subtotal_rutina",key_style:["derecha"]},{text:"Urgencia",style:["centrado"],fillColor:"#FFF9C4",margin:[0,2],key:"subtotal_urgencia",key_style:["derecha"]},{text:"Emergencia",style:["centrado"],fillColor:"#FFE0B2",margin:[0,2],key:"subtotal_emergencia",key_style:["derecha"]},{text:"",key:"total_pedidos",key_style:["derecha"]},{text:"",key:"stockDB",key_style:["derecha"],key_fillColor:[{cond:"=",value:0,resultado:"#FFCDD2"}]}]),a=(0,g.s)({data:e,config:a}),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Solicitudes Pendientes registradas en esta Unidad entre las fechas seleccionadas.",style:["centrado","negrita"],margin:[0,5],colSpan:6},"","","","",""]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Solicitudes Pendientes registradas entre las fechas seleccionadas.",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarSolicitudesEstadistica(t){try{this.mostrarLoading({titulo:"Buscando Solicitudes..."});let e=null;return e=await this.requestAPI({method:"get",url:`/vacunas/solicitudes/estadistica?areas=${JSON.stringify(t.areas)}&insumos=${t.insumos?JSON.stringify(t.insumos):""}&desde=${t.desde}&hasta=${t.hasta}`}),!!e?.data?.ok&&e?.data?.solicitudes}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (buscarSolicitudesEstadistica)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});for(let t=0;t<this.areasDB.length;t++)this.data[this.areasDB[t].area]=[];for(let t=0;t<this.localStorageTemp.areas.length;t+=10){let e=await this.buscarSolicitudesEstadistica({areas:this.localStorageTemp.areas.slice(t,t+10),desde:this.localStorageTemp.desde,hasta:this.localStorageTemp.hasta,insumos:this.localStorageTemp.insumos});if(!e)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});e=e.reduce(((t,e)=>((t[e.areaDB]=t[e.areaDB]||[]).push(e),t)),{}),this.data={...this.data,...e}}await this.modificarPdf(),await(0,g.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},p=m,y=a(81656),f=(0,y.A)(p,c,h,!1,null,null,null),x=f.exports}}]);