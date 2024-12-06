const capitalize = (string) => {
  if (!!string && typeof string === "string") {
    return string
      .replace(/\s+/g, " ")
      .split(" ")
      .map((palabra, index, {length}) => {
        if (palabra) {
          switch (index) {
            case 0:
            case length - 1:
              // primer y ultima palabra
              return palabra[0].toUpperCase() + palabra.substring(1).toLowerCase() || "";

            default:
              // palabras del medio.
              if (
                [
                  // Artículos
                  ...[
                    "el",
                    "la",
                    "lo",
                    "los",
                    "las",
                    "un",
                    "una",
                    "unos",
                    "unas",
                    "ello",
                    "ellos",
                    "ella",
                    "ellas",
                    "le",
                    "les",
                    "se",
                  ],
                  // Conjunciones
                  ...[
                    "y",
                    "e",
                    "o",
                    "u",
                    "pero",
                    "sino",
                    "aun",
                    "aunque",
                    "que",
                    "como",
                    "asi",
                    "porque",
                    "si",
                    "no",
                    "ni",
                    "ya",
                    "salvo",
                    "excepto",
                    "conque",
                    "luego",
                    "despues",
                    "mientras",
                    "cuando",
                    "tanto",
                    "siquiera",
                    "ambos",
                  ],
                  // Preposiciones
                  ...[
                    "a",
                    "ante",
                    "bajo",
                    "cabe",
                    "con",
                    "contra",
                    "de",
                    "desde",
                    "durante",
                    "en",
                    "entre",
                    "hacia",
                    "hasta",
                    "mediante",
                    "para",
                    "por",
                    "pro",
                    "segun",
                    "sin",
                    "so",
                    "sobre",
                    "tras",
                    "versus",
                    "vs",
                    "via",
                  ],
                  "del",
                ].includes(palabra.toLowerCase())
              ) {
                // no mayuscula
                return palabra.toLowerCase() ?? "";
              }
              return palabra[0].toUpperCase() + palabra.substring(1).toLowerCase() || "";
          }
        }
      })
      .join(" ");
  }
  return string;
};

const trim_between = (string) => {
  // quita espacios en blanco entre palabras
  if (!!string && typeof string === "string") {
    return string.replace(/\s+/g, " ");
  }
  return string;
};

const checkIsValidJson = (string) => {
  try {
    let parsedJson = JSON.parse(string);
    /** parsed JSON will not be undefined if it is parsed successfully because undefined is not a valid JSON */
    return parsedJson;
  } catch (err) {
    // console.log("checkIsValidJson", err);
    /** returning undefined because null, boolean, string, array or object is a valid JSON whereas undefined is invalid JSON  */
    return undefined;
  }
};

exports.capitalize = capitalize;
exports.trim_between = trim_between;
exports.checkIsValidJson = checkIsValidJson;
