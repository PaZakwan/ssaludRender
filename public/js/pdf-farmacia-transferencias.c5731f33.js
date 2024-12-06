"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[8987],{81411:(e,t,a)=>{a.r(t),a.d(t,{default:()=>E});var r=a(28383),i=a(15852),s=a(1899),o=a(48122),n=a(41614),l=a(69155),d=function(){var e=this,t=e._self._c;return t(o.A,{attrs:{"grid-list-xs":""}},[t(l.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(n.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(i.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(s.OQ,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?t(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(i.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(s.OQ,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):t(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(i.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(s.SL,[t(l.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(r.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.generarPDF}},[e._v(" "+e._s("true"==e.descarga?"Descargar PDF":"Mostrar PDF"))])],1)],1)],1)],1)],1)],1)},c=[],h=(a(44114),a(95353)),u=a(95350);const g={name:"FarmaciaTransferenciaEstadoImprimir",components:{},data:()=>({descarga:!0,pdfGen:u.P,pdf:u.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","*","*","*","*","*"],headerRows:0,body:[]}},data:{}}),computed:{...(0,h.aH)(["loading","localStorageTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarLocalStorageTemp(),this.data.desde=this.localStorageTemp.desde??"xxxx-xx-xx",this.data.hasta=this.localStorageTemp.hasta??"xxxx-xx-xx",this.data.areas={},await this.generarPDF()}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (created FarmaciaTransferenciaEstadoImprimir)"})}},methods:{...(0,h.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,h.i0)(["requestAPI"]),...(0,h.i0)("main",["buscarAreaFiltros"]),...(0,h.i0)("farmacia",["getRequestFilter","buscarInsumosFiltro"]),async modificarPdf(){this.pdf.info={title:`Farmacia Transferencia Estado ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{height:80,width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Transferencias Estado",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.data.desde}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.data.hasta}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content.push({text:[{text:"Δ ",fontSize:15,color:"orange",bold:!0},{text:"Filtro:",fontSize:13,style:["subrayado"],bold:!0},""+(this.data.areasName.length?`\n· Areas: ${this.data.areasName.join("; ")}.`:""),""+(this.data.insumosName.length?`\n· Insumos: ${this.data.insumosName.join("; ")}.`:""),""+(this.localStorageTemp.procedencias.length?`\n· Procedencias: ${this.localStorageTemp.procedencias.join("; ")}.`:"")],fontSize:12,style:[],margin:[10,0,10,5]}),Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:6},"","","","",""]),Object.entries(t).length>0?(a.table.headerRows+=1,a.table.body.push([{text:"Envios Pendientes",style:["centrado"],fillColor:"#EEEEEE",margin:[0,4]},{text:"Espera Envios",style:["centrado"],fillColor:"#EEEEEE",margin:[0,8]},{text:"Espera Recepcion",style:["centrado"],fillColor:"#EEEEEE",margin:[0,4]},{text:"Recepciones Pendientes",style:["centrado"],fillColor:"#EEEEEE",margin:[0,4]},{text:"Completadas",style:["centrado"],fillColor:"#EEEEEE",margin:[0,8]},{text:"Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,8]}]),a.table.body.push([{text:`${t.envio_pendiente?.toLocaleString("es-AR")}`,style:["derecha"],fillColor:""+(t.envio_pendiente>0?"#FFF9C4":"")},{text:`${t.espera_envio?.toLocaleString("es-AR")}`,style:["derecha"]},{text:`${t.espera_recepcion?.toLocaleString("es-AR")}`,style:["derecha"]},{text:`${t.recepcion_pendiente?.toLocaleString("es-AR")}`,style:["derecha"],fillColor:""+(t.recepcion_pendiente>0?"#FFE0B2":"")},{text:`${t.completadas?.toLocaleString("es-AR")}`,style:["derecha"]},{text:`${(+t.envio_pendiente+t.espera_envio+t.espera_recepcion+t.recepcion_pendiente+t.completadas)?.toLocaleString("es-AR")}`,style:["derecha"]}]),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Transferencias registradas en esta Unidad entre las fechas seleccionadas.",style:["centrado","negrita"],margin:[0,5],colSpan:6},"","","","",""]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Transferencias registradas entre las fechas seleccionadas.",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarTransferenciasEstadistica(e){try{this.mostrarLoading({titulo:"Buscando Transferencias..."});let t=await this.getRequestFilter({payload:e});if(t.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/farmacia/transferencias?${t.dato}&estadistica=1`}),!!a?.data?.ok&&a?.data?.estadistica}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarTransferenciasEstadistica)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let e=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.localStorageTemp.areas}},populate:"no",select:"area"})];this.data.areasName=[];for(let t=0;t<e.length;t++)this.data.areas[e[t].area]={},this.data.areasName.push(e[t].area);this.data.insumosName=[],this.localStorageTemp.insumos?.length&&(this.data.insumosName=await this.buscarInsumosFiltro({filtro:{_id:{$in:this.localStorageTemp.insumos}},populate:"no",select:"nombre"}),this.data.insumosName=this.data.insumosName.map((e=>e.nombre)));for(let t=0;t<this.localStorageTemp.areas.length;t+=10){let e=await this.buscarTransferenciasEstadistica({areas:this.localStorageTemp.areas.slice(t,t+10),desde:this.localStorageTemp.desde,hasta:this.localStorageTemp.hasta,insumos:this.localStorageTemp.insumos,procedencias:this.localStorageTemp.procedencias});if(!e)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});this.data.areas=this.sumarProps(this.data.areas,e)}await this.modificarPdf(),await(0,u.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},p=g;var m=a(81656),f=(0,m.A)(p,d,c,!1,null,null,null);const E=f.exports},95350:(e,t,a)=>{a.d(t,{P:()=>d,dd:()=>n,s:()=>l});a(44114);var r=a(31214),i=a.n(r),s=a(17108),o=a.n(s);i().addVirtualFileSystem(o()),i().tableLayouts={TituloDatos:{hLineWidth:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e,t){return 0===e||e===t.table.widths.length?2:1},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(e,t){return 0===e?0:e<=t.table.headerRows?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e){return 0},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}}};const n={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},l=function({config:e={layout:"TituloDatos",style:"margenTabla",table:{widths:["*","20%"],headerRows:0,body:[]}},data:t=[]}={}){let a=e.table.body.at(-1);return t?.forEach((function(t){let r=[];a.forEach((function(e){let a={text:t[e.key]?.toLocaleString("es-AR")??e.fillEmpty??"---",style:e.key_style??"centrado"};e.key_fillColor&&e.key_fillColor.forEach((r=>{let i=r.value??t[r.property];switch(r.multiple&&(i*=r.multiple),r.cond){case"=":(t[e.key]===i||!t[e.key]&&e.fillEmpty===i)&&(a.fillColor=r.resultado);break;case">":(t[e.key]>i||!t[e.key]&&e.fillEmpty>i)&&(a.fillColor=r.resultado);break;case"<":(t[e.key]<i||!t[e.key]&&e.fillEmpty<i)&&(a.fillColor=r.resultado);break;case"!=":(t[e.key]!==i||!t[e.key]&&e.fillEmpty!==i)&&(a.fillColor=r.resultado);break;case"existe":i&&(a.fillColor=r.resultado);break}})),r.push(a)})),e.table.body.push(r)})),e},d=async function(e,t,a){"true"==a||navigator.userAgent.indexOf("Edge")>=0?(await i().createPdf(e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).download(t,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):navigator.userAgent.indexOf("Firefox")>=0?i().createPdf(e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).open({},window):i().createPdf(e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).getDataUrl((e=>{window.open(e,"_self")}))}}}]);