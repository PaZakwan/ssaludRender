const js = require("@eslint/js");
const globals = require("globals");
const pluginN = require("eslint-plugin-n");
const pluginPromise = require("eslint-plugin-promise");
const prettierConfig = require("eslint-config-prettier");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  // 1. Definir archivos ignorados
  {
    ignores: [
      "node_modules/",
      "dist/",
      "public/",
      "publicOld/",
      "sgs/",
      "server/config/cert/",
      "file_server/uploads/",
      "file_server/logs/",
      "file_server/opciones/",
      "**/*.exe",
      "**/*.bat",
      "**/*.log",
      "eslint.config.js",
    ],
  },
  js.configs.recommended,
  pluginN.configs["flat/recommended-script"],
  pluginPromise.configs["flat/recommended"],
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          args: "all",
          // Ignora estas palabras exactas o lo que empiece por _
          argsIgnorePattern: "^(error|req|res|next|_)$",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^(error|_)$",
        },
      ],
      "no-extra-boolean-cast": "off",

      "no-console": "warn",
      "no-undef": "warn",
      "no-redeclare": "warn",

      // Reglas específicas para Mongoose/Express
      "no-path-concat": "error",
      "callback-return": "off",
      "n/no-process-exit": "warn",
      "promise/always-return": "warn",
      "promise/catch-or-return": "warn",
      "handle-callback-err": ["warn", "^(err|error)$"],

      // fallos de formato
      "prettier/prettier": ["warn", {endOfLine: "auto"}],
    },
  },
  // Desactiva conflictos con Prettier
  prettierConfig,
];
