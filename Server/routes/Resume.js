const express = require('express');
const multer = require('multer');
const path = require('path');
const { getItems } = require('./PdfParser');
const { calculateScore } = require('./Scorer');

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Save with .pdf extension
  }
});
const upload = multer({ storage: storage });

const date = new Date()
const year = date.getFullYear();
const month = date.getMonth()+1;
const day = date.getDate();
const dates = day+'/'+month+'/'+year

console.log(dates);
router.post('/', upload.array('files'), async (req, res) => {
  const jobRequirements = req.body.requirements
  const uData = req.body.userState
  const userData = JSON.parse(uData)
  console.log(userData);
    // console.log(jobRequirements);
    // console.log(req.body);
    const action = 'scorer'
    try {
      const responses = await Promise.all(req.files.map(async file => {
        const filePath = path.join(__dirname, '../uploads', file.filename);
        // console.log(filePath);
        const pths = '/Server/uploads/'+file.filename
        // console.log(pths);
        const sections = await getItems(filePath, action);
        const score = (await calculateScore(sections, jobRequirements)).toFixed(0);
        console.log('score=',score);
        // console.log(sections);
        // console.log
        return { sections, score, filename: file.filename, jobTitle: req.body.jobTitle, Date:dates, user: userData };
      }));

      res.json(responses);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Error processing PDF' });
    }
  });

module.exports = router;
