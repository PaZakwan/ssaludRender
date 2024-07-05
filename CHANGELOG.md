## Changelog

## Known Issues

- Chromium:
  - Descargar PDFs - (Error: Error de red) Usando el boton proporcionado por el navegador cuando previsualiza el PDF.
    Solucion Temporaria: https://youtu.be/kRvcB-4OXak o navegadores con otro motor como Firefox/Safari.
    Info Tech: https://support.google.com/chrome/thread/47987652/failed-network-error-when-click-download-a-pdf-file-in-blob-url?hl=en
    https://bugs.chromium.org/p/chromium/issues/detail?id=892133
    https://bugs.chromium.org/p/chromium/issues/detail?id=1224027

##### Unreleased

##### [1.7.20240705] - 2024-07-05

- Changed a Laboratorio Bromatologico - PDFs => Se cambiaron, actualizaron, los nombres del area en los encabezados y pie de pagina.

- Improve a Vacunatorio - Uploads => Ultimos reajustes.

##### [1.7.20240624] - 2024-06-24

- Added a Sistema - Usuarios => campos nuevos opcionales -> documento / legajo / mp (matricula provincial)/ mn (matricula nacional).

- Fix a Farmacia - Ingreso/Transferencia => solucion al problema con el color y el boton habilitado para "retirar/recibir" cuando el usuario solo tiene permiso general de todo.

- Fix a Vacunatorio - Ingreso/Transferencia => solucion al problema con el color y el boton habilitado para "retirar/recibir" cuando el usuario solo tiene permiso general de todo.

##### [1.7.20240612] - 2024-06-12

- Improve a Sistema - Navegacion => La barra de navegacion se podra editar de forma mas sencilla, +href +title array.
- Improve a Sistema - Upload => Tiempo de espera configurable, ahora al subir archivos no hay tiempo de espera de 10 min.

- Fix a Patrimonio - Movimientos => En el Excel "Destino Area" no se exportaba.

- Changed a Farmacia - Entregas => por defecto Busca las entregas de la ultima semana de las salas que tiene en gestion, antes cargaba de todas las salas (liberara sobre carga del servidor).
- Improve a Farmacia - Solicitudes => Autocompletado del destino Aceptada/Rechazada si solo tiene una gestion.
- Fix a Farmacia - Transferencia => Ver transferencias sin recibir y que no son de nuestra gestion. Acceso denegado al querer cargar la lista de insumos del "origen".

- Added a Vacunatorio - Videos Tutorial => link a lista de youtube con videos guia de como usar el aplicativo.
- Changed a Vacunatorio - Vacunas => Procedencias -> "Region", "Historial", "Paciente", "Carga inicial".
- Changed a Vacunatorio - Aplicaciones => por defecto Busca las aplicaciones de la ultima semana de las salas que tiene en gestion, antes cargaba de todas las salas (liberara sobre carga del servidor).
- Improve a Vacunatorio - Solicitudes => Autocompletado del destino Aceptada/Rechazada si solo tiene una gestion.
- Fix a Vacunatorio - Transferencia => Ver transferencias sin recibir y que no son de nuestra gestion. Acceso denegado al querer cargar la lista de insumos del "origen".

##### [1.7.20240509] - 2024-05-09

- Improve a Sistema - Backend => Servidor se ejecuta mejor, secuencialmente, la BD se prepara para indexar antes de levantar el server web/api.

- Changed a Sistema - Pacientes => Tipo de Documento "DNI" solo acepta numeros como Documento.

- Added a Vacunatorio - Insumos => Nuevos o Editados busca en aplicaciones previas por nombre de vacuna para vincularlo al nuevo.
- Fix a Vacunatorio - Permisos => varios fix para crear/editar pacientes y sus historiales (diagnosticos).

- Added a Farmacia - Stock => Se agrego posibilidad de exportar en formato xls.

##### [1.7.20240404] - 2024-04-04

- Improve a Sistema - Scrollbar => Si el navegador soporta webkit-scrollbar se carga una version mejor de Scrollbar.

