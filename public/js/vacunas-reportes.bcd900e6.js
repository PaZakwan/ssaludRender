"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[799],{27720:(e,t,a)=>{a.d(t,{Z:()=>d});var o=a(46961),r=a(15084),n=a(74618),i=function(){var e=this,t=e._self._c;return t(r.Z,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:a}){return[t(n.h,e._g({attrs:{clearable:!e.soloLect&&!!e.clear,"background-color":e.soloLect?`${e.color} lighten-2`:`${e.color} lighten-5`,"prepend-icon":e.prepend,label:e.label,messages:e.msg,placeholder:e.holder,readonly:"",color:`${e.color} darken-3`,rules:e.req?e.validate:[]},on:{"click:clear":function(t){return e.$emit("input","")}},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}},a))]}}]),model:{value:e.menufecha1,callback:function(t){e.menufecha1=t},expression:"menufecha1"}},[t(o.Z,{attrs:{readonly:e.soloLect,"allowed-dates":e.allowedDates,min:e.fecMin,max:e.fecMax,color:`${e.color} darken-3`,"header-color":`${e.color} darken-1`,locale:"mx"},on:{input:function(t){e.menufecha1=!1,e.$emit("input",t)}},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}})],1)},s=[];const l={name:"date-select",props:["value","label","icon","color","soloLectura","requerido","min","max","filtro","clearable","messages","placeholder"],data(){return{menufecha1:!1,validate:[e=>e?""===e.trim()?"Este campo es requerido.":!(e&&e.length<10)||"Ingrese fecha valida (AAAA-MM-DD).":"Este campo es requerido."]}},computed:{fecha(){return this.value},soloLect(){return this.soloLectura||!1},prepend(){return this.icon||"event"},req(){return this.requerido||!1},clear(){return this.clearable||!1},msg(){return this.messages||""},holder(){return this.placeholder||""},fecMin(){return"-1"===this.min?new Date((new Date).setFullYear((new Date).getFullYear()-1)).toISOString().substring(0,10):this.min?this.min:void 0},fecMax(){return"+1"===this.max?new Date((new Date).setFullYear((new Date).getFullYear()+1)).toISOString().substring(0,10):this.max?this.max:void 0},restriction(){return this.filtro||[]}},methods:{allowedDates(e){return!this.restriction.includes(new Date(e).getUTCDay())}}},c=l;var u=a(1001),p=(0,u.Z)(c,i,s,!1,null,null,null);const d=p.exports},75288:(e,t,a)=>{a.d(t,{Z:()=>v});var o=a(67416),r=a(18956),n=a(84791),i=a(94694),s=a(60683),l=a(59456),c=function(){var e=this,t=e._self._c;return t(l.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(n.Z,{model:{value:e.panel,callback:function(t){e.panel=t},expression:"panel"}},[t(i.Z,{staticClass:"v-expansion-panel-header--center v-expansion-panel-header--background-cuarto",scopedSlots:e._u([{key:"header",fn:function(){return[e._v("Filtro Avanzado")]},proxy:!0}])},[t(r.Z,[t(l.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e.areasFiltro?t(s.Z,{attrs:{xs12:"","px-3":""}},[t(o.Z,{attrs:{clearable:"","background-color":"cuarto lighten-5","item-value":"id","item-text":"area",items:e.areasFiltro,label:"Vacunatorio","prepend-icon":"fa-house-medical-flag",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.areas=[]))}},model:{value:e.filtro.areas,callback:function(t){e.$set(e.filtro,"areas",t)},expression:"filtro.areas"}})],1):e._e(),e.insumos?t(s.Z,{attrs:{xs12:"","px-3":""}},[t(o.Z,{attrs:{clearable:"","background-color":"cuarto lighten-5","item-value":"id","item-text":"nombreC",items:e.insumosDB,label:"Vacunas (Opcional)","prepend-icon":"vaccines",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.insumos=[]))}},model:{value:e.filtro.insumos,callback:function(t){e.$set(e.filtro,"insumos",t)},expression:"filtro.insumos"}})],1):e._e(),e.procedencia?t(s.Z,{attrs:{xs12:"","px-3":""}},[t(o.Z,{attrs:{clearable:"","background-color":"cuarto lighten-5",items:e.optionsJsonVacunas?.insumo_procedencia||[],label:"Procedencia (Opcional)","prepend-icon":"trip_origin",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.procedencias=[]))}},model:{value:e.filtro.procedencias,callback:function(t){e.$set(e.filtro,"procedencias",t)},expression:"filtro.procedencias"}})],1):e._e(),e.vacunas_reportes?t(s.Z,{attrs:{xs12:"","px-3":""}},[t(o.Z,{attrs:{clearable:"","background-color":"cuarto lighten-5",items:e.optionsJsonVacunas?.vacunas_reportes||[],label:"Contar por separado (Opcional)","prepend-icon":"grain",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.opciones=[]))}},model:{value:e.filtro.opciones,callback:function(t){e.$set(e.filtro,"opciones",t)},expression:"filtro.opciones"}})],1):e._e()],1)],1)],1)],1)],1)},u=[],p=a(20629);const d={name:"vacunas-component-filtro-avanzado",props:["filtro","areasFiltro","insumos","procedencia","vacunas_reportes"],data:()=>({panel:[],insumosDB:[],optionsJsonVacunas:{}}),computed:{},async created(){this.insumos&&(this.insumosDB=await this.buscarInsumosFiltro(this.insumos)),(this.procedencia||this.vacunas_reportes)&&(this.optionsJsonVacunas=await this.returnOptionsJSON({key:"vacunas",opcion:"base"}))},methods:{...(0,p.nv)(["returnOptionsJSON"]),...(0,p.nv)("vacunas",["buscarInsumosFiltro"])}},h=d;var m=a(1001),f=(0,m.Z)(h,c,u,!1,null,null,null);const v=f.exports},89629:(e,t,a)=>{a.r(t),a.d(t,{default:()=>y});var o=a(66194),r=a(18956),n=a(32353),i=a(66530),s=a(60683),l=a(73667),c=a(59456),u=a(98143),p=function(){var e=this,t=e._self._c;return t(i.Z,{attrs:{fluid:"","grid-list-xs":""}},[t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[t(s.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(r.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(n.ZB,{staticClass:"px-0"},[e._v("====== GESTION DE VACUNAS ======")])],1)],1)],1),t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(s.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",cuarto:"","darken-1":""}},[t(s.Z,{attrs:{"px-3":""}},[t(l.Z,{attrs:{medium:"",color:"white",left:""}},[e._v("vaccines")]),t("span",{staticClass:"title white--text"},[e._v("Vacunas / Reportes")])],1),t(u.Cl),t(o.Z,{attrs:{fab:"",small:"",color:"primary darken-2"},on:{click:function(t){return e.retroceder()}}},[t(l.Z,[e._v("far fa-arrow-alt-circle-left")])],1)],1),t(r.Z,{staticClass:"elevation-6",attrs:{color:"grey lighten-2"}},[t(n.ZB,{staticClass:"px-0"},[t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[t(s.Z,{attrs:{xs12:"","px-3":""}},[t(r.Z,{staticClass:"grey lighten-3"},[t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(s.Z,{attrs:{xs12:"",sm6:"",md3:"","px-3":""}},[t("dateSelect",{staticClass:"capitalizar",attrs:{value:e.filtro.desde,"background-color":"cuarto lighten-5",color:"cuarto",label:"Desde",icon:"today",max:e.filtro.hasta,requerido:"true"},model:{value:e.filtro.desde,callback:function(t){e.$set(e.filtro,"desde",t)},expression:"filtro.desde"}})],1),t(s.Z,{attrs:{xs12:"",sm6:"",md3:"","px-3":""}},[t("dateSelect",{staticClass:"capitalizar",attrs:{value:e.filtro.hasta,"background-color":"cuarto lighten-5",color:"cuarto",label:"Hasta",icon:"event",min:e.filtro.desde,requerido:"true"},model:{value:e.filtro.hasta,callback:function(t){e.$set(e.filtro,"hasta",t)},expression:"filtro.hasta"}})],1),t(s.Z,{attrs:{xs12:"",md10:"","px-3":"","mb-3":""}},[t("componentFiltroAvanzado",{attrs:{filtro:e.filtro,areasFiltro:e.areasFiltro,insumos:{select:"nombre descripcion nombreC"},procedencia:!0,vacunas_reportes:!0}})],1)],1),t(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(s.Z,{attrs:{xs12:"","px-3":"","py-1":""}},[t(o.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteVacunaEtario()}}},[t(l.Z,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Vacuna Etario [Vacuna 1 max]")],1)],1),t(s.Z,{attrs:{xs12:"","px-3":"","py-1":""}},[t(o.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteNominal()}}},[t(l.Z,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Aplicaciones Nominal (CIPRES) [Vacunatorios 5 max]")],1)],1),t(s.Z,{attrs:{xs12:"","px-3":"","py-1":""}},[t(o.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteStockMovimiento()}}},[t(l.Z,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Stock Movimientos [Vacunatorios 5 max]")],1)],1),t(s.Z,{attrs:{xs12:"","px-3":"","py-1":""}},[t(o.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"primary",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteStockTotal()}}},[t(l.Z,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Stock TOTAL del Sistema")],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)},d=[],h=a(20629),m=a(75288),f=a(27720);const v={name:"vacunaReportes",components:{componentFiltroAvanzado:m.Z,dateSelect:f.Z},data:()=>({areasFiltro:[],filtro:{desde:"",hasta:"",areas:[],insumos:[],procedencias:[],opciones:[]}}),computed:{...(0,h.rn)(["loading","hoy","monthBefore"])},async created(){this.filtro.desde=this.monthBefore,this.filtro.hasta=this.hoy,this.areasFiltro=await this.buscarAreaFiltros({filtro:{vacunatorio:!0},populate:"no",select:"area"})},methods:{...(0,h.OI)(["mostrarError","mostrarDialogIframe"]),...(0,h.nv)(["retroceder","routerResolve"]),...(0,h.nv)("main",["buscarAreaFiltros"]),async reporteVacunaEtario(){if(0<this.filtro.insumos.length&&this.filtro.insumos.length<=1){localStorage.setItem("localStorageTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"VacunaReporteEtarioImprimir",query:{descarga:!1,descargaExcel:!0}});this.mostrarDialogIframe({src:e.href,titulo_name:`Vacuna Reporte Etario ${this.hoy}`})}else 0===this.filtro.insumos?.length?this.mostrarError({mensaje:"Complete por lo menos con una Vacuna en el Filtro Avanzado para el reporte.",titulo:"Valores Requeridos."}):this.mostrarError({mensaje:"Solo acepta una Vacuna por reporte en el Filtro Avanzado para el reporte.",titulo:"Valores."})},async reporteVacunatorioMensual(){return this.mostrarError({mensaje:"Se encuentra en etapa de Desarrollo.",titulo:"En DESARROLLO."})},async reporteNominal(){if(0<this.filtro.areas.length&&this.filtro.areas.length<=5){localStorage.setItem("localStorageTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"VacunaReporteNominalImprimir",query:{descarga:!1,descargaExcel:!1}});this.mostrarDialogIframe({src:e.href,titulo_name:`Vacuna Reporte Nominal ${this.hoy}`})}else 0===this.filtro.areas?.length?this.mostrarError({mensaje:"Complete por lo menos con un Vacunatorio en el Filtro Avanzado para el reporte.",titulo:"Valores Requeridos."}):this.mostrarError({mensaje:"Como mucho acepta 5 (cinco) Vacunatorios en el Filtro Avanzado para el reporte.",titulo:"Valores."})},async reporteNominalSelectNoCompleta(){return this.mostrarError({mensaje:"Se encuentra en etapa de Desarrollo.",titulo:"En DESARROLLO."})},async reporteStockMovimiento(){if(0<this.filtro.areas.length&&this.filtro.areas.length<=5){localStorage.setItem("localStorageTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"VacunaStockMovimientoImprimir",query:{descarga:!1}});this.mostrarDialogIframe({src:e.href,titulo_name:`Vacunatorio Movimientos ${this.hoy}`})}else 0===this.filtro.areas?.length?this.mostrarError({mensaje:"Complete por lo menos con un Vacunatorio en el Filtro Avanzado para el reporte.",titulo:"Valores Requeridos."}):this.mostrarError({mensaje:"Como mucho acepta 5 (cinco) Vacunatorios en el Filtro Avanzado para el reporte.",titulo:"Valores."})},async reporteStockTotal(){localStorage.setItem("localStorageTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"VacunaStockTotalImprimir",query:{descarga:!1}});this.mostrarDialogIframe({src:e.href,titulo_name:`Vacunatorio Stock Total ${this.hoy}`})}}},g=v;var x=a(1001),b=(0,x.Z)(g,p,d,!1,null,null,null);const y=b.exports},84791:(e,t,a)=>{a.d(t,{Z:()=>s});var o=a(75721),r=a(30021),n=a(45530),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};const s=(0,n.Z)(o.Z,(0,r.J)("expansionPanel")).extend({name:"v-expansion-panel",provide:function(){return{expansionPanel:this}},props:{disabled:Boolean,readonly:Boolean,expand:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,value:{type:[Number,Array],default:function(){return null}}},data:function(){return{items:[],open:[]}},computed:{classes:function(){return i({"v-expansion-panel--focusable":this.focusable,"v-expansion-panel--popout":this.popout,"v-expansion-panel--inset":this.inset},this.themeClasses)}},watch:{expand:function(e){var t=-1;if(!e){var a=this.open.reduce((function(e,t){return t?e+1:e}),0),o=Array(this.items.length).fill(!1);1===a&&(t=this.open.indexOf(!0)),t>-1&&(o[t]=!0),this.open=o}this.$emit("input",e?this.open:t>-1?t:null)},value:function(e){this.updateFromValue(e)}},mounted:function(){null!==this.value&&this.updateFromValue(this.value)},methods:{updateFromValue:function(e){if(!Array.isArray(e)||this.expand){var t=Array(this.items.length).fill(!1);"number"===typeof e?t[e]=!0:null!==e&&(t=e),this.updatePanels(t)}},updatePanels:function(e){this.open=e;for(var t=0;t<this.items.length;t++)this.items[t].toggle(e&&e[t])},panelClick:function(e){for(var t=this.expand?this.open.slice():Array(this.items.length).fill(!1),a=0;a<this.items.length;a++)this.items[a]._uid===e&&(t[a]=!this.open[a],!this.expand&&this.$emit("input",t[a]?a:null));this.updatePanels(t),this.expand&&this.$emit("input",t)},register:function(e){var t=this.items.push(e)-1;null!==this.value&&this.updateFromValue(this.value),e.toggle(!!this.open[t])},unregister:function(e){var t=this.items.findIndex((function(t){return t._uid===e._uid}));this.items.splice(t,1),this.open.splice(t,1)}},render:function(e){return e("ul",{staticClass:"v-expansion-panel",class:this.classes},this.$slots.default)}})},94694:(e,t,a)=>{a.d(t,{Z:()=>d});var o=a(22482),r=a(76815),n=a(54735),i=a(38197),s=a(30021),l=a(99524),c=a(45530),u=a(28219);function p(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}const d=(0,c.Z)(r.Z,n.Z,i.Z,(0,s.f)("expansionPanel","v-expansion-panel-content","v-expansion-panel")).extend({name:"v-expansion-panel-content",props:{disabled:Boolean,readonly:Boolean,expandIcon:{type:String,default:"$vuetify.icons.expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{height:"auto"}},computed:{containerClasses:function(){return{"v-expansion-panel__container--active":this.isActive,"v-expansion-panel__container--disabled":this.isDisabled}},isDisabled:function(){return this.expansionPanel.disabled||this.disabled},isReadonly:function(){return this.expansionPanel.readonly||this.readonly}},beforeMount:function(){this.expansionPanel.register(this),"undefined"!==typeof this.value&&(0,u.Kd)("v-model has been deprecated",this)},beforeDestroy:function(){this.expansionPanel.unregister(this)},methods:{onKeydown:function(e){13===e.keyCode&&this.$el===document.activeElement&&this.expansionPanel.panelClick(this._uid)},onHeaderClick:function(){this.isReadonly||this.expansionPanel.panelClick(this._uid)},genBody:function(){return this.$createElement("div",{ref:"body",class:"v-expansion-panel__body",directives:[{name:"show",value:this.isActive}]},this.showLazyContent(this.$slots.default))},genHeader:function(){var e=[].concat(p(this.$slots.header||[]));return this.hideActions||e.push(this.genIcon()),this.$createElement("div",{staticClass:"v-expansion-panel__header",directives:[{name:"ripple",value:this.ripple}],on:{click:this.onHeaderClick}},e)},genIcon:function(){var e=this.$slots.actions||[this.$createElement(l.Z,this.expandIcon)];return this.$createElement("transition",{attrs:{name:"fade-transition"}},[this.$createElement("div",{staticClass:"v-expansion-panel__header__icon",directives:[{name:"show",value:!this.isDisabled}]},e)])},toggle:function(e){var t=this;e&&(this.isBooted=!0),this.$nextTick((function(){return t.isActive=e}))}},render:function(e){return e("li",{staticClass:"v-expansion-panel__container",class:this.containerClasses,attrs:{tabindex:this.isReadonly||this.isDisabled?null:0,"aria-expanded":Boolean(this.isActive)},on:{keydown:this.onKeydown}},[this.$slots.header&&this.genHeader(),e(o.Fx,[this.genBody()])])}})}}]);