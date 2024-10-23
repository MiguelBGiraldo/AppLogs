const { Router }  =  require( 'express');

const Logsroutes = require('./logs/routes');
const healthRouter = require('./logs/healthRoutes');
class AppRoutes {

  static get routes() {

    const router = Router();

    // Definir las rutas
    router.use('/api/logs', Logsroutes.routes);
    router.use('/api/health', healthRouter);
    return router;
  }

}

module.exports = AppRoutes