import { Cour } from "../models/Cour.js";


export const ajouterCour = async(req,res)=>{

    const{cours_id,nom_du_cours,salle_du_cours,credits} = req.body 
    const Cour = {cours_id,nom_du_cours,salle_du_cours,credits} 

    try{
        await Cour.create(Cour)
        res.status(201).json({message:"Le cour a été ajouté avec succès"})
    }catch(error){
        res.status(400).json({message:"Problème avec la création du cour"})
    }
}

export const listeCour= async(req,res)=>{
    try{
        // Retourner la liste complete des cours
        const resultat = Cour.findAll()
        res.status(200).json({data:resultat})
    }
    catch(erreur){
        res.status(404).json({erreur:erreur.message})
    }
}

export const CourParId = async(req,res)=>{

    const id = req.params.id
    console.log(id)
    try{
        const cour = await Cour.findByPk(id) // utiliser findByPk puisqu'on chercher pour l'ID
        res.status(200).json({data:cour})
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const supprimerCour = async(req,res)=>{

    const id = req.params.id
    if(!parseInt(id)){
        return  res.status(200).json({message:"Erreur ! Vous devez entrer un entier ici"})
    }
    try{

        await Cour.destroy({where:{id}})
        res.status(200).json({message:"Le cour a été supprimé avec succès"})

    }catch(error){
        res.status(400).json({message:"Erreur avec la suppression du cour"})
    }
}

export const updateCour = async(req,res)=>{

    const {id} = req.params
    const nouveauCour = req.body
    try{
        await Cour.update(nouveauCour,{where:{id}})
        res.status(201).json({message:"Le cour a été mis à jour avec succès"})
    }catch(error){
        res.status(400).json({message:"Problème avec la mise a jour du cour"})
    }
}
