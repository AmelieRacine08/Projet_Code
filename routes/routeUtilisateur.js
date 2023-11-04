// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterUtilisateur, listeUtilisateur, UtilisateurParId, supprimerUtilisateur,updateUtilisateur } from "../controlleurs/utilisateurs.js"

const routesUtilisteur = Router()

router.get('/', listeUtilisateur)
.get('/:id', UtilisateurParId)
.post ('/', ajouterUtilisateur)
.put('/:id', updateUtilisateur)
.delete('/:id', supprimerUtilisateur)