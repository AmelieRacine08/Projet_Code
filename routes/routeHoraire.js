// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterHoraire, listeHoraire, HoraireParId, supprimerHoraire,updateHoraire, EstTempsValide } from "../controlleurs/horaires.js"
import { body } from "express-validator";
import { estDateValide } from "../controlleurs/examens.js";

const routesHoraire = Router()

const ajouterHoraireValidation = [
  body("jour_de_semaine").notEmpty().withMessage("Le jour de la semaine est requise"),
  body("horaire_de_debut")
  .notEmpty().withMessage("L'horaire de début est requise").custom((value)=>{
    if(!estDateValide(value)){
      throw new Error("L'horaire de début n'est pas valide.")
    }
  }),
  body("horaire_de_fin")
  .notEmpty().withMessage("L'horaire de fin est requise").custom((value)=>{
    if(!estDateValide(value)){
      throw new Error("L'horaire de fin n'est pas valide.")
    }
  }),
  ]

const updateHoraireValidation = [
  body("jour_de_semaine").notEmpty().withMessage("Le jour de la semaine est requise"),
  body("horaire_de_debut")
  .notEmpty().withMessage("L'horaire de début est requise").custom((value)=>{
    if(!estDateValide(value)){
      throw new Error("L'horaire de début n'est pas valide.")
    }
  }),
  body("horaire_de_fin")
  .notEmpty().withMessage("L'horaire de fin est requise").custom((value)=>{
    if(!estDateValide(value)){
      throw new Error("L'horaire de fin n'est pas valide.")
    }
  }),
  ]


routesHoraire.get('/', listeHoraire);

routesHoraire.get('/:id', HoraireParId)
routesHoraire.post ('/', ajouterHoraireValidation ,ajouterHoraire)
routesHoraire.put('/:id', updateHoraireValidation ,updateHoraire)
routesHoraire.delete('/:id', supprimerHoraire)

export default routesHoraire
