const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: {unique: true},
        minlength: 1,
    },

    total_length: {
        type: Number,
        required: false,
        default: 0,
    },

    created_by: {
        type: String,
        required: false,
        minlength: 3,
    }, 
},{
    timestamps: true,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;