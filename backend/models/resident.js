const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const residentSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        disease: {
            type: Schema.Types.ObjectId,
            ref: 'Disease',
            required: true
        },
        state: {
            type: Schema.Types.ObjectId,
            ref: 'State',
            required: true
        }
    },
    { timestamps: true}
)

module.exports = mongoose.model('Resident', residentSchema);