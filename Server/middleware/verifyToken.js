import jwt from "jsonwebtoken"

// verifyToken
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
//verifyTokenAndAuthorization
export function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json({message:"You are not allowed, you only can update your profile"})
        }
    })
}
//verifyTokenAnd Admin
export function verifyTokenAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json({message:"You are not allowed, only admin allowed"})
        }
    })
}


