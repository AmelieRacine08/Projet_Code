// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterCour, listeCour, CourParId, supprimerCour,updateCour } from "../controlleurs/cours.js"

const routesCour = Router()

routesCour.get('/', (req, res) => {
    // Récupérez les paramètres de la requête (query params)
  const page = parseInt(req.query.page)
  const limite = parseInt(req.query.limite)

  // Calculez l'indice de début et fin pour la pagination
  const indiceDebut = (page - 1) * limite;
  const indiceFin = page * limite

  // Appelez la fonction listeUtilisateur avec la pagination
  const cour = listeCour.slice(indiceDebut, indiceFin);

  res.json(cour);
});

routesCour.get('/:id', CourParId)
routesCour.post ('/', ajouterCour)
routesCour.put('/:id', updateCour)
routesCour.delete('/:id', supprimerCour)

export default routesCour
