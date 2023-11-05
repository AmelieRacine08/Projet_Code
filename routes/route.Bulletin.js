// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterBulletin, listeBulletin, BulletinParId, supprimerBulletin,updateBulletin } from "../controlleurs/bulletins.js"

const routesBulletin = Router()

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
routesBulletin.post ('/', ajouterBulletin)
routesBulletin.put('/:id', updateBulletin)
routesBulletin.delete('/:id', supprimerBulletin)
    
export default routesBulletin