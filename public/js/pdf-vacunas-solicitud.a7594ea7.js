"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[8454],{22417:(t,e,a)=>{a.r(e),a.d(e,{default:()=>b});var i=a(28383),o=a(15852),r=a(1899),n=a(48122),s=a(41614),l=a(69155),d=a(55731),c=function(){var t=this,e=t._self._c;return e(n.A,{attrs:{"grid-list-xs":""}},[e(l.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(s.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(o.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(r.OQ,{staticClass:"px-0"},[t._v("====== GESTION DE VACUNAS ======")])],1)],1),t.loading.estado?e(s.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(r.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):e(s.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(r.SL,[e(l.A,{attrs:{row:"",wrap:""}},[e(d.hc),e(i.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.generarPDF}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),e(d.hc)],1)],1)],1)],1)],1)],1)},u=[],h=(a(44114),a(95353)),f=a(95350);const g={name:"vacunaSolicitudImprimir",components:{},data:()=>({descarga:!0,pdfGen:f.P,pdf:f.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","25%"],headerRows:1,body:[[{text:"\nInsumo\n ",style:["centrado"],fillColor:"#DFDFDF",key:"insumoDB",key_style:["izquierda"]},{text:"\nSolicitado\n ",style:["centrado"],fillColor:"#DFDFDF",key:"cantidad",key_style:["derecha"]}]]}},data:{}}),computed:{...(0,h.aH)(["loading","localStorageTemp"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarLocalStorageTemp(),this.data=this.localStorageTemp,await this.generarPDF()}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (created vacunaSolicitudImprimir)"})}},methods:{...(0,h.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,h.i0)("vacunas",["buscarInsumosFiltro"]),async modificarPdf(){this.pdf.info={title:`Solicitud_${this.data.id_time}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(t,e,a)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${t} de ${e}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{height:80,width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nPrograma De Inmunizaciones",style:["negrita","centrado"],fontSize:14},{text:"\n",style:["centrado"],fontSize:13},{text:`\nSolicitud ${this.data.id_time}`,style:["subrayado","centrado"],fontSize:16}]},{width:"25%",text:[{text:"Origen:\n",style:["centrado"],fontSize:13},{text:`${this.data.origenDB}`,style:["izquierda"]},{text:"\n\nDestino:\n",style:["centrado"],fontSize:13},{text:`${this.data.destinoDB??"Todos"}`,style:["izquierda"]}]}],margin:[30,5]}],this.pdf.content.push({columns:[{width:"*",text:[{text:[{text:"Fecha de Solicitud:",fontSize:13,style:["subrayado"],bold:!0},` ${this.mostrarFecha(this.data.fecha,!0)}`],fontSize:12}],style:["izquierda"],margin:[10,0,10,5]},{width:"*",text:[{text:[{text:"Estado:",fontSize:13,style:["subrayado"],bold:!0},` ${this.data.estado}`],fontSize:12}],style:["derecha"],margin:[10,0,10,5]}]}),this.pdf.content.push({columns:[{width:"*",text:[{text:[{text:"Categoria:",fontSize:13,style:["subrayado"],bold:!0},` ${this.data.categoria??"Vacuna"}`],fontSize:12}],style:["izquierda"],margin:[10,0,10,5]},{width:"*",text:[{text:[{text:"Motivo:",fontSize:13,style:["subrayado"],bold:!0},` ${this.data.motivo}`],fontSize:12}],style:["derecha"],margin:[10,0,10,5]}]}),this.pdf.content.push(await(0,f.s)({data:this.data.insumos,config:this.tablaConfig})),this.data.fec_resolucion&&(this.pdf.content.push({text:[{text:`${this.data.estado}`,fontSize:13,style:["subrayado"],bold:!0}," ~ ",{text:"Fecha de Resolucion:",fontSize:13,style:["subrayado"],bold:!0},` ${this.mostrarFecha(this.data.fec_resolucion,!0)}`],fontSize:12,style:[],margin:[10,0,10,5]}),this.pdf.content.push({text:[{text:"Δ ",fontSize:15,color:"orange",bold:!0},{text:"Observacion:",fontSize:13,style:["subrayado"],bold:!0},` ${this.data?.condicion_aceptada??this.data?.motivo_rechazo??"------"}`],fontSize:12,style:[],margin:[10,0,10,5]}))},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let t=await this.buscarInsumosFiltro({filtro:{_id:{$in:this.data.insumos.map((t=>t.insumo))}},select:"nombre"});for(let e=0;e<this.data.insumos.length;e++)this.data.insumos[e].insumoDB=t.find((t=>t._id===this.data.insumos[e].insumo)).nombre;await this.modificarPdf(),await(0,f.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},m=g;var y=a(81656),p=(0,y.A)(m,c,u,!1,null,null,null);const b=p.exports},95350:(t,e,a)=>{a.d(e,{P:()=>d,dd:()=>s,s:()=>l});a(44114);var i=a(31214),o=a.n(i),r=a(17108),n=a.n(r);o().addVirtualFileSystem(n()),o().tableLayouts={TituloDatos:{hLineWidth:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t,e){return 0===t||t===e.table.widths.length?2:1},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(t,e){return 0===t?0:t<=e.table.headerRows?2:1},hLineColor:function(t,e){return t<=e.table.headerRows||t===e.table.body.length?"black":"gray"},vLineWidth:function(t){return 0},fillColor:function(t,e,a){return t<e.table.headerRows?null:e.table.headerRows%2===0?t%2===0?"white":"#EEEEEE":t%2===0?"#EEEEEE":"white"}}};const s={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},l=function({config:t={layout:"TituloDatos",style:"margenTabla",table:{widths:["*","20%"],headerRows:0,body:[]}},data:e=[]}={}){let a=t.table.body.at(-1);return e?.forEach((function(e){let i=[];a.forEach((function(t){let a={text:e[t.key]?.toLocaleString("es-AR")??t.fillEmpty??"---",style:t.key_style??"centrado"};t.key_fillColor&&t.key_fillColor.forEach((i=>{let o=i.value??e[i.property];switch(i.multiple&&(o*=i.multiple),i.cond){case"=":(e[t.key]===o||!e[t.key]&&t.fillEmpty===o)&&(a.fillColor=i.resultado);break;case">":(e[t.key]>o||!e[t.key]&&t.fillEmpty>o)&&(a.fillColor=i.resultado);break;case"<":(e[t.key]<o||!e[t.key]&&t.fillEmpty<o)&&(a.fillColor=i.resultado);break;case"!=":(e[t.key]!==o||!e[t.key]&&t.fillEmpty!==o)&&(a.fillColor=i.resultado);break;case"existe":o&&(a.fillColor=i.resultado);break}})),i.push(a)})),t.table.body.push(i)})),t},d=async function(t,e,a){"true"==a||navigator.userAgent.indexOf("Edge")>=0?(await o().createPdf(t||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).download(e,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):navigator.userAgent.indexOf("Firefox")>=0?o().createPdf(t||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).open({},window):o().createPdf(t||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).getDataUrl((t=>{window.open(t,"_self")}))}}}]);