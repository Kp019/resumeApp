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


const calculateAIScore = async (resume) => {
  if (!resume) {
    throw new Error('Invalid input data');
  }

  const AnalysisData = {}

  try {
    const aiScore = await generateAIScore(resume)
    console.log(aiScore);
    return aiScore;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to calculate score');
  }
};

const generateAIScore = async (resume) => {
  const prompt = `score the resume data given : ${JSON.stringify(resume)} out of 100 and suggest jobs for the given resume. Get me the score out of 100 in json format with keys: score, jobs and suggestions. Avoid all the explanations.`
  const result = await model.generateContent(prompt, generationConfig);
  const response = await result.response;
  const text = await response.text();
//   console.log(text);
  const jsonRegex = /{[\s\S]*}/;
  const jsonString = text.match(jsonRegex);
  const aiScore = JSON.parse(jsonString);
//   console.log('aiscore = ',aiScore);
  return aiScore;
};

module.exports = { calculateAIScore };