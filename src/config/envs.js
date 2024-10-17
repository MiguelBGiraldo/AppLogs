require('dotenv').config(); // Cargar variables de entorno desde .env

const env = require('env-var');

const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
};

module.exports = envs;