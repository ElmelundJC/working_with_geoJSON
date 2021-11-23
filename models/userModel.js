const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//GeoSchema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point",
    },
    coordinates: {
        type: [Number],
        index: "2dsphere",
    },
});

const DummySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    geometry: GeoSchema,
});

const Dummy = mongoose.model('dummy', DummySchema);

module.exports = Dummy;
