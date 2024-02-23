const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.use(express.json());

const htmlToPdf = async (req, res) => {
  const { url } = req.body;
  console.log(url)

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const pdf = await page.pdf();

  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.send(pdf);
};

module.exports = htmlToPdf;
