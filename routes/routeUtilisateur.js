// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterEtudiant, etudiantParId, listEtudiant, modifierEtudiant, supprimerEtudiant} from "../controlleurs/utilisateurs.js"

const routesUtilisteur = Router()

//Les routes deviennent - mettre a jour selon controlleur Amelie

router.get('/', listEtudiant)
.get('/:id', etudiantParId)
.post ('/', ajouterEtudiant)
.put('/:id', modifierEtudian)
.delete('/:id', supprimerEtudiantEtudian)