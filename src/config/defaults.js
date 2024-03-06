
require("dotenv").config();

const config = {
  LOCAL_CLIENT: process.env.LOCAL_CLIENT,
  CLIENT: process.env.CLIENT,
  Test: process.env.Test_Site
};

module.exports = Object.freeze(config);
