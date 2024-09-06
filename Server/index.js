const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/Resume');
const resumeAnalyser = require('./routes/Analyser');
const findjobs = require('./routes/findJobs');
const path = require('path');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/upload', resumeRoutes);
app.use('/analyse',resumeAnalyser);
app.use('/analyse', express.static(path.join(__dirname, 'uploads')));
app.use('/findjob', findjobs)


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
