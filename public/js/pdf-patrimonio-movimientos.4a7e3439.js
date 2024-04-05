"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[4613],{22189:(t,e,a)=>{a.r(e),a.d(e,{default:()=>b});var i=a(66194),r=a(18956),o=a(32353),n=a(66530),l=a(60683),s=a(59456),d=a(98143),c=function(){var t=this,e=t._self._c;return e(n.Z,{attrs:{"grid-list-xs":""}},[e(s.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(l.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(r.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(o.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Patrimonio ======")])],1)],1),t.loading.estado?e(l.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(r.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(o.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):e(l.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(r.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(o.h7,[e(d.Cl),e(i.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.generarPDF}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),e(d.Cl)],1)],1)],1)],1)],1)},h=[],f=(a(70560),a(20629)),g=a(85014);const u={name:"patrimonioMoverImprimir",components:{},data:()=>({descarga:!0,pdfGen:g.o,pdf:g.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["11%","*","12%","18%","12%","18%"],headerRows:1,heights:75,dontBreakRows:!0,body:[]}}}),computed:{...(0,f.rn)(["APIURL","axiosConfig","loading","hoy","persona"]),...(0,f.rn)("patrimonio",["pdfImprimir"]),nombrePDF(){try{return this.pdfImprimir.objetos&&1===this.pdfImprimir.objetos.length?`Mov_Patrimonial_${this.pdfImprimir.objetos[0].inventario}_${this.pdfImprimir.objetos[0].fecha.substring(0,10)}.pdf`:`Mov_Patrimonial_${this.hoy}.pdf`}catch(t){return`Mov_Patrimonial_${this.hoy}.pdf`}}},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarPdfStore(),await this.generarPDF()}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (PDF)"})}},methods:{...(0,f.OI)(["mostrarLoading","ocultarLoading","mostrarError"]),...(0,f.OI)("patrimonio",["cargarPdfStore"]),async modificarPdf(){this.pdf.info={title:this.nombrePDF,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageOrientation="landscape",this.pdf.pageMargins=[30,130,30,110],this.pdf.header=(t,e,a)=>[{columns:[{width:"25%",text:[{text:`Página ${t} de ${e}`,fontSize:10}],style:["izquierda"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{height:80,width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección de Patrimonio",style:["negrita","centrado"],fontSize:18},{text:"\nRegristro de Movimientos Patrimoniales",style:["centrado"],fontSize:16},{text:"\nCausa: Transferencia",style:["subrayado","centrado"],fontSize:16}]},{width:"25%",text:[{text:"\n",fontSize:18},{text:"\nFECHA:       /      /      ",style:["cursiva"],fontSize:18}]}],margin:[30,5]}],this.pdf.footer=(t,e,a)=>[{text:"\n\n"},{columns:[{width:"20%",text:[{text:"\nRecibido",style:["negrita"]},{text:"\nSujeto a",fontSize:10}],style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]}]},{columns:[{width:"20%",text:[{text:"revision del",fontSize:10},{text:"\nOrgano Rector.",fontSize:10}],style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"16%",text:[{text:"Agente Inventariador/ra: ",fontSize:12}],style:["centrado","negrita"],margin:[0,0]},{width:"6%",text:[{text:"Firma: ",fontSize:10}],style:["derecha"],margin:[0,0]},{width:"20%",canvas:[{type:"line",x1:10,y1:17,x2:(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2])/5,y2:17,lineWidth:.5,lineColor:"black"}],margin:[0,0]},{width:"6%",text:[{text:"Legajo: ",fontSize:10}],style:["derecha"],margin:[0,0]},{width:"20%",canvas:[{type:"line",x1:10,y1:17,x2:(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2])/5,y2:17,lineWidth:.5,lineColor:"black"}],margin:[0,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]}]}],this.tablaConfig.table.body.push([{text:[{text:"\n"},{text:"Número\nde\nInventario",style:["subrayado"]}],style:["centrado"],key:"inventario",fillColor:"#D9D9D9"},{text:"\n\nDESCRIPCIÓN DEL BIEN",style:["centrado"],key:"descripcion",fillColor:"#D9D9D9"},{text:"\n\nTransferido de...",style:["centrado"],key:"desde",fillColor:"#D9D9D9"},{text:[{text:"\nFirma y Sello"},{text:"\nResponsable del",bold:!0},{text:"\nMovimiento",bold:!0}],style:["centrado"],key:"",fillColor:"#D9D9D9",fillEmpty:""},{text:"\n\nRecibido en...",style:["centrado"],key:"destino",fillColor:"#D9D9D9"},{text:[{text:"\nFirma y Sello"},{text:"\nResponsable de la",bold:!0},{text:"\nCustodia",bold:!0}],style:["centrado"],key:"",fillColor:"#D9D9D9",fillEmpty:""}]),this.pdf.content.push(await(0,g.x)({config:this.tablaConfig,data:this.pdfImprimir.objetos}))},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."}),await this.modificarPdf(),await(0,g.o)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},p=u;var m=a(1001),y=(0,m.Z)(p,c,h,!1,null,null,null);const b=y.exports},85014:(t,e,a)=>{a.d(e,{dd:()=>l,o:()=>d,x:()=>s});a(70560);var i=a(50361),r=a.n(i),o=a(61566),n=a.n(o);if(void 0==n().vfs){const t=a(47920);n().vfs=t.pdfMake.vfs}n().tableLayouts={TituloDatos:{hLineWidth:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t,e){return 0===t||t===e.table.widths.length?2:1},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(t,e){return 0===t?0:t<=e.table.headerRows?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t){return 0},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}}};const l={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},s=function({config:t,data:e}){let a=r()(t),i=r()(a.table.body[a.table.body.length-1]);return e?.forEach((function(t){let e=[];i.forEach((function(a){let i={text:t[a.key]?.toLocaleString("es-AR")??a.fillEmpty??"---",style:a.key_style??"centrado"};a.key_fillColor&&a.key_fillColor.forEach((e=>{let r=e.value??t[e.property];switch(e.multiple&&(r*=e.multiple),e.cond){case"=":(t[a.key]===r||!t[a.key]&&a.fillEmpty===r)&&(i.fillColor=e.resultado);break;case">":(t[a.key]>r||!t[a.key]&&a.fillEmpty>r)&&(i.fillColor=e.resultado);break;case"<":(t[a.key]<r||!t[a.key]&&a.fillEmpty<r)&&(i.fillColor=e.resultado);break;case"!=":(t[a.key]!==r||!t[a.key]&&a.fillEmpty!==r)&&(i.fillColor=e.resultado);break;case"existe":r&&(i.fillColor=e.resultado);break}})),e.push(i)})),a.table.body.push(e)})),a},d=async function(t,e,a){let i=t||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};navigator.userAgent.indexOf("Edge")>=0||"true"==a?(await n().createPdf(i).download(e,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):n().createPdf(i).open({},window)}}}]);