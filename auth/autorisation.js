//Importer jwt
import  Jwt  from "jsonwebtoken";

const verifierToken = (req,res,next)=>{
    //Recuperation du token

    const bearerToken = req.headers.authorization

    //Verification de la presence du token
    if(!bearerToken) return res.status(401).json({message:"Vous n'êtes pas connecté"})

    //Recuperer le token sans la partie Bearer
    const token = bearerToken.split(' ')[1]

    Jwt.verify(token,process.env.CODE_SECRET,(err,payload)=>{
        if(err){
            res.status(401).json({message: err.message})

            req.userId = payload.userId

            next()
        }
    })
}