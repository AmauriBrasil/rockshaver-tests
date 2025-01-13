require('dotenv').config() // Carregará as configurações do arquivo .env

const { configurePlugin } = require('cypress-mongodb');

module.exports = {
  projectId: "5geqiz",
  env: {
    mongodb: {
      uri: process.env.MONGO_URI,
      database: process.env.DATABASE
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configurePlugin(on);
    },
    baseUrl: process.env.API_URL,
    video: true
  },
};