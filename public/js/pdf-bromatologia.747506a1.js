(self["webpackChunksecretaria_de_salud_moreno_frontend"]=self["webpackChunksecretaria_de_salud_moreno_frontend"]||[]).push([[322],{929:function(t,i,e){"use strict";e.r(i),e.d(i,{default:function(){return C}});var n=e(6194),s=e(8956),a=e(2353),o=e(6530),r=e(683),l=e(9456),c=e(8143),d=function(){var t=this,i=t._self._c;return i(o.Z,{attrs:{"grid-list-xs":""}},[i(l.Z,{attrs:{"align-center":"","justify-center":"","ma-0":"",wrap:"","text-xs-center":""}},[i(r.Z,{attrs:{"pa-1":"","ma-1":"",cuarto:"",xs12:""}},[i(s.Z,{staticClass:"white--text",attrs:{color:"cuarto darken-2"}},[i(a.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Bromatologia ======")])],1)],1),t.loading.estado?i(r.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[i(s.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[i(a.ZB,{staticClass:"px-0 text-uppercase"},[t._v("====== Creando PDF Espere... ======")])],1)],1):i(r.Z,{attrs:{"pa-1":"","ma-1":"",terciary:"",xs12:""}},[i(s.Z,{staticClass:"white--text",attrs:{color:"terciary darken-2"}},[i(a.h7,[i(c.Cl),i(n.Z,{staticClass:"terciary darken-1",attrs:{round:"",dark:"",disabled:t.loading.estado,loading:t.loading.estado},on:{click:function(i){return t.imprimirPDF()}}},[t._v(" "+t._s("true"==t.descarga?"Descargar PDF":"Mostrar PDF"))]),i(c.Cl)],1)],1)],1)],1)],1)},u=[],m=(e(560),e(629)),h=e(5827),x=e.n(h),p=e(1334),f=e.n(p),A=e(5714),E=e.n(A),y=e(1566),I=e.n(y),O=e(7920);I().vfs=O.pdfMake.vfs;var z={name:"analisisImprimir",components:{},data(){return{id:"",descarga:!0,firmas:{},analisis:{orden:"",muestra:"",expediente:"",titular:"",rubro:"",dir_calle:"",dir_numero:"",dir_entre:"",dir_barrio:"",telefono:"",inspector:"",fec_solicitud:"",fec_inspeccion:"",fec_resultado:"",observacion:"",tipo_analisis:"",fuente_analisis:"",conclusion:"",mesofilas:"",coliformes:"",echerihia:"",pseudomonaAeruginosa:"",color:"",olor:"",aspecto:"",ph:"",nitratos:"",nitritos:"",sulfato:"",arsenico:"",cloruros:"",dureza:"",alcalinidad:"",observacionAlimento:"",estado:!0},pdfFQ:x().dd,pdfMicro:f().dd,pdfAli:E().dd}},computed:{...(0,m.rn)(["loading"]),nombrePDF:function(){return`Bromatologia_Orden_${this.analisis.orden}.pdf`}},async created(){this.descarga=this.$route.query.descarga,this.firmas=await this.returnConfig("bromatologiaFirmas")||{izq:{matriculas:""},der:{matriculas:""}},await this.cargarAnalisis(this.$route.params.id),this.imprimirPDF()},methods:{...(0,m.OI)(["mostrarLoading","ocultarLoading","mostrarError"]),...(0,m.nv)(["requestAPI","returnConfig"]),async cargarAnalisis(t){try{this.mostrarLoading({titulo:"Cargando Analisis...",color:"primary"});let i=null;if(i=await this.requestAPI({method:"get",url:`/bromatologia/buscar/${t}`}),!i)return this.mostrarError({mensaje:"Error de carga del Analisis",titulo:"Error Analisis"});for(const t in i.data.analisis)i.data.analisis.hasOwnProperty(t)&&("fec_inspeccion"===t||"fec_resultado"===t||"fec_solicitud"===t||"fec_verificado"===t?this.analisis[t]=this.mostrarFecha(i.data.analisis[t]):"number"===typeof i.data.analisis[t]||"boolean"===typeof i.data.analisis[t]?this.analisis[t]=i.data.analisis[t].toString():this.analisis[t]=i.data.analisis[t])}catch(i){this.mostrarError({mensaje:i,titulo:"Inesperado"})}finally{this.ocultarLoading()}},modificarPdfMicro(){this.pdfMicro.watermark.text="Nro de Orden : "+this.analisis.orden,this.pdfMicro.content[8].text="PERTENECIENTE A:   "+this.analisis.titular.toUpperCase(),this.pdfMicro.content[9].columns[0].text="\nEXPEDIENTE N°:   "+this.analisis.expediente,this.pdfMicro.content[9].columns[1].text="\nACTA DE TOMA DE MUESTRA N°:   "+this.analisis.muestra,this.pdfMicro.content[10].columns[0].text="\nDOMICILIO:   "+this.analisis.direccion.toUpperCase(),this.analisis.dir_barrio?this.pdfMicro.content[10].columns[1].text="\nBARRIO:   "+this.analisis.dir_barrio.toUpperCase():this.pdfMicro.content[10].columns[1].text="\nBARRIO:   -----",this.pdfMicro.content[11].columns[0].text="\nINSPECTOR INTERVINIENTE:   "+this.analisis.inspector.toUpperCase(),this.pdfMicro.content[11].columns[1].text="\nFECHA DE TOMA DE MUESTRA:   "+this.analisis.fec_inspeccion.split("-").reverse().join("/"),this.pdfMicro.content[15].columns[0].text[0].text="MUESTRA DE "+this.analisis.fuente_analisis.toUpperCase(),this.analisis.mesofilas?this.pdfMicro.content[15].columns[1].text[1].text="\n\n"+this.analisis.mesofilas+" UFC / ml":this.pdfMicro.content[15].columns[1].text[1].text="\n\n----- UFC / ml",this.analisis.coliformes?this.analisis.coliformes<3?this.pdfMicro.content[15].columns[1].text[2].text="\n\n<3 / 100 ml":this.pdfMicro.content[15].columns[1].text[2].text="\n\n"+this.analisis.coliformes+" / 100 ml":this.pdfMicro.content[15].columns[1].text[2].text="\n\n----- / 100 ml",this.analisis.echerihia?this.pdfMicro.content[15].columns[1].text[3].text="\n\n"+this.analisis.echerihia+" / 100 ml":this.pdfMicro.content[15].columns[1].text[3].text="\n\n----- / 100 ml",this.analisis.pseudomonaAeruginosa?this.pdfMicro.content[15].columns[1].text[4].text="\n\n"+this.analisis.pseudomonaAeruginosa+" / 100 ml":this.pdfMicro.content[15].columns[1].text[4].text="\n\n----- / 100 ml",this.pdfMicro.content[21]=" "+this.analisis.conclusion,this.pdfMicro.content[23].text="Fecha de Resultado : "+this.analisis.fec_resultado.split("-").reverse().join("/"),this.pdfMicro.content[34].columns[1].text[0].text=this.firmas.izq.nombre,this.pdfMicro.content[34].columns[1].text[1].text="\n"+this.firmas.izq.titulo,this.pdfMicro.content[34].columns[1].text[2].text="\n MP: "+this.firmas.izq.matriculas.provincial+" MN: "+this.firmas.izq.matriculas.nacional,this.firmas.izq.otros?this.pdfMicro.content[34].columns[1].text[3].text="\n"+this.firmas.izq.otros:this.pdfMicro.content[34].columns[1].text[3].text="",this.pdfMicro.content[34].columns[3].text[0].text=this.firmas.der.nombre,this.pdfMicro.content[34].columns[3].text[1].text="\n"+this.firmas.der.titulo,this.pdfMicro.content[34].columns[3].text[2].text="\n MP: "+this.firmas.der.matriculas.provincial+" MN: "+this.firmas.der.matriculas.nacional,this.firmas.der.otros?this.pdfMicro.content[34].columns[3].text[3].text="\n"+this.firmas.der.otros:this.pdfMicro.content[34].columns[3].text[3].text=""},modificarPdfFQ(){this.pdfFQ.watermark.text="Nro de Orden : "+this.analisis.orden,this.pdfFQ.content[6].text="PERTENECIENTE A:   "+this.analisis.titular.toUpperCase(),this.pdfFQ.content[7].columns[0].text="\nEXPEDIENTE N°:   "+this.analisis.expediente,this.pdfFQ.content[7].columns[1].text="\nACTA DE TOMA DE MUESTRA N°:   "+this.analisis.muestra,this.pdfFQ.content[8].columns[0].text="\nDOMICILIO:   "+this.analisis.direccion.toUpperCase(),this.analisis.dir_barrio?this.pdfFQ.content[8].columns[1].text="\nBARRIO:   "+this.analisis.dir_barrio.toUpperCase():this.pdfFQ.content[8].columns[1].text="\nBARRIO:   -----",this.pdfFQ.content[9].columns[0].text="\nINSPECTOR INTERVINIENTE:   "+this.analisis.inspector.toUpperCase(),this.pdfFQ.content[9].columns[1].text="\nFECHA DE TOMA DE MUESTRA:   "+this.analisis.fec_inspeccion.split("-").reverse().join("/");let t=[{text:"MUESTRA DE "+this.analisis.fuente_analisis.toUpperCase(),style:["subtitulo"]}],i=[{text:"VALOR ESPERADO CAA",bold:!0}];this.analisis.color&&(t.push({text:"\n\nColor: "+this.analisis.color,style:["izquierda"]}),i.push({text:"\n\n",style:["izquierda"]})),this.analisis.olor&&(t.push({text:"\n\nOlor: "+this.analisis.olor,style:["izquierda"]}),i.push({text:"\n\n",style:["izquierda"]})),this.analisis.aspecto&&(t.push({text:"\n\nAspecto: "+this.analisis.aspecto,style:["izquierda"]}),i.push({text:"\n\n",style:["izquierda"]})),this.analisis.ph&&(t.push({text:"\n\npH: "+this.analisis.ph,style:["izquierda"]}),i.push({text:"\n\n(6.5 - 7.5)",style:["izquierda"]})),this.analisis.nitratos&&(t.push({text:"\n\nNITRATOS: "+this.analisis.nitratos+" mg/l",style:["izquierda"]}),i.push({text:"\n\n(hasta 45 mg/l)",style:["izquierda"]})),this.analisis.nitritos&&(t.push({text:"\n\nNITRITOS: "+this.analisis.nitritos+" mg/l",style:["izquierda"]}),i.push({text:"\n\n(hasta 0.1 mg/l)",style:["izquierda"]})),this.analisis.sulfato&&(t.push({text:"\n\nSULFATOS: "+this.analisis.sulfato+" mg/l",style:["izquierda"]}),i.push({text:"\n\n(hasta 400 mg/l)",style:["izquierda"]})),this.analisis.arsenico&&(t.push({text:"\n\nARSÉNICO: "+this.analisis.arsenico+" mg/l",style:["izquierda"]}),i.push({text:"\n\n(hasta 0.01 mg/l)",style:["izquierda"]})),this.analisis.cloruros&&(t.push({text:"\n\nCLORUROS: "+this.analisis.cloruros+" mg/l",style:["izquierda"]}),i.push({text:"\n\n(hasta 250 mg/l)",style:["izquierda"]})),this.analisis.dureza&&(t.push({text:"\n\nDUREZA: "+this.analisis.dureza+" mg CaCO",style:["izquierda"]}),t.push({text:"3 ",fontSize:6,style:["izquierda"]}),t.push({text:"/l",style:["izquierda"]}),i.push({text:"\n\n(hasta 400 mg CaCO",style:["izquierda"]}),i.push({text:"3 ",fontSize:6,style:["izquierda"]}),i.push({text:"/l)",style:["izquierda"]})),this.analisis.alcalinidad&&(t.push({text:"\n\nALCALINIDAD: "+this.analisis.alcalinidad+" mg CaCO",style:["izquierda"]}),t.push({text:"3 ",fontSize:6,style:["izquierda"]}),t.push({text:"/l",style:["izquierda"]}),i.push({text:"\n\n(hasta 400 mg CaCO",style:["izquierda"]}),i.push({text:"3 ",fontSize:6,style:["izquierda"]}),i.push({text:"/l)",style:["izquierda"]})),this.pdfFQ.content[11].columns[0].text=t,this.pdfFQ.content[11].columns[1].text=i,this.pdfFQ.content[15]=" "+this.analisis.conclusion,this.pdfFQ.content[17].text="Fecha de Resultado : "+this.analisis.fec_resultado.split("-").reverse().join("/"),this.pdfFQ.content[23].columns[1].text[0].text=this.firmas.izq.nombre,this.pdfFQ.content[23].columns[1].text[1].text="\n"+this.firmas.izq.titulo,this.pdfFQ.content[23].columns[1].text[2].text="\n MP: "+this.firmas.izq.matriculas.provincial+" MN: "+this.firmas.izq.matriculas.nacional,this.firmas.izq.otros?this.pdfFQ.content[23].columns[1].text[3].text="\n"+this.firmas.izq.otros:this.pdfFQ.content[23].columns[1].text[3].text="",this.pdfFQ.content[23].columns[3].text[0].text=this.firmas.der.nombre,this.pdfFQ.content[23].columns[3].text[1].text="\n"+this.firmas.der.titulo,this.pdfFQ.content[23].columns[3].text[2].text="\n MP: "+this.firmas.der.matriculas.provincial+" MN: "+this.firmas.der.matriculas.nacional,this.firmas.der.otros?this.pdfFQ.content[23].columns[3].text[3].text="\n"+this.firmas.der.otros:this.pdfFQ.content[23].columns[3].text[3].text=""},modificarPdfAli(){this.pdfAli.watermark.text="Nro de Orden : "+this.analisis.orden,this.pdfAli.content[8].text="PERTENECIENTE A:   "+this.analisis.titular.toUpperCase(),this.pdfAli.content[9].columns[0].text="\nEXPEDIENTE N°:   "+this.analisis.expediente,this.pdfAli.content[9].columns[1].text="\nACTA DE TOMA DE MUESTRA N°:   "+this.analisis.muestra,this.pdfAli.content[10].columns[0].text="\nDOMICILIO:   "+this.analisis.direccion.toUpperCase(),this.analisis.dir_barrio?this.pdfAli.content[10].columns[1].text="\nBARRIO:   "+this.analisis.dir_barrio.toUpperCase():this.pdfAli.content[10].columns[1].text="\nBARRIO:   -----",this.pdfAli.content[11].columns[0].text="\nINSPECTOR INTERVINIENTE:   "+this.analisis.inspector.toUpperCase(),this.pdfAli.content[11].columns[1].text="\nFECHA DE TOMA DE MUESTRA:   "+this.analisis.fec_inspeccion.split("-").reverse().join("/"),this.pdfAli.content[16].text="\n "+this.analisis.observacionAlimento,this.pdfAli.content[23]=" "+this.analisis.conclusion,this.pdfAli.content[25].text="Fecha de Resultado : "+this.analisis.fec_resultado.split("-").reverse().join("/"),this.pdfAli.content[36].columns[1].text[0].text=this.firmas.izq.nombre,this.pdfAli.content[36].columns[1].text[1].text="\n"+this.firmas.izq.titulo,this.pdfAli.content[36].columns[1].text[2].text="\n MP: "+this.firmas.izq.matriculas.provincial+" MN: "+this.firmas.izq.matriculas.nacional,this.firmas.izq.otros?this.pdfAli.content[36].columns[1].text[3].text="\n"+this.firmas.izq.otros:this.pdfAli.content[36].columns[1].text[3].text="",this.pdfAli.content[36].columns[3].text[0].text=this.firmas.der.nombre,this.pdfAli.content[36].columns[3].text[1].text="\n"+this.firmas.der.titulo,this.pdfAli.content[36].columns[3].text[2].text="\n MP: "+this.firmas.der.matriculas.provincial+" MN: "+this.firmas.der.matriculas.nacional,this.firmas.der.otros?this.pdfAli.content[36].columns[3].text[3].text="\n"+this.firmas.der.otros:this.pdfAli.content[36].columns[3].text[3].text=""},imprimirPDF(){let t={content:["ERROR DE CONEXÍON CON EL SERVIDOR, INTENTELO MÁS TARDE..."]};"Bacteriologico"===this.analisis.tipo_analisis&&(this.modificarPdfMicro(),t=this.pdfMicro),"Fisico-Quimico"===this.analisis.tipo_analisis&&(this.modificarPdfFQ(),t=this.pdfFQ),"Alimento"===this.analisis.tipo_analisis&&(this.modificarPdfAli(),t=this.pdfAli),navigator.userAgent.indexOf("Edge")>=0||"true"==this.descarga?(I().createPdf(t).download(this.nombrePDF,(function(){alert("Comenzará su Descarga")})),setTimeout((()=>{window.close()}),1e3)):I().createPdf(t).open({},window)}}},R=z,N=e(1001),g=(0,N.Z)(R,d,u,!1,null,null,null),C=g.exports},5714:function(t){let i={muestra:"muestra",expediente:"expediente",titular:"titular",direccion:"dir_calle COMPLETA",dir_barrio:"dir_barrio",inspector:"inspector",fec_inspeccion:"alOtroDia",fec_resultado:"cuandoTerminamos",tipo_analisis:"Tipo de analisis",conclusion:"aca va a ir la conclusion",observacionAlimento:"hola \nTEST\nDe espacios."},e={izq:{nombre:"nombreIzq",titulo:"TituloIzq",matriculas:{provincial:"PMizq",nacional:"MNizq"},otros:"otrosIzq"},der:{nombre:"nombreDer",titulo:"TituloDer",matriculas:{provincial:"PMder",nacional:"MNder"},otros:"otrosDer"}};var n={info:{title:"ANÁLISIS DE ALIMENTO",author:"LABORATORIO BROMATOLÓGICO"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,20,30,30],images:{muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`},watermark:{text:"Nro de Orden : 2020-123456",color:"black",opacity:.3,bold:!0,fontSize:75,angle:55},header:function(t,i){return[{text:" Página "+t+" de "+i}]},content:[{columns:[{width:"*",text:[{text:"SUBSECRETARÍA DE PLANIFICACIÓN ASISTENCIAL Y SANITARIA",style:["cabecera"]},{text:"\nDIRECCIÓN GENERAL DE PREVENCIÓN Y CONTROL DE ENFERMEDADES TRANSMISIBLES",style:["cabecera"]},{text:"\nPROGRAMA DE CONTROL SANITARIO Y LABORATORIO BROMATOLÓGICO",style:["cabecera"]}]},{width:"32",table:{body:[["",{width:"32",height:32,image:"muni_logo_name"}]]},layout:"noBorders"}]},"\n","\n","\n",{text:"ANÁLISIS DE ALIMENTO",style:["titulo"]},"\n","\n","\n",{text:"PERTENECIENTE A:   "+i.titular,style:["izquierda"]},{columns:[{width:"auto",text:"\nEXPEDIENTE N°:   "+i.expediente,style:["izquierda"]},{width:"*",text:"\nACTA DE TOMA DE MUESTRA N°:   "+i.muestra,style:["derecha"]}],columnGap:8},{columns:[{width:"auto",text:"\nDOMICILIO:   "+i.direccion,style:["izquierda"]},{width:"*",text:"\nBARRIO:   "+i.dir_barrio,style:["derecha"]}],columnGap:8},{columns:[{width:"auto",text:"\nINSPECTOR INTERVINIENTE:   "+i.inspector,style:["izquierda"]},{width:"*",text:"\nFec_inspeccion:   "+i.fec_inspeccion,style:["derecha"]}],columnGap:8},"\n",{table:{widths:["*"],body:[[" "],[" "]]},layout:{hLineWidth:function(t,i){return 0===t||t===i.table.body.length?0:2},vLineWidth:function(t,i){return 0}}},"\n",{text:"Observacion del Alimento",style:["subtitulo"]},{text:"\n "+i.observacionAlimento},{columns:[{width:"*",text:[{text:"SUBSECRETARÍA DE PLANIFICACIÓN ASISTENCIAL Y SANITARIA",style:["cabecera"]},{text:"\nDIRECCIÓN GENERAL DE PREVENCIÓN Y CONTROL DE ENFERMEDADES TRANSMISIBLES",style:["cabecera"]},{text:"\nPROGRAMA DE CONTROL SANITARIO Y LABORATORIO BROMATOLÓGICO",style:["cabecera"]}]},{width:"32",table:{body:[["",{width:"32",height:32,image:"muni_logo_name"}]]},layout:"noBorders"}],pageBreak:"before"},"\n","\n","\n",{text:"CONCLUSIONES",style:["subtitulo"]},"\n"," "+i.conclusion,"\n",{text:"Fecha de Resultado : "+i.fec_resultado,bold:!0},"\n","\n","\n","\n","\n","\n","\n","\n","\n","\n",{columns:[{width:20,text:[{text:"",style:["centrado"]}]},{width:"*",text:[{text:e.izq.nombre,style:["firmas"]},{text:"\n"+e.izq.titulo,style:["firmas"]},{text:"\n MP: "+e.izq.matriculas.provincial+" MN: "+e.izq.matriculas.nacional,style:["firmas"]},{text:"\n"+e.izq.otros,style:["firmas"]}]},{width:110,text:[{text:"",style:["centrado"]}]},{width:"*",text:[{text:e.der.nombre,style:["firmas"]},{text:"\n"+e.der.titulo,style:["firmas"]},{text:"\n MP: "+e.der.matriculas.provincial+" MN: "+e.izq.matriculas.nacional,style:["firmas"]},{text:"\n"+e.der.otros,style:["firmas"]}]},{width:20,text:[{text:"",style:["centrado"]}]}],columnGap:8}],footer:{text:[{text:"LABORATORIO BROMATOLÓGICO - GRAHAM BELL 2478, TE 0237-4685643",style:["pie"]}],margin:[30,10]},defaultStyle:{fontSize:11},styles:{cabecera:{fontSize:10,alignment:"right"},titulo:{fontSize:16,bold:!0,decoration:"underline",alignment:"center"},subtitulo:{fontSize:11,bold:!0,decoration:"underline",alignment:"left"},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},cursiva:{italics:!0},firmas:{fontSize:10,alignment:"center"},pie:{fontSize:10,bold:!0,decoration:"underline",alignment:"right"}}};t.exports={dd:n}},5827:function(t){let i={muestra:"muestra",expediente:"expediente",titular:"titular",direccion:"dir_calle COMPLETA",dir_barrio:"dir_barrio",inspector:"inspector",fec_inspeccion:"alOtroDia",fec_resultado:"cuandoTerminamos",tipo_analisis:"Tipo de analisis",conclusion:"conclusion",color:"color",olor:"olor",aspecto:"aspecto",ph:"ph",nitratos:"nitratos",nitritos:"nitritos(opcional)",sulfato:"sulfato",arsenico:"arsenico",cloruros:"cloruros",dureza:"dureza",alcalinidad:"alcalinidad"},e={izq:{nombre:"nombreIzq",titulo:"TituloIzq",matriculas:{provincial:"PMizq",nacional:"MNizq"},otros:"otrosIzq"},der:{nombre:"nombreDer",titulo:"TituloDer",matriculas:{provincial:"PMder",nacional:"MNder"},otros:"otrosDer"}};var n={info:{title:"ANÁLISIS FISICOQUÍMICO",author:"LABORATORIO BROMATOLÓGICO"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,20,30,30],watermark:{text:"Nro de Orden : 2020-123456",color:"black",opacity:.3,bold:!0,fontSize:75,angle:55},images:{muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`},header:function(t,i){return[{text:" Página "+t+" de "+i}]},content:[{columns:[{width:"*",text:[{text:"SUBSECRETARÍA DE PLANIFICACIÓN ASISTENCIAL Y SANITARIA",style:["cabecera"]},{text:"\nDIRECCIÓN GENERAL DE PREVENCIÓN Y CONTROL DE ENFERMEDADES TRANSMISIBLES",style:["cabecera"]},{text:"\nPROGRAMA DE CONTROL SANITARIO Y LABORATORIO BROMATOLÓGICO",style:["cabecera"]}]},{width:"32",table:{body:[["",{width:"32",height:32,image:"muni_logo_name"}]]},layout:"noBorders"}]},"\n","\n",{text:"ANÁLISIS FISICOQUÍMICO DE AGUA",style:["titulo"]},"\n","\n",{text:"PERTENECIENTE A:   "+i.titular,style:["izquierda"]},{columns:[{width:"auto",text:"\nEXPEDIENTE N°:   "+i.expediente,style:["izquierda"]},{width:"*",text:"\nACTA DE TOMA DE MUESTRA N°:   "+i.muestra,style:["derecha"]}],columnGap:8},{columns:[{width:"auto",text:"\nDOMICILIO:   "+i.direccion,style:["izquierda"]},{width:"*",text:"\nBARRIO:   "+i.dir_barrio,style:["derecha"]}],columnGap:8},{columns:[{width:"auto",text:"\nINSPECTOR INTERVINIENTE:   "+i.inspector,style:["izquierda"]},{width:"*",text:"\nFec_inspeccion:   "+i.fec_inspeccion,style:["derecha"]}],columnGap:8},{table:{widths:["*"],body:[[" "],[" "]]},layout:{hLineWidth:function(t,i){return 0===t||t===i.table.body.length?0:2},vLineWidth:function(t,i){return 0}}},{columns:[{width:"*",text:[{text:"MUESTRA DE "+i.fuente_analisis,style:["subtitulo"]},{text:"\n\nColor: "+i.color,style:["izquierda"]},{text:"\n\nOlor: "+i.olor,style:["izquierda"]},{text:"\n\nAspecto: "+i.aspecto,style:["izquierda"]},{text:"\n\npH: "+i.ph,style:["izquierda"]},{text:"\n\nNITRATOS: "+i.nitratos+" mg/l",style:["izquierda"]},{text:"\n\nNITRITOS: "+i.nitritos+" mg/l",style:["izquierda"]},{text:"\n\nSULFATOS: "+i.sulfato+" mg/l",style:["izquierda"]},{text:"\n\nARSÉNICO: "+i.arsenico+" mg/l",style:["izquierda"]},{text:"\n\nCLORUROS: "+i.cloruros+" mg/l",style:["izquierda"]},{text:"\n\nDUREZA: "+i.dureza+" mg CaCO",style:["izquierda"]},{text:"3 ",fontSize:6,style:["izquierda"]},{text:"/l",style:["izquierda"]},{text:"\n\nALCALINIDAD: "+i.alcalinidad+" mg CaCO",style:["izquierda"]},{text:"3 ",fontSize:6,style:["izquierda"]},{text:"/l",style:["izquierda"]}]},{width:"*",text:[{text:"VALOR ESPERADO CAA",bold:!0},{text:"\n\n",style:["izquierda"]},{text:"\n\n",style:["izquierda"]},{text:"\n\n",style:["izquierda"]},{text:"\n\n(6.5 - 7.5)",style:["izquierda"]},{text:"\n\n(hasta 45 mg/l)",style:["izquierda"]},{text:"\n\n(hasta 0.1 mg/l)",style:["izquierda"]},{text:"\n\n(hasta 400 mg/l)",style:["izquierda"]},{text:"\n\n(hasta 0.01 mg/l)",style:["izquierda"]},{text:"\n\n(hasta 250 mg/l)",style:["izquierda"]},{text:"\n\n(hasta 400 mg CaCO",style:["izquierda"]},{text:"3 ",fontSize:6,style:["izquierda"]},{text:"/l)",style:["izquierda"]},{text:"\n\n(hasta 400 mg CaCO",style:["izquierda"]},{text:"3 ",fontSize:6,style:["izquierda"]},{text:"/l)",style:["izquierda"]}]}],columnGap:8},{table:{widths:["*"],body:[[" "],[" "]]},layout:{hLineWidth:function(t,i){return 0===t||t===i.table.body.length?0:2},vLineWidth:function(t,i){return 0}}},{text:"CONCLUSIONES",style:["subtitulo"]},"\n"," "+i.conclusion,"\n",{text:"Fecha de Resultado : "+i.fec_resultado,bold:!0},"\n","\n","\n","\n","\n",{columns:[{width:20,text:[{text:"",style:["centrado"]}]},{width:"*",text:[{text:e.izq.nombre,style:["firmas"]},{text:"\n"+e.izq.titulo,style:["firmas"]},{text:"\n MP: "+e.izq.matriculas.provincial+" MN: "+e.izq.matriculas.nacional,style:["firmas"]},{text:"\n"+e.izq.otros,style:["firmas"]}]},{width:110,text:[{text:"",style:["centrado"]}]},{width:"*",text:[{text:e.der.nombre,style:["firmas"]},{text:"\n"+e.der.titulo,style:["firmas"]},{text:"\n MP: "+e.der.matriculas.provincial+" MN: "+e.izq.matriculas.nacional,style:["firmas"]},{text:"\n"+e.der.otros,style:["firmas"]}]},{width:20,text:[{text:"",style:["centrado"]}]}],columnGap:8}],footer:{text:[{text:"LABORATORIO BROMATOLÓGICO - GRAHAM BELL 2478, TE 0237-4685643",style:["pie"]}],margin:[30,10]},defaultStyle:{fontSize:10.75},styles:{cabecera:{fontSize:10,alignment:"right"},titulo:{fontSize:16,bold:!0,decoration:"underline",alignment:"center"},subtitulo:{fontSize:11,bold:!0,decoration:"underline",alignment:"left"},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},cursiva:{italics:!0},firmas:{fontSize:10,alignment:"center"},pie:{fontSize:10,bold:!0,decoration:"underline",alignment:"right"}}};t.exports={dd:n}},1334:function(t){let i={muestra:"muestra",expediente:"expediente",titular:"titular",direccion:"dir_calle COMPLETA",dir_barrio:"dir_barrio",inspector:"inspector",fec_inspeccion:"alOtroDia",fec_resultado:"cuandoTerminamos",tipo_analisis:"Tipo de analisis",conclusion:"aca va a ir la conclusion",fuente_analisis:"",mesofilas:"mes111",coliformes:"col222",echerihia:"esch333",pseudomonaAeruginosa:"pse444"},e={izq:{nombre:"nombreIzq",titulo:"TituloIzq",matriculas:{provincial:"PMizq",nacional:"MNizq"},otros:"otrosIzq"},der:{nombre:"nombreDer",titulo:"TituloDer",matriculas:{provincial:"PMder",nacional:"MNder"},otros:"otrosDer"}};var n={info:{title:"ANÁLISIS BACTERIOLÓGICO DE AGUA",author:"LABORATORIO BROMATOLÓGICO"},pageSize:"A4",pageOrientation:"portrait",pageMargins:[30,20,30,30],images:{muni_logo_name:`${window.location.origin}/static/img/logo-64x74.png`},watermark:{text:"Nro de Orden : 2020-123456",color:"black",opacity:.3,bold:!0,fontSize:75,angle:55},header:function(t,i){return[{text:" Página "+t+" de "+i}]},content:[{columns:[{width:"*",text:[{text:"SUBSECRETARÍA DE PLANIFICACIÓN ASISTENCIAL Y SANITARIA",style:["cabecera"]},{text:"\nDIRECCIÓN GENERAL DE PREVENCIÓN Y CONTROL DE ENFERMEDADES TRANSMISIBLES",style:["cabecera"]},{text:"\nPROGRAMA DE CONTROL SANITARIO Y LABORATORIO BROMATOLÓGICO",style:["cabecera"]}]},{width:"32",table:{body:[["",{width:"32",height:32,image:"muni_logo_name"}]]},layout:"noBorders"}]},"\n","\n","\n",{text:"ANÁLISIS BACTERIOLÓGICO DE AGUA",style:["titulo"]},"\n","\n","\n",{text:"PERTENECIENTE A:   "+i.titular,style:["izquierda"]},{columns:[{width:"auto",text:"\nEXPEDIENTE N°:   "+i.expediente,style:["izquierda"]},{width:"*",text:"\nACTA DE TOMA DE MUESTRA N°:   "+i.muestra,style:["derecha"]}],columnGap:8},{columns:[{width:"auto",text:"\nDOMICILIO:   "+i.direccion,style:["izquierda"]},{width:"*",text:"\nBARRIO:   "+i.dir_barrio,style:["derecha"]}],columnGap:8},{columns:[{width:"auto",text:"\nINSPECTOR INTERVINIENTE:   "+i.inspector,style:["izquierda"]},{width:"*",text:"\nFec_inspeccion:   "+i.fec_inspeccion,style:["derecha"]}],columnGap:8},"\n",{table:{widths:["*"],body:[[" "],[" "]]},layout:{hLineWidth:function(t,i){return 0===t||t===i.table.body.length?0:2},vLineWidth:function(t,i){return 0}}},"\n",{columns:[{width:"*",text:[{text:"MUESTRA DE TANQUE",style:["subtitulo"]},{text:"\n\nBACTERIAS MESOFILAS EN AGAR",style:["izquierda"]},{text:"\n\nBACTERIAS COLIFORMES (NMP -37°C;48h-)",style:["izquierda"]},{text:"\n\nEscherichia coli",style:["izquierda","cursiva"]},{text:"\n\nPseudomona aeruginosa",style:["izquierda","cursiva"]}]},{width:120,text:[{text:" "},{text:"\n\n"+i.mesofilas+" UFC / ml",style:["centrado"]},{text:"\n\n"+i.coliformes+" / 100 ml",style:["centrado"]},{text:"\n\n"+i.echerihia+" / 100 ml",style:["centrado"]},{text:"\n\n"+i.pseudomonaAeruginosa+" / 100 ml",style:["centrado"]}]},{width:"auto",text:[{text:"VALOR ESPERADO CAA",bold:!0},{text:"\n\n< 500 UFC / ml",style:["derecha"]},{text:"\n\n< 3 / 100 ml",style:["derecha"]},{text:"\n\nAusencia / 100 ml",style:["derecha"]},{text:"\n\nAusencia / 100 ml",style:["derecha"]}]}],columnGap:8},"\n",{table:{widths:["*"],body:[[" "],[" "]]},layout:{hLineWidth:function(t,i){return 0===t||t===i.table.body.length?0:2},vLineWidth:function(t,i){return 0}}},"\n",{text:"CONCLUSIONES",style:["subtitulo"]},"\n"," "+i.conclusion,"\n",{text:"Fecha de Resultado : "+i.fec_resultado,bold:!0},"\n","\n","\n","\n","\n","\n","\n","\n","\n","\n",{columns:[{width:20,text:[{text:"",style:["centrado"]}]},{width:"*",text:[{text:e.izq.nombre,style:["firmas"]},{text:"\n"+e.izq.titulo,style:["firmas"]},{text:"\n MP: "+e.izq.matriculas.provincial+" MN: "+e.izq.matriculas.nacional,style:["firmas"]},{text:"\n"+e.izq.otros,style:["firmas"]}]},{width:110,text:[{text:"",style:["centrado"]}]},{width:"*",text:[{text:e.der.nombre,style:["firmas"]},{text:"\n"+e.der.titulo,style:["firmas"]},{text:"\n MP: "+e.der.matriculas.provincial+" MN: "+e.izq.matriculas.nacional,style:["firmas"]},{text:"\n"+e.der.otros,style:["firmas"]}]},{width:20,text:[{text:"",style:["centrado"]}]}],columnGap:8}],footer:{text:[{text:"LABORATORIO BROMATOLÓGICO - GRAHAM BELL 2478, TE 0237-4685643",style:["pie"]}],margin:[30,10]},defaultStyle:{fontSize:11},styles:{cabecera:{fontSize:10,alignment:"right"},titulo:{fontSize:16,bold:!0,decoration:"underline",alignment:"center"},subtitulo:{fontSize:11,bold:!0,decoration:"underline",alignment:"left"},izquierda:{alignment:"left"},derecha:{alignment:"right"},centrado:{alignment:"center"},cursiva:{italics:!0},firmas:{fontSize:10,alignment:"center"},pie:{fontSize:10,bold:!0,decoration:"underline",alignment:"right"}}};t.exports={dd:n}}}]);