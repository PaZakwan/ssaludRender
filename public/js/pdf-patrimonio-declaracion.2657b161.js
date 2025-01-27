"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[2524],{64445:function(t,a,e){e.r(a),e.d(a,{default:function(){return x}});var i=e(28383),r=e(15852),n=e(1899),s=e(48122),o=e(41614),d=e(69155),l=e(55731),c=function(){var t=this,a=t._self._c;return a(s.A,{attrs:{"grid-list-xs":""}},[a(d.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[a(o.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[a(r.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[a(n.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== Patrimonio ======")])],1)],1),t.loading.estado?a(o.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[a(r.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[a(n.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):a(o.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[a(r.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[a(n.SL,[a(d.A,{attrs:{row:"",wrap:""}},[a(l.hc),a(i.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.generarPDF}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),a(l.hc)],1)],1)],1)],1)],1)],1)},h=[],g=(e(44114),e(95353)),m=e(95350),u={name:"patrimonioDeclaracionImprimir",components:{},data:()=>({descarga:!0,pdfGen:m.P,pdf:m.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["15%","*","20%"],headerRows:1,body:[]}},data:{}}),computed:{...(0,g.aH)(["APIURL","axiosConfig","loading","persona"])},async created(){try{this.descarga=this.$route.query.descarga,await this.generarPDF()}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (PDF)"})}},methods:{...(0,g.PY)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),...(0,g.i0)(["requestAPI"]),async modificarPdf(){this.pdf.info={title:`Declaracion_${this.data.oficina_nro}_${this.data.fecha}`,author:"Secretaria de Salud"},this.pdf.images={muni_description:this.pdf.images.muni_description},this.pdf.pageMargins=[30,130,30,140],this.pdf.header=(t,a,e)=>[{columns:[{width:"25%",text:[{text:`Página ${t} de ${a}`,fontSize:10}],style:["izquierda"],margin:[10,5]},{width:"*",text:[{text:`Oficina - Nro : ${this.data.oficina_nro}`,fontSize:10}],margin:[5,5]},{width:"*",text:[{text:`Fecha : ${this.data.fecha}`,fontSize:13}],style:["derecha","subrayado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(e.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_description"}]]},margin:[0,15,0,0]},{width:"*",text:[{text:"\nDirección De Patrimonio",style:["negrita","centrado"],fontSize:14},{text:"\nRegristro de Movimientos Patrimoniales",style:["centrado"]},{text:"\nPlanilla Nº "+("Bienes Reales"===this.data.tipo?"1":"2"),style:["subrayado","centrado"],fontSize:16}]},{width:"25%",text:[{text:`\nDeclaración de\n${this.data.tipo}`,style:["negrita","centrado"],fontSize:16}]}],margin:[30,5]}],this.pdf.footer=(t,a,e)=>[{text:"\n"},{columns:[{width:"20%",text:"\nRecibido",style:["centrado","negrita"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"Responsable de la Custodia",style:["centrado","negrita"],margin:[10,0]},{width:"7%",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"Agente Inventariador/ra",style:["centrado","negrita"],margin:[10,0]}]},{columns:[{width:"20%",text:[{text:"Sujeto a",fontSize:10},{text:"\nrevision del",fontSize:10},{text:"\nOrgano Rector.",fontSize:10}],style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"",style:["centrado"],margin:[10,0]},{width:"7%",text:[{text:"Firma: ",fontSize:10}],style:["derecha"],margin:[0,0]},{width:"33%",canvas:[{type:"line",x1:10,y1:17,x2:(e.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2])/3,y2:17,lineWidth:.5,lineColor:"black"}],margin:[0,0,10,0]}]},{columns:[{width:"20%",text:"",style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",canvas:[{type:"line",x1:10,y1:17,x2:(e.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2])/3,y2:17,lineWidth:.5,lineColor:"black"}],margin:[10,0]},{width:"7%",text:[{text:"Legajo: ",fontSize:10}],style:["derecha"],margin:[0,0]},{width:"33%",canvas:[{type:"line",x1:10,y1:17,x2:(e.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2])/3,y2:17,lineWidth:.5,lineColor:"black"}],margin:[0,0,10,0]}]},{columns:[{width:"20%",text:"",style:["centrado"],margin:[10,0]},{width:"*",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:[{text:"Sello y Firma",fontSize:10}],style:["centrado"],margin:[10,0]},{width:"7%",text:"",style:["centrado"],margin:[0,0]},{width:"33%",text:"",style:["centrado"],margin:[0,0,10,0]}]}],this.pdf.content.push({columns:[{width:"10%",text:[{text:"",style:["centrado"]}]},{width:"10%",text:[{text:"Oficina: ",style:["izquierda"]}]},{width:"55%",text:[{text:`${this.data.oficina?this.data.oficina.area.toUpperCase():"Oficina Borrada"}`,style:["subrayado","izquierda"]}]},{width:"5%",text:[{text:"N°: ",style:["izquierda"]}]},{width:"10%",text:[{text:`${this.data.oficina_nro}`,style:["subrayado","izquierda"]}]},{width:"10%",text:[{text:"",style:["centrado"]}]}]}),this.tablaConfig.table.body.push([{text:"\nNúmero de Inventario",style:["centrado","subrayado"],fillColor:"#D9D9D9",key:"inventario"},{text:`\n          BIENES que físicamente ${"Bienes Reales"===this.data.tipo?"":"NO "}se encuentran en la Oficina y\n          ${"Bienes Reales"===this.data.tipo?"NO ":""}se observan en el Inventario correspondiente a la misma.\n          DESCRIPCIÓN DEL BIEN`,style:["centrado"],fillColor:"#D9D9D9",key:"descripcion"},{text:[{text:"Columna para uso exclusivo de la \nDir. de Patrimonio",fontSize:9},{text:"\nNO COMPLETAR ",bold:!0},{text:"\nOficina n°",fontSize:10}],style:["centrado"],fillColor:"gray",fillEmpty:"",key:"oficina"}]),this.pdf.content.push(await(0,m.s)({config:this.tablaConfig,data:this.data.objetos}))},async cargarDeclaracion(t){try{this.mostrarLoading({titulo:"Cargando Declaracion...",color:"primary"});let a=null;return a=await this.requestAPI({method:"get",url:`/patrimonioDeclaracion/buscar?busqueda=${JSON.stringify({_id:t})}`}),!!a?.data?.ok&&a?.data?.declaraciones[0]}catch(a){return this.mostrarError({mensaje:a,titulo:"Inesperado (cargarDeclaracion)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let t=await this.cargarDeclaracion(this.$route.params.id);if(!t)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});this.data=t,this.data.fecha=this.data.fecha.substring(0,10),await this.modificarPdf(),await(0,m.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},f=u,p=e(81656),y=(0,p.A)(f,c,h,!1,null,null,null),x=y.exports}}]);