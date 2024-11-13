const express = require('express')
const IsAuth = require('../middleware/auth')
const upload = require('../middleware/upload')
const Category = require('../models/category')
const Podcast = require('../models/podcast')
const User = require('../models/user')
const fs = require('fs');
const path = require('path');
const router = express.Router()

//Add-Podcast Route 

router.post('/add-podcast', IsAuth, upload, async (req, res) => {
  const { title, description, categoryName } = req.body;
  const { frontImage, audioFile } = req.files;

  if (!title || !description || !categoryName || !frontImage || !audioFile) {
    return res.status(400).json({ message: 'Please fill in all fields and upload both files.' });
  }

  try {
    const podcast = new Podcast({
      title,
      description,
      categoryName,
      frontImage: frontImage[0].path,
      audioFile: audioFile[0].path
    });

    await podcast.save();
    res.status(201).json({ message: 'Podcast added successfully!' });
  } catch (error) {
    console.error('Error adding podcast:', error);
    res.status(500).json({ message: 'Failed to add podcast' });
  }
});
  
//Get All Podcasts
router.get('/get-podcasts', async (req, res) => {
    try {
        const podcasts = await Podcast.find().populate(Category).sort({ createdAt: -1 });
        res.status(200).json({ data: podcasts })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})
//Get user podcasts
router.get('/get-user-podcasts', IsAuth, async (req, res) => {
    try {
        const { user } = req;
        const userid = user._id;
        const data = await User.findById(userid).populate({ path: "podcasts", populate: { path: "category" } }).select("-password");
        if (data && data.podcasts) {
            data.podcasts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }

        res.status(200).json({ data: data.podcasts })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})
// get a podcast by its id
router.get('/get-podcast/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const podcasts = await Podcast.findById(id).populate("category")
        return res.status(200).json({ data: podcasts })
    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred" })
    }
});
//get podcasts by category
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const categories = await category.find({ categoryName: category }).populate({ path: "podcasts", populate: { path: "category" } });
        let podcasts = [];
        Categories.forEach((category)=>{
            podcasts = [...podcasts,...category.podcasts];
        })
        return res.status(200).json({ data: podcasts })
    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred" })
    }
});

module.exports = router