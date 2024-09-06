const pdfjs = require('pdfjs-dist/es5/build/pdf');
const puppeteer = require('puppeteer');
const { GoogleGenerativeAI } = require("@google/generative-ai");

GEMINI_API = 'AIzaSyDDGFsejdY2mpvKMgCh2GFq_vPH4yvc2QY'

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_API);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function run(src){
    // console.log(src);
    const prompt = `
    Extract relevant information from the following resume content.

    **Resume Content**

    ${src.join('\n')}

    **Extract the Following Information**

    * Technical skills (e.g., programming languages, software proficiency)
    * Work experience (e.g., job titles, company names, dates of employment)
    * Education (e.g., degrees earned, institutions attended)
    * General information (e.g., name, contact information, objective statement)

    **Format the Extracted Information as JSON**

    {
      "generalInfo": [
        {
          'Name' : '',
          'ContactInfo' : '',
          'Summary' : '',
          'Email' : '',
          'Phone' : '',
          'Address' : '',
          'GitHub' : '',
          'LinkedIn' : '', 
        }
      ],
      "education": [
        {
            "degree": "",
            "major": "",
            "institution": "",
            "year": ""
        }
      ],
      "experience": [
        {
            "jobTitle" : "",
            "company" : "",
            "Duration" : ""
        }
      ],
      "technicalSkills": [
        {
          "category":'',
          "Skills":''
        }
      ],
      "projects": [
        {
          "title": "",
          "description": "",
          "technologies": []
        }
      ],
    }
    `;
const result = await model.generateContent(
        prompt,
        generationConfig
);

const response = await result.response;

const text = await response.text();
const jsonRegex = /{[\s\S]*}/;
const jsonString = text.match(jsonRegex)[0];
let jsonData = JSON.parse(jsonString);
return jsonData
}

async function getItems(src, action) {
    const doc = await pdfjs.getDocument(src).promise;
    let textItems = [];

    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
        const page = await doc.getPage(pageNumber);
        const content = await page.getTextContent();
        const items = content.items.map((item) => item.str);
        textItems = [...textItems, ...items];
    }

    // const links = await extractLinks(src);
    // const identifiedLinks = identifyLinks(links);
    // console.log(links);
    if(action === 'scorer'){
      return run(textItems)
    }
}

// async function extractLinks(src) {
//     console.log(src);
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(`file://${src}`);
//     const links = await page.$$eval('a', (links) => links.map((link) => link.href));
//     await browser.close();
//     console.log(links);
//     return links;
// }

// function identifyLinks(links) {
//     const identifiedLinks = {
//         gmail: [],
//         linkedin: [],
//         github: [],
//         other: []
//     };

//     links.forEach((link) => {
//         if (link.includes('gmail.com')) {
//             identifiedLinks.gmail.push(link);
//         } else if (link.includes('linkedin.com')) {
//             identifiedLinks.linkedin.push(link);
//         } else if (link.includes('github.com')) {
//             identifiedLinks.github.push(link);
//         } else {
//             identifiedLinks.other.push(link);
//         }
//     });

//     return identifiedLinks;
// }

module.exports = { getItems };