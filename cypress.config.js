const { defineConfig } = require("cypress");

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
      // implement node event listeners here
    },
  },
});
