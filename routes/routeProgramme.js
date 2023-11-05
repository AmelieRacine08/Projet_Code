// fonction permettant de creer des routes

import {Router} from "express"
import { ajouterProgramme, listeProgramme, ProgrammeParId, supprimerProgramme, updateProgramme } from "../controlleurs/programmes.js"

const routesProgramme = Router()

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
routesProgramme.post ('/', ajouterProgramme)
routesProgramme.put('/:id', updateProgramme)
routesProgramme.delete('/:id', supprimerProgramme)

export default routesProgramme
