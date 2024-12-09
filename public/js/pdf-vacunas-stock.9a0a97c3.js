"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[3306],{46561:(t,e,a)=>{a.r(e),a.d(e,{default:()=>b});var r=a(28383),o=a(15852),l=a(1899),i=a(48122),s=a(41614),n=a(69155),d=a(55731),c=function(){var t=this,e=t._self._c;return e(i.A,{attrs:{"grid-list-xs":""}},[e(n.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(s.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(o.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(l.OQ,{staticClass:"px-0"},[t._v("====== GESTION DE VACUNAS ======")])],1)],1),t.loading.estado?e(s.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(l.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):e(s.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[e(l.SL,[e(n.A,{attrs:{row:"",wrap:""}},[e(d.hc),e(r.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.generarPDF}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),e(d.hc)],1)],1)],1)],1)],1)],1)},h=[],p=(a(44114),a(95353)),y=a(95350);const g={name:"vacunaStockImprimir",components:{},data:()=>({descarga:!0,pdfGen:y.P,pdf:y.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","*","*","*"],headerRows:0,body:[]}},data:{}}),computed:{...(0,p.aH)(["loading","localStorageTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarLocalStorageTemp(),await this.generarPDF()}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (created vacunaStockImprimir)"})}},methods:{...(0,p.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,p.i0)("main",["buscarAreaFiltros"]),...(0,p.i0)("vacunas",["buscarStockAreas"]),async modificarPdf(){this.pdf.info={title:`Vacunatorio Stock${this.localStorageTemp.detalle?" Detallado":""} ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(t,e,a)=>[{columns:[{width:"*",text:[{text:`Página ${t} de ${e}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{height:80,width:.25*(a.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nPrograma De Inmunizaciones\n",style:["negrita","centrado"],fontSize:16},{text:"Stock"+(this.localStorageTemp.detalle?" Detallado":""),style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha:",style:["centrado"],fontSize:13},{text:`\n\n${this.hoy}`,style:["derecha"],fontSize:13}]}],margin:[30,5]}],this.pdf.footer=()=>[],Object.entries(this.data).length>0?Object.entries(this.data).forEach((([t,e])=>{let a=this._cloneDeep(this.tablaConfig);this.localStorageTemp.detalle?(a.table.widths=["*"],a.layout="TituloSimple",a.table.headerRows+=1,a.table.body.push([{text:`${t}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}])):(a.table.widths=["*","14%","14%","16%"],a.table.headerRows+=1,a.table.body.push([{text:`${t}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:4},"","",""])),Object.entries(e).length>0?this.localStorageTemp.detalle?Object.entries(e).forEach((([t,e])=>{let r=this._cloneDeep(this.tablaConfig);r.table.headerRows+=1,r.table.body.push([{text:`${e.insumoDB}`,style:["negrita","centrado"],fontSize:14,fillColor:"#BBDEFB",colSpan:3},"","",{text:`TOTAL : ${e.total.toLocaleString("es-AR")}`,style:["negrita","derecha"],fontSize:14,fillColor:""+(0===e.total?"#FFCDD2":"white")}]),e.total&&(r.table.headerRows+=1,r.table.body.push([{text:`Por Vencer(< 90d) SubTotal: ${e.total_porExpirar.toLocaleString("es-AR")}`,style:["centrado"],colSpan:2,fillColor:""+(e.total_porExpirar>"0"?"#FFE0B2":"white")},"",{text:`Vencido SubTotal: ${e.total_expirado.toLocaleString("es-AR")}`,style:["centrado"],colSpan:2,fillColor:""+(e.total_expirado>"0"?"#FFCDD2":"white")},""]),r.table.headerRows+=1,r.table.body.push([{text:"DETALLE",style:["centrado","negrita"],fillColor:"#DFDFDF",colSpan:4},"","",""]),r.table.headerRows+=1,r.table.body.push([{text:"Procedencia",style:["centrado"],fillColor:"#DFDFDF",key:"procedencia",margin:[0,5]},{text:"Lote",style:["centrado"],fillColor:"#DFDFDF",key:"lote",key_style:["centrado"],margin:[0,5]},{text:"Vencimiento",style:["centrado"],fillColor:"#DFDFDF",key:"vencimiento",key_style:["centrado"],key_fillColor:[{cond:"existe",property:"porExpirar",resultado:"#FFE0B2"},{cond:"existe",property:"expirado",resultado:"#FFCDD2"}],margin:[0,5]},{text:"Cantidad",style:["centrado"],fillColor:"#DFDFDF",key:"cantidad",key_style:["derecha"],key_fillColor:[{cond:"existe",property:"porExpirar",resultado:"#FFE0B2"},{cond:"existe",property:"expirado",resultado:"#FFCDD2"}],margin:[0,5]}]),r=(0,y.s)({data:e.detalle,config:r})),a.table.body.push([r])})):(a.table.headerRows+=1,a.table.body.push([{text:"Insumo",style:["centrado"],fillColor:"#EEEEEE",margin:[0,12,0,0],rowSpan:2},{text:"Subtotal",style:["centrado"],fillColor:"#EEEEEE",margin:[0,2],colSpan:2},"",{text:"Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,12,0,0],rowSpan:2}]),a.table.headerRows+=1,a.table.body.push([{text:"",key:"insumoDB",key_style:["izquierda"]},{text:"Por Vencer",style:["centrado"],fillColor:"#FFE0B2",margin:[0,2],key:"total_porExpirar",key_style:["derecha"],key_fillColor:[{cond:">",value:0,resultado:"#FFE0B2"}]},{text:"Vencidos",style:["centrado"],fillColor:"#FFCDD2",margin:[0,2],key:"total_expirado",key_style:["derecha"],key_fillColor:[{cond:">",value:0,resultado:"#FFCDD2"}]},{text:"",key:"total",key_style:["derecha"],key_fillColor:[{cond:"=",value:0,resultado:"#FFCDD2"}]}]),a=(0,y.s)({data:e,config:a})):this.localStorageTemp.detalle?a.table.body.push([{text:"No Hay Stock en esta Unidad.",style:["centrado","negrita"],margin:[0,5]}]):a.table.body.push([{text:"No Hay Stock en esta Unidad.",style:["centrado","negrita"],margin:[0,5],colSpan:4},"","",""]),this.pdf.content.push(a)})):this.pdf.content.push({text:"No Hay Stock para mostrar",style:["negrita","centrado","subrayado"],fontSize:16})},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let t=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.localStorageTemp.areas}},populate:"no",select:"area"})];for(let e=0;e<t.length;e++)this.data[t[e].area]=[];for(let e=0;e<this.localStorageTemp.areas.length;e+=10){let t=await this.buscarStockAreas({areas:this.localStorageTemp.areas.slice(e,e+10),insumos:this.localStorageTemp.insumos,procedencias:this.localStorageTemp.procedencias,noDetalle:!this.localStorageTemp.detalle});if(!t)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});t=t.reduce(((t,e)=>((t[e.areaDB]=t[e.areaDB]||[]).push(e),t)),{}),this.data={...this.data,...t}}await this.modificarPdf(),await(0,y.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},u=g;var m=a(81656),f=(0,m.A)(u,c,h,!1,null,null,null);const b=f.exports}}]);