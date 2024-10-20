// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  plugins: ['simple-import-sort'],
  rules: {
    /**
     * @description simple-import-sort
     */
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    /**
     * @description react-hooks
     */
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error"
  },
}
