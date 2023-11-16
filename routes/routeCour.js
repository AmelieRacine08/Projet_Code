// fonction permettant de creer des routes
import {Router} from "express"
import {ajouterCour, listeCour, CourParId, supprimerCour,updateCour } from "../controlleurs/cours.js"
import { verifierToken } from "../auth/autorisation.js";
import {ajouterCourValidation, updateCourValidation} from "../validations/CourValidation.js"

const routesCour = Router()

//Application de la validation et de la l'authentification (seule listeCour et CourParId n'on pas besoin d'authentification)
routesCour.get('/', listeCour);
routesCour.get('/:id', CourParId)
routesCour.post ('/', ajouterCourValidation , verifierToken, ajouterCour)
routesCour.put('/:id', updateCourValidation , verifierToken, updateCour)
routesCour.delete('/:id', verifierToken, supprimerCour)

export default routesCour
