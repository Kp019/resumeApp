const { GoogleGenerativeAI } = require("@google/generative-ai");

GEMINI_API = 'AIzaSyDDGFsejdY2mpvKMgCh2GFq_vPH4yvc2QY'
const genAI = new GoogleGenerativeAI(GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

let ai = 0
let manual = 0

const calculateScore = async (resume, jobRequirements) => {
  if (!resume || !jobRequirements) {
    throw new Error('Invalid input data');
  }

  try {
    const manualScore = await calculateManualScore(resume, jobRequirements);
    const aiScore = await generateAIScore(resume, jobRequirements)
    // console.log(ai);
    const finalScore = (manual + ai) / 2;
    // console.log(manual);
    return finalScore;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to calculate score');
  }
};

const calculateManualScore = async (resume, jobRequirements) => {
  const totalRequirements = jobRequirements.length;
  let matchedRequirements = 0;
  const matchedSet = new Set();

  // Loop through each section in the resume
  for (const section in resume) {
    const sectionData = resume[section];

    // Loop through each item in the section
    for (const item of sectionData) {
      // Loop through each requirement in the job requirements
      for (const requirement of jobRequirements) {
        // Check if the requirement is present in the item and hasn't been matched already
        for (const key in item) {
          const value = item[key];
          if (typeof value === 'string' && value.toLowerCase().includes(requirement.toLowerCase())) {
            if (!matchedSet.has(requirement.toLowerCase())) {
              matchedRequirements++;
              matchedSet.add(requirement.toLowerCase()); // Mark this requirement as matched
              break; // Move to the next requirement
            }
          }
        }
      }
    }
  }
  manual = (matchedRequirements / totalRequirements) * 100; 
  return (matchedRequirements / totalRequirements) * 100;
};

const generateAIScore = async (resume, jobRequirements) => {
  const prompt = `score the resume data given : ${JSON.stringify(resume)} out of 100 for the required job description:${jobRequirements}. Get me the score out of 100 in json format with score as key also avoid all the explanations.`
  const result = await model.generateContent(prompt, generationConfig);
  const response = await result.response;
  const text = await response.text();
  const jsonRegex = /{[\s\S]*}/;
  const jsonString = text.match(jsonRegex)[0];
  const aiScore = JSON.parse(jsonString).score;
  console.log('aiscore = ',aiScore);
  ai = aiScore
  return aiScore;
};

module.exports = { calculateScore };