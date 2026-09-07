/* eslint-disable no-console */

const clgEvento = ({name, evento} = {}) => {
  console.log(`== ${new Date().toISOString()} <=> ${name} -> ${evento}. ==`);
};

const clgFalla = ({name, falla, type = "catch"} = {}) => {
  if (type === "catch") {
    console.error(
      `XX ${new Date().toISOString()} <=> 🚨 ${name} -> ${falla.name}: ${falla.message}. XX`
    );
    console.error(`XXXX ${new Date().toISOString()} <=> ${name} -> stack: ${falla.stack} XXXX`);
  } else {
    console.error(`XX ${new Date().toISOString()} <=> 🚨 ${name} -> ${falla}. XX`);
  }
};

// exports
exports.clgEvento = clgEvento;
exports.clgFalla = clgFalla;
