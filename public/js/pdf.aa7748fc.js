(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[192],{2909:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return x}});var i=a(6194),n=a(8956),r=a(2353),o=a(6530),s=a(683),l=a(9456),d=a(8143),c=function(){var t=this,e=t._self._c;return e(o.Z,{attrs:{"grid-list-xs":""}},[e(l.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(s.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(n.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(r.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Patrimonio ======")])],1)],1),t.loading.estado?e(s.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(n.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(r.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):e(s.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(n.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(r.h7,[e(d.Cl),e(i.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:function(e){return t.pdfGen(t.pdf,`${t.pdf.info.title}.pdf`,t.descarga)}}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),e(d.Cl)],1)],1)],1)],1)],1)},u=[],f=a(629),h=a(9592),m={name:"patrimonioDeclaracionImprimir",components:{},data:()=>({descarga:!0,pdfGen:h.o,pdf:h.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:[75,"*",95],headerRows:1,body:[]}},data:{tipo:"",fecha:"",oficina:"",oficina_nro:"",custodia:"",inventariador:"",objetos:[{inventario:"",descripcion:""}]}}),computed:{...(0,f.rn)(["APIURL","axiosConfig","loading","persona"])},async created(){try{this.mostrarLoading({titulo:"Preparando PDF..."}),this.descarga=this.$route.query.descarga,await this.cargarDeclaracion(this.$route.params.id),await this.modificarPdf(),await(0,h.o)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado"})}finally{this.ocultarLoading()}},methods:{...(0,f.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),async cargarDeclaracion(t){try{let a=JSON.stringify({_id:t});this.mostrarLoading({titulo:"Cargando datos...",color:"primary"});let i=await this.axios.get(this.APIURL+"/patrimonioDeclaracion/buscar?busqueda="+a,this.axiosConfig);if(i.data.ok)this.data=i.data.declaraciones[0],this.data.fecha=this.data.fecha.substring(0,10);else try{this.mostrarError({errores:"",mensaje:i.data.err.message,titulo:i.status})}catch(e){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(e){try{this.mostrarError({errores:e.response.data.err.errors,mensaje:e.response.data.err.message,titulo:e.response.status})}catch(e){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}this.$router.push({name:"PatrimonioDeclaracionBuscar"})}finally{this.ocultarLoading()}},async modificarPdf(){this.pdf.info={title:`Declaracion_${this.data.oficina_nro}_${this.data.fecha}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,140],this.pdf.header=(t,e,a)=>[{columns:[{width:"25%",text:[{text:`Página ${t} de ${e}`,fontSize:10}],style:["izquierda"],margin:[10,5]},{width:"*",text:[{text:`Oficina - Nro : ${this.data.oficina_nro}`,fontSize:10}],margin:[5,5]},{width:"*",text:[{text:`Fecha : ${this.data.fecha}`,fontSize:13}],style:["derecha","subrayado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(a.width-30),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección De Patrimonio",style:["negrita","centrado"],fontSize:14},{text:"\nRegristro de Movimientos Patrimoniales",style:["centrado"]},{text:"\nPlanilla Nº "+("Bienes Reales"===this.data.tipo?"1":"2"),style:["subrayado","centrado"],fontSize:16}]},{width:"25%",text:[{text:`\nDeclaración de\n${this.data.tipo}`,style:["negrita","centrado"],fontSize:16}]}],margin:[30,5]}],this.pdf.footer=(t,e,a)=>[{text:"\n"},{columns:[{width:"20%",text:"\nRecibido",style:["centrado","negrita"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"Responsable de la Custodia",style:["centrado","negrita"],margin:[10,0]},{width:"7%",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"Agente Inventariador/ra",style:["centrado","negrita"],margin:[10,0]}]},{columns:[{width:"20%",text:[{text:"Sujeto a",fontSize:10},{text:"\nrevision del",fontSize:10},{text:"\nOrgano Rector.",fontSize:10}],style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"",style:["centrado"],margin:[10,0]},{width:"7%",text:[{text:"Firma: ",fontSize:10}],style:["derecha"],margin:[0,0]},{width:"33%",canvas:[{type:"line",x1:10,y1:17,x2:(a.width-60)/3,y2:17,lineWidth:.5,lineColor:"black"}],margin:[0,0,10,0]}]},{columns:[{width:"20%",text:"",style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",canvas:[{type:"line",x1:10,y1:17,x2:(a.width-60)/3-10,y2:17,lineWidth:.5,lineColor:"black"}],margin:[10,0]},{width:"7%",text:[{text:"Legajo: ",fontSize:10}],style:["derecha"],margin:[0,0]},{width:"33%",canvas:[{type:"line",x1:10,y1:17,x2:(a.width-60)/3,y2:17,lineWidth:.5,lineColor:"black"}],margin:[0,0,10,0]}]},{columns:[{width:"20%",text:"",style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:[{text:"Sello y Firma",fontSize:10}],style:["centrado"],margin:[10,0]},{width:"7%",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"",style:["centrado"],margin:[0,0,10,0]}]}],this.pdf.content.push({columns:[{width:"10%",text:[{text:"",style:["centrado"]}]},{width:"10%",text:[{text:"Oficina: ",style:["izquierda"]}]},{width:"55%",text:[{text:`${this.data.oficina?this.data.oficina.area.toUpperCase():"Oficina Borrada"}`,style:["subrayado","izquierda"]}]},{width:"5%",text:[{text:"N°: ",style:["izquierda"]}]},{width:"10%",text:[{text:`${this.data.oficina_nro}`,style:["subrayado","izquierda"]}]},{width:"10%",text:[{text:"",style:["centrado"]}]}]}),this.tablaConfig.table.body.push([{text:"\nNúmero de Inventario",style:["centrado","subrayado"],fillColor:"#D9D9D9",key:"inventario"},{text:`\n          BIENES que físicamente ${"Bienes Reales"===this.data.tipo?"":"NO "}se encuentran en la Oficina y\n          ${"Bienes Reales"===this.data.tipo?"NO ":""}se observan en el Inventario correspondiente a la misma.\n          DESCRIPCIÓN DEL BIEN`,style:["centrado"],fillColor:"#D9D9D9",key:"descripcion"},{text:[{text:"Columna para uso exclusivo de la \nDir. de Patrimonio",fontSize:9},{text:"\nNO COMPLETAR ",bold:!0},{text:"\nOficina n°",fontSize:10}],style:["centrado"],fillColor:"gray",key:"oficina"}]),this.pdf.content.push(await(0,h.x)({config:this.tablaConfig,data:this.data.objetos}))}}},g=m,y=a(1001),p=(0,y.Z)(g,c,u,!1,null,null,null),x=p.exports},1421:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return D}});var i=a(6194),n=a(8956),r=a(2353),o=a(6530),s=a(683),l=a(9456),d=a(8143),c=function(){var t=this,e=t._self._c;return e(o.Z,{attrs:{"grid-list-xs":""}},[e(l.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(s.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(n.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(r.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Patrimonio ======")])],1)],1),t.loading.estado?e(s.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(n.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(r.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):e(s.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(n.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(r.h7,[e(d.Cl),e(i.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:function(e){return t.crearPDF()}}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),e(d.Cl)],1)],1)],1)],1)],1)},u=[],f=a(629),h=a(1052),m=a.n(h),g=a(6727),y=a.n(g),p=a(7920);y().vfs=p.pdfMake.vfs;var x={name:"patrimonioMoverImprimir",components:{},data:()=>({descarga:!0,pdf:m().dd}),computed:{...(0,f.rn)(["APIURL","axiosConfig","loading","hoy","persona"]),...(0,f.rn)("patrimonio",{pdfImprimir:t=>t.pdfImprimir}),nombrePDF:function(){try{return this.pdfImprimir.objetos&&1===this.pdfImprimir.objetos.length?`Mov_Patrimonial_${this.pdfImprimir.objetos[0].inventario}_${this.pdfImprimir.objetos[0].fecha.substring(0,10)}.pdf`:`Mov_Patrimonial_${this.hoy}.pdf`}catch(t){return`Mov_Patrimonial_${this.hoy}.pdf`}},columnas:function(){let t=[{text:[{text:"\n"},{text:"Número de Inventario",style:["subrayado"]}],style:["centrado"],key:"inventario",fillColor:"#D9D9D9"},{text:"\n\n            DESCRIPCIÓN DEL BIEN\n            ",style:["centrado"],key:"descripcion",fillColor:"#D9D9D9"},{text:"\n\n            Transferido de...\n            ",style:["centrado"],key:"desde",fillColor:"#D9D9D9"},{text:[{text:"\nFirma y Sello"},{text:"\n                Responsable del\n                Movimiento",bold:!0}],style:["centrado"],key:"",fillColor:"#D9D9D9"},{text:"\n\n            Recibido en...\n            ",style:["centrado"],key:"destino",fillColor:"#D9D9D9"},{text:[{text:"\nFirma y Sello"},{text:"\n                Responsable de la\n                Custodia",bold:!0}],style:["centrado"],key:"",fillColor:"#D9D9D9"}];return t}},async created(){this.mostrarLoading({titulo:"Creando PDF...",color:"primary"}),this.descarga=this.$route.query.descarga,await this.cargarPdfStore(),this.crearPDF()},methods:{...(0,f.OI)(["mostrarLoading","ocultarLoading"]),...(0,f.OI)("patrimonio",["cargarPdfStore"]),async crearBodyTabla(t,e){let a=[];return a.push(e),t.forEach((function(t){let i=[];e.forEach((function(e){t[e.key]?i.push(t[e.key].toString()):i.push("")})),a.push(i)})),a},async tablaDynamic(t,e){return{style:"margenTabla",table:{widths:[75,"*",90,140,90,140],heights:70,headerRows:1,dontBreakRows:!0,body:await this.crearBodyTabla(t,e),layout:{fillColor:function(t,e,a){return t%2===0?"#CCCCCC":null}}}}},async modificarPdf(){this.pdf.info={title:`${this.nombrePDF}`,author:"Secretaria de Salud"},this.pdf.content[3]=await this.tablaDynamic(this.pdfImprimir.objetos,this.columnas)},async imprimir(){let t={content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};await this.modificarPdf(),t=this.pdf,this.ocultarLoading(),navigator.userAgent.indexOf("Edge")>=0||"true"==this.descarga?window.confirm("Su descarga comenzará ahora")&&(await y().createPdf(t).download(this.nombrePDF),setTimeout((()=>{window.parent.document.dispatchEvent(new CustomEvent("ocultarIframe",{detail:!0})),window.close()}),1e3)):y().createPdf(t).open({},window)},async crearPDF(){await this.imprimir()}}},w=x,b=a(1001),C=(0,b.Z)(w,c,u,!1,null,null,null),D=C.exports},9592:function(t,e,a){"use strict";a.d(e,{dd:function(){return s},o:function(){return d},x:function(){return l}});var i=a(361),n=a.n(i),r=a(6727),o=a.n(r);if(void 0==o().vfs){const t=a(7920);o().vfs=t.pdfMake.vfs}o().tableLayouts={TituloDatos:{hLineWidth:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t,e){return 0===t||t===e.table.widths.length?2:1},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(t,e){return 0===t?0:t<=e.table.headerRows?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t){return 0},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}}};const s={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`,firma_transferencia:`${window.location.origin}/static/img/firma_transferencia-2480x300.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},l=function({config:t,data:e}){let a=n()(t),i=n()(a.table.body[a.table.body.length-1]);return e?.forEach((function(t){let e=[];i.forEach((function(a){if(t[a.key]){let i={text:t[a.key].toLocaleString("es-AR"),style:a.key_style};a.key_fillColor&&a.key_fillColor.forEach((e=>{switch(e.cond){case"=":t[a.key]===e.value&&(i.fillColor=e.resultado);break;case">":t[a.key]>e.value&&(i.fillColor=e.resultado);break;case"<":t[a.key]<e.value&&(i.fillColor=e.resultado);break;case"!=":t[a.key]!==e.value&&(i.fillColor=e.resultado);break;case"otroExiste":t[e.value]&&(i.fillColor=e.resultado);break}})),e.push(i)}else e.push("")})),a.table.body.push(e)})),a},d=async function(t,e,a){let i=t||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};navigator.userAgent.indexOf("Edge")>=0||"true"==a?(await o().createPdf(i).download(e,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):o().createPdf(i).open({},window)}},1052:function(t){let e={fecha:"17/07/2020",tipo:"Reales",tipon:"1/2",oficina:"DEPARTAMENTO DE INFORMATICA",oficinan:"123456",objetos:[{inventario:"111111",descripcion:"Testeo de descripcion amplia para ver cuantos caracteres entran y como los toma el sistema",desde:"Tierra",destino:"Marte",fecha:"19/05/2021"},{inventario:"222222",descripcion:"jkafjnnjlasklakladsk",oficina:"123"},{inventario:"333333",descripcion:"hola \nTEST\nDe espacios.",desde:"Saturno",destino:"Mercurio",fecha:"19/05/2021"},{inventario:"444444",descripcion:"jkafjnnjlasklakladsk"},{inventario:"555555",descripcion:"jkafjnnjlasklakladsk"},{inventario:"111111",descripcion:"jkafjnnjlasklakladsk"}]},a=[{text:[{text:"\n"},{text:"Número de Inventario",style:["subrayado"]}],style:["centrado"],key:"inventario",fillColor:"#D9D9D9"},{text:"\n\n        DESCRIPCIÓN DEL BIEN\n        ",style:["centrado"],key:"descripcion",fillColor:"#D9D9D9"},{text:"\n\n        Transferido de...\n        ",style:["centrado"],key:"desde",fillColor:"#D9D9D9"},{text:[{text:"\nFirma y Sello"},{text:"\n            Responsable del\n            Movimiento",bold:!0}],style:["centrado"],key:"",fillColor:"#D9D9D9"},{text:"\n\n        Recibido en...\n        ",style:["centrado"],key:"destino",fillColor:"#D9D9D9"},{text:[{text:"\nFirma y Sello"},{text:"\n            Responsable de la\n            Custodia",bold:!0}],style:["centrado"],key:"",fillColor:"#D9D9D9"}];function i(t,e){let a=[];return a.push(e),t.forEach((function(t){let i=[];e.forEach((function(e){t[e.key]?i.push(t[e.key].toString()):i.push("")})),a.push(i)})),a}function n(t,e){return{style:"margenTabla",table:{widths:[75,"*",90,140,90,140],heights:70,headerRows:1,dontBreakRows:!0,body:i(t,e),layout:{fillColor:function(t,e,a){return t%2===0?"#CCCCCC":null}}}}}var r={info:{title:"Transferencia",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"landscape",pageMargins:[30,40,30,140],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`,firma_transferencia:`${window.location.origin}/static/img/firma_transferencia-2480x300.png`},background:{image:"firma_transferencia",opacity:1,width:590,height:90,absolutePosition:{x:125,y:500}},header:function(t,e){return[{columns:[{width:"25%",text:[{text:`Página ${t} de ${e}`}],style:["izquierda","cabecera"],margin:[10,10]}]}]},content:[{columns:[{width:"25%",table:{body:[[{width:"175",height:72,image:"muni_frase"}]]},layout:"noBorders"},{width:"*",text:[{text:"\nDirección de Patrimonio",style:["patrimonio"]},{text:"\nRegristro de Movimientos Patrimoniales\n",style:["centrado"],fontSize:18},{text:"Causa: Transferencia",style:["planilla"]}]},{width:"25%",text:[{text:"\n",style:["centrado"],fontSize:18},{text:"\nFECHA:       /      /      ",style:["cursiva"],fontSize:18}]}]},"\n","\n",n(e.objetos,a)],defaultStyle:{fontSize:11},styles:{cabecera:{fontSize:10},patrimonio:{fontSize:18,bold:!0,alignment:"center"},planilla:{fontSize:18,decoration:"underline",alignment:"center"},declaracion:{fontSize:16,bold:!0,alignment:"center"},subrayado:{decoration:"underline"},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},cursiva:{italics:!0}}};t.exports={dd:r}}}]);