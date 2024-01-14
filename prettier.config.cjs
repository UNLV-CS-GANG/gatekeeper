/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    semi: false,
    trailingComma: 'es5',
    singleQuote: true,
    tabWidth: 2,
    useTabs: false,
    printWidth: 120,
  }
  
module.exports = config