module.exports = {
  extends: [
    'taro/react',
    'alloy',
    'alloy/react',
    'alloy/typescript',
    // "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'Taro',
      },
    ],
    'no-console': 'warn',
    'react/no-unsafe': 'warn',
    'react/no-deprecated': 'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
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
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-invalid-this': 0,
  },
};
