"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[6251],{68270:(t,e,a)=>{a.r(e),a.d(e,{default:()=>m});var o=a(55669),r=a(15852),i=a(1899),l=a(48122),n=a(41614),s=a(69155),d=a(55731),c=function(){var t=this,e=t._self._c;return e(l.A,{attrs:{"grid-list-xs":""}},[e(s.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(n.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(r.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(i.OQ,{staticClass:"px-0"},[t._v("====== GESTION DE VACUNAS ======")])],1)],1),t.loading.estado?e(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(r.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(i.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):e(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(r.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(i.SL,[e(d.hc),e(o.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.generarPDF}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),e(d.hc)],1)],1)],1)],1)],1)},u=[],h=(a(44114),a(95353)),g=a(95350);const y={name:"VacunaStockTotalImprimir",components:{},data:()=>({descarga:!0,pdfGen:g.P,pdf:g.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*"],headerRows:0,body:[]}},data:null}),computed:{...(0,h.aH)(["loading","localStorageTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarLocalStorageTemp(),await this.generarPDF()}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (created VacunaStockTotalImprimir)"})}},methods:{...(0,h.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,h.i0)(["requestAPI"]),...(0,h.i0)("main",["buscarAreaFiltros"]),...(0,h.i0)("vacunas",["getRequestFilter"]),async modificarPdf(){this.pdf.info={title:`Vacunatorio Stock Total ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageOrientation="landscape",this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(t,e,a)=>[{columns:[{width:"*",text:[{text:`Página ${t} de ${e}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"20%",layout:"noBorders",table:{body:[[{height:80,width:.2*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nPrograma De Inmunizaciones\n",style:["negrita","centrado"],fontSize:16},{text:"Stock Total",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha:",style:["centrado"],fontSize:13},{text:`\n\n${this.hoy}`,style:["derecha"],fontSize:13}]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content=[];let t=this._cloneDeep(this.tablaConfig);this.data?.stock.length?(t.table.headerRows+=1,t.table.widths=["*"],t.table.body.push([{text:"Sistema de Stock",style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:this.data?.procedenciaSubtotal.length?this.data.procedenciaSubtotal.length+3:2}]),t.table.headerRows+=1,t.table.body.push([{text:"Vacuna",style:["centrado"],fillColor:"#DFDFDF",margin:[0,this.data?.procedenciaSubtotal.length?12:0,0,0],rowSpan:2}]),t.table.headerRows+=1,t.table.body.push([{text:"",key:"insumoDB",key_style:["izquierda"]}]),this.data?.procedenciaSubtotal.length&&(t.table.body[1].push({text:"Subtotal Procedencias",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],colSpan:this.data.procedenciaSubtotal.length+1}),this.data.procedenciaSubtotal.forEach((e=>{t.table.widths.push("10%"),t.table.body[0].push(""),t.table.body[1].push(""),t.table.body[2].push({text:e,style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:`subtotal_${e}`,key_style:["derecha"]})})),t.table.widths.push("10%"),t.table.body[0].push(""),t.table.body[2].push({text:"Otros",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Otros",key_style:["derecha"]})),t.table.widths.push("12%"),t.table.body[0].push(""),t.table.body[1].push({text:"Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,this.data?.procedenciaSubtotal.length?12:0,0,0],rowSpan:2}),t.table.body[2].push({text:"",key:"total",key_style:["derecha"],key_fillColor:[{cond:"=",value:0,resultado:"#FFCDD2"}]}),t=(0,g.s)({data:this.data?.stock,config:t})):(t.table.headerRows+=1,t.table.widths=["*"],t.table.body.push([{text:"Sistema de Stock",style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}]),t.table.body.push([{text:"No Hay Stock en el Sistema.",style:["centrado","negrita"],margin:[0,5]}])),this.pdf.content.push(t)},async buscarStockTotal(t){try{this.mostrarLoading({titulo:"Contando Stock..."});let e=await this.getRequestFilter({payload:t,opcional:{areas:!0,fecha:!0}});if(e.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/vacunas/stock/total?${e.dato}`}),!!a?.data?.ok&&a?.data}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (buscarStockTotal)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{if(this.mostrarLoading({titulo:"Preparando PDF..."}),this.data=await this.buscarStockTotal({insumos:this.localStorageTemp.insumos}),!this.data)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});await this.modificarPdf(),await(0,g.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},f=y;var p=a(81656),b=(0,p.A)(f,c,u,!1,null,null,null);const m=b.exports},95350:(t,e,a)=>{a.d(e,{P:()=>n,dd:()=>i,s:()=>l});a(44114);var o=a(31214),r=a.n(o);if(void 0==r().vfs){const t=a(17108);r().vfs=t.pdfMake.vfs}r().tableLayouts={TituloDatos:{hLineWidth:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t,e){return 0===t||t===e.table.widths.length?2:1},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(t,e){return 0===t?0:t<=e.table.headerRows?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t){return 0},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}}};const i={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},l=function({config:t={layout:"TituloDatos",style:"margenTabla",table:{widths:["*","20%"],headerRows:0,body:[]}},data:e=[]}={}){let a=t.table.body.at(-1);return e?.forEach((function(e){let o=[];a.forEach((function(t){let a={text:e[t.key]?.toLocaleString("es-AR")??t.fillEmpty??"---",style:t.key_style??"centrado"};t.key_fillColor&&t.key_fillColor.forEach((o=>{let r=o.value??e[o.property];switch(o.multiple&&(r*=o.multiple),o.cond){case"=":(e[t.key]===r||!e[t.key]&&t.fillEmpty===r)&&(a.fillColor=o.resultado);break;case">":(e[t.key]>r||!e[t.key]&&t.fillEmpty>r)&&(a.fillColor=o.resultado);break;case"<":(e[t.key]<r||!e[t.key]&&t.fillEmpty<r)&&(a.fillColor=o.resultado);break;case"!=":(e[t.key]!==r||!e[t.key]&&t.fillEmpty!==r)&&(a.fillColor=o.resultado);break;case"existe":r&&(a.fillColor=o.resultado);break}})),o.push(a)})),t.table.body.push(o)})),t},n=async function(t,e,a){"true"==a||navigator.userAgent.indexOf("Edge")>=0?(await r().createPdf(t||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).download(e,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):r().createPdf(t||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).open({},window)}}}]);