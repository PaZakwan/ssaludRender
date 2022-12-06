exports.capitalize = (string) => {
  if (!!string && typeof string === "string") {
    return string
      .replace(/\s+/g, " ")
      .split(" ")
      .map((palabra) => {
        if (palabra) {
          return palabra[0].toUpperCase() + palabra.substring(1).toLowerCase() || "";
        }
      })
      .join(" ");
  }
  return string;
};

exports.trim_between = (string) => {
  // quita espacios en blanco entre palabras
  if (!!string && typeof string === "string") {
    return string.replace(/\s+/g, " ");
  }
  return string;
};
