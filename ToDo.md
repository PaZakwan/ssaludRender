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
- [ ] Farmacia - Ingresos con muchas cargas, puede colgar el navegador (RAM).
  - Generar con lazy load para que no tarde en renderizar.. Requiere update de Vuetify..

---

<!-- #### Enviroment (Entorno)

|         |    SERVER    | OFFICE  |  HOME   |
| :------ | :----------: | :-----: | :-----: |
| S.O.    | Ubuntu 20.04 |  W 10   |  W 11   |
| MongoDB |    5.0.31    | 5.0.28  | 5.0.28  |
| Node    |   20.19.5    | 20.20.0 | 20.20.0 |
| NPM     |    10.9.2    | 10.9.4  | 10.9.4  |
| Nodemon |     ---      | 3.1.11  | 3.1.11  |
| PM2     |    5.4.0     |         |         |
| Nginx   |              |         |         |
| NVS(Dev)|     ---      |  1.7.1  |  1.7.1  |

```bat
# Go into the repository
$ npm update / npm update --legacy-peer-deps
$ npm install -g npm@10.9.4
$ npx update-browserslist-db@latest

$ npm install -g @vue/cli

# Get list of global package installed
$ npm ls -g

# Get list of local package installed
$ npm ls
```

--- -->

<!-- TEMPORAL EJEMPLOS

  - [ ] Mercury
    <progress value="0" max="100"></progress> 0%
    - [ ] BACK
    - [ ] FRONT
  - [x] ‼️ Venus
  - [ ] Earth (Orbit/Moon)
        +some item
        +another item
  - [/] Mars
    <progress value="50" max="100"></progress> 50%
    - [x] BACK
    - [ ] FRONT
  - [x] Saturn
        +some item
  - [x] Uranus
  - [ ] ‼️ Neptune
        +some item
  - [ ] Peruptuno
  - [x] Garlandia

--- -->

### En Progreso - W.I.P. (Work in Progress)

- [ ] ‼️ CIPRES - ERROR -> Paciente: Internal Server Error. or Paciente: CIPRES Internal Server Error.
      Posible documento del responsable esta mal? ver casos de mayores del año, consultar a CIPRES
      MAIL A CIPRES CONSULTA POR LA RESPUESTA "Internal Server Error".
      Persona Creada en CIPRES, SIN CODIGO DE CIPRES(SUMAR) y SIN RESPONSABLE o.o, creo que es lo que me esta generando el error.

- [ ] ‼️ PACIENTE - UNIFICACION -> ASIGNAR A UN PACIENTE, las id del otro (ref: "Paciente") y luego BORRARLO al otro.
  - [ ] Permiso Admin General, no cualquiera pueda unificar.

  - [/] Dialog paciente Unificar -> Select Paciente 2 -> Pantalla Union Datos Basicos -> Datos Especiales.
    <progress value="68.99" max="100"></progress> 68.99%
    - [x] Select Paciente
    - [x] Datos Basicos (formPacienteUnir)
      - [x] Form Basicos - Requeridos dinamicos.
    - [/] Datos Especiales (expandPacienteUnionEspecial) (Posibilidad de borrar por item)
      - [/] Form Especiales (formHistorialUnir)
      - [x] Form Especiales (expandInsumosRecibidos)
      - [x] Form Especiales (expandVacunaciones)
      - [x] Form Especiales (expandMotivos)
      - [ ] Form Especiales (expandMedicacion)
            y adaptar como el expandMotivos para los dialogs.
            agregar boton de borrar
      - [-] Form Especiales (formTurnoUnir)
      - [-] Form Especiales (formTuberculosisUnir)

  - [ ] FARMACIA - Fracciones de productos (blíster o envase vs unidades sueltas)
    - [ ] Ingreso de Insumos -> agregar nuevo campo para hacer inequivoco el producto en stock "unidades por blíster o envase".
    - [ ] Ingreso de Insumos -> validacion o informar?, cantidad multiplo de "unidades por blíster o envase".
    - [ ] transferencia de Insumos -> validacion o informar?, cantidad multiplo de "unidades por blíster o envase".

  - [ ] Herramienta Admin General ->
    - [ ] Boton Reportar Duplicado (Origen -> Duplicado).
    - [ ] Mostrar Posibles Duplicados (posibilidad export csv) -> Apellido y Fec Nac coincidan (Mellizos | Gemelos).
          Dialog de union
          Quitar del reporte

