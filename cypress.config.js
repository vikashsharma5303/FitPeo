const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280,
    baseUrl:'https://www.fitpeo.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners hereviewportWidth: 1280,
    
     
    },
  },
});
