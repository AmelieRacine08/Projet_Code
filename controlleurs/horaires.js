import { Horaire } from "../models/index.js";
import { validationResult } from "express-validator";

export const ajouterHoraire = async (req, res) => {

    const { jour_de_semaine, horaire_de_debut, horaire_de_fin } = req.body
    const horaire = { jour_de_semaine, horaire_de_debut, horaire_de_fin }

    const erreurs = validationResult(req.body);

    if (!erreurs.isEmpty()) {        
        res.status(400).json({ erreurs: erreurs.array() })
    }
    try {
        await Horaire.create(horaire)
        res.status(201).json({ message: "L'horaire a été ajouté avec succès" })
    } catch (error) {
        res.status(400).json({ message: "Problème avec la création de l'horaire" })
    }
}


export const listeHoraire = async (req, res) => {
    try {
        // Retourner la liste complete des bulletins
        const resultat = await Horaire.findAll()

        if (resultat.length === 0) {
            res.status(404).json({ erreur: "Aucun horaire trouvé." })

        }
        else {
            res.status(200).json({ Horaires: resultat })
        }
    }
    catch (erreur) {
        res.status(404).json({ erreur: erreur.message })
    }
}

export const HoraireParId = async (req, res) => {

    const id = req.params.id

    if (!parseInt(id)) {
        return res.status(200).json({ message: "Erreur ! Vous devez entrer un ID" })
    }

    try {
        const horaire = await Horaire.findByPk(id) // utiliser findByPk puisqu'on cherche pour l'ID

        if (horaire) {
            res.status(200).json({ Horaire: horaire })
        }
        else {
            res.status(404).json({ erreur: "Aucun horaire trouvé avec l'ID entré." })
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const supprimerHoraire = async (req, res) => {

    const id = req.params.id
    if (!parseInt(id)) {
        return res.status(200).json({ message: "Vous devez entrer un entier ici" })
    }
    try {
        const resultatSuppression = await Horaire.destroy({ where: { id } })

        if (resultatSuppression === 0) {
            res.status(404).json({ message: "Aucun horaire trouvé avec l'ID entré." })
        }
        else {
            res.status(200).json({ message: "L'horaire a été supprimé avec succès" })
        }

    } catch (error) {
        res.status(400).json({ message: "Erreur avec la suppression de l'horaire" })
    }
}

export const updateHoraire = async (req, res) => {

    const { id } = req.params
    const nouvelleHoraire = req.body

    const erreurs = validationResult(req.body);

    if (!erreurs.isEmpty()) {

        res.status(400).json({ erreurs: erreurs.array() })
    }
    try {
        const resultatUpdate = await Horaire.update(nouvelleHoraire, { where: { id } })
        if (resultatUpdate[0] === 0) {
            res.status(404).json({ message: "Aucun horaire trouvé avec l'ID fourni. La mise à jour n'a pas été effectuée." });
        } else {
            res.status(201).json({ message: "L'horaire a été mis à jour avec succès" })
        }
    } catch (error) {
        res.status(400).json({ message: "Problème avec la mise a jour de l'horaire" })
    }
}



// Definenir la fonction EstTempsValide 
export function EstTempsValide(time) {
    // Format "HH:MM:SS" 
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return timeRegex.test(time);
}