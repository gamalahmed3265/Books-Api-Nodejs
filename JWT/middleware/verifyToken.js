import jwt from "jsonwebtoken"

export function verifyToken(req,res,next){
    const token=req.headers.token;
    if(token){
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRETKEY_KEY);
            req.user=decode;
            next();
        }catch(err){
            res.status(401).json({message:"invalid token"});
        }
    }else{
        res.status(401).json({message :"no token provided"});
    }
}