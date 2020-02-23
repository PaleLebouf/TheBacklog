const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const showBacklogSchema = new Schema({

    key_id: {
        type: String,
        unique: true,
        trim: true,
        minlength: 1,
    },
    
    user_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
    },

    show_id: {
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

const ShowBacklog = mongoose.model('ShowBacklog', showBacklogSchema);

module.exports = ShowBacklog;