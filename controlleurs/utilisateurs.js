import { Utilisateur } from "../models/index.js"
import { validationResult } from "express-validator"

//Importer le module de hashage
import bcrypt from "bcryptjs"


export const ajouterUtilisateur = async (req, res) => {

    const { nom, prenom, email, motPasse, dateNaissance, telephone:numeroTelephone, RoleId} = req.body

    //Hacher le mot de passe
    console.log("Mot de passe ", motPasse)
        const mdpCrypte = bcrypt.hashSync(motPasse, 10)

    const utilisateur = { nom, prenom, email, motPasse: mdpCrypte, dateNaissance, numeroTelephone, RoleId}  
    console.log("Utilisateur ", utilisateur)
    
    const erreurs = validationResult(req);

    if (!erreurs.isEmpty()) {
        
        res.status(400).json({ erreurs: erreurs.array() })

    } else {

        try {
            await Utilisateur.create(utilisateur)
            res.status(201).json({ message: "L'utilisateur a été ajouté avec succès" })
        } catch (error) {
            res.status(400).json({ message: "Problème avec la création de l'utilisateur" })
        }
    }
}

export const listeUtilisateur = async (req, res) => {
    try {
        // Retourner la liste complete des utilisateurs
        const resultat = await Utilisateur.findAll()

        if (resultat.length === 0) {
            res.status(404).json({ erreur: "Aucun utilisateur trouvé." });

        }
        else {
            res.status(200).json({ Utilisateurs: resultat })
        }
    }
    catch (erreur) {
         res.status(404).json({erreur:erreur.message})
    }
}

export const UtilisateurParId = async (req, res) => {

    const id = req.params.id

    if (!parseInt(id)) {
        return res.status(200).json({ message: "Erreur ! Vous devez entrer un ID" })
    }

    try {
        const utilisateur = await Utilisateur.findByPk(id) // utiliser findByPk puisqu'on chercher pour l'ID

        if (utilisateur) {
            res.status(200).json({ Utilisateur: utilisateur })
        }
        else {
            res.status(404).json({ erreur: "Aucun utilisateur trouvé avec l'ID entré." })
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const supprimerUtilisateur = async (req, res) => {

    const id = req.params.id
    if (!parseInt(id)) {
        return res.status(200).json({ message: "Erreur ! Vous devez entrer un entier ici" })
    }
    try {
        const resultatSuppression = await Utilisateur.destroy({ where: { id } })

        if (resultatSuppression === 0) {
            res.status(404).json({ message: "Aucun utilisateur trouvé avec l'ID entré." });
        }
        else {
            res.status(200).json({ message: "L'utilisateur a été supprimé avec succès" })
        }

    } catch (error) {
        res.status(400).json({ message: "Problème avec la suppression de l'utilisateur" })
    }
}

export const updateUtilisateur = async (req, res) => {
    const { id } = req.params
    const { nom, prenom, email, motPasse, dateNaissance, numeroTelephone} = req.body
    const mdpCrypte = bcrypt.hashSync(motPasse, 10)
    const nouvelleUtilisateur = { nom, prenom, email, motPasse: mdpCrypte, dateNaissance, numeroTelephone}
    
    const erreurs = validationResult(req);

    if (!erreurs.isEmpty()) {
        res.status(400).json({ erreurs: erreurs.array() })
    }
    try {
        const resultatUpdate = await Utilisateur.update(nouvelleUtilisateur, { where: { id } })

        if (resultatUpdate[0] === 0) {
           return res.status(404).json({ message: "Aucun utilisateur trouvé avec l'ID fourni. La mise à jour n'a pas été effectuée." });
        } else {
           return res.status(201).json({ message: "L'utilisateur a été mis à jour avec succès" });
        }
    } catch (error) {
        return res.status(400).json({erreurs: message.erreur });
       // message: "Problème avec la mise à jour de l'utilisateur"
    }
}

export function estDateValide(date) {
    // Verifier si la date est valide - format "YYYY-MM-DD"
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date)
}
