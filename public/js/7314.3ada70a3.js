"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[7314],{12683:function(t,e,i){i.d(e,{A:function(){return c}});var s=function(){var t=this,e=t._self._c;return t.field.array?e("span",[t.field.object?e("span",t._l(t._get(t.props.item,t.field.ruta),(function(i,s){return e("code",{key:`${t.field.text}-${s}`,attrs:{STYLE:"margin:4px"}},[t.field.keyShow?e("span",[t._v(t._s(t.field.date?t.mostrarFecha(i[t.field.keyShow],t.field.time)||"--------":i[t.field.keyShow]??"--------"))]):e("span",t._l(i,(function(r,a,n){return e("span",{key:`${t.field.text}-${s}-${a}`},[t._v(t._s(a)+": "),e("kbd",[t._v(t._s(isNaN(r)&&"Invalid Date"!==t.mostrarFecha(r,t.field.time)?t.mostrarFecha(r,t.field.time)||"--------":r??"--------"))]),n!=Object.keys(i).length-1?e("span",[t._v(t._s("\n"))]):t._e()])})),0)])})),0):e("span",t._l(t._get(t.props.item,t.field.ruta),(function(i,s){return e("code",{key:`${t.field.text}-${s}`,attrs:{STYLE:"margin:4px"}},[t._v(t._s(t.field.date?t.mostrarFecha(i,t.field.time)||"--------":i??"--------"))])})),0)]):t.field.object?e("span",[e("code",{attrs:{STYLE:"margin:4px"}},[t.field.keyShow?e("span",[t._v(t._s(t.field.date?t.mostrarFecha(t._get(t.props.item,t.field.ruta)[t.field.keyShow],t.field.time)||"--------":t._get(t.props.item,t.field.ruta)[t.field.keyShow]??"--------"))]):e("span",t._l(t._get(t.props.item,t.field.ruta),(function(i,s,r){return e("span",{key:`${t.field.text}-${s}`},[t._v(t._s(s)+": "),e("kbd",[t._v(t._s(isNaN(i)&&"Invalid Date"!==t.mostrarFecha(i,t.field.time)?`${t.mostrarFecha(i,t.field.time)}`||"--------":i??"--------"))]),r!=Object.keys(t._get(t.props.item,t.field.ruta)).length-1?e("span",[t._v(t._s("\n"))]):t._e()])})),0)])]):e("span",{style:""+(t.field.numeric&&t._get(t.props.item,t.field.ruta)<0?"color: red;":"")},[t._v(t._s(t.field.date?t.mostrarFecha(t.props.item[t.field.ruta],t.field.time)||"--------":t.field.boolean?""+(t._get(t.props.item,t.field.ruta)&&"false"!=t._get(t.props.item,t.field.ruta)&&"0"!=t._get(t.props.item,t.field.ruta)?"Si":"No"):t._get(t.props.item,t.field.ruta)?.toLocaleString("es-AR")??"--------"))])},r=[],a={name:"body-data-table-dinamic",props:["props","field"]},n=a,o=i(81656),l=(0,o.A)(n,s,r,!1,null,null,null),c=l.exports},12661:function(t,e,i){i.d(e,{A:function(){return C}});var s=i(21999),r=i(28383),a=i(3150),n=i(1899),o=i(37471),l=i(81851),c=i(34172),u=i(41614),p=i(21527),d=i(69155),h=i(17912),f=i(55731),m=i(57e3),v=function(){var t=this,e=t._self._c;return e(d.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(u.A,{attrs:{"pa-1":"",cuarto:"",xs12:""}},[e(a.A,{staticClass:"cuarto darken-1"},[e(n.OQ,{staticClass:"white--text text-xs-center"},[t._v("====== ====== DATOS PARA LA BUSQUEDA ====== ======")])],1),e(a.A,{staticClass:"elevation-6 grey lighten-4"},[e(u.A,{attrs:{xs12:""},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.recargarDataTable(t.filtroPacientes)}}},[e("formFiltroPaciente",{attrs:{filtro:t.filtroPacientes}})],1),e(d.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(f.hc),e(f.hc),e(f.hc),e(r.A,{staticClass:"white--text cuarto darken-2",attrs:{round:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:function(e){return t.recargarDataTable(t.filtroPacientes)}}},[t._v("Buscar ")]),e(f.hc)],1)],1)],1),e(u.A,{attrs:{"pa-1":"","mt-1":"",terciary:"","lighten-1":"",xs12:""}},[e(o.A,{staticClass:"title white--text terciary elevation-6"},[e(p.A,{attrs:{large:"",color:"white",left:""}},[t._v("personal_injury")]),t._v(" Pacientes "),e(f.hc),e(c.A,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),e(m.W,{attrs:{clearable:"","append-icon":"search",label:"Filtrar de la Busqueda","single-line":"","hide-details":"",color:"grey lighten-3"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),e(d.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","lighten-2":""}},[e(u.A,{attrs:{xs12:"",sm7:"","pa-2":""}},[e(d.A,{attrs:{"align-left":"","justify-left":"",row:"",wrap:""}},[e(u.A,{attrs:{xs12:""}},[e(p.A,{attrs:{color:"terciary darken-2",left:""}},[t._v("fas fa-user-edit")]),e("span",{staticClass:"body-2 black--text"},[t._v("Actualizar Informacion del Paciente")])],1),e(u.A,{attrs:{xs12:"","pt-1":""}},[e(p.A,{attrs:{color:"orange darken-2",left:""}},[t._v(t._s(t.selectionIcon))]),e("span",{staticClass:"body-2 black--text"},[t._v("Seleccionar Paciente para Continuar")])],1)],1)],1),e(f.hc),e(c.A,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),e(r.A,{staticClass:"white--text terciary darken-1",attrs:{round:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:function(e){return t.actualizarDialogPaciente({state:!0})}}},[t._v("Alta Nuevo Paciente")])],1),e(l.A,{staticClass:"elevation-6",staticStyle:{"table-layout":"fixed"},attrs:{id:"tablita",headers:t.headers,items:t.dataTable,"item-key":"_id",pagination:t.paginacion,"rows-per-page-items":[5,10,25,50],loading:t.loading.estado,search:t.search},on:{"update:pagination":function(e){t.paginacion=e}},scopedSlots:t._u([{key:"no-data",fn:function(){return[e(s.A,{staticClass:"title text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[t._v(" No hay datos para mostrar. ")])]},proxy:!0},{key:"no-results",fn:function(){return[e(s.A,{staticClass:"title text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[t._v(' No se encontraron resultados para "'+t._s(t.search)+'". ')])]},proxy:!0},{key:"items",fn:function(i){return[e("tr",{class:t.backgroundClass(i.item)},[e("td",{staticClass:"px-0"},[e(d.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(u.A,{staticClass:"text-xs-center",attrs:{xs12:"",sm6:""}},[e(r.A,{attrs:{flat:"",icon:"",disabled:t.loading.estado,color:"terciary"},on:{click:function(e){return t.actualizarDialogPaciente({state:!0,id:i.item._id})}}},[e(p.A,[t._v("fas fa-user-edit")])],1)],1),e(u.A,{staticClass:"text-xs-center",attrs:{xs12:"",sm6:""}},[e(r.A,{attrs:{flat:"",icon:"",disabled:t.loading.estado,color:"orange darken-2"},on:{click:function(e){return t.$emit("selectedPaciente",{paciente:i.item})}}},[e(p.A,[t._v(t._s(t.selectionIcon))])],1)],1)],1)],1),e("td",{staticClass:"text-sm-left px-2",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.actualizarDialogPaciente({state:!0,id:i.item._id})}}},[t._v(" "+t._s(i.item.nombreC)+" ")]),e("td",{staticClass:"text-sm-left px-2",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.actualizarDialogPaciente({state:!0,id:i.item._id})}}},[t._v(" "+t._s(i.item.fec_nac)+" ")]),e("td",{staticClass:"text-sm-left px-2",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.actualizarDialogPaciente({state:!0,id:i.item._id})}}},[t._v(" "+t._s(i.item.documentoC)+" ")]),e("td",{staticClass:"text-sm-left px-2",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.actualizarDialogPaciente({state:!0,id:i.item._id})}}},[t._v(" "+t._s(i.item.direccion)+" ")]),e("td",{staticClass:"text-sm-left px-2",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.actualizarDialogPaciente({state:!0,id:i.item._id})}}},[t._v(" "+t._s(i.item.dir_localidad)+" ")]),e("td",{staticClass:"text-sm-left px-2",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.actualizarDialogPaciente({state:!0,id:i.item._id})}}},[t._v(" "+t._s(i.item.telefono)+" ")])])]}}])},[e(h.A,{attrs:{color:"green",indeterminate:""}})],1)],1),e("dialogPaciente",{attrs:{closeFinish:t.recargarDataTable}})],1)},_=[],g=(i(64979),i(71678),i(95353)),y=i(10891),b=i(9953),A={name:"selectPaciente",components:{formFiltroPaciente:y.A,dialogPaciente:b.A},props:["selectIcon","refreshState"],data(){return{selectionIcon:this.selectIcon||"check_circle_outline",filtroPacientes:{apellido:"",nombre:"",documento:"",dir_barrio:"",dir_localidad:"",hist_salitas:{area:null,historial:""}},filtroPacientesBase:{apellido:"",nombre:"",documento:"",dir_barrio:"",dir_localidad:"",hist_salitas:{area:null,historial:""}},ultimoFiltro:!1,dataTable:[],search:"",paginacion:{sortBy:"nombreC",descending:!1,rowsPerPage:5,page:1},headers:[{text:"Acciones",value:"_id",sortable:!1,width:"5%"},{text:"Nombre Completo",value:"nombreC",width:"25%"},{text:"Fec. Nac.",value:"fec_nac",width:"10%"},{text:"Documento",value:"documentoC",width:"10%"},{text:"Domicilio",value:"direccion",width:"25%"},{text:"Localidad",value:"dir_localidad",width:"10%"},{text:"Telefono",value:"telefono",width:"15%"}]}},computed:{...(0,g.aH)(["loading","persona"])},watch:{refreshState(t){t||(this.dataTable=[],this.filtroPacientes=structuredClone({...this.filtroPacientesBase}),this.ultimoFiltro=!1,this.search="")}},methods:{...(0,g.i0)("paciente",["actualizarDialogPaciente","buscarPacienteFiltros"]),backgroundClass(t){if(!t)return"";try{return t.estado?"background-color: terciary lighten-5":"background-color: error lighten-4"}catch(e){return""}},async recargarDataTable(t){if(t){this.filtroPacientes={...this.filtroPacientesBase,...t};let e=await this.buscarPacienteFiltros({filtro:t,select:"nombre apellido documento tipo_doc doc_responsable sexo fec_nac telefono telefono_alt email dir_calle dir_numero dir_localidad oSocial fec_fallecimiento estado"});e&&(this.dataTable=e,this.ultimoFiltro=structuredClone({...t}))}else this.ultimoFiltro&&(this.dataTable=await this.buscarPacienteFiltros({filtro:this.ultimoFiltro,select:"nombre apellido documento tipo_doc doc_responsable sexo fec_nac telefono telefono_alt email dir_calle dir_numero dir_localidad oSocial fec_fallecimiento estado"}));this.paginacion.page>Math.ceil(this.dataTable?.length/this.paginacion.rowsPerPage)&&(this.paginacion.page=1)}}},x=A,k=i(81656),w=(0,k.A)(x,v,_,!1,null,null,null),C=w.exports},26786:function(t,e,i){i.d(e,{A:function(){return o}});var s=i(88e3),r=i(677),a=i(72006),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t},o=(0,a.A)((0,s.G)("stepper"),r.A).extend({name:"v-stepper",provide:function(){return{stepClick:this.stepClick,isVertical:this.vertical}},props:{nonLinear:Boolean,altLabels:Boolean,vertical:Boolean,value:[Number,String]},data:function(){return{inputValue:null,isBooted:!1,steps:[],content:[],isReverse:!1}},computed:{classes:function(){return n({"v-stepper":!0,"v-stepper--is-booted":this.isBooted,"v-stepper--vertical":this.vertical,"v-stepper--alt-labels":this.altLabels,"v-stepper--non-linear":this.nonLinear},this.themeClasses)}},watch:{inputValue:function(t,e){this.isReverse=Number(t)<Number(e);for(var i=this.steps.length;--i>=0;)this.steps[i].toggle(this.inputValue);for(var s=this.content.length;--s>=0;)this.content[s].toggle(this.inputValue,this.isReverse);this.$emit("input",this.inputValue),e&&(this.isBooted=!0)},value:function(){var t=this;this.$nextTick((function(){return t.inputValue=t.value}))}},mounted:function(){this.inputValue=this.value||this.steps[0].step||1},methods:{register:function(t){"v-stepper-step"===t.$options.name?this.steps.push(t):"v-stepper-content"===t.$options.name&&(t.isVertical=this.vertical,this.content.push(t))},unregister:function(t){"v-stepper-step"===t.$options.name?this.steps=this.steps.filter((function(e){return e!==t})):"v-stepper-content"===t.$options.name&&(t.isVertical=this.vertical,this.content=this.content.filter((function(e){return e!==t})))},stepClick:function(t){var e=this;this.$nextTick((function(){return e.inputValue=t}))}},render:function(t){return t("div",{class:this.classes},this.$slots.default)}})},3016:function(t,e,i){var s=i(40657),r=i(88e3),a=i(69463),n=i(72006);e.A=(0,n.A)((0,r.W)("stepper","v-stepper-content","v-stepper")).extend({name:"v-stepper-content",inject:{isVerticalProvided:{from:"isVertical"}},props:{step:{type:[Number,String],required:!0}},data:function(){return{height:0,isActive:null,isReverse:!1,isVertical:this.isVerticalProvided}},computed:{classes:function(){return{"v-stepper__content":!0}},computedTransition:function(){return this.isReverse?s.P1:s.Dk},styles:function(){return this.isVertical?{height:(0,a.Dg)(this.height)}:{}},wrapperClasses:function(){return{"v-stepper__wrapper":!0}}},watch:{isActive:function(t,e){t&&null==e?this.height="auto":this.isVertical&&(this.isActive?this.enter():this.leave())}},mounted:function(){this.$refs.wrapper.addEventListener("transitionend",this.onTransition,!1),this.stepper&&this.stepper.register(this)},beforeDestroy:function(){this.$refs.wrapper.removeEventListener("transitionend",this.onTransition,!1),this.stepper&&this.stepper.unregister(this)},methods:{onTransition:function(t){this.isActive&&"height"===t.propertyName&&(this.height="auto")},enter:function(){var t=this,e=0;requestAnimationFrame((function(){e=t.$refs.wrapper.scrollHeight})),this.height=0,setTimeout((function(){return t.isActive&&(t.height=e||"auto")}),450)},leave:function(){var t=this;this.height=this.$refs.wrapper.clientHeight,setTimeout((function(){return t.height=0}),10)},toggle:function(t,e){this.isActive=t.toString()===this.step.toString(),this.isReverse=e}},render:function(t){var e={class:this.classes},i={class:this.wrapperClasses,style:this.styles,ref:"wrapper"};this.isVertical||(e.directives=[{name:"show",value:this.isActive}]);var s=t("div",i,[this.$slots.default]),r=t("div",e,[s]);return t(this.computedTransition,{on:this.$listeners},[r])}})},72031:function(t,e,i){var s=i(54582),r=i(47971),a=i(88e3),n=i(52540),o=i(72006);e.A=(0,o.A)(r.A,(0,a.W)("stepper","v-stepper-step","v-stepper")).extend({name:"v-stepper-step",directives:{Ripple:n.A},inject:["stepClick"],props:{color:{type:String,default:"primary"},complete:Boolean,completeIcon:{type:String,default:"$vuetify.icons.complete"},editIcon:{type:String,default:"$vuetify.icons.edit"},errorIcon:{type:String,default:"$vuetify.icons.error"},editable:Boolean,rules:{type:Array,default:function(){return[]}},step:[Number,String]},data:function(){return{isActive:!1,isInactive:!0}},computed:{classes:function(){return{"v-stepper__step":!0,"v-stepper__step--active":this.isActive,"v-stepper__step--editable":this.editable,"v-stepper__step--inactive":this.isInactive,"v-stepper__step--error":this.hasError,"v-stepper__step--complete":this.complete,"error--text":this.hasError}},hasError:function(){return this.rules.some((function(t){return!0!==t()}))}},mounted:function(){this.stepper&&this.stepper.register(this)},beforeDestroy:function(){this.stepper&&this.stepper.unregister(this)},methods:{click:function(t){t.stopPropagation(),this.$emit("click",t),this.editable&&this.stepClick(this.step)},toggle:function(t){this.isActive=t.toString()===this.step.toString(),this.isInactive=Number(t)<Number(this.step)}},render:function(t){var e={class:this.classes,directives:[{name:"ripple",value:this.editable}],on:{click:this.click}},i=void 0;i=this.hasError?[t(s.A,{},this.errorIcon)]:this.complete?this.editable?[t(s.A,{},this.editIcon)]:[t(s.A,{},this.completeIcon)]:String(this.step);var r=!(this.hasError||!this.complete&&!this.isActive)&&this.color,a=t("span",this.setBackgroundColor(r,{staticClass:"v-stepper__step__step"}),i),n=t("div",{staticClass:"v-stepper__label"},this.$slots.default);return t("div",e,[a,n])}})},1904:function(t,e,i){i.d(e,{WV:function(){return l},vY:function(){return o}});var s=i(69463),r=i(26786),a=i(72031),n=i(3016),o=(0,s.Gn)("v-stepper__header"),l=(0,s.Gn)("v-stepper__items");r.A,n.A,a.A}}]);