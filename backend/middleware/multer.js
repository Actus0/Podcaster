// const multer = require('multer');
// const path = require('path')

// // Storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {  // Corrected to use 'file' instead of 'res'
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// // Initialize multer with storage and file type validation (optional)
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         // You can add custom file validation here
//         if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'audio/mpeg',  file.mimetype === 'video/mp4') {

//             cb(null, true);
//         } else {
//             cb(new Error('Invalid file type! Only JPEG, PNG, and MP3 files are allowed.'));
//         }
//     }
// }).fields([
//     { name: "frontImage", maxCount: 1 },  // Corrected the typo 'frotnImage' to 'frontImage'
//     { name: "audioFile", maxCount: 1 }
// ]);

// module.exports = upload;

// useless code