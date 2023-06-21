"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[873],{6176:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var r=a(6194),o=a(8956),i=a(2353),s=a(5050),n=a(683),l=a(9456),d=a(8143),c=function(){var e=this,t=e._self._c;return t(s.Z,{attrs:{"grid-list-xs":""}},[t(l.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(n.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(o.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(i.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?t(n.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(o.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):t(n.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(o.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.h7,[t(d.Cl),t(r.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.generarPDF}},[e._v(" "+e._s("true"==e.descarga?"Descargar PDF":"Mostrar PDF"))]),t(d.Cl)],1)],1)],1)],1)],1)},h=[],u=(a(7658),a(629)),f=a(9592);const g={name:"farmaciaReporteGeneralImprimir",components:{},data:()=>({descarga:!0,pdfGen:f.o,pdf:f.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["14%","*","10%","10%","10%","10%","10%"],headerRows:0,body:[]}},data:{}}),computed:{...(0,u.rn)(["loading","pdfTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarPdfTemp(),this.data.desde=this.pdfTemp.desde,this.data.hasta=this.pdfTemp.hasta,this.data.areas={},await this.generarPDF()}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (PDF)"})}},methods:{...(0,u.OI)(["mostrarLoading","ocultarLoading","mostrarError","cargarPdfTemp","borrarPdfTemp"]),...(0,u.nv)(["requestAPI"]),...(0,u.nv)("main_areas",["buscarAreaFiltros"]),...(0,u.nv)("farmacia",["getRequestFilter"]),async modificarPdf(){this.pdf.info={title:`Farmacia Reporte General ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageOrientation="landscape",this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"20%",layout:"noBorders",table:{body:[[{width:.2*(a.width-30),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Reporte General",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.data.desde}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.data.hasta}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:7},"","","","","",""]),Object.entries(t).length>0?(a.table.headerRows+=1,a.table.body.push([{text:"Categoria",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Insumo",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Ingresos",style:["centrado"],fillColor:"#BBDEFB",margin:[0,12,0,0],rowSpan:2},{text:"Egresos",style:["centrado"],fontSize:14,fillColor:"#FFF9C4",colSpan:2},"",{text:"Tienen\nen Stock",style:["centrado"],fillColor:"#DFDFDF",margin:[0,7,0,0],rowSpan:2},{text:"Solicitados\nPendientes",style:["centrado"],fillColor:"#DFDFDF",margin:[0,7,0,0],rowSpan:2}]),a.table.headerRows+=1,a.table.body.push([{text:"",key:"categoriaDB",key_style:["izquierda"]},{text:"",key:"insumoDB",key_style:["izquierda"]},{text:"",key:"total_ingreso",key_style:["derecha"]},{text:"Consumidos",style:["centrado"],fillColor:"#FFF9C4",margin:[0,2],key:"egreso_consumido",key_style:["derecha"]},{text:"Otros",style:["centrado"],fillColor:"#FFE0B2",margin:[0,2],key:"egreso_otros",key_style:["derecha"]},{text:"",key:"total_stock",key_style:["derecha"]},{text:"",key:"total_solicitado",key_style:["derecha"]}]),a=(0,f.x)({data:t,config:a}),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Datos en esta Unidad.",style:["centrado","negrita"],margin:[0,5],colSpan:7},"","","","","",""]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Datos para mostrar",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarReporteGeneral(e){try{this.mostrarLoading({titulo:"Generando Reporte..."});let t=await this.getRequestFilter({payload:e});if(t.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/farmacia/estadistica/general?${t.dato}`}),!!a?.data?.ok&&a?.data?.reporte}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarReporteGeneral)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let e=[...await this.buscarAreaFiltros({filtro:{farmacia:!0},populate:"no",select:"area"})];for(let a=0;a<this.pdfTemp.areas.length;a++){let t=e.find((e=>e.id===this.pdfTemp.areas[a])).area;this.data.areas[t]=[]}let t=await this.buscarReporteGeneral({areas:this.pdfTemp.areas,desde:this.data.desde,hasta:this.data.hasta,insumos:this.pdfTemp.insumos,procedencias:this.pdfTemp.procedencias});if(!t)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});t=t.reduce(((e,t)=>((e[t.areaDB]=e[t.areaDB]||[]).push(t),e)),{}),this.data.areas={...this.data.areas,...t},this.borrarPdfTemp(),await this.modificarPdf(),await(0,f.o)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},p=g;var y=a(1001),m=(0,y.Z)(p,c,h,!1,null,null,null);const b=m.exports},9592:(e,t,a)=>{a.d(t,{dd:()=>n,o:()=>d,x:()=>l});a(7658);var r=a(361),o=a.n(r),i=a(1566),s=a.n(i);if(void 0==s().vfs){const e=a(7920);s().vfs=e.pdfMake.vfs}s().tableLayouts={TituloDatos:{hLineWidth:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e,t){return 0===e||e===t.table.widths.length?2:1},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(e,t){return 0===e?0:e<=t.table.headerRows?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e){return 0},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}}};const n={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},l=function({config:e,data:t}){let a=o()(e),r=o()(a.table.body[a.table.body.length-1]);return t?.forEach((function(e){let t=[];r.forEach((function(a){if("undefined"!==typeof e[a.key]&&null!==e[a.key]){let r={text:e[a.key].toLocaleString("es-AR"),style:a.key_style};a.key_fillColor&&a.key_fillColor.forEach((t=>{switch(t.cond){case"=":e[a.key]===t.value&&(r.fillColor=t.resultado);break;case">":e[a.key]>t.value&&(r.fillColor=t.resultado);break;case"<":e[a.key]<t.value&&(r.fillColor=t.resultado);break;case"!=":e[a.key]!==t.value&&(r.fillColor=t.resultado);break;case"otroExiste":e[t.value]&&(r.fillColor=t.resultado);break}})),t.push(r)}else t.push({text:`${a.fillEmpty??"---"}`,style:"centrado"})})),a.table.body.push(t)})),a},d=async function(e,t,a){let r=e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};navigator.userAgent.indexOf("Edge")>=0||"true"==a?(await s().createPdf(r).download(t,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):s().createPdf(r).open({},window)}}}]);