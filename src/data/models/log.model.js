const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    application: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    className: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Cambié new Date() por Date.now para obtener la fecha actual
    }
});

const LogModel = mongoose.model('Log', logSchema);

module.exports = LogModel; // Exporta el modelo
