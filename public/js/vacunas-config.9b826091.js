"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[7661],{89236:(a,t,e)=>{e.r(t),e.d(t,{default:()=>N});var o=e(81166),r=e(55669),i=e(15852),s=e(1899),n=e(37471),l=e(48122),u=e(85832),c=e(16251),d=e(41614),p=e(46227),m=e(69155),h=e(31911),g=e(55731),v=e(57e3),_=e(66816),b=function(){var a=this,t=a._self._c;return t(l.A,{attrs:{fluid:"","grid-list-xs":""}},[t(m.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(d.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(i.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(s.OQ,{staticClass:"px-0 text-uppercase"},[a._v("====== Gestion de Vacunas ======")])],1)],1),t(d.A,{attrs:{"pa-1":"","ma-1":"",red:"","darken-2":"",xs12:""}},[t(i.A,{attrs:{color:"yellow darken-1"}},[t(s.OQ,{staticClass:"px-3 font-weight-medium"},[t("p",[t(p.A,{attrs:{color:"red darken-3",left:""}},[a._v(" warning ")]),t("b",[t("u",[a._v("Antes de Crear una Nueva Vacuna:")])])],1),a._v(" Por favor, utilizar la funcion de "),t("b",[t("u",[a._v("Buscar")])]),a._v(" para ver si ya esta "),t("b",[t("u",[a._v("Creada")])]),a._v(" dicha Vacuna porque al generar una nueva Vacuna con nombre similar va generar "),t("b",[t("u",[a._v("confusion")])]),a._v(" y "),t("b",[t("u",[a._v("reportes erroneos")])]),a._v(", si conoce la Vacuna por otro "),t("b",[t("u",[a._v("sinonimo")])]),a._v(" puede agregarselo al ya Creado utilizando el boton de "),t("b",[t("u",[a._v("Edicion")])]),a._v(" y agregando dicho sinonimo a su "),t("b",[t("u",[a._v("Nombre")])]),a._v(" (Visible en todas las etapas) o "),t("b",[t("u",[a._v("Descripcion")])]),a._v(" (Visible solamente al momento de generar un Ingreso o Solicitudes). ")])],1)],1),t(d.A,{attrs:{"pa-1":"","ma-1":"",xs12:"",cuarto:"","lighten-1":""}},[t(i.A,{staticClass:"elevation-6"},[t(m.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[t(d.A,{attrs:{"px-3":""}},[t(p.A,{attrs:{medium:"",color:"white",left:""}},[a._v("fas fa-syringe")]),t("span",{staticClass:"title white--text"},[a._v("Alta de Vacunas")])],1),t(g.hc),t(c.A,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),t(r.A,{staticClass:"mb-2",attrs:{color:"primary",disabled:a.loading.estado},on:{click:a.recargarDataTable}},[t(p.A,{attrs:{medium:"",left:""}},[a._v("refresh")]),a._v(" Recargar Vacunas")],1)],1),t("div",[t(n.A,[t(d.A,{attrs:{xs12:"",sm4:"","px-2":""}},[t(v.W,{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":"",clearable:""},model:{value:a.search,callback:function(t){a.search=t},expression:"search"}})],1),t(g.hc),t(c.A,{staticClass:"hidden-xs-only mx-2 primary",attrs:{inset:"",vertical:""}}),t(r.A,{staticClass:"mb-2",attrs:{color:"primary",disabled:a.soloLectura||a.loading.estado},on:{click:function(t){return a.actualizarDialogInsumo({state:!0})}}},[t(p.A,{attrs:{medium:"",left:""}},[a._v("add_circle_outline")]),a._v(" Nueva Vacuna")],1)],1),t(u.A,{staticClass:"elevation-6",staticStyle:{"table-layout":"fixed"},attrs:{id:"tablita",headers:a.headers,items:a.dataTable,"item-key":"_id",pagination:a.paginacion,"rows-per-page-items":[5,10,25,50],loading:a.loading.estado,search:a.search},on:{"update:pagination":function(t){a.paginacion=t}},scopedSlots:a._u([{key:"no-results",fn:function(){return[t(o.A,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[a._v(' No se encontraron resultados para "'+a._s(a.search)+'". ')])]},proxy:!0},{key:"no-data",fn:function(){return[t(o.A,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[a._v(" No hay datos para mostrar. ")])]},proxy:!0},{key:"items",fn:function(e){return[t("tr",{class:a.backgroundClass(e.item)},[t("td",{staticClass:"text-sm-left"},[t("div",{staticClass:"text-xs-center",staticStyle:{width:"60px"}},[t(_.A,{attrs:{top:""},scopedSlots:a._u([{key:"activator",fn:function({on:o}){return[t(p.A,a._g({staticClass:"mr-2",attrs:{disabled:a.soloLectura||a.loading.estado,color:"primary"},on:{click:function(t){return a.actualizarDialogInsumo({state:!0,id:e.item.id})}}},o),[a._v(" edit ")])]}}],null,!0)},[t("span",[a._v("Editar - "+a._s(e.item.nombre))])]),t(_.A,{attrs:{top:""},scopedSlots:a._u([{key:"activator",fn:function({on:o}){return[t(p.A,a._g({attrs:{disabled:a.soloLectura||a.loading.estado,color:"error"},on:{click:function(t){return a.borrarInsumo({insumo:e.item})}}},o),[a._v(" delete ")])]}}],null,!0)},[t("span",[a._v("Borrar - "+a._s(e.item.nombre))])])],1)]),a._l(a.headersDinamics,(function(a){return t("td",{key:a.text,class:a.class},[t("bodyDataTableDinamic",{attrs:{props:e,field:a}})],1)}))],2)]}}])},[t(h.A,{attrs:{color:"blue",indeterminate:""}})],1)],1)],1)],1)],1),t("dialogInsumoVacuna",{attrs:{close:a.close}})],1)},f=[],y=e(95353),x=e(12683),A=e(52111),w=e(59594),k=e(8409);const E=k.A;var I=e(69463);const V={name:"v-range-slider",extends:E,props:{value:{type:Array,default:function(){return[]}}},data:function(a){return{activeThumb:null,lazyValue:a.value.length?a.value:[0,0]}},computed:{classes:function(){return Object.assign({},{"v-input--range-slider":!0},E.options.computed.classes.call(this))},internalValue:{get:function(){return this.lazyValue},set:function(a){var t=this,e=this.min,o=this.max,r=a.map((function(a){return t.roundValue(Math.min(Math.max(a,e),o))}));(r[0]>r[1]||r[1]<r[0])&&(null!==this.activeThumb&&(this.activeThumb=1===this.activeThumb?0:1),r=[r[1],r[0]]),this.lazyValue=r,(0,I.bD)(r,this.value)||this.$emit("input",r),this.validate()}},inputWidth:function(){var a=this;return this.internalValue.map((function(t){return(a.roundValue(t)-a.min)/(a.max-a.min)*100}))},isDirty:function(){var a=this;return this.internalValue.some((function(t){return t!==a.min}))||this.alwaysDirty},trackFillStyles:function(){var a=E.options.computed.trackFillStyles.call(this),t=Math.abs(this.inputWidth[0]-this.inputWidth[1]);return a.width="calc("+t+"% - "+this.trackPadding+"px)",a[this.$vuetify.rtl?"right":"left"]=this.inputWidth[0]+"%",a},trackPadding:function(){return this.isDirty||this.internalValue[0]?0:E.options.computed.trackPadding.call(this)}},methods:{getIndexOfClosestValue:function(a,t){return Math.abs(a[0]-t)<Math.abs(a[1]-t)?0:1},genInput:function(){var a=this;return(0,I.Sd)(2).map((function(t){var e=E.options.methods.genInput.call(a);return e.data.attrs.value=a.internalValue[t],e.data.on.focus=function(e){a.activeThumb=t,E.options.methods.onFocus.call(a,e)},e}))},genChildren:function(){var a=this;return[this.genInput(),this.genTrackContainer(),this.genSteps(),(0,I.Sd)(2).map((function(t){var e=a.internalValue[t],o=function(e){a.isActive=!0,a.activeThumb=t,a.onThumbMouseDown(e)},r=a.inputWidth[t],i=(a.isFocused||a.isActive)&&a.activeThumb===t;return a.genThumbContainer(e,r,i,o)}))]},onSliderClick:function(a){this.isActive||(this.isFocused=!0,this.onMouseMove(a,!0),this.$emit("change",this.internalValue))},onMouseMove:function(a){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=this.parseMouseMove(a),o=e.value,r=e.isInsideTrack;r&&(t&&(this.activeThumb=this.getIndexOfClosestValue(this.internalValue,o)),this.setInternalValue(o))},onKeyDown:function(a){var t=this.parseKeyDown(a,this.internalValue[this.activeThumb]);null!=t&&this.setInternalValue(t)},setInternalValue:function(a){var t=this;this.internalValue=this.internalValue.map((function(e,o){return o===t.activeThumb?a:Number(e)}))}}};var C=e(63286),D=e(49778),O=e(51257),j=function(){var a=this,t=a._self._c;return t(A.A,{attrs:{"max-width":"80%",persistent:"",scrollable:""},model:{value:a.dialogInsumo.state,callback:function(t){a.$set(a.dialogInsumo,"state",t)},expression:"dialogInsumo.state"}},[t(i.A,[t(D.A,{attrs:{color:"grey lighten-2",height:"auto",window:""}},[t(p.A,{attrs:{medium:"",color:"black darken-2"}},[a._v("fas fa-syringe")]),t("span",{staticClass:"display-1 font-weight-bold black--text text--darken-2"},[a._v(a._s(a.dialogInsumo.id?`Editar: ${a.insumo.nombre}`:"Nueva Vacuna"))]),t(g.hc),t(p.A,{attrs:{large:"",disabled:a.loading.estado,color:"error darken-1"},on:{click:a.close}},[a._v("cancel_presentation")])],1),t(s.OQ,[t(w.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:a.valido,callback:function(t){a.valido=t},expression:"valido"}},[t(m.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(d.A,{attrs:{xs12:"",sm6:"","px-3":""}},[t(v.W,{attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5","prepend-icon":"fas fa-syringe",label:"Nombre",type:"text",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.insumo.nombre,callback:function(t){a.$set(a.insumo,"nombre",t)},expression:"insumo.nombre"}})],1),t(d.A,{attrs:{xs12:"",sm6:"","px-3":""}},[t(v.W,{attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5","prepend-icon":"pin",label:"Codigo Unico (opcional)",type:"text",color:"primary"},model:{value:a.insumo.unique_code,callback:function(t){a.$set(a.insumo,"unique_code",t)},expression:"insumo.unique_code"}})],1),t(d.A,{attrs:{xs12:"","px-3":""}},[t(O.A,{attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-1":"primary lighten-5",label:"Descripcion",color:"primary","prepend-icon":"description","auto-grow":"",rows:"2"},model:{value:a.insumo.descripcion,callback:function(t){a.$set(a.insumo,"descripcion",t)},expression:"insumo.descripcion"}})],1),t(m.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(d.A,{attrs:{xs12:"","px-3":""}},[t(C.d,{attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-2":"primary lighten-5",items:a.optionsJsonVacunas.vacunas_dosis_posibles,label:"Opciones de Dosis al Aplicar la Vacuna","prepend-icon":"list",color:"primary","menu-props":{auto:!0},rules:[...a.rules.requerido],multiple:"",chips:"","deletable-chips":""},model:{value:a.insumo.dosis_posibles,callback:function(t){a.$set(a.insumo,"dosis_posibles",t)},expression:"insumo.dosis_posibles"}})],1),t(d.A,{attrs:{xs12:"","px-3":""}},[t(C.d,{attrs:{readonly:a.dialogInsumo.soloLectura,clearable:!a.dialogInsumo.soloLectura,"background-color":a.dialogInsumo.soloLectura?"primary lighten-2":"primary lighten-5",items:a.optionsJsonVacunas.vacunas_condiciones,label:"Condiciones de Aplicacion (Opcional)","prepend-icon":"block",color:"primary","menu-props":{auto:!0},multiple:"",chips:"","deletable-chips":""},model:{value:a.insumo.condiciones,callback:function(t){a.$set(a.insumo,"condiciones",t)},expression:"insumo.condiciones"}})],1),t(d.A,{attrs:{"pa-1":"","ma-1":"",red:"","darken-2":"",xs12:""}},[t(i.A,[t(s.OQ,{staticClass:"px-3 font-weight-medium"},[t("p",[t(p.A,{attrs:{color:"yellow darken-3",left:""}},[a._v(" warning ")]),t("b",[t("u",[a._v("Los Antecedentes Patologicos son los siguientes:")])])],1),t("ul",a._l(a.optionsJsonHiclem.consulta_antecedentes,(function(e,o){return t("li",{key:`antecedentes-${e}`,attrs:{type:"square"}},[t("b",[a._v(a._s(e))]),a._v(". ")])})),0)])],1)],1),t(d.A,{attrs:{xs12:"","px-3":"",primary:"","darken-3":""}},[t(m.A,{attrs:{"align-center":"",row:"",wrap:""}},[t("h4",{staticClass:"title float: left white--text"},[a._v("Reporte - Grupo Etario")])])],1),a.dialogInsumo.soloLectura?a._e():t(d.A,{attrs:{xs12:""}},[t(m.A,{attrs:{"align-center":"","justify-center":"",primary:"","lighten-5":"",row:"",wrap:""}},[t(d.A,{attrs:{xs12:"",sm10:"",md11:"","px-3":""}},[t(m.A,{attrs:{"align-center":"",row:"",wrap:""}},[t(d.A,{attrs:{xs12:"",md4:"","px-3":""}},[t(C.d,{attrs:{clearable:"","background-color":"white",items:a.edadUnidades,label:"Edad Unidad","prepend-icon":"cake",color:"primary","validate-on-blur":""},model:{value:a.grupo_etario_new.unidad,callback:function(t){a.$set(a.grupo_etario_new,"unidad",t)},expression:"grupo_etario_new.unidad"}})],1),t(d.A,{attrs:{xs12:"",md8:"","px-3":""}},[t(m.A,{attrs:{"align-center":"","justify-center":"",row:""}},[t(d.A,{attrs:{xs3:"",sm2:""}},[t(v.W,{attrs:{"background-color":"white",label:"Min Incluye",type:"number"},model:{value:a.grupo_etario_new.value[0],callback:function(t){a.$set(a.grupo_etario_new.value,0,t)},expression:"grupo_etario_new.value[0]"}})],1),t(d.A,{attrs:{xs6:"",sm8:"","px-3":""}},[t(V,{attrs:{min:0,max:128},model:{value:a.grupo_etario_new.value,callback:function(t){a.$set(a.grupo_etario_new,"value",t)},expression:"grupo_etario_new.value"}})],1),t(d.A,{attrs:{xs3:"",sm2:""}},[t(v.W,{attrs:{"background-color":"white",label:"Max Excluye",type:"number"},model:{value:a.grupo_etario_new.value[1],callback:function(t){a.$set(a.grupo_etario_new.value,1,t)},expression:"grupo_etario_new.value[1]"}})],1)],1)],1)],1)],1),t(g.hc),t(_.A,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:e}){return[t(r.A,a._g({attrs:{disabled:a.loading.estado,color:"primary darken-3",flat:"",icon:""},on:{click:function(t){return a.agregarFila()}}},e),[t(p.A,{attrs:{large:""}},[a._v("control_point")])],1)]}}],null,!1,4005032106)},[t("span",[a._v("Agregar Grupo Etario")])]),t(g.hc,{staticClass:"hidden-xs-only"})],1)],1),a._l(a.insumo.grupo_etario,(function(e,o){return t(d.A,{key:`grupo_etario-${o}`,attrs:{xs12:""}},[t(m.A,{class:"grey lighten-"+(o%2===0?"3":"2"),attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(d.A,{attrs:{xs12:"",sm10:"",md11:"","px-3":""}},[t(m.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(d.A,{attrs:{xs12:"",md4:"","px-3":""}},[t(v.W,{attrs:{readonly:"","background-color":"primary lighten-1",label:"Edad Unidad","prepend-icon":"cake",color:"primary"},model:{value:e.unidad,callback:function(t){a.$set(e,"unidad",t)},expression:"grupo.unidad"}})],1),e.value?t(d.A,{attrs:{xs12:"",md8:"","px-3":""}},[t(m.A,{attrs:{"align-center":"","justify-center":"",row:""}},[t(d.A,{attrs:{xs3:"",sm2:""}},[t(v.W,{attrs:{readonly:"","background-color":"primary lighten-1",label:"Min Incluye",type:"number"},model:{value:e.value[0],callback:function(t){a.$set(e.value,0,t)},expression:"grupo.value[0]"}})],1),t(d.A,{attrs:{xs6:"",sm8:"","px-3":""}},[t(V,{attrs:{readonly:"",max:126,min:0},model:{value:e.value,callback:function(t){a.$set(e,"value",t)},expression:"grupo.value"}})],1),t(d.A,{attrs:{xs3:"",sm2:""}},[t(v.W,{attrs:{readonly:"","background-color":"primary lighten-1",label:"Max Excluye",type:"number"},model:{value:e.value[1],callback:function(t){a.$set(e.value,1,t)},expression:"grupo.value[1]"}})],1)],1)],1):a._e()],1)],1),t(g.hc),t(_.A,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:e}){return[t(r.A,a._g({attrs:{disabled:a.dialogInsumo.soloLectura||a.loading.estado,color:"white",icon:"",small:""},on:{click:function(t){return a.borrarFila(o)}}},e),[t(p.A,{attrs:{color:"red lighten-2"}},[a._v("delete_forever")])],1)]}}],null,!0)},[t("span",[a._v("Eliminar Grupo Etario")])]),t(g.hc,{staticClass:"hidden-xs-only"})],1)],1)})),0===a.insumo.grupo_etario?.length?t(m.A,{attrs:{row:"",wrap:""}},[t(d.A,{attrs:{xs12:"","mx-3":"","pb-0":""}},[t(v.W,{attrs:{readonly:"","background-color":"orange lighten-4",label:"No Hay Grupos Etarios definidos para los reportes.","prepend-icon":"warning",color:"orange",solo:""}})],1)],1):a._e()],2)],1)],1)],1),t(s.SL,[t(m.A,{attrs:{row:"",wrap:""}},[t(g.hc),t(r.A,{staticClass:"red darken-1 white--text",attrs:{disabled:a.loading.estado,round:"",loading:a.loading.estado},on:{click:function(t){return a.close()}}},[t(p.A,{attrs:{left:""}},[a._v("cancel_presentation")]),a._v("Cancelar ")],1),t(r.A,{staticClass:"primary darken-1 white--text",attrs:{disabled:a.loading.estado||a.dialogInsumo.soloLectura,loading:a.loading.estado,round:""},on:{click:function(t){return a.guardarInsumo()}}},[t(p.A,{attrs:{left:""}},[a._v("save")]),a._v(a._s(a.valido?a.dialogInsumo.id?"Guardar":"Crear":"Formulario No valido")+" ")],1)],1)],1)],1)],1)},L=[];e(44114);const $={name:"dialogInsumoVacuna",props:["close"],data:()=>({valido:!0,optionsJsonVacunas:{},optionsJsonHiclem:{},grupo_etario_new:{unidad:"",value:[0,0]},insumo:{},insumoBase:{categoria:"Vacuna",nombre:"",descripcion:"",unique_code:"",condiciones:[],grupo_etario:[],dosis_posibles:[],estado:!0},edadUnidades:["Año","Mes","Semana","Dia","Hora"]}),computed:{...(0,y.aH)(["loading","persona","rules"]),...(0,y.aH)("vacunas",["dialogInsumo"])},watch:{async"dialogInsumo.state"(a){a?(setTimeout((async()=>{this.dialogInsumo.id?this.insumo=Object.assign(this._cloneDeep(this.insumoBase),...await this.buscarInsumosFiltro({filtro:{_id:this.dialogInsumo.id}})):this.insumo=this._cloneDeep(this.insumoBase),this.grupo_etario_new={unidad:"",value:[0,0]},this.$refs.form.resetValidation()}),350),this.optionsJsonVacunas=await this.returnOptionsJSON({key:"vacunas",opcion:"base"})):(this.grupo_etario_new={unidad:"",value:[0,0]},this.insumo=this._cloneDeep(this.insumoBase),this.$refs.form.resetValidation())}},async beforeMount(){this.insumo=this._cloneDeep(this.insumoBase),this.optionsJsonVacunas=await this.returnOptionsJSON({key:"vacunas",opcion:"base"}),this.optionsJsonHiclem=await this.returnOptionsJSON({key:"hiclem",opcion:"base"})},methods:{...(0,y.PY)(["mostrarLoading","mostrarError","mostrarMensaje","ocultarLoading"]),...(0,y.i0)(["returnOptionsJSON","requestAPI"]),...(0,y.i0)("vacunas",["buscarInsumosFiltro"]),agregarFila(){try{if(!this.grupo_etario_new.unidad)return this.mostrarError({mensaje:"Falta completar la Unidad del grupo a agregar.",titulo:"Grupor Etario"});if(this.grupo_etario_new.value[0]===this.grupo_etario_new.value[1])return this.mostrarError({mensaje:`El Rango no puede ser desde y hasta un mismo valor (${this.grupo_etario_new.value[0]}), tenga en cuenta el valor mayor no estara incluido.\n Solucion: [${this.grupo_etario_new.value[0]};${this.grupo_etario_new.value[0]+1})`,titulo:"Grupor Etario"});let a=this.insumo.grupo_etario.some((a=>a.unidad===this.grupo_etario_new.unidad&&(a.value?.[0]===this.grupo_etario_new.value[0]&&this.grupo_etario_new.value[1]===a.value?.[1]||this.grupo_etario_new.value[0]<=a.value?.[0]&&a.value?.[0]<this.grupo_etario_new.value[1]||a.value?.[0]<=this.grupo_etario_new.value[0]&&this.grupo_etario_new.value[0]<a.value?.[1]||a.value?.[0]<this.grupo_etario_new.value[1]&&this.grupo_etario_new.value[1]<a.value?.[1])));if(a)return this.mostrarError({mensaje:"El grupo etario que esta queriendo agregar ya se encuenta contenido en parte de otro grupo o esta incluyendo algun grupo ya creado.",titulo:"Grupor Etario"});this.insumo.grupo_etario.push(this._cloneDeep(this.grupo_etario_new)),this.grupo_etario_new={unidad:"",value:[0,0]},this.ordenarGrupoEtario()}catch(a){this.mostrarError({mensaje:a,titulo:"Inesperado (agregarFila)"})}},borrarFila(a){this.insumo.grupo_etario.splice(a,1)},ordenarGrupoEtario(){try{let a={};this.insumo.grupo_etario.forEach((t=>{(a[t.unidad]=a[t.unidad]||[]).push(t.value??[0,1])})),this.insumo.grupo_etario=[],["Hora","Dia","Semana","Mes","Año"].forEach((t=>{a[t]?.sort?.(((a,t)=>a[0]===t[0]?a[1]===t[1]?0:a[1]<t[1]?-1:1:a[0]<t[0]?-1:1));for(let e=0;e<a[t]?.length;e++)this.insumo.grupo_etario.push({unidad:t,value:a[t][e]})}))}catch(a){this.mostrarError({mensaje:a,titulo:"Inesperado (ordenarGrupoEtario)"})}},async guardarInsumo(){if(!this.$refs.form.validate())return this.mostrarError({mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."}),!1;try{let a=this._cloneDeep(this.insumo);if(a._id){if(!await this.$root.$confirm.open({titulo:"EDITAR",msj:["Las modificaciones efectuadas repercutiran en todas las cargas Futuras y las Ya Realizadas de este Insumo.","¿Desea continuar?"]}))return!1}else{let t=this.isVacio(a,!0);if(!0===t.vacio)return this.mostrarError({mensaje:"Complete por lo menos un dato.",titulo:"Valores Requeridos"}),!1;a=t.dato}this.mostrarLoading({titulo:"Guardando Insumo..."});let t=null;return t=await this.requestAPI({method:"put",url:"/vacunas/insumo",update:a}),!!t?.data?.ok&&(this.mostrarMensaje({msj:[`Insumo ${a._id?"Editado":"Guardado"} exitosamente.`],titulo:"Completado"}),this.close(),!0)}catch(a){return this.mostrarError({mensaje:a,titulo:"Inesperado (guardarInsumo)"}),!1}finally{this.ocultarLoading()}}}},F=$;var M=e(81656),B=(0,M.A)(F,j,L,!1,null,null,null);const q=B.exports,S={name:"vacunaInsumoBuscar",components:{bodyDataTableDinamic:x.A,dialogInsumoVacuna:q},data:()=>({dataTable:[],search:"",paginacion:{sortBy:"nombre",descending:!1,rowsPerPage:10,page:1},headers:[{text:"Acciones",value:"id",align:"center",sortable:!1,width:"5%",ruta:"area",ignore:!0},{text:"Nombre",value:"nombre",align:"left",class:"text-xs-left",width:"30%",ruta:"nombre"},{text:"Descripcion",value:"descripcion",align:"left",class:"text-xs-left",width:"35%",ruta:"descripcion"},{text:"Posibles Dosis",value:"dosis_posibles",align:"left",class:"text-xs-left",width:"15%",ruta:"dosis_posibles",array:!0},{text:"Codigo Unico (opcional)",value:"unique_code",align:"left",class:"text-xs-left",width:"15%",ruta:"unique_code"}]}),computed:{...(0,y.aH)(["loading","persona"]),soloLectura(){return!this.persona.vacunas.config},headersDinamics(){return[...this.headers.filter((a=>!0!==a.ignore))]}},async created(){this.recargarDataTable()},methods:{...(0,y.PY)(["mostrarLoading","mostrarError","mostrarMensaje","ocultarLoading"]),...(0,y.i0)(["requestAPI"]),...(0,y.i0)("vacunas",["actualizarDialogInsumo","buscarInsumosFiltro"]),backgroundClass(a){if(!a)return"";try{return!0===a.estado?"background-color: primary lighten-5":"background-color: error lighten-4"}catch(t){return""}},close(){this.actualizarDialogInsumo({state:!1}),this.recargarDataTable()},async recargarDataTable(){this.dataTable=await this.buscarInsumosFiltro(),this.paginacion.page>Math.ceil(this.dataTable?.length/this.paginacion.rowsPerPage)&&(this.paginacion.page=1)},async borrarInsumo({insumo:a}){if(await this.$root.$confirm.open({titulo:"ELIMINAR",msj:["Podra Eliminarlo solamente si todavia no se utilizo para ningun ingreso/solicitud.","Dejara de estar disponible para la carga de ingresos y filtros de busqueda.",`El Insumo: ${a.nombre}, sera Eliminado.\n¿Desea continuar?`]}))try{this.mostrarLoading({titulo:"Borrando Insumo..."});let t=null;return t=await this.requestAPI({method:"delete",url:`/vacunas/insumo/${a.id}`}),!!t?.data?.ok&&(this.mostrarMensaje({msj:["Borrado exitosamente."],titulo:"Borrado Exitoso"}),this.recargarDataTable(),!0)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (borrarInsumo)"}),!1}finally{this.ocultarLoading()}}}},T=S;var P=(0,M.A)(T,b,f,!1,null,null,null);const N=P.exports},5934:(a,t,e)=>{e.r(t),e.d(t,{default:()=>w});var o=e(28597),r=e(55669),i=e(15852),s=e(1899),n=e(48122),l=e(16251),u=e(41614),c=e(59594),d=e(46227),p=e(69155),m=e(55731),h=e(57e3),g=e(66816),v=function(){var a=this,t=a._self._c;return t(n.A,{attrs:{fluid:"","grid-list-xs":""}},[t(p.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(u.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(i.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(s.OQ,{staticClass:"px-0 text-uppercase"},[a._v("====== Gestion de Vacunas ======")])],1)],1),t(u.A,{attrs:{"pa-1":"","ma-1":"",red:"","darken-2":"",xs12:""}},[t(i.A,{attrs:{color:"yellow darken-1"}},[t(s.OQ,{staticClass:"px-3 font-weight-medium"},[t("p",[t(d.A,{attrs:{color:"red darken-3",left:""}},[a._v(" warning ")]),t("b",[t("u",[a._v("Leer Antes de Usar Vacunatorio/s Destino/s:")])])],1),a._v(" Se tomaran todas las opciones del "),t("b",[t("u",[a._v("Origen")])]),a._v(" y se actualizaran o crearan en caso de que no existan los valores previos en los "),t("b",[t("u",[a._v("Destinos")])]),a._v(". ")])],1)],1),t(u.A,{attrs:{"pa-1":"","ma-1":"",xs12:"",primary:"","lighten-1":""}},[t(i.A,{staticClass:"elevation-6"},[t(p.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[t(u.A,{attrs:{"px-3":""}},[t(d.A,{attrs:{medium:"",color:"white",left:""}},[a._v("tune")]),t("span",{staticClass:"title white--text"},[a._v("Vacunas / Opciones")])],1),t(m.hc),t(r.A,{attrs:{fab:"",small:"",color:"primary darken-2"},on:{click:function(t){return a.retroceder()}}},[t(d.A,[a._v("far fa-arrow-alt-circle-left")])],1)],1),t(s.OQ,[t(c.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:a.valido,callback:function(t){a.valido=t},expression:"valido"}},[t(p.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(m.hc),t(u.A,{attrs:{xs12:"",sm5:"","px-3":""}},[t(o.A,{attrs:{clearable:"","background-color":"primary lighten-5","item-value":"id","item-text":"area",items:a.areasFiltro,label:"Vacunatorio Origen","prepend-icon":"fa-house-medical-flag",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.dataEdit.area,callback:function(t){a.$set(a.dataEdit,"area",t)},expression:"dataEdit.area"}})],1),t(m.hc,{staticClass:"hidden-xs-only"}),t(u.A,{attrs:{xs12:"","px-3":""}},[t(o.A,{attrs:{clearable:"","background-color":"primary lighten-5","item-value":"id","item-text":"area",items:a.areasFiltro,label:"Vacunatorio/s Destino/s (Opcional)","prepend-icon":"fa-house-medical-flag",color:"primary",multiple:"",chips:"","deletable-chips":""},model:{value:a.dataEdit.destinos,callback:function(t){a.$set(a.dataEdit,"destinos",t)},expression:"dataEdit.destinos"}})],1),t(u.A,{attrs:{xs12:"","px-3":"",primary:"","darken-3":""}},[t(p.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t("h4",{staticClass:"title float: left white--text my-1"},[a._v("Opciones de Vacunas")]),t(m.hc),t(g.A,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:e}){return[t(r.A,a._g({attrs:{disabled:a.loading.estado,flat:"",icon:"",color:"white",small:"",right:""},on:{click:function(t){return a.agregarFila(a.dataEdit.opciones,{...a.dataEditBase.opciones[0]})}}},e),[t(d.A,{attrs:{large:""}},[a._v("control_point")])],1)]}}])},[t("span",[a._v("Agregar Vacuna a Opciones")])])],1)],1),a._l(a.dataEdit.opciones,(function(e,i){return t(u.A,{key:`insumos-${i}`,attrs:{xs12:""}},[t(p.A,{class:"grey lighten-"+(i%2===0?"3":"2"),attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(u.A,{attrs:{xs12:"",lg8:"","px-3":""}},[t(o.A,{attrs:{clearable:"","background-color":"primary lighten-5","item-value":"id","item-text":"nombreC",items:a.insumosOpcionesFiltrado,label:"Vacuna","prepend-icon":"fas fa-syringe",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.dataEdit.opciones[i].insumo,callback:function(t){a.$set(a.dataEdit.opciones[i],"insumo",t)},expression:"dataEdit.opciones[index].insumo"}})],1),t(u.A,{attrs:{xs12:"",sm8:"",lg3:"","px-3":""}},[t(h.W,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"shield",label:"Cantidad Minima Recomendada",type:"number",onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'",color:"primary",rules:[...a.rules.requerido,...a.rules.soloNumero,a.rules.minNumber(1)],"validate-on-blur":""},model:{value:a.dataEdit.opciones[i].cant_min,callback:function(t){a.$set(a.dataEdit.opciones[i],"cant_min",t)},expression:"dataEdit.opciones[index].cant_min"}})],1),t(m.hc),t(g.A,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:e}){return[t(r.A,a._g({attrs:{disabled:a.loading.estado,small:"",icon:"",color:"black"},on:{click:function(t){return a.borrarOpcion({opcion:a.dataEdit.opciones[i],index:i})}}},e),[t(d.A,{attrs:{color:"red lighten-2"}},[a._v("delete_forever")])],1)]}}],null,!0)},[t("span",[a._v("Borrar la Opcion (Minimo Recomendado) de la Vacuna en Vacunatorio Origen")])]),t(m.hc,{staticClass:"hidden-xs-only"})],1)],1)})),0===a.dataEdit.opciones?.length?t(p.A,{attrs:{row:"",wrap:""}},[t(u.A,{attrs:{xs12:"","mx-3":"","pb-0":""}},[t(h.W,{attrs:{readonly:"","background-color":"orange lighten-4",label:"No Hay Opciones, Debe haber por lo menos una.","prepend-icon":"warning",color:"orange",solo:"",rules:[...a.rules.requerido]}})],1),t(m.hc),t(r.A,{staticClass:"my-0",attrs:{disabled:a.loading.estado,round:"",color:"primary"},on:{click:function(t){return a.agregarFila(a.dataEdit.opciones,{...a.dataEditBase.opciones[0]})}}},[t(d.A,{attrs:{left:""}},[a._v("control_point")]),a._v("Agregar Vacuna a Opciones ")],1),t(m.hc)],1):a._e()],2)],1)],1),t(p.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:"","lighten-2":""}},[t(r.A,a._g({staticClass:"white--text",attrs:{round:"",disabled:a.loading.estado,loading:a.loading.estado,color:"blue-grey"},on:{click:function(t){return a.agregarFila(a.dataEdit.opciones,{...a.dataEditBase.opciones[0]})}}},a.on),[a._v(" Agregar Vacuna a Opciones "),t(d.A,a._g({attrs:{right:"",color:"white",large:""}},a.on),[a._v(" control_point ")])],1),t(m.hc),t(l.A,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),t(r.A,{class:{"primary darken-1":a.valido,"error darken-1":!a.valido},attrs:{round:"",disabled:a.loading.estado,loading:a.loading.estado},on:{click:a.editarOpciones}},[a._v(" "+a._s(a.valido?"Guardar Cambios":"Formulario No valido"))])],1)],1)],1)],1)],1)},_=[],b=(e(44114),e(95353));const f={name:"vacunaOpciones",data(){return{valido:!0,areasFiltro:[],insumosDB:[],insumosOpcionesFiltrado:[],dataEdit:{},dataEditBase:{area:"",opciones:[{insumo:"",cant_min:0}],destinos:[]}}},computed:{...(0,b.aH)(["loading","rules"]),insumosOpciones(){return this.dataEdit.opciones?.map((({insumo:a})=>a))}},watch:{async"dataEdit.area"(a){if(a){let t=await this.buscarOpcionesVacunatorio({area:a});this.dataEdit=t||{...this._cloneDeep(this.dataEditBase),area:a}}},async insumosOpciones(){this.insumosOpcionesFiltrado=await this.filtrarArrayParaSelectsDisabled({arraySelects:this.insumosDB,arrayDisable:this.insumosOpciones,propCompare:"_id"})}},async created(){this.insumosDB=await this.buscarInsumosFiltro({select:"nombre descripcion nombreC"}),this.areasFiltro=[...await this.buscarAreaFiltros({filtro:{vacunatorio:!0},populate:"no",select:"area"})],this.dataEdit=this._cloneDeep(this.dataEditBase)},methods:{...(0,b.PY)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),...(0,b.i0)(["retroceder","requestAPI","filtrarArrayParaSelectsDisabled"]),...(0,b.i0)("main",["buscarAreaFiltros"]),...(0,b.i0)("vacunas",["buscarInsumosFiltro"]),async buscarOpcionesVacunatorio({area:a}){try{this.mostrarLoading({titulo:"Cargando Opciones..."});let t=null;return t=await this.requestAPI({method:"get",url:`/vacunas/opciones?area=${a}`}),t?.data?.ok?t.data.opciones:this._cloneDeep(this.dataEditBase)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarOpcionesVacunatorio)"}),this._cloneDeep(this.dataEditBase)}finally{this.ocultarLoading()}},async editarOpciones(){if(this.$refs.form.validate())try{this.mostrarLoading({titulo:"Guardando Opciones...",color:"primary"});let a=this._cloneDeep(this.dataEdit),t=null;t=await this.requestAPI({method:"put",url:"/vacunas/opciones",update:a}),t&&this.mostrarMensaje({titulo:"Guardado Exitoso",msj:["Cambios efectuados exitosamente."]})}catch(a){this.mostrarError({titulo:"Inesperado (editarOpciones)",mensaje:a})}finally{this.ocultarLoading(),this.dataEdit=await this.buscarOpcionesVacunatorio({area:this.dataEdit.area})}else this.mostrarError({titulo:"Valores Requeridos.",mensaje:"Revise los campos obligatorios."})},async borrarOpcion({opcion:a,index:t}){if(a._id){if(await this.$root.$confirm.open({titulo:"ELIMINAR",msj:["Se Borrara la Opcion (Minimo Recomendado) sin posibilidad de deshacer esta accion.",`La Opcion de "${this.insumosDB.find((t=>t.id===a.insumo))?.nombre}", sera Eliminada.\n¿Desea continuar??`]}))try{this.mostrarLoading({titulo:"Borrando Opcion..."});let t=null;if(t=await this.requestAPI({method:"delete",url:`/vacunas/opciones/${a._id}`}),t?.data?.ok)return void this.mostrarMensaje({titulo:"Borrado Exitoso",msj:["Borrado efectuado exitosamente."]})}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (borrarOpcion)"}),!1}finally{this.ocultarLoading(),this.dataEdit=await this.buscarOpcionesVacunatorio({area:this.dataEdit.area})}}else this.borrarFila(this.dataEdit.opciones,t)},agregarFila(a,t){a.length<this.insumosDB.length&&a.push(t||"")},borrarFila(a,t){a.splice(t,1)}}},y=f;var x=e(81656),A=(0,x.A)(y,v,_,!1,null,null,null);const w=A.exports}}]);