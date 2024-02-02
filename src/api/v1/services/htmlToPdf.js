const express = require("express");
const puppeteer = require('puppeteer');
const htmlToPdf = async (req, res) => {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const pdfBuffer = await page.pdf();
    await browser.close();

    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error converting URL to PDF');
  }
}

module.exports = htmlToPdf;