- [ ] PACIENTE - ALTA -> Nuevo metodo de alta/busqueda con Pistola lectora QR?.

- [ ] ‼️ Farmacia/Vacunas -> Estado de Insumos (solo utilizables para reportes, historica).

- [ ] Farmacia - Entregas -> Crear nueva pagina de Faltantes similar a Entregas y Solicitudes, cantidad de insumo mostrando (recomendado y stock), Liberar seleccion de todos los insumos para ver que y quien pidio en las salas.
- [ ] ‼️ HICLEM - Salud Adulto -> Modulo de Medicacion (Consolidado)

- [ ] ‼️ Vacunas - Aplicaciones -> ESPERAR IMPORTACION DEL MATERNO + Historicos -> SCRIPT LINKEAR APLICACIONES
      SIN-> paciente (PACIENTE ID) y ps_doc,
      CON-> ps_paciente(id), ps_doc_resp.
      db.getCollection('VacunaAplicaciones').find({paciente:{$exists:0},ps_doc:{$exists:0},ps_paciente:{$exists:1},ps_doc_resp:{$exists:1}}) -> buscar con ps_paciente en Pacientes ps_id -> si existe actualizar Aplicacion.
      each -> find and save

- [ ] Sistema - Date -> Input Date Range Select -> con la posibilidad de seleccionar años... o mes actual... o mes anterior...
      wip date-range

- [ ] Farmacia/Vacunas - Filtros Agregar boton seleccionar todos (areas).
- [ ] Farmacia/Vacunas - Filtros Agregar boton seleccionar grupo por ejemplo por zonas para areas o por categoria para insumos.

- [ ] Farmacia/Vacunas - BUSCAR POR LOTE, en todos los buscadores | filtros.
- [ ] Farmacia/Vacunas - BUSCAR TODO TIPO DE MOVIMIENTO POR LOTE. CONTROL CENTRAL.

- [ ] Farmacia - Permisos -> Supervisores por area.

- [ ] Sistema -> Notificar al Loguear si hay algun Mantenimiento Programado [1 semana](Dialog Informativo con fecha-hora).

- [ ] Municipio - Nombre de dominio para G.I.SA.M.

### En Progreso Secundario

