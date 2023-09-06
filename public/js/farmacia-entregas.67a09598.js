"use strict";(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[503],{3687:function(a,e,t){t.d(e,{Z:function(){return v}});var r=t(7416),i=t(6194),o=t(3089),s=t(683),n=t(3667),l=t(9456),c=t(8143),d=t(4618),u=t(1415),g=function(){var a=this,e=a._self._c;return e(l.Z,{class:"grey lighten-"+(a.index%2===0?"3":"2"),attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[a.egreso.retirado||a.noGestionEnOrigen?e(s.Z,{attrs:{xs12:"",md8:"",lg9:"","px-3":""}},[e(d.h,{attrs:{readonly:"","background-color":"primary lighten-1","prepend-icon":"fa-solid fa-pills",label:"Insumo",type:"text",color:"primary"},model:{value:a.egreso.insumoDB,callback:function(e){a.$set(a.egreso,"insumoDB",e)},expression:"egreso.insumoDB"}})],1):a._e(),a.egreso.retirado||a.noGestionEnOrigen?e(s.Z,{attrs:{xs12:"",sm6:"",md4:"",lg3:"","px-3":""}},[e(d.h,{attrs:{readonly:"","background-color":"primary lighten-1","prepend-icon":"trip_origin",label:"Procedencia",type:"text",color:"primary"},model:{value:a.egreso.procedencia,callback:function(e){a.$set(a.egreso,"procedencia",e)},expression:"egreso.procedencia"}})],1):a._e(),a.egreso.retirado||a.noGestionEnOrigen?e(s.Z,{attrs:{xs12:"",sm6:"",lg3:"","px-3":""}},[e(d.h,{attrs:{readonly:"","background-color":"primary lighten-1","prepend-icon":"group_work",label:"Lote",type:"text",color:"primary"},model:{value:a.egreso.lote,callback:function(e){a.$set(a.egreso,"lote",e)},expression:"egreso.lote"}})],1):a._e(),a.egreso.retirado||a.noGestionEnOrigen?e(s.Z,{attrs:{xs12:"",sm5:"",md6:"",lg4:"","px-3":""}},[e(d.h,{attrs:{readonly:"","background-color":"primary lighten-1","prepend-icon":"event",label:"Vencimiento",type:"text",color:"primary"},model:{value:a.egreso.vencimiento,callback:function(e){a.$set(a.egreso,"vencimiento",e)},expression:"egreso.vencimiento"}})],1):e(s.Z,{attrs:{xs12:"",lg9:"","px-3":""}},[e(r.Z,{staticClass:"capitalizar",attrs:{clearable:"","background-color":"primary lighten-5","item-value":"_id","item-text":"insumoDB",items:a.stockDB,label:"Insumo",placeholder:""+(a.egreso.insumo?`${a.egreso.insumo.insumoDB} => Hay: ${a.egreso.insumo.cantidad??"0"} -> Procedencia: ${a.egreso.insumo.procedencia??"---"}; Lote: ${a.egreso.insumo.lote??"---"}; Vencimiento: ${a.egreso.insumo.vencimiento??"---"}.`:"Seleccionar primero Origen"),"prepend-icon":"fa-solid fa-pills",color:"primary",rules:[...a.rules.requerido,e=>{try{return!(e&&!a.stockDB.some((e=>e._id===a.egreso.insumo._id)))||"El Insumo ya no se encuentra disponible."}catch(t){return"Error Inesperado (component-egreso-insumo)."}}],"validate-on-blur":"","return-object":""},scopedSlots:a._u([{key:"selection",fn:function(t){return[e(o.Z,{attrs:{color:"primary darken-1","text-color":"white"}},[e(n.Z,{staticClass:"hidden-xs-only",attrs:{left:""}},[a._v("fa-solid fa-pills")]),a._v(" "+a._s(t.item.insumoDB)+" ")],1),e(o.Z,{attrs:{color:"primary darken-1","text-color":"white"}},[e(n.Z,{staticClass:"hidden-xs-only",attrs:{left:""}},[a._v("trip_origin")]),a._v(" Procedencia: "+a._s(t.item.procedencia??"---")+" ")],1),e(o.Z,{attrs:{color:"primary darken-1","text-color":"white"}},[e(n.Z,{staticClass:"hidden-xs-only",attrs:{left:""}},[a._v("group_work")]),a._v(" Lote: "+a._s(t.item.lote??"---")+" ")],1),e(o.Z,{attrs:{color:""+(t.item.expirado?"red darken-1":t.item.porExpirar?"orange darken-1":"primary darken-1"),"text-color":"white"}},[e(n.Z,{staticClass:"hidden-xs-only",attrs:{left:""}},[a._v("event")]),a._v(" Vencimiento: "+a._s(t.item.vencimiento??"---")+" ")],1),e(o.Z,{attrs:{color:"primary darken-1","text-color":"white"}},[e(n.Z,{staticClass:"hidden-xs-only",attrs:{left:""}},[a._v("grain")]),a._v(" Hay: "+a._s(t.item.cantidad??"0")+" ")],1)]}},{key:"item",fn:function(t){return[e("code",{staticClass:"primary darken-1 white--text v-list-active--background v-list-disabled--background"},[a._v(" "+a._s(t.item.insumoDB)+" ")]),a._v(" - "),e("code",{staticClass:"primary darken-1 white--text"},[e("span",{staticClass:"hidden-xs-only"},[a._v("Procedencia: ")]),a._v(a._s(t.item.procedencia??"---")+" ")]),a._v(" - "),e("code",{staticClass:"primary darken-1 white--text"},[e("span",{staticClass:"hidden-xs-only"},[a._v("Lote: ")]),a._v(a._s(t.item.lote??"---")+" ")]),a._v(" - "),e("code",{class:(t.item.expirado?"red darken-1":t.item.porExpirar?"orange darken-1":"primary darken-1")+" white--text"},[e("span",{staticClass:"hidden-xs-only"},[a._v("Vencimiento: ")]),a._v(a._s(t.item.vencimiento??"---")+" ")]),a._v(" - "),e("code",{staticClass:"primary darken-1 white--text"},[e("span",{staticClass:"hidden-xs-only"},[a._v("Hay: ")]),a._v(a._s(t.item.cantidad??"0")+" ")])]}}]),model:{value:a.egreso.insumo,callback:function(e){a.$set(a.egreso,"insumo",e)},expression:"egreso.insumo"}})],1),e(s.Z,{class:""+(a.egreso.retirado||a.noGestionEnOrigen?"sm5 md6 lg3":"sm8 lg2"),attrs:{xs12:"","px-3":""}},[e(d.h,{attrs:{readonly:!!a.egreso.retirado||a.noGestionEnOrigen,clearable:!(a.egreso.retirado||a.noGestionEnOrigen),"background-color":a.egreso.retirado||a.noGestionEnOrigen?"primary lighten-1":"primary lighten-5","prepend-icon":"grain",label:"Cantidad",type:"number",onkeydown:"return event.key !== 'e' && event.key !== 'E' && event.key !== '.' && event.key !== ',' && event.key !== '+' && event.key !== '-'",color:"primary",rules:a.egreso.retirado||a.noGestionEnOrigen?[]:[...a.rules.requerido,...a.rules.soloNumero,a.rules.minNumber(1),a.rules.maxNumber(a.egreso.insumo?.cantidad||"Seleccione Insumo")]},model:{value:a.egreso.cantidad,callback:function(e){a.$set(a.egreso,"cantidad",e)},expression:"egreso.cantidad"}})],1),e(c.Cl),e(u.Z,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:t}){return[e(i.Z,a._g({attrs:{disabled:a.loading.estado||!!a.egreso.retirado||a.noGestionEnOrigen,color:"white",icon:"",small:""},on:{click:function(e){return a.borrarFila(a.index)}}},t),[e(n.Z,{attrs:{color:"red lighten-2"}},[a._v("delete_forever")])],1)]}}])},[e("span",[a._v("Eliminar Insumo")])]),e(c.Cl,{staticClass:"hidden-xs-only"})],1)},m=[],p=t(629),h={name:"component-egreso-insumo",props:["egreso","index","stockDB","borrarFila","actualizar","noGestionEnOrigen"],computed:{...(0,p.rn)(["loading","rules"])},watch:{"egreso.insumo"(){this.actualizar()}}},f=h,x=t(1001),y=(0,x.Z)(f,g,m,!1,null,null,null),v=y.exports},2406:function(a,e,t){t.r(e),t.d(e,{default:function(){return M}});var r=t(8469),i=t(6194),o=t(8956),s=t(2353),n=t(9418),l=t(5050),c=t(7352),d=t(108),u=t(683),g=t(3667),m=t(9456),p=t(6446),h=t(8143),f=t(4618),x=t(1415),y=function(){var a=this,e=a._self._c;return e(l.Z,{attrs:{fluid:"","grid-list-xs":""}},[e(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[e(u.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(o.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[e(s.ZB,{staticClass:"px-0 text-uppercase"},[a._v("====== Gestion de Farmacia ======")])],1)],1)],1),e(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[e(u.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[e(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",cuarto:"","darken-1":""}},[e(u.Z,{attrs:{"px-3":""}},[e(g.Z,{attrs:{medium:"",color:"white",left:""}},[a._v("fa-solid fa-pills")]),e("span",{staticClass:"title white--text"},[a._v("Insumos / Entregas")])],1),e(h.Cl),e(i.Z,{attrs:{fab:"",small:"",color:"primary darken-2"},on:{click:function(e){return a.retroceder()}}},[e(g.Z,[a._v("far fa-arrow-alt-circle-left")])],1)],1),e(o.Z,{staticClass:"elevation-6",attrs:{color:"grey lighten-2"}},[e(s.ZB,{staticClass:"px-0"},[e(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"","text-xs-center":""}},[e(u.Z,{attrs:{xs12:"","px-3":""}},[e(o.Z,{staticClass:"grey lighten-3"},[e(m.Z,{attrs:{"justify-center":"",row:"",wrap:""},on:{keypress:function(e){return!e.type.indexOf("key")&&a._k(e.keyCode,"enter",13,e.key,"Enter")?null:a.recargarDataTable(a.filtro)}}},[e(u.Z,{attrs:{xs12:"",sm6:"",md3:"","px-3":""}},[e("dateSelect",{staticClass:"capitalizar",attrs:{value:a.filtro.desde,"background-color":"cuarto lighten-5",color:"cuarto",label:"Desde",icon:"today",max:a.filtro.hasta,requerido:"true"},model:{value:a.filtro.desde,callback:function(e){a.$set(a.filtro,"desde",e)},expression:"filtro.desde"}})],1),e(u.Z,{attrs:{xs12:"",sm6:"",md3:"","px-3":""}},[e("dateSelect",{staticClass:"capitalizar",attrs:{value:a.filtro.hasta,"background-color":"cuarto lighten-5",color:"cuarto",label:"Hasta",icon:"event",min:a.filtro.desde,requerido:"true"},model:{value:a.filtro.hasta,callback:function(e){a.$set(a.filtro,"hasta",e)},expression:"filtro.hasta"}})],1),e(u.Z,{attrs:{xs12:"",md10:"","px-3":"","mb-3":""}},[e("componentFiltroAvanzado",{attrs:{filtro:a.filtro,areasFiltro:a.areasFiltro,insumos:{filtro:{categoria:{$in:["Medicamento","Higiene/Limpieza","Enfermeria/Medico","Alimento","Varios"]}},select:"nombre descripcion nombreC"},procedencia:!0}})],1)],1),e(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[e(i.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:a.loading.estado,loading:a.loading.estado},on:{click:function(e){return a.recargarDataTable(a.filtro)}}},[e(g.Z,{attrs:{medium:"",left:""}},[a._v("search")]),a._v(" Buscar Entregas")],1),e(d.Z,{staticClass:"hidden-xs-only mx-4 my-1 black",attrs:{vertical:""}}),e(i.Z,{staticClass:"white--text mb-2",attrs:{round:"",color:"cuarto darken-2",disabled:a.loading.estado,loading:a.loading.estado},on:{click:function(e){return a.reporte()}}},[e(g.Z,{attrs:{medium:"",left:""}},[a._v("fa-solid fa-file-pdf")]),a._v(" Entregas PDF")],1)],1)],1)],1)],1)],1)],1)],1),e(u.Z,{attrs:{"pa-1":"","ma-1":"",xs12:"",cuarto:"","lighten-1":""}},[e(o.Z,{staticClass:"elevation-6"},[e(m.Z,{attrs:{row:"",wrap:"","align-center":"","justify-center":"",primary:""}},[e(u.Z,{attrs:{"px-3":""}},[e(g.Z,{attrs:{medium:"",color:"white",left:""}},[a._v("fas fa-hand-holding-medical")]),e("span",{staticClass:"title white--text"},[a._v("Entregas de Insumos")])],1),e(h.Cl)],1),e(n.Z,[e(u.Z,{attrs:{xs12:"",sm4:"","px-2":""}},[e(f.h,{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":"",clearable:""},model:{value:a.search,callback:function(e){a.search=e},expression:"search"}})],1),e(h.Cl),e(d.Z,{staticClass:"hidden-xs-only mx-2 primary",attrs:{inset:"",vertical:""}}),e(i.Z,{staticClass:"mb-2",attrs:{round:"",color:"primary",disabled:a.loading.estado||!(a.persona.farmacia.entregas?.length>0||a.persona.farmacia.general?.admin),loading:a.loading.estado},on:{click:function(e){return a.actualizarDialogEntrega({state:!0})}}},[e(g.Z,{attrs:{medium:"",left:""}},[a._v("output")]),a._v(" Nueva Entrega")],1)],1),e(c.Z,{staticClass:"elevation-6",staticStyle:{"table-layout":"fixed"},attrs:{id:"tablita",headers:a.headers,items:a.dataTable,"item-key":"_id",pagination:a.paginacion,"rows-per-page-items":[5,10,25,50],loading:a.loading.estado,search:a.search},on:{"update:pagination":function(e){a.paginacion=e}},scopedSlots:a._u([{key:"no-results",fn:function(){return[e(r.Z,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[a._v(' No se encontraron resultados para "'+a._s(a.search)+'". ')])]},proxy:!0},{key:"no-data",fn:function(){return[e(r.Z,{staticClass:"text-sm-left",attrs:{value:!0,color:"error",icon:"warning"}},[a._v(" No hay datos para mostrar. ")])]},proxy:!0},{key:"items",fn:function(t){return[e("tr",{class:a.backgroundClass(t.item)},[a._l(a.headersDinamics,(function(a){return e("td",{key:a.text,class:a.class},[e("bodyDataTableDinamic",{attrs:{props:t,field:a}})],1)})),e("td",{staticClass:"text-sm-left"},[e("div",{staticClass:"text-xs-center"},[e(x.Z,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:r}){return[e(i.Z,a._g({attrs:{disabled:a.loading.estado||!(a.todayInit<=t.item.retirado&&t.item.retirado<=a.todayFinish)||!(a.persona.farmacia.general?.admin||a.persona.farmacia.entregas?.includes(t.item.origen)),color:"white",small:"",icon:""},on:{click:function(e){return a.borrarEntrega({entrega:t.item})}}},r),[e(g.Z,{attrs:{color:"red"}},[a._v("delete")])],1)]}}],null,!0)},[e("span",[a._v("Borrar Entrega")])])],1)])],2)]}}])},[e(p.Z,{attrs:{color:"blue",indeterminate:""}})],1)],1)],1)],1),e("dialogEntrega",{attrs:{closeFinish:a.recargarDataTable}})],1)},v=[],b=t(629),E=t(5011),k=t(5716),_=t(7416),Z=t(5049),w=t(445),C=t(7213),D=t(34),F=t(2280),B=t(2976),S=t(4920),I=function(){var a=this,e=a._self._c;return e(Z.Z,{attrs:{"max-width":"80%",persistent:"",scrollable:""},model:{value:a.dialogEntrega.state,callback:function(e){a.$set(a.dialogEntrega,"state",e)},expression:"dialogEntrega.state"}},[e(o.Z,{staticClass:"dialog-draggable-window"},[e(S.Z,{staticClass:"dialog-draggable ma-0 pa-0",attrs:{color:"grey lighten-2",height:"auto",window:""}},[e(g.Z,{staticClass:"dialog-draggable pl-2",attrs:{medium:"",color:"black darken-2"}},[a._v("fas fa-hand-holding-medical")]),e("span",{staticClass:"display-1 font-weight-bold text-capitalize black--text text--darken-2 dialog-draggable"},[a._v(a._s(a.dialogEntrega.entrega?"Insumo Entregado":"Nueva Entrega"))]),e(h.Cl),e(g.Z,{attrs:{large:"",disabled:a.loading.estado,color:"error darken-1"},on:{click:a.close}},[a._v("cancel_presentation")])],1),e(o.Z,[e(s.ZB,{staticClass:"ma-0 pa-0"},[e(C.Z,{model:{value:a.step,callback:function(e){a.step=e},expression:"step"}},[e(F.Rp,{staticClass:"yellow lighten-4",staticStyle:{height:"32px"}},[e(B.Z,{staticClass:"px-4 py-0",attrs:{color:a.step>1?"green":"primary",complete:a.step>1,step:"1"}},[a._v("Seleccione el Paciente")]),e(d.Z),e(B.Z,{staticClass:"px-4 py-0",attrs:{step:"2"}},[a._v("Entregar Medicacion")])],1)],1)],1)],1),e(d.Z),e(s.ZB,{staticClass:"ma-0 pa-0"},[e(C.Z,{model:{value:a.step,callback:function(e){a.step=e},expression:"step"}},[e(F.Rp,{staticClass:"d-none"},[e(B.Z,{attrs:{step:"1"}})],1),e(F.gd,[e(D.Z,{staticClass:"ma-0 pa-1",attrs:{step:"1"}},[e("selectPaciente",{attrs:{selectIcon:"fas fa-hand-holding-medical",refreshState:a.dialogEntrega.state},on:{selectedPaciente:({paciente:e})=>a.pacienteSeleccionado(e)}})],1),e(D.Z,{staticClass:"ma-0 pa-2",attrs:{step:"2"}},[e(w.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:a.valido,callback:function(e){a.valido=e},expression:"valido"}},[e(m.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(u.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e("dateSelect",{staticClass:"capitalizar",attrs:{soloLectura:a.dialogEntrega.soloLectura,clearable:!a.dialogEntrega.soloLectura,color:"primary",label:"Fecha",icon:"event",value:a.dataEdit.fecha,max:a.hoy,requerido:"true"},model:{value:a.dataEdit.fecha,callback:function(e){a.$set(a.dataEdit,"fecha",e)},expression:"dataEdit.fecha"}})],1),e(u.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(_.Z,{staticClass:"capitalizar",attrs:{readonly:a.dialogEntrega.soloLectura,clearable:!a.dialogEntrega.soloLectura,"background-color":a.dialogEntrega.soloLectura?"primary lighten-1":"primary lighten-5","item-value":"id","item-text":"area",items:a.areasFiltro,label:"Origen","prepend-icon":"fa-house-medical-flag",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.dataEdit.origen,callback:function(e){a.$set(a.dataEdit,"origen",e)},expression:"dataEdit.origen"}})],1),e(u.Z,{attrs:{xs12:"","px-3":""}},[e(m.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e(f.h,{attrs:{readonly:"","background-color":"primary lighten-1",label:"Paciente: Apellido, Nombre (Documento)","prepend-icon":"personal_injury",color:"primary",rules:[...a.rules.requerido],"validate-on-blur":""},model:{value:a.dataEdit.pacienteNombreDocumento,callback:function(e){a.$set(a.dataEdit,"pacienteNombreDocumento",e)},expression:"dataEdit.pacienteNombreDocumento"}}),e(i.Z,{staticClass:"primary white--text",attrs:{disabled:a.loading.estado,loading:a.loading.estado,round:""},on:{click:function(e){return a.resetForm()}}},[e(g.Z,{attrs:{left:""}},[a._v("fa-solid fa-people-arrows")]),a._v("Cambiar Paciente ")],1)],1)],1),e(u.Z,{attrs:{xs12:"",sm4:"","px-3":""}},[e(f.h,{attrs:{readonly:a.dialogEntrega.soloLectura,clearable:!a.dialogEntrega.soloLectura,"background-color":a.dialogEntrega.soloLectura?"primary lighten-1":"primary lighten-5","prepend-icon":"fas fa-id-card-alt",label:"Cobertura Social (Opcional)",messages:"Dejar vacio si no tiene.",placeholder:"Dejar vacio si no tiene.",type:"text",color:"primary"},model:{value:a.dataEdit.oSocial,callback:function(e){a.$set(a.dataEdit,"oSocial",e)},expression:"dataEdit.oSocial"}})],1),e(u.Z,{attrs:{xs12:"","px-3":"",primary:"","darken-3":""}},[e(m.Z,{attrs:{"align-center":"","justify-center":"",row:"",wrap:""}},[e("h4",{staticClass:"title float: left white--text"},[a._v("Insumos a Entregar")]),e(h.Cl),e(x.Z,{attrs:{top:"","close-delay":"0"},scopedSlots:a._u([{key:"activator",fn:function({on:t}){return[e(i.Z,a._g({attrs:{disabled:a.loading.estado||a.dialogEntrega.soloLectura,flat:"",icon:"",color:"white",small:"",right:""},on:{click:function(e){return a.agregarFila()}}},t),[e(g.Z,{attrs:{large:""}},[a._v("control_point")])],1)]}}])},[e("span",[a._v("Agregar Insumo")])])],1)],1),a._l(a.dataEdit.insumos,(function(t,r){return e(u.Z,{key:`insumos-${r}`,attrs:{xs12:""}},[e("componentEgresoInsumo",{attrs:{egreso:t,index:r,stockDB:a.stockFiltrado,borrarFila:a.borrarFila,actualizar:a.actualizarStockFiltrado,noGestionEnOrigen:!1}})],1)})),0===a.dataEdit.insumos?.length?e(m.Z,{attrs:{row:"",wrap:""}},[e(u.Z,{attrs:{xs12:"","mx-3":"","pb-0":""}},[e(f.h,{attrs:{readonly:"","background-color":"orange lighten-4",label:"No Hay Insumos, Debe haber por lo menos uno.","prepend-icon":"warning",color:"orange",solo:"",rules:[...a.rules.requerido]}})],1),e(h.Cl),e(i.Z,{staticClass:"my-0",attrs:{disabled:a.loading.estado||a.dialogEntrega.soloLectura,round:"",color:"primary"},on:{click:function(e){return a.agregarFila()}}},[e(g.Z,{attrs:{left:""}},[a._v("control_point")]),a._v("Insumo Entrega ")],1),e(h.Cl)],1):a._e(),a.dialogEntrega.soloLectura?e(u.Z,{attrs:{xs12:"",sm6:"","px-3":""}},[e(f.h,{attrs:{readonly:"","background-color":"primary lighten-1","prepend-icon":"local_shipping",label:"Fecha de Retirado",placeholder:"Sin Salir",type:"text",color:"primary"},model:{value:a.dataEdit.retirado,callback:function(e){a.$set(a.dataEdit,"retirado",e)},expression:"dataEdit.retirado"}})],1):a._e()],2)],1)],1)],1)],1)],1),e(d.Z),e(s.h7,{directives:[{name:"show",rawName:"v-show",value:2===a.step,expression:"step === 2"}]},[e(m.Z,{attrs:{row:"",wrap:""}},[e(i.Z,{attrs:{disabled:a.loading.estado||a.dialogEntrega.soloLectura,round:"",color:"primary"},on:{click:function(e){return a.agregarFila()}}},[e(g.Z,{attrs:{left:""}},[a._v("control_point")]),a._v("Insumo Entrega ")],1),e(h.Cl),e(i.Z,{staticClass:"red darken-1 white--text",attrs:{disabled:a.loading.estado,loading:a.loading.estado,round:""},on:{click:function(e){return a.close()}}},[e(g.Z,{attrs:{left:""}},[a._v("cancel_presentation")]),a._v("Cancelar ")],1),e(i.Z,{class:(a.valido?"primary darken-1":"yellow darken-3")+" white--text",attrs:{disabled:a.loading.estado||a.dialogEntrega.soloLectura,loading:a.loading.estado,round:""},on:{click:function(e){return a.guardarEntrega()}}},[e(g.Z,{attrs:{left:""}},[a._v("save")]),a._v(a._s(a.valido?a.dialogEntrega.entrega?"Guardar":"Realizar Entrega":"Faltan Datos")+" ")],1)],1)],1)],1)],1)},L=[],$=(t(7658),t(535)),j=t(3687),P={name:"dialogEntrega",props:["closeFinish"],components:{dateSelect:E.Z,selectPaciente:$.Z,componentEgresoInsumo:j.Z},data:()=>({step:1,valido:!0,areasFiltro:[],stockEntregaDB:[],stockFiltrado:[],dataEdit:{},dataEditBase:{fecha:"",origen:"",profesional:"",paciente:"",pacienteNombreDocumento:"",oSocial:"",insumos:[{insumo:void 0,cantidad:null}],retirado:""}}),computed:{...(0,b.rn)(["loading","hoy","persona","rules"]),...(0,b.rn)("farmacia",["dialogEntrega"])},watch:{async"dialogEntrega.state"(a){a?setTimeout((async()=>{let a=[...await this.buscarAreaFiltros({filtro:{farmacia:!0},populate:"no",select:"area"})];this.areasFiltro=this.persona.farmacia?.general?.admin?a:await this.filtrarArrayParaSelectsDisabled({arraySelects:a,arrayEnable:this.persona.farmacia?.entregas,propCompare:"_id"}),this.resetForm()}),350):this.resetForm({soloBase:!0})},async"dataEdit.origen"(a){this.stockEntregaDB=a?await this.buscarStockParaSelects({area:a,categoria:["Medicamento","Higiene/Limpieza","Enfermeria/Medico","Alimento","Varios"]}):[],this.dataEdit.insumos=[{...this.dataEditBase.insumos[0]}],this.actualizarStockFiltrado()}},beforeMount(){this.dataEditBase.fecha=this.hoy,this.dataEdit=this._cloneDeep(this.dataEditBase)},methods:{...(0,b.OI)(["mostrarLoading","mostrarError","mostrarMensaje","ocultarLoading"]),...(0,b.nv)(["filtrarArrayParaSelectsDisabled","requestAPI"]),...(0,b.nv)("main_areas",["buscarAreaFiltros"]),...(0,b.nv)("farmacia",["actualizarDialogEntrega","buscarStockParaSelects"]),close(){this.actualizarDialogEntrega({state:!1}),this.step=1,this.closeFinish?.()},async actualizarStockFiltrado(){let a=[];this.dataEdit.insumos.forEach((e=>{e.insumo?._id&&a.push(e.insumo._id)})),a.length>0?this.stockFiltrado=await this.filtrarArrayParaSelectsDisabled({arraySelects:this.stockEntregaDB,arrayDisable:a,propCompare:"_id"}):this.stockFiltrado=this.stockEntregaDB},agregarFila(){this.dataEdit.insumos.push({...this.dataEditBase.insumos[0]})},borrarFila(a){this.dataEdit.insumos.splice(a,1),this.actualizarStockFiltrado()},resetForm({soloBase:a=!1}={}){this.dataEdit=this._cloneDeep(this.dataEditBase),a||this.persona.farmacia?.general?.admin||1!==this.persona.farmacia?.entregas?.length||(this.dataEdit.origen=this.persona.farmacia?.entregas[0]),this.$refs.form.resetValidation(),this.step=1},pacienteSeleccionado(a){this.dataEdit.paciente=a.id,this.dataEdit.pacienteNombreDocumento=a.nombreDocumento,this.dataEdit.oSocial=a.oSocial,this.step=2},async guardarEntrega(){if(!this.$refs.form.validate())return this.mostrarError({mensaje:"Revise los campos obligatorios.",titulo:"Valores Requeridos."}),!1;try{this.mostrarLoading({titulo:"Efectuando cambios..."});let a=this._cloneDeep(this.dataEdit);if(!a._id){let e=this.isVacio(a,!0);if(!0===e.vacio)return this.mostrarError({mensaje:"Complete por lo menos un dato.",titulo:"Valores Requeridos"}),!1;a=e.dato}let e=null;if(e=await this.requestAPI({method:"put",url:"/farmacia/entrega",update:a}),e?.data?.ok){let e=a._id?"Editada":"Guardada";return this.mostrarMensaje({msj:[`Entrega ${e} exitosamente.`],titulo:"Completado"}),this.close(),!0}return!1}catch(a){return this.mostrarError({mensaje:a,titulo:"Inesperado (guardarEntrega)"}),!1}finally{this.ocultarLoading()}}}},z=P,O=t(1001),A=(0,O.Z)(z,I,L,!1,null,null,null),q=A.exports,N=t(7079),G={name:"insumoEntregaBuscar",components:{dateSelect:E.Z,bodyDataTableDinamic:k.Z,dialogEntrega:q,componentFiltroAvanzado:N.Z},data:()=>({areasFiltro:[],dataTable:[],filtro:{desde:"",hasta:"",areas:[],insumos:[],procedencias:[]},ultimoFiltro:{},search:"",paginacion:{sortBy:"fecha",descending:!0,rowsPerPage:10,page:1},headers:[{text:"Fecha",value:"fecha",align:"left",class:"text-xs-left",width:"10%",ruta:"fecha",date:!0},{text:"Origen",value:"origenDB",align:"left",class:"text-xs-left",width:"15%",ruta:"origenDB"},{text:"Paciente",value:"pacienteDB",align:"left",class:"text-xs-left",width:"15%",ruta:"pacienteDB"},{text:"Documento",value:"pacienteDocDB",align:"left",class:"text-xs-right",width:"15%",ruta:"pacienteDocDB"},{text:"O. Social",value:"oSocial",align:"left",class:"text-xs-left",width:"10%",ruta:"oSocial"},{text:"Categoria Ins.",value:"categoriaDB",align:"left",class:"text-xs-left",width:"10%",ruta:"categoriaDB"},{text:"Insumo",value:"insumoDB",align:"left",class:"text-xs-left",width:"10%",ruta:"insumoDB"},{text:"Cantidad",value:"cantidad",align:"left",class:"text-xs-right",width:"5%",ruta:"cantidad"},{text:"Procedencia",value:"procedencia",align:"left",class:"text-xs-left",width:"10%",ruta:"procedencia"},{text:"Lote",value:"lote",align:"left",class:"text-xs-right",width:"10%",ruta:"lote"},{text:"Vencimiento",value:"vencimiento",align:"left",class:"text-xs-left",width:"10%",ruta:"vencimiento",date:!0},{text:"Fecha de Carga",value:"retirado",align:"left",class:"text-xs-left",width:"10%",ruta:"retirado",date:!0,time:!0},{text:"Acciones",value:"id",align:"center",sortable:!1,width:"5%",ruta:"id",ignore:!0}]}),computed:{...(0,b.rn)(["loading","todayInit","todayFinish","hoy","weekBefore","persona"]),headersDinamics(){return[...this.headers.filter((a=>!0!==a.ignore))]}},async created(){this.filtro.desde=this.weekBefore,this.filtro.hasta=this.hoy;let a=[...await this.buscarAreaFiltros({filtro:{farmacia:!0},populate:"no",select:"area"})];this.areasFiltro=a,this.filtro.areas=a.map((a=>a.id)),await this.recargarDataTable(this.filtro)},methods:{...(0,b.OI)(["mostrarLoading","mostrarMensaje","mostrarError","ocultarLoading","mostrarDialogIframe"]),...(0,b.nv)(["retroceder","routerResolve","requestAPI"]),...(0,b.nv)("main_areas",["buscarAreaFiltros"]),...(0,b.nv)("farmacia",["actualizarDialogEntrega","getRequestFilter"]),backgroundClass(a){if(!a)return"";try{return a.retirado?"background-color: green lighten-5":"background-color: orange lighten-4"}catch(e){return""}},async recargarDataTable(a){if(a){let e=await this.buscarEntregasFiltro(a);e&&(this.dataTable=e,this.ultimoFiltro=this._cloneDeep(a))}else this.dataTable=await this.buscarEntregasFiltro(this.ultimoFiltro);this.paginacion.page>Math.ceil(this.dataTable?.length/this.paginacion.rowsPerPage)&&(this.paginacion.page=1)},async buscarEntregasFiltro(a){try{this.mostrarLoading({titulo:"Buscando Entregas..."});let e=await this.getRequestFilter({payload:a});if(e.error)return;let t=null;return t=await this.requestAPI({method:"get",url:`/farmacia/entrega?${e.dato}`}),t?.data?.ok?t.data.entregas:[{origenDB:"error de carga, recargar pagina",id:void 0}]}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (buscarEntregasFiltro)"}),[{origenDB:"error de buscarEntregasFiltro, recargar pagina",id:void 0}]}finally{this.ocultarLoading()}},async reporte(){if(this.filtro.areas.length>0){localStorage.setItem("pdfTemp",JSON.stringify(this.filtro));let a=await this.routerResolve({name:"FarmaciaEntregaImprimir",query:{descarga:!1}});this.mostrarDialogIframe({src:a.href,titulo_name:`Farmacia Entregas ${this.filtro.desde} ~ ${this.filtro.hasta}`})}else this.mostrarError({errores:"",mensaje:"Complete por lo menos con una Farmacia para el reporte.",titulo:"Valores Requeridos."})},async borrarEntrega(a){if(await this.$root.$confirm.open({titulo:"ELIMINAR",msj:["Se Recuperará el Stock entregado.",`La Entrega de ${a.entrega.insumoDB} (${a.entrega.cantidad}) a ${a.entrega.pacienteDB}; sera Eliminada.\n¿Desea continuar?`]}))try{this.mostrarLoading({titulo:"Borrando Entrega..."});let e=null;return e=await this.requestAPI({method:"delete",url:`/farmacia/entrega/${a.entrega._id}`}),!!e?.data?.ok&&(this.mostrarMensaje({msj:["Borrado exitosamente."],titulo:"Borrado Exitoso"}),this.recargarDataTable(),!0)}catch(e){return this.mostrarError({mensaje:e,titulo:"Inesperado (borrarEntrega)"}),!1}finally{this.ocultarLoading()}}}},T=G,R=(0,O.Z)(T,y,v,!1,null,null,null),M=R.exports}}]);