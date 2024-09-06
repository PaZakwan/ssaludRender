"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[2008],{83543:(a,t,e)=>{e.r(t),e.d(t,{default:()=>x});var i=e(28597),r=e(55669),s=e(15852),o=e(1899),n=e(48122),l=e(16251),d=e(41614),c=e(59594),u=e(46227),p=e(69155),m=e(55731),h=e(57e3),f=e(66816),g=function(){var a=this,t=a._self._c;return t(n.A,{attrs:{fluid:"","grid-list-xs":""}},[t(p.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(d.A,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(s.A,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(o.OQ,{staticClass:"px-0 text-uppercase"},[a._v("====== Gestion de Farmacia ======")])],1)],1),t(d.A,{attrs:{"pa-1":"","ma-1":"",red:"","darken-2":"",xs12:""}},[t(s.A,{attrs:{color:"yellow darken-1"}},[t(o.OQ,{staticClass:"px-3 font-weight-medium"},[t("p",[t(u.A,{attrs:{color:"red darken-3",left:""}},[a._v(" warning ")]),t("b",[t("u",[a._v("Leer Antes de Usar Farmacia/s Destino/s:")])])],1),a._v(" Se tomaran todas las opciones del "),t("b",[t("u",[a._v("Origen")])]),a._v(" y se actualizaran o crearan en caso de que no existan los valores previos en los "),t("b",[t("u",[a._v("Destinos")])]),a._v(". ")])],1)],1),t(d.A,{attrs:{"pa-1":"","ma-1":"",xs12:"",primary:"","lighten-1":""}},[t(s.A,{staticClass:"elevation-6"},[t(p.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[t(d.A,{attrs:{"px-3":""}},[t(u.A,{attrs:{medium:"",color:"white",left:""}},[a._v("tune")]),t("span",{staticClass:"title white--text"},[a._v("Farmacia / Opciones")])],1),t(m.hc),t(r.A,{attrs:{fab:"",small:"",color:"primary darken-2"},on:{click:function(t){return a.retroceder()}}},[t(u.A,[a._v("far fa-arrow-alt-circle-left")])],1)],1),t(o.OQ,[t(c.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:a.valido,callback:function(t){a.valido=t},expression:"valido"}},[t(p.A,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(m.hc),t(d.A,{attrs:{xs12:"",sm5:"","px-3":""}},[t(i.A,{attrs:{clearable:"","background-color":"primary lighten-5","item-value":"id","item-text":"area",items:a.areasFiltro,label:"Farmacia Origen","prepend-icon":"fa-house-medical-flag",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.dataEdit.area,callback:function(t){a.$set(a.dataEdit,"area",t)},expression:"dataEdit.area"}})],1),t(m.hc,{staticClass:"hidden-xs-only"}),t(d.A,{attrs:{xs12:"","px-3":""}},[t(i.A,{attrs:{clearable:"","background-color":"primary lighten-5","item-value":"id","item-text":"area",items:a.areasFiltro,label:"Farmacia/s Destino/s (Opcional)","prepend-icon":"fa-house-medical-flag",color:"primary",multiple:"",chips:"","deletable-chips":""},model:{value:a.dataEdit.destinos,callback:function(t){a.$set(a.dataEdit,"destinos",t)},expression:"dataEdit.destinos"}})],1),t(d.A,{attrs:{xs12:"","px-3":"",primary:"","darken-3":""}},[t(p.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t("h4",{staticClass:"title float: left white--text my-1"},[a._v("Opciones de Insumos")]),t(m.hc),t(f.A,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:e}){return[t(r.A,a._g({attrs:{disabled:a.loading.estado,flat:"",icon:"",color:"white",small:"",right:""},on:{click:function(t){return a.agregarFila(a.dataEdit.opciones,{...a.dataEditBase.opciones[0]})}}},e),[t(u.A,{attrs:{large:""}},[a._v("control_point")])],1)]}}])},[t("span",[a._v("Agregar Insumo a Opciones")])])],1)],1),a._l(a.dataEdit.opciones,(function(e,s){return t(d.A,{key:`insumos-${s}`,attrs:{xs12:""}},[t(p.A,{class:"grey lighten-"+(s%2===0?"3":"2"),attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(d.A,{attrs:{xs12:"",lg8:"","px-3":""}},[t(i.A,{attrs:{clearable:"","background-color":"primary lighten-5","item-value":"id","item-text":"nombreC",items:a.insumosOpcionesFiltrado,label:"Insumo","prepend-icon":"fa-solid fa-pills",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.dataEdit.opciones[s].insumo,callback:function(t){a.$set(a.dataEdit.opciones[s],"insumo",t)},expression:"dataEdit.opciones[index].insumo"}})],1),t(d.A,{attrs:{xs12:"",sm8:"",lg3:"","px-3":""}},[t(h.W,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"shield",label:"Cantidad Minima Recomendada",type:"number",onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'",color:"primary",rules:[...a.rules.requerido,...a.rules.soloNumero,a.rules.minNumber(1)],"validate-on-blur":""},model:{value:a.dataEdit.opciones[s].cant_min,callback:function(t){a.$set(a.dataEdit.opciones[s],"cant_min",t)},expression:"dataEdit.opciones[index].cant_min"}})],1),t(m.hc),t(f.A,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:e}){return[t(r.A,a._g({attrs:{disabled:a.loading.estado,small:"",icon:"",color:"black"},on:{click:function(t){return a.borrarOpcion({opcion:a.dataEdit.opciones[s],index:s})}}},e),[t(u.A,{attrs:{color:"red lighten-2"}},[a._v("delete_forever")])],1)]}}],null,!0)},[t("span",[a._v("Borrar la Opcion (Minimo Recomendado) del Insumo en Farmacia Origen")])]),t(m.hc,{staticClass:"hidden-xs-only"})],1)],1)})),0===a.dataEdit.opciones?.length?t(p.A,{attrs:{row:"",wrap:""}},[t(d.A,{attrs:{xs12:"","mx-3":"","pb-0":""}},[t(h.W,{attrs:{readonly:"","background-color":"orange lighten-4",label:"No Hay Opciones, Debe haber por lo menos una.","prepend-icon":"warning",color:"orange",solo:"",rules:[...a.rules.requerido]}})],1),t(m.hc),t(r.A,{staticClass:"my-0",attrs:{disabled:a.loading.estado,round:"",color:"primary"},on:{click:function(t){return a.agregarFila(a.dataEdit.opciones,{...a.dataEditBase.opciones[0]})}}},[t(u.A,{attrs:{left:""}},[a._v("control_point")]),a._v("Agregar Insumo a Opciones ")],1),t(m.hc)],1):a._e()],2)],1)],1),t(p.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:"","lighten-2":""}},[t(r.A,a._g({staticClass:"white--text",attrs:{round:"",disabled:a.loading.estado,loading:a.loading.estado,color:"blue-grey"},on:{click:function(t){return a.agregarFila(a.dataEdit.opciones,{...a.dataEditBase.opciones[0]})}}},a.on),[a._v(" Agregar Insumo a Opciones "),t(u.A,a._g({attrs:{right:"",color:"white",large:""}},a.on),[a._v(" control_point ")])],1),t(m.hc),t(l.A,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),t(r.A,{class:{"primary darken-1":a.valido,"error darken-1":!a.valido},attrs:{round:"",disabled:a.loading.estado,loading:a.loading.estado},on:{click:a.editarOpciones}},[a._v(" "+a._s(a.valido?"Guardar Cambios":"Formulario No valido"))])],1)],1)],1)],1)],1)},v=[],b=(e(44114),e(95353));const y={name:"farmaciaOpciones",data(){return{valido:!0,areasFiltro:[],insumosDB:[],insumosOpcionesFiltrado:[],dataEdit:{},dataEditBase:{area:"",opciones:[{insumo:"",cant_min:0}],destinos:[]}}},computed:{...(0,b.aH)(["loading","rules"]),insumosOpciones(){return this.dataEdit.opciones?.map((({insumo:a})=>a))}},watch:{async"dataEdit.area"(a){if(a){let t=await this.buscarFarmaciaOpciones({area:a});this.dataEdit=t||{...this._cloneDeep(this.dataEditBase),area:a}}},async insumosOpciones(){this.insumosOpcionesFiltrado=await this.filtrarArrayParaSelectsDisabled({arraySelects:this.insumosDB,arrayDisable:this.insumosOpciones,propCompare:"_id"})}},async created(){this.insumosDB=await this.buscarInsumosFiltro({select:"nombre descripcion nombreC"}),this.areasFiltro=[...await this.buscarAreaFiltros({filtro:{farmacia:!0},populate:"no",select:"area"})],this.dataEdit=this._cloneDeep(this.dataEditBase)},methods:{...(0,b.PY)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),...(0,b.i0)(["retroceder","requestAPI","filtrarArrayParaSelectsDisabled"]),...(0,b.i0)("main",["buscarAreaFiltros"]),...(0,b.i0)("farmacia",["buscarInsumosFiltro"]),async buscarFarmaciaOpciones({area:a}){try{this.mostrarLoading({titulo:"Cargando Opciones..."});let t=null;return t=await this.requestAPI({method:"get",url:`/farmacia/opciones?area=${a}`}),t?.data?.ok?t.data.opciones:this._cloneDeep(this.dataEditBase)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarFarmaciaOpciones)"}),this._cloneDeep(this.dataEditBase)}finally{this.ocultarLoading()}},async editarOpciones(){if(this.$refs.form.validate())try{this.mostrarLoading({titulo:"Guardando Opciones...",color:"primary"});let a=this._cloneDeep(this.dataEdit),t=null;t=await this.requestAPI({method:"put",url:"/farmacia/opciones",update:a}),t&&this.mostrarMensaje({titulo:"Guardado Exitoso",msj:["Cambios efectuados exitosamente."]})}catch(a){this.mostrarError({titulo:"Inesperado (editarOpciones)",mensaje:a})}finally{this.ocultarLoading(),this.dataEdit=await this.buscarFarmaciaOpciones({area:this.dataEdit.area})}else this.mostrarError({titulo:"Valores Requeridos.",mensaje:"Revise los campos obligatorios."})},async borrarOpcion({opcion:a,index:t}){if(a._id){if(await this.$root.$confirm.open({titulo:"ELIMINAR",msj:["Se Borrara la Opcion (Minimo Recomendado) sin posibilidad de deshacer esta accion.",`La Opcion de "${this.insumosDB.find((t=>t.id===a.insumo))?.nombre}", sera Eliminada.\n¿Desea continuar??`]}))try{this.mostrarLoading({titulo:"Borrando Opcion..."});let t=null;if(t=await this.requestAPI({method:"delete",url:`/farmacia/opciones/${a._id}`}),t?.data?.ok)return void this.mostrarMensaje({titulo:"Borrado Exitoso",msj:["Borrado efectuado exitosamente."]})}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (borrarOpcion)"}),!1}finally{this.ocultarLoading(),this.dataEdit=await this.buscarFarmaciaOpciones({area:this.dataEdit.area})}}else this.borrarFila(this.dataEdit.opciones,t)},agregarFila(a,t){a.length<this.insumosDB.length&&a.push(t||"")},borrarFila(a,t){a.splice(t,1)}}},_=y;var A=e(81656),w=(0,A.A)(_,g,v,!1,null,null,null);const x=w.exports},59594:(a,t,e)=>{e.d(t,{A:()=>r});var i=e(88e3);const r={name:"v-form",mixins:[(0,i.G)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var a=Object.values(this.errorBag).includes(!0);this.$emit("input",!a)},deep:!0,immediate:!0}},methods:{watchInput:function(a){var t=this,e=function(a){return a.$watch("hasError",(function(e){t.$set(t.errorBag,a._uid,e)}),{immediate:!0})},i={_uid:a._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=a.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(a._uid)||(i.valid=e(a)))})):i.valid=e(a),i},validate:function(){var a=this.inputs.filter((function(a){return!a.validate(!0)})).length;return!a},reset:function(){for(var a=this,t=this.inputs.length;t--;)this.inputs[t].reset();this.lazyValidation&&setTimeout((function(){a.errorBag={}}),0)},resetValidation:function(){for(var a=this,t=this.inputs.length;t--;)this.inputs[t].resetValidation();this.lazyValidation&&setTimeout((function(){a.errorBag={}}),0)},register:function(a){var t=this.watchInput(a);this.inputs.push(a),this.watchers.push(t)},unregister:function(a){var t=this.inputs.find((function(t){return t._uid===a._uid}));if(t){var e=this.watchers.find((function(a){return a._uid===t._uid}));e.valid&&e.valid(),e.shouldValidate&&e.shouldValidate(),this.watchers=this.watchers.filter((function(a){return a._uid!==t._uid})),this.inputs=this.inputs.filter((function(a){return a._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(a){var t=this;return a("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(a){return t.$emit("submit",a)}}},this.$slots.default)}}}}]);