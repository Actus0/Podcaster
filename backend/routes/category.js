const express = require('express')
const router = express.Router()
const Category = require('../models/category')

// add category
router.post('/add-category', async (req, res) => {
    try {
        const { categoryName } = req.body;
        const category = new Category({ categoryName })
        await category.save()
        return res.status(200).json({message: "category added"})
    } catch (error) {
        return res.status(400).json(error)
    }
})
//get categories
router.get('/get-categories', async (req, res) => {
try {
    const categories =  await Category.find()
    res.status(200).json(categories)

} catch (error) {
    console.log(error)
}
}),

module.exports = router