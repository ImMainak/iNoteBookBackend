const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }, 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('notes', notesSchema);