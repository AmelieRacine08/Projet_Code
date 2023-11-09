// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterHoraire, listeHoraire, HoraireParId, supprimerHoraire,updateHoraire } from "../controlleurs/horaires.js"
import { body } from "express-validator";

const routesHoraire = Router()

const ajouterHoraireValidation = [
  body("jour_de_semaine").notEmpty().withMessage("Le jour de la semaine est requise"),
  body("horaire_de_debut").notEmpty().withMessage("L'horaire de début est requise"),
  body("horaire_de_fin").notEmpty().withMessage("L'horaire de fin est requise")
]

const updateHoraireValidation = [
  body("jour_de_semaine").notEmpty().withMessage("Le jour de la semaine est requise"),
  body("horaire_de_debut").notEmpty().withMessage("L'horaire de début est requise"),
  body("horaire_de_fin").notEmpty().withMessage("L'horaire de fin est requise")
]


routesHoraire.get('/', (req, res) => {
    // Récupérez les paramètres de la requête (query params)
  const page = parseInt(req.query.page)
  const limite = parseInt(req.query.limite)

  // Calculez l'indice de début et fin pour la pagination
  const indiceDebut = (page - 1) * limite;
  const indiceFin = page * limite

  // Appelez la fonction listeUtilisateur avec la pagination
  const horaires = listeHoraire.slice(indiceDebut, indiceFin);

  res.json(horaires);
});

routesHoraire.get('/:id', HoraireParId)
routesHoraire.post ('/', ajouterHoraireValidation ,ajouterHoraire)
routesHoraire.put('/:id', updateHoraireValidation ,updateHoraire)
routesHoraire.delete('/:id', supprimerHoraire)

export default routesHoraire
