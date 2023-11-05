// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterExamen, listeExamen, ExamenParId, supprimerExamen,updateExamen } from "../controlleurs/examens.js"

const routesExamen = Router()

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
routesExamen.post ('/', ajouterExamen)
routesExamen.put('/:id', updateExamen)
routesExamen.delete('/:id', supprimerExamen)

export default routesExamen
