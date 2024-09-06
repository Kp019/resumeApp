const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getItems } = require('./PdfParser');
const { calculateAIScore } = require('./AIScorer');

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to accept only PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

// Initialize multer with storage and file filter
const upload = multer({ storage, fileFilter });

// Define the upload route
router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a PDF file.' });
  }
  const action = 'scorer'
  try {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    console.log(filePath);
    const resultPDF = await getItems(filePath, action)
    console.log(resultPDF);
    const data = await calculateAIScore(resultPDF)
    console.log(data);
    res.json(data)
  } catch (err) {
    console.log(err);
  }
  // res.status(200).json({ message: 'File uploaded successfully!', filePath: `/uploads/${req.file.filename}` });
});

module.exports = router;
