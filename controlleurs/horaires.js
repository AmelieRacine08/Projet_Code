import { Horaire } from "../models/index.js";
import { validationResult } from "express-validator";

export const ajouterHoraire = async(req,res)=>{

     
    const horaire = {horaire_id: req.body.horaire, jour_de_semaine: req.body.jour_de_semaine,
        horaire_de_debut: req.body.horaire_de_debut, horaire_de_fin: req.body.horaire_de_fin} 

    const erreurs = validationResult(req);

        if(!erreurs.isEmpty()){

            res.status(400).json({erreurs: erreurs.array()})

        }else{

            try{
                await Horaire.create(horaire)
                res.status(201).json({message:"L'horaire a été ajouté avec succès"})
            }catch(error){
                res.status(400).json({message:"Problème avec la création de l'horaire"})
            }
        }

    
}

export const listeHoraire= async(req,res)=>{
    try{
        // Retourner la liste complete des bulletins
        const resultat = Horaire.findAll()
        res.status(200).json({data:resultat})
    }
    catch(erreur){
        res.status(404).json({erreur:erreur.message})
    }
}

export const HoraireParId = async(req,res)=>{

    const id = req.params.id
    console.log(id)
    try{
        const horaire = await Horaire.findByPk(id) // utiliser findByPk puisqu'on cherche pour l'ID
        res.status(200).json({data:horaire})
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const supprimerHoraire = async(req,res)=>{

    const id = req.params.id
    if(!parseInt(id)){
        return  res.status(200).json({message:"Vous devez entrer un entier ici"})
    }
    try{

        await Horaire.destroy({where:{id}})
        res.status(200).json({message:"L'horaire a été supprimé avec succès"})

    }catch(error){
        res.status(400).json({message:"Erreur avec la suppression de l'horaire"})
    }
}

export const updateHoraire = async(req,res)=>{

    const {id} = req.params
    const nouvelleHoraire = req.body

    const erreurs = validationResult(req);

    if(!erreurs.isEmpty()){

        res.status(400).json({erreurs: erreurs.array()})
    }else{
        try{
            await Horaire.update(nouvelleHoraire,{where:{id}})
            res.status(201).json({message:"L'horaire a été mis à jour avec succès"})
        }catch(error){
            res.status(400).json({message:"Problème avec la mise a jour de l'horaire"})
        }  
    }
    try{
        await Horaire.update(nouvelleHoraire,{where:{id}})
        res.status(201).json({message:"L'horaire a été mis à jour avec succès"})
    }catch(error){
        res.status(400).json({message:"Problème avec la mise a jour de l'horaire"})
    }
}