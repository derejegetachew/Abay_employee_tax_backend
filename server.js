require('dotenv').config();
const limiter=require("./utils/rateLimit.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const log = require('node-file-logger');

const app = express();
var corsOptons = {
	origin: ["http://localhost:3000","http://localhost:8081/","http://10.1.50.108:3000","http://10.1.50.108:3001"]
		};

app.use (cors(corsOptons));
// parse requests of content-type - application/json
app.use (bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use (bodyParser.urlencoded({extended:true}));
// import the db
const db = require("./model/db.js");
const AppError = require("./utils/appError.js");
const controllerMiddleWare = require('./utils/controllerMiddleWare.js');
app.use(limiter);
db.sequelize.sync().then(() => {
  //console.log("resync db."); 
    }); 
  
//add route 
app.use("/price",require("./routes/gasPriceRoutes.js"));
app.use("/allowance",require("./routes/allowanceRoutes.js"));

app.use("/branch",require("./routes/branchRoutes.js"));
app.use("/people",require("./routes/peopleRoutes.js"));
app.use("/api",require("./routes/tutorialRoutes.js"));

app.all('*',(req,res,next)=>{
  const err=new AppError(`Can't find the ${req.originalUrl} on the Server!`,404);
   next(err);
})
app.use(controllerMiddleWare);
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  log.Info(`Server Running at ${PORT} on ${process.env.running_environment}...`);
  console.log (`Server is running on port ${PORT}.`);
});
