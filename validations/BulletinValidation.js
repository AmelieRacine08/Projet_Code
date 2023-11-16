import { body } from "express-validator";

export const ajouterBulletinValidation = [
    body("moyenne")
      .notEmpty().withMessage("La moyenne au bulletin est requise")
      .isFloat().withMessage("La moyenne doit être un nombre décimal")
      .custom((value) => {
        if (value < 0 || value > 100) {
          throw new Error("La moyenne doit être entre 0 et 100");
        }
        return true;
      })
  ];
  
  export const updateBulletinValidation = [
    body("moyenne")
      .notEmpty().withMessage("La moyenne au bulletin est requise")
      .isFloat().withMessage("La moyenne doit être un nombre décimal")
      .custom((value) => {
        if (value < 0 || value > 100) {
          throw new Error("La moyenne doit être entre 0 et 100");
        }
        return true;
      })
  ];