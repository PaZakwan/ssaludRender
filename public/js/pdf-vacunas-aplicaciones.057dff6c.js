"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[8161],{99165:(a,t,e)=>{e.r(t),e.d(t,{default:()=>x});var r=e(28383),s=e(15852),i=e(1899),o=e(48122),n=e(41614),l=e(69155),c=e(55731),d=function(){var a=this,t=a._self._c;return t(o.A,{attrs:{"grid-list-xs":""}},[t(l.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(n.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(s.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(i.OQ,{staticClass:"px-0"},[a._v("====== GESTION DE VACUNAS ======")])],1)],1),a.loading.estado?t(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(s.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.OQ,{staticClass:"px-0 text-uppercase"},[a._v("====== Creando PDF Espere... ======")])],1)],1):t(n.A,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(s.A,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.SL,[t(l.A,{attrs:{row:"",wrap:""}},[t(c.hc),t(r.A,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:a.loading.estado,loading:a.loading.estado},on:{click:a.generarPDF}},[a._v(" "+a._s("true"==a.descarga?"Descargar PDF":"Mostrar PDF"))]),t(c.hc)],1)],1)],1)],1)],1)],1)},h=[],u=(e(44114),e(95353)),g=e(95350);const p={name:"vacunaAplicacionImprimir",components:{},data:()=>({descarga:!0,pdfGen:g.P,pdf:g.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["9%","*","*","9%","10%","9%","9%","10%"],headerRows:0,body:[]}},data:{}}),computed:{...(0,u.aH)(["loading","localStorageTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarLocalStorageTemp(),this.data.desde=this.localStorageTemp.desde??"xxxx-xx-xx",this.data.hasta=this.localStorageTemp.hasta??"xxxx-xx-xx",this.data.areas={},await this.generarPDF()}catch(a){this.mostrarError({mensaje:a,titulo:"Inesperado (created vacunaAplicacionImprimir)"})}},methods:{...(0,u.PY)(["mostrarLoading","ocultarLoading","mostrarError","cargarLocalStorageTemp"]),...(0,u.i0)(["requestAPI"]),...(0,u.i0)("main",["buscarAreaFiltros"]),...(0,u.i0)("vacunas",["getRequestFilter"]),async modificarPdf(){this.pdf.info={title:`Vacunaciones ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.pageOrientation="landscape",this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(a,t,e)=>[{columns:[{width:"*",text:[{text:`Fecha: ${this.mostrarFecha(Date.now(),!0)}`,fontSize:13,style:["izquierda"]}],style:["centrado"],margin:[10,5]},{width:"*",text:[{text:`Página ${a} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{height:80,width:.25*(e.width-this.pdf.pageMargins[0]-this.pdf.pageMargins[2]),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nPrograma De Inmunizaciones\n",style:["negrita","centrado"],fontSize:16},{text:"Vacunaciones",style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha Desde",style:["centrado"],fontSize:13},{text:`\n${this.data.desde}`,style:["derecha"]},{text:"\nFecha Hasta",style:["centrado"],fontSize:13},{text:`\n${this.data.hasta}`,style:["derecha"]}]}],margin:[30,5]}],this.pdf.footer=()=>[],Object.entries(this.data.areas).length>0?Object.entries(this.data.areas).forEach((([a,t])=>{let e=this._cloneDeep(this.tablaConfig);e.table.widths=["*"],e.layout="TituloSimple",e.table.headerRows+=1,e.table.body.push([{text:`${a}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}]),Object.entries(t).length>0?(Object.entries(t).forEach((([a,t])=>{let r=this._cloneDeep(this.tablaConfig);r.table.headerRows+=1,r.table.body.push([{text:`${t.insumoDB}`,style:["negrita","izquierda"],fontSize:14,fillColor:"#BBDEFB",colSpan:5},"","","","",{text:`TOTAL : ${t.total_vacunaciones?.toLocaleString("es-AR")}`,style:["negrita","derecha"],fontSize:14,fillColor:"white",colSpan:3},"",""]),r.table.headerRows+=1,r.table.body.push([{text:"DETALLE",style:["centrado","negrita"],fillColor:"white",colSpan:8},"","","","","","",""]),r.table.headerRows+=1,r.table.body.push([{text:"Fecha",style:["centrado"],fillColor:"#DFDFDF",key:"fecha",margin:[0,5]},{text:"Paciente",style:["centrado"],fillColor:"#DFDFDF",key:"pacienteDB",margin:[0,5]},{text:"Documento",style:["centrado"],fillColor:"#DFDFDF",key:"pacienteDocDB",key_style:["centrado"],margin:[0,5]},{text:"Obra Social",style:["centrado"],fillColor:"#DFDFDF",key:"oSocial",margin:[0,5]},{text:"Procedencia",style:["centrado"],fillColor:"#DFDFDF",key:"procedencia",margin:[0,5]},{text:"Dosis",style:["centrado"],fillColor:"#DFDFDF",key:"dosis",margin:[0,5]},{text:"Lote",style:["centrado"],fillColor:"#DFDFDF",key:"lote",margin:[0,5]},{text:"Vencimiento",style:["centrado"],fillColor:"#DFDFDF",key:"vencimiento",margin:[0,5]}]),r=(0,g.s)({data:t.detalle_vacunaciones,config:r}),e.table.body.push([r])})),this.pdf.content.push(e)):(e.table.body.push([{text:"No Hay Vacunaciones registradas en esta Unidad entre las fechas seleccionadas.",style:["centrado","negrita"],margin:[0,5]}]),this.pdf.content.push(e))})):this.pdf.content.push({text:"No Hay Vacunaciones registradas entre las fechas seleccionadas.",style:["negrita","centrado","subrayado"],fontSize:16})},async buscarVacunacionesEstadistica(a){try{this.mostrarLoading({titulo:"Buscando Vacunaciones..."});let t=await this.getRequestFilter({payload:a});if(t.error)return!1;let e=null;return e=await this.requestAPI({method:"get",url:`/vacunas/estadistica/salidas?${t.dato}&mod=${JSON.stringify({vac:1})}`}),!!e?.data?.ok&&e?.data?.egresos}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarVacunacionesEstadistica)"}),!1}finally{this.ocultarLoading()}},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let a=[...await this.buscarAreaFiltros({filtro:{_id:{$in:this.localStorageTemp.areas}},populate:"no",select:"area"})];for(let t=0;t<a.length;t++)this.data.areas[a[t].area]=[];for(let t=0;t<this.localStorageTemp.areas.length;t+=10){let a=await this.buscarVacunacionesEstadistica({areas:this.localStorageTemp.areas.slice(t,t+10),desde:this.localStorageTemp.desde,hasta:this.localStorageTemp.hasta,insumos:this.localStorageTemp.insumos,procedencias:this.localStorageTemp.procedencias});if(!a)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});a=a.reduce(((a,t)=>((a[t.areaDB]=a[t.areaDB]||[]).push(t),a)),{}),this.data.areas={...this.data.areas,...a}}await this.modificarPdf(),await(0,g.P)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(a){return this.mostrarError({mensaje:a,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},m=p;var f=e(81656),y=(0,f.A)(m,d,h,!1,null,null,null);const x=y.exports}}]);