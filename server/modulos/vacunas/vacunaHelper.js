const VacunaStock = require("./models/vacuna_stock");

// ============================
// Funcion de Stock para modificarlo
// ============================
const modificarStockInc = async (area, insumo, cantidad, resta) => {
  let filtro = {area, insumo: insumo.insumo};
  if (insumo._id) {
    filtro._id = insumo._id;
  }
  if (insumo.procedencia) {
    filtro.procedencia = insumo.procedencia;
  } else {
    filtro.procedencia = {$exists: false};
  }
  if (insumo.lote) {
    filtro.lote = insumo.lote;
  } else {
    filtro.lote = {$exists: false};
  }
  if (insumo.vencimiento) {
    filtro.vencimiento = insumo.vencimiento;
  } else {
    filtro.vencimiento = {$exists: false};
  }
  // verifica si ya fue retirado o recibido
  if (resta && insumo.retirado) {
    return {err: "Ya retirado"};
  } else if (!resta && insumo.recibido) {
    return {err: "Ya recibido"};
  }

  let stockDB = null;
  // busca stock existente en "area"
  stockDB = await VacunaStock.findOne(filtro).exec();

  if (resta) {
    if (stockDB?.cantidad > cantidad) {
      // si existe y la cantidad es adecuada quita cantidad en "area"
      stockDB = await VacunaStock.findOneAndUpdate(
        filtro,
        {$inc: {cantidad: -cantidad}},
        {
          new: true,
          runValidators: true,
        }
      ).exec();
    } else if (stockDB?.cantidad == cantidad) {
      // si existe y la cantidad son iguales la borra del "area"
      stockDB = await VacunaStock.findOneAndDelete(filtro).exec();
    } else {
      // si no existe o cantidad invalida return error
      return {
        err: `Cantidad invalida, quiere retirar ${cantidad} pero quedan ${stockDB?.cantidad ?? 0}`,
      };
    }
  } else {
    if (stockDB) {
      // si existe incrementa cantidad en "area"
      stockDB = await VacunaStock.findOneAndUpdate(
        filtro,
        {$inc: {cantidad}},
        {
          new: true,
          runValidators: true,
        }
      ).exec();
    } else {
      // si no existe lo crea en el "area"
      stockDB = await new VacunaStock({area, ...insumo, cantidad}).save();
    }
  }
  return stockDB;
};

exports.modificarStockInc = modificarStockInc;
