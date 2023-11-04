// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterUtilisateur, listeUtilisateur, UtilisateurParId, supprimerUtilisateur,updateUtilisateur } from "../controlleurs/utilisateurs.js"
import { verifierToken } from "../auth/autorisation.js"

const routesUtilisteur = Router()

routesUtilisteur.get('/', verifierToken, listeUtilisateur)
    .get('/:id', UtilisateurParId)
    .post ('/', ajouterUtilisateur)
    .put('/:id', updateUtilisateur)
    .delete('/:id', supprimerUtilisateur)

    export default routesUtilisteur
