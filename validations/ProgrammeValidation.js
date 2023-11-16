import {body} from "express-validator"

//Validation pour la route ajouterProgramme
export const ajouterProgrammeValidation = [
    body("nom_du_programme").notEmpty().withMessage("Le nom du programme est requis"),
    body("date_de_debut").notEmpty().withMessage("La date de début du programme est requise").custom((value) => {
      if (!estDateValide(value)) {
        throw new Error("La date de début du programme n'est pas valide");
      }
      return true;
    }),
    body("date_de_fin").notEmpty().withMessage("La date de fin du programme est requise").custom((value) => {
      if (!estDateValide(value)) {
        throw new Error("La date de fin du programme n'est pas valide");
      }
      return true;
    })
  ]

  //Validation pour la route updateProgramme
  export const updateProgrammeValidation = [
    body("nom_du_programme").notEmpty().withMessage("Le nom du programme est requis"),
    body("date_de_debut")
    .notEmpty().withMessage("La date de début du programme est requise")
    .custom((value) => {
      if (!estDateValide(value)) {
        throw new Error("La date de début du programme n'est pas valide");
      }
      return true;
    }),
  body("date_de_fin")
    .notEmpty().withMessage("La date de fin du programme est requise")
    .custom((value) => {
      if (!estDateValide(value)) {      
        throw new Error("La date de fin du programme n'est pas valide");      
      }
      return true;
    })]