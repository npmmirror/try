module.exports = {
  extends: [
    'taro',
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'Taro',
      },
    ],
    'no-console': 'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'Taro',
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true,
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'no-trailing-spaces': 'error',
    'no-multi-spaces': 'error',
    semi: ['error', 'always'],
    '@typescript-eslint/prefer-optional-chain': 0,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    project: './tsconfig.json',
  },
};
