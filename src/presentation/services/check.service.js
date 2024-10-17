
class CheckService {
    constructor(logDatasource, succesCallback, errorCallback) {
        this.logDatasource = logDatasource;
        this.succesCallback = succesCallback;
        this.errorCallback = errorCallback;
    }

    async execute(options) {

        try {
            await this.logDatasource.saveLog(options);
            if (this.succesCallback) this.succesCallback();
            return true;

        } catch (error) {

            const log = {
                application: "logs",
                level: "high",
                className: "CheckService",
                summary: "Error interno",
                description: `Se produjo un error interno, el cual dice: ${error} `

            }
            await this.logDatasource.saveLog(log);
            if (this.errorCallback) this.errorCallback(`${error}`);
            throw new Error(error);
        }
    }
}

module.exports = CheckService; // Exporta la clase
