"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[489],{5966:function(t,e,a){a.r(e),a.d(e,{default:function(){return x}});var i=a(6194),r=a(8956),n=a(2353),o=a(6530),s=a(683),l=a(9456),d=a(8143),c=function(){var t=this,e=t._self._c;return e(o.Z,{attrs:{"grid-list-xs":""}},[e(l.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(s.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(r.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(n.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Patrimonio ======")])],1)],1),t.loading.estado?e(s.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(r.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(n.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):e(s.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(r.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(n.h7,[e(d.Cl),e(i.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.generarPDF}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),e(d.Cl)],1)],1)],1)],1)],1)},h=[],u=(a(560),a(629)),g=a(9592),f={name:"patrimonioDeclaracionImprimir",components:{},data:()=>({descarga:!0,pdfGen:g.o,pdf:g.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["15%","*","20%"],headerRows:1,body:[]}},data:{}}),computed:{...(0,u.rn)(["APIURL","axiosConfig","loading","persona"])},async created(){try{this.descarga=this.$route.query.descarga,await this.generarPDF()}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (PDF)"})}},methods:{...(0,u.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),...(0,u.nv)(["requestAPI"]),async modificarPdf(){this.pdf.info={title:`Declaracion_${this.data.oficina_nro}_${this.data.fecha}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,140],this.pdf.header=(t,e,a)=>[{columns:[{width:"25%",text:[{text:`Página ${t} de ${e}`,fontSize:10}],style:["izquierda"],margin:[10,5]},{width:"*",text:[{text:`Oficina - Nro : ${this.data.oficina_nro}`,fontSize:10}],margin:[5,5]},{width:"*",text:[{text:`Fecha : ${this.data.fecha}`,fontSize:13}],style:["derecha","subrayado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{height:80,width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección De Patrimonio",style:["negrita","centrado"],fontSize:14},{text:"\nRegristro de Movimientos Patrimoniales",style:["centrado"]},{text:"\nPlanilla Nº "+("Bienes Reales"===this.data.tipo?"1":"2"),style:["subrayado","centrado"],fontSize:16}]},{width:"25%",text:[{text:`\nDeclaración de\n${this.data.tipo}`,style:["negrita","centrado"],fontSize:16}]}],margin:[30,5]}],this.pdf.footer=(t,e,a)=>[{text:"\n"},{columns:[{width:"20%",text:"\nRecibido",style:["centrado","negrita"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"Responsable de la Custodia",style:["centrado","negrita"],margin:[10,0]},{width:"7%",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"Agente Inventariador/ra",style:["centrado","negrita"],margin:[10,0]}]},{columns:[{width:"20%",text:[{text:"Sujeto a",fontSize:10},{text:"\nrevision del",fontSize:10},{text:"\nOrgano Rector.",fontSize:10}],style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"",style:["centrado"],margin:[10,0]},{width:"7%",text:[{text:"Firma: ",fontSize:10}],style:["derecha"],margin:[0,0]},{width:"33%",canvas:[{type:"line",x1:10,y1:17,x2:(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2])/3,y2:17,lineWidth:.5,lineColor:"black"}],margin:[0,0,10,0]}]},{columns:[{width:"20%",text:"",style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",canvas:[{type:"line",x1:10,y1:17,x2:(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2])/3,y2:17,lineWidth:.5,lineColor:"black"}],margin:[10,0]},{width:"7%",text:[{text:"Legajo: ",fontSize:10}],style:["derecha"],margin:[0,0]},{width:"33%",canvas:[{type:"line",x1:10,y1:17,x2:(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2])/3,y2:17,lineWidth:.5,lineColor:"black"}],margin:[0,0,10,0]}]},{columns:[{width:"20%",text:"",style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:[{text:"Sello y Firma",fontSize:10}],style:["centrado"],margin:[10,0]},{width:"7%",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"",style:["centrado"],margin:[0,0,10,0]}]}],this.pdf.content.push({columns:[{width:"10%",text:[{text:"",style:["centrado"]}]},{width:"10%",text:[{text:"Oficina: ",style:["izquierda"]}]},{width:"55%",text:[{text:`${this.data.oficina?this.data.oficina.area.toUpperCase():"Oficina Borrada"}`,style:["subrayado","izquierda"]}]},{width:"5%",text:[{text:"N°: ",style:["izquierda"]}]},{width:"10%",text:[{text:`${this.data.oficina_nro}`,style:["subrayado","izquierda"]}]},{width:"10%",text:[{text:"",style:["centrado"]}]}]}),this.tablaConfig.table.body.push([{text:"\nNúmero de Inventario",style:["centrado","subrayado"],fillColor:"#D9D9D9",key:"inventario"},{text:`\n          BIENES que físicamente ${"Bienes Reales"===this.data.tipo?"":"NO "}se encuentran en la Oficina y\n          ${"Bienes Reales"===this.data.tipo?"NO ":""}se observan en el Inventario correspondiente a la misma.\n          DESCRIPCIÓN DEL BIEN`,style:["centrado"],fillColor:"#D9D9D9",key:"descripcion"},{text:[{text:"Columna para uso exclusivo de la \nDir. de Patrimonio",fontSize:9},{text:"\nNO COMPLETAR ",bold:!0},{text:"\nOficina n°",fontSize:10}],style:["centrado"],fillColor:"gray",fillEmpty:"",key:"oficina"}]),this.pdf.content.push(await(0,g.x)({config:this.tablaConfig,data:this.data.objetos}))},async cargarDeclaracion(t){try{this.mostrarLoading({titulo:"Cargando Declaracion...",color:"primary"});let e=null;return e=await this.requestAPI({method:"get",url:`/patrimonioDeclaracion/buscar?busqueda=${JSON.stringify({_id:t})}`}),!!e?.data?.ok&&e?.data?.declaraciones[0]}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (cargarDeclaracion)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let t=await this.cargarDeclaracion(this.$route.params.id);if(!t)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});this.data=t,this.data.fecha=this.data.fecha.substring(0,10),await this.modificarPdf(),await(0,g.o)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},y=f,m=a(1001),p=(0,m.Z)(y,c,h,!1,null,null,null),x=p.exports},9592:function(t,e,a){a.d(e,{dd:function(){return s},o:function(){return d},x:function(){return l}});a(560);var i=a(361),r=a.n(i),n=a(1566),o=a.n(n);if(void 0==o().vfs){const t=a(7920);o().vfs=t.pdfMake.vfs}o().tableLayouts={TituloDatos:{hLineWidth:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t,e){return 0===t||t===e.table.widths.length?2:1},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(t,e){return 0===t?0:t<=e.table.headerRows?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t){return 0},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}}};const s={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},l=function({config:t,data:e}){let a=r()(t),i=r()(a.table.body[a.table.body.length-1]);return e?.forEach((function(t){let e=[];i.forEach((function(a){if("undefined"!==typeof t[a.key]&&null!==t[a.key]){let i={text:t[a.key].toLocaleString("es-AR"),style:a.key_style};a.key_fillColor&&a.key_fillColor.forEach((e=>{let r=e.value??t[e.property];switch(e.multiple&&(r*=e.multiple),e.cond){case"=":t[a.key]===r&&(i.fillColor=e.resultado);break;case">":t[a.key]>r&&(i.fillColor=e.resultado);break;case"<":t[a.key]<r&&(i.fillColor=e.resultado);break;case"!=":t[a.key]!==r&&(i.fillColor=e.resultado);break;case"existe":r&&(i.fillColor=e.resultado);break}})),e.push(i)}else e.push({text:`${a.fillEmpty??"---"}`,style:"centrado"})})),a.table.body.push(e)})),a},d=async function(t,e,a){let i=t||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};navigator.userAgent.indexOf("Edge")>=0||"true"==a?(await o().createPdf(i).download(e,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):o().createPdf(i).open({},window)}}}]);