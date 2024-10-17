const { request, response } = require("express");
const CheckService = require("../services/check.service");


class LogController {
    constructor(dataSource) {
        this.dataSource = dataSource; // Inyectar la fuente de datos en el constructor
        this.checkService = new CheckService(this.dataSource, () => console.log("El log se guardo"), () => console.log("Hubo un error en el log"))
    }

    saveLog = async (req = request, res = response) => {
        try {

            const { application, level, className, summary, description } = req.body;
            // await this.dataSource.saveLog(log);
            await this.checkService.execute({ application, level, className, summary, description });
            res.status(201).json(
                {
                    error: false,
                    message: "Log saved successfully",
                    code: 201,

                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json(
                {
                    error: true,
                    message: `Error saving log. Error: ${error} `,
                    code: 500,

                }
            );
        }
    };

    getLogs = async (req = request, res = response) => {
        try {
            const { page, limit } = req.query;


            const pageNumber = parseInt(page, 10) || 1;
            const limitNumber = parseInt(limit, 10) || 10;
    
            // Validar que page y limit sean números positivos
            if (isNaN(pageNumber) || pageNumber <= 0) {
                return res.status(400).json({
                    error: true,
                    message: "'page' must be a positive number",
                    code: 400,
                });
            }
    
            if (isNaN(limitNumber) || limitNumber <= 0) {
                return res.status(400).json({
                    error: true,
                    message: "'limit' must be a positive number",
                    code: 400,
                });
            }


            const logs = await this.dataSource.getLogs(pageNumber, limitNumber);
            res.status(200).json({
                error: false,
                data: logs,
                code: 200,

            });
        } catch (error) {
            console.error(error);
            res.status(500).json(

                {
                    error: true,
                    message: `Error retrieving logs: ${error} `,
                    code: 500,

                }
            );
        }
    };

    getByDate = async (req = request, res = response) => {
        try {
            const { startDate, endDate, page, limit } = req.query;

            // Verificar que las fechas estén presentes
            if (!startDate || !endDate) {
                return res.status(400).json(
                    {
                        error: true,
                        message: `startDate and endDate are required`,
                        code: 400,
                    }
                );
            }

            // Convertir las fechas a objetos Date
            const start = new Date(`${startDate}T00:00:00Z`);
            const end = new Date(`${endDate}T23:59:59Z`);

            // Validar que la fecha inicial no sea mayor que la final
            if (start > end) {
                return res.status(400).json(
                    {
                        error: true,
                        message: "startDate cannot be greater than endDate",
                        code: 400,
                    }
                );
            }
            console.log(start);
            console.log(end);

            const logs = await this.dataSource.getByDate(start, end, page, limit);
            res.status(200).json({
                error: false,
                data: logs,
                code: 200,

            });
        } catch (error) {
            console.error(error);
            res.status(500).json(
                {
                    error: true,
                    message: `Error retrieving logs by date: ${error} `,
                    code: 500,
                }
            );
        }
    };

    getByType = async (req = request, res = response) => {
        try {
            const { level, page, limit } = req.query;


            if (!level || level.length <= 0) {
                return res.status(400).json(
                    {
                        error: true,
                        message: `level are required`,
                        code: 400,
                    }
                );
            }

            const logs = await this.dataSource.getByType(level, page, limit);
            res.status(200).json({
                error: false,
                data: logs,
                code: 200,

            });
        } catch (error) {
            console.error(error);
            res.status(500).json(
                {
                    error: true,
                    message: `Error retrieving logs by type: ${error} `,
                    code: 500,
                }
            )
        }
    };

    getByApp = async (req = request, res = response) => {
        try {
            const { application, page, limit } = req.query;

            if (!application || application.length <= 0) {
                return res.status(400).json(
                    {
                        error: true,
                        message: `application are required`,
                        code: 400,
                    }
                );
            }

            const logs = await this.dataSource.getByApp(application, page, limit);
            res.status(200).json({
                error: false,
                data: logs,
                code: 200,

            });
        } catch (error) {
            console.error(error);
            res.status(500).json(
                {
                    error: true,
                    message: `Error retrieving logs by app: ${error} `,
                    code: 500,
                }
            );
        }
    };
}

module.exports = LogController;
