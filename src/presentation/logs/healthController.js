exports.checkHealth = (req, res) => {
    res.json({
        status: "UP",
        version: 'version',
        uptime: '',
        checks: [
            {
                data: {
                    from: 'REEMPLAZAR',
                    status: "READY"
                },
                name: "Readiness check",
                status: "UP"
            },
            {
                data: {
                    from: 'REEMPLAZAR',
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
        version: version,
        uptime: getUptime(),
        check: {
            data: {
                from: startTime.toISOString(),
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
        version: version,
        uptime: getUptime(),
        check: {
            data: {
                from: startTime.toISOString(),
                status: "ALIVE"
            },
            name: "Liveness check",
            status: "UP"
        }
    });
}