// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterRole, listeRole, RoleParId, supprimerRole, updateRole} from "../controlleurs/roles.js"
import { body } from "express-validator";

const routesRole = Router()

//Validation pour la route ajouterRole
const ajouterRoleValidation = [body("categorie").notEmpty().withMessage("La categorie est requise")]

//Validation pour la route updateRole
const updateRoleValidation = [body("categorie").notEmpty().withMessage("La categorie est requise")]

routesRole.get('/', listeRole);

routesRole.get('/:id', RoleParId)
routesRole.post ('/', ajouterRoleValidation ,ajouterRole)//Appliquer la validation a la route
routesRole.put('/:id', updateRoleValidation ,updateRole)//Appliquer la validation a la route
routesRole.delete('/:id', supprimerRole)

export default routesRole
