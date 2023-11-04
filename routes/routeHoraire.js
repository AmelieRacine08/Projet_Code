// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterHoraire, listeHoraire, HoraireParId, supprimerHoraire,updateHoraire } from "../controlleurs/horaires.js"

const routesHoraire = Router()

routesHoraire.get('/', listeHoraire)
    .get('/:id', HoraireParId)
    .post ('/', ajouterHoraire)
    .put('/:id', updateHoraire)
    .delete('/:id', supprimerHoraire)

    export default routesHoraire
