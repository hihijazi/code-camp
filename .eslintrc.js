module.exports = {
    parser: 'babel-eslint', // If you're using Babel for parsing
    plugins: ['react', 'react-hooks'],
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    rules: {
      // Other ESLint rules...
  
      // React Router rules
      'react/jsx-no-undef': 'off', // Disable jsx-no-undef rule because it doesn't recognize React Router imports
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  };
  