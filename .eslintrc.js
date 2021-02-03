module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'max-len': ['error', { code: 500 }],
    'react/prop-types': 0,
    'react/jsx-indent': 0,
    'object-curly-newline': 0,
    'react/jsx-indent-props': 0,
    'react/jsx-closing-bracket-location': 0,
    'brace-style': 0,
  },
};
