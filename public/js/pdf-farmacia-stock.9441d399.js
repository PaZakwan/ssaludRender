"use strict";(globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]=globalThis["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[10],{4363:(e,t,a)=>{a.r(t),a.d(t,{default:()=>m});var o=a(6194),r=a(8956),i=a(2353),l=a(6530),n=a(683),s=a(9456),d=a(8143),c=function(){var e=this,t=e._self._c;return t(l.Z,{attrs:{"grid-list-xs":""}},[t(s.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(n.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(r.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(i.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?t(n.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(r.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):t(n.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(r.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(i.h7,[t(d.Cl),t(o.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.pdfGen(e.pdf,`${e.pdf.info.title}.pdf`,e.descarga)}}},[e._v(" "+e._s("true"==e.descarga?"Descargar PDF":"Mostrar PDF"))]),t(d.Cl)],1)],1)],1)],1)],1)},h=[],f=a(629),u=a(9592);const p={name:"farmaciaStockImprimir",components:{},data:()=>({descarga:!0,detallado:!1,pdfGen:u.o,pdf:u.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","*","*","*"],headerRows:0,body:[]}},data:{}}),computed:{...(0,f.rn)(["loading","pdfTemp","hoy"])},async created(){try{this.mostrarLoading({titulo:"Preparando PDF..."}),this.descarga=this.$route.query.descarga;let e=[...await this.buscarAreaFiltros({filtro:{farmacia:!0},populate:"no",select:"area"})];await this.cargarPdfTemp();for(let t=0;t<this.pdfTemp.areas.length;t++){let a=e.find((e=>e.id===this.pdfTemp.areas[t])).area;this.data[a]=[]}this.detallado=!!this.pdfTemp.detalle;for(let t=0;t<this.pdfTemp.areas.length;t+=10){let e=await this.buscarStockAreas({areas:this.pdfTemp.areas.slice(t,t+10),insumos:this.pdfTemp.insumos,procedencias:this.pdfTemp.procedencias,noDetalle:!this.pdfTemp.detalle});e=e.reduce(((e,t)=>((e[t.areaDB]=e[t.areaDB]||[]).push(t),e)),{}),this.data={...this.data,...e}}await this.modificarPdf(),this.borrarPdfTemp(),await(0,u.o)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado"})}finally{this.ocultarLoading()}},methods:{...(0,f.OI)(["mostrarLoading","ocultarLoading","mostrarError","cargarPdfTemp","borrarPdfTemp"]),...(0,f.nv)("main_areas",["buscarAreaFiltros"]),...(0,f.nv)("farmacia",["buscarStockAreas"]),async modificarPdf(){this.pdf.info={title:`Farmacia Stock${this.detallado?" Detallado":""} ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(a.width-30),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Stock"+(this.detallado?" Detallado":""),style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha:",style:["centrado"],fontSize:13},{text:`\n\n${this.hoy}`,style:["derecha"],fontSize:13}]}],margin:[30,5]}],this.pdf.footer=()=>[],Object.entries(this.data).length>0?Object.entries(this.data).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);if(a.table.widths=["*"],a.layout="TituloSimple",a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}]),Object.entries(t).length>0){if(!this.detallado){var o=this._cloneDeep(this.tablaConfig);o.table.widths=["21%","*","12%","12%","15%"],o.table.headerRows+=1,o.table.body.push([{text:"Categoria",style:["centrado"],fillColor:"#DFDFDF",key:"categoriaDB",key_style:["izquierda"]},{text:"Insumo",style:["centrado"],fillColor:"#DFDFDF",key:"insumoDB",key_style:["izquierda"]},{text:"Por Vencer",style:["centrado"],fillColor:"#DFDFDF",key:"total_porExpirar",key_style:["derecha"],key_fillColor:[{cond:">",value:0,resultado:"#FFE0B2"}]},{text:"Vencidos",style:["centrado"],fillColor:"#DFDFDF",key:"total_expirado",key_style:["derecha"],key_fillColor:[{cond:">",value:0,resultado:"#FFCDD2"}]},{text:"Total",style:["centrado"],fillColor:"#DFDFDF",key:"total",key_style:["derecha"]}]),o=(0,u.x)({data:t,config:o}),a.table.body.push([o]),this.pdf.content.push(a)}this.detallado&&(Object.entries(t).forEach((([e,t])=>{let o=this._cloneDeep(this.tablaConfig);o.table.headerRows+=1,o.table.body.push([{text:`${t.categoriaDB}`,style:["negrita","izquierda"],fontSize:14,fillColor:"#BBDEFB"},{text:`${t.insumoDB}`,style:["negrita","centrado"],fontSize:14,fillColor:"#BBDEFB",colSpan:2},"",{text:`TOTAL : ${t.total.toLocaleString("es-AR")}`,style:["negrita","derecha"],fontSize:14,fillColor:"white"}]),o.table.headerRows+=1,o.table.body.push([{text:`Por Vencer(< 90d) SubTotal: ${t.total_porExpirar.toLocaleString("es-AR")}`,style:["centrado"],colSpan:2,fillColor:""+(t.total_porExpirar>"0"?"#FFE0B2":"white")},"",{text:`Vencido SubTotal: ${t.total_expirado.toLocaleString("es-AR")}`,style:["centrado"],colSpan:2,fillColor:""+(t.total_expirado>"0"?"#FFCDD2":"white")},""]),o.table.headerRows+=1,o.table.body.push([{text:"DETALLE",style:["centrado","negrita"],fillColor:"white",colSpan:4},"","",""]),o.table.headerRows+=1,o.table.body.push([{text:"Procedencia",style:["centrado"],fillColor:"#DFDFDF",key:"procedencia",margin:[0,5]},{text:"Lote",style:["centrado"],fillColor:"#DFDFDF",key:"lote",key_style:["centrado"],margin:[0,5]},{text:"Vencimiento",style:["centrado"],fillColor:"#DFDFDF",key:"vencimiento",key_style:["centrado"],key_fillColor:[{cond:"otroExiste",value:"porExpirar",resultado:"#FFE0B2"},{cond:"otroExiste",value:"expirado",resultado:"#FFCDD2"}],margin:[0,5]},{text:"Cantidad",style:["centrado"],fillColor:"#DFDFDF",key:"cantidad",key_style:["derecha"],margin:[0,5]}]),o=(0,u.x)({data:t.detalle,config:o}),a.table.body.push([o])})),this.pdf.content.push(a))}else a.table.body.push([{text:"No Hay Stock en esta Unidad.",style:["centrado","negrita"],margin:[0,5]}]),this.pdf.content.push(a)})):this.pdf.content.push({text:"No Hay Stock para mostrar",style:["negrita","centrado","subrayado"],fontSize:16})}}},y=p;var g=a(1001),b=(0,g.Z)(y,c,h,!1,null,null,null);const m=b.exports},9592:(e,t,a)=>{a.d(t,{dd:()=>n,o:()=>d,x:()=>s});var o=a(361),r=a.n(o),i=a(1566),l=a.n(i);if(void 0==l().vfs){const e=a(7920);l().vfs=e.pdfMake.vfs}l().tableLayouts={TituloDatos:{hLineWidth:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e,t){return 0===e||e===t.table.widths.length?2:1},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(e,t){return 0===e?0:e<=t.table.headerRows?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e){return 0},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}}};const n={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},s=function({config:e,data:t}){let a=r()(e),o=r()(a.table.body[a.table.body.length-1]);return t?.forEach((function(e){let t=[];o.forEach((function(a){if("undefined"!==typeof e[a.key]&&null!==e[a.key]){let o={text:e[a.key].toLocaleString("es-AR"),style:a.key_style};a.key_fillColor&&a.key_fillColor.forEach((t=>{switch(t.cond){case"=":e[a.key]===t.value&&(o.fillColor=t.resultado);break;case">":e[a.key]>t.value&&(o.fillColor=t.resultado);break;case"<":e[a.key]<t.value&&(o.fillColor=t.resultado);break;case"!=":e[a.key]!==t.value&&(o.fillColor=t.resultado);break;case"otroExiste":e[t.value]&&(o.fillColor=t.resultado);break}})),t.push(o)}else t.push({text:"---",style:"centrado"})})),a.table.body.push(t)})),a},d=async function(e,t,a){let o=e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};navigator.userAgent.indexOf("Edge")>=0||"true"==a?(await l().createPdf(o).download(t,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):l().createPdf(o).open({},window)}}}]);