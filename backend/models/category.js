const mongoose = require('mongoose')

const category = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true
    },
    podcasts: [{
        type: mongoose.Types.ObjectId,
        ref: "podcasts"
    }]

},{ timestamps: true })


const Category = mongoose.models.category || mongoose.model("category", category);

module.exports = mongoose.model("category", category)