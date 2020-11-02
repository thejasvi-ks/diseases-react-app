const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema(
    {
        stateName: {
            type: String,
            required: true
        },
        diseaseCount: [
            {
                disease: {
                    type: Schema.Types.ObjectId,
                    ref: 'Disease',
                    required: true
                },
                count : {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('State', stateSchema);