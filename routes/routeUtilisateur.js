// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterUtilisateur, listeUtilisateur, UtilisateurParId, supprimerUtilisateur,updateUtilisateur } from "../controlleurs/utilisateurs.js"
import { verifierToken } from "../auth/autorisation.js"

const routesUtilisateur = Router()

routesUtilisateur.get('/', verifierToken, (req, res) => {
    // Récupérez les paramètres de la requête (query params)
  const page = parseInt(req.query.page)
  const limite = parseInt(req.query.limite)

  // Calculez l'indice de début et fin pour la pagination
  const indiceDebut = (page - 1) * limite;
  const indiceFin = page * limite

  // Appelez la fonction listeUtilisateur avec la pagination
  const utilisateurs = listeUtilisateur.slice(indiceDebut, indiceFin);

  res.json(utilisateurs);
});


routesUtilisateur.get('/:id', UtilisateurParId)
routesUtilisateur.post ('/', ajouterUtilisateur)
routesUtilisateur.put('/:id', updateUtilisateur)
routesUtilisateur.delete('/:id', supprimerUtilisateur)

export default routesUtilisateur
