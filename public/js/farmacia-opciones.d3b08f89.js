"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[440],{6266:(a,t,e)=>{e.r(t),e.d(t,{default:()=>w});var i=e(7416),r=e(6194),s=e(8956),o=e(2353),n=e(5050),l=e(108),d=e(683),c=e(445),u=e(3667),m=e(9456),p=e(8143),h=e(4618),f=e(1415),g=function(){var a=this,t=a._self._c;return t(n.Z,{attrs:{fluid:"","grid-list-xs":""}},[t(m.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[t(d.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[t(s.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[t(o.ZB,{staticClass:"px-0 text-uppercase"},[a._v("====== Gestion de Farmacia ======")])],1)],1),t(d.Z,{attrs:{"pa-1":"","ma-1":"",xs12:"",primary:"","lighten-1":""}},[t(s.Z,{staticClass:"elevation-6"},[t(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[t(d.Z,{attrs:{"px-3":""}},[t(u.Z,{attrs:{medium:"",color:"white",left:""}},[a._v("tune")]),t("span",{staticClass:"title white--text"},[a._v("Farmacia / Opciones")])],1),t(p.Cl),t(r.Z,{attrs:{fab:"",small:"",color:"primary darken-2"},on:{click:function(t){return a.retroceder()}}},[t(u.Z,[a._v("far fa-arrow-alt-circle-left")])],1)],1),t(o.ZB,[t(c.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:a.valido,callback:function(t){a.valido=t},expression:"valido"}},[t(m.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(p.Cl),t(d.Z,{attrs:{xs12:"",sm5:"","px-3":""}},[t(i.Z,{attrs:{clearable:"","background-color":"primary lighten-5","item-value":"id","item-text":"area",items:a.areasFiltro,label:"Farmacia Origen","prepend-icon":"fa-house-medical-flag",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.dataEdit.area,callback:function(t){a.$set(a.dataEdit,"area",t)},expression:"dataEdit.area"}})],1),t(f.Z,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:e}){return[t(r.Z,a._g({attrs:{disabled:a.loading.estado,small:"",icon:"",color:"black"},on:{click:function(t){return a.borrarOpciones(a.dataEdit.area)}}},e),[t(u.Z,{attrs:{color:"red lighten-2"}},[a._v("delete_forever")])],1)]}}])},[t("span",[a._v("Borrar Todas las Opciones (Minimos) de Insumos en Farmacia Origen")])]),t(p.Cl,{staticClass:"hidden-xs-only"}),t(d.Z,{attrs:{xs12:"","px-3":""}},[t(i.Z,{attrs:{clearable:"","background-color":"primary lighten-5","item-value":"id","item-text":"area",items:a.areasFiltro,label:"Farmacia/s Destino/s (Opcional)","prepend-icon":"fa-house-medical-flag",color:"primary",multiple:"",chips:"","deletable-chips":""},model:{value:a.dataEdit.destinos,callback:function(t){a.$set(a.dataEdit,"destinos",t)},expression:"dataEdit.destinos"}})],1),t(d.Z,{attrs:{xs12:"","px-3":"",primary:"","darken-3":""}},[t(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[t("h4",{staticClass:"title float: left white--text my-1"},[a._v("Opciones de Insumos")]),t(p.Cl)],1)],1),a._l(a.dataEdit.opciones,(function(e,s){return t(d.Z,{key:`insumos-${s}`,attrs:{xs12:""}},[t(m.Z,{class:"grey lighten-"+(s%2===0?"3":"2"),attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[t(d.Z,{attrs:{xs12:"",lg8:"","px-3":""}},[t(i.Z,{attrs:{clearable:"","background-color":"primary lighten-5","item-value":"id","item-text":"nombreC",items:a.insumosOpcionesFiltrado,label:"Insumo","prepend-icon":"fa-solid fa-pills",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.dataEdit.opciones[s].insumo,callback:function(t){a.$set(a.dataEdit.opciones[s],"insumo",t)},expression:"dataEdit.opciones[index].insumo"}})],1),t(d.Z,{attrs:{xs12:"",sm8:"",lg3:"","px-3":""}},[t(h.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"grain",label:"Cantidad Minima Recomendada",type:"number",onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'",color:"primary",rules:[...a.rules.requerido,...a.rules.soloNumero,a.rules.minNumber(1)],"validate-on-blur":""},model:{value:a.dataEdit.opciones[s].cant_min,callback:function(t){a.$set(a.dataEdit.opciones[s],"cant_min",t)},expression:"dataEdit.opciones[index].cant_min"}})],1),t(p.Cl),0==s?t(f.Z,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:e}){return[t(r.Z,a._g({attrs:{disabled:a.loading.estado,fab:"",small:"",color:"primary"},on:{click:function(t){return a.agregarFila(a.dataEdit.opciones,{...a.dataEditBase.opciones[0]})}}},e),[t(u.Z,{attrs:{"x-large":""}},[a._v("control_point")])],1)]}}],null,!0)},[t("span",[a._v("Agregar Insumo a Opciones")])]):a._e(),0!=s?t(f.Z,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:e}){return[t(r.Z,a._g({attrs:{disabled:a.loading.estado,small:"",icon:"",color:"white"},on:{click:function(t){return a.borrarFila(a.dataEdit.opciones,s)}}},e),[t(u.Z,{attrs:{color:"red lighten-2"}},[a._v("delete_forever")])],1)]}}],null,!0)},[t("span",[a._v("Eliminar Insumo de Opciones")])]):a._e(),t(p.Cl,{staticClass:"hidden-xs-only"})],1)],1)})),t(l.Z)],2)],1)],1),t(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:"","lighten-2":""}},[t(r.Z,a._g({staticClass:"white--text",attrs:{round:"",disabled:a.loading.estado,loading:a.loading.estado,color:"blue-grey"},on:{click:function(t){return a.agregarFila(a.dataEdit.opciones,{...a.dataEditBase.opciones[0]})}}},a.on),[a._v(" Agregar Insumo a Opciones "),t(u.Z,a._g({attrs:{right:"",color:"white",large:""}},a.on),[a._v(" control_point ")])],1),t(p.Cl),t(l.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),t(r.Z,{class:{"primary darken-1":a.valido,"error darken-1":!a.valido},attrs:{round:"",disabled:a.loading.estado,loading:a.loading.estado},on:{click:a.editarOpciones}},[a._v(" "+a._s(a.valido?"Guardar Cambios":"Formulario No valido"))])],1)],1)],1)],1)],1)},v=[],y=(e(7658),e(629));const _={name:"farmaciaOpciones",data(){return{valido:!0,areasFiltro:[],insumosDB:[],insumosOpcionesFiltrado:[],dataEdit:{},dataEditBase:{area:"",opciones:[{insumo:"",cant_min:0}],destinos:[]}}},computed:{...(0,y.rn)(["loading","rules"]),insumosOpciones(){return this.dataEdit.opciones?.map((({insumo:a})=>a))}},watch:{async"dataEdit.area"(a){if(a){let t=await this.buscarFarmaciaOpciones({area:a});this.dataEdit=t||{...this._cloneDeep(this.dataEditBase),area:a}}},async insumosOpciones(){this.insumosOpcionesFiltrado=await this.filtrarArrayParaSelectsDisabled({arraySelects:this.insumosDB,arrayDisable:this.insumosOpciones,propCompare:"_id"})}},async created(){this.insumosDB=await this.buscarInsumosFiltro({select:"nombre descripcion nombreC"}),this.areasFiltro=[...await this.buscarAreaFiltros({filtro:{farmacia:!0},populate:"no",select:"area"})],this.dataEdit=this._cloneDeep(this.dataEditBase)},methods:{...(0,y.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),...(0,y.nv)(["retroceder","requestAPI","filtrarArrayParaSelectsDisabled"]),...(0,y.nv)("main_areas",["buscarAreaFiltros"]),...(0,y.nv)("farmacia",["buscarInsumosFiltro"]),async buscarFarmaciaOpciones({area:a}){try{this.mostrarLoading({titulo:"Cargando Opciones..."});let t=null;return t=await this.requestAPI({method:"get",url:`/farmacia/opciones?area=${a}`}),t?.data?.ok?t.data.opciones:this._cloneDeep(this.dataEditBase)}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (buscarFarmaciaOpciones)"}),this._cloneDeep(this.dataEditBase)}finally{this.ocultarLoading()}},async editarOpciones(){if(this.$refs.form.validate())try{this.mostrarLoading({titulo:"Guardando Opciones...",color:"primary"});let a=this._cloneDeep(this.dataEdit),t=null;t=await this.requestAPI({method:"put",url:"/farmacia/opciones",update:a}),t&&this.mostrarMensaje({titulo:"Guardado Exitoso",msj:["Cambios efectuados exitosamente."]})}catch(a){this.mostrarError({titulo:"Inesperado (editarOpciones)",mensaje:a})}finally{this.ocultarLoading()}else this.mostrarError({titulo:"Valores Requeridos.",mensaje:"Revise los campos obligatorios."})},async borrarOpciones(a){if(a){if(await this.$root.$confirm.open({titulo:"ELIMINAR",msj:["Se Borraran Todas las Opciones (Minimos) sin posibilidad de deshacer esta accion.",`Las Opciones de "${this.areasFiltro.find((t=>t.id===a))?.area}", seran Eliminadas.\n¿Desea continuar??`]}))try{this.mostrarLoading({titulo:"Borrando Opciones..."});let t=null;if(t=await this.requestAPI({method:"delete",url:`/farmacia/opciones/${a}`}),t?.data?.ok)return this.dataEdit={...this._cloneDeep(this.dataEditBase),area:a},void this.mostrarMensaje({titulo:"Borrado Exitoso",msj:["Borrado efectuado exitosamente."]})}catch(t){return this.mostrarError({mensaje:t,titulo:"Inesperado (borrarOpciones)"}),!1}finally{this.ocultarLoading()}}else this.mostrarError({titulo:"Valores Requeridos.",mensaje:"Seleccione en Farmacia Origen de la cual se borraran todas las Opciones (minimos)."})},agregarFila(a,t){a.length<this.insumosDB.length&&a.push(t||"")},borrarFila(a,t){a.splice(t,1)}}},b=_;var E=e(1001),x=(0,E.Z)(b,g,v,!1,null,null,null);const w=x.exports},445:(a,t,e)=>{e.d(t,{Z:()=>r});var i=e(21);const r={name:"v-form",mixins:[(0,i.J)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var a=Object.values(this.errorBag).includes(!0);this.$emit("input",!a)},deep:!0,immediate:!0}},methods:{watchInput:function(a){var t=this,e=function(a){return a.$watch("hasError",(function(e){t.$set(t.errorBag,a._uid,e)}),{immediate:!0})},i={_uid:a._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=a.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(a._uid)||(i.valid=e(a)))})):i.valid=e(a),i},validate:function(){var a=this.inputs.filter((function(a){return!a.validate(!0)})).length;return!a},reset:function(){for(var a=this,t=this.inputs.length;t--;)this.inputs[t].reset();this.lazyValidation&&setTimeout((function(){a.errorBag={}}),0)},resetValidation:function(){for(var a=this,t=this.inputs.length;t--;)this.inputs[t].resetValidation();this.lazyValidation&&setTimeout((function(){a.errorBag={}}),0)},register:function(a){var t=this.watchInput(a);this.inputs.push(a),this.watchers.push(t)},unregister:function(a){var t=this.inputs.find((function(t){return t._uid===a._uid}));if(t){var e=this.watchers.find((function(a){return a._uid===t._uid}));e.valid&&e.valid(),e.shouldValidate&&e.shouldValidate(),this.watchers=this.watchers.filter((function(a){return a._uid!==t._uid})),this.inputs=this.inputs.filter((function(a){return a._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(a){var t=this;return a("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(a){return t.$emit("submit",a)}}},this.$slots.default)}}}}]);