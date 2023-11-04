import { Utilisateur } from "../models/index.js"

//Importer le module de hashage
import bcrypt from "bcryptjs"


export const ajouterUtilisateur = async(req,res)=>{

    const{nom,prenom,email,motDePasse,dateDeNaissance} = req.body 
    //Hasher le mot de passe
    const mdpCrypt = bcrypt.hashSync(motDePasse,10)

    const utilisateur = {nom,prenom,email,motDePasse:mdpCrypt,dateDeNaissance} 

    try{
        await Utilisateur.create(utilisateur)
        res.status(201).json({message:"L'utilisateur a été ajouté avec succès"})
    }catch(error){
        res.status(400).json({message:"Problème avec la création de l'utilisateur"})
    }
}

export const listeUtilisateur= async(req,res)=>{
    try{
        // Retourner la liste complete des utilisateurs
        const resultat = Utilisateur.findAll()
        res.status(200).json({data:resultat})
    }
    catch(erreur){
        res.status(404).json({erreur:erreur.message})
    }
}

export const UtilisateurParId = async(req,res)=>{

    const id = req.params.id
    console.log("notre id",id)
    try{
        const utilisateur = await Utilisateur.findByPk(id) // utiliser findByPk puisqu'on chercher pour l'ID
        res.status(200).json({data:utilisateur})
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const supprimerUtilisateur = async(req,res)=>{

    const id = req.params.id
    if(!parseInt(id)){
        return  res.status(200).json({message:"Erreur ! Vous devez entrer un entier ici"})
    }
    try{

        await Utilisateur.destroy({where:{id}})
        res.status(200).json({message:"L'utilisateur a été supprimé avec succès"})

    }catch(error){
        res.status(400).json({message:"Problème avec la suppression de l'utilisateur"})
    }
}

export const updateUtilisateur = async(req,res)=>{

    const {id} = req.params
    const nouvelleUtilisateur = req.body
    try{
        await Utilisateur.update(nouvelleUtilisateur,{where:{id}})
        res.status(201).json({message:"L'utilisateur a été mise a jour avec succès"})
    }catch(error){
        res.status(400).json({message:"Problème avec la mise a jour de l'utilisateur"})
    }
}
