// fonction permettant de creer des routes

import {Router} from "express"
import { ajouterProgramme, listeProgramme, ProgrammeParId, supprimerProgramme, updateProgramme } from "../controlleurs/programmes.js"
import { body } from "express-validator";

const routesProgramme = Router()

const ajouterProgrammeValidation = [
  body("nom_du_programme").notEmpty().withMessage("Le nom du programme est requis"),
  body("date_de_debut")
  .notEmpty().withMessage("La date de début du programme est requise")
  .custom((value) => {
    if (!EstTempsValide(value)) {
      throw new Error("La date de début du programme n'est pas valide");
    }
    return true;
  }),
body("date_de_fin")
  .notEmpty().withMessage("La date de fin du programme est requise")
  .custom((value) => {
    if (!EstTempsValide(value)) {
      throw new Error("La date de fin du programme n'est pas valide");
    }
    return true;
  })]

const updateProgrammeValidation = [
  body("nom_du_programme").notEmpty().withMessage("Le nom du programme est requis"),
  body("date_de_debut")
  .notEmpty().withMessage("La date de début du programme est requise")
  .custom((value) => {
    if (!EstTempsValide(value)) {
      throw new Error("La date de début du programme n'est pas valide");
    }
    return true;
  }),
body("date_de_fin")
  .notEmpty().withMessage("La date de fin du programme est requise")
  .custom((value) => {
    if (!EstTempsValide(value)) {
      throw new Error("La date de fin du programme n'est pas valide");
    }
    return true;
  })]

routesProgramme.get('/', listeProgramme);

routesProgramme.get('/:id', ProgrammeParId)
routesProgramme.post ('/', ajouterProgrammeValidation ,ajouterProgramme)
routesProgramme.put('/:id', updateProgrammeValidation ,updateProgramme)
routesProgramme.delete('/:id', supprimerProgramme)

export default routesProgramme
