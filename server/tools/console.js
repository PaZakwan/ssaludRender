const clgEvento = ({name, evento} = {}) => {
  console.log(`== ${new Date().toISOString()} <=> ${name} -> ${evento}. ==`);
};

const clgFalla = ({name, falla, type = "catch"} = {}) => {
  if (type === "catch") {
    console.error(
      `XX ${new Date().toISOString()} <=> ${name} -> ${falla.name}: ${falla.message}. XX`
    );
    console.error(`XXX ${new Date().toISOString()} <=> ${name} -> stack: ${falla.stack} XXX`);
  } else {
    console.error(`XX ${new Date().toISOString()} <=> ${name} -> ${falla}. XX`);
  }
};

// exports
exports.clgEvento = clgEvento;
exports.clgFalla = clgFalla;
