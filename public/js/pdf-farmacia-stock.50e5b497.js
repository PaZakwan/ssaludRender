"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[671],{2076:function(e,t,a){a.r(t),a.d(t,{default:function(){return x}});var r=a(28383),o=a(15852),l=a(1899),s=a(48122),i=a(41614),n=a(21527),c=a(69155),d=function(){var e=this,t=e._self._c;return t(s.A,{attrs:{"grid-list-xs":""}},[t(c.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(i.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(o.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(l.OQ,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?t(i.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(l.OQ,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):t(i.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":"",terciary:"","darken-2":""}},[t(i.A,{attrs:{xs12:"","pa-1":"","ma-1":""}},[t(r.A,{staticClass:"white--text terciary darken-1",attrs:{round:""},on:{click:function(t){return e.generarPDF({descarga:"false"})}}},[t(n.A,{attrs:{medium:"",left:""}},[e._v("fa-solid fa-file-pdf")]),e._v(" Mostrar PDF")],1)],1),t(i.A,{attrs:{xs12:"","pa-1":"","ma-1":""}},[t(r.A,{staticClass:"white--text terciary darken-1",attrs:{round:""},on:{click:function(t){return e.generarPDF({descarga:"true"})}}},[t(n.A,{attrs:{medium:"",left:""}},[e._v("download")]),e._v(" Descargar PDF")],1)],1),t(i.A,{attrs:{xs12:"","pa-1":"","ma-1":""}},[t("download-excel",{ref:"download-excel",attrs:{fetch:e.descargarExcel,fields:e.columnasExcel,name:e.nombreExcel,worksheet:"Hoja1",header:e.headerExcel,type:"xls",stringifyLongNum:!0,escapeCsv:!1}},[t(r.A,{staticClass:"white--text terciary darken-1",attrs:{round:""}},[t(n.A,{attrs:{medium:"",left:""}},[e._v("far fa-file-excel")]),e._v(" Descargar Excel ")],1)],1)],1)],1)],1)],1)],1)},h=[],p=(a(44114),a(95353)),m=a(95350),u={name:"farmaciaStockImprimir",components:{},data:function(){return{descarga:!0,descargaExcel:"false",pdf:m.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","*","*","*"],headerRows:0,body:[]}},columnasExcelBase:{Farmacia:"areaDB",Catergoria:"categoriaDB",Insumo:"insumoDB"},areasDB:[],insumosDB:[],columnasExcel:{},data:{}}},computed:{...(0,p.aH)(["loading","localStorageTemp","hoy"]),nombreExcel(){return`FarmaciaStock${this.localStorageTemp.detalle?"Detallado":""}-${this.hoy}.xls`},headerExcel(){return["Reporte de Farmacia Stock"+(this.localStorageTemp.detalle?" Detallado":"")," ","FILTROS",`Fecha: ${this.hoy}`,`Farmacias: ${this.areasDB.length?this.areasDB.map((e=>e.area)).join(" - "):"Todas"}.`,`Insumos: ${this.insumosDB.length?`${this.insumosDB.map((e=>e.nombre)).join(" - ")}`:"Todos"}.`,`Procedencias: ${this.localStorageTemp.procedencias?.length?`${this.localStorageTemp.procedencias.join(" - ")}`:"Todas"}.`," "]}},async created(){try{this.descarga=this.$route.query.descarga,this.descargaExcel=this.$route.query.descargaExcel,await this.cargarLocalStorageTemp(),this.localStorageTemp.detalle?this.columnasExcel={...this.columnasExcelBase,Procedencia:"procedencia",Lote:"lote",Vencimiento:"vencimiento",Cantidad:"cantidad","Por Vencer":"porExpirar",Vencido:"expirado",Recomendado:"cant_min"}:this.columnasExcel={...this.columnasExcelBase,"SubTotal Buenos":"total_buenos","SubTotal Vencidos":"total_expirado","SubTotal por Vencer":"total_porExpirar",Total:"total",Recomendado:"cant_min"},this.areasDB=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.localStorageTemp.areas}},populate:"no",select:"area"})],this.localStorageTemp.insumos?.length&&(this.insumosDB=await this.buscarInsumosFiltro({filtro:{_id:{$in:this.localStorageTemp.insumos}},populate:"no",select:"nombre"})),this.descarga,"true"===this.descargaExcel&&this.$nextTick((()=>this.$refs["download-excel"].$el.click()))}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (created farmaciaStockImprimir)"})}},methods:{...(0,p.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,p.i0)("main",["buscarAreaFiltros"]),...(0,p.i0)("farmacia",["buscarStockAreas","buscarInsumosFiltro"]),async modificarPdf(){this.pdf.info={title:`Farmacia Stock${this.localStorageTemp.detalle?" Detallado":""} ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_description:this.pdf.images.muni_description},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_description"}]]},margin:[0,15,0,0]},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Stock"+(this.localStorageTemp.detalle?" Detallado":""),style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content.push({text:[{text:"\nΔ ",fontSize:15,color:"orange",bold:!0},{text:"Filtro:",fontSize:13,style:["subrayado"],bold:!0},`\n· Farmacias: ${this.areasDB.length?this.areasDB.map((e=>e.area)).join("; "):"Todas"}.`,`\n· Insumos: ${this.insumosDB.length?`${this.insumosDB.map((e=>e.nombre)).join("; ")}`:"Todos"}.`,`\n· Procedencias: ${this.localStorageTemp.procedencias?.length?`${this.localStorageTemp.procedencias.join("; ")}`:"Todas"}.`],fontSize:12,style:[],margin:[10,0,10,5]}),Object.entries(this.data).length>0?Object.entries(this.data).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);this.localStorageTemp.detalle?(a.table.widths=["*"],a.layout="TituloSimple",a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}])):(a.table.widths=["21%","*","12%","12%","15%"],a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:5},"","","",""])),Object.entries(t).length>0?this.localStorageTemp.detalle?Object.entries(t).forEach((([e,t])=>{let r=this._cloneDeep(this.tablaConfig);r.table.headerRows+=1,r.table.body.push([{text:`${t.categoriaDB}`,style:["negrita","izquierda"],fontSize:14,fillColor:"#BBDEFB"},{text:`${t.insumoDB}`,style:["negrita","centrado"],fontSize:14,fillColor:"#BBDEFB",colSpan:2},"",{text:`TOTAL : ${t.total.toLocaleString("es-AR")}`,style:["negrita","derecha"],fontSize:14,fillColor:""+(0===t.total?"#FFCDD2":"white")}]),t.total&&(r.table.headerRows+=1,r.table.body.push([{text:`Por Vencer(< 90d) SubTotal: ${t.total_porExpirar.toLocaleString("es-AR")}`,style:["centrado"],colSpan:2,fillColor:""+(t.total_porExpirar>"0"?"#FFE0B2":"white")},"",{text:`Vencido SubTotal: ${t.total_expirado.toLocaleString("es-AR")}`,style:["centrado"],colSpan:2,fillColor:""+(t.total_expirado>"0"?"#FFCDD2":"white")},""]),r.table.headerRows+=1,r.table.body.push([{text:"DETALLE",style:["centrado","negrita"],fillColor:"#DFDFDF",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:"Procedencia",style:["centrado"],fillColor:"#DFDFDF",key:"procedencia",margin:[0,5]},{text:"Lote",style:["centrado"],fillColor:"#DFDFDF",key:"lote",key_style:["centrado"],margin:[0,5]},{text:"Vencimiento",style:["centrado"],fillColor:"#DFDFDF",key:"vencimiento",key_style:["centrado"],key_fillColor:[{cond:"existe",property:"porExpirar",resultado:"#FFE0B2"},{cond:"existe",property:"expirado",resultado:"#FFCDD2"}],margin:[0,5]},{text:"Cantidad",style:["centrado"],fillColor:"#DFDFDF",key:"cantidad",key_style:["derecha"],key_fillColor:[{cond:"existe",property:"porExpirar",resultado:"#FFE0B2"},{cond:"existe",property:"expirado",resultado:"#FFCDD2"}],margin:[0,5]}]),r=(0,m.s)({data:t.detalle,config:r})),a.table.body.push([r])})):(a.table.headerRows+=1,a.table.body.push([{text:"Categoria",style:["centrado"],fillColor:"#EEEEEE",margin:[0,12,0,0],rowSpan:2},{text:"Insumo",style:["centrado"],fillColor:"#EEEEEE",margin:[0,12,0,0],rowSpan:2},{text:"Subtotal",style:["centrado"],fillColor:"#EEEEEE",margin:[0,2],colSpan:2},"",{text:"Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,12,0,0],rowSpan:2}]),a.table.headerRows+=1,a.table.body.push([{text:"",key:"categoriaDB",key_style:["izquierda"]},{text:"",key:"insumoDB",key_style:["izquierda"]},{text:"Vencidos",style:["centrado"],fillColor:"#FFCDD2",margin:[0,2],key:"total_expirado",key_style:["derecha"],key_fillColor:[{cond:">",value:0,resultado:"#FFCDD2"}]},{text:"Buenos",style:["centrado"],fillColor:"#C8E6C9",margin:[0,2],key:"total_buenos",key_style:["derecha"],key_fillColor:[{cond:"=",value:0,resultado:"#FFCDD2"}]},{text:"",key:"total",key_style:["derecha"],key_fillColor:[{cond:"=",value:0,resultado:"#FFCDD2"}]}]),a=(0,m.s)({data:t,config:a})):this.localStorageTemp.detalle?a.table.body.push([{text:"No Hay Stock en esta Unidad.",style:["centrado","negrita"],margin:[0,5]}]):a.table.body.push([{text:"No Hay Stock en esta Unidad.",style:["centrado","negrita"],margin:[0,5],colSpan:5},"","","",""]),this.pdf.content.push(a)})):this.pdf.content.push({text:"No Hay Stock para mostrar",style:["negrita","centrado","subrayado"],fontSize:16})},async generarPDF({descarga:e}){try{this.mostrarLoading({titulo:"Preparando PDF..."});for(let e=0;e<this.areasDB.length;e++)this.data[this.areasDB[e].area]=[];for(let t=0;t<this.localStorageTemp.areas.length;t+=10){let a=await this.buscarStockAreas({areas:this.localStorageTemp.areas.slice(t,t+10),insumos:this.localStorageTemp.insumos,procedencias:this.localStorageTemp.procedencias,noDetalle:!this.localStorageTemp.detalle});if(!a)return this.mostrarError({errores:[`Problema al generar el PDF.\nRe-intente con el boton ${"true"!==e?"MOSTRAR":"DESCARGAR"} PDF.`,"Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});a=a.reduce(((e,t)=>((e[t.areaDB]=e[t.areaDB]||[]).push(t),e)),{}),this.data={...this.data,...a}}await this.modificarPdf(),await(0,m.P)(this.pdf,`${this.pdf.info.title}.pdf`,e)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}},async descargarExcel(){try{let e=[];for(let t=0;t<this.localStorageTemp.areas.length;t+=10){let a=await this.buscarStockAreas({areas:this.localStorageTemp.areas.slice(t,t+10),insumos:this.localStorageTemp.insumos,procedencias:this.localStorageTemp.procedencias,noDetalle:!this.localStorageTemp.detalle,excel:!0});if(!a)return this.mostrarError({errores:["Problema al generar el Excel.\nRe-intente con el boton DESCARGAR EXCEL.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"Excel"});e=[...e,...a]}return 1===e?.length&&null===e[0]._id?(this.mostrarError({mensaje:"No hay elementos para exportar.",titulo:"Excel"}),[]):(this.mostrarLoading({titulo:"Preparando Excel..."}),e??[])}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (descargarExcel)"}),[]}finally{this.ocultarLoading()}}}},g=u,y=a(81656),f=(0,y.A)(g,d,h,!1,null,null,null),x=f.exports}}]);