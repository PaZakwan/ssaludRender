## Changelog

## Known Issues

- Chromium:
  - Descargar PDFs - (Error: Error de red) Usando el boton proporcionado por el navegador cuando previsualiza el PDF.
    Solucion Temporaria: https://youtu.be/kRvcB-4OXak o navegadores con otro motor como Firefox/Safari.
    Infe Tech: https://support.google.com/chrome/thread/47987652/failed-network-error-when-click-download-a-pdf-file-in-blob-url?hl=en
    https://bugs.chromium.org/p/chromium/issues/detail?id=892133
    https://bugs.chromium.org/p/chromium/issues/detail?id=1224027

##### Unreleased

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
