const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameBacklogSchema = new Schema({

    user_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
    },

    game_id: {
        type: Number,
        required: false,
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

const GameBacklog = mongoose.model('User', gameBacklogSchema);

module.exports = GameBacklog;