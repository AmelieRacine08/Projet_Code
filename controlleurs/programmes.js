import { Programme } from "../models/index.js";
import { validationResult } from "express-validator";

export const ajouterProgramme = async(req,res)=>{
     
    const programme = {
        programme_id: req.body.programme_id,
        nom_du_programme: req.body.nom_du_programme,
        date_de_début: new Date(req.body.date_de_début),
        date_de_fin: new Date (req.body.date_de_fin)
    } 
    const erreurs = validationResult(req)

    if(!erreurs.isEmpty()){
        res.status(400).json({erreurs: erreurs.array()})
    }else{

        try{
            await Programme.create(programme)
            res.status(201).json({message:"Le programme a été ajouté avec succès"})
        }catch(error){
            res.status(400).json({message:"Problème avec la création du programme"})
        }
    }    
}

export const listeProgramme= async(req,res)=>{
    try{
        // Retourner la liste complete des programmes
        const resultat = await Programme.findAll()

        if(resultat.length === 0){
            res.status(404).json({erreur:"Aucun programme trouvé."})
        }
        else{
            res.status(200).json({Programmes:resultat})
        }        
    }
    catch(erreur){
        res.status(404).json({erreur:erreur.message})
    }
}

export const ProgrammeParId = async(req,res)=>{

    const id = req.params.id

    if(!parseInt(id)){
        return  res.status(200).json({message:"Erreur ! Vous devez entrer un ID"})
    }

    try{
        const programme = await Programme.findByPk(id) // utiliser findByPk puisqu'on cherche pour l'ID
        
        if(programme){
            res.status(200).json({Programme:programme})
        }
        else{
            res.status(404).json({erreur:"Aucun programme trouvé avec l'ID entré."})
        }
        
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const supprimerProgramme = async(req,res)=>{

    const id = req.params.id
    if(!parseInt(id)){
        return  res.status(200).json({message:"Vous devez entrer un entier ici"})
    }
    try{

        const resultatSuppression = await Programme.destroy({where:{id}})

        if(resultatSuppression === 0){
            res.status(404).json({message:"Aucun programme trouvé avec l'ID entré"})

        }
        else{
            res.status(200).json({message:"Le programme a été supprimé avec succès"})
        }

    }catch(error){
        res.status(400).json({message:"Erreur avec la suppression du programme"})
    }
}

export const updateProgramme = async(req,res)=>{

    const {id} = req.params
    const nouveauProgramme = req.body
    const erreurs = validationResult(req)
    if(!erreurs.isEmpty()){

        res.status(400).json({erreurs: erreurs.array()})

    }else{

        try{
            await Programme.update(nouveauProgramme,{where:{id}})
            res.status(201).json({message:"Le programme a été mis à jour avec succès"})
        }catch(error){
            res.status(400).json({message:"Problème avec la mise a jour du programme"})
        }
    }
    
}

export function estDateValide(date) {
    // Regarder si la date est valide
    return date instanceof Date && !isNaN(date);    
}