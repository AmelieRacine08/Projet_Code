import { Utilisateur } from "../models/index.js"
import { validationResult } from "express-validator"

//Importer le module de hashage
import bcrypt from "bcryptjs"


export const ajouterUtilisateur = async(req,res)=>{

    const { nom, prenom, email, motPasse, dateDeNaissance,/* BulletinId, ProgrammeId, RoleId */} = req.body

    //Hacher le mot de passe
    const mdpCrypte=bcrypt.hashSync(motPasse,10)
    
    const utilisateur = {nom,prenom,email,motPasse:mdpCrypte, dateDeNaissance/*, BulletinId, ProgrammeId, RoleId*/}
    console.log("Utilisateur",utilisateur)
    
    const erreurs = validationResult(req);

    if(!erreurs.isEmpty()){
    console.log("On est la avec l'erreur",erreurs) // L'erreur est ici On est la avec l'erreur Result {
      /*  formatter: [Function: formatter],
        errors: [
          {
            type: 'field',
            value: undefined,
            msg: 'Le mot de passe est requis',
            path: 'motDePasse',
            location: 'body'
          },
          {
            type: 'field',
            value: '1997-03-08',
            msg: "La date d'examen n'est pas valide",
            path: 'dateDeNaissance',
            location: 'body'
          }
        ]
      }*/
        res.status(400).json({erreurs: erreurs.array()})

    }else{

        try{
            await Utilisateur.create(utilisateur)
            res.status(201).json({message:"L'utilisateur a été ajouté avec succès"})
        }catch(error){
            res.status(400).json({message:"Problème avec la création de l'utilisateur"})
        }
    }
}

export const listeUtilisateur= async(req,res)=>{
    try{
        // Retourner la liste complete des utilisateurs
        const resultat = await Utilisateur.findAll()

        if(resultat.length === 0){
            res.status(404).json({ erreur: "Aucun utilisateur trouvé." });
            
        }
        else {
            res.status(200).json({Utilisateurs:resultat})
        }        
    }
    catch(erreur){
        res.status(404).json({erreur:erreur.message})
    }
}

export const UtilisateurParId = async(req,res)=>{

    const id = req.params.id

    if(!parseInt(id)){
        return  res.status(200).json({message:"Erreur ! Vous devez entrer un ID"})
    }
    
    try{
        const utilisateur = await Utilisateur.findByPk(id) // utiliser findByPk puisqu'on chercher pour l'ID
        
        if(utilisateur){
            res.status(200).json({Utilisateur:utilisateur})
        }
        else{
            res.status(404).json({ erreur:"Aucun utilisateur trouvé avec l'ID entré."})
        }
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
        const resultatSuppression = await Utilisateur.destroy({where:{id}})

        if(resultatSuppression === 0){
            res.status(404).json({ message: "Aucun utilisateur trouvé avec l'ID entré." });
        }
        else{
            res.status(200).json({message:"L'utilisateur a été supprimé avec succès"})
        }

    }catch(error){
        res.status(400).json({message:"Problème avec la suppression de l'utilisateur"})
    }
}

export const updateUtilisateur = async(req,res)=>{

    const {id} = req.params
    const nouvelleUtilisateur = req.body
    const erreurs = validationResult(req);

    if(!erreurs.isEmpty()){

        /* erreur recu lors de l'updateUtilisateur
        {
    "erreurs": [
        {
            "type": "field",
            "msg": "Le mot de passe est requis",
            "path": "motDePasse",
            "location": "body"
        },
        {
            "type": "field",
            "msg": "La date de naissance est requise",
            "path": "dateDeNaissance",
            "location": "body"
        },
        {
            "type": "field",
            "msg": "La date d'examen n'est pas valide",
            "path": "dateDeNaissance",
            "location": "body"
        }
    ]
}
        */
        res.status(400).json({erreurs: erreurs.array()})
    }else{

        try{
            await Utilisateur.update(nouvelleUtilisateur,{where:{id}})
            res.status(201).json({message:"L'utilisateur a été mise a jour avec succès"})
        }catch(error){
            res.status(400).json({message:"Problème avec la mise a jour de l'utilisateur"})
        }
    }
    
}
