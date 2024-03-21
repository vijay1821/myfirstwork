const jwt= require('jsonwebtoken');
const config=require('./config');
module.exports=(credentials=[])=>{
    return(req,res,next)=>{
        console.log("Authorization middaleware");
if(typeof credentials=== "string"){

    credentials=[credentials];
}
        const token=req.headers['authorization'];
        if(!token){
            return res.status(401).send("sorry access is  denied!!");
        }else{

        const tokenbody=token.slice(7);
        jwt.verify(tokenbody, config.JWT_SECRET,(err,decoded)=>{
            if(err){
                console.log('JWT error'+(err));
                return res.status(401).send("Error:Access Denied");
            }

            if(credentials.length>0){
                if(
                    decoded.scopes &&
                     decoded.scope.length &&
                     credentials.some(cred=>decoded.scopes.indexOf(cred)>=0)){
                    next();
                }else{
                    return res.status(401).send("error:access denied");
                }
            } else{
                next();
            }
        
        });
        }
    };
};