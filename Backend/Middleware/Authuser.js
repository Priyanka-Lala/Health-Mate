import jwt from "jsonwebtoken";

//Middleware for user authetication
const authuser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({success:false,message:"Not Authorised Login again"})
    }
    const token_decode = jwt.verify(token, process.env.JWT_SERCET)
   req.body.userid=token_decode.id

next()

  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authuser;
