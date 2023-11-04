// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterCour, listeCour, CourParId, supprimerCour,updateCour } from "../controlleurs/cours.js"

const routesCour = Router()

routesCour.get('/', listeCour)
    .get('/:id', CourParId)
    .post ('/', ajouterCour)
    .put('/:id', updateCour)
    .delete('/:id', supprimerCour)

    export default routesCour