## Changelog

##### Unreleased

##### [1.7.20230531] - 2023-05-31

- Removed a Ingresos - Carga inicial, Autorecibir.

- Added a Ingresos => Posibilidad de filtrar/mostrar solamente los Ingresos "Sin Recibir" o "Recibidos".
- Added a Transferencia => Posibilidad de filtrar/mostrar solamente las Transferencias "Sin Recibir", "Sin Retirar" o "Recibidos".
- Added a Solicitudes => Posibilidad de filtrar/mostrar solamente las Pendientes, Emergencias, Urgencias, Rutinas, Aceptadas o Rechazadas.
- Added a Ingresos/Transferencias/Solicitudes => Ahora guardan el horario en que fueron Creadas, Retiradas, Recibidas, Aceptadas y Rechazadas. Las fechas guardadas previamente a este cambio se mostraran con fecha de un dia anterior y horario 21:00hs por el cambio horario UTC-03:00.

- Added a Reporte => General Detallado -> Se agregaron los Filtros de Fecha, Farmacia, Insumo y Procedencia, permitiendo seleccionar Maximo 5 Areas/Farmacias, antes realizaba el reporte de todas las Areas/Farmacias existentes y generaba mucha carga en el servidor.
- Changed a Reporte => General Detallado -> Los Ingresos y Egresos ahora los suma en base a los filtros agregados y no en base al ultimo ingreso, por lo tanto se quito la columa de fecha de ingreso.
- Added a Reporte => Stock Total del Sistema -> Se agregaron los Filtros de Insumo, preseleccionar antes de realizar el Reporte.

- Changed a Insumos => Insumos mal cargados pueden ser borrados sino han sido utilizados.

##### [1.7.20230512] - 2023-05-12

- Changed a Entregas => Filtro Inicial Fecha Desde: Principio de mes anterior => Semanda Pasada.
  (disminuira la cantidad de entregas cargadas en la primera carga si necesitan ver cargas pasadas todavia pueden modificar el filtro con la fecha necesaria)

- Added a Ingreso => Proveedores -> PURPSI, Open Door.
- Added a Entregas => Categoria de Insumos Medicamento, Vacuna -> +Alimento, +Enfermeria/Medico.
- Added a Entregas => Posibilidad de Borrar las Entregas de la fecha del dia actual (recupera el stock).
- Added a Egresos => Posibilidad de Borrar los Egresos de la fecha del dia actual (recupera el stock).
- Added a Transferencias => Remito PDF ahora imprime tambien la observacion guardada.
- Fix - modificarStockInc - Cuando la cantidad ya no esta en stock, mensajes de errores.
