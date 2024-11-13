const mongoose = require('mongoose')

const podcasts = new mongoose.Schema({
    frontImage: {
        type: String,
        unique: true,
        required: true
    },
    audioFile: {
        type: String,
        unique: true,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    }



},{ timestamps: true })


const Podcast = mongoose.models.podcasts || mongoose.model("podcasts", podcasts);

module.exports = mongoose.model("podcasts", podcasts)