- Added a Bromatologia - PDF Analisis Bacteriologico -> Cuando conclusion "no cumple" muestra QR con Protocolo de desinfeccion.

- Added a Patrimonio - Excel Movimiento Insumos -> Exportar nueva columna "Objeto SubCategoria".

- Changed a Farmacia - Stock => PDF de STOCK subtotales "por Vencer/Vencidos" -> "Vencidos/Buenos".
- Removed a Farmacia - Insumos => Categoria Vacuna.

- Added a Vacunatorio - Nuevos subsistema similar al de Farmacia (gestion de stock y aplicacion nominal).

##### [1.7.20240228] - 2024-02-28

- Added a Sistema - Object => Funcion global arrayFromSumarPropsInArrays() mejora global para fusionar datos para reportes.
- Changed a Sistema - String => Funcion global capitalize() mejora el capitalizado de palabras del "medio" como articulos, conjunciones y Preposiciones.

- Added a Sistema - Pacientes => Municipio y Responsable Documento -> +dir_municipio +doc_responsable.
- Added a Sistema - Pacientes Busqueda => Responsable Documento y ID del PS -> +doc_responsable +ps_id.
- Changed a Sistema - Pacientes => Apellido y Nombre acepta mas caracteres especiales "'`´¨-".

- Changed a Bromatologia - PDFs => Telefono en pie de pagina 0237-4685643 -> 0237-4669234.

- Changed a Patrimonio - Objetos => Categoria "Insumos" el modelo es unico, no se podra repetir.

- Added a Farmacia - Ingresos => Se agrego al filtro "Mostrar" la opcion de "No Transferencias".
- Added a Farmacia - Solicitudes => Se agrego codigo identificador individual y su PDF correspondiente.
- Added a Farmacia - Solicitudes => Se agrego cantidad recomendada (opciones minimos).
- Fix a Farmacia - Reporte => Reporte General, los insumos que no tenian stock/solicitud/minimos no reportaban ningun movimiento.

- Added a Vacunatorio - Reportes => Permite la descarga de las aplicaciones nominal en formato excel (CIPRES).

##### [1.7.20240105] - 2024-01-05

- Added a Sistema - File => crearContentCSV() Funcion para crear contenido de una celda de CSV sin problemas de compatibilidad.
- Improve a Sistema - File => Crear y Leer archivos grandes que ocasionaban problemas con la memoria del sistema (memoria insuficiente) ahora lo hacen por medio de la tecnologia Stream evitando tal problema.
- Improve a Sistema - Object => Funcion global isVacio() mejora el control y la manipulacion de tipos de datos.
- Improve a Sistema - Uploads => Middleware para manejar la subida de archivos.

- Added a Sistema - Areas => Funcionalidad de Vacunatorio.
- Added a Sistema - Lugares => Tipo de conectividad.
- Added a Sistema - Pacientes => Posibilidad de dar de Alta por medio de importar Planillas en formato CSV.
- Added a Sistema - Vacunaciones => Posibilidad de dar de Alta por medio de importar Planillas en formato CSV.

- Added a Patrimonio - Consulta Movimientos => Se agrego la posibilidad de Exportar a Excel.

- Improve a Farmacia - Vacunaciones => Permite aplicaciones de insumos traidos por paciente y previas en otras instituciones.
- Changed a Farmacia - Descartes => No se pueden egresar Insumos de Categoria "Vacuna" con motivo de "Utilizado".

##### [1.7.20231020] - 2023-10-20

- Added a Sistema - Fechas => +object.dateUTC -> excelValue to UTC.
- Added a Sistema - Pacientes => Tipos de Documento -> +Paises. Documento -> alphanumerico.
- Fix a Sistema - Navegacion => Se abria el menu de navegacion cuando se hacia cualquier consulta.

- Added a Bromatologia - Analaisis => Bacteriologico/Fisico-Quimico -> Nuevas opciones en "Fuente de Analisis" "Dispenser" y "Otros".
- Fix a Bromatologia - Info => Btn Validar ahora se puede presionar mantiendo Ctrl para abrir el link en nuevas pestaña sin problema.

