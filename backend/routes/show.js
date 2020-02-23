const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const showSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
    },

    total_episodes: {
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

const Show = mongoose.model('User', showSchema);

module.exports = Show;