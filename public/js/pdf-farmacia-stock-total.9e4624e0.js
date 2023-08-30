"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[718],{6713:function(t,e,a){a.r(e),a.d(e,{default:function(){return b}});var r=a(6194),o=a(8956),i=a(2353),n=a(5050),l=a(683),s=a(9456),d=a(8143),c=function(){var t=this,e=t._self._c;return e(n.Z,{attrs:{"grid-list-xs":""}},[e(s.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(l.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(o.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(i.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== GESTION DE FARMACIA ======")])],1)],1),t.loading.estado?e(l.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(o.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(i.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):e(l.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(o.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(i.h7,[e(d.Cl),e(r.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.generarPDF}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),e(d.Cl)],1)],1)],1)],1)],1)},u=[],h=(a(7658),a(629)),f=a(9592),y={name:"FarmaciaStockTotalImprimir",components:{},data:()=>({descarga:!0,pdfGen:f.o,pdf:f.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["14%","*","8%","7%","7%","7%","7%","7%","7%","10%"],headerRows:0,body:[]}},data:null}),computed:{...(0,h.rn)(["loading","pdfTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarPdfTemp(),await this.generarPDF()}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (PDF)"})}},methods:{...(0,h.OI)(["mostrarLoading","ocultarLoading","mostrarError","cargarPdfTemp","borrarPdfTemp"]),...(0,h.nv)(["requestAPI"]),...(0,h.nv)("main_areas",["buscarAreaFiltros"]),...(0,h.nv)("farmacia",["getRequestFilter"]),async modificarPdf(){this.pdf.info={title:`Farmacia Stock Total ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageOrientation="landscape",this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(t,e,a)=>[{columns:[{width:"*",text:[{text:`Página ${t} de ${e}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"20%",layout:"noBorders",table:{body:[[{width:.2*(a.width-30),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Stock Total",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha:",style:["centrado"],fontSize:13},{text:`\n\n${this.hoy}`,style:["derecha"],fontSize:13}]}],margin:[30,5]}],this.pdf.footer=()=>[];let t=this._cloneDeep(this.tablaConfig);t.table.headerRows+=1,t.table.body.push([{text:"Sistema de Stock",style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:10},"","","","","","","","",""]),this.data?(t.table.headerRows+=1,t.table.body.push([{text:"Categoria",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Insumo",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Subtotal",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],colSpan:7},"","","","","","",{text:"Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,12,0,0],rowSpan:2}]),t.table.headerRows+=1,t.table.body.push([{text:"",key:"categoriaDB",key_style:["izquierda"]},{text:"",key:"insumoDB",key_style:["izquierda"]},{text:"Municipal",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Municipal",key_style:["derecha"]},{text:"Remediar",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Remediar",key_style:["derecha"]},{text:"SUMAR",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_SUMAR",key_style:["derecha"]},{text:"Region",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Region",key_style:["derecha"]},{text:"Nacion",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Nacion",key_style:["derecha"]},{text:"Donacion",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Donacion",key_style:["derecha"]},{text:"Otros",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Otros",key_style:["derecha"]},{text:"",key:"total",key_style:["derecha"],key_fillColor:[{cond:"=",value:0,resultado:"#FFCDD2"}]}]),t=(0,f.x)({data:this.data,config:t}),this.pdf.content.push(t)):(t.table.body.push([{text:"No Hay Stock en esta Unidad.",style:["centrado","negrita"],margin:[0,5],colSpan:10},"","","","","","","","",""]),this.pdf.content.push(t))},async buscarStockTotal(t){try{this.mostrarLoading({titulo:"Contando Stock..."});let e=await this.getRequestFilter({payload:t,opcional:{areas:!0,fecha:!0}});if(e.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/farmacia/stock/total?${e.dato}`}),!!a?.data?.ok&&a?.data?.stock}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (buscarStockTotal)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{if(this.mostrarLoading({titulo:"Preparando PDF..."}),this.data=await this.buscarStockTotal({insumos:this.pdfTemp.insumos}),!this.data)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});this.borrarPdfTemp(),await this.modificarPdf(),await(0,f.o)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},g=y,m=a(1001),p=(0,m.Z)(g,c,u,!1,null,null,null),b=p.exports},9592:function(t,e,a){a.d(e,{dd:function(){return l},o:function(){return d},x:function(){return s}});a(7658);var r=a(361),o=a.n(r),i=a(1566),n=a.n(i);if(void 0==n().vfs){const t=a(7920);n().vfs=t.pdfMake.vfs}n().tableLayouts={TituloDatos:{hLineWidth:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t,e){return 0===t||t===e.table.widths.length?2:1},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(t,e){return 0===t?0:t<=e.table.headerRows?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t){return 0},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}}};const l={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},s=function({config:t,data:e}){let a=o()(t),r=o()(a.table.body[a.table.body.length-1]);return e?.forEach((function(t){let e=[];r.forEach((function(a){if("undefined"!==typeof t[a.key]&&null!==t[a.key]){let r={text:t[a.key].toLocaleString("es-AR"),style:a.key_style};a.key_fillColor&&a.key_fillColor.forEach((e=>{let o=e.value??t[e.property];switch(e.multiple&&(o*=e.multiple),e.cond){case"=":t[a.key]===o&&(r.fillColor=e.resultado);break;case">":t[a.key]>o&&(r.fillColor=e.resultado);break;case"<":t[a.key]<o&&(r.fillColor=e.resultado);break;case"!=":t[a.key]!==o&&(r.fillColor=e.resultado);break;case"existe":o&&(r.fillColor=e.resultado);break}})),e.push(r)}else e.push({text:`${a.fillEmpty??"---"}`,style:"centrado"})})),a.table.body.push(e)})),a},d=async function(t,e,a){let r=t||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};navigator.userAgent.indexOf("Edge")>=0||"true"==a?(await n().createPdf(r).download(e,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):n().createPdf(r).open({},window)}}}]);