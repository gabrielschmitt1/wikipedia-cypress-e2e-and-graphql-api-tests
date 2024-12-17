const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 800,
    baseUrl: "https://pt.wikipedia.org",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
