// fonction permettant de creer des routes

import {Router} from "express"
import { ajouterProgramme, listeProgramme, ProgrammeParId, supprimerProgramme, updateProgramme } from "../controlleurs/programmes.js"
import { body } from "express-validator";

const routesProgramme = Router()

const ajouterProgrammeValidation = [
  body("nom_du_programme").notEmpty().withMessage("Le nom du programme est requis"),
  body("date_de_debut").notEmpty().withMessage("La date de début du programme est requise"),
  body("date_de_fin").notEmpty().withMessage("La date de fin du programme est requise")
]

const updateProgrammeValidation = [
  body("nom_du_programme").notEmpty().withMessage("Le nom du programme est requis"),
  body("date_de_debut").notEmpty().withMessage("La date de début du programme est requise"),
  body("date_de_fin").notEmpty().withMessage("La date de fin du programme est requise")
]

routesProgramme.get('/', (req, res) => {
    // Récupérez les paramètres de la requête (query params)
  const page = parseInt(req.query.page)
  const limite = parseInt(req.query.limite)

  // Calculez l'indice de début et fin pour la pagination
  const indiceDebut = (page - 1) * limite;
  const indiceFin = page * limite

  // Appelez la fonction listeUtilisateur avec la pagination
  const programmes = listeProgramme.slice(indiceDebut, indiceFin);

  res.json(programmes);
});

routesProgramme.get('/:id', ProgrammeParId)
routesProgramme.post ('/', ajouterProgrammeValidation ,ajouterProgramme)
routesProgramme.put('/:id', updateProgrammeValidation ,updateProgramme)
routesProgramme.delete('/:id', supprimerProgramme)

export default routesProgramme
