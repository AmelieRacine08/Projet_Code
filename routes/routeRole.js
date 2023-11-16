// fonction permettant de creer des routes
import {Router} from "express"
import {ajouterRole, listeRole, RoleParId, supprimerRole, updateRole} from "../controlleurs/roles.js"
import { body } from "express-validator";
import { verifierToken } from "../auth/autorisation.js"

const routesRole = Router()

//Validation pour la route ajouterRole
const ajouterRoleValidation = [body("categorie").notEmpty().withMessage("La categorie est requise")]

//Validation pour la route updateRole
const updateRoleValidation = [body("categorie").notEmpty().withMessage("La categorie est requise")]

//Application de la validation et de la l'authentification (seule listeRole et RoleParId n'on pas besoin d'authentification)
routesRole.get('/', listeRole);
routesRole.get('/:id', RoleParId)
routesRole.post ('/', ajouterRoleValidation, verifierToken, ajouterRole)
routesRole.put('/:id', updateRoleValidation, verifierToken, updateRole)
routesRole.delete('/:id', verifierToken, supprimerRole)

export default routesRole
