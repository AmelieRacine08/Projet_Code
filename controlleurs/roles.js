import { Role } from "../models/index.js"
import { validationResult } from "express-validator"

export const ajouterRole = async (req, res) => {

    const role = { categorie: req.body.categorie }

    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
        res.status(400).json({ erreurs: erreurs.array() })
    } else {

        try {
            await Role.create(role)
            res.status(201).json({ message: "Le role a été ajouté avec succès" })
        } catch (error) {
            res.status(400).json({ message: "Problème avec la création du role" })
        }
    }
}


export const listeRole = async (req, res) => {
    // Retourner la liste complete des roles
    const resultat = Role.findAll()
    try {
        res.status(200).json({ data: resultat })
    }
    catch (erreur) {
        res.status(404).json({ erreur: erreur.message })
    }
}

export const RoleParId = async (req, res) => {

    const id = req.params.id
    console.log(id)
    try {
        const role = await Role.findByPk(id) // utiliser findByPk puisqu'on cherche pour l'ID
        res.status(200).json({ data: role })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const supprimerRole = async (req, res) => {

    const id = req.params.id
    if (!parseInt(id)) {
        return res.status(400).json({ message: "Vous devez entrer un entier ici" })
    }
    try {

        await Role.destroy({ where: { id } })
        res.status(200).json({ message: "Le role a été supprimé avec succès" })

    } catch (error) {
        res.status(400).json({ message: "Erreur avec la suppression du role" })
    }
}

export const updateRole = async (req, res) => {

    const { id } = req.params
    const nouveauRole = req.body
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
        res.status(400).json({ erreurs: erreurs.array() })
    } else {

        try {
            await Role.update(nouveauRole, { where: { id } })
            res.status(201).json({ message: "Le role a été mis à jour avec succès" })
        } catch (error) {
            res.status(400).json({ message: "Problème avec la mise a jour du role" })
        }
    }

}

