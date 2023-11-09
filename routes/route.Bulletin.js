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

routesBulletin.get('/', (req, res) => {
    // Récupérez les paramètres de la requête (query params)
  const page = parseInt(req.query.page)
  const limite = parseInt(req.query.limite)

  // Calculez l'indice de début et fin pour la pagination
  const indiceDebut = (page - 1) * limite;
  const indiceFin = page * limite

  // Appelez la fonction listeUtilisateur avec la pagination
  const bulletins = listeBulletin.slice(indiceDebut, indiceFin);

  res.json(bulletins);
});

routesBulletin.get('/:id', BulletinParId)
routesBulletin.post ('/', ajouterBulletinValidation ,ajouterBulletin)
routesBulletin.put('/:id', updateBulletinValidation ,updateBulletin)
routesBulletin.delete('/:id', supprimerBulletin)
    
export default routesBulletin