// const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const { LOCAL_CLIENT, CLIENT, Test } = require("../config/defaults");


const applyMiddleware = (app) => {
  // middleware
  app.use(
    cors({
      origin: ['https://curious-dragon-bfb4a4.netlify.app', 'http://localhost:5173', Test],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
};

module.exports = applyMiddleware;
