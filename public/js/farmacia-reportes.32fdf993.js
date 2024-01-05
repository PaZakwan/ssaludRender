"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[7237],{9301:function(e,t,a){a.d(t,{Z:function(){return p}});var n=a(6961),i=a(5084),r=a(4618),s=function(){var e=this,t=e._self._c;return t(i.Z,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:a}){return[t(r.h,e._g({attrs:{clearable:!e.soloLect&&!!e.clear,"background-color":e.soloLect?`${e.color} lighten-2`:`${e.color} lighten-5`,label:e.label,"prepend-icon":e.prepend,readonly:"",color:`${e.color} darken-3`,rules:e.req?e.validate:[]},on:{"click:clear":function(t){return e.$emit("input","")}},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}},a))]}}]),model:{value:e.menufecha1,callback:function(t){e.menufecha1=t},expression:"menufecha1"}},[t(n.Z,{attrs:{readonly:e.soloLect,"allowed-dates":e.allowedDates,min:e.fecMin,max:e.fecMax,color:`${e.color} darken-3`,"header-color":`${e.color} darken-1`,locale:"mx"},on:{input:function(t){e.menufecha1=!1,e.$emit("input",t)}},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}})],1)},o=[],l={name:"date-select",props:["value","label","icon","color","soloLectura","requerido","min","max","filtro","clearable"],data(){return{menufecha1:!1,validate:[e=>e?""===e.trim()?"Este campo es requerido.":!(e&&e.length<10)||"Ingrese fecha valida (AAAA-MM-DD).":"Este campo es requerido."]}},computed:{fecha(){return this.value},soloLect(){return this.soloLectura||!1},prepend(){return this.icon||"event"},req(){return this.requerido||!1},clear(){return this.clearable||!1},fecMin(){return"-1"===this.min?new Date((new Date).setFullYear((new Date).getFullYear()-1)).toISOString().substring(0,10):this.min?this.min:void 0},fecMax(){return"+1"===this.max?new Date((new Date).setFullYear((new Date).getFullYear()+1)).toISOString().substring(0,10):this.max?this.max:void 0},restriction(){return this.filtro||[]}},methods:{allowedDates(e){return!this.restriction.includes(new Date(e).getUTCDay())}}},c=l,u=a(1001),d=(0,u.Z)(c,s,o,!1,null,null,null),p=d.exports},1399:function(e,t,a){a.d(t,{Z:function(){return v}});var n=a(7416),i=a(8956),r=a(4791),s=a(4694),o=a(683),l=a(9456),c=function(){var e=this,t=e._self._c;return t(l.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(r.Z,{model:{value:e.panel,callback:function(t){e.panel=t},expression:"panel"}},[t(s.Z,{staticClass:"v-expansion-panel-header--center v-expansion-panel-header--background-cuarto",scopedSlots:e._u([{key:"header",fn:function(){return[e._v("Filtro Avanzado")]},proxy:!0}])},[t(i.Z,[t(l.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e.areasFiltro?t(o.Z,{attrs:{xs12:"","px-3":""}},[t(n.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"cuarto lighten-5","item-value":"id","item-text":"area",items:e.areasFiltro,label:"Farmacia","prepend-icon":"fa-house-medical-flag",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.areas=[]))}},model:{value:e.filtro.areas,callback:function(t){e.$set(e.filtro,"areas",t)},expression:"filtro.areas"}})],1):e._e(),e.insumos?t(o.Z,{attrs:{xs12:"","px-3":""}},[t(n.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"cuarto lighten-5","item-value":"id","item-text":"nombreC",items:e.insumosDB,label:"Insumos (Opcional)","prepend-icon":"fa-solid fa-pills",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.insumos=[]))}},model:{value:e.filtro.insumos,callback:function(t){e.$set(e.filtro,"insumos",t)},expression:"filtro.insumos"}})],1):e._e(),e.procedencia?t(o.Z,{attrs:{xs12:"","px-3":""}},[t(n.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"cuarto lighten-5",items:e.optionsJsonFarmacia?.insumo_procedencia||[],label:"Procedencia (Opcional)","prepend-icon":"trip_origin",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.procedencias=[]))}},model:{value:e.filtro.procedencias,callback:function(t){e.$set(e.filtro,"procedencias",t)},expression:"filtro.procedencias"}})],1):e._e()],1)],1)],1)],1)],1)},u=[],d=a(629),p={name:"component-filtro-avanzado",props:["filtro","areasFiltro","insumos","procedencia"],data:()=>({panel:[],insumosDB:[],optionsJsonFarmacia:{}}),computed:{},async created(){this.insumos&&(this.insumosDB=await this.buscarInsumosFiltro(this.insumos)),this.procedencia&&(this.optionsJsonFarmacia=await this.returnOptionsJSON({key:"farmacia",opcion:"base"}))},methods:{...(0,d.nv)(["returnOptionsJSON"]),...(0,d.nv)("farmacia",["buscarInsumosFiltro"])}},h=p,f=a(1001),m=(0,f.Z)(h,c,u,!1,null,null,null),v=m.exports},7480:function(e,t,a){a.r(t),a.d(t,{default:function(){return y}});var n=a(6194),i=a(8956),r=a(2353),s=a(6530),o=a(683),l=a(3667),c=a(9456),u=a(8143),d=function(){var e=this,t=e._self._c;return t(s.Z,{attrs:{fluid:"","grid-list-xs":""}},[t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[t(o.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(i.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(r.ZB,{staticClass:"px-0 text-uppercase"},[e._v("====== Gestion de Farmacia ======")])],1)],1)],1),t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(o.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",cuarto:"","darken-1":""}},[t(o.Z,{attrs:{"px-3":""}},[t(l.Z,{attrs:{medium:"",color:"white",left:""}},[e._v("medication")]),t("span",{staticClass:"title white--text"},[e._v("Farmacia / Reportes")])],1),t(u.Cl),t(n.Z,{attrs:{fab:"",small:"",color:"primary darken-2"},on:{click:function(t){return e.retroceder()}}},[t(l.Z,[e._v("far fa-arrow-alt-circle-left")])],1)],1),t(i.Z,{staticClass:"elevation-6",attrs:{color:"grey lighten-2"}},[t(r.ZB,{staticClass:"px-0"},[t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[t(o.Z,{attrs:{xs12:"","px-3":""}},[t(i.Z,{staticClass:"grey lighten-3"},[t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(o.Z,{attrs:{xs12:"",sm6:"",md3:"","px-3":""}},[t("dateSelect",{staticClass:"capitalizar",attrs:{value:e.filtro.desde,"background-color":"cuarto lighten-5",color:"cuarto",label:"Desde",icon:"today",max:e.filtro.hasta,requerido:"true"},model:{value:e.filtro.desde,callback:function(t){e.$set(e.filtro,"desde",t)},expression:"filtro.desde"}})],1),t(o.Z,{attrs:{xs12:"",sm6:"",md3:"","px-3":""}},[t("dateSelect",{staticClass:"capitalizar",attrs:{soloLectura:"true",value:e.filtro.hasta,"background-color":"cuarto lighten-5",color:"cuarto",label:"Hasta",icon:"event",min:e.filtro.desde,requerido:"true"},model:{value:e.filtro.hasta,callback:function(t){e.$set(e.filtro,"hasta",t)},expression:"filtro.hasta"}})],1),t(o.Z,{attrs:{xs12:"",md10:"","px-3":"","mb-3":""}},[t("componentFiltroAvanzado",{attrs:{filtro:e.filtro,areasFiltro:e.areasFiltro,insumos:{select:"nombre descripcion nombreC"},procedencia:!0}})],1)],1),t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(o.Z,{attrs:{xs12:"","px-3":"","py-1":""}},[t(n.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteGeneral()}}},[t(l.Z,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" General Detallado")],1)],1),t(o.Z,{attrs:{xs12:"","px-3":"","py-1":""}},[t(n.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"primary",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteStockTOTAL()}}},[t(l.Z,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Stock TOTAL del Sistema")],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)},p=[],h=a(629),f=a(9301),m=a(1399),v={name:"farmaciaReportes",components:{dateSelect:f.Z,componentFiltroAvanzado:m.Z},data:()=>({areasFiltro:[],filtro:{desde:"",hasta:"",areas:[],insumos:[],procedencias:[]}}),computed:{...(0,h.rn)(["loading","hoy","monthBefore"])},async created(){this.filtro.desde=this.monthBefore,this.filtro.hasta=this.hoy;let e=await this.buscarAreaFiltros({filtro:{farmacia:!0},populate:"no",select:"area"});this.areasFiltro=e},methods:{...(0,h.OI)(["mostrarError","mostrarDialogIframe"]),...(0,h.nv)(["retroceder","routerResolve"]),...(0,h.nv)("main",["buscarAreaFiltros"]),async reporteGeneral(){if(0<this.filtro.areas.length&&this.filtro.areas.length<=5){localStorage.setItem("pdfTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"FarmaciaReporteGeneralImprimir",query:{descarga:!1}});this.mostrarDialogIframe({src:e.href,titulo_name:`Farmacia Reporte General ${this.hoy}`})}else 0===this.filtro.areas?.length?this.mostrarError({mensaje:"Complete por lo menos con una Farmacia en el Filtro Avanzado para el reporte.",titulo:"Valores Requeridos."}):this.mostrarError({mensaje:"Como mucho acepta 5 (cinco) Farmacias en el Filtro Avanzado para el reporte.",titulo:"Valores."})},async reporteStockTOTAL(){localStorage.setItem("pdfTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"FarmaciaStockTotalImprimir",query:{descarga:!1}});this.mostrarDialogIframe({src:e.href,titulo_name:`Farmacia Stock Total ${this.hoy}`})}}},x=v,g=a(1001),b=(0,g.Z)(x,d,p,!1,null,null,null),y=b.exports},4791:function(e,t,a){a.d(t,{Z:function(){return o}});var n=a(5721),i=a(21),r=a(5530),s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},o=(0,r.Z)(n.Z,(0,i.J)("expansionPanel")).extend({name:"v-expansion-panel",provide:function(){return{expansionPanel:this}},props:{disabled:Boolean,readonly:Boolean,expand:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,value:{type:[Number,Array],default:function(){return null}}},data:function(){return{items:[],open:[]}},computed:{classes:function(){return s({"v-expansion-panel--focusable":this.focusable,"v-expansion-panel--popout":this.popout,"v-expansion-panel--inset":this.inset},this.themeClasses)}},watch:{expand:function(e){var t=-1;if(!e){var a=this.open.reduce((function(e,t){return t?e+1:e}),0),n=Array(this.items.length).fill(!1);1===a&&(t=this.open.indexOf(!0)),t>-1&&(n[t]=!0),this.open=n}this.$emit("input",e?this.open:t>-1?t:null)},value:function(e){this.updateFromValue(e)}},mounted:function(){null!==this.value&&this.updateFromValue(this.value)},methods:{updateFromValue:function(e){if(!Array.isArray(e)||this.expand){var t=Array(this.items.length).fill(!1);"number"===typeof e?t[e]=!0:null!==e&&(t=e),this.updatePanels(t)}},updatePanels:function(e){this.open=e;for(var t=0;t<this.items.length;t++)this.items[t].toggle(e&&e[t])},panelClick:function(e){for(var t=this.expand?this.open.slice():Array(this.items.length).fill(!1),a=0;a<this.items.length;a++)this.items[a]._uid===e&&(t[a]=!this.open[a],!this.expand&&this.$emit("input",t[a]?a:null));this.updatePanels(t),this.expand&&this.$emit("input",t)},register:function(e){var t=this.items.push(e)-1;null!==this.value&&this.updateFromValue(this.value),e.toggle(!!this.open[t])},unregister:function(e){var t=this.items.findIndex((function(t){return t._uid===e._uid}));this.items.splice(t,1),this.open.splice(t,1)}},render:function(e){return e("ul",{staticClass:"v-expansion-panel",class:this.classes},this.$slots.default)}})},4694:function(e,t,a){var n=a(2482),i=a(6815),r=a(4735),s=a(8197),o=a(21),l=a(9524),c=a(5530),u=a(8219);function d(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}t.Z=(0,c.Z)(i.Z,r.Z,s.Z,(0,o.f)("expansionPanel","v-expansion-panel-content","v-expansion-panel")).extend({name:"v-expansion-panel-content",props:{disabled:Boolean,readonly:Boolean,expandIcon:{type:String,default:"$vuetify.icons.expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{height:"auto"}},computed:{containerClasses:function(){return{"v-expansion-panel__container--active":this.isActive,"v-expansion-panel__container--disabled":this.isDisabled}},isDisabled:function(){return this.expansionPanel.disabled||this.disabled},isReadonly:function(){return this.expansionPanel.readonly||this.readonly}},beforeMount:function(){this.expansionPanel.register(this),"undefined"!==typeof this.value&&(0,u.Kd)("v-model has been deprecated",this)},beforeDestroy:function(){this.expansionPanel.unregister(this)},methods:{onKeydown:function(e){13===e.keyCode&&this.$el===document.activeElement&&this.expansionPanel.panelClick(this._uid)},onHeaderClick:function(){this.isReadonly||this.expansionPanel.panelClick(this._uid)},genBody:function(){return this.$createElement("div",{ref:"body",class:"v-expansion-panel__body",directives:[{name:"show",value:this.isActive}]},this.showLazyContent(this.$slots.default))},genHeader:function(){var e=[].concat(d(this.$slots.header||[]));return this.hideActions||e.push(this.genIcon()),this.$createElement("div",{staticClass:"v-expansion-panel__header",directives:[{name:"ripple",value:this.ripple}],on:{click:this.onHeaderClick}},e)},genIcon:function(){var e=this.$slots.actions||[this.$createElement(l.Z,this.expandIcon)];return this.$createElement("transition",{attrs:{name:"fade-transition"}},[this.$createElement("div",{staticClass:"v-expansion-panel__header__icon",directives:[{name:"show",value:!this.isDisabled}]},e)])},toggle:function(e){var t=this;e&&(this.isBooted=!0),this.$nextTick((function(){return t.isActive=e}))}},render:function(e){return e("li",{staticClass:"v-expansion-panel__container",class:this.containerClasses,attrs:{tabindex:this.isReadonly||this.isDisabled?null:0,"aria-expanded":Boolean(this.isActive)},on:{keydown:this.onKeydown}},[this.$slots.header&&this.genHeader(),e(n.Fx,[this.genBody()])])}})}}]);