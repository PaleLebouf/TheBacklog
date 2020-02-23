const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mangaBacklogSchema = new Schema({

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

    manga_id: {
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

const MangaBacklog = mongoose.model('MangaBacklog', mangaBacklogSchema);

module.exports = MangaBacklog;