- Added a Farmacia - Entregas => expandInsumosRecibidos -> Ahora se pueden ver todos los Insumos Recibidos por el Paciente seleccionado.
- Fix a Farmacia - Ingreso => Insumos sin procedencia al no seleccionar Proveedor/Procedencia.

##### [1.7.20230906] - 2023-09-06

- Added a Sistema - Navegacion => Abre automaticamente el menu de navegacion al loguear o recargar la pagina.
- Changed a Sistema - Navegacion => Vacunaciones y Farmacia Entregas estan afuera de un submenu.

- Fix a Farmacia - Transferencia => Color de vencimientos en base a la fecha de la trasnferencias y no a la del dia de la consulta.
- Fix a Farmacia - Entregas/Descartes => Recargar Stock al abrir de nuevo el dialog.
- Fix a Farmacia - Vacunaciones-Imprimir => Permiso de Vacuna.
- Added a Farmacia - Vacunaciones => Vacunador (Usuario logueado) obligatorio.
- Changed a Farmacia - Vacunaciones => Autocompletar Cantidad con 1 vacuna.

##### [1.7.20230830] - 2023-08-30

- Added a Sistema - Usuario => Permiso de +farmacia.vacunas.
- Fix a Sistema - Usuario => Buscar No mostraba el campo de Opciones (Minimos).
- Added a Sistema - Pacientes => Posibilidad de dar de Alta y Editar Pacientes al permiso de +farmacia.vacunas.
- Added a Sistema - Pacientes => Un componente para la busqueda y seleccion de Pacientes (selectPaciente).
- Improve a Sistema => Mejor aprovechamiento de espacios en general (margin/padding).
- Improve a Sistema => objectSetUnset -> forma de objeto y se agrego +unsetBoolean.
- Added a Sistema => +getEdad +getDiferenciaDias -> Funciones para manejar mejor las fechas.
- Fix a Sistema - v-expansion-panel => deprecated v-model expandOpen => +expandPanel.

- Changed a Farmacia - Entregas => Ahora la Entrega cuenta de dos "pasos", primero la seleccion del Paciente mediante filtros para la busqueda y luego se procede a buscar el Inusmo, esto mejorara los tiempos de carga porque cada vez que se iba a realizar una entrega el sistema "descargaba" todos los pacientes del Sistema.
- Changed a Farmacia - Entregas => Ahora se pueden entregar a Pacientes todas las categorias de insumos menos las "Vacunas". +Higiene/Limpieza +Varios
- Removed a Farmacia - Entregas => No se podran entregar mas Insumos de Categoria Vacuna, las mismas seran Aplicadas desde su Seccion.
- Fix a Farmacia - Entregas/Descartes => No se podian borrar las entregas/Descartes realizadas segun la fecha de carga (retirado).

- Fix a Farmacia - Transferencia => Remito, PDF -> tabla quedaba afuera de la hoja A4.

- Added a Farmacia - Egresos => Nuevo Motivo "Rotura cadena de Frio".

- Changed a Farmacia - Ingresos => El Ingreso de insumos con Categoria "Vacuna" requieren obligatoriamente los campos de Lote y Vencimiento.

- Added a Farmacia - Insumos => Los insumos con Categoria "Vacuna" requieren obligatoriamente el campo de Dosis Posibles y Opcional las Condiciones de Aplicacion.

- Changed a Farmacia - Solicitudes => Ahora es obligatorio un campo nuevo de Categoria de insumos, el cual servira para diferenciar las solicitudes.

- Added a Farmacia => Las listas de insumos ahora permiten borrar el primer elemento.

- Added a HICLEM - Historial Gral => +Embarazada +Puerpera +Prematuro +Peso_nacer_menor_2500 +Peso_nacer_mayor_3800 +Fuma +Antecedentes +inmunodeprimida +Zona Sanitaria

