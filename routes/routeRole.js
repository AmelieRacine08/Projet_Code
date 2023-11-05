// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterRole, listeRole, RoleParId, supprimerRole, updateRole} from "../controlleurs/roles.js"

const routesRole = Router()

routesRole.get('/', (req, res) => {
    // Récupérez les paramètres de la requête (query params)
  const page = parseInt(req.query.page)
  const limite = parseInt(req.query.limite)

  // Calculez l'indice de début et fin pour la pagination
  const indiceDebut = (page - 1) * limite;
  const indiceFin = page * limite

  // Appelez la fonction listeUtilisateur avec la pagination
  const roles = listeRole.slice(indiceDebut, indiceFin);

  res.json(roles);
});

routesRole.get('/:id', RoleParId)
routesRole.post ('/', ajouterRole)
routesRole.put('/:id', updateRole)
routesRole.delete('/:id', supprimerRole)

export default routesRole
