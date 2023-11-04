// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterRole, listeRole, RoleParId, supprimerRole, updateRole} from "../controlleurs/roles.js"

const routesRole = Router()

router.get('/', listeRole)
.get('/:id', RoleParId)
.post ('/', ajouterRole)
.put('/:id', updateRole)
.delete('/:id', supprimerRole)