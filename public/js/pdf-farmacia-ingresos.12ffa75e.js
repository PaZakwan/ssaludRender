"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[8215],{51978:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var r=a(55669),o=a(15852),i=a(1899),s=a(48122),n=a(41614),l=a(69155),d=a(55731),c=function(){var e=this,t=e._self._c;return t(s.A,{attrs:{"grid-list-xs":""}},[t(l.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(n.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(o.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(i.OQ,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?t(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.OQ,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):t(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.SL,[t(d.hc),t(r.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.generarPDF}},[e._v(" "+e._s("true"==e.descarga?"Descargar PDF":"Mostrar PDF"))]),t(d.hc)],1)],1)],1)],1)],1)},h=[],g=(a(44114),a(95353)),u=a(95350);const f={name:"farmaciaIngresosImprimir",components:{},data:()=>({descarga:!0,pdfGen:u.P,pdf:u.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["21%","*","13%","13%","15%"],headerRows:0,body:[]}},data:{}}),computed:{...(0,g.aH)(["loading","localStorageTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarLocalStorageTemp(),this.data.desde=this.localStorageTemp.desde??"xxxx-xx-xx",this.data.hasta=this.localStorageTemp.hasta??"xxxx-xx-xx",this.data.areas={},await this.generarPDF()}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (created farmaciaIngresosImprimir)"})}},methods:{...(0,g.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,g.i0)(["requestAPI"]),...(0,g.i0)("main",["buscarAreaFiltros"]),...(0,g.i0)("farmacia",["getRequestFilter"]),async modificarPdf(){this.pdf.info={title:`Farmacia Ingresos ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{height:80,width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:14},{text:"Insumos Ingresados",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.data.desde}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.data.hasta}`,style:["derecha"]}]}],margin:[30,0]}],this.pdf.footer=()=>[],Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:5},"","","",""]),Object.entries(t).length>0?(a.table.headerRows+=1,a.table.body.push([{text:"Categoria",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Insumo",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Subtotal",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],colSpan:2},"",{text:"Recibido Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,12,0,0],rowSpan:2}]),a.table.headerRows+=1,a.table.body.push([{text:"",key:"categoriaDB",key_style:["izquierda"]},{text:"",key:"insumoDB",key_style:["izquierda"]},{text:"Carga Propia",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"total_ingreso_pr",key_style:["derecha"]},{text:"Clearing",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"total_transferencia_in",key_style:["derecha"]},{text:"",key:"total",key_style:["derecha"]}]),a=(0,u.s)({data:t,config:a}),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Ingresos registrados en esta Unidad entre las fechas seleccionadas.",style:["centrado","negrita"],margin:[0,5],colSpan:5},"","","",""]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Ingresos registrados para mostrar entre las fechas seleccionadas",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarIngresosEstadistica(e){try{this.mostrarLoading({titulo:"Buscando Ingresos..."});let t=await this.getRequestFilter({payload:e});if(t.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/farmacia/ingresos/estadistica?${t.dato}&modelos=${JSON.stringify({ingresos:!0,transferencias:!0})}`}),!!a?.data?.ok&&a?.data?.ingresos}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarIngresosEstadistica)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let e=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.localStorageTemp.areas}},populate:"no",select:"area"})];for(let t=0;t<e.length;t++)this.data.areas[e[t].area]=[];for(let t=0;t<this.localStorageTemp.areas.length;t+=10){let e=await this.buscarIngresosEstadistica({areas:this.localStorageTemp.areas.slice(t,t+10),desde:this.localStorageTemp.desde,hasta:this.localStorageTemp.hasta,insumos:this.localStorageTemp.insumos,procedencias:this.localStorageTemp.procedencias});if(!e)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});e=e.reduce(((e,t)=>((e[t.areaDB]=e[t.areaDB]||[]).push(t),e)),{}),this.data.areas={...this.data.areas,...e}}await this.modificarPdf(),await(0,u.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},p=f;var y=a(81656),m=(0,y.A)(p,c,h,!1,null,null,null);const b=m.exports},95350:(e,t,a)=>{a.d(t,{P:()=>n,dd:()=>i,s:()=>s});a(44114);var r=a(31214),o=a.n(r);if(void 0==o().vfs){const e=a(17108);o().vfs=e.pdfMake.vfs}o().tableLayouts={TituloDatos:{hLineWidth:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e,t){return 0===e||e===t.table.widths.length?2:1},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(e,t){return 0===e?0:e<=t.table.headerRows?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e){return 0},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}}};const i={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},s=function({config:e={layout:"TituloDatos",style:"margenTabla",table:{widths:["*","20%"],headerRows:0,body:[]}},data:t=[]}={}){let a=e.table.body.at(-1);return t?.forEach((function(t){let r=[];a.forEach((function(e){let a={text:t[e.key]?.toLocaleString("es-AR")??e.fillEmpty??"---",style:e.key_style??"centrado"};e.key_fillColor&&e.key_fillColor.forEach((r=>{let o=r.value??t[r.property];switch(r.multiple&&(o*=r.multiple),r.cond){case"=":(t[e.key]===o||!t[e.key]&&e.fillEmpty===o)&&(a.fillColor=r.resultado);break;case">":(t[e.key]>o||!t[e.key]&&e.fillEmpty>o)&&(a.fillColor=r.resultado);break;case"<":(t[e.key]<o||!t[e.key]&&e.fillEmpty<o)&&(a.fillColor=r.resultado);break;case"!=":(t[e.key]!==o||!t[e.key]&&e.fillEmpty!==o)&&(a.fillColor=r.resultado);break;case"existe":o&&(a.fillColor=r.resultado);break}})),r.push(a)})),e.table.body.push(r)})),e},n=async function(e,t,a){"true"==a||navigator.userAgent.indexOf("Edge")>=0?(await o().createPdf(e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).download(t,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):o().createPdf(e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).open({},window)}}}]);