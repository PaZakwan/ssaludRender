"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[10],{6833:function(e,t,a){a.r(t),a.d(t,{default:function(){return b}});var o=a(6194),r=a(8956),l=a(2353),i=a(5050),n=a(683),s=a(9456),d=a(8143),c=function(){var e=this,t=e._self._c;return t(i.Z,{attrs:{"grid-list-xs":""}},[t(s.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(n.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(r.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(l.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== GESTION DE FARMACIA ======")])],1)],1),e.loading.estado?t(n.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(r.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(l.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Creando PDF Espere... ======")])],1)],1):t(n.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[t(r.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[t(l.h7,[t(d.Cl),t(o.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.generarPDF}},[e._v(" "+e._s("true"==e.descarga?"Descargar PDF":"Mostrar PDF"))]),t(d.Cl)],1)],1)],1)],1)],1)},u=[],h=(a(7658),a(629)),f=a(9592),p={name:"farmaciaStockImprimir",components:{},data:()=>({descarga:!0,detallado:!1,pdfGen:f.o,pdf:f.dd,tablaConfig:{layout:"TituloDatos",style:"margenTabla",table:{widths:["*","*","*","*"],headerRows:0,body:[]}},data:{}}),computed:{...(0,h.rn)(["loading","pdfTemp","hoy"])},async created(){try{this.descarga=this.$route.query.descarga,await this.cargarPdfTemp(),this.detallado=!!this.pdfTemp.detalle,await this.generarPDF()}catch(e){this.mostrarError({mensaje:e,titulo:"Inesperado (PDF)"})}},methods:{...(0,h.OI)(["mostrarLoading","ocultarLoading","mostrarError","cargarPdfTemp","borrarPdfTemp"]),...(0,h.nv)("main_areas",["buscarAreaFiltros"]),...(0,h.nv)("farmacia",["buscarStockAreas"]),async modificarPdf(){this.pdf.info={title:`Farmacia Stock${this.detallado?" Detallado":""} ${this.hoy}`,author:"Secretaria de Salud"},this.pdf.images={muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},this.pdf.pageMargins=[30,130,30,30],this.pdf.header=(e,t,a)=>[{columns:[{width:"*",text:[{text:`Página ${e} de ${t}`,fontSize:13,style:["derecha"]}],style:["centrado"],margin:[10,5]}]},{columns:[{width:"25%",layout:"noBorders",table:{body:[[{width:.25*(a.width-30),image:"muni_frase"}]]}},{width:"*",text:[{text:"\nDirección General de Farmacia\n",style:["negrita","centrado"],fontSize:16},{text:"Stock"+(this.detallado?" Detallado":""),style:["negrita","centrado","subrayado"],fontSize:22}]},{width:"25%",text:[{text:"\nFecha:",style:["centrado"],fontSize:13},{text:`\n\n${this.hoy}`,style:["derecha"],fontSize:13}]}],margin:[30,5]}],this.pdf.footer=()=>[],Object.entries(this.data).length>0?Object.entries(this.data).forEach((([e,t])=>{let a=this._cloneDeep(this.tablaConfig);this.detallado?(a.table.widths=["*"],a.layout="TituloSimple",a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9"}])):(a.table.widths=["21%","*","12%","12%","15%"],a.table.headerRows+=1,a.table.body.push([{text:`${e}`,style:["negrita","centrado"],fontSize:16,fillColor:"#C8E6C9",colSpan:5},"","","",""])),Object.entries(t).length>0?this.detallado?Object.entries(t).forEach((([e,t])=>{let o=this._cloneDeep(this.tablaConfig);o.table.headerRows+=1,o.table.body.push([{text:`${t.categoriaDB}`,style:["negrita","izquierda"],fontSize:14,fillColor:"#BBDEFB"},{text:`${t.insumoDB}`,style:["negrita","centrado"],fontSize:14,fillColor:"#BBDEFB",colSpan:2},"",{text:`TOTAL : ${t.total.toLocaleString("es-AR")}`,style:["negrita","derecha"],fontSize:14,fillColor:""+(0===t.total?"#FFCDD2":"white")}]),t.total&&(o.table.headerRows+=1,o.table.body.push([{text:`Por Vencer(< 90d) SubTotal: ${t.total_porExpirar.toLocaleString("es-AR")}`,style:["centrado"],colSpan:2,fillColor:""+(t.total_porExpirar>"0"?"#FFE0B2":"white")},"",{text:`Vencido SubTotal: ${t.total_expirado.toLocaleString("es-AR")}`,style:["centrado"],colSpan:2,fillColor:""+(t.total_expirado>"0"?"#FFCDD2":"white")},""]),o.table.headerRows+=1,o.table.body.push([{text:"DETALLE",style:["centrado","negrita"],fillColor:"white",colSpan:4},"","",""]),o.table.headerRows+=1,o.table.body.push([{text:"Procedencia",style:["centrado"],fillColor:"#DFDFDF",key:"procedencia",margin:[0,5]},{text:"Lote",style:["centrado"],fillColor:"#DFDFDF",key:"lote",key_style:["centrado"],margin:[0,5]},{text:"Vencimiento",style:["centrado"],fillColor:"#DFDFDF",key:"vencimiento",key_style:["centrado"],key_fillColor:[{cond:"existe",property:"porExpirar",resultado:"#FFE0B2"},{cond:"existe",property:"expirado",resultado:"#FFCDD2"}],margin:[0,5]},{text:"Cantidad",style:["centrado"],fillColor:"#DFDFDF",key:"cantidad",key_style:["derecha"],key_fillColor:[{cond:"existe",property:"porExpirar",resultado:"#FFE0B2"},{cond:"existe",property:"expirado",resultado:"#FFCDD2"}],margin:[0,5]}]),o=(0,f.x)({data:t.detalle,config:o})),a.table.body.push([o])})):(a.table.headerRows+=1,a.table.body.push([{text:"Categoria",style:["centrado"],fillColor:"#EEEEEE",margin:[0,12,0,0],rowSpan:2},{text:"Insumo",style:["centrado"],fillColor:"#EEEEEE",margin:[0,12,0,0],rowSpan:2},{text:"Subtotal",style:["centrado"],fillColor:"#EEEEEE",margin:[0,2],colSpan:2},"",{text:"Total",style:["centrado"],fillColor:"#BBDEFB",margin:[0,12,0,0],rowSpan:2}]),a.table.headerRows+=1,a.table.body.push([{text:"",key:"categoriaDB",key_style:["izquierda"]},{text:"",key:"insumoDB",key_style:["izquierda"]},{text:"Por Vencer",style:["centrado"],fillColor:"#FFE0B2",margin:[0,2],key:"total_porExpirar",key_style:["derecha"],key_fillColor:[{cond:">",value:0,resultado:"#FFE0B2"}]},{text:"Vencidos",style:["centrado"],fillColor:"#FFCDD2",margin:[0,2],key:"total_expirado",key_style:["derecha"],key_fillColor:[{cond:">",value:0,resultado:"#FFCDD2"}]},{text:"",key:"total",key_style:["derecha"],key_fillColor:[{cond:"=",value:0,resultado:"#FFCDD2"}]}]),a=(0,f.x)({data:t,config:a})):this.detallado?a.table.body.push([{text:"No Hay Stock en esta Unidad.",style:["centrado","negrita"],margin:[0,5]}]):a.table.body.push([{text:"No Hay Stock en esta Unidad.",style:["centrado","negrita"],margin:[0,5],colSpan:5},"","","",""]),this.pdf.content.push(a)})):this.pdf.content.push({text:"No Hay Stock para mostrar",style:["negrita","centrado","subrayado"],fontSize:16})},async generarPDF(){try{this.mostrarLoading({titulo:"Preparando PDF..."});let e=[...await this.buscarAreaFiltros({filtro:{farmacia:!0},populate:"no",select:"area"})];for(let t=0;t<this.pdfTemp.areas.length;t++){let a=e.find((e=>e.id===this.pdfTemp.areas[t])).area;this.data[a]=[]}for(let t=0;t<this.pdfTemp.areas.length;t+=10){let e=await this.buscarStockAreas({areas:this.pdfTemp.areas.slice(t,t+10),insumos:this.pdfTemp.insumos,procedencias:this.pdfTemp.procedencias,noDetalle:!this.pdfTemp.detalle});if(!e)return this.mostrarError({errores:["Problema al generar el PDF.\nRe-intente con el boton 'MOSTRAR PDF'.","Si el problema persiste luego de Recargar la pagina, avise a Informatica de la Secretaria de Salud."],titulo:"PDF"});e=e.reduce(((e,t)=>((e[t.areaDB]=e[t.areaDB]||[]).push(t),e)),{}),this.data={...this.data,...e}}await this.modificarPdf(),this.borrarPdfTemp(),await(0,f.o)(this.pdf,`${this.pdf.info.title}.pdf`,this.descarga)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (generarPDF)"}),!1}finally{this.ocultarLoading()}}}},y=p,g=a(1001),m=(0,g.Z)(y,c,u,!1,null,null,null),b=m.exports},9592:function(e,t,a){a.d(t,{dd:function(){return n},o:function(){return d},x:function(){return s}});a(7658);var o=a(361),r=a.n(o),l=a(1566),i=a.n(l);if(void 0==i().vfs){const e=a(7920);i().vfs=e.pdfMake.vfs}i().tableLayouts={TituloDatos:{hLineWidth:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e,t){return 0===e||e===t.table.widths.length?2:1},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}},TituloSimple:{hLineWidth:function(e,t){return 0===e?0:e<=t.table.headerRows?2:1},hLineColor:function(e,t){return e<=t.table.headerRows||e===t.table.body.length?"black":"gray"},vLineWidth:function(e){return 0},fillColor:function(e,t,a){return e<t.table.headerRows?null:t.table.headerRows%2===0?e%2===0?"white":"#EEEEEE":e%2===0?"#EEEEEE":"white"}}};const n={info:{title:"TITULO",author:"Secretaria de Salud"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,130,30,30],images:{muni_logo:`${window.location.origin}/static/img/logo-64x64.png`,muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`,muni_frase:`${window.location.origin}/static/img/MuniFloreciendo-800x465.png`},header:()=>[],footer:()=>[],content:[],defaultStyle:{fontSize:11},styles:{margenTabla:{margin:[0,5,0,15]},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},negrita:{bold:!0},subrayado:{decoration:"underline"},cursiva:{italics:!0}}},s=function({config:e,data:t}){let a=r()(e),o=r()(a.table.body[a.table.body.length-1]);return t?.forEach((function(e){let t=[];o.forEach((function(a){if("undefined"!==typeof e[a.key]&&null!==e[a.key]){let o={text:e[a.key].toLocaleString("es-AR"),style:a.key_style};a.key_fillColor&&a.key_fillColor.forEach((t=>{let r=t.value??e[t.property];switch(t.multiple&&(r*=t.multiple),t.cond){case"=":e[a.key]===r&&(o.fillColor=t.resultado);break;case">":e[a.key]>r&&(o.fillColor=t.resultado);break;case"<":e[a.key]<r&&(o.fillColor=t.resultado);break;case"!=":e[a.key]!==r&&(o.fillColor=t.resultado);break;case"existe":r&&(o.fillColor=t.resultado);break}})),t.push(o)}else t.push({text:`${a.fillEmpty??"---"}`,style:"centrado"})})),a.table.body.push(t)})),a},d=async function(e,t,a){let o=e||{content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};navigator.userAgent.indexOf("Edge")>=0||"true"==a?(await i().createPdf(o).download(t,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):i().createPdf(o).open({},window)}}}]);