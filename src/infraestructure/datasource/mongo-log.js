const LogModel = require("../../data/models/log.model");


class MongoLogDataSource {


    async saveLog(log) {
        console.log(log);
        const newLog = await LogModel.create(log);
        console.log('Mongo Log Created', newLog.id);
    }

    async getLog(severityLevel) {
        const logs = await LogModel.find({
            level: severityLevel
        });
        return logs; // Devuelve los logs directamente
    }

    async getLogs(page, limit) {

        const skip = (page - 1) * limit; // Calcular cuántos registros omitir

        // Obtener logs ordenados por fecha, aplicando paginación
        const logs = await LogModel.find()
            .sort({ createdAt: -1 }) // Ordenar por fecha (descendente)
            .skip(skip) // Omitir registros según la paginación
            .limit(limit); // Limitar el número de registros

        return logs; // Devuelve los logs paginados y ordenados
    }

    async getByDate(startDate, endDate, page, limit) {
        const pageNumber = parseInt(page, 10) || 1; // Convertir a número o establecer 1 por defecto
        const limitNumber = parseInt(limit, 10) || 10; // Convertir a número o establecer 10 por defecto

        const skip = (pageNumber - 1) * limitNumber; // Calcular cuántos registros omitir

        const logs = await LogModel.find({
            createdAt: {
                $gte: startDate, // Filtrar logs desde la fecha de inicio
                $lte: endDate // Filtrar logs hasta la fecha final
            }
        })
            .sort({ createdAt: -1 }) // Ordenar por fecha (descendente)
            .skip(skip) // Omitir registros según la paginación
            .limit(limitNumber); // Limitar el número de registros

        return logs; // Devuelve los logs filtrados, paginados y ordenados
    }

    async getByType(level, page, limit) {
        const pageNumber = parseInt(page, 10) || 1; // Convertir a número o establecer 1 por defecto
        const limitNumber = parseInt(limit, 10) || 10; // Convertir a número o establecer 10 por defecto

        const skip = (pageNumber - 1) * limitNumber; // Calcular cuántos registros omitir

        const logs = await LogModel.find({
            level: level
        })
            .sort({ createdAt: -1 }) // Ordenar por fecha (descendente)
            .skip(skip) // Omitir registros según la paginación
            .limit(limitNumber); // Limitar el número de registros

        return logs; // Devuelve los logs filtrados por tipo, paginados y ordenados
    }

    async getByApp(application, page, limit){

        const pageNumber = parseInt(page, 10) || 1; // Convertir a número o establecer 1 por defecto
        const limitNumber = parseInt(limit, 10) || 10; // Convertir a número o establecer 10 por defecto

        const skip = (pageNumber - 1) * limitNumber; // Calcular cuántos registros omitir

        const logs = await LogModel.find({
            application: application
        })
            .sort({ createdAt: -1 }) // Ordenar por fecha (descendente)
            .skip(skip) // Omitir registros según la paginación
            .limit(limitNumber); // Limitar el número de registros

        return logs; // Devuelve los logs filtrados por tipo, paginados y ordenados
    }
}

module.exports = MongoLogDataSource; // Exporta la clase
