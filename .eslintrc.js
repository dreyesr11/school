module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      'prettier'
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    ignorePatterns: ['*rc*.js', '*config*.js', '/node_modules', '/dist'],
    rules: {
      'prettier/prettier': [
        'warn', {
          "endOfLine":"auto",
          "semi": false,
          singleQuote: true,
          trailingComma: "none"
        }
      ],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      "no-useless-escape": ['off'],
    }
};
