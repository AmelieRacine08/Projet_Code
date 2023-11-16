import {body} from "express-validator"

const regexMotDePasse =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//Validation pour la route ajouterUtilisateur
export const ajouterUtilisateurValidation = [
    body("nom").notEmpty().withMessage('Le nom ne peut pas etre vide')
        .isAlpha().withMessage('Le nom contenir seulement des lettres')
        .isLength({ min: 4 }).withMessage('Le nom doit contenir au moins 4 lettres'),
    body("prenom").notEmpty().isLength({ min: 4 }).withMessage('Le prenom ne peut pas etre vide'),
    body("email").isEmail(),    
    body("motPasse").matches(regexMotDePasse).withMessage("Le mot de passe doit inclure une majuscule, une minuscule, un nombre, un caractère spécial et doit être d'au moins 8 caractères de long"),
    body("dateNaissance").notEmpty().withMessage("La date de naissance est requise").custom((value) => {
      if(!estDateValide(value)){
        throw new Error("La date de naissance n'est pas valide")
      }
      return true;
    })
  ];
  
  //Validation pour la route updateUtilisateur
  export const updateUtilisateurValidation = [
    body("nom").notEmpty().withMessage('Le nom ne peut pas etre vide')
        .isAlpha().withMessage('Le nom contenir seulement des lettres')
        .isLength({ min: 4 }).withMessage('Le nom doit contenir au moins 4 lettres'),
    body("prenom").notEmpty().isLength({ min: 4 }).withMessage('Le prenom ne peut pas etre vide'),
    body("email").isEmail(),    
    body("motPasse").matches(regexMotDePasse).withMessage("Le mot de passe doit inclure une majuscule, une minuscule, un nombre, un caractère spécial et doit être d'au moins 8 caractères de long"),
    body("dateNaissance").notEmpty().withMessage("La date de naissance est requise").custom((value) => {
      if(!estDateValide(value)){
        throw new Error("La date de naissance n'est pas valide")
      }
      return true;
    })
  ];
  