- Added a Patrimonio - Objeto/Movimiento/Info => +Lugar -> ubicacion fisica del objeto con direccion e IP.
- fix a Patrimonio - Excel => inventario/serie -> numeros que inician con 0 o -0... generaban que se omitieran los 0.

##### [1.7.20230710] - 2023-07-10

- Added a Sistema - Pacientes => Nuevo campo opcional para agregar un Telefono Alternativo del Paciente.
- Improve a Sistema - Fechas => +object.dateUTC => Mensajes de error centralizados.
- Improve a Sistema - PDF => key_fillColor => Mejor personalizacion.
- Fix/Improve a Sistema - Store => Requerido => Ahora tiene en cuenta el valor del 0 (cero) antes no lo contaba como valor posible.

- Added a Farmacia - Insumos => Advertencia al Crear insumos, revisar que no este ya Creado.

- Changed a Farmacia - Ingreso => Colores.
- Added a Farmacia - Ingreso => +Referencia de Colores, +nuevo filtro Mostrar "Aptos para que Recibamos".

- Changed a Farmacia - Transferencias => Colores.
- Added a Farmacia - Transferencias => +Referencia de Colores, +nuevo filtro Mostrar "Aptos para que Recibamos" y "Aptos para que Retiremos".

- Changed a Farmacia - Stock => Colores.
- Added a Farmacia - Stock => +Referencia de Colores, +nuevo filtro Mostrar "Por Debajo Del Recomendado", "Proximo Al Recomendado".
- Improve a Farmacia - Stock => PDFs => Stocks en cero (con color rojo) segun las opciones de Minimos Recomendados.

- Added a Farmacia - Opciones => Posibilidad de agregar "Minimos Recomendados" de "Insumos" por "Farmacia", con el cual varios reportes tendran en encuenta estos valores.

- Added a Farmacia - Reportes => En el PDF General Detallado se agrego la columna de "Cantidad Recomendada" en base a los minimos seleccionados en Opciones, y la columna de Stock cambia de color en base a su proximidad a la "Cantidad Recomendada".
  -Rojo : el Stock es 0.
  -Anaranjado : El Stock es menor a la "Cantidad Recomendada".
  -Amarillo : El Stock es menor a la "Cantidad Recomendada" x 1.2.
- Added a Farmacia - Reportes => En el PDF Stock Total del Sistema se agregaron los insumos con cantidad 0 en color Rojo.

- Added a Farmacia - Egresos => +Referencia de Colores.
- Added a Farmacia - Solicitudes => +Referencia de Colores.

- Improve a Farmacia - Dialogs => Responsive => Mejora la lectura de la celda de Insumo en pantallas mas chicas.
- Fix a Farmacia - Salidas => Estadistica => No estaba teniendo en cuenta la fecha de los filtros.
- Fix a Farmacia - Transferencias => Remito => El color en la columna de Vencimientos segun sus fechas no se estaban reflejando en el PDF.

##### [1.7.20230621] - 2023-06-21

- Added a Sistema - Usuarios => Permiso farmacia.general.opciones para configurar los minimos de insumos en Farmacias.
- Added a Sistema - Confirm => Se agrego dialog global para confirmacion de funciones.
- Improve Sistema - Mensajes => Mejor detallados, formato/estilo de texto y sonido en errores.
- Improve a Sistema - Index => pageLoading => Ahora solo se muestra si el navegador permite scripts sino dialogo de error.
- Fix/Improve a Sistema - Fechas => +object.dateUTC => fecha UTC con TimezoneOffset.
- Fix/Improve a Sistema - pdfGen => +generarPDF() => Ahora muestra problemas al generar PDF y no genera PDF en blanco.

- Added a Farmacia - Egresos => Egresos con motivo "Error" ahora solicitara una "Justificacion" Obligatoria.
- Improve Farmacia - Transferencia => Ahora permite modificar el campo de "Observacion" si algun insumo no se logro retirar.
- Fix a Farmacia - Transferencia => Formato de Fecha/hora de los encabezados en los Remitos.

