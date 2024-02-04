const express = require("express");
const applyMiddleware = require("./middlewares");
// const globalErrorHandler = require("./utils/globalErrorHandler");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require('./routes/v1/authentication/index');
const serviceRoutes = require('./routes/v1/services/index')

applyMiddleware(app);



app.use(authRoutes)
app.use(serviceRoutes)
app.get("/", (req, res) => {
  res.send("doctor is running....");
});

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});

// error handling middleware
// app.use(globalErrorHandler);





const main=async ()=>{
    await connectDB()
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
   
}


main()