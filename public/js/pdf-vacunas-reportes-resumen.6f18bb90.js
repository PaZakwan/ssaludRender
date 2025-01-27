"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[2580],{94447:function(e,t,a){a.r(t),a.d(t,{default:function(){return y}});var r=a(28383),s=a(15852),o=a(1899),i=a(48122),n=a(41614),l=a(21527),c=a(69155),d=function(){var e=this,t=e._self._c;return t(i.A,{attrs:{"grid-list-xs":""}},[t(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[t(n.A,{attrs:{xs12:"","pa-1":"","ma-1":"",cuarto:""}},[t(s.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(o.OQ,{staticClass:"px-0"},[e._v("====== GESTION DE VACUNAS ======")])],1)],1),e.loading.estado?t(n.A,{attrs:{xs12:"","pa-1":"","ma-1":"",terciary:""}},[t(s.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(o.OQ,{staticClass:"px-0"},[e._v("====== Creando Reporte Espere... ======")])],1)],1):t(n.A,{attrs:{xs12:"","pa-1":"","ma-1":"",terciary:""}},[t(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":"",terciary:"","darken-2":""}},[t(n.A,{attrs:{xs12:"","pa-1":"","ma-1":""}},[t("download-excel",{ref:"download-excel",attrs:{name:e.nombreExcel,worksheet:"Hoja1",type:"xls",header:e.headerExcel,footer:e.footerExcel,fields:e.columnasExcel,fetch:e.descargarExcel,stringifyLongNum:!0,escapeCsv:!1}},[t(r.A,{staticClass:"white--text terciary darken-1",attrs:{round:""}},[t(l.A,{attrs:{medium:"",left:""}},[e._v("far fa-file-excel")]),e._v(" Descargar Excel ")],1)],1)],1)],1)],1)],1)],1)},h=[],u=(a(44114),a(95353)),p=a(95350),m={name:"vacunaReporteResumenImprimir",components:{},data:function(){return{descarga:"true",descargaExcel:"false",pdf:p.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","20%","20%","20%"],headerRows:0,body:[]}},columnasExcelBase:{Vacunatorio:"areaDB"},filtros:{},areasDB:[],insumosDB:[],data:{excelHeader:null,excelTotales:null,rawData:null}}},computed:{...(0,u.aH)(["loading","localStorageTemp","hoy"]),nombreExcel(){return`VacunaReporteResumen-${this.hoy}.xls`},columnasExcel(){let e={...this.columnasExcelBase};for(let t=0;t<this.data.excelHeader?.length;t++)e[this.data.excelHeader[t]]=`${this.data.excelHeader[t]}`;return e},headerExcel(){return["Reporte Resumen de Vacunas Aplicadas"," ","FILTROS",`Fecha Desde: ${this.filtros.desde}, Hasta: ${this.filtros.hasta}`,`Vacuna: ${this.insumosDB?.length?`${this.insumosDB.map((e=>e.nombre)).join(" - ")}`:"Todas"}.`,`Vacunatorios: ${this.areasDB?.length?this.areasDB.map((e=>e.area)).join(" - "):"Todos"}.`," "]},footerExcel(){return[]}},async created(){try{this.descarga=this.$route.query.descarga,this.descargaExcel=this.$route.query.descargaExcel,await this.cargarLocalStorageTemp(),this.filtros=this.localStorageTemp,await this.borrarLocalStorageTemp();let e=await this.buscarReporteResumen({areas:this.filtros.areas,desde:this.filtros.desde,hasta:this.filtros.hasta,insumos:this.filtros.insumos,procedencias:this.filtros.procedencias,opciones:this.filtros.opciones,preCarga:!0});this.areasDB=e.areasDB,this.insumosDB=e.insumosDB,this.data.excelHeader=e.vacunasHeader,this.data.excelTotales=e.totales,this.descarga,"true"===this.descargaExcel&&this.$nextTick((()=>this.$refs["download-excel"].$el.click()))}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (created vacunaReporteResumenImprimir)"})}},methods:{...(0,u.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp","borrarLocalStorageTemp","ocultarDialogIframe"]),...(0,u.i0)(["requestAPI"]),...(0,u.i0)("vacunas",["getRequestFilter"]),async buscarReporteResumen(e){try{this.mostrarLoading({titulo:"Cargando Datos..."});let t=await this.getRequestFilter({payload:e,opcional:{areas:!0}});if(t.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/vacunas/reporte/resumen?${t.dato}&mod=${JSON.stringify({pre:e.preCarga??!1,raw:e.raw??!1,obj:e.objAreas??!1})}`}),!!a?.data?.ok&&a.data}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarReporteResumen)"}),!1}finally{this.ocultarLoading()}},async modificarPdf(){try{return this.mostrarLoading({titulo:"Preparando Datos..."}),this.pdf.info={title:`Vacuna Aplicaciones Resumen ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_description:this.pdf.images.muni_description},this.pdf.pageOrientation="landscape",this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_description"}]]},margin:[0,15,0,0]},{width:"*",text:[{text:"\nPrograma De Inmunizaciones\n",style:["negrita","centrado"],fontSize:16},{text:"Vacunaciona Etario",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.filtros.desde??"xxxx-xx-xx"}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.filtros.hasta??"xxxx-xx-xx"}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content=[],this.pdf.content.push({text:[{text:"\nΔ ",fontSize:15,color:"orange",bold:!0},{text:"Filtro:",fontSize:13,style:["subrayado"],bold:!0},`\n· Vacuna: ${this.insumosDB.length?`${this.insumosDB.map((e=>e.nombre)).join("; ")}`:"Todas"}.`,`\n· Vacunatorios: ${this.areasDB?.length?`${this.areasDB.map((e=>e.area)).join("; ")}`:"Todos"}.`,`\n· Procedencias: ${this.filtros.procedencias?.length?`${this.filtros.procedencias.join("; ")}`:"Todas"}.`],fontSize:12,style:[],margin:[10,0,10,5]}),Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);a.table.widths=["*"],a.layout="TituloSimple",a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}]),Object.entries(t).length>0?(Object.entries(t).forEach((([e,t])=>{let r=this._cloneDeep(this.tablaConfig);r.table.headerRows+=1,r.table.body.push([{text:`Fecha Aplicacion: ${t.fecha}, Paciente: ${t.pacienteDB} (${t.pacienteDocDB??"S/D"})`,style:["negrita","izquierda"],fontSize:14,fillColor:"#BBDEFB",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:`Fecha de Naciemiento: ${t.pacienteFec_nacDB??"S/D"}, Edad: ${t.edad_valor??"S/D"} ${t.edad_unidad}, Sexo: ${t.sexo??"S/D"}`,style:["negrita","izquierda"],fontSize:14,fillColor:"white",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:`Domicilio: ${t.pacienteDireccionDB??"S/D"}, Telefono: ${t.pacienteTelefonoDB??"S/D"}`,style:["negrita","izquierda"],fontSize:14,fillColor:"white",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:"APLICACIONES",style:["centrado","negrita"],fillColor:"white",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:"Vacuna - Dosis",style:["centrado"],fillColor:"#DFDFDF",key:"vacuna",key_style:["izquierda"],margin:[0,5]},{text:"Procedencia",style:["centrado"],fillColor:"#DFDFDF",key:"procedencia",margin:[0,5]},{text:"Lote",style:["centrado"],fillColor:"#DFDFDF",key:"lote",margin:[0,5]},{text:"Vencimiento",style:["centrado"],fillColor:"#DFDFDF",key:"vencimiento",margin:[0,5]}]),r=(0,p.s)({data:t.vacunacionesDB,config:r}),a.table.body.push([r])})),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Datos en esta Unidad.",style:["centrado","negrita"],margin:[0,5]}]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Datos para mostrar",style:["negrita","centrado","subrayado"],fontSize:16}),!0}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (modificarPdf)"}),!1}finally{this.ocultarLoading()}},async generarPDF({descarga:e}){try{return this.mostrarError({mensaje:"Este reporte esta en desarrollo. PDF",titulo:"DESARROLLO"})}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}},async descargarExcel(){try{return this.data.rawData=await this.buscarReporteResumen({areas:this.filtros.areas,desde:this.filtros.desde,hasta:this.filtros.hasta,insumos:this.filtros.insumos,procedencias:this.filtros.procedencias,opciones:this.filtros.opciones,raw:!0}),this.data.excelTotales=this.data.rawData?.totales,this.data.rawData=this.data.rawData?.reporte??[],0===this.data.rawData.length?(this.mostrarError({mensaje:"No hay elementos para exportar.",titulo:"Excel"}),[]):(this.data.rawData.push({areaDB:"Totales",...this.data.excelTotales}),this.mostrarLoading({titulo:"Preparando Excel..."}),this.data.rawData)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (descargarExcel)"}),[]}finally{this.ocultarLoading()}}}},f=m,x=a(81656),g=(0,x.A)(f,d,h,!1,null,null,null),y=g.exports}}]);