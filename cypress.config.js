const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
 require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
 require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
 
module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    specPattern: "cypress/e2e/**/*.feature", // Ruta donde están los archivos .feature de Cucumber
    supportFile: false,
    stepDefinitions: "cypress/e2e/", // Ruta donde están los archivos que definen los pasos
  },
});
