import { Bulletin } from "../models/index.js";

export const ajouterBulletin = async(req,res)=>{

    const{bulletin_id,moyenne} = req.body 
    const bulletin = {bulletin_id,moyenne} 

    try{
        await Bulletin.create(bulletin)
        res.status(201).json({message:"Le bulletin a été ajouté avec succès"})
    }catch(error){
        res.status(400).json({message:"Problème avec la création du bulletin"})
    }
}

export const listeBulletin= async(req,res)=>{
    try{
        // Retourner la liste complete des bulletins
        const resultat = Bulletin.findAll()
        res.status(200).json({data:resultat})
    }
    catch(erreur){
        res.status(404).json({erreur:erreur.message})
    }
}

export const BulletinParId = async(req,res)=>{

    const id = req.params.id
    console.log(id)
    try{
        const bulletin = await Bulletin.findByPk(id) // utiliser findByPk puisqu'on cherche pour l'ID
        res.status(200).json({data:bulletin})
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const supprimerBulletin = async(req,res)=>{

    const id = req.params.id
    if(!parseInt(id)){
        return  res.status(200).json({message:"Vous devez entrer un entier ici"})
    }
    try{

        await Bulletin.destroy({where:{id}})
        res.status(200).json({message:"Le bulletin a été supprimé avec succès"})

    }catch(error){
        res.status(400).json({message:"Erreur avec la suppression du bulletin"})
    }
}

export const updateBulletin = async(req,res)=>{

    const {id} = req.params
    const nouveauBulletin = req.body
    try{
        await Bulletin.update(nouveauBulletin,{where:{id}})
        res.status(201).json({message:"Le bulletin a été mis à jour avec succès"})
    }catch(error){
        res.status(400).json({message:"Problème avec la mise a jour du bulletin"})
    }
}