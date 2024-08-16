"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[6914],{10392:(t,e,a)=>{a.r(e),a.d(e,{default:()=>y});var o=a(66194),i=a(18956),n=a(32353),s=a(66530),r=a(50108),l=a(60683),c=a(50445),u=a(73667),d=a(59456),h=a(98143),m=function(){var t=this,e=t._self._c;return e(s.Z,{attrs:{"grid-list-xs":""}},[e(d.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(l.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(i.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(n.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Patrimonio ======")])],1)],1),e(l.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[e(d.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","darken-2":""}},[e(l.Z,{attrs:{"text-xs-left":"","px-3":""}},[e(u.Z,{attrs:{medium:"",color:"white",left:""}},[t._v("library_books")]),e("span",{staticClass:"title white--text"},[t._v("Editar Objeto")])],1),e(h.Cl),e(r.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),e(o.Z,{staticClass:"white--text",attrs:{round:"",to:{name:"PatrimonioBuscar"},color:"terciary darken-1",disabled:t.loading.estado,loading:t.loading.estado}},[t._v("Buscar Objetos")])],1),e(i.Z,{staticClass:"elevation-6"},[e(n.ZB,[e(c.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valido,callback:function(e){t.valido=e},expression:"valido"}},[e("formObjeto",{attrs:{formulario:t.objeto,persona:t.persona,areas:t.areas,lugaresDB:t.lugaresDB,editar:!0}})],1)],1),e(d.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","lighten-2":""}},[e(h.Cl),e(o.Z,{staticClass:"white--text",attrs:{round:"",to:{name:"PatrimonioBuscar"},color:"red darken-1",disabled:t.loading.estado,loading:t.loading.estado}},[t._v(" Cancelar")]),e(r.Z,{staticClass:"hidden-xs-only mx-2 my-1 black",attrs:{vertical:""}}),e(o.Z,{class:{"terciary darken-1":t.valido,"error darken-1":!t.valido},attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.editar}},[t._v(" "+t._s(t.valido?"Editar Objeto":"Formulario No valido"))])],1)],1)],1)],1)],1)},p=[],f=(a(70560),a(20629)),g=a(88237);const b={name:"patrimonioEditar",components:{formObjeto:g.Z},data:()=>({valido:!0,areas:[],lugaresDB:[],objeto:{categoria:"",inventario:null,serie:null,marca:null,modelo:null,dependencia:null,fec_alta:null,area:null,lugar:null,ubicacion:null,detalle:null,funciona:"Funcionando",resumen_percance:null,fec_percance:null,motivo_baja:null,fec_baja:null,motivo_eliminacion:null,usuario_eliminacion:null,fec_eliminacion:null,verificado:null,usuario_verifico:null,fec_verifico:null,estado:null,micro:null,mother:null,memmoria_tipo:null,memoria:null,disco_tipo:null,disco:null,fuente:null,PC:null,pulgadas:null,tipoPantalla:null,impresora_tipo:null,impresora_multifuncion:null,telefono_interno:null,cantidad:null,subcategoria:null,compatibilidad:null,verificar:"true"}}),watch:{"objeto.subcategoria":function(t){"Toner"!==t&&(this.objeto.compatibilidad=null)}},computed:{...(0,f.rn)(["APIURL","axiosConfig","loading","persona"])},async created(){this.lugaresDB=await this.buscarLugarFiltros({select:"nombre"}),this.areas=await this.buscarAreaFiltros({filtro:"todos",populate:"no",select:"area"}),await this.cargarObjeto(this.$route.params.id),this.persona.informatica<2&&"Insumos"===this.objeto.categoria&&(this.mostrarError({mensaje:"Acceso Denegado, permisos insuficientes",titulo:401}),this.$router.push({name:"PatrimonioBuscar"}))},methods:{...(0,f.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),...(0,f.nv)("main",["buscarAreaFiltros","buscarLugarFiltros"]),async cargarObjeto(t){try{this.mostrarLoading({titulo:"Cargando datos...",color:"primary"});let a=JSON.stringify({_id:t}),o=JSON.stringify({area:!1,lugar:!1,usuario_eliminacion:!0,usuario_verifico:!0}),i=await this.axios.get(`${this.APIURL}/patrimonio/buscar?filtro=${a}&populate=${o}`,this.axiosConfig);if(i.data.ok)for(const t in i.data.objetos[0])i.data.objetos[0].hasOwnProperty(t)&&("fec_movio"===t||"fec_verifico"===t||"fec_alta"===t||"fec_eliminacion"===t||"fec_baja"===t||"fec_percance"===t?this.objeto[t]=this.mostrarFecha(i.data.objetos[0][t]):"number"===typeof i.data.objetos[0][t]?this.objeto[t]=i.data.objetos[0][t].toString():this.objeto[t]=i.data.objetos[0][t]);else try{this.mostrarError({mensaje:i.data.err.message,titulo:i.status})}catch(e){this.mostrarError({mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(e){try{this.mostrarError({errores:e.response.data.err.errors,mensaje:e.response.data.err.message,titulo:e.response.status})}catch(e){this.mostrarError({mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}this.$router.push({name:"PatrimonioBuscar"})}finally{this.ocultarLoading()}},async editar(){if(this.$refs.form.validate()){let e=Object.assign({},this.objeto);try{this.mostrarLoading({titulo:"Enviando datos...",color:"primary"});let a=await this.axios.put(this.APIURL+"/patrimonio/"+this.objeto._id,e,this.axiosConfig);if(a.data.ok)a.data.objeto.inventario?this.mostrarMensaje({msj:["Objeto Editado exitosamente.","<##> Nº Inventario: "+a.data.objeto.inventario.toString()+"<##>"],titulo:"Modificacion Exitosa"}):this.mostrarMensaje({msj:["Objeto Editado exitosamente."],titulo:"Modificacion Exitosa"}),this.$router.push({name:"PatrimonioBuscar"});else try{this.mostrarError({mensaje:a.data.err.message,titulo:a.status})}catch(t){this.mostrarError({mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(t){try{this.mostrarError({errores:t.response.data.err.errors,mensaje:t.response.data.err.message,titulo:t.response.status})}catch(t){this.mostrarError({mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}finally{this.ocultarLoading()}}else this.mostrarError({mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."})}}},v=b;var x=a(1001),j=(0,x.Z)(v,m,p,!1,null,null,null);const y=j.exports},91232:(t,e,a)=>{a.d(e,{Z:()=>s});a(7448);var o=a(91395),i=a(67416),n=a(48131);const s={name:"v-combobox",extends:i.Z,props:{delimiters:{type:Array,default:function(){return[]}},returnObject:{type:Boolean,default:!0}},data:function(){return{editingIndex:-1}},computed:{counterValue:function(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot:function(){return o.Z.options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed:function(){return!0},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)}},methods:{onFilteredItemsChanged:function(){},onInternalSearchChanged:function(t){if(t&&this.multiple&&this.delimiters.length){var e=this.delimiters.find((function(e){return t.endsWith(e)}));null!=e&&(this.internalSearch=t.slice(0,t.length-e.length),this.updateTags())}this.updateMenuDimensions()},genChipSelection:function(t,e){var a=this,i=o.Z.options.methods.genChipSelection.call(this,t,e);return this.multiple&&(i.componentOptions.listeners.dblclick=function(){a.editingIndex=e,a.internalSearch=a.getText(t),a.selectedIndex=-1}),i},onChipInput:function(t){o.Z.options.methods.onChipInput.call(this,t),this.editingIndex=-1},onEnterDown:function(t){t.preventDefault(),o.Z.options.methods.onEnterDown.call(this),this.getMenuIndex()>-1||this.updateSelf()},onKeyDown:function(t){var e=t.keyCode;o.Z.options.methods.onKeyDown.call(this,t),this.multiple&&e===n.Do.left&&0===this.$refs.input.selectionStart&&this.updateSelf(),this.changeSelectedIndex(e)},onTabDown:function(t){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return t.preventDefault(),t.stopPropagation(),this.updateTags();i.Z.options.methods.onTabDown.call(this,t)},selectItem:function(t){this.editingIndex>-1?this.updateEditing():i.Z.options.methods.selectItem.call(this,t)},setSelectedItems:function(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.internalSearch;o.Z.options.methods.setValue.call(this,t)},updateEditing:function(){var t=this.internalValue.slice();t[this.editingIndex]=this.internalSearch,this.setValue(t),this.editingIndex=-1},updateCombobox:function(){var t=Boolean(this.$scopedSlots.selection)||this.hasChips;t&&!this.searchIsDirty||(this.internalSearch!==this.getText(this.internalValue)&&this.setValue(),t&&(this.internalSearch=void 0))},updateSelf:function(){this.multiple?this.updateTags():this.updateCombobox()},updateTags:function(){var t=this.getMenuIndex();if(!(t<0)||this.searchIsDirty){if(this.editingIndex>-1)return this.updateEditing();var e=this.selectedItems.indexOf(this.internalSearch);if(e>-1){var a=this.internalValue.slice();a.splice(e,1),this.setValue(a)}if(t>-1)return this.internalSearch=null;this.selectItem(this.internalSearch),this.internalSearch=null}}}}},14036:(t,e,a)=>{a.d(e,{r:()=>f,Z:()=>g});var o=a(91395),i=a(67416);const n=i.Z;var s=a(72556),r=a(68205),l=a(28219);const c=n.extend({name:"v-overflow-btn",props:{segmented:Boolean,editable:Boolean,transition:o.Z.options.props.transition},computed:{classes:function(){return Object.assign(n.options.computed.classes.call(this),{"v-overflow-btn":!0,"v-overflow-btn--segmented":this.segmented,"v-overflow-btn--editable":this.editable})},isAnyValueAllowed:function(){return this.editable||n.options.computed.isAnyValueAllowed.call(this)},isSingle:function(){return!0},computedItems:function(){return this.segmented?this.allItems:this.filteredItems},$_menuProps:function(){var t=n.options.computed.$_menuProps.call(this);return t.transition=t.transition||"v-menu-transition",t}},methods:{genSelections:function(){return this.editable?n.options.methods.genSelections.call(this):o.Z.options.methods.genSelections.call(this)},genCommaSelection:function(t,e,a){return this.segmented?this.genSegmentedBtn(t):o.Z.options.methods.genCommaSelection.call(this,t,e,a)},genInput:function(){var t=s.Z.options.methods.genInput.call(this);return t.data.domProps.value=this.editable?this.internalSearch:"",t.data.attrs.readonly=!this.isAnyValueAllowed,t},genLabel:function(){if(this.editable&&this.isFocused)return null;var t=s.Z.options.methods.genLabel.call(this);return t?(t.data.style={},t):t},genSegmentedBtn:function(t){var e=this,a=this.getValue(t),o=this.computedItems.find((function(t){return e.getValue(t)===a}))||t;return o.text&&o.callback?this.$createElement(r.Z,{props:{flat:!0},on:{click:function(t){t.stopPropagation(),o.callback(t)}}},[o.text]):((0,l.Kd)("When using 'segmented' prop without a selection slot, items must contain both a text and callback property",this),null)}}}),u=c;var d=a(91232);const h=d.Z;var m=a(78135),p=a(76505),f={functional:!0,$_wrapperFor:o.Z,props:{autocomplete:Boolean,combobox:Boolean,multiple:Boolean,tags:Boolean,editable:Boolean,overflow:Boolean,segmented:Boolean},render:function(t,e){var a=e.props,i=e.data,s=e.slots,r=e.parent;(0,p.Z)(i);var c=(0,m.Z)(s(),t);return a.autocomplete&&(0,l.Rn)("<v-select autocomplete>","<v-autocomplete>",f,r),a.combobox&&(0,l.Rn)("<v-select combobox>","<v-combobox>",f,r),a.tags&&(0,l.Rn)("<v-select tags>","<v-combobox multiple>",f,r),a.overflow&&(0,l.Rn)("<v-select overflow>","<v-overflow-btn>",f,r),a.segmented&&(0,l.Rn)("<v-select segmented>","<v-overflow-btn segmented>",f,r),a.editable&&(0,l.Rn)("<v-select editable>","<v-overflow-btn editable>",f,r),i.attrs=i.attrs||{},a.combobox||a.tags?(i.attrs.multiple=a.tags,t(h,i,c)):a.autocomplete?(i.attrs.multiple=a.multiple,t(n,i,c)):a.overflow||a.segmented||a.editable?(i.attrs.segmented=a.segmented,i.attrs.editable=a.editable,t(u,i,c)):(i.attrs.multiple=a.multiple,t(o.Z,i,c))}};const g=f}}]);