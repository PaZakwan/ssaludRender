"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[6023],{83202:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var r=a(66194),o=a(18956),i=a(32353),s=a(66530),n=a(60683),l=a(73667),c=a(59456),d=function(){var e=this,t=e._self._c;return t(s.Z,{attrs:{"grid-list-xs":""}},[t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[t(n.Z,{attrs:{xs12:"","pa-1":"","ma-1":"",cuarto:""}},[t(o.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(i.ZB,{staticClass:"px-0"},[e._v("====== GESTION DE VACUNAS ======")])],1)],1),e.loading.estado?t(n.Z,{attrs:{xs12:"","pa-1":"","ma-1":"",terciary:""}},[t(o.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.ZB,{staticClass:"px-0"},[e._v("====== Creando Reporte Espere... ======")])],1)],1):t(n.Z,{attrs:{xs12:"","pa-1":"","ma-1":"",terciary:""}},[t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":"",terciary:"","darken-2":""}},[t(n.Z,{attrs:{xs12:"","pa-1":"","ma-1":""}},[t(r.Z,{staticClass:"white--text terciary darken-1",attrs:{round:""},on:{click:function(t){return e.generarPDF({descarga:"false"})}}},[t(l.Z,{attrs:{medium:"",left:""}},[e._v("fa-solid fa-file-pdf")]),e._v(" Mostrar PDF")],1)],1),t(n.Z,{attrs:{xs12:"","pa-1":"","ma-1":""}},[t(r.Z,{staticClass:"white--text terciary darken-1",attrs:{round:""},on:{click:function(t){return e.generarPDF({descarga:"true"})}}},[t(l.Z,{attrs:{medium:"",left:""}},[e._v("download")]),e._v(" Descargar PDF")],1)],1),t(n.Z,{attrs:{xs12:"","pa-1":"","ma-1":""}},[t("download-excel",{ref:"download-excel",attrs:{name:e.nombreExcel,worksheet:"Hoja1",type:"xls",header:e.headerExcel,footer:e.footerExcel,fields:e.columnasExcel,fetch:e.descargarExcel,stringifyLongNum:!0,escapeCsv:!1}},[t(r.Z,{staticClass:"white--text terciary darken-1",attrs:{round:""}},[t(l.Z,{attrs:{medium:"",left:""}},[e._v("far fa-file-excel")]),e._v(" Descargar Excel ")],1)],1)],1)],1)],1)],1)],1)},h=[],u=(a(70560),a(20629)),f=a(85014);const g={name:"vacunaReporteEtarioImprimir",components:{},data:function(){return{descarga:"true",descargaExcel:"false",pdf:f.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","20%","20%","20%"],headerRows:0,body:[]}},columnasExcelBase:{Vacunatorio:"areaDB",Dosis:"dosis","No Especifica":"no especifica",Otras:"otras",Total:"total"},filtros:{},areasDB:[],insumosDB:[],data:{excelHeader:null,excelTotales:null,rawData:null}}},computed:{...(0,u.rn)(["loading","localStorageTemp","hoy"]),nombreExcel(){return`VacunaReporteEtario-${this.hoy}.xls`},columnasExcel(){let e={};e={...this.columnasExcelBase};for(let t=0;t<this.data.excelHeader?.length;t++)e[this.data.excelHeader[t]]=`${this.data.excelHeader[t]}`;return e},headerExcel(){return["Reporte Etario de Vacunaciones"," ","FILTROS",`Fecha Desde: ${this.filtros.desde}, Hasta: ${this.filtros.hasta}`,`Vacuna: ${this.insumosDB.length?`${this.insumosDB.map((e=>e.nombre)).join(" - ")}`:"Todas"}.`,`Vacunatorios: ${this.areasDB?.length?this.areasDB.map((e=>e.area)).join(" - "):"Todos"}.`,`Procedencias: ${this.filtros.procedencias?.length?`${this.filtros.procedencias.join(" - ")}`:"Todas"}.`," "]},footerExcel(){let e=[];for(let a in this.data.excelTotales)"vacunaciones"!==a&&e.push(`${a.replaceAll("_"," ")} # ${this.data.excelTotales[a]}`);e.sort(((e,t)=>e.localeCompare(t)));let t=[];for(let a in this.data.excelTotales?.vacunaciones)t.push(`${a.replaceAll("_"," ")} # ${this.data.excelTotales.vacunaciones[a]}`);return t.sort(((e,t)=>e.localeCompare(t))),e.unshift(" ","#####--- SubTotales ---#####"),t.unshift("#####--- Vacuna - Dosis ---#####"),e.concat(t)}},async created(){try{this.descarga=this.$route.query.descarga,this.descargaExcel=this.$route.query.descargaExcel,await this.cargarLocalStorageTemp(),this.filtros=this.localStorageTemp,await this.borrarLocalStorageTemp();let e=await this.buscarReporteEtario({areas:this.filtros.areas,desde:this.filtros.desde,hasta:this.filtros.hasta,insumos:this.filtros.insumos,procedencias:this.filtros.procedencias,opciones:this.filtros.opciones,preCarga:!0});this.areasDB=e.areasDB,this.insumosDB=e.insumosDB,this.data.excelHeader=e.vacunasHeader,this.data.excelTotales=e.totales,this.descarga,"true"===this.descargaExcel&&this.$nextTick((()=>this.$refs["download-excel"].$el.click()))}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (created vacunaReporteEtarioImprimir)"})}},methods:{...(0,u.OI)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp","borrarLocalStorageTemp","ocultarDialogIframe"]),...(0,u.nv)(["requestAPI"]),...(0,u.nv)("vacunas",["getRequestFilter"]),async buscarReporteEtario(e){try{this.mostrarLoading({titulo:"Cargando Datos..."});let t=await this.getRequestFilter({payload:e,opcional:{areas:!0}});if(t.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/vacunas/reporte/etario?${t.dato}&mod=${JSON.stringify({pre:e.preCarga??!1,raw:e.raw??!1,obj:e.objAreas??!1})}`}),!!a?.data?.ok&&a.data}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarReporteEtario)"}),!1}finally{this.ocultarLoading()}},async modificarPdf(){try{return this.mostrarLoading({titulo:"Preparando Datos..."}),this.pdf.info={title:`Vacuna Aplicaciones Etario ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageOrientation="landscape",this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"20%",layout:"noBorders",table:{body:[[{height:80,width:.2*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nPrograma De Inmunizaciones\n",style:["negrita","centrado"],fontSize:16},{text:"Vacunaciona Etario",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.filtros.desde??"xxxx-xx-xx"}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.filtros.hasta??"xxxx-xx-xx"}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content=[],this.pdf.content.push({text:[{text:"\nΔ ",fontSize:15,color:"orange",bold:!0},{text:"Filtro:",fontSize:13,style:["subrayado"],bold:!0},`\n· Vacuna: ${this.insumosDB.length?`${this.insumosDB.map((e=>e.nombre)).join("; ")}`:"Todas"}.`,`\n· Vacunatorios: ${this.areasDB?.length?`${this.areasDB.map((e=>e.area)).join("; ")}`:"Todos"}.`,`\n· Procedencias: ${this.filtros.procedencias?.length?`${this.filtros.procedencias.join("; ")}`:"Todas"}.`],fontSize:12,style:[],margin:[10,0,10,5]}),Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);a.table.widths=["*"],a.layout="TituloSimple",a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}]),Object.entries(t).length>0?(Object.entries(t).forEach((([e,t])=>{let r=this._cloneDeep(this.tablaConfig);r.table.headerRows+=1,r.table.body.push([{text:`Fecha Aplicacion: ${t.fecha}, Paciente: ${t.pacienteDB} (${t.pacienteDocDB??"S/D"})`,style:["negrita","izquierda"],fontSize:14,fillColor:"#BBDEFB",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:`Fecha de Naciemiento: ${t.pacienteFec_nacDB??"S/D"}, Edad: ${t.edad_valor??"S/D"} ${t.edad_unidad}, Sexo: ${t.sexo??"S/D"}`,style:["negrita","izquierda"],fontSize:14,fillColor:"white",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:`Domicilio: ${t.pacienteDireccionDB??"S/D"}, Telefono: ${t.pacienteTelefonoDB??"S/D"}`,style:["negrita","izquierda"],fontSize:14,fillColor:"white",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:"APLICACIONES",style:["centrado","negrita"],fillColor:"white",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:"Vacuna - Dosis",style:["centrado"],fillColor:"#DFDFDF",key:"vacuna",key_style:["izquierda"],margin:[0,5]},{text:"Procedencia",style:["centrado"],fillColor:"#DFDFDF",key:"procedencia",margin:[0,5]},{text:"Lote",style:["centrado"],fillColor:"#DFDFDF",key:"lote",margin:[0,5]},{text:"Vencimiento",style:["centrado"],fillColor:"#DFDFDF",key:"vencimiento",margin:[0,5]}]),r=(0,f.x)({data:t.vacunacionesDB,config:r}),a.table.body.push([r])})),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Datos en esta Unidad.",style:["centrado","negrita"],margin:[0,5]}]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Datos para mostrar",style:["negrita","centrado","subrayado"],fontSize:16}),!0}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (modificarPdf)"}),!1}finally{this.ocultarLoading()}},async generarPDF({descarga:e}){try{return this.mostrarError({mensaje:"Este reporte esta en desarrollo. PDF",titulo:"DESARROLLO"})}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}},async descargarExcel(){try{return this.mostrarError({mensaje:"Este reporte esta en desarrollo. XLS",titulo:"DESARROLLO"})}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (descargarExcel)"}),[]}finally{this.ocultarLoading()}}}},p=g;var m=a(1001),y=(0,m.Z)(p,d,h,!1,null,null,null);const x=y.exports},85014:(e,t,a)=>{a.d(t,{dd:()=>i,o:()=>n,x:()=>s});a(70560);var r=a(61566),o=a.n(r);if(void 0==o().vfs){const e=a(47920);o().vfs=e.pdfMake.vfs}o().tableLayouts={TituloDatos:{hLineWidth:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e,t){return 0===e||e===t.table.widths.length?2:1},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(e,t){return 0===e?0:e<=t.table.headerRows?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e){return 0},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}}};const i={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},s=function({config:e={layout:"TituloDatos",style:"margenTabla",table:{widths:["*","20%"],headerRows:0,body:[]}},data:t=[]}={}){let a=e.table.body.at(-1);return t?.forEach((function(t){let r=[];a.forEach((function(e){let a={text:t[e.key]?.toLocaleString("es-AR")??e.fillEmpty??"---",style:e.key_style??"centrado"};e.key_fillColor&&e.key_fillColor.forEach((r=>{let o=r.value??t[r.property];switch(r.multiple&&(o*=r.multiple),r.cond){case"=":(t[e.key]===o||!t[e.key]&&e.fillEmpty===o)&&(a.fillColor=r.resultado);break;case">":(t[e.key]>o||!t[e.key]&&e.fillEmpty>o)&&(a.fillColor=r.resultado);break;case"<":(t[e.key]<o||!t[e.key]&&e.fillEmpty<o)&&(a.fillColor=r.resultado);break;case"!=":(t[e.key]!==o||!t[e.key]&&e.fillEmpty!==o)&&(a.fillColor=r.resultado);break;case"existe":o&&(a.fillColor=r.resultado);break}})),r.push(a)})),e.table.body.push(r)})),e},n=async function(e,t,a){"true"==a||navigator.userAgent.indexOf("Edge")>=0?(await o().createPdf(e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).download(t,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):o().createPdf(e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]}).open({},window)}}}]);