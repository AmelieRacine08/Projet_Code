import { body } from "express-validator"

//Validation pour la route ajouterHoraire
export const ajouterHoraireValidation = [
    body("jour_de_semaine").notEmpty().withMessage("Le jour de la semaine est requise"),
    body("horaire_de_debut")
        .notEmpty().withMessage("L'horaire de début est requise").custom((value) => {
            if (!EstTempsValide(value)) {
                throw new Error("L'horaire de début n'est pas valide.")
            }
        }),
    body("horaire_de_fin")
        .notEmpty().withMessage("L'horaire de fin est requise").custom((value) => {
            if (!EstTempsValide(value)) {
                throw new Error("L'horaire de fin n'est pas valide.")
            }
        }),
]

//Validation pour la route updateHoraire
export const updateHoraireValidation = [
    body("jour_de_semaine").notEmpty().withMessage("Le jour de la semaine est requise"),
    body("horaire_de_debut")
        .notEmpty().withMessage("L'horaire de début est requise").custom((value) => {
            if (!EstTempsValide(value)) { //EstTempsValide
                throw new Error("L'horaire de début n'est pas valide.")
            }
        }),
    body("horaire_de_fin")
        .notEmpty().withMessage("L'horaire de fin est requise").custom((value) => {
            if (!EstTempsValide(value)) {
                throw new Error("L'horaire de fin n'est pas valide.")
            }
        }),
]