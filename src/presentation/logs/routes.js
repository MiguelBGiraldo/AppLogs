const Router = require('express');
// const MongoDataSource = require('../../data/datasource/mongo.datasource');
const MongoLogDataSource = require('../../infraestructure/datasource/mongo-log');
const LogController = require('./controller');

// Crear una instancia de MongoDataSource e inyectarla en el controlador
const dataSource = new  MongoLogDataSource();
const logController = new LogController(dataSource); // Inyectar el datasource

class Logsroutes {
    static get routes() {
        const router = Router();

        // Definir las rutas, conectadas a los métodos del controlador
        router.post('/save', logController.saveLog);
        router.get('/getLogs', logController.getLogs);
        router.get('/getByDate', logController.getByDate);
        router.get('/getByType', logController.getByType);
        router.get('/getByApp', logController.getByApp);

        return router;
    }
}

module.exports = Logsroutes;