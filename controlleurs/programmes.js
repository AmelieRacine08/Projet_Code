import { Programme } from "../models/Programme.js";

export const ajouterProgramme = async(req,res)=>{

    const{programme_id,nom_du_programme,date_de_début,date_de_fin} = req.body 
    const Programme = {programme_id,nom_du_programme,date_de_début,date_de_fin} 

    try{
        await Programme.create(Programme)
        res.status(201).json({message:"Le programme a été ajouté avec succès"})
    }catch(error){
        res.status(400).json({message:"Problème avec la création du programme"})
    }
}

export const listeProgramme= async(req,res)=>{
    try{
        // Retourner la liste complete des programmes
        const resultat = Programme.findAll()
        res.status(200).json({data:resultat})
    }
    catch(erreur){
        res.status(404).json({erreur:erreur.message})
    }
}

export const ProgrammeParId = async(req,res)=>{

    const id = req.params.id
    console.log(id)
    try{
        const programme = await Programme.findByPk(id) // utiliser findByPk puisqu'on chercher pour l'ID
        res.status(200).json({data:programme})
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const supprimerProgramme = async(req,res)=>{

    const id = req.params.id
    if(!parseInt(id)){
        return  res.status(200).json({message:"Erreur ! Vous devez entrer un entier ici"})
    }
    try{

        await Programme.destroy({where:{id}})
        res.status(200).json({message:"Le programme a été supprimé avec succès"})

    }catch(error){
        res.status(400).json({message:"Erreur avec la suppression du programme"})
    }
}

export const updateProgramme = async(req,res)=>{

    const {id} = req.params
    const nouveauProgramme = req.body
    try{
        await Programme.update(nouveauProgramme,{where:{id}})
        res.status(201).json({message:"Le programme a été mis à jour avec succès"})
    }catch(error){
        res.status(400).json({message:"Problème avec la mise a jour du programme"})
    }
}