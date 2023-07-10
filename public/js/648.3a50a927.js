"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[648],{3979:(r,e,a)=>{a.d(e,{Z:()=>f});var o=a(6961),i=a(683),t=a(9456),s=a(5084),l=a(4618),n=function(){var r=this,e=r._self._c;return e(t.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(i.Z,{attrs:{xs12:"","px-2":""}},[e(s.Z,{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},scopedSlots:r._u([{key:"activator",fn:function({on:a}){return[e(l.h,r._g({attrs:{clearable:!r.soloLect&&!!r.clear,"background-color":r.soloLect?`${r.color} lighten-2`:`${r.color} lighten-5`,label:r.label,"prepend-icon":r.prepend,readonly:"",color:`${r.color} darken-3`,rules:r.req?r.validate:[]},on:{"click:clear":function(e){return r.$emit("input","")}},model:{value:r.fecha,callback:function(e){r.fecha=e},expression:"fecha"}},a))]}}]),model:{value:r.menufecha1,callback:function(e){r.menufecha1=e},expression:"menufecha1"}},[e(o.Z,{attrs:{readonly:r.soloLect,"allowed-dates":r.allowedDates,min:r.fecMin,max:r.fecMax,color:`${r.color} darken-3`,"header-color":`${r.color} darken-1`,locale:"mx"},on:{input:function(e){r.menufecha1=!1,r.$emit("input",e)}},model:{value:r.fecha,callback:function(e){r.fecha=e},expression:"fecha"}})],1)],1)],1)},c=[];const u={name:"date-select",props:["value","label","icon","color","soloLectura","requerido","min","max","filtro","clearable"],data(){return{menufecha1:!1,validate:[r=>r?""===r.trim()?"Este campo es requerido.":!(r&&r.length<10)||"Ingrese fecha valida (AAAA-MM-DD).":"Este campo es requerido."]}},computed:{fecha:function(){return this.value},soloLect:function(){return this.soloLectura||!1},prepend:function(){return this.icon||"event"},req:function(){return this.requerido||!1},clear:function(){return this.clearable||!1},fecMin:function(){return"-1"===this.min?new Date((new Date).setFullYear((new Date).getFullYear()-1)).toISOString().substring(0,10):this.min?this.min:void 0},fecMax:function(){return"+1"===this.max?new Date((new Date).setFullYear((new Date).getFullYear()+1)).toISOString().substring(0,10):this.max?this.max:void 0},restriction:function(){return this.filtro||[]}},methods:{allowedDates:function(r){return!this.restriction.includes(new Date(r).getUTCDay())}}},m=u;var d=a(1001),p=(0,d.Z)(m,n,c,!1,null,null,null);const f=p.exports},7816:(r,e,a)=>{a.d(e,{Z:()=>I});var o=a(7416),i=a(8956),t=a(2353),s=a(1232),l=a(108),n=a(683),c=a(9456),u=a(4036),m=(a(3782),a(9489)),d=a(4270),p=a(2482),f=a(8294),h=a(8131),g=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(r[o]=a[o])}return r};const b={name:"v-switch",directives:{Touch:d.Z},mixins:[m.Z],props:{loading:{type:[Boolean,String],default:!1}},computed:{classes:function(){return{"v-input--selection-controls v-input--switch":!0}},switchData:function(){return this.setTextColor(this.loading?void 0:this.computedColor,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",this.$attrs),this.genRipple(this.setTextColor(this.computedColor,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",g({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",g({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(p.b0,{},[!1===this.loading?null:this.$slots.progress||this.$createElement(f.Z,{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(r){(r.keyCode===h.Do.left&&this.isActive||r.keyCode===h.Do.right&&!this.isActive)&&this.onChange()}}};var x=a(4618),y=a(5730),v=function(){var r=this,e=r._self._c;return e("div",[e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(s.Z,{attrs:{readonly:r.editar&&!r.isAdmin,clearable:!(r.editar&&!r.isAdmin),"background-color":r.editar&&!r.isAdmin?"terciary lighten-1":"terciary lighten-4",label:"Categoria / Cuenta Patrimonial","prepend-icon":"assignment",color:"terciary",items:r.categorias,rules:[...r.rules.requerido]},on:{change:function(e){r.formulario.categoria=`${null==r.formulario.categoria?"":r.formulario.categoria}`},"click:clear":function(e){r.$nextTick((()=>r.formulario.categoria=""))}},model:{value:r.formulario.categoria,callback:function(e){r.$set(r.formulario,"categoria",e)},expression:"formulario.categoria"}})],1),e(n.Z,{attrs:{xs0:"",sm6:"","px-3":""}}),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.isAdmin||"Insumos"===r.formulario.categoria,clearable:!(r.editar&&!r.isAdmin||"Insumos"===r.formulario.categoria),"background-color":r.editar&&!r.isAdmin||"Insumos"===r.formulario.categoria?"terciary lighten-1":"terciary lighten-5","prepend-icon":"local_offer",label:"Insumos"!==r.formulario.categoria?"Nº Inventario":"Nº Inventario (NO NECESARIO)",type:"text",color:"terciary",rules:"Insumos"!==r.formulario.categoria?[...r.rules.requerido]:[]},model:{value:r.formulario.inventario,callback:function(e){r.$set(r.formulario,"inventario",e)},expression:"formulario.inventario"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar||"Insumos"===r.formulario.categoria||"Muebles"===r.formulario.categoria,clearable:!(r.editar&&!r.permisoEditar||"Insumos"===r.formulario.categoria||"Muebles"===r.formulario.categoria),"background-color":r.editar&&!r.permisoEditar||"Insumos"===r.formulario.categoria||"Muebles"===r.formulario.categoria?"terciary lighten-1":"terciary lighten-5","prepend-icon":"local_offer",label:"Insumos"===r.formulario.categoria||"Muebles"===r.formulario.categoria?"Nº Serie (NO NECESARIO)":"PCs-Desktop"!==r.formulario.categoria&&r.categorias.includes(r.formulario.categoria)?"Nº Serie":"Nº Serie (Opcional)",type:"text",color:"terciary",rules:"Insumos"!==r.formulario.categoria&&"Muebles"!==r.formulario.categoria&&"PCs-Desktop"!==r.formulario.categoria&&r.categorias.includes(r.formulario.categoria)?[...r.rules.requerido]:[]},model:{value:r.formulario.serie,callback:function(e){r.$set(r.formulario,"serie",e)},expression:"formulario.serie"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"prepend-icon":"copyright",label:"Marca",type:"text",color:"terciary","background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5"},model:{value:r.formulario.marca,callback:function(e){r.$set(r.formulario,"marca",e)},expression:"formulario.marca"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{rules:"PCs-Desktop"===r.formulario.categoria?[]:[...r.rules.requerido],readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"prepend-icon":"more",label:"PCs-Desktop"===r.formulario.categoria?"Modelo (Opcional)":"Modelo",type:"text",color:"terciary","background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5"},model:{value:r.formulario.modelo,callback:function(e){r.$set(r.formulario,"modelo",e)},expression:"formulario.modelo"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"prepend-icon":"location_city",label:"Dependencia",type:"text",color:"terciary","background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5"},model:{value:r.formulario.dependencia,callback:function(e){r.$set(r.formulario,"dependencia",e)},expression:"formulario.dependencia"}})],1),!r.editar||r.permisoEditar?e(n.Z,{attrs:{xs12:"",sm6:"","px-2":""}},[e("dateSelect",{staticClass:"capitalizar",attrs:{value:r.formulario.fec_alta,color:"terciary",label:"Fecha de Alta",icon:"event",clearable:"true"},model:{value:r.formulario.fec_alta,callback:function(e){r.$set(r.formulario,"fec_alta",e)},expression:"formulario.fec_alta"}})],1):e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:"","prepend-icon":"event",label:"Fecha de Alta",type:"text",color:"terciary","background-color":"terciary"},model:{value:r.formulario.fec_alta,callback:function(e){r.$set(r.formulario,"fec_alta",e)},expression:"formulario.fec_alta"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(o.Z,{staticClass:"capitalizar",attrs:{readonly:r.editar&&!r.isAdmin||!r.otrasAreas,clearable:!(r.editar&&!r.isAdmin||!r.otrasAreas),"background-color":r.editar&&!r.isAdmin||!r.otrasAreas?"terciary lighten-1":"terciary lighten-5","item-value":"id","item-text":"area",rules:[...r.rules.requerido],items:r.areas,label:"Area","prepend-icon":"location_city",color:"terciary","validate-on-blur":""},model:{value:r.formulario.area,callback:function(e){r.$set(r.formulario,"area",e)},expression:"formulario.area"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"prepend-icon":"fas fa-map-marked-alt",label:"Ubicacion en el Area(Recepcion, consultorio n..)",type:"text",color:"terciary","background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5"},model:{value:r.formulario.ubicacion,callback:function(e){r.$set(r.formulario,"ubicacion",e)},expression:"formulario.ubicacion"}})],1),e(n.Z,{attrs:{xs12:"","mx-3":""}},[e(y.Z,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5",label:"Descripcion del Bien",color:"terciary","prepend-icon":"description","auto-grow":"",rows:"2"},model:{value:r.formulario.detalle,callback:function(e){r.$set(r.formulario,"detalle",e)},expression:"formulario.detalle"}})],1),e(n.Z,{attrs:{xs0:"",sm3:"","px-3":""}}),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(u.r,{attrs:{readonly:r.editar&&!r.permisoEditar,rules:[...r.rules.requerido],items:r.objetoFuncionaList,label:"Estado","prepend-icon":"check_circle",color:"terciary","background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5"},model:{value:r.formulario.funciona,callback:function(e){r.$set(r.formulario,"funciona",e)},expression:"formulario.funciona"}})],1),e(n.Z,{attrs:{xs0:"",sm3:"","px-3":""}}),"Robo/Hurto"===r.formulario.funciona||"Extravio"===r.formulario.funciona?e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"warning darken-3"}},[e(t.ZB,{staticClass:"px-0"},[r._v(" === "+r._s(r.formulario.funciona)+" === ")])],1)],1),!r.editar||r.permisoEditar?e(n.Z,{attrs:{xs12:"",sm6:"","px-2":""}},[e("dateSelect",{staticClass:"capitalizar",attrs:{value:r.formulario.fec_percance,color:"warning",label:"Fecha del Percance",icon:"event",clearable:"true"},model:{value:r.formulario.fec_percance,callback:function(e){r.$set(r.formulario,"fec_percance",e)},expression:"formulario.fec_percance"}})],1):r._e(),e(n.Z,{attrs:{xs0:"",sm6:"","px-3":""}}),e(n.Z,{attrs:{xs12:"","mx-3":""}},[e(y.Z,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"warning":"warning lighten-5",label:"Resumen de Percance",color:"black","prepend-icon":"description",placeholder:"Nro Denuncia Oficial - Resumen del Percance","auto-grow":"",rows:"2"},model:{value:r.formulario.resumen_percance,callback:function(e){r.$set(r.formulario,"resumen_percance",e)},expression:"formulario.resumen_percance"}})],1)],1):r._e(),r.formulario.funciona.includes("Baja")?e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"warning darken-3"}},[e(t.ZB,{staticClass:"px-0"},[r._v(" === "+r._s(r.formulario.funciona)+" === ")])],1)],1),!r.editar||r.permisoEditar?e(n.Z,{attrs:{xs12:"",sm6:"","px-2":""}},[e("dateSelect",{staticClass:"capitalizar",attrs:{value:r.formulario.fec_baja,color:"warning",label:"Fecha de Baja",icon:"event",requerido:"true",clearable:"true"},model:{value:r.formulario.fec_baja,callback:function(e){r.$set(r.formulario,"fec_baja",e)},expression:"formulario.fec_baja"}})],1):r._e(),e(n.Z,{attrs:{xs0:"",sm6:"","px-3":""}}),e(n.Z,{attrs:{xs12:"","mx-3":""}},[e(y.Z,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"warning":"warning lighten-5",label:"Motivo de Baja",color:"black","prepend-icon":"description",placeholder:"Nro Decreto Oficial - Resumen Informe Tecnico","auto-grow":"",rows:"2",rules:[...r.rules.requerido]},model:{value:r.formulario.motivo_baja,callback:function(e){r.$set(r.formulario,"motivo_baja",e)},expression:"formulario.motivo_baja"}})],1)],1):r._e()],1),r.formulario.categoria.includes("PCs")?e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"terciary darken-1"}},[e(t.ZB,{staticClass:"px-0"},[r._v(" === "+r._s(r.formulario.categoria)+" === ")])],1)],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5","prepend-icon":"fas fa-microchip",label:"Microprocesador",type:"text",color:"terciary"},model:{value:r.formulario.micro,callback:function(e){r.$set(r.formulario,"micro",e)},expression:"formulario.micro"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5","prepend-icon":"developer_board",label:"Mother",type:"text",color:"terciary"},model:{value:r.formulario.mother,callback:function(e){r.$set(r.formulario,"mother",e)},expression:"formulario.mother"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(s.Z,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5",label:"Arquitectura de Memoria RAM","prepend-icon":"fas fa-memory",color:"terciary",items:r.objetoMemoriaTipos},on:{change:function(e){r.formulario.memoria_tipo=`${null==r.formulario.memoria_tipo?"":r.formulario.memoria_tipo}`},"click:clear":function(e){r.$nextTick((()=>r.formulario.memoria_tipo=""))}},model:{value:r.formulario.memoria_tipo,callback:function(e){r.$set(r.formulario,"memoria_tipo",e)},expression:"formulario.memoria_tipo"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(s.Z,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5",label:"Memoria/s RAM Instalada/s","prepend-icon":"fas fa-memory",color:"terciary",items:r.objetoMemoriaCantidad},on:{change:function(e){r.formulario.memoria=`${null==r.formulario.memoria?"":r.formulario.memoria}`},"click:clear":function(e){r.$nextTick((()=>r.formulario.memoria_tipo=""))}},model:{value:r.formulario.memoria,callback:function(e){r.$set(r.formulario,"memoria",e)},expression:"formulario.memoria"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(s.Z,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5",label:"Tipo de Almacenamiento","prepend-icon":"fas fa-hdd",color:"terciary",items:r.objetoDiscoTipos},on:{change:function(e){r.formulario.disco_tipo=`${null==r.formulario.disco_tipo?"":r.formulario.disco_tipo}`},"click:clear":function(e){r.$nextTick((()=>r.formulario.disco_tipo=""))}},model:{value:r.formulario.disco_tipo,callback:function(e){r.$set(r.formulario,"disco_tipo",e)},expression:"formulario.disco_tipo"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5","prepend-icon":"fas fa-hdd",label:"Capacidad de Almacenamiento",type:"text",color:"terciary"},model:{value:r.formulario.disco,callback:function(e){r.$set(r.formulario,"disco",e)},expression:"formulario.disco"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5","prepend-icon":"fas fa-car-battery",label:"Fuente",type:"text",color:"terciary"},model:{value:r.formulario.fuente,callback:function(e){r.$set(r.formulario,"fuente",e)},expression:"formulario.fuente"}})],1),e(n.Z,{attrs:{xs0:"",sm6:"","px-3":""}})],1):r._e(),"Insumos"===r.formulario.categoria?e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"terciary darken-1"}},[e(t.ZB,{staticClass:"px-0 text-uppercase"},[r._v(" === Insumos === ")])],1)],1),e(n.Z,{attrs:{xs0:"",sm1:"","px-3":""}}),e(n.Z,{attrs:{xs12:"",sm4:"","px-3":""}},[e(x.h,{attrs:{readonly:!r.isAdmin,clearable:r.isAdmin,"background-color":r.isAdmin?"terciary lighten-5":"terciary lighten-1","prepend-icon":"grain",label:"Cantidad",type:"number",onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'",rules:[...r.rules.requerido,...r.rules.soloNumero,r.rules.minNumber(0)],color:"terciary"},model:{value:r.formulario.cantidad,callback:function(e){r.$set(r.formulario,"cantidad",e)},expression:"formulario.cantidad"}})],1),e(n.Z,{attrs:{xs0:"",sm2:"","px-3":""}}),e(n.Z,{attrs:{xs12:"",sm4:"","px-3":""}},[e(u.r,{attrs:{readonly:r.editar&&!r.edicionInsumos,clearable:!(r.editar&&!r.edicionInsumos),"background-color":r.editar&&!r.edicionInsumos?"terciary lighten-1":"terciary lighten-5",rules:[...r.rules.requerido],items:r.objetoSubcategorias,label:"SubCategoria","prepend-icon":"assignment",color:"terciary"},model:{value:r.formulario.subcategoria,callback:function(e){r.$set(r.formulario,"subcategoria",e)},expression:"formulario.subcategoria"}})],1),e(n.Z,{attrs:{xs0:"",sm1:"","px-3":""}}),"Toner"===r.formulario.subcategoria?e(n.Z,{attrs:{xs12:"","mx-3":""}},[e(y.Z,{attrs:{readonly:r.editar&&!r.edicionInsumos,clearable:!(r.editar&&!r.edicionInsumos),"background-color":r.editar&&!r.edicionInsumos?"terciary lighten-1":"terciary lighten-5",label:"Compatibilidad",color:"terciary","prepend-icon":"compare_arrows","auto-grow":"",rows:"2"},model:{value:r.formulario.compatibilidad,callback:function(e){r.$set(r.formulario,"compatibilidad",e)},expression:"formulario.compatibilidad"}})],1):r._e()],1):r._e(),"Monitor"===r.formulario.categoria?e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"terciary darken-1"}},[e(t.ZB,{staticClass:"px-0 text-uppercase"},[r._v(" === Monitor === ")])],1)],1),e(n.Z,{attrs:{xs0:"",sm3:"","px-3":""}}),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5","prepend-icon":"desktop_windows",label:"PC asosiada (Nº Inventario)",type:"text",color:"terciary"},model:{value:r.formulario.PC,callback:function(e){r.$set(r.formulario,"PC",e)},expression:"formulario.PC"}})],1),e(n.Z,{attrs:{xs0:"",sm3:"","px-3":""}}),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5","prepend-icon":"settings_overscan",label:"Pulgadas",type:"number",color:"terciary"},model:{value:r.formulario.pulgadas,callback:function(e){r.$set(r.formulario,"pulgadas",e)},expression:"formulario.pulgadas"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(s.Z,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5",label:"Tipo de Pantalla","prepend-icon":"remove_from_queue",color:"terciary",items:r.objetoMonitosTipos},on:{change:function(e){r.formulario.tipoPantalla=`${null==r.formulario.tipoPantalla?"":r.formulario.tipoPantalla}`},"click:clear":function(e){r.$nextTick((()=>r.formulario.tipoPantalla=""))}},model:{value:r.formulario.tipoPantalla,callback:function(e){r.$set(r.formulario,"tipoPantalla",e)},expression:"formulario.tipoPantalla"}})],1)],1):r._e(),"Impresora"===r.formulario.categoria?e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"terciary darken-1"}},[e(t.ZB,{staticClass:"px-0 text-uppercase"},[r._v(" === Impresora === ")])],1)],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(o.Z,{staticClass:"capitalizar",attrs:{readonly:r.editar&&!r.permisoEditar,"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5",rules:[...r.rules.requerido],items:r.objetoImpresoraTipos,label:"Sistema de Impresion","prepend-icon":"print",color:"terciary","validate-on-blur":""},model:{value:r.formulario.impresora_tipo,callback:function(e){r.$set(r.formulario,"impresora_tipo",e)},expression:"formulario.impresora_tipo"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b,{attrs:{readonly:r.editar&&!r.permisoEditar,color:"terciary","prepend-icon":"print",label:"Multifuncion: "+(r.formulario.impresora_multifuncion?"Si":"No")},model:{value:r.formulario.impresora_multifuncion,callback:function(e){r.$set(r.formulario,"impresora_multifuncion",e)},expression:"formulario.impresora_multifuncion"}})],1)],1):r._e(),"Telefono"===r.formulario.categoria?e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"terciary darken-1"}},[e(t.ZB,{staticClass:"px-0 text-uppercase"},[r._v(" === Telefono === ")])],1)],1),e(n.Z,{attrs:{xs0:"",sm3:"","px-3":""}}),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{readonly:r.editar&&!r.permisoEditar,clearable:!(r.editar&&!r.permisoEditar),"background-color":r.editar&&!r.permisoEditar?"terciary lighten-1":"terciary lighten-5","prepend-icon":"phone",label:"Numero de Interno",type:"text",color:"terciary"},model:{value:r.formulario.telefono_interno,callback:function(e){r.$set(r.formulario,"telefono_interno",e)},expression:"formulario.telefono_interno"}})],1),e(n.Z,{attrs:{xs0:"",sm3:"","px-3":""}})],1):r._e(),("ADMIN_ROLE"===r.persona.role||r.persona.informatica&&3===r.persona.informatica)&&r.editar?e(c.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"","ma-2":""}},[e(i.Z,{attrs:{dark:"",color:"error darken-1"}},[e(t.ZB,{staticClass:"px-0 text-uppercase"},[r._v(" === Admin Options === ")])],1)],1),e(c.Z,{attrs:{row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{"prepend-icon":"event",label:"Fecha de Eliminacion",type:"text",color:"cuarto","background-color":"cuarto lighten-3",readonly:""},model:{value:r.formulario.fec_eliminacion,callback:function(e){r.$set(r.formulario,"fec_eliminacion",e)},expression:"formulario.fec_eliminacion"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{"prepend-icon":"people",label:"Eliminado Por",type:"text",color:"cuarto","background-color":"cuarto lighten-3",readonly:""},model:{value:r.usersComputed.eliminacion,callback:function(e){r.$set(r.usersComputed,"eliminacion",e)},expression:"usersComputed.eliminacion"}})],1),e(n.Z,{attrs:{xs12:"","px-3":""}},[e(y.Z,{attrs:{readonly:"","background-color":"cuarto lighten-3",label:"Motivo de Eliminacion",color:"cuarto","prepend-icon":"description","auto-grow":"",rows:"2"},model:{value:r.formulario.motivo_eliminacion,callback:function(e){r.$set(r.formulario,"motivo_eliminacion",e)},expression:"formulario.motivo_eliminacion"}})],1),e(n.Z,{attrs:{xs12:"",sm3:"","px-3":""}}),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(u.r,{attrs:{"item-value":"valor","item-text":"label",items:r.objetoEstados,label:"Visibilidad (Eliminado)","prepend-icon":r.formulario.estado?"visibility":"visibility_off",color:"cuarto","background-color":"cuarto lighten-5"},model:{value:r.formulario.estado,callback:function(e){r.$set(r.formulario,"estado",e)},expression:"formulario.estado"}})],1),e(n.Z,{attrs:{xs12:"",sm3:"","px-3":""}})],1),e(n.Z,{attrs:{xs12:""}},[e(l.Z)],1),e(c.Z,{attrs:{row:"",wrap:""}},[e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(u.r,{attrs:{"item-value":"valor","item-text":"label",items:[{label:"Verificado",valor:!0},{label:"Sin Verificar",valor:!1}],label:"Verificado","prepend-icon":r.formulario.verificado?"check_circle_outline":"radio_button_unchecked",color:"cuarto","background-color":"cuarto lighten-3",readonly:""},model:{value:r.formulario.verificado,callback:function(e){r.$set(r.formulario,"verificado",e)},expression:"formulario.verificado"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{"prepend-icon":"event",label:"Fecha de Verificacion",type:"text",color:"cuarto","background-color":"cuarto lighten-3",readonly:""},model:{value:r.formulario.fec_verifico,callback:function(e){r.$set(r.formulario,"fec_verifico",e)},expression:"formulario.fec_verifico"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(x.h,{attrs:{"prepend-icon":"people",label:"Verificado Por",type:"text",color:"cuarto","background-color":"cuarto lighten-3",readonly:""},model:{value:r.usersComputed.verifico,callback:function(e){r.$set(r.usersComputed,"verifico",e)},expression:"usersComputed.verifico"}})],1),e(n.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(b,{attrs:{color:"cuarto","prepend-icon":r.formulario.verificar?"check_circle_outline":"radio_button_unchecked",label:""+(r.formulario.verificar?"Verificar":"Desverificar")},model:{value:r.formulario.verificar,callback:function(e){r.$set(r.formulario,"verificar",e)},expression:"formulario.verificar"}})],1)],1)],1):r._e()],1)},k=[],_=(a(2801),a(1295),a(629)),Z=a(3979);const E={name:"formObjeto",components:{dateSelect:Z.Z},props:["formulario","editar","persona","areas"],data(){return{permisoEditar:!1,edicionInsumos:!1,otrasAreas:!1,isAdmin:!1,categorias:[]}},computed:{...(0,_.rn)(["rules"]),...(0,_.rn)("patrimonio",["objetoCategorias","objetoSubcategorias","objetoFuncionaList","objetoImpresoraTipos","objetoMemoriaTipos","objetoMemoriaCantidad","objetoDiscoTipos","objetoMonitosTipos","objetoEstados","PCsPropiedades","MonitorPropiedades","ImpresoraPropiedades","TelefonoPropiedades","InsumosPropiedades"]),usersComputed(){return{verifico:this.formulario?.usuario_verifico?.nombreC||"",eliminacion:this.formulario?.usuario_eliminacion?.nombreC||""}}},watch:{"formulario.categoria"(r){r&&("Insumos"===r&&(this.formulario["serie"]=null,this.formulario["inventario"]=null,this.formulario["cantidad"]=this.formulario["cantidad"]??"0"),"Muebles"===r&&(this.formulario["serie"]=null),r.includes("PCs")||this.PCsPropiedades.forEach((r=>{this.formulario[r]=null})),"Monitor"!==r&&this.MonitorPropiedades.forEach((r=>{this.formulario[r]=null})),"Impresora"!==r&&this.ImpresoraPropiedades.forEach((r=>{this.formulario[r]=null})),"Telefono"!==r&&this.TelefonoPropiedades.forEach((r=>{this.formulario[r]=null})),"Insumos"!==r&&this.InsumosPropiedades.forEach((r=>{this.formulario[r]=null})))}},created(){if(this.categorias=structuredClone(this.objetoCategorias),this.persona.informatica&&this.persona.informatica>1);else{let r=this.categorias.indexOf("Insumos");r>-1&&this.categorias.splice(r,1)}this.permisoEdicion(),this.permisoEdicionInsumos(),this.permisoOtrasAreas(),this.permisoIsAdmin()},methods:{permisoEdicion(){this.persona.informatica&&this.persona.informatica>=2||this.persona.patrimonio&&this.persona.patrimonio>=3||this.persona.patrimonioArea&&this.persona.patrimonioArea>=3?this.permisoEditar=!0:this.permisoEditar=!1},permisoEdicionInsumos(){this.persona.informatica&&this.persona.informatica>=2?this.edicionInsumos=!0:this.edicionInsumos=!1},permisoOtrasAreas(){this.persona.informatica&&0!==this.persona.informatica||this.persona.patrimonio&&0!==this.persona.patrimonio?this.otrasAreas=!0:this.otrasAreas=!1},permisoIsAdmin(){"ADMIN_ROLE"===this.persona.role?this.isAdmin=!0:this.isAdmin=!1}}},w=E;var $=a(1001),C=(0,$.Z)(w,v,k,!1,null,null,null);const I=C.exports},445:(r,e,a)=>{a.d(e,{Z:()=>i});var o=a(21);const i={name:"v-form",mixins:[(0,o.J)("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var r=Object.values(this.errorBag).includes(!0);this.$emit("input",!r)},deep:!0,immediate:!0}},methods:{watchInput:function(r){var e=this,a=function(r){return r.$watch("hasError",(function(a){e.$set(e.errorBag,r._uid,a)}),{immediate:!0})},o={_uid:r._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?o.shouldValidate=r.$watch("shouldValidate",(function(i){i&&(e.errorBag.hasOwnProperty(r._uid)||(o.valid=a(r)))})):o.valid=a(r),o},validate:function(){var r=this.inputs.filter((function(r){return!r.validate(!0)})).length;return!r},reset:function(){for(var r=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout((function(){r.errorBag={}}),0)},resetValidation:function(){for(var r=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout((function(){r.errorBag={}}),0)},register:function(r){var e=this.watchInput(r);this.inputs.push(r),this.watchers.push(e)},unregister:function(r){var e=this.inputs.find((function(e){return e._uid===r._uid}));if(e){var a=this.watchers.find((function(r){return r._uid===e._uid}));a.valid&&a.valid(),a.shouldValidate&&a.shouldValidate(),this.watchers=this.watchers.filter((function(r){return r._uid!==e._uid})),this.inputs=this.inputs.filter((function(r){return r._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(r){var e=this;return r("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(r){return e.$emit("submit",r)}}},this.$slots.default)}}}}]);