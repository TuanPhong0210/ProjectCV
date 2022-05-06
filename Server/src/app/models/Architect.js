const mongoose = require('mongoose');
const mongooseDlete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Architect = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    image: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        default: '',
        maxlength: 50
    }
}, {
    timestamps: true
});

Architect.plugin(mongooseDlete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true
});

module.exports = mongoose.model('Architect', Architect);
