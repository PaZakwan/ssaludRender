"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[292],{3969:function(t,e,a){a.r(e),a.d(e,{default:function(){return Z}});var r=a(6194),i=a(8956),o=a(2353),n=a(6530),s=a(108),l=a(683),u=a(445),d=a(3667),c=a(9456),h=a(8143),p=a(4618),f=a(1415),m=function(){var t=this,e=t._self._c;return e(n.Z,{attrs:{fluid:"","grid-list-xs":""}},[e(c.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(l.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(i.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(o.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Gestion de Farmacia ======")])],1)],1),e(l.Z,{attrs:{"pa-1":"","ma-1":"",xs12:"",primary:"","lighten-1":""}},[e(i.Z,{staticClass:"elevation-6"},[e(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[e(l.Z,{attrs:{"px-3":""}},[e(d.Z,{attrs:{medium:"",color:"white",left:""}},[t._v("local_shipping")]),e("span",{staticClass:"title white--text"},[t._v("Insumos / Proveedores")])],1),e(h.Cl),e(s.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),e(r.Z,t._g({staticClass:"white--text",attrs:{round:"",disabled:t.loading.estado,loading:t.loading.estado,color:"blue-grey"},on:{click:function(e){return t.agregarDato()}}},t.on),[t._v(" Agregar Proveedor "),e(d.Z,t._g({attrs:{right:"",color:"cuarto darken-2",large:""}},t.on),[t._v(" add_circle ")])],1)],1),e(o.ZB,[e(u.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valido,callback:function(e){t.valido=e},expression:"valido"}},[e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},t._l(t.data,(function(a,r){return e(l.Z,{key:`dato-${r}`,attrs:{xs12:"",sm6:"","px-3":""}},[e(p.h,{attrs:{"prepend-icon":"local_shipping",label:"Proveedor",type:"text",rules:[...t.rules.requerido],color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":""},model:{value:t.data[r],callback:function(e){t.$set(t.data,r,e)},expression:"data[index]"}},[0!=r?e("template",{slot:"append-outer"},[e(f.Z,{staticStyle:{"border-radius":"25px"},attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:a}){return[e(d.Z,t._g({attrs:{color:"error",onpointerenter:"this.setAttribute('style', 'border-radius: 10px; background: #B0BEC5')",onpointerleave:"this.setAttribute('style', 'background: none')"},on:{click:function(e){return t.deleteDato(r)}}},a),[t._v(" delete ")])]}}],null,!0)},[e("span",{staticClass:"px-0"},[t._v("Eliminar "+t._s(a))])])],1):t._e()],2)],1)})),1)],1)],1),e(c.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:"","lighten-2":""}},[e(r.Z,t._g({staticClass:"white--text",attrs:{round:"",disabled:t.loading.estado,loading:t.loading.estado,color:"blue-grey"},on:{click:function(e){return t.agregarDato()}}},t.on),[t._v(" Agregar Proveedor "),e(d.Z,t._g({attrs:{right:"",color:"cuarto darken-2",large:""}},t.on),[t._v(" add_circle ")])],1),e(h.Cl),e(s.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),e(r.Z,{class:{"primary darken-1":t.valido,"error darken-1":!t.valido},attrs:{round:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.editar}},[t._v(" "+t._s(t.valido?"Guardar Cambios":"Formulario No valido"))])],1)],1)],1),e(l.Z,{attrs:{"pa-1":"","ma-1":"",error:"","darken-2":"",xs12:""}},[e(i.Z,{attrs:{color:"yellow darken-1"}},[e(o.ZB,{staticClass:"px-0 font-weight-medium text-uppercase"},[e(d.Z,{attrs:{color:"error darken-3"}},[t._v(" warning ")]),t._v(" Si modifica un Proveedor el mismo no surtira efecto en los Insumos ya ingresados con dicho Proveedor, se recomienda no BORRAR/EDITAR Proveedores usados porque dejaran de ser visibles dichos ingresos del mismo. ")],1)],1)],1)],1)],1)},v=[],g=a(629),w={name:"farmaciaProveedores",data(){return{valido:!0,data:[]}},computed:{...(0,g.rn)(["loading","rules"])},async created(){this.data=await this.returnConfig("farmaciaProveedores")||[]},methods:{...(0,g.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),...(0,g.nv)(["requestAPI","returnConfig"]),async editar(){if(this.$refs.form.validate())try{this.mostrarLoading({titulo:"Editando especialidades...",color:"primary"});let t=null;t=await this.requestAPI({method:"put",url:"/config/farmaciaProveedores",update:{opcion:"farmaciaProveedores",datos:this.data}}),t&&this.mostrarMensaje({titulo:"Modificacion Exitosa",msj:["Cambios efectuados exitosamente."]}),this.data=await this.returnConfig("farmaciaProveedores")||[]}catch(t){this.mostrarError({titulo:"Inesperado",mensaje:t})}finally{this.ocultarLoading()}else this.mostrarError({titulo:"Valores Requeridos.",mensaje:"Revise los campos obligatorios."})},deleteDato(t){this.data.splice(t,1)},agregarDato(){this.data.push("")}}},x=w,y=a(1001),_=(0,y.Z)(x,m,v,!1,null,null,null),Z=_.exports},445:function(t,e,a){a.d(e,{Z:function(){return i}});var r=a(21),i={name:"v-form",mixins:[(0,r.J)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,a=function(t){return t.$watch("hasError",(function(a){e.$set(e.errorBag,t._uid,a)}),{immediate:!0})},r={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?r.shouldValidate=t.$watch("shouldValidate",(function(i){i&&(e.errorBag.hasOwnProperty(t._uid)||(r.valid=a(t)))})):r.valid=a(t),r},validate:function(){var t=this.inputs.filter((function(t){return!t.validate(!0)})).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var a=this.watchers.find((function(t){return t._uid===e._uid}));a.valid&&a.valid(),a.shouldValidate&&a.shouldValidate(),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},4618:function(t,e,a){a.d(e,{h:function(){return l}});var r=a(2556),i=a(5730),o=a(8135),n=a(6505),s=a(8219),l={functional:!0,$_wrapperFor:r.Z,props:{textarea:Boolean,multiLine:Boolean},render:function(t,e){var a=e.props,u=e.data,d=e.slots,c=e.parent;(0,n.Z)(u);var h=(0,o.Z)(d(),t);return a.textarea&&(0,s.Rn)("<v-text-field textarea>","<v-textarea outline>",l,c),a.multiLine&&(0,s.Rn)("<v-text-field multi-line>","<v-textarea>",l,c),a.textarea||a.multiLine?(u.attrs.outline=a.textarea,t(i.Z,u,h)):t(r.Z,u,h)}}},5730:function(t,e,a){a.d(e,{Z:function(){return n}});var r=a(2556),i=a(8219),o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},n={name:"v-textarea",extends:r.Z,props:{autoGrow:Boolean,noResize:Boolean,outline:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return o({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},r.Z.options.computed.classes.call(this,null))},dynamicHeight:function(){return this.autoGrow?this.inputHeight:"auto"},isEnclosed:function(){return this.textarea||r.Z.options.computed.isEnclosed.call(this)},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){!this.internalChange&&this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0),this.autoGrow&&this.noResize&&(0,i.zk)('"no-resize" is now implied when using "auto-grow", and can be removed',this)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height=0;var e=t.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(a,e)+"px"}},genInput:function(){var t=r.Z.options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){r.Z.options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.internalChange=!0,this.$emit("keydown",t)}}}},6505:function(t,e,a){function r(t){if(t.model&&t.on&&t.on.input)if(Array.isArray(t.on.input)){var e=t.on.input.indexOf(t.model.callback);e>-1&&t.on.input.splice(e,1)}else delete t.on.input}a.d(e,{Z:function(){return r}})},8135:function(t,e,a){function r(t,e){var a=[];for(var r in t)t.hasOwnProperty(r)&&a.push(e("template",{slot:r},t[r]));return a}a.d(e,{Z:function(){return r}})}}]);