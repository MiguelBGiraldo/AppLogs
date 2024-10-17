const { Router }  =  require( 'express');

const Logsroutes = require('./logs/routes');




class AppRoutes {

  static get routes() {

    const router = Router();

    // Definir las rutas
    router.use('/api/logs', Logsroutes.routes);

    return router;
  }

}

module.exports = AppRoutes