"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[429],{6404:function(e,t,a){a.d(t,{Z:function(){return c}});var i=function(){var e=this,t=e._self._c;return e.field.array?t("span",[e.field.object?t("span",e._l(e._get(e.props.item,e.field.ruta),(function(a,i){return t("code",{key:`${e.field.text}-${i}`,attrs:{STYLE:"margin:4px"}},[e.field.keyShow?t("span",[e._v(e._s(e.field.date?e.mostrarFecha(a[e.field.keyShow],e.field.time):a[e.field.keyShow]||"0"==a[e.field.keyShow]?a[e.field.keyShow]:"S/D"))]):t("span",e._l(a,(function(r,s,n){return t("span",{key:`${e.field.text}-${i}-${s}`},[e._v(e._s(s)+": "),t("kbd",[e._v(e._s(isNaN(r)&&"Invalid Date"!==e.mostrarFecha(r,e.field.time)?e.mostrarFecha(r,e.field.time)||"S/D":r||"0"==r?r:"S/D"))]),n!=Object.keys(a).length-1?t("span",[e._v(e._s("\n"))]):e._e()])})),0)])})),0):t("span",e._l(e._get(e.props.item,e.field.ruta),(function(a,i){return t("code",{key:`${e.field.text}-${i}`,attrs:{STYLE:"margin:4px"}},[e._v(e._s(e.field.date?e.mostrarFecha(a,e.field.time):a||"0"==a?a:"S/D"))])})),0)]):e.field.object?t("span",[t("code",{attrs:{STYLE:"margin:4px"}},[e.field.keyShow?t("span",[e._v(e._s(e.field.date?e.mostrarFecha(e._get(e.props.item,e.field.ruta)[e.field.keyShow],e.field.time):e._get(e.props.item,e.field.ruta)[e.field.keyShow]||"0"==e._get(e.props.item,e.field.ruta)[e.field.keyShow]?e._get(e.props.item,e.field.ruta)[e.field.keyShow]:"--------"))]):t("span",e._l(e._get(e.props.item,e.field.ruta),(function(a,i,r){return t("span",{key:`${e.field.text}-${i}`},[e._v(e._s(i)+": "),t("kbd",[e._v(e._s(isNaN(a)&&"Invalid Date"!==e.mostrarFecha(a,e.field.time)?`${e.mostrarFecha(a,e.field.time)}`||"S/D":a||"0"==a?`${a}`:"S/D"))]),r!=Object.keys(e._get(e.props.item,e.field.ruta)).length-1?t("span",[e._v(e._s("\n"))]):e._e()])})),0)])]):t("span",{style:""+(e.field.numeric&&e._get(e.props.item,e.field.ruta)<0?"color: red;":"")},[e._v(e._s(e.field.date?e.mostrarFecha(e.props.item[e.field.ruta],e.field.time):e.field.boolean?""+(e._get(e.props.item,e.field.ruta)&&"false"!=e._get(e.props.item,e.field.ruta)&&"0"!=e._get(e.props.item,e.field.ruta)?"Si":"No"):e._get(e.props.item,e.field.ruta)||"0"==e._get(e.props.item,e.field.ruta)?e._get(e.props.item,e.field.ruta).toLocaleString("es-AR"):"--------"))])},r=[],s={name:"body-data-table-dinamic",props:["props","field"]},n=s,o=a(1001),l=(0,o.Z)(n,i,r,!1,null,null,null),c=l.exports},3718:function(e,t,a){a.d(t,{Z:function(){return g}});var i=a(7416),r=a(8956),s=a(4791),n=a(4694),o=a(683),l=a(9456),c=function(){var e=this,t=e._self._c;return t(l.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(s.Z,{model:{value:e.panel,callback:function(t){e.panel=t},expression:"panel"}},[t(n.Z,{staticClass:"v-expansion-panel-header--center v-expansion-panel-header--background-cuarto",scopedSlots:e._u([{key:"header",fn:function(){return[e._v("Filtro Avanzado")]},proxy:!0}])},[t(r.Z,[t(l.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e.areasFiltro?t(o.Z,{attrs:{xs12:"","px-3":""}},[t(i.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"cuarto lighten-5","item-value":"id","item-text":"area",items:e.areasFiltro,label:"Farmacia","prepend-icon":"fa-house-medical-flag",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.areas=[]))}},model:{value:e.filtro.areas,callback:function(t){e.$set(e.filtro,"areas",t)},expression:"filtro.areas"}})],1):e._e(),e.insumos?t(o.Z,{attrs:{xs12:"","px-3":""}},[t(i.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"cuarto lighten-5","item-value":"id","item-text":"nombreC",items:e.insumosDB,label:"Insumos (Opcional)","prepend-icon":"fa-solid fa-pills",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.insumos=[]))}},model:{value:e.filtro.insumos,callback:function(t){e.$set(e.filtro,"insumos",t)},expression:"filtro.insumos"}})],1):e._e(),e.procedencia?t(o.Z,{attrs:{xs12:"","px-3":""}},[t(i.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"cuarto lighten-5",items:e.ingresoProcedencia,label:"Procedencia (Opcional)","prepend-icon":"trip_origin",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.procedencias=[]))}},model:{value:e.filtro.procedencias,callback:function(t){e.$set(e.filtro,"procedencias",t)},expression:"filtro.procedencias"}})],1):e._e()],1)],1)],1)],1)],1)},d=[],u=a(629),p={name:"component-filtro-avanzado",props:["filtro","areasFiltro","insumos","procedencia"],data:()=>({panel:[],insumosDB:[]}),computed:{...(0,u.rn)("farmacia",["ingresoProcedencia"])},async created(){this.insumos&&(this.insumosDB=await this.buscarInsumosFiltro(this.insumos))},methods:{...(0,u.nv)("farmacia",["buscarInsumosFiltro"])}},f=p,h=a(1001),m=(0,h.Z)(f,c,d,!1,null,null,null),g=m.exports},3866:function(e,t,a){a.r(t),a.d(t,{default:function(){return $}});var i=a(8469),r=a(7416),s=a(6194),n=a(8956),o=a(2353),l=a(9418),c=a(6530),d=a(7352),u=a(108),p=a(683),f=a(3667),h=a(9456),m=a(6446),g=a(8143),x=a(4618),b=function(){var e=this,t=e._self._c;return t(c.Z,{attrs:{fluid:"","grid-list-xs":""}},[t(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[t(p.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(n.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(o.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Gestion de Farmacia ======")])],1)],1)],1),t(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(p.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",cuarto:"","darken-1":""}},[t(p.Z,{attrs:{"px-3":""}},[t(f.Z,{attrs:{medium:"",color:"white",left:""}},[e._v("medication")]),t("span",{staticClass:"title white--text"},[e._v("Farmacia / Stock")])],1),t(g.Cl),t(s.Z,{attrs:{fab:"",small:"",color:"primary darken-2"},on:{click:function(t){return e.retroceder()}}},[t(f.Z,[e._v("far fa-arrow-alt-circle-left")])],1)],1),t(n.Z,{staticClass:"elevation-6",attrs:{color:"grey lighten-2"}},[t(o.ZB,{staticClass:"px-0"},[t(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[t(p.Z,{attrs:{xs12:"","px-3":""}},[t(n.Z,{staticClass:"grey lighten-3"},[t(h.Z,{attrs:{"justify-center":"",row:"",wrap:""},on:{keypress:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.recargarDataTable(e.filtro)}}},[t(p.Z,{attrs:{xs12:"",md10:"","px-3":"","my-3":""}},[t("componentFiltroAvanzado",{attrs:{filtro:e.filtro,areasFiltro:e.areasFiltro,insumos:{select:"nombre descripcion nombreC"},procedencia:!0}})],1)],1),t(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(s.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.recargarDataTable(e.filtro)}}},[t(f.Z,{attrs:{medium:"",left:""}},[e._v("search")]),e._v(" Buscar Stock")],1),t(u.Z,{staticClass:"hidden-xs-only mx-4 my-1 black",attrs:{vertical:""}}),t(s.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporte({detalle:!0})}}},[t(f.Z,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Stock Detallado PDF")],1),t(u.Z,{staticClass:"hidden-xs-only mx-4 my-1 black",attrs:{vertical:""}}),t(s.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporte()}}},[t(f.Z,{attrs:{medium:"",left:""}},[e._v("fa-solid fa-file-pdf")]),e._v(" Stock PDF")],1)],1)],1)],1)],1)],1)],1)],1),t(p.Z,{attrs:{"pa-1":"","ma-1":"",xs12:"",cuarto:"","lighten-1":""}},[t(n.Z,{staticClass:"elevation-6"},[t(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[t(p.Z,{attrs:{"px-3":""}},[t(f.Z,{attrs:{medium:"",color:"white",left:""}},[e._v("fa-solid fa-warehouse")]),t("span",{staticClass:"title white--text"},[e._v("Stock de Insumos")])],1),t(g.Cl)],1),t(l.Z,[t(p.Z,{attrs:{xs12:"",sm6:"",md4:"","px-2":""}},[t(x.h,{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":"",clearable:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),t(g.Cl),t(p.Z,{attrs:{xs12:"",sm6:"",md4:"","px-2":""}},[t(r.Z,{staticClass:"capitalizar",attrs:{items:e.dataTableSelect,label:"Mostrar","prepend-icon":"event",color:"cuarto","background-color":"cuarto lighten-5",clearable:""},on:{"click:clear":function(t){e.$nextTick((()=>e.dataTableSelected="Todos"))}},model:{value:e.dataTableSelected,callback:function(t){e.dataTableSelected=t},expression:"dataTableSelected"}})],1)],1),t(d.Z,{staticClass:"elevation-6",staticStyle:{"table-layout":"fixed"},attrs:{headers:e.headers,items:e.dataTableFilter,"item-key":"_id",pagination:e.paginacion,"rows-per-page-items":[5,10,25,50],loading:e.loading.estado,search:e.search},on:{"update:pagination":function(t){e.paginacion=t}},scopedSlots:e._u([{key:"no-results",fn:function(){return[t(i.Z,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[e._v(' No se encontraron resultados para "'+e._s(e.search)+'". ')])]},proxy:!0},{key:"no-data",fn:function(){return[t(i.Z,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[e._v(" No hay datos para mostrar. ")])]},proxy:!0},{key:"items",fn:function(a){return[t("tr",{class:e.backgroundClass(a),staticStyle:{cursor:"pointer"},on:{click:function(e){a.expanded=!a.expanded}}},e._l(e.headersDinamics,(function(e){return t("td",{key:e.text,class:e.class},[t("bodyDataTableDinamic",{attrs:{props:a,field:e}})],1)})),0)]}},{key:"expand",fn:function(a){return[t(n.Z,{attrs:{flat:""}},[e._l(a.item.detalle,(function(i,r){return[0!=r?t(u.Z,{key:`${a.item._id}-${r}`,staticStyle:{"border-width":"2px 0px 0px 0px"},attrs:{color:"black"}}):e._e(),t(h.Z,{key:`${a.item._id}-${r}`,class:e.detalleColors(i,r),attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(p.Z,{attrs:{xs12:"",sm3:""}},[t(o.ZB,{staticClass:"px-2 py-1"},[e._v("Procedencia: "+e._s(i.procedencia?i.procedencia:"S/D"))])],1),t(p.Z,{attrs:{xs12:"",sm3:""}},[t(o.ZB,{class:"px-2 py-1 "+(i.expirado?"font-weight-black":""+(i.porExpirar?"font-weight-bold":""))},[e._v("Lote: "+e._s(i.lote?i.lote:"S/D"))])],1),t(p.Z,{attrs:{xs12:"",sm3:""}},[t(o.ZB,{class:"text-sm-center px-2 py-1 "+(i.expirado?"font-weight-black":""+(i.porExpirar?"font-weight-bold":""))},[e._v("Caduca: "+e._s(i.vencimiento?i.vencimiento:"S/D"))])],1),t(p.Z,{attrs:{xs12:"",sm3:""}},[t(o.ZB,{staticClass:"text-sm-right font-weight-bold px-2 py-1"},[e._v("Cantidad: "+e._s(i.cantidad?i.cantidad.toLocaleString("es-AR"):"S/D"))])],1)],1)]}))],2)]}}])},[t(m.Z,{attrs:{color:"blue",indeterminate:""}})],1)],1)],1)],1)],1)},y=[],v=a(629),_=a(6404),k=a(3718),w={name:"farmaciaStockBuscar",components:{bodyDataTableDinamic:_.Z,componentFiltroAvanzado:k.Z},data:()=>({areasFiltro:[],dataTable:[],dataTableSelected:"Todos",dataTableSelect:["Todos","Por Vencer","Vencidos"],filtro:{areas:[],insumos:[],procedencias:[]},ultimoFiltro:{},search:"",paginacion:{sortBy:"areaDB",descending:!1,rowsPerPage:10,page:1},headers:[{text:"Area",value:"areaDB",align:"left",class:"text-xs-left",width:"30%",ruta:"areaDB"},{text:"Categoria",value:"categoriaDB",align:"left",class:"text-xs-left",width:"30%",ruta:"categoriaDB"},{text:"Insumo",value:"insumoDB",align:"left",class:"text-xs-left",width:"30%",ruta:"insumoDB"},{text:"Total",value:"total",align:"left",class:"text-xs-right",width:"10%",ruta:"total"}]}),computed:{...(0,v.rn)(["loading","persona","hoy"]),headersDinamics(){return[...this.headers.filter((e=>!0!==e.ignore))]},dataTableFilter(){return this.dataTable.filter((e=>"Todos"===this.dataTableSelected||(!("Por Vencer"!==this.dataTableSelected||!e.total_porExpirar)||(!("Vencidos"!==this.dataTableSelected||!e.total_expirado)||void 0))))}},watch:{dataTableFilter(){this.paginacion.page>Math.ceil(this.dataTableFilter.length/this.paginacion.rowsPerPage)&&(this.paginacion.page=1)}},async created(){let e=await this.buscarAreaFiltros({filtro:{farmacia:!0},populate:"no",select:"area"});if(this.persona.farmacia.general?.stock||this.persona.farmacia.general?.reportes||this.persona.farmacia.general?.admin)this.areasFiltro=e,this.filtro.areas=e.map((e=>e.id));else{let t=[];this.persona.farmacia?.stock&&(t=[...t,...this.persona.farmacia.stock]),this.persona.farmacia?.gestion&&(t=[...t,...this.persona.farmacia.gestion]),t=[...new Set(t)],this.areasFiltro=await this.filtrarArrayParaSelectsDisabled({arraySelects:e,arrayEnable:t,propCompare:"_id"}),this.filtro.areas=t}await this.recargarDataTable(this.filtro)},methods:{...(0,v.OI)(["mostrarError","mostrarDialogIframe"]),...(0,v.nv)(["retroceder","routerResolve","filtrarArrayParaSelectsDisabled"]),...(0,v.nv)("main_areas",["buscarAreaFiltros"]),...(0,v.nv)("farmacia",["buscarStockAreas"]),detalleColors(e,t){try{if(e){let t={color:"grey",luz:"lighten",intensidad:4,subrayado:""};return e.expirado?(t.color="red",t.intensidad=2):e.porExpirar&&(t.color="orange",t.intensidad=3),`${t.color} ${t.luz}-${t.intensidad}`}return""}catch(a){return""}},backgroundClass(e){if(!e.item)return"";try{let t={color:"green",intensidad:"lighten-4",subrayado:"",negrita:""};return 0===e.item.total?(t.color="red",t.intensidad="lighten-1",t.subrayado="table-row--subrayado",t.negrita="table-row--negrita"):e.item.detalle.some((e=>!0===e.expirado))?(t.color="red",t.intensidad="lighten-2",t.subrayado="table-row--subrayado",t.negrita="table-row--negrita"):e.item.detalle.some((e=>!0===e.porExpirar))?(t.color="orange",t.intensidad="lighten-3",t.subrayado="",t.negrita=""):e.item.total<=e.item.cant_min?(t.color="orange",t.intensidad="lighten-1",t.subrayado="table-row--subrayado",t.negrita="table-row--negrita"):e.item.total<=1.5*e.item.cant_min&&(t.color="yellow",t.intensidad="lighten-3",t.subrayado="",t.negrita=""),e.expanded&&(t.color="cyan",t.intensidad="lighten-4"),`background-color: ${t.color} ${t.intensidad} ${t.subrayado} ${t.negrita}`}catch(t){return""}},async recargarDataTable(e){if(e){let t=await this.buscarStockAreas(e);t&&(this.dataTable=t,this.ultimoFiltro=this._cloneDeep(e))}else this.dataTable=await this.buscarStockAreas(this.ultimoFiltro)},async reporte(e){if(this.filtro.areas.length>0){localStorage.setItem("pdfTemp",JSON.stringify({...this.filtro,...e}));let t=await this.routerResolve({name:"FarmaciaStockImprimir",query:{descarga:!1}});this.mostrarDialogIframe({src:t.href,titulo_name:`Farmacia Stock${e?.detalle?" Detallado":""} ${this.hoy}`})}else this.mostrarError({errores:"",mensaje:"Complete por lo menos con una Farmacia para el reporte.",titulo:"Valores Requeridos."})}}},Z=w,S=a(1001),C=(0,S.Z)(Z,b,y,!1,null,null,null),$=C.exports},4791:function(e,t,a){a.d(t,{Z:function(){return o}});var i=a(5721),r=a(21),s=a(5530),n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},o=(0,s.Z)(i.Z,(0,r.J)("expansionPanel")).extend({name:"v-expansion-panel",provide:function(){return{expansionPanel:this}},props:{disabled:Boolean,readonly:Boolean,expand:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,value:{type:[Number,Array],default:function(){return null}}},data:function(){return{items:[],open:[]}},computed:{classes:function(){return n({"v-expansion-panel--focusable":this.focusable,"v-expansion-panel--popout":this.popout,"v-expansion-panel--inset":this.inset},this.themeClasses)}},watch:{expand:function(e){var t=-1;if(!e){var a=this.open.reduce((function(e,t){return t?e+1:e}),0),i=Array(this.items.length).fill(!1);1===a&&(t=this.open.indexOf(!0)),t>-1&&(i[t]=!0),this.open=i}this.$emit("input",e?this.open:t>-1?t:null)},value:function(e){this.updateFromValue(e)}},mounted:function(){null!==this.value&&this.updateFromValue(this.value)},methods:{updateFromValue:function(e){if(!Array.isArray(e)||this.expand){var t=Array(this.items.length).fill(!1);"number"===typeof e?t[e]=!0:null!==e&&(t=e),this.updatePanels(t)}},updatePanels:function(e){this.open=e;for(var t=0;t<this.items.length;t++)this.items[t].toggle(e&&e[t])},panelClick:function(e){for(var t=this.expand?this.open.slice():Array(this.items.length).fill(!1),a=0;a<this.items.length;a++)this.items[a]._uid===e&&(t[a]=!this.open[a],!this.expand&&this.$emit("input",t[a]?a:null));this.updatePanels(t),this.expand&&this.$emit("input",t)},register:function(e){var t=this.items.push(e)-1;null!==this.value&&this.updateFromValue(this.value),e.toggle(!!this.open[t])},unregister:function(e){var t=this.items.findIndex((function(t){return t._uid===e._uid}));this.items.splice(t,1),this.open.splice(t,1)}},render:function(e){return e("ul",{staticClass:"v-expansion-panel",class:this.classes},this.$slots.default)}})},4694:function(e,t,a){var i=a(2482),r=a(6815),s=a(4735),n=a(8197),o=a(21),l=a(9524),c=a(5530),d=a(8219);function u(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}t["Z"]=(0,c.Z)(r.Z,s.Z,n.Z,(0,o.f)("expansionPanel","v-expansion-panel-content","v-expansion-panel")).extend({name:"v-expansion-panel-content",props:{disabled:Boolean,readonly:Boolean,expandIcon:{type:String,default:"$vuetify.icons.expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{height:"auto"}},computed:{containerClasses:function(){return{"v-expansion-panel__container--active":this.isActive,"v-expansion-panel__container--disabled":this.isDisabled}},isDisabled:function(){return this.expansionPanel.disabled||this.disabled},isReadonly:function(){return this.expansionPanel.readonly||this.readonly}},beforeMount:function(){this.expansionPanel.register(this),"undefined"!==typeof this.value&&(0,d.Kd)("v-model has been deprecated",this)},beforeDestroy:function(){this.expansionPanel.unregister(this)},methods:{onKeydown:function(e){13===e.keyCode&&this.$el===document.activeElement&&this.expansionPanel.panelClick(this._uid)},onHeaderClick:function(){this.isReadonly||this.expansionPanel.panelClick(this._uid)},genBody:function(){return this.$createElement("div",{ref:"body",class:"v-expansion-panel__body",directives:[{name:"show",value:this.isActive}]},this.showLazyContent(this.$slots.default))},genHeader:function(){var e=[].concat(u(this.$slots.header||[]));return this.hideActions||e.push(this.genIcon()),this.$createElement("div",{staticClass:"v-expansion-panel__header",directives:[{name:"ripple",value:this.ripple}],on:{click:this.onHeaderClick}},e)},genIcon:function(){var e=this.$slots.actions||[this.$createElement(l.Z,this.expandIcon)];return this.$createElement("transition",{attrs:{name:"fade-transition"}},[this.$createElement("div",{staticClass:"v-expansion-panel__header__icon",directives:[{name:"show",value:!this.isDisabled}]},e)])},toggle:function(e){var t=this;e&&(this.isBooted=!0),this.$nextTick((function(){return t.isActive=e}))}},render:function(e){return e("li",{staticClass:"v-expansion-panel__container",class:this.containerClasses,attrs:{tabindex:this.isReadonly||this.isDisabled?null:0,"aria-expanded":Boolean(this.isActive)},on:{keydown:this.onKeydown}},[this.$slots.header&&this.genHeader(),e(i.Fx,[this.genBody()])])}})}}]);