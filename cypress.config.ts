import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "1en6ke",
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
});
