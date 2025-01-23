import jwt from "jsonwebtoken";

//Middleware for user authetication
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({success:false,message:"Not Authorised Login again"})
    }
    console.log("Received dToken:", dtoken);
    const token_decode = jwt.verify(dtoken, process.env.JWT_SERCET)
   req.body.docid=token_decode.id
   console.log("Decoded docid:", token_decode.id);

next()

  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authDoctor;
