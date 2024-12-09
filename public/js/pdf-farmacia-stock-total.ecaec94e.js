"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[8918],{60448:(t,a,e)=>{e.r(a),e.d(a,{default:()=>f});var r=e(28383),o=e(15852),i=e(1899),s=e(48122),l=e(41614),n=e(69155),d=function(){var t=this,a=t._self._c;return a(s.A,{attrs:{"grid-list-xs":""}},[a(n.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[a(l.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[a(o.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[a(i.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== GESTION DE FARMACIA ======")])],1)],1),t.loading.estado?a(l.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[a(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[a(i.OQ,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):a(l.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[a(o.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[a(i.SL,[a(n.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[a(r.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.generarPDF}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))])],1)],1)],1)],1)],1)],1)},c=[],h=(e(44114),e(95353)),u=e(95350);const g={name:"FarmaciaStockTotalImprimir",components:{},data:()=>({descarga:!0,pdfGen:u.P,pdf:u.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["14%","*","8%","8%","7%","7%","7%","8%","7%","10%"],headerRows:0,body:[]}},data:null}),computed:{...(0,h.aH)(["loading","localStorageTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarLocalStorageTemp(),await this.generarPDF()}catch(t){this.mostrarError({mensaje:t,titulo:"Inesperado (created FarmaciaStockTotalImprimir)"})}},methods:{...(0,h.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,h.i0)(["requestAPI"]),...(0,h.i0)("main",["buscarAreaFiltros"]),...(0,h.i0)("farmacia",["getRequestFilter"]),async modificarPdf(){this.pdf.info={title:`Farmacia Stock Total ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageOrientation="landscape",this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(t,a,e)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${t} de ${a}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"20%",layout:"noBorders",table:{body:[[{height:80,width:.2*(e.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Stock Total",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"20%",text:[]}],margin:[30,5]}],this.pdf.footer=()=>[],this.pdf.content=[],this.pdf.content.push({text:[{text:"\nΔ ",fontSize:15,color:"orange",bold:!0},{text:"Filtro:",fontSize:13,style:["subrayado"],bold:!0},`\n· Insumos: ${this.localStorageTemp.insumos.length?`${this.data?.map?.((t=>t.insumoDB)).join("; ")}`:"Todos"}.`],fontSize:12,style:[],margin:[10,0,10,5]});let t=this._cloneDeep(this.tablaConfig);t.table.headerRows+=1,t.table.body.push([{text:"Sistema de Stock",style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:10},"","","","","","","","",""]),this.data?(t.table.headerRows+=1,t.table.body.push([{text:"Categoria",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Insumo",style:["centrado"],fillColor:"#DFDFDF",margin:[0,12,0,0],rowSpan:2},{text:"Subtotal Procedencias",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],colSpan:7},"","","","","","",{text:"Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,12,0,0],rowSpan:2}]),t.table.headerRows+=1,t.table.body.push([{text:"",key:"categoriaDB",key_style:["izquierda"]},{text:"",key:"insumoDB",key_style:["izquierda"]},{text:"Municipal",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Municipal",key_style:["derecha"]},{text:"Remediar",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Remediar",key_style:["derecha"]},{text:"SUMAR",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_SUMAR",key_style:["derecha"]},{text:"Region",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Region",key_style:["derecha"]},{text:"Nacion",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Nacion",key_style:["derecha"]},{text:"Donacion",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Donacion",key_style:["derecha"]},{text:"Otros",style:["centrado"],fillColor:"#DFDFDF",margin:[0,2],key:"subtotal_Otros",key_style:["derecha"]},{text:"",key:"total",key_style:["derecha"],key_fillColor:[{cond:"=",value:0,resultado:"#FFCDD2"}]}]),t=(0,u.s)({data:this.data,config:t}),this.pdf.content.push(t)):(t.table.body.push([{text:"No Hay Stock en esta Unidad.",style:["centrado","negrita"],margin:[0,5],colSpan:10},"","","","","","","","",""]),this.pdf.content.push(t))},async buscarStockTotal(t){try{this.mostrarLoading({titulo:"Contando Stock..."});let a=await this.getRequestFilter({payload:t,opcional:{areas:!0,fecha:!0}});if(a.error)return!1;let e=null;return e=await this.requestAPI({method:"get",url:`/farmacia/stock/total?${a.dato}`}),!!e?.data?.ok&&e?.data?.stock}catch(a){return this.mostrarError({mensaje:a,titulo:"Inesperado (buscarStockTotal)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{if(this.mostrarLoading({titulo:"Preparando PDF..."}),this.data=await this.buscarStockTotal({insumos:this.localStorageTemp.insumos}),!this.data)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});await this.modificarPdf(),await(0,u.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},y=g;var m=e(81656),p=(0,m.A)(y,d,c,!1,null,null,null);const f=p.exports}}]);