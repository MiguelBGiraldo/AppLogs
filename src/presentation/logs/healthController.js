const envs = require('../../config/envs');

const start = new Date();

const getUptime = () => {
    const now = new Date();
    const uptimeInMillis = now - start;
    return uptimeInMillis / 1000;  // Convertir a segundos
};

exports.checkHealth = (req, res) => {
    res.json({
        status: "UP",
        version: envs.VERSION,
        uptime: getUptime(),
        checks: [
            {
                data: {
                    from: start.toISOString(),
                    status: "READY"
                },
                name: "Readiness check",
                status: "UP"
            },
            {
                data: {
                    from: start.toISOString(),
                    status: "ALIVE"
                },
                name: "Liveness check",
                status: "UP"
            }
        ]
    });
};

exports.checkReady = (req, res) => {
    res.json({
        status: "UP",
        version: envs.VERSION,
        uptime: getUptime(),
        check: {
            data: {
                from: start.toISOString(),
                status: "READY"
            },
            name: "Readiness check",
            status: "UP"
        }
    });
};

exports.checkLive = (req, res) => {
    res.json({
        status: "UP",
        version: envs.VERSION,
        uptime: getUptime(),
        check: {
            data: {
                from: start.toISOString(),
                status: "ALIVE"
            },
            name: "Liveness check",
            status: "UP"
        }
    });
}