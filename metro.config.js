/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const exclusionList  = require('metro-config/src/defaults/exclusionList');

module.exports = {
  resolver: {
    blacklistRE: exclusionList(["android/app/src/main/assets/custom/package.json"]),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};