//Importer le modele de l'utilisateur
import { Utilisateur } from "../models/Utilisateur.js";

//Importer le module qui cree le jeton d'authentification (token)
import Jwt from "jsonwebtoken";

//Importer le module de hachage
import bcrypt from "bcryptjs"

export const login = async (req,res) => {
    //Recuperation du login et mot de passe de l'utilisateur
    const {email,motPasse} = req.body

    if(!email) return res.status(404).json({message:"L'email est obligatoire!"})

    try{
        //Allons chercher l'utilisateur dans la base de donnee
        const user = await Utilisateur.findOne({where:{email}})
        if(!user) return res.status(404).json({ message: "Cet utilisateur n'existe pas" })

        //Verification du mot de passe
        const mdpVerifie = bcrypt.compareSync(motPasse,user.motPasse)
        if(!mdpVerifie) return res.status(400).json({ message: "Mot de passe incorrect" })

        //Tout est correct, nous allons donner la clef (token) a l'utilisateur

        const payload = {id: user.id}

        const token = Jwt.sign(payload,process.env.CODE_SECRET)

        res.status(200).json({data: user,token})

    }catch(error){
        res.status(404).json({message: error.message})
    }

}