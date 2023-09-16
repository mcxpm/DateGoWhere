module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 90,
    importOrder: ["^@utils/(.*)$", "^@components/(.*)$", "^@assets/(.*)$", "<THIRD_PARTY_MODULES>", "^[./]"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    tabWidth: 4,
    plugins: ["@trivago/prettier-plugin-sort-imports"],
};