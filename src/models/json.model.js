const mongoose = require('mongoose');

const jsonSchema = new mongoose.Schema({
    serialNumber: {
        type: Number, // for serial number
        required: true,
        unique: true
    },
    data: {
        type: Object, // this object will store the json data
        required: true
    },
    createdAt: {
        type: Date, // for storing the date with current time
        default: Date.now
    }
});

const jsonModel = mongoose.model('json', jsonSchema);
module.exports = jsonModel;