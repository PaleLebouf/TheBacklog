const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mangaSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
    },

    total_chapters: {
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

const Manga = mongoose.model('User', mangaSchema);

module.exports = Manga;