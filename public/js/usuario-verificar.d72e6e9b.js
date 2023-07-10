"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[783],{432:(t,e,r)=>{r.r(e),r.d(e,{default:()=>Z});var i=r(6194),a=r(8956),n=r(2353),o=r(5050),s=r(108),l=r(683),u=r(445),c=r(3667),d=r(2208),h=r(9456),f=r(8294),v=r(8143),m=r(4618),p=function(){var t=this,e=t._self._c;return e("div",[e(l.Z,{attrs:{xs12:""}},[e(d.Z,{attrs:{src:r(6189),alt:"Secretaria de Salud","max-height":"200px"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(h.Z,{attrs:{"fill-height":"","align-center":"","justify-center":"","ma-0":""}},[e(f.Z,{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])})],1),e(o.Z,{attrs:{"grid-list-xs":""}},[e(h.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(l.Z,{attrs:{"pa-1":"","ma-1":"",xs12:"",sm8:"",md6:"",primary:"","lighten-1":""}},[e(a.Z,{staticClass:"elevation-6"},[e(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[e(l.Z,{attrs:{"text-xs-left":"","px-3":""}},[e(c.Z,{attrs:{medium:"",color:"white",left:""}},[t._v("mail")]),e("span",{staticClass:"title white--text"},[t._v("Verificacion de E-Mail")])],1),e(v.Cl)],1),e(n.ZB,[e(u.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valido,callback:function(e){t.valido=e},expression:"valido"}},[e(h.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":"",row:""}},[e(l.Z,{attrs:{xs12:"","px-3":""}},[e(m.h,{attrs:{onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'","prepend-icon":"fas fa-id-card",maxlength:"10",counter:"",label:"Documento",type:"number",rules:[...t.rules.requerido,...t.rules.soloNumero,t.rules.minNumber(0),t.rules.maxLength(10)],color:"primary","background-color":"primary lighten-5","validate-on-blur":""},model:{value:t.verificar.documento,callback:function(e){t.$set(t.verificar,"documento",e)},expression:"verificar.documento"}})],1),t._v(" tooltip Ingrese el Codigo que recivira en el correo. Sino lo encuentra Revise el Spam. "),e(l.Z,{attrs:{xs12:"","px-3":""}},[e(m.h,{attrs:{"prepend-icon":"lock_open",label:"Codigo",type:"text",color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":"",rules:[...t.rules.requerido]},model:{value:t.verificar.code,callback:function(e){t.$set(t.verificar,"code",e)},expression:"verificar.code"}})],1)],1)],1)],1),e(h.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:"","lighten-2":""}},[e(l.Z,{attrs:{"text-xs-left":"","px-3":""}},[e("span",{staticClass:"title black--text"},[t._v("Boton para reenviar codigo")])]),e(v.Cl),e(s.Z,{staticClass:"hidden-xs-only mx-2 my-1 black",attrs:{vertical:""}}),e(i.Z,{class:{"primary darken-1":t.valido,"error darken-1":!t.valido},attrs:{round:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.verificarMail}},[t._v(" "+t._s(t.valido?"Verificar":"Formulario No valido"))])],1)],1)],1)],1)],1)],1)},g=[],x=r(629);const y={name:"autoUsuarioVerificarMail",components:{},data(){return{valido:!0,verificar:{documento:this.$route.params.documento||"",code:this.$route.query.code||""}}},computed:{...(0,x.rn)(["APIURL","axiosConfig","loading","rules"])},created(){},methods:{...(0,x.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),async verificarMail(){console.log("verificar",this.verificar)}}},_=y;var k=r(1001),w=(0,k.Z)(_,p,g,!1,null,null,null);const Z=w.exports},445:(t,e,r)=>{r.d(e,{Z:()=>a});var i=r(21);const a={name:"v-form",mixins:[(0,i.J)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,r=function(t){return t.$watch("hasError",(function(r){e.$set(e.errorBag,t._uid,r)}),{immediate:!0})},i={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=r(t)))})):i.valid=r(t),i},validate:function(){var t=this.inputs.filter((function(t){return!t.validate(!0)})).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var r=this.watchers.find((function(t){return t._uid===e._uid}));r.valid&&r.valid(),r.shouldValidate&&r.shouldValidate(),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},6189:(t,e,r)=>{t.exports=r.p+"img/secretaria-salud-1920-200x.3372a166.png"}}]);