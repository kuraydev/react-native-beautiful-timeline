module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/lib/**/__tests__/**/*.test.{ts,tsx}"],
  transformIgnorePatterns: [
    "node_modules/(?!(?:jest-)?@react-native|react-native|react-native-dash-2|@react-native/js-polyfills)",
  ],
};
