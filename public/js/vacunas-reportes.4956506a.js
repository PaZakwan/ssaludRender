"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[6249],{69006:(e,t,a)=>{a.d(t,{A:()=>p});var o=a(67926),r=a(11210),n=a(57e3),i=function(){var e=this,t=e._self._c;return t(r.A,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:a}){return[t(n.W,e._g({attrs:{clearable:!e.soloLect&&!!e.clear,"background-color":e.soloLect?`${e.color} lighten-2`:`${e.color} lighten-5`,"prepend-icon":e.prepend,label:e.label,messages:e.msg,placeholder:e.holder,readonly:"",color:`${e.color} darken-3`,rules:e.req?e.validate:[]},on:{"click:clear":function(t){return e.$emit("input","")}},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}},a))]}}]),model:{value:e.menufecha1,callback:function(t){e.menufecha1=t},expression:"menufecha1"}},[t(o.A,{attrs:{readonly:e.soloLect,"allowed-dates":e.allowedDates,min:e.fecMin,max:e.fecMax,color:`${e.color} darken-3`,"header-color":`${e.color} darken-1`,locale:"mx"},on:{input:function(t){e.menufecha1=!1,e.$emit("input",t)}},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}})],1)},s=[];const l={name:"date-select",props:["value","label","icon","color","soloLectura","requerido","min","max","filtro","clearable","messages","placeholder"],data(){return{menufecha1:!1,validate:[e=>e?""===e.trim()?"Este campo es requerido.":!(e&&e.length<10)||"Ingrese fecha valida (AAAA-MM-DD).":"Este campo es requerido."]}},computed:{fecha(){return this.value},soloLect(){return this.soloLectura||!1},prepend(){return this.icon||"event"},req(){return this.requerido||!1},clear(){return this.clearable||!1},msg(){return this.messages||""},holder(){return this.placeholder||""},fecMin(){return"-1"===this.min?new Date((new Date).setFullYear((new Date).getFullYear()-1)).toISOString().substring(0,10):this.min?this.min:void 0},fecMax(){return"+1"===this.max?new Date((new Date).setFullYear((new Date).getFullYear()+1)).toISOString().substring(0,10):this.max?this.max:void 0},restriction(){return this.filtro||[]}},methods:{allowedDates(e){return!this.restriction.includes(new Date(e).getUTCDay())}}},c=l;var u=a(81656),d=(0,u.A)(c,i,s,!1,null,null,null);const p=d.exports},63986:(e,t,a)=>{a.d(t,{A:()=>v});var o=a(28597),r=a(15852),n=a(83160),i=a(24496),s=a(41614),l=a(69155),c=function(){var e=this,t=e._self._c;return t(l.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(n.A,{model:{value:e.panel,callback:function(t){e.panel=t},expression:"panel"}},[t(i.A,{staticClass:"v-expansion-panel-header--center v-expansion-panel-header--background-cuarto",scopedSlots:e._u([{key:"header",fn:function(){return[e._v("Filtro Avanzado")]},proxy:!0}])},[t(r.A,[t(l.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e.areasFiltro?t(s.A,{attrs:{xs12:"","px-3":""}},[t(o.A,{attrs:{clearable:"","background-color":"cuarto lighten-5","item-value":"id","item-text":"area",items:e.areasFiltro,label:"Vacunatorio","prepend-icon":"fa-house-medical-flag",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.areas=[]))}},model:{value:e.filtro.areas,callback:function(t){e.$set(e.filtro,"areas",t)},expression:"filtro.areas"}})],1):e._e(),e.insumos?t(s.A,{attrs:{xs12:"","px-3":""}},[t(o.A,{attrs:{clearable:"","background-color":"cuarto lighten-5","item-value":"id","item-text":"nombreC",items:e.insumosDB,label:"Vacunas (Opcional)","prepend-icon":"vaccines",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.insumos=[]))}},model:{value:e.filtro.insumos,callback:function(t){e.$set(e.filtro,"insumos",t)},expression:"filtro.insumos"}})],1):e._e(),e.procedencia?t(s.A,{attrs:{xs12:"","px-3":""}},[t(o.A,{attrs:{clearable:"","background-color":"cuarto lighten-5",items:e.optionsJsonVacunas?.insumo_procedencia||[],label:"Procedencia (Opcional)","prepend-icon":"trip_origin",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.procedencias=[]))}},model:{value:e.filtro.procedencias,callback:function(t){e.$set(e.filtro,"procedencias",t)},expression:"filtro.procedencias"}})],1):e._e(),e.vacunas_reportes?t(s.A,{attrs:{xs12:"","px-3":""}},[t(o.A,{attrs:{clearable:"","background-color":"cuarto lighten-5",items:e.optionsJsonVacunas?.vacunas_reportes||[],label:"Contar por separado (Opcional)","prepend-icon":"grain",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.opciones=[]))}},model:{value:e.filtro.opciones,callback:function(t){e.$set(e.filtro,"opciones",t)},expression:"filtro.opciones"}})],1):e._e()],1)],1)],1)],1)],1)},u=[],d=a(95353);const p={name:"vacunas-component-filtro-avanzado",props:["filtro","areasFiltro","insumos","procedencia","vacunas_reportes"],data:()=>({panel:[],insumosDB:[],optionsJsonVacunas:{}}),computed:{},async created(){this.insumos&&(this.insumosDB=await this.buscarInsumosFiltro(this.insumos)),(this.procedencia||this.vacunas_reportes)&&(this.optionsJsonVacunas=await this.returnOptionsJSON({key:"vacunas",opcion:"base"}))},methods:{...(0,d.i0)(["returnOptionsJSON"]),...(0,d.i0)("vacunas",["buscarInsumosFiltro"])}},h=p;var m=a(81656),f=(0,m.A)(h,c,u,!1,null,null,null);const v=f.exports},9317:(e,t,a)=>{a.r(t),a.d(t,{default:()=>y});var o=a(55669),r=a(15852),n=a(1899),i=a(48122),s=a(41614),l=a(46227),c=a(69155),u=a(55731),d=function(){var e=this,t=e._self._c;return t(i.A,{attrs:{fluid:"","grid-list-xs":""}},[t(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[t(s.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(r.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(n.OQ,{staticClass:"px-0"},[e._v("====== GESTION DE VACUNAS ======")])],1)],1)],1),t(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(s.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",cuarto:"","darken-1":""}},[t(s.A,{attrs:{"px-3":""}},[t(l.A,{attrs:{medium:"",color:"white",left:""}},[e._v("vaccines")]),t("span",{staticClass:"title white--text"},[e._v("Vacunas / Reportes")])],1),t(u.hc),t(o.A,{attrs:{fab:"",small:"",color:"primary darken-2"},on:{click:function(t){return e.retroceder()}}},[t(l.A,[e._v("far fa-arrow-alt-circle-left")])],1)],1),t(r.A,{staticClass:"elevation-6",attrs:{color:"grey lighten-2"}},[t(n.OQ,{staticClass:"px-0"},[t(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[t(s.A,{attrs:{xs12:"","px-3":""}},[t(r.A,{staticClass:"grey lighten-3"},[t(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(s.A,{attrs:{xs12:"",sm6:"",md3:"","px-3":""}},[t("dateSelect",{attrs:{value:e.filtro.desde,"background-color":"cuarto lighten-5",color:"cuarto",label:"Desde",icon:"today",max:e.filtro.hasta,requerido:"true"},model:{value:e.filtro.desde,callback:function(t){e.$set(e.filtro,"desde",t)},expression:"filtro.desde"}})],1),t(s.A,{attrs:{xs12:"",sm6:"",md3:"","px-3":""}},[t("dateSelect",{attrs:{value:e.filtro.hasta,"background-color":"cuarto lighten-5",color:"cuarto",label:"Hasta",icon:"event",min:e.filtro.desde,requerido:"true"},model:{value:e.filtro.hasta,callback:function(t){e.$set(e.filtro,"hasta",t)},expression:"filtro.hasta"}})],1),t(s.A,{attrs:{xs12:"",md10:"","px-3":"","mb-3":""}},[t("componentFiltroAvanzado",{attrs:{filtro:e.filtro,areasFiltro:e.areasFiltro,insumos:{select:"nombre descripcion nombreC"},procedencia:!0,vacunas_reportes:!0}})],1)],1),t(c.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t(s.A,{attrs:{xs12:"","px-3":"","py-1":""}},[t(o.A,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteVacunaEtario()}}},[t(l.A,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Vacuna Etario [Vacuna 1 max]")],1)],1),t(s.A,{attrs:{xs12:"","px-3":"","py-1":""}},[t(o.A,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteNominal()}}},[t(l.A,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Aplicaciones Nominal (CIPRES) [Vacunatorios 5 max]")],1)],1),t(s.A,{attrs:{xs12:"","px-3":"","py-1":""}},[t(o.A,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteResumen()}}},[t(l.A,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Aplicaciones Resumen (Hoja2)")],1)],1),t(s.A,{attrs:{xs12:"","px-3":"","py-1":""}},[t(o.A,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteStockMovimiento()}}},[t(l.A,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Stock Movimientos [Vacunatorios 5 max]")],1)],1),t(s.A,{attrs:{xs12:"","px-3":"","py-1":""}},[t(o.A,{staticClass:"white--text mb-2",attrs:{round:"",color:"primary",disabled:e.loading.estado,loading:e.loading.estado},on:{click:function(t){return e.reporteStockTotal()}}},[t(l.A,{attrs:{medium:"",left:""}},[e._v("fas fa-file-invoice")]),e._v(" Stock TOTAL del Sistema")],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)},p=[],h=a(95353),m=a(63986),f=a(69006);const v={name:"vacunaReportes",components:{componentFiltroAvanzado:m.A,dateSelect:f.A},data:()=>({areasFiltro:[],filtro:{desde:"",hasta:"",areas:[],insumos:[],procedencias:[],opciones:[]}}),computed:{...(0,h.aH)(["loading","hoy","monthBefore"])},async created(){this.filtro.desde=this.monthBefore,this.filtro.hasta=this.hoy,this.areasFiltro=await this.buscarAreaFiltros({filtro:{vacunatorio:!0},populate:"no",select:"area"})},methods:{...(0,h.PY)(["mostrarError","mostrarDialogIframe"]),...(0,h.i0)(["retroceder","routerResolve"]),...(0,h.i0)("main",["buscarAreaFiltros"]),async reporteVacunaEtario(){if(0<this.filtro.insumos.length&&this.filtro.insumos.length<=1){localStorage.setItem("localStorageTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"VacunaReporteEtarioImprimir",query:{descarga:!1,descargaExcel:!0}});this.mostrarDialogIframe({src:e.href,titulo_name:`Vacuna Reporte Etario ${this.hoy}`})}else 0===this.filtro.insumos?.length?this.mostrarError({mensaje:"Complete por lo menos con una Vacuna en el Filtro Avanzado para el reporte.",titulo:"Valores Requeridos."}):this.mostrarError({mensaje:"Solo acepta una Vacuna por reporte en el Filtro Avanzado para el reporte.",titulo:"Valores."})},async reporteVacunatorioMensual(){return this.mostrarError({mensaje:"Se encuentra en etapa de Desarrollo.",titulo:"En DESARROLLO."})},async reporteNominal(){if(0<this.filtro.areas.length&&this.filtro.areas.length<=5){localStorage.setItem("localStorageTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"VacunaReporteNominalImprimir",query:{descarga:!1,descargaExcel:!1}});this.mostrarDialogIframe({src:e.href,titulo_name:`Vacuna Reporte Nominal ${this.hoy}`})}else 0===this.filtro.areas?.length?this.mostrarError({mensaje:"Complete por lo menos con un Vacunatorio en el Filtro Avanzado para el reporte.",titulo:"Valores Requeridos."}):this.mostrarError({mensaje:"Como mucho acepta 5 (cinco) Vacunatorios en el Filtro Avanzado para el reporte.",titulo:"Valores."})},async reporteNominalSelectNoCompleta(){return this.mostrarError({mensaje:"Se encuentra en etapa de Desarrollo.",titulo:"En DESARROLLO."})},async reporteResumen(){localStorage.setItem("localStorageTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"VacunaReporteResumenImprimir",query:{descarga:!1,descargaExcel:!0}});this.mostrarDialogIframe({src:e.href,titulo_name:`Vacuna Resumen ${this.hoy}`})},async reporteStockMovimiento(){if(0<this.filtro.areas.length&&this.filtro.areas.length<=5){localStorage.setItem("localStorageTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"VacunaStockMovimientoImprimir",query:{descarga:!1}});this.mostrarDialogIframe({src:e.href,titulo_name:`Vacunatorio Movimientos ${this.hoy}`})}else 0===this.filtro.areas?.length?this.mostrarError({mensaje:"Complete por lo menos con un Vacunatorio en el Filtro Avanzado para el reporte.",titulo:"Valores Requeridos."}):this.mostrarError({mensaje:"Como mucho acepta 5 (cinco) Vacunatorios en el Filtro Avanzado para el reporte.",titulo:"Valores."})},async reporteStockTotal(){localStorage.setItem("localStorageTemp",JSON.stringify({...this.filtro}));let e=await this.routerResolve({name:"VacunaStockTotalImprimir",query:{descarga:!1}});this.mostrarDialogIframe({src:e.href,titulo_name:`Vacunatorio Stock Total ${this.hoy}`})}}},g=v;var x=a(81656),A=(0,x.A)(g,d,p,!1,null,null,null);const y=A.exports},83160:(e,t,a)=>{a.d(t,{A:()=>s});var o=a(677),r=a(88e3),n=a(72006),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};const s=(0,n.A)(o.A,(0,r.G)("expansionPanel")).extend({name:"v-expansion-panel",provide:function(){return{expansionPanel:this}},props:{disabled:Boolean,readonly:Boolean,expand:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,value:{type:[Number,Array],default:function(){return null}}},data:function(){return{items:[],open:[]}},computed:{classes:function(){return i({"v-expansion-panel--focusable":this.focusable,"v-expansion-panel--popout":this.popout,"v-expansion-panel--inset":this.inset},this.themeClasses)}},watch:{expand:function(e){var t=-1;if(!e){var a=this.open.reduce((function(e,t){return t?e+1:e}),0),o=Array(this.items.length).fill(!1);1===a&&(t=this.open.indexOf(!0)),t>-1&&(o[t]=!0),this.open=o}this.$emit("input",e?this.open:t>-1?t:null)},value:function(e){this.updateFromValue(e)}},mounted:function(){null!==this.value&&this.updateFromValue(this.value)},methods:{updateFromValue:function(e){if(!Array.isArray(e)||this.expand){var t=Array(this.items.length).fill(!1);"number"===typeof e?t[e]=!0:null!==e&&(t=e),this.updatePanels(t)}},updatePanels:function(e){this.open=e;for(var t=0;t<this.items.length;t++)this.items[t].toggle(e&&e[t])},panelClick:function(e){for(var t=this.expand?this.open.slice():Array(this.items.length).fill(!1),a=0;a<this.items.length;a++)this.items[a]._uid===e&&(t[a]=!this.open[a],!this.expand&&this.$emit("input",t[a]?a:null));this.updatePanels(t),this.expand&&this.$emit("input",t)},register:function(e){var t=this.items.push(e)-1;null!==this.value&&this.updateFromValue(this.value),e.toggle(!!this.open[t])},unregister:function(e){var t=this.items.findIndex((function(t){return t._uid===e._uid}));this.items.splice(t,1),this.open.splice(t,1)}},render:function(e){return e("ul",{staticClass:"v-expansion-panel",class:this.classes},this.$slots.default)}})},24496:(e,t,a)=>{a.d(t,{A:()=>p});var o=a(40657),r=a(88202),n=a(10362),i=a(61004),s=a(88e3),l=a(54582),c=a(72006),u=a(73803);function d(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}const p=(0,c.A)(r.A,n.A,i.A,(0,s.W)("expansionPanel","v-expansion-panel-content","v-expansion-panel")).extend({name:"v-expansion-panel-content",props:{disabled:Boolean,readonly:Boolean,expandIcon:{type:String,default:"$vuetify.icons.expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{height:"auto"}},computed:{containerClasses:function(){return{"v-expansion-panel__container--active":this.isActive,"v-expansion-panel__container--disabled":this.isDisabled}},isDisabled:function(){return this.expansionPanel.disabled||this.disabled},isReadonly:function(){return this.expansionPanel.readonly||this.readonly}},beforeMount:function(){this.expansionPanel.register(this),"undefined"!==typeof this.value&&(0,u.OP)("v-model has been deprecated",this)},beforeDestroy:function(){this.expansionPanel.unregister(this)},methods:{onKeydown:function(e){13===e.keyCode&&this.$el===document.activeElement&&this.expansionPanel.panelClick(this._uid)},onHeaderClick:function(){this.isReadonly||this.expansionPanel.panelClick(this._uid)},genBody:function(){return this.$createElement("div",{ref:"body",class:"v-expansion-panel__body",directives:[{name:"show",value:this.isActive}]},this.showLazyContent(this.$slots.default))},genHeader:function(){var e=[].concat(d(this.$slots.header||[]));return this.hideActions||e.push(this.genIcon()),this.$createElement("div",{staticClass:"v-expansion-panel__header",directives:[{name:"ripple",value:this.ripple}],on:{click:this.onHeaderClick}},e)},genIcon:function(){var e=this.$slots.actions||[this.$createElement(l.A,this.expandIcon)];return this.$createElement("transition",{attrs:{name:"fade-transition"}},[this.$createElement("div",{staticClass:"v-expansion-panel__header__icon",directives:[{name:"show",value:!this.isDisabled}]},e)])},toggle:function(e){var t=this;e&&(this.isBooted=!0),this.$nextTick((function(){return t.isActive=e}))}},render:function(e){return e("li",{staticClass:"v-expansion-panel__container",class:this.containerClasses,attrs:{tabindex:this.isReadonly||this.isDisabled?null:0,"aria-expanded":Boolean(this.isActive)},on:{keydown:this.onKeydown}},[this.$slots.header&&this.genHeader(),e(o.Qo,[this.genBody()])])}})}}]);