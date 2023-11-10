// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterCour, listeCour, CourParId, supprimerCour,updateCour } from "../controlleurs/cours.js"
import { body } from "express-validator";

const routesCour = Router()

const ajouterCourValidation = [
  body("nom_du_cours").notEmpty().withMessage("Le nom du cours est requis"),
  body("salle_du_cours").notEmpty().withMessage("La salle du cours est requise"),
  body("credits")
    .notEmpty().withMessage("Le nombre de crédit attribué à ce cours est requis")
    .isInt({ min: 0, max: 100 }).withMessage("Les crédits doivent être un nombre entre 0 et 100")
];

const updateCourValidation = [
  body("nom_du_cours").notEmpty().withMessage("Le nom du cours est requis"),
  body("salle_du_cours").notEmpty().withMessage("La salle du cours est requise"),
  body("credits")
    .notEmpty().withMessage("Le nombre de crédit attribué à ce cours est requis")
    .isInt({ min: 0, max: 100 }).withMessage("Les crédits doivent être un nombre entre 0 et 100")
];

routesCour.get('/', listeCour);

routesCour.get('/:id', CourParId)
routesCour.post ('/', ajouterCourValidation ,ajouterCour)
routesCour.put('/:id', updateCourValidation ,updateCour)
routesCour.delete('/:id', supprimerCour)

export default routesCour