- BACK
  - [ ] Revisar y borrar libreria lodash => \_pick , \_merge (sumarProps?). [youmightnotneed lodash](https://youmightnotneed.com/lodash)
  - [ ] Revisar y modificar => Object.assign -> structuredClone() || {...structuredClone(), ...{}}.
  - [ ] ‼️ Independizar y crear script para generar los ssl certificated for ip intranet.
        [SSL LOCAL](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/)
        [generate-a-self-signed-SSL](https://stackoverflow.com/questions/10175812/how-to-generate-a-self-signed-ssl-certificate-using-openssl?answertab=trending#tab-top)
        [How SSL LOCAL](https://www.section.io/engineering-education/how-to-get-ssl-https-for-localhost/)
- FRONT
  - [ ] Revisar/modificar/quitar => vue-axios -> axios centralizado en un archivo con interceptores -> usarlo en Store y Router.

#### REUNION 2024-10-18

- [x] HICLEM - Patologia -> Diabetes Tipo I y Diabetes Tipo II (excluyente lo que se les medica).
- [ ] HICLEM - Patologia -> Si Patologia es Diabetes Solicitar fecha de ddjj.
- [x] Paciente - Alta -> Fecha fallecimiento.
- [ ] Egreso -> Categoria Medicacion no permitir egreso con motivo Utilizado.
- [ ] Insumo - Alta -> Agregar Patologia("Subcategoria").
- [ ] Insumo - Alta-> Agregar Estado para poder deshabilitarlos.. que no se usen para nuevos ingresos..
- [x] Entrega -> PreCarga de patologias como en Vacunas (HICLEM).
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

### Vacunas

- [ ] PSVACUNAS - MIGRACION => Areas de Historial.
- [ ] VACUNAS - MIGRACION => Vacunaciones sin paciente ID pero con tipo_doc y documento, luego buscar si existe paciente y linkearlo.
- [ ] VACUNAS - MIGRACION => Vacunaciones sin paciente ID posibilidad de seleccionar paciente para linkearlo.

- [ ] Unificar Pacientes.

- [ ] Auditorias (Supervision de Practicas).
      Permiso de Crear -> Auditor General (Crear informes).
      Permiso de Leer -> Vacunatorio General o de su gestion.
      Cadena de Frio Si/No, Heladera Ordenada Si/No, Conservadora Preparada Si/No, Vacunas Rotuladas Si/No, Inventario Mensual Si/No.
      Observacion.

- [ ] Plan de Contingencia, Stock en StandBy (Remito). Quitar de stock momentaneamente. Destino que cuidara los insumos.

- [ ] Reporte Vacunatorio Mensual -> select Vacunatorio(1) -> fila vacunas/dosis +especiales, columnas meses.
      Residentes Moreno, Menores(15a), varones, mujeres, embarazo, puerpera, pers salud/esencial, riesgo?, vacuna/dosis total mensual
      Fecha del reporte, Anual entre meses seleccionados.
      Fecha del reporte, entre fechas seleccionadas.

- [ ] Reporte en Steps -> Boton Nombre Reporte -> select filtros -> PDF / xls.

- [ ] Reporte Nominal Personalizado -> select vacuna -> inicia [dosis] aplicacion entre <fechas> -> completa esquema [dosis] entre <fechas>.

- [ ] Vacunas - Reportes -> Agregar filtro Edades (años), para sacar reporte nominal agrupado por edad.

- [ ] Vacunas 2.0 -> Tabla con botones para dar vacunas segun calendario vacunatorio.
      get vacunas de la API del CIPRES.
      colores-> Rojo: edad pasada y no aplicada, Verde: aplicada, Azul: sin aplicar y en edad recomendada.

- [ ] Alta Vacuna - Calendario Regular, Edad por Vacuna.
      (Opcional) 2 meses de holgura.. Proxima fecha de aplicacion, en alta Vacuna.

### Farmacia

- FRONT
  - [ ] Farmacia Solicitud Consolidados (cada programa tiene una planilla) Para provincia
        Lista de Pacientes incluidos en los programas
        Datos Paciente
        Insumo
        Fecha de declaracion jurada (entrada al programa)
        Duracion del programa para avisar que necesita renovacion.

  - [ ] Farmacia Opciones - Solicitar Standard... (Boton nuevo en Solicitud para cargar la plantilla)

- BACK
  - [ ] Farmacia Solicitud Consolidados (cada programa tiene una planilla) Para provincia
        Lista de Pacientes incluidos en los programas
        Datos Paciente
        Insumo
        Fecha de declaracion jurada (entrada al programa)
        Duracion del programa para avisar que necesita renovacion.

  - [ ] Farmacia Opciones - Solicitar Standard... (Boton nuevo en Solicitud para cargar la plantilla)

- [ ] Actualizar PDF/Video Tutorial...

- VER -> Precios Unidad y Total.

### Pacientes

- FRONT
  - [ ] Migrar O.Social y Numero O.Soc a Array de objeto con mas datos y multiples OSoc {rnos, name, [planes]}...
  - [/] opciones JSON
    <progress value="33" max="100"></progress> 33%
    - [x] Localidades
    - [ ] Lista de Barrios de Moreno?.
    - [ ] Lista de Calles de Moreno?.
  - [ ] Agregar funcionalidad RENAPER.
  - [ ] Agregar funcionalidad de carga con camara en el codigo del dni (lector de codigo de barra / camara QR).
- BACK
  - [ ] Agregar funcionalidad RENAPER.

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

### HICLEM

Improvement PSMORENO (PRESTACIONES de cada profesional, US, Zonas, Estadistica Gral).

- HICLEM
  - [ ] Control Mejorar Filtros.
  - [ ] Control PDF INFORME.
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
  - [/] formEspecialidades
    <progress value="20" max="100"></progress> 20%
    - [x] Nutricion.
    - [ ] Diabetes.
    - [ ] Tuberculosis.
    - [ ] Medicamentos.
    - [ ] Estudios
  - [/] Opciones JSON
    <progress value="70" max="100"></progress> 70%
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

### HICLEM - ETS/TUBERCULOSIS (Usan el de Nacion HSI)

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

### TURNERO (Usan uno desarrollado por INEGRAM)

- REVISAR Y RE-PLANTEAR...
  - [ ] BUSCAR/EMITIR -> INHABILITADO -> CORREGIR BUSQUEDAS MUCHOS PACIENTES...
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

### CONECTIVIDAD (Monitor Desarrollado por Pablo)

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

### PROFESIONALES (RR.HH)

- VER
  Nombre, Apellido, Email, Matriculas Provincia/Nacion, Legajo, Documento
  Dia Laboral - Horarios - duracion TURNOS
  Especialidad, US,
  Licensias/No trabajados.(tipos de ausensia)

### Sistema General

- [ ] ‼️ FRONT - Actualizar (VUE 2, Vuetify 1 -> VUE 3, Vuetify 2-3) =>
      <progress value="12" max="100"></progress> 12%
  - [/] Fase 1: Preparacion
    - [x] Actualizar a VUE 2.7
    - [x] Instalar ESLint: eslint-plugin-vue
    - [ ] Migrar de Vuex a Pinia
  - [ ] Fase 2: Hibrido
    - [ ] Instalar @vue/compat
    - [ ] Configurar Webpack para VUE 3
    - [ ] Corregir Errores de VUE
  - [ ] Fase 3: VISUAL
    - [ ] Vuetify 3
    - [ ] Codemods / ESLint: Usa eslint-plugin-vuetify
  - [ ] Fase 4: Limpieza
    - [ ] Eliminar @vue/compat
    - [ ] Instalar VUE 3
    - [ ] Webpack a Vite (Borra webpack.config.js y core-js, e instala @vitejs/plugin-vue) [Migrate](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)

- [ ] ‼️ SERVIDOR - Actualizar (Ubuntu, Node, MongoDB(5 -> 8), PM2, Nginx?) =>
      <progress value="0" max="100"></progress> 0%
  - [ ] Fase 1: Preparación y Node.js (Semana 1)
    - [ ] ‼️ Node => 20.19.5 -> 24.x.x (Remove the old repository, add new repository, sudo apt-get install -y nodejs)
    - [ ] PM2 => 5.4.0 -> 6.x.x

  - [ ] Fase 2: El primer salto de Sistema Operativo (Semana 2)
    - [ ] ‼️ Ubuntu Server => 20.04 -> 22.04 (1 week test before the next update)

  - [ ] Fase 3: Base de Datos y Segundo salto de S.O. (Semana 3-4)
    - [ ] ‼️ MongoDB => 5.0 -> 6.0 (7 dias) -> [Compatibility](https://www.mongodb.com/docs/v6.0/release-notes/6.0-compatibility/)
    - [ ] Ubuntu Server => 22.04 -> 24.04 (7 dias)

  - [ ] Fase 4: Instalación de Nginx y Estabilización (Semana 5)
    - [ ] Nginx => x.x
    - [ ] SSL: Configura Certbot (Let's Encrypt) para HTTPS
    - [ ] MongoDB => 6.0 -> 7.0 (7 dias)
    - [ ] MongoDB => 7.0 -> 8.0 (7 dias)

- [ ] ‼️ BACK - Actualizar (Express, Mongoose) =>
      <progress value="0" max="100"></progress> 0%
  - [ ] Fase: Desarrollar Steps
    - [x] Instalar ESLint.
    - [ ] express => 4.21.2 -> 5.2.1 (Breaking Changes, Rutas changes)
    - [ ] Mongoose => 8.21.0 -> 9.x.x (MongoDB v6.0+)

- [ ] Areas -> Migrar subsecretarias a areas y borrar el campo subsecretaria.

- [ ] Cambiar Libreria de xlsx (Excel..)
      Por el momento usa una libreria en el server...
      "vue-xlsx" para el front xlsx to json...

- [/] Front -> Fontawesome ??
  https://stackoverflow.com/questions/52030435/fontawesome-with-vuetify-how-to-include-font-awesome-icons-within-the-v-icon-c
  https://v15.vuetifyjs.com/es-MX/framework/icons
  Tener en cuenta.. VER
  https://fontawesome.com/docs/web/add-icons/svg-symbols
  https://v2.vuejs.org/v2/style-guide/?redirect=true#Self-closing-components-strongly-recommended

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

### Sistema Secundario

- [ ] Seasonal Branding...
      Fecha | Evento -> Estilo (SVG para logos - sonidos)
  - [ ] 01 Ene | Año Nuevo -> Logo con destellos dorados. Fondo con gradiente festivo suave.
  - [ ] 04 Feb | Día Mundial contra el Cáncer -> Cinta color lavanda en el logo. Notificación de chequeo preventivo.
  - [ ] 08 Mar | Día de la Mujer -> Detalles en color violeta. Banner de salud femenina.
  - [ ] 24 Mar | Día de la Memoria -> Estilo sobrio (escala de grises o blanco/negro). Pañuelo blanco sutil.
  - [ ] 02 Abr | Día del Veterano y de los Caídos -> Colores celeste y blanco. Silueta de las Malvinas en el footer.
  - [ ] 07 Abr | Día Mundial de la Salud -> Estilo institucional fuerte. Sonido de pulso cardíaco rítmico al iniciar.
  - [ ] 25 May | Revolución de Mayo -> Escarapela en el logo. Bordes de botones en celeste/blanco.
  - [ ] 30 May | Día de la Donación de Órganos -> Ícono de corazón verde. Estilo enfocado en "vida/esperanza".
  - [ ] 20 Jun | Día de la Bandera -> Logo con bandera argentina. Fondo con sutil textura de sol de mayo.
  - [ ] 09 Jul | Día de la Independencia -> Versión del logo "Patria". Sonido de campanas sutil al login.
  - [ ] 17 Ago | Paso a la Inmortalidad de San Martín -> Estilo épico/histórico. Tonos azules oscuros y bronce.
  - [ ] 21 Sep | Día de la Sanidad / Primavera -> Flores en el logo. Sonido de naturaleza. Agradecimiento al personal.
  - [ ] 12 Oct | Día de la Diversidad Cultural -> Estilo multi-color (wiphala) integrado sutilmente en el footer.
  - [ ] 19 Oct | Día lucha contra el Cáncer de Mama -> Todo el sistema con acentos rosa. Logo con la cinta rosa.
  - [ ] 14 Nov | Día Mundial de la Diabetes -> Círculo azul en el logo. Acentos en azul brillante.
  - [ ] 01 Dic | Día Mundial del SIDA -> Cinta roja en el logo. Alertas de prevención en rojo médico.
  - [ ] 08 Dic | Día de la Virgen -> Estilo celeste claro y blanco nve.
  - [ ] 25 Dic | Navidad -> Gorro de papá Noel en el logo. Sonido de cascabel muy suave (blip).

- [ ] Multi Languaje, migrar Front Strings and errorHandlers too...
      https://github.com/i18next/i18next-vue/tree/vue-2

- [ ] Aviso de uso de Cookies (localStorage) (Snackbar, bottom?).

- [ ] TESTS Units BACK with node:test (NodeJS 20+), FRONT with JEST (VUE 2) -> Vitest (VUE 3).

- [ ] Name Domain para el sitio a futuro online e intranet
      secretariadesaludmoreno
      preparar los certificados correspondientes
  - [ ] VER EL TEMA DE CORS EN PRODUCCION (cuando tenga nombre de dominio).
