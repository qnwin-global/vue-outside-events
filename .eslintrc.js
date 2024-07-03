module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  root: true,
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'arrow-parens': [2, 'always'],
    'sort-imports': [2, { ignoreCase: true, ignoreDeclarationSort: true }]
  }
}
