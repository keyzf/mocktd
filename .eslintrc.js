module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: [
  ],
  env: {
    browser: true,
    node: true
  },
  globals: {
    __static: true,
    GLOBAL_APP: true,
    _: true,
    goldlog: true,
    UE: true,
    REQUEST_ONLINE: true
  },
  plugins: [
    'react',
    'html'
  ],
  'rules': {
    "react/jsx-uses-react": "error",   
    "react/jsx-uses-vars": "error",
    "indent": ["error", 4],
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-console': 0,
    'func-names': 0,
    "no-unused-vars": [
      2, 
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": false
      }
    ],
    'linebreak-style': 0,
    'prefer-arrow-callback': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
