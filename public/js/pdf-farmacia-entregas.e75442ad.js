"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[6607],{956:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var r=a(6194),i=a(8956),o=a(2353),s=a(6530),n=a(683),l=a(9456),d=a(8143),c=function(){var e=this,t=e._self._c;return t(s.Z,{attrs:{"grid-list-xs":""}},[t(l.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(n.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(o.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?t(n.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(o.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):t(n.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(o.h7,[t(d.Cl),t(r.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.generarPDF}},[e._v(" "+e._s("true"==e.descarga?"Descargar PDF":"Mostrar PDF"))]),t(d.Cl)],1)],1)],1)],1)],1)},h=[],u=(a(560),a(629)),f=a(9592);const g={name:"insumoEntregaImprimir",components:{},data:()=>({descarga:!0,pdfGen:f.o,pdf:f.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["12%","*","*","15%","15%","15%"],headerRows:0,body:[]}},data:{}}),computed:{...(0,u.rn)(["loading","pdfTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarPdfTemp(),this.data.desde=this.pdfTemp.desde??"xxxx-xx-xx",this.data.hasta=this.pdfTemp.hasta??"xxxx-xx-xx",this.data.areas={},await this.generarPDF()}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (created insumoEntregaImprimir)"})}},methods:{...(0,u.OI)(["mostrarLoading","ocultarLoading","mostrarError","cargarPdfTemp","borrarPdfTemp"]),...(0,u.nv)(["requestAPI"]),...(0,u.nv)("main",["buscarAreaFiltros"]),...(0,u.nv)("farmacia",["getRequestFilter"]),async modificarPdf(){this.pdf.info={title:`Farmacia Entregas ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{height:80,width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Entregas",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.data.desde}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.data.hasta}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);a.table.widths=["*"],a.layout="TituloSimple",a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}]),Object.entries(t).length>0?(Object.entries(t).forEach((([e,t])=>{let r=this._cloneDeep(this.tablaConfig);r.table.headerRows+=1,r.table.body.push([{text:`${t.categoriaDB}`,style:["negrita","izquierda"],fontSize:14,fillColor:"#BBDEFB",colSpan:2},"",{text:`${t.insumoDB}`,style:["negrita","centrado"],fontSize:14,fillColor:"#BBDEFB",colSpan:2},"",{text:`TOTAL : ${t.total_entregas.toLocaleString("es-AR")}`,style:["negrita","derecha"],fontSize:14,fillColor:"white",colSpan:2},""]),r.table.headerRows+=1,r.table.body.push([{text:"DETALLE",style:["centrado","negrita"],fillColor:"white",colSpan:6},"","","","",""]),r.table.headerRows+=1,r.table.body.push([{text:"Fecha",style:["centrado"],fillColor:"#DFDFDF",key:"fecha",margin:[0,5]},{text:"Paciente",style:["centrado"],fillColor:"#DFDFDF",key:"pacienteDB",margin:[0,5]},{text:"Documento",style:["centrado"],fillColor:"#DFDFDF",key:"pacienteDocDB",key_style:["centrado"],margin:[0,5]},{text:"Obra Social",style:["centrado"],fillColor:"#DFDFDF",key:"oSocial",margin:[0,5]},{text:"Procedencia",style:["centrado"],fillColor:"#DFDFDF",key:"procedencia",margin:[0,5]},{text:"Cantidad",style:["centrado"],fillColor:"#DFDFDF",key:"cantidad",key_style:["derecha"],margin:[0,5]}]),r=(0,f.x)({data:t.detalle_entregas,config:r}),a.table.body.push([r])})),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Entregas registradas en esta Unidad entre las fechas seleccionadas.",style:["centrado","negrita"],margin:[0,5]}]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Entregas registradas entre las fechas seleccionadas.",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarEntregasEstadistica(e){try{this.mostrarLoading({titulo:"Buscando Entregas..."});let t=await this.getRequestFilter({payload:e});if(t.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/farmacia/estadistica/salidas?${t.dato}&mod=${JSON.stringify({entr:1})}`}),!!a?.data?.ok&&a?.data?.egresos}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarEntregasEstadistica)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let e=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.pdfTemp.areas}},populate:"no",select:"area"})];for(let t=0;t<e.length;t++)this.data.areas[e[t].area]=[];for(let t=0;t<this.pdfTemp.areas.length;t+=10){let e=await this.buscarEntregasEstadistica({areas:this.pdfTemp.areas.slice(t,t+10),desde:this.pdfTemp.desde,hasta:this.pdfTemp.hasta,insumos:this.pdfTemp.insumos,procedencias:this.pdfTemp.procedencias});if(!e)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});e=e.reduce(((e,t)=>((e[t.areaDB]=e[t.areaDB]||[]).push(t),e)),{}),this.data.areas={...this.data.areas,...e}}this.borrarPdfTemp(),await this.modificarPdf(),await(0,f.o)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},p=g;var y=a(1001),m=(0,y.Z)(p,c,h,!1,null,null,null);const b=m.exports},9592:(e,t,a)=>{a.d(t,{dd:()=>n,o:()=>d,x:()=>l});a(560);var r=a(361),i=a.n(r),o=a(1566),s=a.n(o);if(void 0==s().vfs){const e=a(7920);s().vfs=e.pdfMake.vfs}s().tableLayouts={TituloDatos:{hLineWidth:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e,t){return 0===e||e===t.table.widths.length?2:1},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(e,t){return 0===e?0:e<=t.table.headerRows?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e){return 0},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}}};const n={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},l=function({config:e,data:t}){let a=i()(e),r=i()(a.table.body[a.table.body.length-1]);return t?.forEach((function(e){let t=[];r.forEach((function(a){let r={text:e[a.key]?.toLocaleString("es-AR")??a.fillEmpty??"---",style:a.key_style??"centrado"};a.key_fillColor&&a.key_fillColor.forEach((t=>{let i=t.value??e[t.property];switch(t.multiple&&(i*=t.multiple),t.cond){case"=":(e[a.key]===i||!e[a.key]&&a.fillEmpty===i)&&(r.fillColor=t.resultado);break;case">":(e[a.key]>i||!e[a.key]&&a.fillEmpty>i)&&(r.fillColor=t.resultado);break;case"<":(e[a.key]<i||!e[a.key]&&a.fillEmpty<i)&&(r.fillColor=t.resultado);break;case"!=":(e[a.key]!==i||!e[a.key]&&a.fillEmpty!==i)&&(r.fillColor=t.resultado);break;case"existe":i&&(r.fillColor=t.resultado);break}})),t.push(r)})),a.table.body.push(t)})),a},d=async function(e,t,a){let r=e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};navigator.userAgent.indexOf("Edge")>=0||"true"==a?(await s().createPdf(r).download(t,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):s().createPdf(r).open({},window)}}}]);