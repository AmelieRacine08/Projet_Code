// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterHoraire, listeHoraire, HoraireParId, supprimerHoraire,updateHoraire } from "../controlleurs/horaires.js"

const routesHoraire = Router()

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
routesHoraire.post ('/', ajouterHoraire)
routesHoraire.put('/:id', updateHoraire)
routesHoraire.delete('/:id', supprimerHoraire)

export default routesHoraire
