"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[8805],{32549:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var r=a(66194),i=a(18956),s=a(32353),o=a(66530),n=a(60683),l=a(59456),d=a(98143),c=function(){var e=this,t=e._self._c;return t(o.Z,{attrs:{"grid-list-xs":""}},[t(l.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(n.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(s.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?t(n.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(s.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):t(n.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(s.h7,[t(d.Cl),t(r.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.generarPDF}},[e._v(" "+e._s("true"==e.descarga?"Descargar PDF":"Mostrar PDF"))]),t(d.Cl)],1)],1)],1)],1)],1)},h=[],u=(a(70560),a(20629)),g=a(85014);const f={name:"farmaciaIngresosImprimir",components:{},data:()=>({descarga:!0,pdfGen:g.o,pdf:g.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["21%","*","13%","13%","15%"],headerRows:0,body:[]}},data:{}}),computed:{...(0,u.rn)(["loading","pdfTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarPdfTemp(),this.data.desde=this.pdfTemp.desde??"xxxx-xx-xx",this.data.hasta=this.pdfTemp.hasta??"xxxx-xx-xx",this.data.areas={},await this.generarPDF()}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (created farmaciaIngresosImprimir)"})}},methods:{...(0,u.OI)(["mostrarLoading","ocultarLoading","mostrarError","cargarPdfTemp","borrarPdfTemp"]),...(0,u.nv)(["requestAPI"]),...(0,u.nv)("main",["buscarAreaFiltros"]),...(0,u.nv)("farmacia",["getRequestFilter"]),async modificarPdf(){this.pdf.info={title:`Farmacia Ingresos ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{height:80,width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:14},{text:"Insumos Ingresados",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.data.desde}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.data.hasta}`,style:["derecha"]}]}],margin:[30,0]}],this.pdf.footer=()=>[],Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:5},"","","",""]),Object.entries(t).length>0?(a.table.headerRows+=1,a.table.body.push([{text:"Categoria",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Insumo",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Subtotal",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],colSpan:2},"",{text:"Recibido Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,12,0,0],rowSpan:2}]),a.table.headerRows+=1,a.table.body.push([{text:"",key:"categoriaDB",key_style:["izquierda"]},{text:"",key:"insumoDB",key_style:["izquierda"]},{text:"Carga Propia",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"total_ingreso_pr",key_style:["derecha"]},{text:"Clearing",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"total_transferencia_in",key_style:["derecha"]},{text:"",key:"total",key_style:["derecha"]}]),a=(0,g.x)({data:t,config:a}),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Ingresos registrados en esta Unidad entre las fechas seleccionadas.",style:["centrado","negrita"],margin:[0,5],colSpan:5},"","","",""]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Ingresos registrados para mostrar entre las fechas seleccionadas",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarIngresosEstadistica(e){try{this.mostrarLoading({titulo:"Buscando Ingresos..."});let t=await this.getRequestFilter({payload:e});if(t.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/farmacia/ingresos/estadistica?${t.dato}&modelos=${JSON.stringify({ingresos:!0,transferencias:!0})}`}),!!a?.data?.ok&&a?.data?.ingresos}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarIngresosEstadistica)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let e=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.pdfTemp.areas}},populate:"no",select:"area"})];for(let t=0;t<e.length;t++)this.data.areas[e[t].area]=[];for(let t=0;t<this.pdfTemp.areas.length;t+=10){let e=await this.buscarIngresosEstadistica({areas:this.pdfTemp.areas.slice(t,t+10),desde:this.pdfTemp.desde,hasta:this.pdfTemp.hasta,insumos:this.pdfTemp.insumos,procedencias:this.pdfTemp.procedencias});if(!e)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});e=e.reduce(((e,t)=>((e[t.areaDB]=e[t.areaDB]||[]).push(t),e)),{}),this.data.areas={...this.data.areas,...e}}this.borrarPdfTemp(),await this.modificarPdf(),await(0,g.o)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},p=f;var m=a(1001),y=(0,m.Z)(p,c,h,!1,null,null,null);const b=y.exports},85014:(e,t,a)=>{a.d(t,{dd:()=>n,o:()=>d,x:()=>l});a(70560);var r=a(50361),i=a.n(r),s=a(61566),o=a.n(s);if(void 0==o().vfs){const e=a(47920);o().vfs=e.pdfMake.vfs}o().tableLayouts={TituloDatos:{hLineWidth:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e,t){return 0===e||e===t.table.widths.length?2:1},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(e,t){return 0===e?0:e<=t.table.headerRows?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e){return 0},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}}};const n={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},l=function({config:e,data:t}){let a=i()(e),r=i()(a.table.body[a.table.body.length-1]);return t?.forEach((function(e){let t=[];r.forEach((function(a){let r={text:e[a.key]?.toLocaleString("es-AR")??a.fillEmpty??"---",style:a.key_style??"centrado"};a.key_fillColor&&a.key_fillColor.forEach((t=>{let i=t.value??e[t.property];switch(t.multiple&&(i*=t.multiple),t.cond){case"=":(e[a.key]===i||!e[a.key]&&a.fillEmpty===i)&&(r.fillColor=t.resultado);break;case">":(e[a.key]>i||!e[a.key]&&a.fillEmpty>i)&&(r.fillColor=t.resultado);break;case"<":(e[a.key]<i||!e[a.key]&&a.fillEmpty<i)&&(r.fillColor=t.resultado);break;case"!=":(e[a.key]!==i||!e[a.key]&&a.fillEmpty!==i)&&(r.fillColor=t.resultado);break;case"existe":i&&(r.fillColor=t.resultado);break}})),t.push(r)})),a.table.body.push(t)})),a},d=async function(e,t,a){let r=e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};navigator.userAgent.indexOf("Edge")>=0||"true"==a?(await o().createPdf(r).download(t,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):o().createPdf(r).open({},window)}}}]);