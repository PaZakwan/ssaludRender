"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[914],{6389:function(t,a,r){r.r(a),r.d(a,{default:function(){return y}});var e=r(6194),o=r(8956),s=r(2353),i=r(6530),n=r(108),c=r(683),l=r(445),d=r(3667),m=r(9456),u=r(8143),h=function(){var t=this,a=t._self._c;return a(i.Z,{attrs:{"grid-list-xs":""}},[a(m.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[a(c.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[a(o.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[a(s.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Patrimonio ======")])],1)],1),a(c.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[a(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","darken-2":""}},[a(c.Z,{attrs:{"text-xs-left":"","px-3":""}},[a(d.Z,{attrs:{medium:"",color:"white",left:""}},[t._v("library_books")]),a("span",{staticClass:"title white--text"},[t._v("Editar Objeto")])],1),a(u.Cl),a(n.Z,{staticClass:"hidden-xs-only mx-2 my-1 white",attrs:{vertical:""}}),a(e.Z,{staticClass:"white--text",attrs:{round:"",to:{name:"PatrimonioBuscar"},color:"terciary darken-1",disabled:t.loading.estado,loading:t.loading.estado}},[t._v("Buscar Objetos")])],1),a(o.Z,{staticClass:"elevation-6"},[a(s.ZB,[a(l.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valido,callback:function(a){t.valido=a},expression:"valido"}},[a("formObjeto",{attrs:{formulario:t.objeto,persona:t.persona,areas:t.areas,editar:!0}})],1)],1),a(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",terciary:"","lighten-2":""}},[a(u.Cl),a(n.Z,{staticClass:"hidden-xs-only mx-2 my-1 black",attrs:{vertical:""}}),a(e.Z,{class:{"terciary darken-1":t.valido,"error darken-1":!t.valido},attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:t.editar}},[t._v(" "+t._s(t.valido?"Editar Objeto":"Formulario No valido"))])],1)],1)],1)],1)],1)},f=[],p=r(629),b=r(1630),j={name:"patrimonioEditar",components:{formObjeto:b.Z},data:()=>({valido:!0,areas:[],objeto:{categoria:"",inventario:"",serie:"",marca:"",modelo:"",dependencia:"",fec_alta:"",area:"",ubicacion:"",detalle:"",funciona:"",resumen_percance:"",fec_percance:"",motivo_baja:"",fec_baja:"",motivo_eliminacion:"",usuario_eliminacion:"",fec_eliminacion:"",verificado:"",usuario_verifico:"",fec_verifico:"",estado:"",micro:"",mother:"",memmoria_tipo:"",memoria:"",disco_tipo:"",disco:"",fuente:"",PC:"",pulgadas:"",tipoPantalla:"",impresora_tipo:"",impresora_multifuncion:"",telefono_interno:"",cantidad:"",subcategoria:"",compatibilidad:"",verificar:"true"}}),watch:{"objeto.subcategoria":function(t){"Toner"!==t&&(this.objeto.compatibilidad="")}},computed:{...(0,p.rn)(["APIURL","axiosConfig","loading","persona"])},async created(){this.areas.push(...await this.buscarAreaFiltros({filtro:"todos",populate:"no",select:"area"})),await this.cargarObjeto(this.$route.params.id),this.persona.informatica<2&&"Insumos"===this.objeto.categoria&&(this.mostrarError({errores:"",mensaje:"Acceso Denegado, permisos insuficientes",titulo:401}),this.$router.push({name:"PatrimonioBuscar"}))},methods:{...(0,p.OI)(["mostrarLoading","ocultarLoading","mostrarError","mostrarMensaje"]),...(0,p.nv)("main_areas",["buscarAreaFiltros"]),async cargarObjeto(t){try{this.mostrarLoading({titulo:"Cargando datos...",color:"primary"});let r=JSON.stringify({_id:t}),e=JSON.stringify({area:!1,usuario_eliminacion:!0,usuario_verifico:!0}),o=await this.axios.get(`${this.APIURL}/patrimonio/buscar?filtro=${r}&populate=${e}`,this.axiosConfig);if(o.data.ok)for(const t in o.data.objetos[0])o.data.objetos[0].hasOwnProperty(t)&&("fec_movio"===t||"fec_verifico"===t||"fec_alta"===t||"fec_eliminacion"===t||"fec_baja"===t||"fec_percance"===t?this.objeto[t]=this.mostrarFecha(o.data.objetos[0][t]):"number"===typeof o.data.objetos[0][t]?this.objeto[t]=o.data.objetos[0][t].toString():this.objeto[t]=o.data.objetos[0][t]);else try{this.mostrarError({errores:"",mensaje:o.data.err.message,titulo:o.status})}catch(a){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(a){try{this.mostrarError({errores:a.response.data.err.errors,mensaje:a.response.data.err.message,titulo:a.response.status})}catch(a){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}this.$router.push({name:"PatrimonioBuscar"})}finally{this.ocultarLoading()}},async editar(){if(this.$refs.form.validate()){let a=Object.assign({},this.objeto);try{this.mostrarLoading({titulo:"Enviando datos...",color:"primary"});let r=await this.axios.put(this.APIURL+"/patrimonio/"+this.objeto._id,a,this.axiosConfig);if(r.data.ok)r.data.objeto.inventario?this.mostrarMensaje({msj:["Objeto Editado exitosamente.","<##> Nº Inventario: "+r.data.objeto.inventario.toString()+"<##>"],titulo:"Modificacion Exitosa"}):this.mostrarMensaje({msj:["Objeto Editado exitosamente."],titulo:"Modificacion Exitosa"}),this.$router.push({name:"PatrimonioBuscar"});else try{this.mostrarError({errores:"",mensaje:r.data.err.message,titulo:r.status})}catch(t){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}catch(t){try{this.mostrarError({errores:t.response.data.err.errors,mensaje:t.response.data.err.message,titulo:t.response.status})}catch(t){this.mostrarError({errores:"",mensaje:"Problemas con el servidor, Intente mas tarde.",titulo:500})}}finally{this.ocultarLoading()}}else this.mostrarError({errores:"",mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."})}}},_=j,g=r(1001),v=(0,g.Z)(_,h,f,!1,null,null,null),y=v.exports}}]);