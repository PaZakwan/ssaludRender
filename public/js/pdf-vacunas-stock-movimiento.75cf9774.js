"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[3684],{19557:(t,e,a)=>{a.r(e),a.d(e,{default:()=>x});var r=a(28383),o=a(15852),s=a(1899),i=a(48122),n=a(41614),l=a(69155),d=a(55731),c=function(){var t=this,e=t._self._c;return e(i.A,{attrs:{"grid-list-xs":""}},[e(l.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(n.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(o.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(s.OQ,{staticClass:"px-0"},[t._v("====== GESTION DE VACUNAS ======")])],1)],1),t.loading.estado?e(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(s.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):e(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(s.SL,[e(l.A,{attrs:{row:"",wrap:""}},[e(d.hc),e(r.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.generarPDF}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),e(d.hc)],1)],1)],1)],1)],1)],1)},h=[],m=(a(44114),a(95353)),p=a(95350);const u={name:"VacunaStockMovimientoImprimir",components:{},data:()=>({descarga:!0,pdfGen:p.P,pdf:p.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","10%","10%","10%","10%","10%","11%"],headerRows:0,body:[]}},data:{}}),computed:{...(0,m.aH)(["loading","localStorageTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarLocalStorageTemp(),this.data.desde=this.localStorageTemp.desde??"xxxx-xx-xx",this.data.hasta=this.localStorageTemp.hasta??"xxxx-xx-xx",this.data.areas={},await this.generarPDF()}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (created VacunaStockMovimientoImprimir)"})}},methods:{...(0,m.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,m.i0)(["requestAPI"]),...(0,m.i0)("main",["buscarAreaFiltros"]),...(0,m.i0)("vacunas",["getRequestFilter","buscarInsumosFiltro"]),async modificarPdf(){this.pdf.info={title:`Vacunatorio Stock Movimiento ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageOrientation="landscape",this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(t,e,a)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${t} de ${e}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"20%",layout:"noBorders",table:{body:[[{height:80,width:.2*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nPrograma De Inmunizaciones\n",style:["negrita","centrado"],fontSize:16},{text:"Stock Movimientos",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.data.desde}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.data.hasta}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content.push({text:[{text:"Δ ",fontSize:15,color:"red",bold:!0},{text:"Tienen en Stock: No tiene en cuenta el filtro de las fechas Desde/Hasta. Muestra la cantidad que tienen al momento de realizar el reporte.",fontSize:13,bold:!0},{text:"\nΔ ",fontSize:15,color:"orange",bold:!0},{text:"Filtro:",fontSize:13,style:["subrayado"],bold:!0},""+(this.data.areasName.length?`\n· Areas: ${this.data.areasName.join("; ")}.`:""),""+(this.data.insumosName.length?`\n· Insumos: ${this.data.insumosName.join("; ")}.`:""),""+(this.localStorageTemp.procedencias.length?`\n· Procedencias: ${this.localStorageTemp.procedencias.join("; ")}.`:"")],fontSize:12,style:[],margin:[10,0,10,5]}),Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([t,e])=>{let a=this._cloneDeep(this.tablaConfig);a.table.headerRows+=1,a.table.body.push([{text:`${t}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:7},"","","","","",""]),Object.entries(e).length>0?(a.table.headerRows+=1,a.table.body.push([{text:"Insumo",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Ingresos",style:["centrado"],fillColor:"#BBDEFB",margin:[0,12,0,0],rowSpan:2},{text:"Egresos",style:["centrado"],fontSize:14,fillColor:"#FFF9C4",colSpan:2},"",{text:"Tienen\nen Stock",style:["centrado"],fillColor:"#DFDFDF",margin:[0,7,0,0],rowSpan:2},{text:"Solicitados\nPendientes",style:["centrado"],fillColor:"#DFDFDF",margin:[0,7,0,0],rowSpan:2},{text:"Cantidad\nRecomendada",style:["centrado"],fillColor:"#DFDFDF",margin:[0,7,0,0],rowSpan:2}]),a.table.headerRows+=1,a.table.body.push([{text:"",key:"insumoDB",key_style:["izquierda"]},{text:"",key:"total_ingreso",key_style:["derecha"],fillEmpty:0},{text:"Nominal",style:["centrado"],fillColor:"#FFF9C4",margin:[0,2],key:"egreso_consumido",key_style:["derecha"],fillEmpty:0},{text:"Otros",style:["centrado"],fillColor:"#FFE0B2",margin:[0,2],key:"egreso_otros",key_style:["derecha"],fillEmpty:0},{text:"",key:"total_stock",key_style:["derecha"],key_fillColor:[{cond:"<",property:"cant_min",multiple:1.2,resultado:"#FFF9C4"},{cond:"<",property:"cant_min",resultado:"#FFE0B2"},{cond:"=",value:0,resultado:"#FFCDD2"}],fillEmpty:0},{text:"",key:"total_solicitado",key_style:["derecha"],fillEmpty:0},{text:"",key:"cant_min",key_style:["derecha"]}]),a=(0,p.s)({data:e,config:a}),this.pdf.content.push(a)):(a.table.body.push([{text:"No Hay Datos en esta Unidad.",style:["centrado","negrita"],margin:[0,5],colSpan:7},"","","","","",""]),this.pdf.content.push(a))})):this.pdf.content.push({text:"No Hay Datos para mostrar",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarReporteGeneral(t){try{this.mostrarLoading({titulo:"Generando Reporte..."});let e=await this.getRequestFilter({payload:t});if(e.error)return!1;let a=null;return a=await this.requestAPI({method:"get",url:`/vacunas/estadistica/general?${e.dato}`}),!!a?.data?.ok&&a?.data?.reporte}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (buscarReporteGeneral)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let t=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.localStorageTemp.areas}},populate:"no",select:"area"})];this.data.areasName=[];for(let a=0;a<t.length;a++)this.data.areas[t[a].area]=[],this.data.areasName.push(t[a].area);this.data.insumosName=[],this.localStorageTemp.insumos?.length&&(this.data.insumosName=await this.buscarInsumosFiltro({filtro:{_id:{$in:this.localStorageTemp.insumos}},populate:"no",select:"nombre"}),this.data.insumosName=this.data.insumosName.map((t=>t.nombre)));let e=await this.buscarReporteGeneral({areas:this.localStorageTemp.areas,desde:this.localStorageTemp.desde,hasta:this.localStorageTemp.hasta,insumos:this.localStorageTemp.insumos,procedencias:this.localStorageTemp.procedencias});if(!e)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});e=e.reduce(((t,e)=>((t[e.areaDB]=t[e.areaDB]||[]).push(e),t)),{}),this.data.areas={...this.data.areas,...e},await this.modificarPdf(),await(0,p.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},g=u;var y=a(81656),f=(0,y.A)(g,c,h,!1,null,null,null);const x=f.exports}}]);