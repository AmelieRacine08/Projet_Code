import { body } from "express-validator";

 const ajouterCourValidation = [
    body("nom_du_cours").notEmpty().withMessage("Le nom du cours est requis"),
    body("salle_du_cours").notEmpty().withMessage("La salle du cours est requise"),
    body("credits")
      .notEmpty().withMessage("Le nombre de crédit attribué à ce cours est requis")
      .isInt({ min: 0, max: 100 }).withMessage("Les crédits doivent être un nombre entre 0 et 100")
  ];
  
   const updateCourValidation = [
    body("nom_du_cours").notEmpty().withMessage("Le nom du cours est requis"),
    body("salle_du_cours").notEmpty().withMessage("La salle du cours est requise"),
    body("credits")
      .notEmpty().withMessage("Le nombre de crédit attribué à ce cours est requis")
      .isInt({ min: 0, max: 100 }).withMessage("Les crédits doivent être un nombre entre 0 et 100")
  ];
  
  export {ajouterCourValidation, updateCourValidation}