# ToDo (Para Hacer)

<br />

> [!NOTE]
> El orden de las tareas puede cambiar.
> Este archivo se actualiza cuando se actualiza el servidor.
> Por lo tanto pueden haber tareas ya desarrolladas que no se implementaron en el servidor aun.

## Known Issues (Problemas Conocidos)

<br />

- [ ] Excels descargados - El Formato y la extension del archivo no coinciden (.xls), abrir de todos modos. (charset.. UTF-8 problemas Ñ con office).
  - Info-CSV -> [vue-json-csv](https://github.com/Belphemur/vue-json-csv), [converting-json-to-csv](https://stackoverflow.com/questions/58271762/converting-json-to-csv-in-special-format-with-help-of-vue-or-js), [create-and-save-a-file-with-javascript](https://stackoverflow.com/questions/13405129/create-and-save-a-file-with-javascript).
    **Solucion Temporaria:** [Video en Youtube](https://www.youtube.com/watch?v=fz8Foga0InM&list=PLqJxYXwAoKrQQB5dS2-LnIEUYpeswAmIq&index=9).
  - **VER ANALIZAR Y DECIDIR**
    BACK -> rutas para csv / pdf / json.
    FRONT -> rutas para csv / pdf / json.
    ver https://stackoverflow.com/questions/23301467/javascript-exporting-large-text-csv-file-crashes-google-chrome
    ver https://docs.sheetjs.com/docs/solutions/output/
    ‼️ SHEET https://docs.sheetjs.com/docs/
- [ ] Dialogs - No se Cierran cuando caduca sesion o cuando se navega con "atras"/"adelante".
- [x] Home - Google Map Rechaza la conexion, APIKEY algun dia cobrara por consultas... requiere tarjeta de credito.
  - Capaturar Imagen de Localizacion y redireccionar a Google...
- [ ] Farmacia - Ingresos con muchas cargas, puede colgar el navegador (RAM).
  - Generar con lazy load para que no tarde en renderizar.. Requiere update de Vuetify..

---

<!-- TEMPORAL EJEMPLOS

- BACK
  1. [ ] Mercury
  1. [x] ‼️ Venus
  1. [ ] Earth (Orbit/Moon)
         +some item
         +another item
  1. [ ] Mars
- FRONT
  - [x] Saturn
        +some item
  - [x] Uranus
  - [ ] ‼️ Neptune
        +some item
  - [ ] Peruptuno
  - [x] Garlandia -->

<!-- #### Enviroment (Entorno)

---

|         |    SERVER    | OFFICE  |  HOME   |
| :------ | :----------: | :-----: | :-----: |
| S.O.    | Ubuntu 20.04 |  W 10   |  W 10   |
| Node    |   20.17.0    | 20.17.0 | 20.17.0 |
| NPM     |    10.8.3    | 10.8.3  | 10.8.3  |
| MongoDB |    5.0.28    | 5.0.28  | 5.0.28  |
| Nginx   |              |         |         |
| NVM     |              |         |         |
| DOCKERS |              |         |         |

##### Cheat

```bat
# Go into the repository
$ npm update / npm update --legacy-peer-deps
$ npm install -g npm@10.8.3
$ npx update-browserslist-db@latest

$ npm install -g @vue/cli

# Get list of global package installed
$ npm list -g --depth 0
```

---

```js
// Consulta la cantidad de Entregas de Medicamentos segun la Hora Durante el 2024
db.getCollection("InsumoEntregas").aggregate([
  {$match: {retirado: {$gte: new Date(2024, 1, 1), $lt: new Date(2025, 1, 1)}}},
  {
    $group: {
      _id: {$hour: "$retirado"},
      cargas: {$sum: 1},
    },
  },
  {
    $project: {
      _id: 0,
      hora_UTC: "$_id",
      hora_local: {$add: ["$_id", -3]},
      cargas: 1,
    },
  },
  {
    $sort: {
      hora_UTC: 1,
    },
  },
]);

// Consulta para correcion de Aplicaciones de Vacunas con fechas de Aplicacion improbables.
db.getCollection('VacunaAplicaciones').find({
  ps_id : {$exists: true},
  $or : [
    {fecha: {$gte: new Date()}},
    {fecha: {$lte: ISODate("1900-01-01T00:00:00.000Z")}},
  ]
},
{
  fecha_aplicacion: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" }},
  fecha_nacimiento: { $dateToString: { format: "%Y-%m-%d", date: "$ps_fecha_nacimiento" }},
  tipo_doc: "$tipo_doc",
  documento: "$documento",
  apelido_nombre: "$ps_nombreC",
  _id:0
})
.sort({fecha:-1, fecha_nacimiento:-1, _id:1})

// Consulta para correcion de Pacientes con fechas de Nacimiento improbables.
db.getCollection('pacientes').find({
  $or : [
    {fec_nac: {$gte: new Date().toISOString().substr(0,10)}},
    {fec_nac: {$lte: "1900-01-01"}}
  ]
},
{
  fecha_nacimiento: "$fec_nac",
  tipo_doc: "$tipo_doc",
  documento: "$documento",
  apellido: "$apellido",
  nombre: "$nombre",
  documento_responsable: "$doc_responsable",
  _id:0
})
.sort({fecha:-1, fecha_nacimiento:-1, _id:1})

// Exportar desde Robo3T agregar a las consultas "toArray" y cambiar vista para copiar como json.
.toArray()
``` -->

### En Progreso - W.I.P. (Work in Progress)

- [ ] Actualizar - MongoDB => 5.0 -> 6.0 -> [Compatibility](https://www.mongodb.com/docs/v6.0/release-notes/6.0-compatibility/)

- [ ] Actualizar - Vue-Cli => Vue-Cli -> Vite -> [Migrate](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)

- [ ] ‼️ Vacunas - Aplicaciones => Detallado y No Detallado (como Entregas de Farmacias) en formatos -> PDF / csv (Excel).
- [ ] ‼️ Vacunas - Aplicaciones -> SCRIPT LINKEAR APLICACIONES
      SIN-> paciente (PACIENTE ID) y documento,
      CON-> ps_paciente(id), doc_responsable.
      db.getCollection('VacunaAplicaciones').find({paciente:{$exists:0},documento:{$exists:0},ps_paciente:{$exists:1},doc_responsable:{$exists:1}}) -> buscar con ps_paciente en Pacientes ps_id -> si existe actualizar Aplicacion.
      each -> find and save

- [~] Farmacia - Reportes -> Insumos seleccionados en filtro, si no hay mostrar con stock 0 (al momento si no hay y esta en el filtro no lo muestra). FALTA GENERAL DETALLADO Y STOCK (USAR EL IF PARA NO CARGAR TOOOODOS LOS INSUMOS CUANDO NO SE SELECCIONAN)
- [ ] Farmacia/Vacunas -> Unificar Filtros en (Back! y Front?)
- [ ] Farmacia/Vacunas -> Mostrar filtros utilizados para los reportes, areaName/insumoName/Procedencia.

- [ ] Farmacia/Vacunas - BUSCAR POR LOTE, en todos los buscadores | filtros.

- [ ] Farmacia/Vacunas - BUSCAR TODO TIPO DE MOVIMIENTO POR LOTE. CONTROL CENTRAL.

- [ ] Farmacia - Permisos -> Supervisores por area.

- [ ] Sistema -> Notificar al Loguear si hay algun Mantenimiento Programado [1 semana](Dialog Informativo con fecha-hora).

- [ ] Sistema - Date -> Input Date Range Select -> con la posibilidad de seleccionar años... o mes actual... o mes anterior...

- [ ] Municipio - Nombre de dominio para SiGiSeSaM.

### En Progreso Secundario

- BACK
  1. [ ] Revisar y borrar lodash => \_pick , \_merge.
  1. [ ] ‼️ Independizar y crear script para generar los ssl certificated for ip intranet.
         [SSL LOCAL](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/)
         [generate-a-self-signed-SSL](https://stackoverflow.com/questions/10175812/how-to-generate-a-self-signed-ssl-certificate-using-openssl?answertab=trending#tab-top)
         [How SSL LOCAL](https://www.section.io/engineering-education/how-to-get-ssl-https-for-localhost/)
- FRONT
  1. [ ] Revisar y borrar lodash => get , merge, clonedeep -> structuredClone({... , ...}).
  1. [~] Revisar => v-tooltip -> close-delay="0".
  1. [~] Revisar => Dialogs -> Aggregar Draggeable donde corresponda.
  1. [~] Revisar => Dialogs -> Draggable/Resize Windows.

### Vacunas

1. [x] Agregar Permisos a Vacunas => Aplicacion Vacunas. (como Entregas)
       usuario, navegacion, pagina de Aplicaciones.
       Permisos para crear/editar Pacientes.

2. [x] Crear Modelo Vacunas => Aplicacion Vacunas. (como Entregas)
       +Datos Paciente Estadistica
       +Dosis
       +Estrategia

3. [x] Crear Rutas Vacunas => Aplicacion Vacunas. (como Entregas)
4. [x] Vacunas Insumos con Categoria Vacunas =>
       Dosis => Unica, Neonatal, 1era, 2da, 3era, 4ta, 5ta, 6ta, 7ma, Refuerzo, 2do Refuerzo, 3er Refuerzo. (Segun Vacuna al crear el Insumo)
       Condiciones => NO Aplicable? NO se debe aplicar a embarazadas / puerperas / grupoRiesgo. (Segun Vacuna al crear el Insumo)
       Estrategia => Calendario, Campaña, Contactos, Terreno, Internacion, Pre Exposicion, Post Exposicion. (General)

5. [x] Agregar Pagina Vacunas => Aplicacion Vacunas. (como Entregas)
       Busqueda, Nuevo Dialog.

6. [x] Agregar a Hiclem,
       Embarazada (semanas) => puerpera: Boolean (Excluyentes).
       prematuro: Boolean.
       peso_nacer_menor_2500: Boolean.
       peso_nacer_mayor_3800: Boolean.
       zona_sanitaria.
       riesgo: Boolean.
       personal_salud: Boolean.
       personal_esencial: Boolean.

7. [x] PDF vacunas como entregas nominal.

8. [x] Migrar PSVACUNAS... uploads excel, unificar Pacientes,

9. [x] Vacunas -> No_Provista <=> Vacuna aplicada ¿por la institucion? pero el insumo traido por el paciente (sin fecha de retirar),
       Permitir Vacunar sin Vacuna (sin descontar de Stock) para actualizar carne vacunatorio,
       Ver tema Origen de donde se carga, y vacunadorName (Instituto)

10. [x] Vacunas Permisos -> Separar de farmacia. Gestion area/general - Ver area/general - config gral - Solicitud Motivo "Vacunas".

    - [x] Front
          solicitudes.config => Motivo -> Destino [Todos-opcional-area] (area Gestion)
    - [x] BACK
          Migrar Insumos Categoria Vacuna -> VacunaInsumo

```js
db.getCollection("Insumos")
  .find({categoria: "Vacuna"})
  .forEach(function (obj) {
    db.getCollection("VacunaInsumos").insertOne(obj);
  });
db.getCollection("Insumos").deleteMany({categoria: "Vacuna"});
```

11. [x] Reporte Nominal (Estilo CIPRES) -> select Vacunatorio(5max) -> fec_apl + Datos del Paciente (apynm,doc(tip,num),domicilio,telefono,municipio,fec.nac,edad(v,u),sexo,estra,emba,puerp,pers sal/ese,riesg) vacuna-dosis, total dosis por paciente. +totales

12. [x] TESTING de permisos.

13. [x] Crear/Editar Vacuna Insumo, verificar si hay aplicaciones con nombre similar y si existe aplicacion vincularla con el nuevo Insumo Vacuna.

14. [x] Reporte Vacuna Etario -> select Vacuna(1) -> fila Vacunatorio, columnas Grupo Etario segun vacuna y dosis + especiales +totales.
        Fecha del reporte, entre fechas seleccionadas.

15. [x] Reporte Vacunas por Vacunatorio (Hoja2) -> select fecha(rango) -> fila vacunatorios, columnas vacuna/dosis + especiales +pacientes(fecha+pacienteID).

16. [ ] Vacuna Integracion con CIPRES.

17. [x] ‼️ Insumos -> categoria "Agujas"-"Diluyente"-"Descartadores", por utilizados (vacuna no permitir el utilizados).
        NO => Desde Alta Vacuna seleccionar su "Diluyente" y su "Agujas" correspondientes.
        NO => Alta Vacuna -> Alta Insumos
        Al Aplicar Vacunas Seleccionar tambien Agujas, Diluyentes, Descartadores -> al aplicar ver su categoria.. si es vacuna aplicar, sino Egresar.

18. [ ] Auditorias (Supervision de Practicas) - Usuario Auditor General (Crear informes), Usuario Lector (General o Vacunatorio).
        Cadena de Frio Si/No, Heladera Ordenada Si/No, Conservadora Preparada Si/No, Vacunas Rotuladas Si/No, Inventario Mensual Si/No.
        Observacion.

19. [ ] REPORTES en Steps -> Boton Nombre Reporte -> select filtros -> PDF / xls.

20. [ ] Reporte Vacunatorio Mensual -> select Vacunatorio(1) -> fila vacunas/dosis +especiales, columnas meses.
        Residentes Moreno, Menores(15a), varones, mujeres, embarazo, puerpera, pers salud/esencial, riesgo?, vacuna/dosis total mensual
        Fecha del reporte, Anual entre meses seleccionados.
        Fecha del reporte, entre fechas seleccionadas.

21. [ ] Reporte Nominal -> select vacuna -> inicia [dosis] aplicacion entre <fechas> -> completa esquema [dosis] entre <fechas>.

22. [ ] Plan de Contingencia, Stock en StandBy (Remito). Quitar de stock momentaneamente. Destino que cuidara los insumos.

- [ ] VACUNAS - MIGRACION => Vacunaciones sin paciente ID pero con tipo_doc y documento, luego buscar si existe paciente y linkearlo.
- [ ] VACUNAS - MIGRACION => Vacunaciones sin paciente ID posibilidad de seleccionar paciente para linkearlo.

- [ ] Vacunas 2.0 -> Tabla con botones para dar vacunas segun calendario vacunatorio.
      colores-> Rojo: edad pasada y no aplicada, Verde: aplicada, Azul: sin aplicar y en edad recomendada.

- [ ] Calendario Regular, Edad por Vacuna.
      (Opcional) 2 meses de holgura.. Proxima fecha de aplicacion, en alta Vacuna.

### Farmacia

```bat
    (STOCK De US, similar a patrimonio insumos).

    - VER -> Capacidad de verificación de stocks en un solo programa.
    - VER -> Precios Unidad y Total.

    MODELOS EN DRAW.IO

[Back] (Front)

    - [X](X)  Modificacion de usuarios, propiedad para permiso
        farmacia: {
            crear Insumo [0/1] (Farmacia Central, Dios de farmacia)
            entrega a terceros [Area desde] (medicos, gestion y Dios de farmacia)
            ver stock [Area] (medicos, gestion y Dios de farmacia)
            gestion [Area] [
                opciones,
                solicitar y ver sus solicitudes, tambien las generales,
                ingreso, (ex entradas)
                transferencias (clearing),
                egresos (ex descartes),
                reportes locales
                ] (gestion, Dios de farmacia)
            general stock [0/1] (Supervisores de Central)
            general reporte [0/1] (Supervisores de Central)
            general admin [0/1] (Dios...)
        }

    - [X](X)  Navegacion agregar y mostrar solo rutas permitidas.

    - [X](X)  Farmacia Stock
                (stock, gestion, general stock, dios)
                - [X](X) En base a los minimos, mostrar insumo en cantidad cero en caso de que no haya.
                - [X](X) Filtrar solamente Vencidos/PorVencer, poco Stock (avisar).
                - [X](X) Ver tema de colores del background, vencidos | porVencer (red (negrita) | orange).
                - [X](X) Ver tema de colores del background, Minimo | porLlegarMinimo (Rosa (negrita) | no diferencia).
                - [X](X) Ver tema de colores del background, en cero con Minimo (Fucsia (negrita)).

    - [X](X)  Medicamento Entrega (consumidor final)
                (entrega, dios)
                (X) Ver tema de pacientes (busqueda dinamica por steps)...

    - [X](X)  Farmacia Egresos (ex Descarte)
                (gestion, dios)

    - [X](X)  Farmacia Solicitud
                (gestion, dios)

    - [X](X)  Farmacia Transferencia (Clearing)
                (gestion, dios)
                - [X] Reporte Transferencia PDF (Total Origen / Destino)

    - [~](~)  ‼️ Farmacia Opciones
                (gestion, dios)
                - [X](X) Similar a Insumo...
                - [X](X) Minimos de Stock...
                [ ]( ) Cantidad a Solicitar Standard... (Boton nuevo en Solicitud para cargar la plantilla)

    [~](~)  Farmacia Reportes (Vencimiento/Minimos o Estadistica)
                (gestion, general report, dios)
                Similar a Hiclem Control.
                - [X] Estadistica => [Area]-[Medicamento] = + [Ingreso] +- [Clearing] ~ [Stock]
                    - [Entrega] - [Descarte] ~ [Solicitud]
                - [ ] Vencimiento/Minimos => [Area]-[Medicamento] = [Cantidad]-[minimo_opciones]
                    - [Cantidad]-[vencimiento/por_vencer]

    - [~]( )  Farmacia Solicitud Consolidados (cada programa tiene una planilla) Para provincia
            Lista de Pacientes incluidos en los programas
                Datos Paciente
                Insumo
                Fecha de declaracion jurada (entrada al programa)
                Duracion del programa para avisar que necesita renovacion.

    (X)  Stock Estadistica, subtotal Buenos / subtotal por vencer / subtotal vencido / TOTAL.
    (X)  Ingresos Estadistica, carga propia (orden_compra, inicial) / clearing (remito interno) / TOTAL.
    (X)  Egresos Estadistica, nominal (entregas)/ clearing (remito interno) / descarte (motivo utilizado, otros) / TOTAL.
    (X)  Solicitudes Estadistica, Pendientes Rutina / Urgencia / Emergencia / TOTAL / Stock.

    - [X](X)  Manual PDF.
              - [ ] Actualizar Video Tutorial...
```

#### REUNION 2024-10-18

- [ ] HICLEM - Patologia -> Diabetes Tipo I y Diabetes Tipo II (excluyente lo que se les medica).
- [ ] HICLEM - Patologia -> Si Patologia es Diabetes Solicitar fecha de ddjj.
- [ ] Paciente - Alta -> Fecha fallecimiento.
- [ ] Egreso -> Categoria Medicacion no permitir egreso con motivo Utilizado.
- [ ] Insumo - Alta -> Agregar Patologia("Subcategoria").
- [ ] Insumo - Alta-> Agregar Estado para poder deshabilitarlos.. que no se usen para nuevos ingresos..
- [ ] Entrega -> PreCarga de patologias como en Vacunas (HICLEM).
- [ ] Entrega -> Filtrar/Exportar Patologia del medicamento.
- [ ] Filtro Avanzado -> areas por zonas o poder copiar/pegar varias.
- [ ] Filtro FECHAS -> poder ingresar fechas solo con numeros.
- [ ] Solicitud -> Consumo Mensual del insumo solicitado (fecha de la solicitud - 30 dias antes).
- [x] Stock -> Minimos con colores de la gama fucsia-rosa.
- [ ] Proveedores -> Permitir agregar/editar/borrar a los administrativos de farmacia.
- [ ] Reporte-> Seleccion de 1 Medicamento para seguimiento ingresos + egresos con fecha lote vencimiento cantidad.
- [ ] Salud Adulto -> pagina aparte para filtrar por paciente Patologia -> fechas de retiro (detectar quienes no retiran mas [2 meses]).
- [ ] Insumo - Alta -> Poder Unificar Insumos Eliminando uno y cambiar su ID por el nuevo.
- [ ] Peticion de Insumos de Farmacia Central a sus Proveedores-> en base al minimo, conusmido en ultimos 2 meses + n% (5-10).

### Pacientes

- FRONT
  - [ ] Migrar O.Social y Numero O.Soc a Array de objeto con mas datos y multiples OSoc {rnos, name, [planes]}...
  - [~] opciones JSON
    - [ ] quitar Zonas (uso interno para las salas)
    - [x] Localidades
    - [ ] Barrios
    - [ ] calles
  - [ ] Agregar funcionalidad RENAPER.
  - [ ] Agregar funcionalidad de carga con camara en el codigo del dni (lector de codigo de barra / camara QR).
- BACK
  - [ ] ‼️ ‼️ BACK MIGRAR COMORBALIDADES de paciente a HICLEM.
  - [ ] Agregar funcionalidad RENAPER.

### HICLEM

Improvement PSMORENO (PRESTACIONES de cada profesional, US, Zonas, Estadistica Gral).

- HICLEM

  - [ ] Control Mejorar Filtros.
  - [ ] Control PDF INFORME.
  - [ ] Lista de Barrios de Moreno.
  - [ ] Lista de Calles de Moreno.
  - [ ] Algunos estudios en historial general.

- CONTROL

  - [ ] "Metas" en Motivo y ver si las cumplieron.
  - [ ] PDF INFORME.
  - [ ] Excel INFORME.
  - [ ] Mejorar Filtros.
  - [ ] Separar por zonas/localidades)?
  - [ ] Ver Control/Estadistica Lista de permiso del usuario.

- PROBLEMA (MOTIVO)

  - [ ] Cargar actualizarLecturas desde stores state.
  - [x] Motivos Unique los cuatro juntos persona/estado(Activo)/motivo_especialidad/programa-sintoma-descripcion.
  - [x] Atendido por varias especialidad(Hojas2) Consultas.
  - [x] Consultas Grupales atendido por varios profesionales.

- CONSULTA

  - [x] Combobox Derivado de.. US, El Hospital, La Maternidad.
        Combobox, con los nombres de las US no las ID.. y permitir completar verdura.
  - [x] Motivos Fecha para cuando cambia de estado "ACTIVO".
  - [x] Motivos con estado diferente a "ACTIVO/SUSPENDIDO" inmutables.
  - [x] Edicion de consultas... tiempo y nivel de usuario.
  - [x] POSIBILIDAD DE EDICION (1 dia...).
  - [x] Datos de Paciente en todos los dialogs.
  - [ ] Resumenes en todos los dialogs ¡?¡?
  - [ ] ‼️ ‼️ Genograma Social.
        Relacion entre Pacientes(existentes o imaginarios),
        tag(Familiar/otros), detalle(text.. trabajadores sociales).

- FRONT
  - [x] formConsulGeneral
  - [~] formEspecialidades
    - [x] Nutricion.
    - [ ] Diabetes.
    - [ ] Tuberculosis.
    - [ ] Medicamentos.
    - [ ] Estudios
  - [~] Opciones JSON
    - [x] especialidad (tablas BD).
          ['Nutricion', 'Diabetes', 'Tuberculosis']
          ['Pediatria', 'Clinica Medica', 'Obstetricia', 'Ginecologia'] Medicina General (GENERALISTA)
    - [x] actividades:
          { esp : [ control, programas ],
          Nutricion : ['Reduccion de Peso', 'Nutricionista', 'Coordinador']}
      - [ ] posibilidad de que el admin agrege nuevas..
    - [x] Estudios (medicos).
          code Snomed, titulo, descripcion.
          Contra-referencia.
          Laboratorio (Nutricion)
      - [ ] posibilidad de que el medico agrege nuevas..
    - [x] Medicamentos.
          Snomed, titulo, descripcion.
      - [ ] posibilidad de que el medico agrege nuevas..
    - [ ] Coberturas Medicas.
          rnos, name, [planes]
    - [x] Localidades.
    - [x] Zonas.
    - [ ] Barrios.
    - [ ] calles.
  - [x] opciones noJSON
    - [x] severidad ['Leve', 'Moderada', 'Critica', 'Incapaz de evaluar' ].
    - [x] estados.
    - [x] motivo ['Activo', 'Finalizado'].
    - [x] estudios ['Pendiente', 'Finalizado'].
    - [x] medicamentos ['Activo', 'Suspendido', 'Finalizado'].

### HICLEM - Salud del Adulto/NUTRICION

```bat
- [ ]    ‼️ TOTALES por zonas/unidad sanitaria => Paciente: tabaquista/ant. patologic (ambos ver filtros), ;
    Medicacion => tablas LISTAS; Estatinas : sinvastatina, atorvastatina, rosuvastatina.
    O.Social => PAMI/PROFE(NO)/ SI / NO.
    Diabetes tipo 1 / 2.
    Export Excel, qgis.
- [ ]    ‼️ Medicacion; Inusmo(medicamento) Diario (Mensual) (si toma mas de 1 comp por dia etc);

            Ver index de Farmacia Stock. BASE DE DATOS MONGODB
            Cambios de Stock => https://mongoosejs.com/docs/guide.html#optimisticConcurrency
            INDEX =>
                pacienteSchema.index(
                    IMPORTANTE EL ORDEN CON EL SORT
                    {"field.lala": 0/1/"text"},
                    {name: "field_name desc.", unique: "Documento ya existente en el sistema, debe ser unico.", sparse: true}
                )

NUTRICION
    - [ ] Colesterol Laboratorio fecha, y otros valores.
    - [ ] Personas en X programa, que tienen "Y" antecedentes patologicos.
            (colores en control)
            (antecedentes patologicos mayor riesgo)
    - [ ] Paciente derivados a otras especialidades.
        - [ ] Paciente resultado contra-referencia de derivados a otras especialidades.
    - [ ] Paciente en riesgo en la ultima consulta o sin consultas en X tiempo con motivos activos.
            Cuando considerarlo en riesgo (valores...)

    - [ ] CIE-11 - La CIE-10(CIE-11) es el acrónimo de la Clasificación internacional de enfermedades
    - [ ] ATC - El código ATC o Sistema de Clasificación Anatómica, Terapéutica, Química
    - [ ] CIAP-2 -La Clasificación Internacional de Atención Primaria, también denominada CIAP-2 (ICPC-2, ingles)

---

    - [X] autodiagnostico con el IMC
    - [X] riescgo cardio vascu requerido
    - [ ] riescgo cardio vascu Autocalcular¿? psvacunas; enfermeria
        VER pagina https://www.paho.org/cardioapp/web/#/cvrisk
            Source: paho.org/cardioapp/web/static/js/utils/CVRiskUtils.ts
CONTROL
    - [ ] PDF INFORME
    - [ ] Excel INFORME
    - [ ] INFORME de Peso, por porcentaje.
    - [X] Solo consultas de nutricionistas¡? (Consulta)
    - [X] Permanencia de las personas que inician tratamiento a los 3/X+ meses.
        motivo(esp:nutri, desc/prog: red. de peso,estado:activo) - consultas(ultima fecha vs fecha actual < 14 dias).
    - [X] Personas que perdieron peso y siguen el tratamiento (3/6/9 meses).
    - [X] Personas que bajaron X% en Y meses de acuerdo a IMC.
    - [X] Personas que adoptaron X+ habitos saludables.
    - [X] Personas que adoptaron X+ habitos no saludables.
    - [X] Personas con X+ consultas nutricionales anuales.

- [ ] cambio_diagnostico Se usa¡? (Consulta)
- [ ] agregar modulo para Laboratorio (Estudios) (parecido a contra-referencia)

FRONT
    - [X] opciones no JSON
            est_nut: ['Normopeso', 'Bajo Peso', 'Sobrepeso', 'Obesidad', 'Aumento Excesivo']
            presentacion: ['1ra vez', 'Ulterior', 'Promocion']
            antecedentes: ['Diabetes (DM)','Hipertensión Arterial (HTA)','DSP',
                'Enfermedad Celiaca','Insuficiencia Renal Crónica']
            habitos_sa: ['Agua','Frutas Diaria','Actividad Fisica','Harinas Integrales',
                'Legumbres','Hidratos','Verduras Almuerzo','Verduras Cena','Preparaciones Caceras']
            habitos_nosa: ['Bebidas Azucaras','Harinas Refinadas','Fiambres Embutidos',
                'Pan y Galletas',]
```

### HICLEM - Salud del Adulto/DIABETES

- VER cuando se agregue el modulo de medicamentos

### HICLEM - ETS/TUBERCULOSIS

- VER
  - Caso Indice.
  - Fecha de su tratamiento.
  - Estado.
  - Indice de los siguientes casos...
  - Fecha de sus tratamientos
  - Estados.
  - Retratamientos/Recaidas...
  - Tipo de Tuberculosis...
- FRONT
  - [ ] TUBERCULOSIS... Guardar y Ver Historiales.
  - [ ] Implementar con HICLEM.
- BACK
  - [ ] Migrar a HICLEM.

### Bromatologia

- FRONT
  - [ ] Agregar funcionalidad descarga de PDF por Bulks.
  - [ ] Permisos diferidos por origen y tipo de analisis.
- BACK
  - [ ] Permisos diferidos por origen y tipo de analisis.

### PATRIMONIO

- Feedback

  - [ ] ‼️ ‼️ Modelo SELECT compus modelo de micro I3, I5, I7;
  - [ ] ‼️ ‼️ Transferencias cambiar estado a "funcionando", excluir informatica/ y lugares de tirar cosas o transicion;
  - [ ] ‼️ ‼️ Reportes(N° inv, Descripcion);
        Bienes Reales, Transferencias y Bajas(motivo y anexo informe tecnico).
  - [ ] Hacer varias transferencias a la vez.
  - [ ] Planillas de carga en dialogs.
  - [ ] Opciones de planilla de carga "Selects" (modulos de memoria).
  - [ ] Mostrar Monitor INV en PCs Info... (consultar monitores con esa pc, array)
  - [ ] Planillas de entrega.. seleccionar varios bienes al hacer la entrega..
        campos opcionales de quien recibe y completar la transferencia al ya ser entregado..

- FRONT

  - [ ] bodyDataTableDinamic, agregar numeros y stylos para cantidades.
  - [ ] ENTREGA DE INSUMOS AUTOCOMPLETE DE MODELOS DE IMPRESORA
  - [ ] Reporte de Insumos..
        subcategoria (Toner,Periferico,Repuesto,Otros)
        CONSUMO, CUANTOS QUEDAN.
        Compras, Ultimas entradas.
        pdf/excel totales por modelos.

- VER

  - Mejorar Declaraciones con la dinamic-table
  - soloLecturaStore
  - Mejorar filtros del back.. populate no para busquedas...
  - Determinar Bienes de Informatica, para filtrar del resto.
    Orden de compra <-> Donacion (diferenciarlos).
  - Tema de permisos de las cuentas de Patrimonio y PatrimonioArea.
    Ninguna vera Insumos, eso lo maneja informatica (insumos permiso).
    - Area, solo lectura de sus bienes.
    - Patrimonio,
      - Solo Lect
        +Lectura de todos los bienes.
      - Lect/Escri
        +Carga/edicion de bienes no informaticos
        +Movimientos
        +Validar
      - Admin
        +Borrar(visibilidad)
        +Ver tema de estadisticas
        +Sacar reportes
  - Patrimonio... Mostrar ultimo, cuando y que Modifico(admins).
  - Agregar categorias de BD al combobox de las que no estan en la lista.
    categorias en opciones BD
  - Filtrar por zonas de areas.
  - Informes Tecnicos de Baja.
    (Problema, Posible Solucion, Motivo del Rechazo de la solucion)
  - Baja - informacion de Solicitud de Baja.
    (Motivo: resumen del Informe Tecnico).
  - Baja - Oficial Nro Decreto.

### PROFESIONALES (RR.HH)

- VER
  Nombre, Apellido, Email, Matriculas P/N, Legajo, Documento
  Dia Laboral - Horarios - duracion TURNOS
  Especialidad, US,
  Licensias/No trabajados.(tipos de ausensia)

### TURNERO

- ‼️ REVISAR Y RE-PLANTEAR...
- VER
  - [ ] Tomar datos de Profesionales
  - [ ] Profesionales con estado Borrado no aparecer en busqueda...
        marcar las Ausencia de los profesionales, feriados(Licencias a futuro).
        Marcar Feriados...
  - [ ] Reprogramacion de Turnos (Enviar a la solicitud con motivo y prioridad)
- FRONT
  - [ ] Solicitud de Turnos
  - [ ] Boton para todo el dia pasar a "reprogramado institucional"
        (enviar personas a lista de solicitud de turno con motivo de reprogramacion y prioridad).
  - [ ] TABLA DE TURNOS BORRADOS CON MOTIVO Y QUIEN BORRO
- BACK
  - [ ] Solicitud de Turnos
  - [ ] TABLA DE TURNOS BORRADOS CON MOTIVO Y QUIEN BORRO

### CONECTIVIDAD

- VER
  Conectividad de Unidades, NMAP - ping - [[arpping]], IP Red de Areas,
  reportes por zonas (fecha - caidas/totales), por US (entre fechas cantidad caida/online).
  Testeos de 8 a 16 cada 2hs. Estadistica y reportes.
  Testeo Manual. reporte excel/PDF. drop 7d
  Unidades sanitarias(0), Subsecretarias(Prog y planificacion,1), Servers(2). (roles Pablo)

### AUTOGESTION

- VER
  Pacientes con propios usuarios.
  Historial de Cambios, como en patrimonio.. sets and unsets..
  CORREO DE VERIFICACION en produccion tengo los puertos('587', '465') bloqueados :/ 😞
  [Example](https://dev.to/christopherliedtke/how-to-verify-your-users-email-addresses-node-js-express-dg0)

### Sistema General

- [ ] Ver Front Cuando caduca sesion - abrir dialog de logueo)?

- [ ] Ver Front Exportar -> i-frame/dialog con opciones -> csv (excel), PDF (read/download).
- [ ] Ver Front Exportar -> i-frame/dialog -> cerrarlo desde el mismo iframe (contextos diferentes).

- [ ] Ver Express (Server) route middleware
      https://expressjs.com/en/4x/api.html#router.route

- [ ] Ver Express (Server) redirect with res.redirect and req.. options of express

  - Crear nueva app de express para redirect..
    https://stackoverflow.com/questions/8605720/how-to-force-ssl-https-in-express-js/8634055#8634055
    https://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express/46852350#46852350
    https://expressjs.com/en/5x/api.html#res.redirect
    https://expressjs.com/en/5x/api.html#req.host
    https://expressjs.com/en/5x/api.html#req.originalUrl
  - Para Front..
    https://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express/65551891#65551891

- [ ] Ver Mongoose (Server) -> Consultas "get" con regex... usar collation.
      https://stackoverflow.com/questions/7101703/how-do-i-make-case-insensitive-queries-on-mongodb/40914826#40914826
      https://www.mongodb.com/docs/v4.4/core/index-case-insensitive/#case-insensitive-indexes-on-collections-with-a-default-collation
      https://www.mongodb.com/docs/manual/reference/collation/

- [ ] Ver Mongoose (Server) -> Validaciones con Unique.
      En Validacion.. Consultar a Mongo si existe.. y evitar la siguiente consulta.. (doble Mongo si no exisitia)
      https://stackoverflow.com/questions/13580589/mongoose-unique-validation-error-type/70722045#70722045
      En Post Validation.. MongoDB respondio con error de unique validation... (Mongo solo ejecuta una vez)
      https://thecodebarbarian.com/mongoose-error-handling#:~:text=Mongoose%20error%20handling%20middleware%20gives,error%20formatting%20for%20your%20API.
      En Express Error errorHandlers
      https://stackoverflow.com/questions/67373356/handling-mongoose-query-errors-in-express-js/67373603#67373603
      https://expressjs.com/en/guide/error-handling.html

- [ ] Ver Mongoose (Server) -> uniqueCaseInsensitive: true, en modelos correspondiente.
      https://stackoverflow.com/questions/33736192/mongo-unique-index-case-insensitive/41501310#41501310

- [ ] Ver Develop Front -> Agregar Lint para mejorar deteccion de errores y consejos/recomendaciones/estilos de tipeo de programacion.
      https://eslint.vuejs.org/user-guide/#usage
      vue add @vue/cli-plugin-eslint

- [~] Front -> Fontawesome ??
  https://stackoverflow.com/questions/52030435/fontawesome-with-vuetify-how-to-include-font-awesome-icons-within-the-v-icon-c
  https://v15.vuetifyjs.com/es-MX/framework/icons
  Tener en cuenta.. VER
  https://fontawesome.com/docs/web/add-icons/svg-symbols
  https://v2.vuejs.org/v2/style-guide/?redirect=true#Self-closing-components-strongly-recommended

- [ ] Areas -> Migrar subsecretarias a areas y borrar el campo subsecretaria.

- [ ] Name Domain para el sitio a futuro online e intranet
      secretariadesaludmoreno
      preparar los certificados correspondientes

- [ ] Cambiar Libreria de xlsx (Excel..)
      Por el momento usa una libreria en el server...
      "vue-xlsx" para el front xlsx to json...

- [x] ‼️ WireShark Comprobar seguridad de datos

- [ ] ‼️ Migrar de Vue 2 al... Vue 3..

- [ ] ‼️ Migrar de Vuetify 1 al... Vuetify 2 o 3..

- [ ] Sistema Tickets (Pablo).

- [ ] Sistema de CHAT.

- [ ] Multi Languaje, migrar Front Strings and errorHandlers too...
      https://github.com/i18next/i18next-vue/tree/vue-2

### Sistema Secundario

- [ ] Aviso de uso de Cookies(localStorage)

- [~] RUTAS PARA EL COPYLEFT Y PAGINA DE CONTACTO.

- [ ] TESTS WITH MOCHA O ALGO PARECIDO.

- [ ] ‼️ VER EL TEMA DE CORS EN PRODUCCION.

- [ ] v-system-bar para el close de dialogs :D

- [ ] sort de arrays de autocomplete

- [ ] navegacion con v-for
