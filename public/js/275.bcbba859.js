"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[275],{6404:function(e,t,n){n.d(t,{Z:function(){return c}});var i=function(){var e=this,t=e._self._c;return e.field.array?t("span",[e.field.object?t("span",e._l(e._get(e.props.item,e.field.ruta),(function(n,i){return t("code",{key:`${e.field.text}-${i}`,attrs:{STYLE:"margin:4px"}},[e.field.keyShow?t("span",[e._v(e._s(e.field.date?e.mostrarFecha(n[e.field.keyShow],e.field.time):n[e.field.keyShow]||"0"==n[e.field.keyShow]?n[e.field.keyShow]:"S/D"))]):t("span",e._l(n,(function(r,a,o){return t("span",{key:`${e.field.text}-${i}-${a}`},[e._v(e._s(a)+": "),t("kbd",[e._v(e._s(isNaN(r)&&"Invalid Date"!==e.mostrarFecha(r,e.field.time)?e.mostrarFecha(r,e.field.time)||"S/D":r||"0"==r?r:"S/D"))]),o!=Object.keys(n).length-1?t("span",[e._v(e._s("\n"))]):e._e()])})),0)])})),0):t("span",e._l(e._get(e.props.item,e.field.ruta),(function(n,i){return t("code",{key:`${e.field.text}-${i}`,attrs:{STYLE:"margin:4px"}},[e._v(e._s(e.field.date?e.mostrarFecha(n,e.field.time):n||"0"==n?n:"S/D"))])})),0)]):e.field.object?t("span",[t("code",{attrs:{STYLE:"margin:4px"}},[e.field.keyShow?t("span",[e._v(e._s(e.field.date?e.mostrarFecha(e._get(e.props.item,e.field.ruta)[e.field.keyShow],e.field.time):e._get(e.props.item,e.field.ruta)[e.field.keyShow]||"0"==e._get(e.props.item,e.field.ruta)[e.field.keyShow]?e._get(e.props.item,e.field.ruta)[e.field.keyShow]:"--------"))]):t("span",e._l(e._get(e.props.item,e.field.ruta),(function(n,i,r){return t("span",{key:`${e.field.text}-${i}`},[e._v(e._s(i)+": "),t("kbd",[e._v(e._s(isNaN(n)&&"Invalid Date"!==e.mostrarFecha(n,e.field.time)?`${e.mostrarFecha(n,e.field.time)}`||"S/D":n||"0"==n?`${n}`:"S/D"))]),r!=Object.keys(e._get(e.props.item,e.field.ruta)).length-1?t("span",[e._v(e._s("\n"))]):e._e()])})),0)])]):t("span",{style:""+(e.field.numeric&&e._get(e.props.item,e.field.ruta)<0?"color: red;":"")},[e._v(e._s(e.field.date?e.mostrarFecha(e.props.item[e.field.ruta],e.field.time):e.field.boolean?""+(e._get(e.props.item,e.field.ruta)&&"false"!=e._get(e.props.item,e.field.ruta)&&"0"!=e._get(e.props.item,e.field.ruta)?"Si":"No"):e._get(e.props.item,e.field.ruta)||"0"==e._get(e.props.item,e.field.ruta)?e._get(e.props.item,e.field.ruta).toLocaleString("es-AR"):"--------"))])},r=[],a={name:"body-data-table-dinamic",props:["props","field"]},o=a,s=n(1001),l=(0,s.Z)(o,i,r,!1,null,null,null),c=l.exports},5967:function(e,t,n){n.d(t,{Z:function(){return f}});var i=n(6961),r=n(683),a=n(9456),o=n(5084),s=n(4618),l=function(){var e=this,t=e._self._c;return t(a.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(r.Z,{attrs:{xs12:"","px-2":""}},[t(o.Z,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:n}){return[t(s.h,e._g({attrs:{clearable:!e.soloLect&&!!e.clear,"background-color":e.soloLect?`${e.color} lighten-2`:`${e.color} lighten-5`,label:e.label,"prepend-icon":e.prepend,readonly:"",color:`${e.color} darken-3`,rules:e.req?e.validate:[]},on:{"click:clear":function(t){return e.$emit("input","")}},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}},n))]}}]),model:{value:e.menufecha1,callback:function(t){e.menufecha1=t},expression:"menufecha1"}},[t(i.Z,{attrs:{readonly:e.soloLect,"allowed-dates":e.allowedDates,min:e.fecMin,max:e.fecMax,color:`${e.color} darken-3`,"header-color":`${e.color} darken-1`,locale:"mx"},on:{input:function(t){e.menufecha1=!1,e.$emit("input",t)}},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}})],1)],1)],1)},c=[],d={name:"date-select",props:["value","label","icon","color","soloLectura","requerido","min","max","filtro","clearable"],data(){return{menufecha1:!1,validate:[e=>e?""===e.trim()?"Este campo es requerido.":!(e&&e.length<10)||"Ingrese fecha valida (AAAA-MM-DD).":"Este campo es requerido."]}},computed:{fecha:function(){return this.value},soloLect:function(){return this.soloLectura||!1},prepend:function(){return this.icon||"event"},req:function(){return this.requerido||!1},clear:function(){return this.clearable||!1},fecMin:function(){return"-1"===this.min?new Date((new Date).setFullYear((new Date).getFullYear()-1)).toISOString().substr(0,10):this.min?this.min:void 0},fecMax:function(){return"+1"===this.max?new Date((new Date).setFullYear((new Date).getFullYear()+1)).toISOString().substr(0,10):this.max?this.max:void 0},restriction:function(){return this.filtro||[]}},methods:{allowedDates:function(e){return!this.restriction.includes(new Date(e).getUTCDay())}}},u=d,p=n(1001),m=(0,p.Z)(u,l,c,!1,null,null,null),f=m.exports},9400:function(e,t,n){n.d(t,{Z:function(){return h}});var i=n(7416),r=n(8956),a=n(4791),o=n(4694),s=n(683),l=n(9456),c=function(){var e=this,t=e._self._c;return t(l.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(a.Z,{model:{value:e.panel,callback:function(t){e.panel=t},expression:"panel"}},[t(o.Z,{scopedSlots:e._u([{key:"header",fn:function(){return[e._v("Filtro Avanzado")]},proxy:!0}])},[t(r.Z,[t(l.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e.areasFiltro?t(s.Z,{attrs:{xs12:"","px-3":""}},[t(i.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"cuarto lighten-5","item-value":"id","item-text":"area",items:e.areasFiltro,label:"Farmacia Origen","prepend-icon":"fa-house-medical-flag",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.areas=[]))}},model:{value:e.filtro.areas,callback:function(t){e.$set(e.filtro,"areas",t)},expression:"filtro.areas"}})],1):e._e(),e.insumosDB?t(s.Z,{attrs:{xs12:"","px-3":""}},[t(i.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"cuarto lighten-5","item-value":"id","item-text":"nombreC",items:e.insumosDB,label:"Insumos (Opcional)","prepend-icon":"fa-solid fa-pills",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.insumos=[]))}},model:{value:e.filtro.insumos,callback:function(t){e.$set(e.filtro,"insumos",t)},expression:"filtro.insumos"}})],1):e._e(),e.ingresoProcedencia?t(s.Z,{attrs:{xs12:"","px-3":""}},[t(i.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"cuarto lighten-5",items:e.ingresoProcedencia,label:"Procedencia (Opcional)","prepend-icon":"trip_origin",color:"cuarto",multiple:"",chips:"","deletable-chips":""},on:{"click:clear":function(t){e.$nextTick((()=>e.filtro.procedencias=[]))}},model:{value:e.filtro.procedencias,callback:function(t){e.$set(e.filtro,"procedencias",t)},expression:"filtro.procedencias"}})],1):e._e()],1)],1)],1)],1)],1)},d=[],u={name:"component-filtro-avanzado",props:["filtro","areasFiltro","insumosDB","ingresoProcedencia"],data:()=>({panel:[]})},p=u,m=n(1001),f=(0,m.Z)(p,c,d,!1,null,"04a357b6",null),h=f.exports},7698:function(e,t,n){n.d(t,{Z:function(){return x}});var i=n(7416),r=n(6194),a=n(3089),o=n(683),s=n(3667),l=n(9456),c=n(8143),d=n(4618),u=n(1415),p=function(){var e=this,t=e._self._c;return t(l.Z,{class:"grey lighten-"+(e.index%2===0?"3":"2"),attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e.egreso.retirado||e.noGestionEnOrigen?t(l.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[t(d.h,{attrs:{readonly:"","background-color":"primary lighten-1","prepend-icon":"fa-solid fa-pills",label:"Insumo",type:"text",color:"primary"},model:{value:e.egreso.insumoDB,callback:function(t){e.$set(e.egreso,"insumoDB",t)},expression:"egreso.insumoDB"}})],1),t(o.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[t(d.h,{attrs:{readonly:"","background-color":"primary lighten-1","prepend-icon":"trip_origin",label:"Procedencia",type:"text",color:"primary"},model:{value:e.egreso.procedencia,callback:function(t){e.$set(e.egreso,"procedencia",t)},expression:"egreso.procedencia"}})],1),t(o.Z,{attrs:{xs12:"",sm6:"",lg3:"","px-3":""}},[t(d.h,{attrs:{readonly:"","background-color":"primary lighten-1","prepend-icon":"group_work",label:"Lote",type:"text",color:"primary"},model:{value:e.egreso.lote,callback:function(t){e.$set(e.egreso,"lote",t)},expression:"egreso.lote"}})],1),t(o.Z,{attrs:{xs12:"",sm6:"",lg4:"","px-3":""}},[t(d.h,{attrs:{readonly:"","background-color":"primary lighten-1","prepend-icon":"event",label:"Fecha de Vencimiento",type:"text",color:"primary"},model:{value:e.egreso.vencimiento,callback:function(t){e.$set(e.egreso,"vencimiento",t)},expression:"egreso.vencimiento"}})],1)],1):t(o.Z,{attrs:{xs12:"",lg9:"","px-3":""}},[t(i.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"primary lighten-5","item-value":"_id","item-text":"insumoDB",items:e.stockDB,label:"Insumo",placeholder:""+(e.egreso.insumo?`${e.egreso.insumo.insumoDB} <-> Hay: ${e.egreso.insumo.cantidad} <-> P. ${e.egreso.insumo.procedencia} L. ${e.egreso.insumo.lote} V. ${e.egreso.insumo.vencimiento}`:"Seleccionar primero Origen"),"prepend-icon":"fa-solid fa-pills",color:"primary",rules:[...e.rules.requerido,t=>{try{return!(t&&!e.stockDB.some((t=>t._id===e.egreso.insumo._id)))||"El Insumo ya no se encuentra disponible."}catch(n){return"Error Inesperado (component-egreso-insumo)."}}],"validate-on-blur":"","return-object":""},scopedSlots:e._u([{key:"selection",fn:function(n){return[t(a.Z,{attrs:{color:"primary darken-1","text-color":"white"}},[t(s.Z,{staticClass:"hidden-xs-only",attrs:{left:""}},[e._v("fa-solid fa-pills")]),e._v(" "+e._s(n.item.insumoDB)+" ")],1),t(a.Z,{attrs:{color:"primary darken-1","text-color":"white"}},[t(s.Z,{staticClass:"hidden-xs-only",attrs:{left:""}},[e._v("trip_origin")]),e._v(" Procedencia: "+e._s(n.item.procedencia?`${n.item.procedencia}`:"S/D")+" ")],1),t(a.Z,{attrs:{color:"primary darken-1","text-color":"white"}},[t(s.Z,{staticClass:"hidden-xs-only",attrs:{left:""}},[e._v("group_work")]),e._v(" Lote: "+e._s(n.item.lote?`${n.item.lote}`:"S/D")+" ")],1),t(a.Z,{attrs:{color:""+(n.item.expirado?"red darken-1":n.item.porExpirar?"orange darken-1":"primary darken-1"),"text-color":"white"}},[t(s.Z,{staticClass:"hidden-xs-only",attrs:{left:""}},[e._v("event")]),e._v(" Vencimiento: "+e._s(n.item.vencimiento?`${n.item.vencimiento}`:"S/D")+" ")],1),t(a.Z,{attrs:{color:"primary darken-1","text-color":"white"}},[t(s.Z,{staticClass:"hidden-xs-only",attrs:{left:""}},[e._v("grain")]),e._v(" Hay: "+e._s(n.item.cantidad?`${n.item.cantidad}`:"S/D")+" ")],1)]}},{key:"item",fn:function(n){return[t("code",{staticClass:"primary darken-1 white--text"},[e._v(" "+e._s(n.item.insumoDB)+" ")]),e._v(" - "),t("code",{staticClass:"primary darken-1 white--text"},[t("span",{staticClass:"hidden-xs-only"},[e._v("Procedencia: ")]),e._v(e._s(n.item.procedencia?`${n.item.procedencia}`:"S/D")+" ")]),e._v(" - "),t("code",{staticClass:"primary darken-1 white--text"},[t("span",{staticClass:"hidden-xs-only"},[e._v("Lote: ")]),e._v(e._s(n.item.lote?`${n.item.lote}`:"S/D")+" ")]),e._v(" - "),t("code",{class:(n.item.expirado?"red darken-1":n.item.porExpirar?"orange darken-1":"primary darken-1")+" white--text"},[t("span",{staticClass:"hidden-xs-only"},[e._v("Vencimiento: ")]),e._v(e._s(n.item.vencimiento?`${n.item.vencimiento}`:"S/D")+" ")]),e._v(" - "),t("code",{staticClass:"primary darken-1 white--text"},[t("span",{staticClass:"hidden-xs-only"},[e._v("Hay: ")]),e._v(e._s(n.item.cantidad?`${n.item.cantidad}`:"S/D")+" ")])]}}]),model:{value:e.egreso.insumo,callback:function(t){e.$set(e.egreso,"insumo",t)},expression:"egreso.insumo"}})],1),t(o.Z,{attrs:{xs12:"",sm8:"",lg2:"","px-3":""}},[t(d.h,{attrs:{readonly:!!e.egreso.retirado||e.noGestionEnOrigen,clearable:!(e.egreso.retirado||e.noGestionEnOrigen),"background-color":e.egreso.retirado||e.noGestionEnOrigen?"primary lighten-1":"primary lighten-5","prepend-icon":"grain",label:"Cantidad",type:"number",onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'",color:"primary",rules:e.egreso.retirado||e.noGestionEnOrigen?[]:[...e.rules.requerido,...e.rules.soloNumero,e.rules.minNumber(1),e.rules.maxNumber(e.egreso.insumo?.cantidad||"Seleccione Insumo")]},model:{value:e.egreso.cantidad,callback:function(t){e.$set(e.egreso,"cantidad",t)},expression:"egreso.cantidad"}})],1),t(c.Cl),0==e.index?t(u.Z,{attrs:{top:"","close-delay":"0"},scopedSlots:e._u([{key:"activator",fn:function({on:n}){return[t(r.Z,e._g({attrs:{disabled:e.loading.estado||!!e.egreso.retirado||e.noGestionEnOrigen,color:"primary",fab:"",small:""},on:{click:function(t){return e.agregarFila()}}},n),[t(s.Z,{attrs:{"x-large":""}},[e._v("control_point")])],1)]}}],null,!1,2622671186)},[t("span",[e._v("Agregar Insumo")])]):e._e(),0!=e.index?t(u.Z,{attrs:{top:"","close-delay":"0"},scopedSlots:e._u([{key:"activator",fn:function({on:n}){return[t(r.Z,e._g({attrs:{disabled:e.loading.estado||!!e.egreso.retirado||e.noGestionEnOrigen,color:"white",icon:"",small:""},on:{click:function(t){return e.borrarFila(e.index)}}},n),[t(s.Z,{attrs:{color:"red lighten-2"}},[e._v("delete_forever")])],1)]}}],null,!1,3066484371)},[t("span",[e._v("Eliminar Insumo")])]):e._e(),t(c.Cl)],1)},m=[],f=n(629),h={name:"component-egreso-insumo",props:["egreso","index","stockDB","agregarFila","borrarFila","actualizar","noGestionEnOrigen"],computed:{...(0,f.rn)(["loading","rules"])},watch:{"egreso.insumo"(){this.actualizar()}}},g=h,v=n(1001),_=(0,v.Z)(g,p,m,!1,null,"399bc9ad",null),x=_.exports},4791:function(e,t,n){n.d(t,{Z:function(){return s}});var i=n(5721),r=n(21),a=n(5530),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},s=(0,a.Z)(i.Z,(0,r.J)("expansionPanel")).extend({name:"v-expansion-panel",provide:function(){return{expansionPanel:this}},props:{disabled:Boolean,readonly:Boolean,expand:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,value:{type:[Number,Array],default:function(){return null}}},data:function(){return{items:[],open:[]}},computed:{classes:function(){return o({"v-expansion-panel--focusable":this.focusable,"v-expansion-panel--popout":this.popout,"v-expansion-panel--inset":this.inset},this.themeClasses)}},watch:{expand:function(e){var t=-1;if(!e){var n=this.open.reduce((function(e,t){return t?e+1:e}),0),i=Array(this.items.length).fill(!1);1===n&&(t=this.open.indexOf(!0)),t>-1&&(i[t]=!0),this.open=i}this.$emit("input",e?this.open:t>-1?t:null)},value:function(e){this.updateFromValue(e)}},mounted:function(){null!==this.value&&this.updateFromValue(this.value)},methods:{updateFromValue:function(e){if(!Array.isArray(e)||this.expand){var t=Array(this.items.length).fill(!1);"number"===typeof e?t[e]=!0:null!==e&&(t=e),this.updatePanels(t)}},updatePanels:function(e){this.open=e;for(var t=0;t<this.items.length;t++)this.items[t].toggle(e&&e[t])},panelClick:function(e){for(var t=this.expand?this.open.slice():Array(this.items.length).fill(!1),n=0;n<this.items.length;n++)this.items[n]._uid===e&&(t[n]=!this.open[n],!this.expand&&this.$emit("input",t[n]?n:null));this.updatePanels(t),this.expand&&this.$emit("input",t)},register:function(e){var t=this.items.push(e)-1;null!==this.value&&this.updateFromValue(this.value),e.toggle(!!this.open[t])},unregister:function(e){var t=this.items.findIndex((function(t){return t._uid===e._uid}));this.items.splice(t,1),this.open.splice(t,1)}},render:function(e){return e("ul",{staticClass:"v-expansion-panel",class:this.classes},this.$slots.default)}})},4694:function(e,t,n){var i=n(2482),r=n(6815),a=n(4735),o=n(8197),s=n(21),l=n(9524),c=n(5530),d=n(8219);function u(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}t["Z"]=(0,c.Z)(r.Z,a.Z,o.Z,(0,s.f)("expansionPanel","v-expansion-panel-content","v-expansion-panel")).extend({name:"v-expansion-panel-content",props:{disabled:Boolean,readonly:Boolean,expandIcon:{type:String,default:"$vuetify.icons.expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{height:"auto"}},computed:{containerClasses:function(){return{"v-expansion-panel__container--active":this.isActive,"v-expansion-panel__container--disabled":this.isDisabled}},isDisabled:function(){return this.expansionPanel.disabled||this.disabled},isReadonly:function(){return this.expansionPanel.readonly||this.readonly}},beforeMount:function(){this.expansionPanel.register(this),"undefined"!==typeof this.value&&(0,d.Kd)("v-model has been deprecated",this)},beforeDestroy:function(){this.expansionPanel.unregister(this)},methods:{onKeydown:function(e){13===e.keyCode&&this.$el===document.activeElement&&this.expansionPanel.panelClick(this._uid)},onHeaderClick:function(){this.isReadonly||this.expansionPanel.panelClick(this._uid)},genBody:function(){return this.$createElement("div",{ref:"body",class:"v-expansion-panel__body",directives:[{name:"show",value:this.isActive}]},this.showLazyContent(this.$slots.default))},genHeader:function(){var e=[].concat(u(this.$slots.header||[]));return this.hideActions||e.push(this.genIcon()),this.$createElement("div",{staticClass:"v-expansion-panel__header",directives:[{name:"ripple",value:this.ripple}],on:{click:this.onHeaderClick}},e)},genIcon:function(){var e=this.$slots.actions||[this.$createElement(l.Z,this.expandIcon)];return this.$createElement("transition",{attrs:{name:"fade-transition"}},[this.$createElement("div",{staticClass:"v-expansion-panel__header__icon",directives:[{name:"show",value:!this.isDisabled}]},e)])},toggle:function(e){var t=this;e&&(this.isBooted=!0),this.$nextTick((function(){return t.isActive=e}))}},render:function(e){return e("li",{staticClass:"v-expansion-panel__container",class:this.containerClasses,attrs:{tabindex:this.isReadonly||this.isDisabled?null:0,"aria-expanded":Boolean(this.isActive)},on:{keydown:this.onKeydown}},[this.$slots.header&&this.genHeader(),e(i.Fx,[this.genBody()])])}})}}]);