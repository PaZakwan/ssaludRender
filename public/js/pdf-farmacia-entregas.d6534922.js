"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[176],{6432:function(e,a,t){t.r(a),t.d(a,{default:function(){return y}});var r=t(28383),s=t(15852),o=t(1899),i=t(48122),l=t(41614),n=t(21527),c=t(69155),d=function(){var e=this,a=e._self._c;return a(i.A,{attrs:{"grid-list-xs":""}},[a(c.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[a(l.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[a(s.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[a(o.OQ,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?a(l.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[a(s.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[a(o.OQ,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):a(l.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[a(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":"",terciary:"","darken-2":""}},[a(l.A,{attrs:{xs12:"","pa-1":"","ma-1":""}},[a(r.A,{staticClass:"white--text terciary darken-1",attrs:{round:""},on:{click:function(a){return e.generarPDF({descarga:"false"})}}},[a(n.A,{attrs:{medium:"",left:""}},[e._v("fa-solid fa-file-pdf")]),e._v(" Mostrar PDF")],1)],1),a(l.A,{attrs:{xs12:"","pa-1":"","ma-1":""}},[a(r.A,{staticClass:"white--text terciary darken-1",attrs:{round:""},on:{click:function(a){return e.generarPDF({descarga:"true"})}}},[a(n.A,{attrs:{medium:"",left:""}},[e._v("download")]),e._v(" Descargar PDF")],1)],1),a(l.A,{attrs:{xs12:"","pa-1":"","ma-1":""}},[a("download-excel",{ref:"download-excel",attrs:{fetch:e.descargarExcel,fields:e.columnasExcel,name:e.nombreExcel,worksheet:"Hoja1",header:e.headerExcel,type:"xls",stringifyLongNum:!0,escapeCsv:!1}},[a(r.A,{staticClass:"white--text terciary darken-1",attrs:{round:""}},[a(n.A,{attrs:{medium:"",left:""}},[e._v("far fa-file-excel")]),e._v(" Descargar Excel ")],1)],1)],1)],1)],1)],1)],1)},h=[],m=(t(44114),t(95353)),g=t(95350),p={name:"insumoEntregaImprimir",components:{},data:()=>({descarga:!0,descargaExcel:"false",pdf:g.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["9%","*","15%","15%","10%","10%","10%"],headerRows:0,body:[]}},columnasExcelBase:{Farmacia:"areaDB",Catergoria:"categoriaDB",Insumo:"insumoDB"},areasDB:[],insumosDB:[],columnasExcel:{},data:{}}),computed:{...(0,m.aH)(["loading","localStorageTemp","hoy"]),nombreExcel(){return`FarmaciaEntregas${this.localStorageTemp.detalle?"Nominal":""}-${this.hoy}.xls`},headerExcel(){return["Reporte de Farmacia Entregas"+(this.localStorageTemp.detalle?" Nominales":"")," ","FILTROS",`Fecha: Desde ${this.localStorageTemp.desde??"xxxx-xx-xx"} Hasta ${this.localStorageTemp.hasta??"xxxx-xx-xx"}`,`Farmacias: ${this.areasDB.length?this.areasDB.map((e=>e.area)).join(" - "):"Todas"}.`,`Insumos: ${this.insumosDB.length?`${this.insumosDB.map((e=>e.nombre)).join(" - ")}`:"Todos"}.`,`Procedencias: ${this.localStorageTemp.procedencias?.length?`${this.localStorageTemp.procedencias.join(" - ")}`:"Todas"}.`," "]}},async created(){try{this.descarga=this.$route.query.descarga,this.descargaExcel=this.$route.query.descargaExcel,await this.cargarLocalStorageTemp(),this.localStorageTemp.detalle?this.columnasExcel={...this.columnasExcelBase,Fecha:"fecha",Paciente:"pacienteDB",Documento:"pacienteDocDB",Sexo:"pacienteSexoDB",Telefono:"pacienteTelefonoDB","Obra Social":"oSocial",Procedencia:"procedencia",Lote:"lote",Vencimiento:"vencimiento","Cantidad Entregado":"cantidad",Prematuro:"prematuroDB","Peso Nacer Menor 2500 gr":"peso_nacer_menor_2500DB","Peso Nacer Mayor 3800 gr":"peso_nacer_mayor_3800DB",Inmunodeprimida:"inmunodeprimidaDB",Fuma:"fumaDB","Grupo Riesgo":"riesgoDB","Embarazada Semana":"embarazada_semanaDB",Puerpera:"puerperaDB","Personal Salud":"personal_saludDB","Personal Esencial":"personal_esencialDB","Diabetes T1":"diabetes1DB","Diabetes T2":"diabetes2DB",Dislipidemia:"dislipidemiaDB",Celiaca:"celiacaDB",Hipertension:"hipertensionDB","Insuficiencia Renal":"insuficiencia_renalDB"}:this.columnasExcel={...this.columnasExcelBase,"Total Entregado":"total"},this.areasDB=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.localStorageTemp.areas}},populate:"no",select:"area"})],this.localStorageTemp.insumos?.length&&(this.insumosDB=await this.buscarInsumosFiltro({filtro:{_id:{$in:this.localStorageTemp.insumos}},populate:"no",select:"nombre"})),this.descarga,"true"===this.descargaExcel&&this.$nextTick((()=>this.$refs["download-excel"].$el.click()))}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (created insumoEntregaImprimir)"})}},methods:{...(0,m.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,m.i0)(["requestAPI"]),...(0,m.i0)("main",["buscarAreaFiltros"]),...(0,m.i0)("farmacia",["getRequestFilter","buscarInsumosFiltro"]),async modificarPdf(){this.pdf.info={title:`Farmacia Entregas${this.localStorageTemp.detalle?" Nominales":""} ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.pageOrientation=this.localStorageTemp.detalle?"landscape":"portrait",this.pdf.images={muni_description:this.pdf.images.muni_description},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,a,t)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${e} de ${a}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(t.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_description"}]]},margin:[0,15,0,0]},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Entregas"+(this.localStorageTemp.detalle?" Nominales":""),style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.localStorageTemp.desde??"xxxx-xx-xx"}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.localStorageTemp.hasta??"xxxx-xx-xx"}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content.push({text:[{text:"\nΔ ",fontSize:15,color:"orange",bold:!0},{text:"Filtro:",fontSize:13,style:["subrayado"],bold:!0},`\n· Farmacias: ${this.areasDB.length?this.areasDB.map((e=>e.area)).join("; "):"Todas"}.`,`\n· Insumos: ${this.insumosDB.length?`${this.insumosDB.map((e=>e.nombre)).join("; ")}`:"Todos"}.`,`\n· Procedencias: ${this.localStorageTemp.procedencias?.length?`${this.localStorageTemp.procedencias.join("; ")}`:"Todas"}.`],fontSize:12,style:[],margin:[10,0,10,5]}),Object.entries(this.data).length>0?Object.entries(this.data).forEach((([e,a])=>{let t=this._cloneDeep(this.tablaConfig);this.localStorageTemp.detalle?(t.table.widths=["*"],t.layout="TituloSimple",t.table.headerRows+=1,t.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}])):(t.table.widths=["25%","*","15%"],t.table.headerRows+=1,t.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:3},"",""])),Object.entries(a).length>0?this.localStorageTemp.detalle?Object.entries(a).forEach((([e,a])=>{let r=this._cloneDeep(this.tablaConfig);r.table.headerRows+=1,r.table.body.push([{text:`${a.categoriaDB}`,style:["negrita","izquierda"],fontSize:14,fillColor:"#BBDEFB",colSpan:2},"",{text:`${a.insumoDB}`,style:["negrita","centrado"],fontSize:14,fillColor:"#BBDEFB",colSpan:3},"","",{text:`TOTAL : ${a.total_entregas.toLocaleString("es-AR")}`,style:["negrita","derecha"],fontSize:14,fillColor:"white",colSpan:2},""]),r.table.headerRows+=1,r.table.body.push([{text:"DETALLE",style:["centrado","negrita"],fillColor:"#DFDFDF",colSpan:7},"","","","","",""]),r.table.headerRows+=1,r.table.body.push([{text:"Fecha",style:["centrado"],fillColor:"#DFDFDF",key:"fecha",margin:[0,5]},{text:"Paciente",style:["centrado"],fillColor:"#DFDFDF",key:"pacienteDB",margin:[0,5]},{text:"Documento",style:["centrado"],fillColor:"#DFDFDF",key:"pacienteDocDB",key_style:["centrado"],margin:[0,5]},{text:"Telefono",style:["centrado"],fillColor:"#DFDFDF",key:"pacienteTelefonoDB",key_style:["centrado"],margin:[0,5]},{text:"Obra Social",style:["centrado"],fillColor:"#DFDFDF",key:"oSocial",margin:[0,5]},{text:"Procedencia",style:["centrado"],fillColor:"#DFDFDF",key:"procedencia",margin:[0,5]},{text:"Cantidad",style:["centrado"],fillColor:"#DFDFDF",key:"cantidad",key_style:["derecha"],margin:[0,5]}]),r=(0,g.s)({data:a.detalle_entregas,config:r}),t.table.body.push([r])})):(t.table.headerRows+=1,t.table.body.push([{text:"Categoria",style:["centrado"],fillColor:"#EEEEEE",key:"categoriaDB",key_style:["izquierda"]},{text:"Insumo",style:["centrado"],fillColor:"#EEEEEE",key:"insumoDB",key_style:["izquierda"]},{text:"Total",style:["centrado"],fillColor:"#BBDEFB",key:"total",key_style:["derecha"]}]),t=(0,g.s)({data:a,config:t})):this.localStorageTemp.detalle?t.table.body.push([{text:"No Hay Entregas registradas en esta Unidad entre las fechas seleccionadas.",style:["centrado","negrita"],margin:[0,5]}]):t.table.body.push([{text:"No Hay Entregas registradas en esta Unidad entre las fechas seleccionadas.",style:["centrado","negrita"],margin:[0,5],colSpan:3},"",""]),this.pdf.content.push(t)})):this.pdf.content.push({text:"No Hay Entregas registradas entre las fechas seleccionadas.",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarEntregasEstadistica(e){try{this.mostrarLoading({titulo:"Buscando Entregas..."});let a=await this.getRequestFilter({payload:e});if(a.error)return!1;let t=await this.requestAPI({method:"get",url:`/farmacia/estadistica/salidas?${a.dato}&mod=${JSON.stringify({entr:{nd:e.noDetalle?1:0,ex:e.excel?1:0}})}`});return!!t?.data?.ok&&t?.data?.egresos}catch(a){return this.mostrarError({mensaje:a,titulo:"Inesperado (buscarEntregasEstadistica)"}),!1}finally{this.ocultarLoading()}},async generarPDF({descarga:e}){try{this.mostrarLoading({titulo:"Preparando PDF..."}),this.data={};for(let e=0;e<this.areasDB.length;e++)this.data[this.areasDB[e].area]=[];for(let a=0;a<this.localStorageTemp.areas.length;a+=10){let t=await this.buscarEntregasEstadistica({areas:this.localStorageTemp.areas.slice(a,a+10),desde:this.localStorageTemp.desde,hasta:this.localStorageTemp.hasta,insumos:this.localStorageTemp.insumos,procedencias:this.localStorageTemp.procedencias,noDetalle:!this.localStorageTemp.detalle});if(!t)return this.mostrarError({errores:[`Problema al generar el PDF.\nRe-intente con el boton ${"true"!==e?"MOSTRAR":"DESCARGAR"} PDF.`,"Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});t=t.reduce(((e,a)=>((e[a.areaDB]=e[a.areaDB]||[]).push(a),e)),{}),this.data={...this.data,...t}}await this.modificarPdf(),await(0,g.P)(this.pdf,`${this.pdf.info.title}.pdf`,e)}catch(a){return this.mostrarError({mensaje:a,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}},async descargarExcel(){try{let e=[];for(let a=0;a<this.localStorageTemp.areas.length;a+=10){let t=await this.buscarEntregasEstadistica({areas:this.localStorageTemp.areas.slice(a,a+10),desde:this.localStorageTemp.desde,hasta:this.localStorageTemp.hasta,insumos:this.localStorageTemp.insumos,procedencias:this.localStorageTemp.procedencias,noDetalle:!this.localStorageTemp.detalle,excel:!0});if(!t)return this.mostrarError({errores:["Problema al generar el Excel.\nRe-intente con el boton DESCARGAR EXCEL.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"Excel"});e=[...e,...t]}return 0===e?.length?(this.mostrarError({mensaje:"No hay elementos para exportar.",titulo:"Excel"}),[]):(this.mostrarLoading({titulo:"Preparando Excel..."}),e??[])}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (descargarExcel)"}),[]}finally{this.ocultarLoading()}}}},u=p,x=t(81656),f=(0,x.A)(u,d,h,!1,null,null,null),y=f.exports}}]);