// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterUtilisateur, listeUtilisateur, UtilisateurParId, supprimerUtilisateur,updateUtilisateur } from "../controlleurs/utilisateurs.js"
import { verifierToken } from "../auth/autorisation.js"
import { body } from "express-validator"
import { estDateValide } from "../controlleurs/examens.js"

const routesUtilisateur = Router()

//Validation pour la route ajouterUtilisateur
const ajouterUtilisateurValidation = [
  body("nom").notEmpty().withMessage("Le nom est requis"),
  body("prenom").notEmpty().withMessage("Le prenom est requis"),
  body("email").notEmpty().withMessage("L'email est requis"),
  body("motDePasse").notEmpty().withMessage("Le mot de passe est requis"),
  body("dateDeNaissance")
  .notEmpty().withMessage("La date de naissance est requise")
  .custom((value)=>{
    if(!estDateValide(value)){
      throw new Error("La date d'examen n'est pas valide")
    }
    return true;
  })
];

//Validation pour la route updateUtilisateur
const updateUtilisateurValidation = [
  body("nom").notEmpty().withMessage("Le nom est requis"),
  body("prenom").notEmpty().withMessage("Le prenom est requis"),
  body("email").notEmpty().withMessage("L'email est requis"),
  body("motDePasse").notEmpty().withMessage("Le mot de passe est requis"),
  body("dateDeNaissance")
  .notEmpty().withMessage("La date de naissance est requise")
  .custom((value)=>{
    if(!estDateValide(value)){
      throw new Error("La date d'examen n'est pas valide")
    }
    return true;
  })];

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
routesUtilisateur.post ('/', ajouterUtilisateurValidation ,ajouterUtilisateur)
routesUtilisateur.put('/:id', updateUtilisateurValidation , updateUtilisateur)
routesUtilisateur.delete('/:id', supprimerUtilisateur)

export default routesUtilisateur
