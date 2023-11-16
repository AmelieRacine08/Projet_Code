//Importer jwt
import  jwt  from "jsonwebtoken";
import { Utilisateur } from "../models/index.js";

export const verifierToken = (req,res,next)=>{
    //Recuperation du token
    const bearerToken = req.headers.authorization

    //Verification de la presence du token
    if(!bearerToken) return res.status(401).json({message:"Vous n'êtes pas connecté"})

    //Recuperer le token sans la partie Bearer
    const token = bearerToken.split(' ')[1]

   jwt.verify(token,process.env.CODE_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({message: err.message})            
        }
        if (payload) {
            req.userId = payload.id;
            next();
        } else {
            return res.status(401).json({ message: "Token malformé" });
        }        
    })
}

export const isAdministrateur = async (req, res, next) => {
    // Recuperer l'id a partir de la req
    const id = req.userId;

    // Chercher la personne dans la base de donnees
    try {
        const user = await Utilisateur.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Cet utilisateur n'existe pas!" });
        }

        // Recuperer le role de la personne
        try {
            const role = await user.getRole();

            // Check if the role exists before accessing its properties
            if (role && role.categorie.toLowerCase() === 'Administration') {
                next();
            } else {
                return res.status(403).json({ message: "Cette fonctionnalité n'est pas disponible pour votre compte" });
            }
        } catch (roleError) {
            return res.status(500).json({ message: "Erreur lors de la récupération du rôle de l'utilisateur", error: roleError.message });
        }
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la recherche de l'utilisateur", error: error.message });
    }
};