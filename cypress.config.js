const { defineConfig } = require("cypress");
const { addMatchImageSnapshotPlugin } = require("@simonsmith/cypress-image-snapshot/plugin");

module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    baseUrl: "https://pt.wikipedia.org",
    env: {
      hideXhr: true,
      apiUrl: "https://graphqlzero.almansi.me/api",
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      addMatchImageSnapshotPlugin(on, config);
      return config;
    },
  },
});