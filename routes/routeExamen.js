// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterExamen, listeExamen, ExamenParId, supprimerExamen,updateExamen, estDateValide, EstTempsValide } from "../controlleurs/examens.js"
import { body } from "express-validator";

const routesExamen = Router()

const ajouterExamenValidation = [
  body("matiere").notEmpty().withMessage("Le nom de la matière est requise"),
  body("date_examen")
  .notEmpty().withMessage("La date d'examen est requise")
  .custom((value) => {
    if (!estDateValide(value)) {
      throw new Error("La date d'examen n'est pas valide");
    }
    return true;
  }),
  body("horaire_de_debut")
    .notEmpty().withMessage("L'horaire de début est requis")
    .custom((value) => {
      if (!EstTempsValide(value)) {
        throw new Error("L'horaire de début n'est pas valide");
      }
      return true;
    }),
  body("horaire_de_fin")
    .notEmpty().withMessage("L'horaire de fin est requis")
    .custom((value) => {
      if (!EstTempsValide(value)) {
        throw new Error("L'horaire de fin n'est pas valide");
      }
      return true;
    }),
  body("salle_examen").notEmpty().withMessage("La salle d'examen est requise")
]

const updateExamenValidation = [
  body("matiere").notEmpty().withMessage("Le nom de la matière est requise"),
  body("date_examen")
  .notEmpty().withMessage("La date d'examen est requise")
  .custom((value) => {
    if (!estDateValide(value)) {
      throw new Error("La date d'examen n'est pas valide");
    }
    return true;
  }),
  body("horaire_de_debut")
  .notEmpty().withMessage("L'horaire de début est requis")
  .custom((value) => {
    if (!EstTempsValide(value)) {
      throw new Error("L'horaire de début n'est pas valide");
    }
    return true;
  }),
body("horaire_de_fin")
  .notEmpty().withMessage("L'horaire de fin est requis")
  .custom((value) => {
    if (!EstTempsValide(value)) {
      throw new Error("L'horaire de fin n'est pas valide");
    }
    return true;
  }),
  body("salle_examen").notEmpty().withMessage("La salle d'examen est requise")
]

routesExamen.get('/', (req, res) => {
    // Récupérez les paramètres de la requête (query params)
  const page = parseInt(req.query.page)
  const limite = parseInt(req.query.limite)

  // Calculez l'indice de début et fin pour la pagination
  const indiceDebut = (page - 1) * limite;
  const indiceFin = page * limite

  // Appelez la fonction listeUtilisateur avec la pagination
  const examens = listeExamen.slice(indiceDebut, indiceFin);

  res.json(examens);
});

routesExamen.get('/:id', ExamenParId)
routesExamen.post ('/', ajouterExamenValidation ,ajouterExamen)
routesExamen.put('/:id', updateExamenValidation ,updateExamen)
routesExamen.delete('/:id', supprimerExamen)

export default routesExamen
