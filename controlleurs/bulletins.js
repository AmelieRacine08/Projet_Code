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
        const resultat = await Bulletin.findAll()

        if(resultat.length === 0){
            res.status(404).json({erreur:"Aucun bulletin trouvé."})
        }
        else{
            res.status(200).json({Bulletins:resultat})
        }      
    }
    catch(erreur){
        res.status(404).json({erreur:erreur.message})
    }
}

export const BulletinParId = async(req,res)=>{

    const id = req.params.id

    if(!parseInt(id)){
        return  res.status(200).json({message:"Erreur ! Vous devez entrer un ID"})
    }

    try{
        const bulletin = await Bulletin.findByPk(id) // utiliser findByPk puisqu'on cherche pour l'ID

        if(bulletin){
            res.status(200).json({Bulletin:bulletin})
        }
        else{
            res.status(404).json({erreur:"Aucun bulletin trouvé avec l'ID entré."})
        } 
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

        const resultatSuppression = await Bulletin.destroy({where:{id}})
        if(resultatSuppression === 0){
            res.status(404).json({message:"Aucun bulletin trouvé avec l'ID entré."})
        }
        else{
            res.status(200).json({message:"Le bulletin a été supprimé avec succès"})
        }

    }catch(error){
        res.status(400).json({message:"Erreur avec la suppression du bulletin"})
    }
}

export const updateBulletin = async(req,res)=>{

    const {id} = req.params
    const nouveauBulletin = req.body
    try{
        const resultatUpdate = await Bulletin.update(nouveauBulletin,{where:{id}})
        if(resultatUpdate[0]===0){
            res.status(404).json({ message: "Aucun bulletin trouvé avec l'ID fourni. La mise à jour n'a pas été effectuée." });
        }else{
            res.status(201).json({message:"Le bulletin a été mis à jour avec succès"})
        }
    }catch(error){
        res.status(400).json({message:"Problème avec la mise a jour du bulletin"})
    }
}