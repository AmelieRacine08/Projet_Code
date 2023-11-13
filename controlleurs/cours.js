import { Cour } from "../models/index.js";


export const ajouterCour = async(req,res)=>{

    const{cours_id,nom_du_cours,salle_du_cours,credits} = req.body 
    const cour = {cours_id,nom_du_cours,salle_du_cours,credits} 

    try{
        await Cour.create(cour)
        res.status(201).json({message:"Le cour a été ajouté avec succès"})
    }catch(error){
        res.status(400).json({message:"Problème avec la création du cour"})
    }
}

export const listeCour= async(req,res)=>{
    try{
        // Retourner la liste complete des cours
        const resultat = await Cour.findAll()

        if(resultat.length === 0){
            res.status(404).json({erreur:"Aucun cours trouvé"})
        }
        else{
            res.status(200).json({Cours:resultat})
        }        
    }
    catch(erreur){
        res.status(404).json({erreur:erreur.message})
    }
}

export const CourParId = async(req,res)=>{

    const id = req.params.id

    if(!parseInt(id)){
        return  res.status(200).json({message:"Erreur ! Vous devez entrer un ID"})
    }

    try{
        const cour = await Cour.findByPk(id) // utiliser findByPk puisqu'on cherche pour l'ID
        if(cour){
            res.status(200).json({Cour:cour})
        }
        else{
            res.status(404).json({erreur:"Aucun cours trouvé avec l'ID entré."})

        }
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const supprimerCour = async(req,res)=>{

    const id = req.params.id
    if(!parseInt(id)){
        return  res.status(200).json({message:"Vous devez entrer un entier ici"})
    }
    try{

        const resultatSuppression = await Cour.destroy({where:{id}})
        if(resultatSuppression === 0){
            res.status(404).json({message:"Aucune cours trouvé avec l'ID entré."})
        }
        else{
            res.status(200).json({message:"Le cours a été supprimé avec succès"})
        }

    }catch(error){
        res.status(400).json({message:"Erreur avec la suppression du cour"})
    }
}

export const updateCour = async(req,res)=>{

    const {id} = req.params
    const nouveauCour = req.body
    try{
        const resultatUpdate = await Cour.update(nouveauCour,{where:{id}})
        if(resultatUpdate[0]===0){
            res.status(404).json({ message: "Aucun cour trouvé avec l'ID fourni. La mise à jour n'a pas été effectuée." });
        }
        else{
            res.status(201).json({message:"Le cour a été mis à jour avec succès"})
        }
    }catch(error){
        res.status(400).json({message:"Problème avec la mise a jour du cour"})
    }
}
