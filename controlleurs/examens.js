import { validationResult } from "express-validator";
import { Examen } from "../models/index.js";

export const ajouterExamen = async (req, res) => {

    const { examen_id, matiere, date_examen, horaire_de_fin, salle_examen } = req.body
    const examen = { examen_id, matiere, date_examen, horaire_de_fin, salle_examen }

    try {
        await Examen.create(examen)
        res.status(201).json({ message: "L'examen a été ajouté avec succès" })
    } catch (error) {
        res.status(400).json({ message: "Problème avec la création de l'examen" })
    }
}

export const listeExamen = async (req, res) => {
    try {
        // Retourner la liste complete des bulletins
        const resultat = await Examen.findAll()

        if(resultat.length === 0){
            res.status(404).json({erreur: "Aucun examen trouvé"})
        }
        else{
            res.status(200).json({ data: resultat })
        }        
    }
    catch (erreur) {
        res.status(404).json({ erreur: erreur.message })
    }
}

export const ExamenParId = async (req, res) => {

    const id = req.params.id

    if(!parseInt(id)){
        return  res.status(200).json({message:"Erreur ! Vous devez entrer un ID"})
    }
    try {
        const examen = await Examen.findByPk(id) // utiliser findByPk puisqu'on cherche pour l'ID

        if(examen){
            res.status(200).json({ data: examen })
        }
        else{
            res.status(404).json({ erreur: "Aucun examen trouvé avec l'ID entré." })
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const supprimerExamen = async (req, res) => {

    const id = req.params.id
    if (!parseInt(id)) {
        return res.status(200).json({ message: "Vous devez entrer un entier ici" })
    }
    try {

        const resultatSuppression = await Examen.destroy({ where: { id } })
        if(resultatSuppression === 0){
            res.status(404).json({ message: "Aucun examen trouvé avec l'ID entré" })
        }
        else{
            res.status(200).json({ message: "L'examen' a été supprimé avec succès" })
        }

    } catch (error) {
        res.status(400).json({ message: "Erreur avec la suppression de l'examen" })
    }
}

export const updateExamen = async (req, res) => {

    const { id } = req.params
    const nouvelleExamen = req.body

    const erreurs = validationResult(req);

    if (!erreurs.isEmpty()) {

        res.status(400).json({ erreurs: erreurs.array() })
    } else {
        try {
            await Examen.update(nouvelleExamen, { where: { id } })
            res.status(201).json({ message: "L'examen a été mis à jour avec succès" })
        } catch (error) {
            res.status(400).json({ message: "Problème avec la mise a jour de l'examen" })
        }
    }
    try {
        await Examen.update(nouvelleExamen, { where: { id } })
        res.status(201).json({ message: "L'examen a été mis à jour avec succès" })
    } catch (error) {
        res.status(400).json({ message: "Problème avec la mise a jour de l'examen" })
    }
}

// Definenir la fonction estDateValide 
export function estDateValide(date) {
    // Regarder si la date est valide
    return date instanceof Date && !isNaN(date);
}

// Definenir la fonction EstTempsValide 
export function EstTempsValide(time) {
    // Format "HH:MM" 
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    return timeRegex.test(time);
}