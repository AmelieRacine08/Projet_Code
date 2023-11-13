import { Programme } from "../models/index.js";
import { validationResult } from "express-validator";

export const ajouterProgramme = async (req, res) => {

    const { nom_du_programme, date_de_debut, date_de_fin } = req.body

    const programme = { nom_du_programme, date_de_debut, date_de_fin }
    console.log("programme", programme)

    const erreurs = validationResult(req)

    if (!erreurs.isEmpty()) {
        res.status(400).json({ erreurs: erreurs.array() })
    } else {

        try {
            await Programme.create(programme)
            res.status(201).json({ message: "Le programme a été ajouté avec succès" })
        } catch (error) {
            res.status(400).json({ message: "Problème avec la création du programme" })
        }
    }
}

export const listeProgramme = async (req, res) => {
    try {
        // Retourner la liste complete des programmes
        const resultat = await Programme.findAll()

        if (resultat.length === 0) {
            res.status(404).json({ erreur: "Aucun programme trouvé." })
        }
        else {
            res.status(200).json({ Programmes: resultat })
        }
    }
    catch (erreur) {
        res.status(404).json({ erreur: erreur.message })
    }
}

export const ProgrammeParId = async (req, res) => {

    const id = req.params.id

    if (!parseInt(id)) {
        return res.status(200).json({ message: "Erreur ! Vous devez entrer un ID" })
    }

    try {
        const programme = await Programme.findByPk(id) // utiliser findByPk puisqu'on cherche pour l'ID

        if (programme) {
            res.status(200).json({ Programme: programme })
        }
        else {
            res.status(404).json({ erreur: "Aucun programme trouvé avec l'ID entré." })
        }

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const supprimerProgramme = async (req, res) => {

    const id = req.params.id
    if (!parseInt(id)) {
        return res.status(200).json({ message: "Vous devez entrer un entier ici" })
    }
    try {

        const resultatSuppression = await Programme.destroy({ where: { id } })

        if (resultatSuppression === 0) {
            res.status(404).json({ message: "Aucun programme trouvé avec l'ID entré" })

        }
        else {
            res.status(200).json({ message: "Le programme a été supprimé avec succès" })
        }

    } catch (error) {
        res.status(400).json({ message: "Erreur avec la suppression du programme" })
    }
}

export const updateProgramme = async (req, res) => {

    const { id } = req.params
    const nouveauProgramme = req.body
    const erreurs = validationResult(req)
    if (!erreurs.isEmpty()) {
        res.status(400).json({ erreurs: erreurs.array() })
    }
    try {
        const resultatUpdate = await Programme.update(nouveauProgramme, { where: { id } })
        if(resultatUpdate[0]===0){
            res.status(404).json({ message: "Aucun programme trouvé avec l'ID fourni. La mise à jour n'a pas été effectuée." });
        } 
        else{
            res.status(201).json({ message: "Le programme a été mis à jour avec succès" })
        }           
    } catch (error) {
        res.status(400).json({ message: "Problème avec la mise a jour du programme" })
    }
}

export function estDateValide(date) {
    // Verifier si la date est valide - format "YYYY-MM-DD"
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date)
}