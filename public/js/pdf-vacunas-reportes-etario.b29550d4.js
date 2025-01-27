"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[677],{17058:function(t,e,a){a.r(e),a.d(e,{default:function(){return y}});var r=a(28383),s=a(15852),o=a(1899),i=a(48122),n=a(41614),l=a(21527),c=a(69155),d=function(){var t=this,e=t._self._c;return e(i.A,{attrs:{"grid-list-xs":""}},[e(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[e(n.A,{attrs:{xs12:"","pa-1":"","ma-1":"",cuarto:""}},[e(s.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(o.OQ,{staticClass:"px-0"},[t._v("====== GESTION DE VACUNAS ======")])],1)],1),t.loading.estado?e(n.A,{attrs:{xs12:"","pa-1":"","ma-1":"",terciary:""}},[e(s.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(o.OQ,{staticClass:"px-0"},[t._v("====== Creando Reporte Espere... ======")])],1)],1):e(n.A,{attrs:{xs12:"","pa-1":"","ma-1":"",terciary:""}},[e(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":"",terciary:"","darken-2":""}},[e(n.A,{attrs:{xs12:"","pa-1":"","ma-1":""}},[e("download-excel",{ref:"download-excel",attrs:{name:t.nombreExcel,worksheet:"Hoja1",type:"xls",header:t.headerExcel,footer:t.footerExcel,fields:t.columnasExcel,fetch:t.descargarExcel,stringifyLongNum:!0,escapeCsv:!1}},[e(r.A,{staticClass:"white--text terciary darken-1",attrs:{round:""}},[e(l.A,{attrs:{medium:"",left:""}},[t._v("far fa-file-excel")]),t._v(" Descargar Excel ")],1)],1)],1)],1)],1)],1)],1)},h=[],u=(a(44114),a(95353)),p=a(95350),f={name:"vacunaReporteEtarioImprimir",components:{},data:function(){return{descarga:"true",descargaExcel:"false",pdf:p.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","20%","20%","20%"],headerRows:0,body:[]}},columnasExcelBase:{Vacunatorio:"areaDB"},filtros:{},areasDB:[],insumosDB:[],data:{excelHeader:null,excelTotales:null,rawData:null}}},computed:{...(0,u.aH)(["loading","localStorageTemp","hoy"]),nombreExcel(){return`VacunaReporteEtario-${this.hoy}.xls`},columnasExcel(){let t={};t={...this.columnasExcelBase};for(let e=0;e<this.data.excelHeader?.length;e++)t[this.data.excelHeader[e]]=`${this.data.excelHeader[e]}`;return t},headerExcel(){return["Reporte Etario de Vacunaciones"," ","FILTROS",`Fecha Desde: ${this.filtros.desde}, Hasta: ${this.filtros.hasta}`,`Vacuna: ${this.insumosDB?.length?`${this.insumosDB.map((t=>t.nombre)).join(" - ")}`:"Todas"}.`,`Vacunatorios: ${this.areasDB?.length?this.areasDB.map((t=>t.area)).join(" - "):"Todos"}.`," "]},footerExcel(){return[]}},async created(){try{this.descarga=this.$route.query.descarga,this.descargaExcel=this.$route.query.descargaExcel,await this.cargarLocalStorageTemp(),this.filtros=this.localStorageTemp,await this.borrarLocalStorageTemp();let t=await this.buscarReporteEtario({areas:this.filtros.areas,desde:this.filtros.desde,hasta:this.filtros.hasta,insumos:this.filtros.insumos,procedencias:this.filtros.procedencias,opciones:this.filtros.opciones,preCarga:!0});this.areasDB=t.areasDB,this.insumosDB=t.insumosDB,this.data.excelHeader=t.vacunasHeader,this.data.excelTotales=t.totales,this.descarga,"true"===this.descargaExcel&&this.$nextTick((()=>this.$refs["download-excel"].$el.click()))}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (created vacunaReporteEtarioImprimir)"})}},methods:{...(0,u.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp","borrarLocalStorageTemp","ocultarDialogIframe"]),...(0,u.i0)(["requestAPI"]),...(0,u.i0)("vacunas",["getRequestFilter"]),async buscarReporteEtario(t){try{this.mostrarLoading({titulo:"Cargando Datos..."});let e=await this.getRequestFilter({payload:t,opcional:{areas:!0}});if(e.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/vacunas/reporte/etario?${e.dato}&mod=${JSON.stringify({pre:t.preCarga??!1,raw:t.raw??!1,obj:t.objAreas??!1})}`}),!!a?.data?.ok&&a.data}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (buscarReporteEtario)"}),!1}finally{this.ocultarLoading()}},async modificarPdf(){try{return this.mostrarLoading({titulo:"Preparando Datos..."}),this.pdf.info={title:`Vacuna Aplicaciones Etario ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_description:this.pdf.images.muni_description},this.pdf.pageOrientation="landscape",this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(t,e,a)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${t} de ${e}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_description"}]]},margin:[0,15,0,0]},{width:"*",text:[{text:"\nPrograma De Inmunizaciones\n",style:["negrita","centrado"],fontSize:16},{text:"Vacunaciona Etario",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.filtros.desde??"xxxx-xx-xx"}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.filtros.hasta??"xxxx-xx-xx"}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content=[],this.pdf.content.push({text:[{text:"\nΔ ",fontSize:15,color:"orange",bold:!0},{text:"Filtro:",fontSize:13,style:["subrayado"],bold:!0},`\n· Vacuna: ${this.insumosDB.length?`${this.insumosDB.map((t=>t.nombre)).join("; ")}`:"Todas"}.`,`\n· Vacunatorios: ${this.areasDB?.length?`${this.areasDB.map((t=>t.area)).join("; ")}`:"Todos"}.`,`\n· Procedencias: ${this.filtros.procedencias?.length?`${this.filtros.procedencias.join("; ")}`:"Todas"}.`],fontSize:12,style:[],margin:[10,0,10,5]}),Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([t,e])=>{let a=this._cloneDeep(this.tablaConfig);a.table.widths=["*"],a.layout="TituloSimple",a.table.headerRows+=1,a.table.body.push([{text:`${t}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}]),Object.entries(e).length>0?(Object.entries(e).forEach((([t,e])=>{let r=this._cloneDeep(this.tablaConfig);r.table.headerRows+=1,r.table.body.push([{text:`Fecha Aplicacion: ${e.fecha}, Paciente: ${e.pacienteDB} (${e.pacienteDocDB??"S/D"})`,style:["negrita","izquierda"],fontSize:14,fillColor:"#BBDEFB",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:`Fecha de Naciemiento: ${e.pacienteFec_nacDB??"S/D"}, Edad: ${e.edad_valor??"S/D"} ${e.edad_unidad}, Sexo: ${e.sexo??"S/D"}`,style:["negrita","izquierda"],fontSize:14,fillColor:"white",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:`Domicilio: ${e.pacienteDireccionDB??"S/D"}, Telefono: ${e.pacienteTelefonoDB??"S/D"}`,style:["negrita","izquierda"],fontSize:14,fillColor:"white",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:"APLICACIONES",style:["centrado","negrita"],fillColor:"white",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:"Vacuna - Dosis",style:["centrado"],fillColor:"#DFDFDF",key:"vacuna",key_style:["izquierda"],margin:[0,5]},{text:"Procedencia",style:["centrado"],fillColor:"#DFDFDF",key:"procedencia",margin:[0,5]},{text:"Lote",style:["centrado"],fillColor:"#DFDFDF",key:"lote",margin:[0,5]},{text:"Vencimiento",style:["centrado"],fillColor:"#DFDFDF",key:"vencimiento",margin:[0,5]}]),r=(0,p.s)({data:e.vacunacionesDB,config:r}),a.table.body.push([r])})),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Datos en esta Unidad.",style:["centrado","negrita"],margin:[0,5]}]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Datos para mostrar",style:["negrita","centrado","subrayado"],fontSize:16}),!0}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (modificarPdf)"}),!1}finally{this.ocultarLoading()}},async generarPDF({descarga:t}){try{return this.mostrarError({mensaje:"Este reporte esta en desarrollo. PDF",titulo:"DESARROLLO"})}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}},async descargarExcel(){try{return this.data.rawData=await this.buscarReporteEtario({areas:this.filtros.areas,desde:this.filtros.desde,hasta:this.filtros.hasta,insumos:this.filtros.insumos,procedencias:this.filtros.procedencias,opciones:this.filtros.opciones,raw:!0}),this.data.excelTotales=this.data.rawData?.totales,this.data.rawData=this.data.rawData?.reporte??[],0===this.data.rawData.length?(this.mostrarError({mensaje:"No hay elementos para exportar.",titulo:"Excel"}),[]):(this.data.rawData.push({areaDB:"Totales",...this.data.excelTotales}),this.mostrarLoading({titulo:"Preparando Excel..."}),this.data.rawData)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (descargarExcel)"}),[]}finally{this.ocultarLoading()}}}},m=f,x=a(81656),g=(0,x.A)(m,d,h,!1,null,null,null),y=g.exports}}]);