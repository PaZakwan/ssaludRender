"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[586],{5728:(e,t,a)=>{a.r(t),a.d(t,{default:()=>y});var r=a(6194),i=a(8956),s=a(2353),n=a(5050),o=a(683),l=a(9456),d=a(8143),c=function(){var e=this,t=e._self._c;return t(n.Z,{attrs:{"grid-list-xs":""}},[t(l.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(o.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(s.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?t(o.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(s.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):t(o.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(s.h7,[t(d.Cl),t(r.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.generarPDF}},[e._v(" "+e._s("true"==e.descarga?"Descargar PDF":"Mostrar PDF"))]),t(d.Cl)],1)],1)],1)],1)],1)},h=[],f=(a(7658),a(629)),u=a(9592);const p={name:"farmaciaTransferenciaEstado",components:{},data:()=>({descarga:!0,pdfGen:u.o,pdf:u.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","*","*","*","*","*"],headerRows:0,body:[]}},data:{}}),computed:{...(0,f.rn)(["loading","pdfTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarPdfTemp(),this.data.desde=this.pdfTemp.desde,this.data.hasta=this.pdfTemp.hasta,this.data.areas={},await this.generarPDF()}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (PDF)"})}},methods:{...(0,f.OI)(["mostrarLoading","ocultarLoading","mostrarError","cargarPdfTemp","borrarPdfTemp"]),...(0,f.nv)(["requestAPI"]),...(0,f.nv)("main_areas",["buscarAreaFiltros"]),...(0,f.nv)("farmacia",["getRequestFilter"]),async modificarPdf(){this.pdf.info={title:`Farmacia Transferencia Estado ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(a.width-30),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Transferencias Estado",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.data.desde}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.data.hasta}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:6},"","","","",""]),Object.entries(t).length>0?(a.table.headerRows+=1,a.table.body.push([{text:"Envios Pendientes",style:["centrado"],fillColor:"#EEEEEE",margin:[0,4]},{text:"Espera Envios",style:["centrado"],fillColor:"#EEEEEE",margin:[0,8]},{text:"Espera Recepcion",style:["centrado"],fillColor:"#EEEEEE",margin:[0,4]},{text:"Recepciones Pendientes",style:["centrado"],fillColor:"#EEEEEE",margin:[0,4]},{text:"Completadas",style:["centrado"],fillColor:"#EEEEEE",margin:[0,8]},{text:"Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,8]}]),a.table.body.push([{text:`${t.envio_pendiente?.toLocaleString("es-AR")}`,style:["derecha"],fillColor:""+(t.envio_pendiente>0?"#FFF9C4":"")},{text:`${t.espera_envio?.toLocaleString("es-AR")}`,style:["derecha"]},{text:`${t.espera_recepcion?.toLocaleString("es-AR")}`,style:["derecha"]},{text:`${t.recepcion_pendiente?.toLocaleString("es-AR")}`,style:["derecha"],fillColor:""+(t.recepcion_pendiente>0?"#FFE0B2":"")},{text:`${t.completadas?.toLocaleString("es-AR")}`,style:["derecha"]},{text:`${(+t.envio_pendiente+t.espera_envio+t.espera_recepcion+t.recepcion_pendiente+t.completadas)?.toLocaleString("es-AR")}`,style:["derecha"]}]),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Transferencias registradas en esta Unidad entre las fechas seleccionadas.",style:["centrado","negrita"],margin:[0,5],colSpan:6},"","","","",""]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Transferencias registradas entre las fechas seleccionadas.",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarTransferenciasEstadistica(e){try{this.mostrarLoading({titulo:"Buscando Transferencias..."});let t=await this.getRequestFilter({payload:e});if(t.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/farmacia/transferencias?${t.dato}&estadistica=1`}),!!a?.data?.ok&&a?.data?.estadistica}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarTransferenciasEstadistica)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let e=[...await this.buscarAreaFiltros({filtro:{farmacia:!0},populate:"no",select:"area"})];for(let t=0;t<this.pdfTemp.areas.length;t++){let a=e.find((e=>e.id===this.pdfTemp.areas[t])).area;this.data.areas[a]={}}for(let t=0;t<this.pdfTemp.areas.length;t+=10){let e=await this.buscarTransferenciasEstadistica({areas:this.pdfTemp.areas.slice(t,t+10),desde:this.data.desde,hasta:this.data.hasta,insumos:this.pdfTemp.insumos,procedencias:this.pdfTemp.procedencias});if(!e)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});this.data.areas=this.sumarProps(this.data.areas,e)}this.borrarPdfTemp(),await this.modificarPdf(),await(0,u.o)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},g=p;var m=a(1001),E=(0,m.Z)(g,c,h,!1,null,null,null);const y=E.exports},9592:(e,t,a)=>{a.d(t,{dd:()=>o,o:()=>d,x:()=>l});a(7658);var r=a(361),i=a.n(r),s=a(1566),n=a.n(s);if(void 0==n().vfs){const e=a(7920);n().vfs=e.pdfMake.vfs}n().tableLayouts={TituloDatos:{hLineWidth:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e,t){return 0===e||e===t.table.widths.length?2:1},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(e,t){return 0===e?0:e<=t.table.headerRows?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e){return 0},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}}};const o={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},l=function({config:e,data:t}){let a=i()(e),r=i()(a.table.body[a.table.body.length-1]);return t?.forEach((function(e){let t=[];r.forEach((function(a){if("undefined"!==typeof e[a.key]&&null!==e[a.key]){let r={text:e[a.key].toLocaleString("es-AR"),style:a.key_style};a.key_fillColor&&a.key_fillColor.forEach((t=>{let i=t.value??e[t.property];switch(t.multiple&&(i*=t.multiple),t.cond){case"=":e[a.key]===i&&(r.fillColor=t.resultado);break;case">":e[a.key]>i&&(r.fillColor=t.resultado);break;case"<":e[a.key]<i&&(r.fillColor=t.resultado);break;case"!=":e[a.key]!==i&&(r.fillColor=t.resultado);break;case"existe":i&&(r.fillColor=t.resultado);break}})),t.push(r)}else t.push({text:`${a.fillEmpty??"---"}`,style:"centrado"})})),a.table.body.push(t)})),a},d=async function(e,t,a){let r=e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};navigator.userAgent.indexOf("Edge")>=0||"true"==a?(await n().createPdf(r).download(t,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):n().createPdf(r).open({},window)}}}]);