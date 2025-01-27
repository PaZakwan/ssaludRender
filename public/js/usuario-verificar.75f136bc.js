"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[2541],{58969:function(t,e,r){r.r(e),r.d(e,{default:function(){return w}});var i=r(28383),a=r(15852),n=r(1899),o=r(48122),s=r(34172),l=r(41614),u=r(21939),c=r(21527),d=r(48431),f=r(69155),h=r(45710),m=r(55731),v=r(57e3),p=function(){var t=this,e=t._self._c;return e("div",[e(l.A,{attrs:{xs12:""}},[e(d.A,{attrs:{src:r(42857),alt:"Secretaria de Salud","max-height":"200px"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(f.A,{attrs:{"fill-height":"","align-center":"","justify-center":"","ma-0":""}},[e(h.A,{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])})],1),e(o.A,{attrs:{"grid-list-xs":""}},[e(f.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[e(l.A,{attrs:{"pa-1":"","ma-1":"",xs12:"",sm8:"",md6:"",primary:"","lighten-1":""}},[e(a.A,{staticClass:"elevation-6"},[e(f.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[e(l.A,{attrs:{"text-xs-left":"","px-3":""}},[e(c.A,{attrs:{medium:"",color:"white",left:""}},[t._v("mail")]),e("span",{staticClass:"title white--text"},[t._v("Verificacion de E-Mail")])],1),e(m.hc)],1),e(n.OQ,[e(u.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valido,callback:function(e){t.valido=e},expression:"valido"}},[e(f.A,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":"",row:""}},[e(l.A,{attrs:{xs12:"","px-3":""}},[e(v.W,{attrs:{onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'","prepend-icon":"fas fa-id-card",maxlength:"10",counter:"",label:"Documento",type:"number",rules:[...t.rules.requerido,...t.rules.soloNumero,t.rules.minNumber(0),t.rules.maxLength(10)],color:"primary","background-color":"primary lighten-5","validate-on-blur":""},model:{value:t.verificar.documento,callback:function(e){t.$set(t.verificar,"documento",e)},expression:"verificar.documento"}})],1),t._v(" tooltip Ingrese el Codigo que recivira en el correo. Sino lo encuentra Revise el Spam. "),e(l.A,{attrs:{xs12:"","px-3":""}},[e(v.W,{attrs:{"prepend-icon":"lock_open",label:"Codigo",type:"text",color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":"",rules:[...t.rules.requerido]},model:{value:t.verificar.code,callback:function(e){t.$set(t.verificar,"code",e)},expression:"verificar.code"}})],1)],1)],1)],1),e(f.A,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:"","lighten-2":""}},[e(l.A,{attrs:{"text-xs-left":"","px-3":""}},[e("span",{staticClass:"title black--text"},[t._v("Boton para reenviar codigo")])]),e(m.hc),e(s.A,{staticClass:"hidden-xs-only mx-2 my-1 black",attrs:{vertical:""}}),e(i.A,{class:{"primary darken-1":t.valido,"error darken-1":!t.valido},attrs:{round:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.verificarMail}},[t._v(" "+t._s(t.valido?"Verificar":"Formulario No valido"))])],1)],1)],1)],1)],1)],1)},g=[],y=r(95353),x={name:"autoUsuarioVerificarMail",components:{},data(){return{valido:!0,verificar:{documento:this.$route.params.documento||"",code:this.$route.query.code||""}}},computed:{...(0,y.aH)(["APIURL","axiosConfig","loading","rules"])},created(){},methods:{...(0,y.PY)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),async verificarMail(){console.log("verificar",this.verificar)}}},_=x,b=r(81656),k=(0,b.A)(_,p,g,!1,null,null,null),w=k.exports},21939:function(t,e,r){r.d(e,{A:function(){return a}});var i=r(88e3),a={name:"v-form",mixins:[(0,i.G)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,r=function(t){return t.$watch("hasError",(function(r){e.$set(e.errorBag,t._uid,r)}),{immediate:!0})},i={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=r(t)))})):i.valid=r(t),i},validate:function(){var t=this.inputs.filter((function(t){return!t.validate(!0)})).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var r=this.watchers.find((function(t){return t._uid===e._uid}));r.valid&&r.valid(),r.shouldValidate&&r.shouldValidate(),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},42857:function(t,e,r){t.exports=r.p+"img/system-banner-1920x200.3c0bb910.png"}}]);