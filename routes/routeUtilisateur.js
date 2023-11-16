// fonction permettant de creer des routes
import {Router} from "express"
import {ajouterUtilisateur, listeUtilisateur, UtilisateurParId, supprimerUtilisateur,updateUtilisateur } from "../controlleurs/utilisateurs.js"
import { isAdministrateur, verifierToken } from "../auth/autorisation.js"
import {ajouterUtilisateurValidation, updateUtilisateurValidation} from "../validations/UtilisateurValidation.js"

const routesUtilisateur = Router()

//Application de la validation et de la l'authentification
routesUtilisateur.get('/',verifierToken, isAdministrateur, listeUtilisateur); //Seule ajouterUtilisateur n'aura pas besoin d'un token
routesUtilisateur.get('/:id',verifierToken, UtilisateurParId)
routesUtilisateur.post ('/', ajouterUtilisateurValidation, ajouterUtilisateur)
routesUtilisateur.put('/:id', updateUtilisateurValidation, verifierToken, updateUtilisateur)
routesUtilisateur.delete('/:id', verifierToken, supprimerUtilisateur)

export default routesUtilisateur
