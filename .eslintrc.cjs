module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
