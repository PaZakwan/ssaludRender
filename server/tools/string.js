/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const WORDS_LOWERCASE = new Set([
  // Artículos
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
  "del",
  // Conjunciones
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
  // Preposiciones
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
]);

const formatSiglasConPuntos = (word) => {
  return word
    .split(".")
    .map((sigla) => sigla.charAt(0).toUpperCase() + sigla.substring(1).toLowerCase())
    .join(".");
};

const capitalize = (string) => {
  if (!string || typeof string !== "string") {
    return string;
  }
  return string
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word, index, arr) => {
      if (!word) {
        return "";
      }

      const matchesParentesis = word.match(/\(([^)]+)\)/);
      if (matchesParentesis) {
        // Lo devolvemos intacto
        return `(${matchesParentesis[1]})`;
      }

      if (word.includes(".")) {
        return formatSiglasConPuntos(word);
      }

      switch (index) {
        case 0:
        case arr.length - 1:
          // primer y ultima palabra siempre capitalizadas
          return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();

        default:
          // palabras del medio.
          if (WORDS_LOWERCASE.has(word.toLowerCase())) {
            // no mayuscula
            return word.toLowerCase();
          }
          return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
      }
    })
    .join(" ");
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
  } catch (error) {
    // console.log("checkIsValidJson", error);
    /** returning undefined because null, boolean, string, array or object is a valid JSON whereas undefined is invalid JSON  */
    return undefined;
  }
};

exports.capitalize = capitalize;
exports.trim_between = trim_between;
exports.checkIsValidJson = checkIsValidJson;
