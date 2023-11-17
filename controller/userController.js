const axios = require('axios');
const AppError = require("../utils/appError");
const catchasyncHandler = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
// get  user login
const loginUser = catchasyncHandler(async (req,res)=>{
  const {username, password} = req.body;
  if (!username | !password) {
    throw new AppError(`All Fields are mandatory.`, 400);
  }
  const response = await axios.post(process.env.LOGIN_API, {
    username,
    password,
  });
 console.log(response.data);
   if(response.data.message!="SUCCESS"){
    throw new AppError(`The user have no access please check Your user name and password .`, 401);
   }
   else{ 
   if(response.data.branch_type=='HQ' && response.data.branch_id!='473'){
    throw new AppError(`Your department have no access please check Your user name and password .`, 401);
          }
    const accessToken=jwt.sign({
        user:response.data    
       }, 
  process.env.ACCESS_TOKEN_SECERET,
  {expiresIn:"50m"}
  );
  res.status(200).json({accessToken});
}

  

});


module.exports={loginUser}