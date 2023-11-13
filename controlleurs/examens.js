import { validationResult } from "express-validator";
import { Examen } from "../models/index.js";

export const ajouterExamen = async (req, res) => {

    const { matiere, date_examen, horaire_de_debut, horaire_de_fin, salle_examen } = req.body // Ajusté conforme les autres controlleurs

    const examen = { matiere, date_examen, horaire_de_debut, horaire_de_fin, salle_examen }
    console.log("examen", examen)

    // Examen ajoute car il n'a pas de Validation Result(req) ni condition if (!erreurs.isEmpty())

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
            res.status(200).json({ Examens: resultat })
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
            res.status(200).json({ Examen: examen })
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

/**  pas capable de updateExamen
 * {
    "erreurs": [
        {
            "type": "field",
            "value": "2022-11-14",
            "msg": "La date d'examen n'est pas valide",
            "path": "date_examen",
            "location": "body"
        },
        {
            "type": "field",
            "value": "18:41:36",
            "msg": "L'horaire de début n'est pas valide",
            "path": "horaire_de_debut",
            "location": "body"
        },
        {
            "type": "field",
            "value": "19:12:47",
            "msg": "L'horaire de fin n'est pas valide",
            "path": "horaire_de_fin",
            "location": "body"
        }
    ]
}
 * 
 * 
 */


        res.status(400).json({ erreurs: erreurs.array() })
    } else {
        try {
            await Examen.update(nouvelleExamen, { where: { id } })
            res.status(201).json({ message: "L'examen a été mis à jour avec succès" })
        } catch (error) {
            res.status(400).json({ message: "Problème avec la mise a jour de l'examen" })
        }
    }
}

// Definenir la fonction estDateValide 
export function estDateValide(date) {
    // Verifier si la date est valide - format "YYYY-MM-DD"
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date)
}

// Definenir la fonction EstTempsValide 
export function EstTempsValide(time) {
    // Format "HH:MM" 
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    return timeRegex.test(time);
}