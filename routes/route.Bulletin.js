// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterBulletin, listeBulletin, BulletinParId, supprimerBulletin,updateBulletin } from "../controlleurs/bulletins.js"
import { body } from "express-validator";

const routesBulletin = Router()

const ajouterBulletinValidation = [
  body("moyenne")
    .notEmpty().withMessage("La moyenne au bulletin est requise")
    .isFloat().withMessage("La moyenne doit être un nombre décimal")
    .custom((value) => {
      if (value < 0 || value > 100) {
        throw new Error("La moyenne doit être entre 0 et 100");
      }
      return true;
    })
];

const updateBulletinValidation = [
  body("moyenne")
    .notEmpty().withMessage("La moyenne au bulletin est requise")
    .isFloat().withMessage("La moyenne doit être un nombre décimal")
    .custom((value) => {
      if (value < 0 || value > 100) {
        throw new Error("La moyenne doit être entre 0 et 100");
      }
      return true;
    })
];

routesBulletin.get('/', listeBulletin);

routesBulletin.get('/:id', BulletinParId)
routesBulletin.post ('/', ajouterBulletinValidation ,ajouterBulletin)
routesBulletin.put('/:id', updateBulletinValidation ,updateBulletin)
routesBulletin.delete('/:id', supprimerBulletin)
    
export default routesBulletin