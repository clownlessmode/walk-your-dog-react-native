module.exports = {
  root: true,
  extends: [
    'universe/native',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],

    '@typescript-eslint/no-unused-vars': ['error'],
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['@app', './src/app'][('@entity', './src/entity')][
            ('@features', './src/features')
          ][('@screens', './src/screens')][('@shared', './src/shared')][
            ('@widgets', './src/widgets')
          ],
          ['@assets', './assets'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
};
