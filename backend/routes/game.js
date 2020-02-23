const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
    },

    total_length: {
        type: Number,
        required: false,
    },

    created_by_id: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    }
}, {
    timestamps: true,
});

const Game = mongoose.model('User', gameSchema);

module.exports = Game;