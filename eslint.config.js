import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,jsx}'], // Apply to all JS/JSX files
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser, // Browser globals (e.g., window, document)
        ...globals.node, // Node.js globals (e.g., module, require)
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['postcss.config.js'], // Apply to postcss.config.js
    languageOptions: {
      globals: {
        ...globals.node, // Node.js globals (e.g., module, require)
      },
    },
  },
];