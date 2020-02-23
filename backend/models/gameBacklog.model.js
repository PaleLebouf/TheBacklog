const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameBacklogSchema = new Schema({

    key_id: {
        type: String,
        unique: true,
        trim: true,
        minlength: 1,
    },

    user_id: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },

    game_id: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },

    progress: {
        type: Number,
        trim: true,
        minlength: 3,
    },

    in_progress: {
        type: Boolean,
        default: false,
    },

    completed: {
        type: Boolean,
        default: false,
    },

    rating: {
        type: Number,
        required: false,
        default: -1,
    }
});

const GameBacklog = mongoose.model('GameBacklog', gameBacklogSchema);

module.exports = GameBacklog;