module.exports = {
  extends: ['airbnb', 'blitz', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'blitz',
        'plugin:prettier/recommended',
      ],
      rules: {
        'no-use-before-define': 'off',
        'consistent-return': 'off',
        'newline-before-return': 'error',

        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/label-has-associated-control': 'off', // false positive

        'react/function-component-definition': 'off',
        'react/destructuring-assignment': 'off',
        'react/button-has-type': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',

        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', ignoreRestSiblings: true },
        ],
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
    {
      files: ['**/*.js'],
      rules: {
        'global-require': 'off',
      },
    },
    {
      files: ['test/**/*'],
      env: {
        jest: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
