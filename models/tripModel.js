const mongoose = require('mongoose');
const user = require('./userModel');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    tripCreator: {type: Schema.Types.ObjectId, ref: 'User'},
    destination: {type: String, required: [true, 'cannot be empty']},
    endDate: {type: Date, required: [true, 'cannot be empty']},
    interests: {type: String, required: [true, 'cannot be empty']},
    max: {type: mongoose.Schema.Types.Decimal128, required: [true, 'cannot be empty']},
    min: {type: mongoose.Schema.Types.Decimal128, required: [true, 'cannot be empty']},
    name: {type: String, required: [true, 'cannot be empty']},
    startDate: {type: Date, required: [true, 'cannot be empty']},
    origin: {type: String, required: [true, 'cannot be empty']}
    
});

module.exports = mongoose.model('Trip', tripSchema);