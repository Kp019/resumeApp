const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/', async function (req, res) {
  console.log('hdvksb');
  const job = req.body.body;
  const location = req.body.loc;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www.indeed.com/jobs?q=${job}&l=${location}&fromage=1&sort=date`);

    await page.waitForSelector('.job_seen_beacon');

    const jobCards = await page.$$eval('.job_seen_beacon', (cards) => {
      return cards.map((card) => {
        const title = card.querySelector('.jobTitle').textContent.trim();
        const company = card.querySelector('.company-name').textContent.trim();
        // const location = card.querySelector('.location').textContent.trim();
        // const description = card.querySelector('.summary').textContent.trim();
        // const url = card.querySelector('.jobTitle a').href;

        return {
          title,
          company,
        //   location,
        //   description,
        //   url,
        };
      });
    });

    await browser.close();

    res.json(jobCards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape jobs from Indeed' });
  }
});

module.exports = router;