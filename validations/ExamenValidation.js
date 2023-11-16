import { body } from "express-validator";

export const ajouterExamenValidation = [
    body("matiere").notEmpty().withMessage("Le nom de la matière est requise"),
    body("date_examen")
        .notEmpty().withMessage("La date d'examen est requise")
        .custom((value) => {
            if (!estDateValide(value)) {
                throw new Error("La date d'examen n'est pas valide");
            }
            return true;
        }),
    body("horaire_de_debut")
        .notEmpty().withMessage("L'horaire de début est requis")
        .custom((value) => {
            if (!EstTempsValide(value)) {
                throw new Error("L'horaire de début n'est pas valide");
            }
            return true;
        }),
    body("horaire_de_fin")
        .notEmpty().withMessage("L'horaire de fin est requis")
        .custom((value) => {
            if (!EstTempsValide(value)) {
                throw new Error("L'horaire de fin n'est pas valide");
            }
            return true;
        }),
    body("salle_examen").notEmpty().withMessage("La salle d'examen est requise")
]

export const updateExamenValidation = [
    body("matiere").notEmpty().withMessage("Le nom de la matière est requise"),
    body("date_examen")
        .notEmpty().withMessage("La date d'examen est requise")
        .custom((value) => {
            if (!estDateValide(value)) {
                throw new Error("La date d'examen n'est pas valide");
            }
            return true;
        }),
    body("horaire_de_debut")
        .notEmpty().withMessage("L'horaire de début est requis")
        .custom((value) => {
            if (!EstTempsValide(value)) {
                throw new Error("L'horaire de début n'est pas valide");
            }
            return true;
        }),
    body("horaire_de_fin")
        .notEmpty().withMessage("L'horaire de fin est requis")
        .custom((value) => {
            if (!EstTempsValide(value)) {
                throw new Error("L'horaire de fin n'est pas valide");
            }
            return true;
        }),
    body("salle_examen").notEmpty().withMessage("La salle d'examen est requise")
]