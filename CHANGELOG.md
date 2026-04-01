# Changelog (Historial de Cambios)

<br />

## Known Issues (Problemas Conocidos)

<br />

- Excels descargados - El Formato y la extension del archivo no coinciden (.xls), abrir de todos modos.
  🤕 **Solucion Temporaria:** [Video en Youtube](https://www.youtube.com/watch?v=fz8Foga0InM&list=PLqJxYXwAoKrQQB5dS2-LnIEUYpeswAmIq&index=9).

<br />

#### Unreleased - W.I.P. (Work in Progress)

<!--
- 🩹 Fixed a XXX - YYY => NNN.
- ✨ Added a XXX - YYY => NNN. Propuesto por ...
- 📈 Improved a XXX - YYY => NNN.
- 🚨 Changed a XXX - YYY => NNN.
- ‼️🗑️ Removed a XXX - YYY => NNN.
-->

---

- 💡 <a href="./ToDo" target="_self">Continuara... Lista de cosas para hacer (ToDo List).</a> 😅

---

### [1.7.20260401] - 2026-04-01

- ✨ Added a Sistema - Upload => Se agrego la posibilidad de arrastrar y soltar archivos (drag and drop).

- 🩹 Fixed a Farmacia - Alta Insumos => Error al completar datos de alta y edicion (Front).

- 🩹 Fixed a Vacunas - Alta Vacunas => Error al completar datos de alta y edicion (Front).

### [1.7.20260313] - 2026-03-13

- 📈 Improved a Sistema - Tablas => El campo de busqueda "filtro" (search local) no era muy visible, se le agrego colores de fondo para que tenga mas contraste.

- ✨ Added a Sistema - Paciente => Se agrego el campo opcional "DNI N° Tramite" para los casos de tipo de documento DNI, siendo solicitado por Farmacia para las entregas del PAMI.

- ✨ Added a Farmacia - Entregas => Nuevo Paso(Step) de carga para revisar las entregas previas recibidas por el Paciente. Propuesto por Direccion de Farmacia.

- ✨ Added a Farmacia - Entregas => Se agrego el campo "DNI N° Tramite", siendo requerido para las entregas del PAMI, editable desde el formulario del Paciente.

- 📈 Improved a Vacunas - Aplicacion => Antes de guardar la aplicacion se verifica si ya se encuentra una "similar" aplicada a ese paciente en la fecha de aplicacion seleccionada (Fecha, Paciente, Vacuna, Dosis), comunica el error en caso de que ya se encuentre aplicada.

### [1.7.20260114] - 2026-01-14

- ✨ Improved a Sistema - requestAPI => Al realizar envios al servidor se bloquean las posteriores solo si son repetidas y estan esperando respuesta, se desbloquea la posibilidad de realizar otro envio despues de 1 segundo de recibir la respuesta (para evitar problemas cuando el usuario "ametralle" el botón de envios).

- ✨ Improved a Vacunas - Aplicacion => Cuando se le pregunta al vacunador si desea realizar otra vacunacion, ahora tiene opciones: "Misma Persona", "Otra Persona" y "No". Propuesto por Laura del Vacunatorio Central.
- 🩹 Fixed a Vacunas - CIPRES => Verificacion previa al realizar la aplicacion: Cuando los planes de Vacunacion coincidentes son mas de uno, ahora se selecciona siempre uno, teniendo en cuenta la poblacion especial y el rango de edad en que la dosis aplicada pertenece. Improve seleccion de Neumococo (20) Conjugada (Nomivac 216)

### [1.7.20260109] - 2026-01-09

- 🌲 Changed a Sistema - No Navidad => Ahora los logos y el sonido de error no tienen un estilo navideño.
- 🩹 Fixed a Sistema - Usuarios => Editar Usuarios, si tenia un permiso comun y no tenia un permiso especial de los generales (Farmacia/Vacunas), entonces al editar no aparecia la opcion de agregarle los permisos generales.
- 🩹 Fixed a Sistema - PDFs => Se arreglo que cuando se clickeaba en "Descargar PDF", si luego se cancelaba la descarga y por ultimo se clickeaba en "Mostrar PDF", el PDF que se mostraba tenia el doble de contenido. (ahora pdfGen({}) usa parametros en formato de objeto)

- 🚨 Changed a Bromatologia - Formulario => Los campos donde decian "Barrio" ahora dicen "Localidad" y es un Select con las siguientes opciones: Moreno, Paso del Rey, La Reja, Trujui, Cuartel V, Francisco Alvarez y Otros. Propuesto por Jasid Sebastian, Director.

- ✨ Added a Vacunas - Aplicaciones => En el Reporte "Vacunaciones" se agrego el Total de Pacientes Atendidos y el Total de Aplicaciones realizadas por Vacunatorio. Propuesto por Ariel de Casasco.
- 🚨 Changed a Vacunas - CIPRES => Cuando los planes de Vacunacion coincidentes son mas de uno, ahora se selecciona siempre uno, teniendo en cuenta la poblacion especial y el rango de edad en que la dosis aplicada pertenece. Improve seleccion de Neumococo (20) Conjugada (Nomivac 216)

### [1.7.20251217] - 2025-12-17

- 🎄 Changed a Sistema - Navidad => Ahora los logos y el sonido de error tiene un estilo navideño.
- ✨ Added a Sistema - Paciente => Se agregaron datos a cargar sobre el responsable del paciente, los cuales son opcionales si es mayor de 1 año, siendo necesarios para la carga en CIPRES de Vacunas.
- 🚨 Changed a Sistema - Paciente => Ahora el Documento repetido se permite si es de diferente sexo. (tipo_doc, documento, sexo).

- ✨ Added a Vacunas - Aplicacion => Al realizar una Vacunacion se le pregunta al vacunador si desea realizar otra vacunacion, esto acelera la carga de aplicaciones a la misma persona pero con diferente fecha de aplicacion. Propuesto por Marisa de la Maternidad Estela de Carlotto.

### [1.7.20251210] - 2025-12-10

- ✨ Added a Sistema - Contraseñas => Se agrego la posibilidad de que el usuario pueda ver lo tipeado en sus campos de contraseña.

- 🩹 Fixed a Vacunas - Aplicacion => Se arreglaron los envios a CIPRES de las Aplicaciones importadas del PSVacunas, lectura de la fecha de nacimiento del paciente.
- ✨ Added a Vacunas - Descartes => Se agrego el Motivo "Politica de Frasco Abierto".
- 📈 Improved a Vacunas - Aplicacion => Se mejoraron los mensajes locales de los posibles errores al realizar envios al CIPRES.

### [1.7.20251028] - 2025-10-28

- 🩹 Fixed a Sistema - Dialogs => Se corrigieron los Dialogs (Ventanitas) que no se cerraban cuando caducaba la sesion o cuando se navegaba con "atras"/"adelante" desde el navegador, quedando abiertos al volver a iniciar sesion, ahora se cierran.
- 📈 Improved a Sistema - Paciente => Se mejoro la comunicacion del componente siendo mas configurable, ahora informa si se borra, cancela, edita o es nuevo el paciente.

- ✨ Added a Vacunas - Aplicacion => Ahora es posible modificar la fecha de nacimiento antes de efectuar la aplicacion.
- 📈 Improved a Vacunas - Aplicacion => Verificar planes en CIPRES, Se mejoro la seleccion del plan teniendo en cuenta la Poblacion Especial, Edad y Estrategia (Motivo | Esquema).
- 📈 Improved a Vacunas - Aplicacion => Se mejoraron los mensajes de error, teniendo en cuenta cuando CIPRES esta caido.
- 🚨 Changed a Vacunas - Aplicacion => Ya no es necesario seleccionar "Edad Unidad" ni la "Edad", la edad de la aplicacion se autocalcula con la fecha de nacimiento.

### [1.7.20250922] - 2025-09-22

- 📈 Improved a Sistema - Confirm | Mensaje | Error => Se mejoraron los mensajes con mucho texto, ahora se puede scrollear el contenido sin perder los botones.

- ✨ Added a Vacunas - Aplicacion => Antes de realizar la aplicacion de Vacunas, ahora se puede Verificar si existe un plan en CIPRES con la informacion cargada de la aplicacion.
- 📈 Improved a Vacunas - Aplicacion => Se mejoraron los mensajes de error al no encontrar un Plan para realizar el registro en CIPRES.
- ✨ Added a Vacunas - Insumos => Vacunas opcion de Dosis -> Dosis Extra (Doble y Triple Viral).

### [1.7.20250827] - 2025-08-27

- 🚨 Changed a Sistema - Nombre => Sistema De Gestion Integral de la Secretaria de Salud de Moreno (Si.G.I.Se.Sa.M) -> Gestion Integral de Salud Moreno (G.I.SA.M.).
- 📈 Improved a Sistema - Confirm => Se mejoraron los mensajes de alerta y confirmacion para que tengan el mismo estilo que el sistema general.

- 🩹 Fixed a Vacunas - Aplicacion => La descarga de PDFs con el boton de "DESCARGAR PDF" no estaba funcionando correctamente.
- 🩹 Fixed a Vacunas - Aplicacion | Reportes => Exportar Reportes y Aplicaciones Nominales ahora muestra correctamente el documento del responsable y se agrego la fecha de nacimiento de los pacientes donde correspondia.
- ✨ Added a Vacunas - Sistema => Ahora se puede configurar y seleccionar la cantidad administrada de la dosis, "Dosis Administrada" puede tomar los siguientes valores "Media dosis", "Doble dosis" o "Dosis completa", la ultima opcion es tomada como por defecto. Mejora compatibilidad con CIPRES.
- ✨ Added a Vacunas - Aplicacion => A la exportacion Nominal en excel se le agregaron los datos del CIPRES, la estrategia utilizada y la cantidad administrada.
- 🚨 Changed a Vacunas - Reportes => El reporte Nominal ahora muestra la cantidad administrada en la vacuna y no la estrategia utilizada.

### [1.7.20250811] - 2025-08-11

- ✨ Added a Vacunas - Aplicacion => Ahora muestra la edad de los pacientes en la que se aplicaron la vacuna en la tabla de busqueda.
- ✨ Added a Vacunas - Aplicacion => Se agregaron los siguientes filtros para ver aplicaciones: "Todas", "Registradas CIPRES", "ERRORES CIPRES", "No Envio CIPRES", "Vencidas".
- ✨ Added a Vacunas - Aplicacion => Cada vacunador puede enviar solamente sus aplicaciones a CIPRES o un Gestor de CIPRES del area.
- ✨ Added a Vacunas - Aplicacion => Todos pueden ver los mensajes de respuesta de CIPRES.
- 📈 Improved a Vacunas - Sistema => Se mejoro la visibilidad de varios campos de seleccion que mostraban muchas opciones deshabilitadas, ahora solamente muestra las opciones con las que cuenta el usuario.
- 🚨 Changed a Vacunas - Sistema => Se modificaron el uso de variables y sus nombres para mejorar futuros cambios y rastreo de errores. -tipo_doc, -documento -doc_responsable -> +ps_tipo_doc, +ps_doc +ps_doc_resp (para historial los valores reales los toma del paciente) | +fec_nac (acelerar reportes por edad).

- 📈 Improved a Farmacia - Sistema => Se mejoro la visibilidad de varios campos de seleccion que mostraban muchas opciones deshabilitadas, ahora solamente muestra las opciones con las que cuenta el usuario.

- 📈 Improved a Sistema - Net => Se mejoro la Deteccion y Notificacion del vencimiento del certificado para la navegacion segura y tambien los casos de no encontrar archivos debido a actualizacion del sistema.
- 🚨 Changed a Sistema - Paciente => Cuando se modifica su fecha de nacimiento y/o sexo -> se actualizaran todas sus aplicaciones que no se registraron en CIPRES con los nuevos datos, re-calculando la edad a la fecha de aplicacion de ser necesario.

### [1.7.20250613] - 2025-06-13

- ✨ Added a Sistema - Usuarios => Se agrego el permiso de Vacunas Cipres para la interoperabilidad con Provincia.
- 📈 Improved a Sistema - Tablas => Se mejoro la visualizacion de los botones de paginacion y filas por pagina (Amarillito).

- 📈 Improved a HICLEM - Expands => Se mejoro el formato de los mismos para que sea mas intuitivo al programador.
- ✨ Added a HICLEM - Expands => Se agregaron los expands de Vacunaciones y de Insumos(Medicamentos) Recibidos del paciente.

- ✨ Added a Vacunas - Alta Vacuna => Se agregaron Dosis Posibles -> Adicional, Dosis Cero, 8va, 9na y 10ma.
- ✨ Added a Vacunas - Alta Vacuna => Se agrego link al SISA para obtener codigos NOMIVAC.
- 📈 Improved a Vacunas - Aplicacion => Ahora la Seleccion de "Origen" solamente muestra las areas con permiso del usuario.
- 🚨 Changed a Vacunas - Aplicacion => Se cambiaron las Estrategias -> Se agrego "Atrasado", "Prescripcion Medica", "Grupo de Riesgo", "Por excepcion" y se quitaron "Contactos", "Terreno", "Internacion" y "Pre Exposicion".
- 🚨 Changed a Vacunas - Alta Vacuna => El Condigo NOMIVAC ahora se puede repetir.
- ‼️🗑️ Removed a Vacunas - Alta Vacuna => Se quito la Dosis Posible -> Refuerzo 4to.

- 📈 Improved a Farmacia - Entregas => Ahora la Seleccion de "Origen" solamente muestra las areas con permiso del usuario.
- 🚨 Changed a Farmacia - Descartes => Ahora todos los motivos de descarte tienen la opcion de "Justificacion" siendo para "Error" obligatoria. Propuesto por Marcos Ludueña, Director.

- ✨ Added a Lab Bromatologico - FisicoQuimico => Se agrego el Campo Opcional -> Cloro Residual (CAA 0.2 - 2.0). Propuesto por Jasid Sebastian, Director.
- 🚨 Changed a Lab Bromatologico - Validacion => Ahora la validacion de los rangos del CAA los marca en rojo si estan en el limite.

### [1.7.20250404] - 2025-04-04

- 📈 Improved a Sistema - objectToFind => Se mejora el formato para la busqueda en la base de datos.

- ✨ Added a Sistema - Paciente => Se agrego la posibilidad de Borrar los Pacientes que no han sido utilizados por el sistema.
- ✨ Added a Sistema - Paciente => Se agrego la posibilidad de Cargar la Fecha de Deceso al Paciente.
- ✨ Added a Sistema - Paciente => Al momento de crear/editar muestra la edad del Paciente en base a la Fecha de Nacimiento.
- 🚨 Changed a Sistema - Paciente => El campo de "Responsable Documento" tiene en cuenta la edad del paciente (fecha de nacimiento), siendo REQUERIDO SI ES MENOR DE 1 AÑO. Propuesto por Santa Brigida.

- 🚨 Changed a Vacunas - Aplicacion => Antes se podian Borrar las aplicaciones realizadas en el mismo dia, ahora las aplicaciones las pueden Borrar en cualquier momento, siempre y cuando el usuario sea el mismo que realizo la aplicacion.

### [1.7.20250217] - 2025-02-17

- 🩹 Fixed a HICLEM - Peso => El peso al nacer guardado previamente no se mostraba correctamente seleccionado en segunda carga.
- 🚨 Changed a HICLEM - Antecedentes => "Diabetes (DM)" -> "Diabetes Tipo 1 (DM1)", "Diabetes Tipo 2 (DM2)".

- ✨ Added a Farmacia - Entregas => Nuevo "paso" al realizar Entregas de medicacion que solicita la carga de datos para el Historial Clinico de la persona (HICLEM). Propuesto por Macorin Natalia, Subsecretaria.
- ✨ Added a Farmacia - Entregas => Los Excels de Entregas Nominales (Detallados) ahora tienen las columnas del Historial Clinico de la persona (HICLEM).

- 🩹 Fixed a Patrimonio - Insumos => Entregas permitia entregar cualquier cantidad del insumo cuando el stock estaba en 0, ahora tiene en cuenta la cantidad 0 al igual que cuando habia insumos que no dejaba realizar entregas que superaran el stock; ademas Ingresos permitia ingresar insumos con cantidad en 0 lo cual no tenia sentido, ya solucionado.

### [1.7.20250127] - 2025-01-27

- ✨ Added a Sistema - Cliente => Revisa la version del Cliente cada 10 min, notifica si hay una nueva version y recomienda recargar pagina para actualizar.
- 📈 Improved a Sistema - v-tooltip => Se les agrego el close-delay="0".
- 📈 Improved a Sistema - getEdad => Ahora puede calcular con la opcion "formatString" la edad completa entre dos fechas (años, meses y dias), ademas de que interpreta el rango de fechas seleccionadas (mide de menor a mayor).

- ✨ Added a Vacunas - Aplicacion => Al momento de aplicar ahora muestra la Edad completa del paciente (años, meses y dias), asi como tambien los dias y semanas cumplidas.
- ✨ Added a Vacunas - Aplicacion => Ahora se puede Exportar Nominal o Totales en formato PDF o Exel.
- ✨ Added a Vacunas - Stock => Se agrego posibilidad de exportar en formato xls.
- 📈 Improved a Vacunas - Reportes => El reporte de "Stock Movimientos" ahora muestra el filtro utilizado y los insumos cuyo stock es 0.
- 📈 Improved a Vacunas - Stock => Los reportes de stock (general/detallado) ahora muestran el filtro utilizado y los insumos cuyo stock son 0.
- 🚨 Changed a Vacunas - Stock => PDF de STOCK subtotales "por Vencer/Vencidos" -> "Vencidos/Buenos".

- ✨ Added a Farmacia - Entregas => Se agrego una nueva columna con el "Sexo" del paciente al reporte de Entregas Nominal formato Excel.
- 📈 Improved a Farmacia - Reportes => El reporte de "General Detallado" ahora muestra el filtro utilizado y los insumos cuyo stock es 0.
- 📈 Improved a Farmacia - Stock => Los reportes de stock (general/detallado) ahora muestran el filtro utilizado y los insumos cuyo stock son 0.

### [1.7.20241227] - 2024-12-27

- 🩹 Fixed a Sistema - Maps => Fix link to Google Maps, imagen que redirecciona a google Maps, evita uso de APIKEY de Google.
- 🚨 Changed a Sistema - Logos => Se actualizaron todos los logos del sistema incluidos los de los documentos PDF.

- 🩹 Fixed a Vacunas - Aplicacion => El Calculo de edad en base a la fecha de aplicacion se corrigio, antes solo autocalculaba en base a la fecha actual...
- 🚨 Changed a Vacunas - Aplicacion => Los campos de Historial Clinico General tienen en cuenta la edad del paciente, no siendo requeridos el completado de algunos.

- 📈 Improved a Farmacia/Vacunatorio - Estadistica Salidas => Las Salidas no Detalladas se cargan mas rapidamente.
- 🚨 Changed a Farmacia/Vacunatorio - Egresos => El PDF ahora muestra los Egresos Nominales, Utilizados, Clearing y Otro (Descartes con motivos diferentes a Utilizado), antes mostraba los vencido por separado los cuales ahora estan dentro de la categoria "Otro".

### [1.7.20241209] - 2024-12-09

- 🩹 Fixed a Bromatologia - PDFs => Se soluciono error generado por la actualizacion de la libreria que genera los PDF, ahora usa el generador de PDF de Tools/pdf-base.
- 📈 Improved a Vacunatorio - Upload => Ahora tiene en cuenta los pacientes sin documento pero si con documento de un responsable, sin aumentar mucho el tiempo de carga.

### [1.7.20241206] - 2024-12-06

- 🩹 Fixed a Sistema - PDFs => Se soluciono el error de usar el boton de impresion proporcionado por el navegador Firefox cuando se previsualizaba el PDF.
- 🩹 Fixed a Sistema - Sesion => Se corrigieron los mensajes de error para cuando caduca la sesion.
- ✨ Added a Sistema - Sesion => Revisa el estado de la sesion cada 1 hs y en caso de que la sesion haya caducado nos dirige a reloguear.
- ✨ Added a Sistema - Areas => Funcionalidad de Patrimonio (futuro filtro para Patrimonio), codigo de SISA(Nacion) y RUPES(Provincia) para interoperabilidad con CIPRES.
- ✨ Added a Sistema - String => checkIsValidJson(str) -> Revisa si valor string es formato JSON y retorna JSON si es valido sino retorna "undefined".
- ✨ Added a Sistema - Pie de Pagina => Desde el Changelog ahora se puede abrir la Lista de cosas para hacer (ToDo List) del Sistema al clickear sobre "Continuara... Lista de cosas para hacer (ToDo List).".

- ✨ Added a Patrimonio - Movimiento de Bienes -> Cuando la categoria del Bien es "Monitor" permite modificar la PC Asociada en el movimiento.
- ✨ Added a Vacunatorio - Insumo -> Nueva categoria "Otros" para las Agujas, Diluyente, y Descartadores.
- 📈 Improved a Farmacia - Reportes => El reporte de "Stock Total" ahora muestra el filtro utilizado y los insumos cuyo stock es 0.
- 🚨 Changed a Farmacia/Vacunatorio - Stock => La referencia de colores en base al Stock ahora usan gamas del color rosa, para diferenciarlo de los basados en el Vencimiento (Rojo/Anaranjado).

### [1.7.20241004] - 2024-10-04

- 📈 Improved a Sistema - \_id => Se mejoraron las relaciones entre colecciones de datos, cuando falta un documento de la relacion este podia generar errores.
- 📈 Improved a Sistema - Pacientes => Upload el campo "dir_calle" y "dir_descripcion" ahora valida mejor si estan vacios.

- 🚨 Changed a Sistema - Pacientes => Upload el campo "direccion" ahora se analiza -> si tiene valores numericos como ultimo valor de su cadena lo agrega a dir_numero si es que no existe y el resto lo agrega a dir_calle si es que no existe, por lo tanto si los campors dir_calle y dir_numero existen el campo direccion no es tenido en cuenta.

- 🩹 Fixed a Sistema - PDFs => Se soluciono el error (Error: Error de red) de usar el boton de descarga proporcionado por el navegador Chromium cuando se previsualizaba el PDF.

- 🚨 Changed a Farmacia - Reportes => El Reporte Detallado ahora tiene la fecha "Hasta" liberada para filtrar los movimientos (Ingresos/Egresos).

### [1.7.20240923] - 2024-09-23

- 📈 Improved a Sistema - Botones => v-card-actions se mejoro el responsive con v-layout row wrap.
- 📈 Improved a Sistema - Alerts/Dialogs => Carteles de error mejoran la deteccion del mismo error repetido y se cambiaron los "alert" por dialogs de Vue.
- 📈 Improved a Sistema - Objetos => Los clonados con stringify() / Obect.assign() / {... , ...} se cambio a structuredClone({... , ...}).
- 📈 Improved a Sistema - Unique Values => Se mejoraron los mensajes de error para cuando los valores deben ser unicos y se estan repitiendo.

- ✨ Added a Sistema - Pie de Pagina => Abre el Changelog del Sistema al clickear sobre la version en el pie de pagina.
- ✨ Added a Sistema - Pacientes => Upload acepta el campo "direccion" y lo agrega a "dir_descripcion".

- 📈 Improved a Farmacia/Vacunatorio - Stock/Entrega/Aplicacion => Ahora los Insumos que no tienen vencimiento aparecen ultimos cuando se los lista.
- 📈 Improved a Farmacia/Vacunatorio - Rutas Backend => Improve count of deleted documents with preserveNullAndEmptyArrays.

- ✨ Added a Farmacia - Entrega => Buscar -> tabla con telefono de paciente +filtro por categoria +reporte no detallado.
- ✨ Added a Farmacia - Entrega => Exportar Detallado o Totales en formato PDF o Exel.

### [1.7.20240906] - 2024-09-06

- 🚨 Changed a Lab Bromatologico - FisicoQuimico => Campos Obligatorios a Opcionales -> Arsenico, Dureza, Alcalinidad, Sulfatos, Cloruros, Nitratos.
- 🚨 Changed a Lab Bromatologico - PDF - FisicoQuimico => Sulfato cuando valor es menor 200 aparece como texto -> "<200".
- 🚨 Changed a Lab Bromatologico - PDF - FisicoQuimico => Arsenico cuando valor es menor 0.01 aparece como texto -> "<0.01".

- 🩹 Fixed a Vacunatorio - Reporte => Aplicacion filtro -> Cuenta vacunaciones aplicadas por el sistema y el PS, pero no las de procedencia historial, no tiene en cuenta el filtro de Procedencia ahora...
- 🩹 Fixed a Vacunatorio - Reporte => Nominal -> la opcion "Menores de 15" -> ahora no cuenta los sin edad.

- ✨ Added a Vacunatorio - Reporte => Aplicaciones Resumen (Hoja2).

### [1.7.20240816] - 2024-08-16

- ✨ Added a Sistema - getEdadUnidades => {edad_valor, edad_unidad} -> 'Año', 'Mes', 'Semana', 'Dia', 'Hora'.
- ✨ Added a Sistema - valorInRangoArray => {valor, rangoArray} -> revisa si valor esta en el rango generado por los elementos del array y retorna [min, max].
- ✨ Added a Sistema - valorInMatriz => {valor, matriz} -> revisa si valor esta en el rango de los elementos de la matriz (array de arrays, [[min,max],..]) y retorna [min, max].

- 🚨 Changed a HICLEM - Historial Gral => Se cambio fecha de Embarazada con Semana de Emabarazo.

- 🩹 Fixed a Vacunatorio - Upload => PS id de Areas -> +Vacunatorio Movil +Salud Comunitaria +Salud Mental.
- 🩹 Fixed a Vacunatorio - Reporte => Aplicacion filtro -> fecha no TimeZone.

### [1.7.20240719] - 2024-07-19

- 📈 Improved a Sistema - Fechas => updateFechas -> actualiza las fechas al navegar por el aplicativo, corrige errores que ocasionan al dejar la pagina abierta por dias.

- ✨ Added a Farmacia/Vacunatorio - Transferencia => Se agrego al Remito la Fecha Planificada de entrega.
- 🩹 Fixed a Farmacia/Vacunatorio - Ingreso => El color de los ingresos con permiso para recibir en gestion.

- ✨ Added a Vacunatorio - Reporte => Grupo Etario por Vacuna.

### [1.7.20240705] - 2024-07-05

- 🚨 Changed a Lab Bromatologico - PDFs => Se cambiaron, actualizaron, los nombres del area en los encabezados y pie de pagina.

- 📈 Improved a Vacunatorio - Uploads => Ultimos reajustes.

### [1.7.20240624] - 2024-06-24

- ✨ Added a Sistema - Usuarios => campos nuevos opcionales -> documento / legajo / mp (matricula provincial)/ mn (matricula nacional).

- 🩹 Fixed a Farmacia - Ingreso/Transferencia => solucion al problema con el color y el boton habilitado para "retirar/recibir" cuando el usuario solo tiene permiso general de todo.

- 🩹 Fixed a Vacunatorio - Ingreso/Transferencia => solucion al problema con el color y el boton habilitado para "retirar/recibir" cuando el usuario solo tiene permiso general de todo.

### [1.7.20240612] - 2024-06-12

- 📈 Improved a Sistema - Navegacion => La barra de navegacion se podra editar de forma mas sencilla, +href +title array.
- 📈 Improved a Sistema - Upload => Tiempo de espera configurable, ahora al subir archivos no hay tiempo de espera de 10 min.

- 🩹 Fixed a Patrimonio - Movimientos => En el Excel "Destino Area" no se exportaba.

- 🚨 Changed a Farmacia - Entregas => por defecto Busca las entregas de la ultima semana de las salas que tiene en gestion, antes cargaba de todas las salas (liberara sobre carga del servidor).
- 📈 Improved a Farmacia - Solicitudes => Autocompletado del destino Aceptada/Rechazada si solo tiene una gestion.
- 🩹 Fixed a Farmacia - Transferencia => Ver transferencias sin recibir y que no son de nuestra gestion. Acceso denegado al querer cargar la lista de insumos del "origen".

- ✨ Added a Vacunatorio - Videos Tutorial => link a lista de youtube con videos guia de como usar el aplicativo.
- 🚨 Changed a Vacunatorio - Vacunas => Procedencias -> "Region", "Historial", "Paciente", "Carga inicial".
- 🚨 Changed a Vacunatorio - Aplicaciones => por defecto Busca las aplicaciones de la ultima semana de las salas que tiene en gestion, antes cargaba de todas las salas (liberara sobre carga del servidor).
- 📈 Improved a Vacunatorio - Solicitudes => Autocompletado del destino Aceptada/Rechazada si solo tiene una gestion.
- 🩹 Fixed a Vacunatorio - Transferencia => Ver transferencias sin recibir y que no son de nuestra gestion. Acceso denegado al querer cargar la lista de insumos del "origen".

### [1.7.20240509] - 2024-05-09

- 📈 Improved a Sistema - Backend => Servidor se ejecuta mejor, secuencialmente, la BD se prepara para indexar antes de levantar el server web/api.

- 🚨 Changed a Sistema - Pacientes => Tipo de Documento "DNI" solo acepta numeros como Documento.

- ✨ Added a Vacunatorio - Insumos => Nuevos o Editados busca en aplicaciones previas por nombre de vacuna para vincularlo al nuevo.
- 🩹 Fixed a Vacunatorio - Permisos => Para crear/editar pacientes y sus historiales (diagnosticos).

- ✨ Added a Farmacia - Stock => Se agrego posibilidad de exportar en formato xls.

### [1.7.20240404] - 2024-04-04

- 📈 Improved a Sistema - Scrollbar => Si el navegador soporta webkit-scrollbar se carga una version mejor de Scrollbar.

- ✨ Added a Bromatologia - PDF Analisis Bacteriologico -> Cuando conclusion "no cumple" muestra QR con Protocolo de desinfeccion.

- ✨ Added a Patrimonio - Excel Movimiento Insumos -> Exportar nueva columna "Objeto SubCategoria".

- 🚨 Changed a Farmacia - Stock => PDF de STOCK subtotales "por Vencer/Vencidos" -> "Vencidos/Buenos".
- ‼️🗑️ Removed a Farmacia - Insumos => Categoria Vacuna.

- ✨ Added a Vacunatorio - Nuevos subsistema similar al de Farmacia (gestion de stock y aplicacion nominal).

### [1.7.20240228] - 2024-02-28

- ✨ Added a Sistema - Object => Funcion global arrayFromSumarPropsInArrays() mejora global para fusionar datos para reportes.
- 🚨 Changed a Sistema - String => Funcion global capitalize() mejora el capitalizado de palabras del "medio" como articulos, conjunciones y Preposiciones.

- ✨ Added a Sistema - Pacientes => Municipio y Responsable Documento -> +dir_municipio +doc_responsable.
- ✨ Added a Sistema - Pacientes Busqueda => Responsable Documento y ID del PS -> +doc_responsable +ps_id.
- 🚨 Changed a Sistema - Pacientes => Apellido y Nombre acepta mas caracteres especiales "'`´¨-".

- 🚨 Changed a Bromatologia - PDFs => Telefono en pie de pagina 0237-4685643 -> 0237-4669234.

- 🚨 Changed a Patrimonio - Objetos => Categoria "Insumos" el modelo es unico, no se podra repetir.

- ✨ Added a Farmacia - Ingresos => Se agrego al filtro "Mostrar" la opcion de "No Transferencias".
- ✨ Added a Farmacia - Solicitudes => Se agrego codigo identificador individual y su PDF correspondiente.
- ✨ Added a Farmacia - Solicitudes => Se agrego cantidad recomendada (opciones minimos).
- 🩹 Fixed a Farmacia - Reporte => Reporte General, los insumos que no tenian stock/solicitud/minimos no reportaban ningun movimiento.

- ✨ Added a Vacunatorio - Reportes => Permite la descarga de las aplicaciones nominal en formato excel (CIPRES).

### [1.7.20240105] - 2024-01-05

- ✨ Added a Sistema - File => crearContentCSV() Funcion para crear contenido de una celda de CSV sin problemas de compatibilidad.
- 📈 Improved a Sistema - File => Crear y Leer archivos grandes que ocasionaban problemas con la memoria del sistema (memoria insuficiente) ahora lo hacen por medio de la tecnologia Stream evitando tal problema.
- 📈 Improved a Sistema - Object => Funcion global isVacio() mejora el control y la manipulacion de tipos de datos.
- 📈 Improved a Sistema - Uploads => Middleware para manejar la subida de archivos.

- ✨ Added a Sistema - Areas => Funcionalidad de Vacunatorio.
- ✨ Added a Sistema - Lugares => Tipo de conectividad.
- ✨ Added a Sistema - Pacientes => Posibilidad de dar de Alta por medio de importar Planillas en formato CSV.
- ✨ Added a Sistema - Vacunaciones => Posibilidad de dar de Alta por medio de importar Planillas en formato CSV.

- ✨ Added a Patrimonio - Consulta Movimientos => Se agrego la posibilidad de Exportar a Excel.

- 📈 Improved a Farmacia - Vacunaciones => Permite aplicaciones de insumos traidos por paciente y previas en otras instituciones.
- 🚨 Changed a Farmacia - Descartes => No se pueden egresar Insumos de Categoria "Vacuna" con motivo de "Utilizado".

### [1.7.20231020] - 2023-10-20

- ✨ Added a Sistema - Fechas => +object.dateUTC -> excelValue to UTC.
- ✨ Added a Sistema - Pacientes => Tipos de Documento -> +Paises. Documento -> alphanumerico.
- 🩹 Fixed a Sistema - Navegacion => Se abria el menu de navegacion cuando se hacia cualquier consulta.

- ✨ Added a Bromatologia - Analaisis => Bacteriologico/Fisico-Quimico -> Nuevas opciones en "Fuente de Analisis" "Dispenser" y "Otros".
- 🩹 Fixed a Bromatologia - Info => Btn Validar ahora se puede presionar mantiendo Ctrl para abrir el link en nuevas pestaña sin problema.

- ✨ Added a Farmacia - Entregas => expandInsumosRecibidos -> Ahora se pueden ver todos los Insumos Recibidos por el Paciente seleccionado.
- 🩹 Fixed a Farmacia - Ingreso => Insumos sin procedencia al no seleccionar Proveedor/Procedencia.

### [1.7.20230906] - 2023-09-06

- ✨ Added a Sistema - Navegacion => Abre automaticamente el menu de navegacion al loguear o recargar la pagina.
- 🚨 Changed a Sistema - Navegacion => Vacunaciones y Farmacia Entregas estan afuera de un submenu.

- 🩹 Fixed a Farmacia - Transferencia => Color de vencimientos en base a la fecha de la trasnferencias y no a la del dia de la consulta.
- 🩹 Fixed a Farmacia - Entregas/Descartes => Recargar Stock al abrir de nuevo el dialog.
- 🩹 Fixed a Farmacia - Vacunaciones-Imprimir => Permiso de Vacuna.
- ✨ Added a Farmacia - Vacunaciones => Vacunador (Usuario logueado) obligatorio.
- 🚨 Changed a Farmacia - Vacunaciones => Autocompletar Cantidad con 1 vacuna.

### [1.7.20230830] - 2023-08-30

- ✨ Added a Sistema - Usuario => Permiso de +farmacia.vacunas.
- 🩹 Fixed a Sistema - Usuario => Buscar No mostraba el campo de Opciones (Minimos).
- ✨ Added a Sistema - Pacientes => Posibilidad de dar de Alta y Editar Pacientes al permiso de +farmacia.vacunas.
- ✨ Added a Sistema - Pacientes => Un componente para la busqueda y seleccion de Pacientes (selectPaciente).
- 📈 Improved a Sistema => Mejor aprovechamiento de espacios en general (margin/padding).
- 📈 Improved a Sistema => objectSetUnset -> forma de objeto y se agrego +unsetBoolean.
- ✨ Added a Sistema => +getEdad +getDiferenciaDias -> Funciones para manejar mejor las fechas.
- 🩹 Fixed a Sistema - v-expansion-panel => deprecated v-model expandOpen => +expandPanel.

- 🚨 Changed a Farmacia - Entregas => Ahora la Entrega cuenta de dos "pasos", primero la seleccion del Paciente mediante filtros para la busqueda y luego se procede a buscar el Inusmo, esto mejorara los tiempos de carga porque cada vez que se iba a realizar una entrega el sistema "descargaba" todos los pacientes del Sistema.
- 🚨 Changed a Farmacia - Entregas => Ahora se pueden entregar a Pacientes todas las categorias de insumos menos las "Vacunas". +Higiene/Limpieza +Varios
- ‼️🗑️ Removed a Farmacia - Entregas => No se podran entregar mas Insumos de Categoria Vacuna, las mismas seran Aplicadas desde su Seccion.
- 🩹 Fixed a Farmacia - Entregas/Descartes => No se podian borrar las entregas/Descartes realizadas segun la fecha de carga (retirado).

- 🩹 Fixed a Farmacia - Transferencia => Remito, PDF -> tabla quedaba afuera de la hoja A4.

- ✨ Added a Farmacia - Egresos => Nuevo Motivo "Rotura cadena de Frio".

- 🚨 Changed a Farmacia - Ingresos => El Ingreso de insumos con Categoria "Vacuna" requieren obligatoriamente los campos de Lote y Vencimiento.

- ✨ Added a Farmacia - Insumos => Los insumos con Categoria "Vacuna" requieren obligatoriamente el campo de Dosis Posibles y Opcional las Condiciones de Aplicacion.

- 🚨 Changed a Farmacia - Solicitudes => Ahora es obligatorio un campo nuevo de Categoria de insumos, el cual servira para diferenciar las solicitudes.

- ✨ Added a Farmacia => Las listas de insumos ahora permiten borrar el primer elemento.

- ✨ Added a HICLEM - Historial Gral => +Embarazada +Puerpera +Prematuro +Peso_nacer_menor_2500 +Peso_nacer_mayor_3800 +Fuma +Antecedentes +inmunodeprimida +Zona Sanitaria

- ✨ Added a Patrimonio - Objeto/Movimiento/Info => +Lugar -> ubicacion fisica del objeto con direccion e IP.
- 🩹 Fixed a Patrimonio - Excel => inventario/serie -> numeros que inician con 0 o -0... generaban que se omitieran los 0.

### [1.7.20230710] - 2023-07-10

- ✨ Added a Sistema - Pacientes => Nuevo campo opcional para agregar un Telefono Alternativo del Paciente.
- 📈 Improved a Sistema - Fechas => +object.dateUTC => Mensajes de error centralizados.
- 📈 Improved a Sistema - PDF => key_fillColor => Mejor personalizacion.
- 🩹 Fixed a Sistema - Store => Requerido => Ahora tiene en cuenta el valor del 0 (cero) antes no lo contaba como valor posible.

- ✨ Added a Farmacia - Insumos => Advertencia al Crear insumos, revisar que no este ya Creado.

- 🚨 Changed a Farmacia - Ingreso => Colores.
- ✨ Added a Farmacia - Ingreso => +Referencia de Colores, +nuevo filtro Mostrar "Aptos para que Recibamos".

- 🚨 Changed a Farmacia - Transferencias => Colores.
- ✨ Added a Farmacia - Transferencias => +Referencia de Colores, +nuevo filtro Mostrar "Aptos para que Recibamos" y "Aptos para que Retiremos".

- 🚨 Changed a Farmacia - Stock => Colores.
- ✨ Added a Farmacia - Stock => +Referencia de Colores, +nuevo filtro Mostrar "Por Debajo Del Recomendado", "Proximo Al Recomendado".
- 📈 Improved a Farmacia - Stock => PDFs => Stocks en cero (con color rojo) segun las opciones de Minimos Recomendados.

- ✨ Added a Farmacia - Opciones => Posibilidad de agregar "Minimos Recomendados" de "Insumos" por "Farmacia", con el cual varios reportes tendran en encuenta estos valores.

- ✨ Added a Farmacia - Reportes => En el PDF General Detallado se agrego la columna de "Cantidad Recomendada" en base a los minimos seleccionados en Opciones, y la columna de Stock cambia de color en base a su proximidad a la "Cantidad Recomendada".
  -Rojo : el Stock es 0.
  -Anaranjado : El Stock es menor a la "Cantidad Recomendada".
  -Amarillo : El Stock es menor a la "Cantidad Recomendada" x 1.2.
- ✨ Added a Farmacia - Reportes => En el PDF Stock Total del Sistema se agregaron los insumos con cantidad 0 en color Rojo.

- ✨ Added a Farmacia - Egresos => +Referencia de Colores.
- ✨ Added a Farmacia - Solicitudes => +Referencia de Colores.

- 📈 Improved a Farmacia - Dialogs => Responsive => Mejora la lectura de la celda de Insumo en pantallas mas chicas.
- 🩹 Fixed a Farmacia - Salidas => Estadistica => No estaba teniendo en cuenta la fecha de los filtros.
- 🩹 Fixed a Farmacia - Transferencias => Remito => El color en la columna de Vencimientos segun sus fechas no se estaban reflejando en el PDF.

### [1.7.20230621] - 2023-06-21

- ✨ Added a Sistema - Usuarios => Permiso farmacia.general.opciones para configurar los minimos de insumos en Farmacias.
- ✨ Added a Sistema - Confirm => Se agrego dialog global para confirmacion de funciones.
- 📈 Improved Sistema - Mensajes => Mejor detallados, formato/estilo de texto y sonido en errores.
- 📈 Improved a Sistema - Index => pageLoading => Ahora solo se muestra si el navegador permite scripts sino dialogo de error.
- 📈 Improved a Sistema - Fechas => +object.dateUTC => fecha UTC con TimezoneOffset.
- 📈 Improved a Sistema - pdfGen => +generarPDF() => Ahora muestra problemas al generar PDF y no genera PDF en blanco.

- ✨ Added a Farmacia - Egresos => Egresos con motivo "Error" ahora solicitara una "Justificacion" Obligatoria.
- 📈 Improved Farmacia - Transferencia => Ahora permite modificar el campo de "Observacion" si algun insumo no se logro retirar.
- 🩹 Fixed a Farmacia - Transferencia => Formato de Fecha/hora de los encabezados en los Remitos.

- 📈 Improved a Patrimonio - Crear Bien => Mensaje de error, cuando no fallaba y se actualizo codigo con requestAPI.
- 🩹 Fixed a Patrimonio - Editar Bien => Al editarse un Insumos con cantidad 0, este perdia la cantidad y con el sus propiedades de entrega/deposito.

### [1.7.20230609] - 2023-06-09

- ✨ Added a Sistema => Muestra un "Cargando..." cuando se esta cargando la app.. Notable con conexiones lentas.
- 🩹 Fixed a Sistema - Dialogs => Ahora muestran bien el primer mostrarLoading, en conexiones lentas se notaba mucho mas.

- ✨ Added a Farmacia - Entregas/Egresos => Fecha de Carga con hora y minutos.
- 🚨 Changed a Farmacia - Entregas/Egresos => Ahora permite borrar las Entregas/Egresos creados en el mismo dia, independientemente de la fecha seleccionada por el usuario.
- 📈 Improved a Farmacia - componentEgresoInsumo => input de insumos.
- 🩹 Fixed a Farmacia - Insumos => Visibilidad del boton de Borrar.
- 🩹 Fixed a Farmacia - Ingresos/Transferencias => Formato de Fecha, Hora, en los Dialogs.
- 🩹 Fixed a Farmacia - Ingresos => Los cargados en versiones anteriores se mostraban mal las procedencias de los mismos.

### [1.7.20230531] - 2023-05-31

- ‼️🗑️ Removed a Farmacia - Ingresos => Carga inicial, Autorecibir.

- ✨ Added a Farmacia - Ingresos => Posibilidad de filtrar/mostrar solamente los Ingresos "Sin Recibir" o "Recibidos".
- ✨ Added a Farmacia - Transferencia => Posibilidad de filtrar/mostrar solamente las Transferencias "Sin Recibir", "Sin Retirar" o "Recibidos".
- ✨ Added a Farmacia - Solicitudes => Posibilidad de filtrar/mostrar solamente las Pendientes, Emergencias, Urgencias, Rutinas, Aceptadas o Rechazadas.
- ✨ Added a Farmacia - Ingresos/Transferencias/Solicitudes => Ahora guardan el horario en que fueron Creadas, Retiradas, Recibidas, Aceptadas y Rechazadas. Las fechas guardadas previamente a este cambio se mostraran con fecha de un dia anterior y horario 21:00hs por el cambio horario UTC-03:00.

- ✨ Added a Farmacia - Reporte => General Detallado -> Se agregaron los Filtros de Fecha, Farmacia, Insumo y Procedencia, permitiendo seleccionar Maximo 5 Areas/Farmacias, antes realizaba el reporte de todas las Areas/Farmacias existentes y generaba mucha carga en el servidor.
- 🚨 Changed a Farmacia - Reporte => General Detallado -> Los Ingresos y Egresos ahora los suma en base a los filtros agregados y no en base al ultimo ingreso, por lo tanto se quito la columa de fecha de ingreso.
- ✨ Added a Farmacia - Reporte => Stock Total del Sistema -> Se agregaron los Filtros de Insumo, preseleccionar antes de realizar el Reporte.

- 🚨 Changed a Farmacia - Insumos => Insumos mal cargados pueden ser borrados sino han sido utilizados.

### [1.7.20230512] - 2023-05-12

- 🚨 Changed a Farmacia - Entregas => Filtro Inicial Fecha Desde: Principio de mes anterior => Semanda Pasada.
  (disminuira la cantidad de entregas cargadas en la primera carga si necesitan ver cargas pasadas todavia pueden modificar el filtro con la fecha necesaria)

- ✨ Added a Farmacia - Ingreso => Proveedores -> PURPSI, Open Door.
- ✨ Added a Farmacia - Entregas => Categoria de Insumos Medicamento, Vacuna -> +Alimento, +Enfermeria/Medico.
- ✨ Added a Farmacia - Entregas => Posibilidad de Borrar las Entregas de la fecha del dia actual (recupera el stock).
- ✨ Added a Farmacia - Egresos => Posibilidad de Borrar los Egresos de la fecha del dia actual (recupera el stock).
- ✨ Added a Farmacia - Transferencias => Remito PDF ahora imprime tambien la observacion guardada.
- 🩹 Fixed a Farmacia - modificarStockInc => Cuando la cantidad ya no esta en stock, mensajes de errores.
