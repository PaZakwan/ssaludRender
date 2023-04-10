"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[609],{932:function(e,r,a){a.r(r),a.d(r,{default:function(){return A}});var o=a(6194),s=a(8956),t=a(2353),i=a(6530),l=a(108),n=a(683),u=a(445),c=a(3667),d=a(2208),p=a(9456),m=a(8294),h=a(8143),x=function(){var e=this,r=e._self._c;return r("div",[r(n.Z,{attrs:{xs12:""}},[r(d.Z,{attrs:{src:a(6189),alt:"Secretaria de Salud","max-height":"200px"},scopedSlots:e._u([{key:"placeholder",fn:function(){return[r(p.Z,{attrs:{"fill-height":"","align-center":"","justify-center":"","ma-0":""}},[r(m.Z,{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])})],1),r(i.Z,{attrs:{"grid-list-xs":""}},[r(p.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[r(n.Z,{attrs:{"pa-1":"","ma-1":"",xs12:"",primary:"","lighten-1":""}},[r(s.Z,{staticClass:"elevation-6"},[r(p.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[r(n.Z,{attrs:{"text-xs-left":"","px-3":""}},[r(c.Z,{attrs:{medium:"",color:"white",left:""}},[e._v("people")]),r("span",{staticClass:"title white--text"},[e._v("Registro / Alta")])],1),r(h.Cl),r(l.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),r(o.Z,{attrs:{round:"",color:"secondary lighten-1",to:{name:"Login"},disabled:e.loading.estado,loading:e.loading.estado}},[e._v("Iniciar Sesión")])],1),r(t.ZB,[r(u.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valido,callback:function(r){e.valido=r},expression:"valido"}},[r("formUsuario",{attrs:{usuario:e.usuario,persona:e.persona,editar:!1,passCheck:!0,mailCheck:!0,funcionEnter:e.registrar}})],1)],1),r(p.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:"","lighten-2":""}},[r(h.Cl),r(l.Z,{staticClass:"hidden-xs-only mx-2 my-1 black",attrs:{vertical:""}}),r(o.Z,{class:{"primary darken-1":e.valido,"error darken-1":!e.valido},attrs:{round:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.registrar}},[e._v(" "+e._s(e.valido?"Registrar":"Formulario No valido"))])],1)],1)],1)],1)],1)],1)},b=[],g=a(629),y=a(7441),f=a(6961),k=a(5084),v=a(4036),Z=a(4618),_=function(){var e=this,r=e._self._c;return r(p.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""},on:{keypress:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.funcionEnterTemp.apply(null,arguments)}}},[r(p.Z,{attrs:{"align-center":"","justify-center":"",grey:"","lighten-3":"",row:"",wrap:""}},[r(n.Z,{attrs:{xs12:"",primary:"","lighten-1":""}},[r("h4",{staticClass:"title float: left"},[e._v(" Datos de Usuario ")])]),r(n.Z,{attrs:{xs8:"","px-3":""}},[r(Z.h,{attrs:{readonly:e.editar,clearable:!e.editar,onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'","prepend-icon":"fas fa-id-card",maxlength:"10",counter:"",label:"Documento",type:"number",rules:[...e.rules.requerido,...e.rules.soloNumero,e.rules.minNumber(0),e.rules.maxLength(10)],color:"primary","background-color":e.editar?"primary lighten-2":"primary lighten-5","validate-on-blur":""},model:{value:e.usuario.documento,callback:function(r){e.$set(e.usuario,"documento",r)},expression:"usuario.documento"}})],1),e.editar?r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""},on:{click:e.checkPassword}},[r(y.Z,{attrs:{label:"Cambiar Contraseña: "+(e.checkPass?"SI":"NO")},model:{value:e.checkPass,callback:function(r){e.checkPass=r},expression:"checkPass"}})],1):e._e(),e.editar?r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}}):e._e(),e.checkPass?r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(Z.h,{attrs:{"prepend-icon":"lock",label:"Contraseña",type:"password",color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":"",rules:[...e.rules.requerido,e.rules.minLength(4)]},model:{value:e.usuario.password,callback:function(r){e.$set(e.usuario,"password",r)},expression:"usuario.password"}})],1):e._e(),e.checkPass?r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(Z.h,{attrs:{"prepend-icon":"lock",label:"Repetir Contraseña",type:"password",color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":"",rules:[...e.rules.requerido,e.rules.minLength(4)]},model:{value:e.usuario.password2,callback:function(r){e.$set(e.usuario,"password2",r)},expression:"usuario.password2"}})],1):e._e(),e.editar?r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""},on:{click:e.checkE_Mail}},[r(y.Z,{attrs:{label:"Cambiar E-mail: "+(e.checkMail?"SI":"NO")},model:{value:e.checkMail,callback:function(r){e.checkMail=r},expression:"checkMail"}})],1):e._e(),e.editar?r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}}):e._e(),r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(Z.h,{attrs:{"prepend-icon":"mail",label:"E-mail",type:"email",rules:[...e.rules.requerido,...e.rules.mail],color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":""},model:{value:e.usuario.email,callback:function(r){e.$set(e.usuario,"email",r)},expression:"usuario.email"}})],1),e.checkMail?r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(Z.h,{attrs:{"prepend-icon":"mail",label:"Repetir E-mail",type:"email",rules:[...e.rules.requerido,...e.rules.mail],color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":""},model:{value:e.usuario.email2,callback:function(r){e.$set(e.usuario,"email2",r)},expression:"usuario.email2"}})],1):r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}})],1),r(p.Z,{attrs:{"align-center":"","justify-center":"",grey:"","lighten-3":"",row:"",wrap:""}},[r(n.Z,{attrs:{xs12:"",primary:"","lighten-1":""}},[r("h4",{staticClass:"title float: left"},[e._v(" Datos Personales ")])]),r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(Z.h,{attrs:{"prepend-icon":"person",label:"Apellido",type:"text",rules:[...e.rules.requerido,...e.rules.soloTexto],color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":""},model:{value:e.usuario.apellido,callback:function(r){e.$set(e.usuario,"apellido",r)},expression:"usuario.apellido"}})],1),r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(Z.h,{attrs:{"prepend-icon":"person",label:"Nombre",type:"text",rules:[...e.rules.requerido,...e.rules.soloTexto],color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":""},model:{value:e.usuario.nombre,callback:function(r){e.$set(e.usuario,"nombre",r)},expression:"usuario.nombre"}})],1),r(n.Z,{attrs:{xs12:"",sm5:"","px-3":""}},[r(k.Z,{ref:"menu",attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:a}){return[r(Z.h,e._g({attrs:{clearable:"","background-color":"primary lighten-5",label:"Fecha de Nacimiento","prepend-icon":"event",readonly:"","validate-on-blur":"",color:"primary darken-3"},model:{value:e.usuario.fec_nac,callback:function(r){e.$set(e.usuario,"fec_nac",r)},expression:"usuario.fec_nac"}},a))]}}]),model:{value:e.menuFecha,callback:function(r){e.menuFecha=r},expression:"menuFecha"}},[r(f.Z,{ref:"picker",attrs:{color:"primary darken-3","header-color":"primary darken-1",locale:"mx",max:e.hoy,min:"1900-01-01"},on:{change:e.save},model:{value:e.usuario.fec_nac,callback:function(r){e.$set(e.usuario,"fec_nac",r)},expression:"usuario.fec_nac"}})],1)],1),r(n.Z,{attrs:{xs12:"",sm3:"","px-3":""}},[r(v.r,{attrs:{clearable:"","background-color":"primary lighten-5",items:e.sexos,label:"Sexo","prepend-icon":"fas fa-venus-mars",color:"primary"},model:{value:e.usuario.sexo,callback:function(r){e.$set(e.usuario,"sexo",r)},expression:"usuario.sexo"}})],1),r(n.Z,{attrs:{xs12:"",sm4:"","px-3":""}},[r(Z.h,{attrs:{"prepend-icon":"phone",label:"Telefono",type:"text",onkeydown:"return event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || /^[0-9\\s.,+=-]+$/.test(event.key)",maxlength:"15",counter:"",rules:[...e.rules.soloNumeroMas,e.rules.maxLength(15)],color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":""},model:{value:e.usuario.telefono,callback:function(r){e.$set(e.usuario,"telefono",r)},expression:"usuario.telefono"}})],1)],1),r(p.Z,{attrs:{"align-center":"","justify-center":"",grey:"","lighten-3":"",row:"",wrap:""}},[r(n.Z,{attrs:{xs12:"",primary:"","lighten-1":""}},[r("h4",{staticClass:"title float: left"},[e._v(" Domicilio ")])]),r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(Z.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"place",label:"Direccion",type:"text",color:"primary","validate-on-blur":""},model:{value:e.usuario.dir_calle,callback:function(r){e.$set(e.usuario,"dir_calle",r)},expression:"usuario.dir_calle"}})],1),r(n.Z,{attrs:{xs12:"",sm2:"","px-3":""}},[r(Z.h,{attrs:{clearable:"","background-color":"primary lighten-5",onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'","prepend-icon":"#",label:"Nro",type:"number",rules:[...e.rules.soloNumero,e.rules.minNumber(0)],color:"primary","validate-on-blur":""},model:{value:e.usuario.dir_numero,callback:function(r){e.$set(e.usuario,"dir_numero",r)},expression:"usuario.dir_numero"}})],1),r(n.Z,{attrs:{xs12:"",sm2:"","px-3":""}},[r(Z.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"far fa-building",label:"Piso",type:"text",color:"primary"},model:{value:e.usuario.dir_piso,callback:function(r){e.$set(e.usuario,"dir_piso",r)},expression:"usuario.dir_piso"}})],1),r(n.Z,{attrs:{xs12:"",sm2:"","px-3":""}},[r(Z.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"domain",label:"Depto",type:"text",color:"primary"},model:{value:e.usuario.dir_depto,callback:function(r){e.$set(e.usuario,"dir_depto",r)},expression:"usuario.dir_depto"}})],1),r(n.Z,{attrs:{xs12:"",sm4:"","px-3":""}},[r(Z.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"far fa-map",label:"Barrio",type:"text",color:"primary"},model:{value:e.usuario.dir_barrio,callback:function(r){e.$set(e.usuario,"dir_barrio",r)},expression:"usuario.dir_barrio"}})],1),r(n.Z,{attrs:{xs12:"",sm4:"","px-3":""}},[r(Z.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"fas fa-city",label:"Localidad",type:"text",color:"primary"},model:{value:e.usuario.dir_localidad,callback:function(r){e.$set(e.usuario,"dir_localidad",r)},expression:"usuario.dir_localidad"}})],1),r(n.Z,{attrs:{xs12:"",sm4:"","px-3":""}},[r(v.r,{attrs:{"background-color":"primary lighten-5",items:e.zonas,label:"Zona","prepend-icon":"adjust",color:"primary"},model:{value:e.usuario.zona,callback:function(r){e.$set(e.usuario,"zona",r)},expression:"usuario.zona"}})],1)],1),r(n.Z,{attrs:{xs12:"",sm3:"","px-3":""}}),r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(v.r,{attrs:{"background-color":"primary lighten-5",items:e.oSociales,label:"Cobertura Social","prepend-icon":"fas fa-id-card-alt",color:"primary"},model:{value:e.usuario.oSocial,callback:function(r){e.$set(e.usuario,"oSocial",r)},expression:"usuario.oSocial"}})],1),r(n.Z,{attrs:{xs12:"",sm3:"","px-3":""}}),"ADMIN_ROLE"===e.persona.role?r(n.Z,{attrs:{xs12:"",sm3:"","px-3":""}}):e._e(),"ADMIN_ROLE"===e.persona.role?r(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(v.r,{attrs:{rules:[...e.rules.requerido],"item-value":"valor","item-text":"label",items:e.estados,label:"Estado","prepend-icon":"check_circle","background-color":"true"==e.usuario.estado?"green lighten-1":"error lighten-1",color:"primary"},model:{value:e.usuario.estado,callback:function(r){e.$set(e.usuario,"estado",r)},expression:"usuario.estado"}})],1):e._e(),"ADMIN_ROLE"===e.persona.role?r(n.Z,{attrs:{xs12:"",sm3:"","px-3":""}}):e._e()],1)},w=[],C={name:"formUsuario",props:["usuario","persona","editar","passCheck","mailCheck","funcionEnter"],data(){return{funcionEnterTemp:this.funcionEnter||function(){},checkPass:this.passCheck||!1,checkMail:this.mailCheck||!1,menuFecha:!1,sexos:["Masculino","Femenino"],zonas:["Lista de Zonas","Zona Norte","Zona Sur","Zona Centro"],oSociales:["Sin Obra Social","PAMI","IOMA","Otras"],estados:[{label:"Activo",valor:"true"},{label:"Desactivado",valor:"false"}]}},computed:{...(0,g.rn)(["hoy","rules"])},watch:{menuFecha(e){e&&setTimeout((()=>this.$refs.picker.activePicker="YEAR"))}},methods:{checkPassword:function(){this.$emit("checkPassword",this.checkPass)},checkE_Mail:function(){this.$emit("checkE_Mail",this.checkMail)},save(e){this.$refs.menu.save(e)}}},E=C,$=a(1001),L=(0,$.Z)(E,_,w,!1,null,null,null),P=L.exports,R={name:"AutoUsuarioRegistrar",components:{formUsuario:P},data(){return{valido:!0,usuario:{documento:"",password:"",password2:"",email:"",email2:"",estadoEmail:!1,fechaEmailSend:"",codeEmail:"",nombre:"",apellido:"",fec_nac:"",sexo:"",telefono:"",dir_calle:"",dir_numero:"",dir_piso:"",dir_depto:"",dir_barrio:"",dir_localidad:"",zona:"",oSocial:""}}},computed:{...(0,g.rn)(["APIURL","axiosConfig","loading","persona"])},created(){},methods:{...(0,g.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),async registrar(){if(this.$refs.form.validate()){if(this.usuario.password!==this.usuario.password2)return void this.mostrarError({errores:"",mensaje:"Las contraseñas no coinciden.",titulo:"Contraseña"});if(this.usuario.email!==this.usuario.email2)return void this.mostrarError({errores:"",mensaje:"Los E-Mails no coinciden.",titulo:"E-Mails"});try{this.mostrarLoading({titulo:"Enviando datos...",color:"primary"});let r=await this.axios.post(`${this.APIURL}/autoUsuario`,this.usuario,this.axiosConfig);if(r.data.ok)this.mostrarMensaje({msj:["Usuario creado exitosamente.","Revise su Correo, para finalizar."],titulo:"Registro Exitoso"}),this.$router.push({name:"autoUsuarioVerificarMail",params:{documento:r.data.usuario.documento}});else try{this.mostrarError({errores:"",mensaje:r.data.err.message,titulo:r.status})}catch(e){this.mostrarError()}}catch(e){try{this.mostrarError({errores:e.response.data.err.errors,mensaje:e.response.data.err.message,titulo:e.response.status})}catch(e){this.mostrarError()}}finally{this.ocultarLoading()}}else this.mostrarError({errores:"",mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."})}}},M=R,S=(0,$.Z)(M,x,b,!1,null,null,null),A=S.exports},4874:function(e,r,a){a.d(r,{Z:function(){return g}});var o=a(7416),s=a(7441),t=a(683),i=a(9456),l=a(4036),n=a(4618),u=function(){var e=this,r=e._self._c;return r(i.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[r(t.Z,{attrs:{xs8:"","px-3":""}},[r(n.h,{attrs:{readonly:e.editando,clearable:!e.editando,"background-color":e.editando?"primary lighten-2":"primary lighten-5","prepend-icon":"person",label:"Usuario",type:"text",color:"primary",rules:e.editando?[]:[...e.rules.requerido,...e.rules.textoNumero,e.rules.minLength(3)],"validate-on-blur":"",autocomplete:"username"},model:{value:e.usuario.usuario,callback:function(r){e.$set(e.usuario,"usuario",r)},expression:"usuario.usuario"}})],1),r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(n.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"person",label:"Nombre",type:"text",color:"primary",rules:[...e.rules.requerido,e.rules.minLength(2)],"validate-on-blur":""},model:{value:e.usuario.nombre,callback:function(r){e.$set(e.usuario,"nombre",r)},expression:"usuario.nombre"}})],1),r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(n.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"person",label:"Apellido",type:"text",color:"primary",rules:[...e.rules.requerido,e.rules.minLength(2)],"validate-on-blur":""},model:{value:e.usuario.apellido,callback:function(r){e.$set(e.usuario,"apellido",r)},expression:"usuario.apellido"}})],1),r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(n.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"phone",label:"Telefono",type:"text",color:"primary",rules:[...e.rules.soloNumero],"validate-on-blur":""},model:{value:e.usuario.telefono,callback:function(r){e.$set(e.usuario,"telefono",r)},expression:"usuario.telefono"}})],1),r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(n.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"mail",label:"Email",type:"email",color:"primary",rules:[...e.rules.mail],"validate-on-blur":""},model:{value:e.usuario.email,callback:function(r){e.$set(e.usuario,"email",r)},expression:"usuario.email"}})],1),r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(o.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"location_city",label:"Area",items:e.areas,"item-value":"id","item-text":"area",color:"primary",rules:[...e.rules.requerido],"validate-on-blur":""},model:{value:e.usuario.area,callback:function(r){e.$set(e.usuario,"area",r)},expression:"usuario.area"}})],1),r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(n.h,{attrs:{clearable:"","background-color":"primary lighten-5","prepend-icon":"work",label:"Actividad en el Area",type:"text",color:"primary","validate-on-blur":""},model:{value:e.usuario.actividad,callback:function(r){e.$set(e.usuario,"actividad",r)},expression:"usuario.actividad"}})],1),e.editando?r(t.Z,{attrs:{xs12:""}},[r(i.Z,{attrs:{row:"",wrap:""}},[r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""},on:{click:e.checkPassword}},[r(s.Z,{attrs:{label:"Cambiar Contraseña: "+(e.checkPass?"SI":"NO")},on:{change:function(r){e.checkPassword(),e.usuario.password=null,e.usuario.password2=null}},model:{value:e.checkPass,callback:function(r){e.checkPass=r},expression:"checkPass"}})],1),r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}})],1)],1):e._e(),!0===e.checkPass?r(t.Z,{attrs:{xs12:""}},[r(i.Z,{attrs:{grey:"","lighten-2":"",row:"",wrap:""}},[r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(n.h,{attrs:{"prepend-icon":"lock",label:"Contraseña",type:"password",rules:[...e.rules.requerido,e.rules.minLength(4)],color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":"",autocomplete:"new-password"},model:{value:e.usuario.password,callback:function(r){e.$set(e.usuario,"password",r)},expression:"usuario.password"}})],1),r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(n.h,{attrs:{"prepend-icon":"lock",label:"Repetir Contraseña",type:"password",rules:[...e.rules.requerido,e.rules.minLength(4),r=>r===e.usuario.password||"Las Constraseñas no coinciden."],color:"primary",clearable:"","background-color":"primary lighten-5","validate-on-blur":"",autocomplete:"new-password"},model:{value:e.usuario.password2,callback:function(r){e.$set(e.usuario,"password2",r)},expression:"usuario.password2"}})],1)],1)],1):e._e(),"ADMIN_ROLE"===e.persona.role?r(t.Z,{attrs:{xs12:""}},[r(i.Z,{attrs:{grey:"","lighten-2":"",row:"",wrap:""}},[r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(l.r,{attrs:{"item-value":"valor","item-text":"label",items:e.opcionesRoles,label:"Rol","prepend-icon":"supervisor_account",color:"primary","background-color":"primary lighten-5",rules:[...e.rules.requerido]},model:{value:e.usuario.role,callback:function(r){e.$set(e.usuario,"role",r)},expression:"usuario.role"}})],1),r(t.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[r(l.r,{attrs:{"item-value":"valor","item-text":"label",items:e.opcionesEstados,label:"Estado","prepend-icon":"true"==e.usuario.estado?"check_circle":"cancel",color:"true"==e.usuario.estado?"green lighten-1":"error lighten-1","background-color":"true"==e.usuario.estado?"green lighten-1":"error lighten-1",rules:[...e.rules.requerido]},model:{value:e.usuario.estado,callback:function(r){e.$set(e.usuario,"estado",r)},expression:"usuario.estado"}})],1)],1)],1):e._e(),"ADMIN_ROLE"===e.persona.role?r(t.Z,{attrs:{grey:"","lighten-4":"",xs12:""}},[r("treeProperties",{attrs:{data:e.usuario,treeRead:e.permisos,opcionesSelect:e.opcionesPermiso,editando:e.editando,areas:e.areas}})],1):e._e()],1)},c=[],d=a(629),p=a(8535),m={name:"formUsuario",props:["usuario","editar"],components:{treeProperties:p.Z},data(){return{checkPass:!0,areas:[]}},computed:{...(0,d.rn)(["persona","rules"]),...(0,d.rn)("main_usuario",["permisos","opcionesPermiso","opcionesRoles","opcionesEstados"]),editando(){return"true"===this.editar}},async created(){this.areas.push(...await this.buscarAreaFiltros({filtro:"todos",populate:"no",select:"area farmacia unidad_atencion",free:"ADMIN_ROLE"!==this.persona?.role}))},methods:{...(0,d.nv)("main_areas",["buscarAreaFiltros"]),checkPassword(){this.$emit("checkPassword",this.checkPass)}}},h=m,x=a(1001),b=(0,x.Z)(h,u,c,!1,null,null,null),g=b.exports},8585:function(e,r,a){a.r(r),a.d(r,{default:function(){return w}});var o=a(6194),s=a(8956),t=a(2353),i=a(9418),l=a(6530),n=a(108),u=a(683),c=a(445),d=a(3667),p=a(2208),m=a(9456),h=a(8294),x=a(8143),b=function(){var e=this,r=e._self._c;return r("div",[r(u.Z,{attrs:{xs12:""}},[r(p.Z,{attrs:{src:a(6189),alt:"Secretaria de Salud","max-height":"200px"},scopedSlots:e._u([{key:"placeholder",fn:function(){return[r(m.Z,{attrs:{"fill-height":"","align-center":"","justify-center":"","ma-0":""}},[r(h.Z,{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])})],1),r(l.Z,{attrs:{"grid-list-xs":""}},[r(m.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[r(u.Z,{attrs:{"pa-1":"","ma-1":"",xs12:"",primary:"","lighten-1":""}},[r(s.Z,{staticClass:"elevation-6"},[r(i.Z,{staticClass:"primary"},[r(d.Z,{attrs:{medium:"",left:"",color:"white"}},[e._v("person_add")]),r(i.Z,{staticClass:"title white--text"},[e._v("Registrarse")]),r(n.Z,{staticClass:"mx-3 white",attrs:{vertical:""}}),r(x.Cl),r(o.Z,{staticClass:"white--text",attrs:{round:"",to:{name:"Login"},color:"secondary lighten-1",disabled:e.loading.estado,loading:e.loading.estado}},[e._v("Iniciar Sesíon"),r(d.Z,{attrs:{right:""}},[e._v("login")])],1)],1),r(t.ZB,[r(c.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valido,callback:function(r){e.valido=r},expression:"valido"}},[r(m.Z,{attrs:{row:"",wrap:""},on:{keypress:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.registrarUsuario.apply(null,arguments)}}},[r("formUsuario",{attrs:{usuario:e.usuario}})],1)],1)],1),r(i.Z,{staticClass:"primary lighten-2"},[r(x.Cl),r(n.Z,{staticClass:"mx-3 black",attrs:{vertical:""}}),r(o.Z,{class:(e.valido?"primary":"error")+" darken-1",attrs:{round:"",disabled:e.loading.estado,loading:e.loading.estado},on:{click:e.registrarUsuario}},[r(d.Z,{attrs:{left:"",color:"white"}},[e._v("person_add")]),e._v(e._s(e.valido?"Registrar":"Formulario No valido"))],1)],1)],1)],1)],1)],1)],1)},g=[],y=a(629),f=a(4874),k={name:"usuarioRegistrar",components:{formUsuario:f.Z},data(){return{valido:!0,usuario:{}}},computed:{...(0,y.rn)(["loading"]),...(0,y.rn)("main_usuario",["usuarioBase"])},created(){this.usuario={...this._cloneDeep(this.usuarioBase)}},methods:{...(0,y.OI)(["mostrarError"]),...(0,y.nv)("main_usuario",["guardarUsuario"]),toLogin(){this.$router.push({name:"Login"})},async registrarUsuario(){if(this.usuario.password!==this.usuario.password2)return this.$refs.form.validate(),void this.mostrarError({titulo:"Contraseña",mensaje:"Las contraseñas no coinciden."});await this.guardarUsuario({usuario:this.usuario,validate:this.$refs.form.validate,finish:this.toLogin})}}},v=k,Z=a(1001),_=(0,Z.Z)(v,b,g,!1,null,null,null),w=_.exports},6189:function(e,r,a){e.exports=a.p+"img/secretaria-salud-1920-200x.3372a166.png"}}]);