- Fix/Improve a Patrimonio - Crear Bien => Mensaje de error, cuando no fallaba y se actualizo codigo con requestAPI.
- Fix/Improve a Patrimonio - Editar Bien => Al editarse un Insumos con cantidad 0, este perdia la cantidad y con el sus propiedades de entrega/deposito.

##### [1.7.20230609] - 2023-06-09

- Added a Sistema => Muestra un "Cargando..." cuando se esta cargando la app.. Notable con conexiones lentas.
- Fix a Sistema - Dialogs => Ahora muestran bien el primer mostrarLoading, en conexiones lentas se notaba mucho mas.

- Added a Farmacia - Entregas/Egresos => Fecha de Carga con hora y minutos.
- Changed a Farmacia - Entregas/Egresos => Ahora permite borrar las Entregas/Egresos creados en el mismo dia, independientemente de la fecha seleccionada por el usuario.
- Improve a Farmacia - componentEgresoInsumo => input de insumos.
- Fix a Farmacia - Insumos => Visibilidad del boton de Borrar.
- Fix a Farmacia - Ingresos/Transferencias => Formato de Fecha, Hora, en los Dialogs.
- Fix a Farmacia - Ingresos => Los cargados en versiones anteriores se mostraban mal las procedencias de los mismos.

##### [1.7.20230531] - 2023-05-31

- Removed a Farmacia - Ingresos => Carga inicial, Autorecibir.

- Added a Farmacia - Ingresos => Posibilidad de filtrar/mostrar solamente los Ingresos "Sin Recibir" o "Recibidos".
- Added a Farmacia - Transferencia => Posibilidad de filtrar/mostrar solamente las Transferencias "Sin Recibir", "Sin Retirar" o "Recibidos".
- Added a Farmacia - Solicitudes => Posibilidad de filtrar/mostrar solamente las Pendientes, Emergencias, Urgencias, Rutinas, Aceptadas o Rechazadas.
- Added a Farmacia - Ingresos/Transferencias/Solicitudes => Ahora guardan el horario en que fueron Creadas, Retiradas, Recibidas, Aceptadas y Rechazadas. Las fechas guardadas previamente a este cambio se mostraran con fecha de un dia anterior y horario 21:00hs por el cambio horario UTC-03:00.

- Added a Farmacia - Reporte => General Detallado -> Se agregaron los Filtros de Fecha, Farmacia, Insumo y Procedencia, permitiendo seleccionar Maximo 5 Areas/Farmacias, antes realizaba el reporte de todas las Areas/Farmacias existentes y generaba mucha carga en el servidor.
- Changed a Farmacia - Reporte => General Detallado -> Los Ingresos y Egresos ahora los suma en base a los filtros agregados y no en base al ultimo ingreso, por lo tanto se quito la columa de fecha de ingreso.
- Added a Farmacia - Reporte => Stock Total del Sistema -> Se agregaron los Filtros de Insumo, preseleccionar antes de realizar el Reporte.

- Changed a Farmacia - Insumos => Insumos mal cargados pueden ser borrados sino han sido utilizados.

##### [1.7.20230512] - 2023-05-12

- Changed a Farmacia - Entregas => Filtro Inicial Fecha Desde: Principio de mes anterior => Semanda Pasada.
  (disminuira la cantidad de entregas cargadas en la primera carga si necesitan ver cargas pasadas todavia pueden modificar el filtro con la fecha necesaria)

- Added a Farmacia - Ingreso => Proveedores -> PURPSI, Open Door.
- Added a Farmacia - Entregas => Categoria de Insumos Medicamento, Vacuna -> +Alimento, +Enfermeria/Medico.
- Added a Farmacia - Entregas => Posibilidad de Borrar las Entregas de la fecha del dia actual (recupera el stock).
- Added a Farmacia - Egresos => Posibilidad de Borrar los Egresos de la fecha del dia actual (recupera el stock).
- Added a Farmacia - Transferencias => Remito PDF ahora imprime tambien la observacion guardada.
- Fix - Farmacia - modificarStockInc => Cuando la cantidad ya no esta en stock, mensajes de errores.
