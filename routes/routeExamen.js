// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterExamen, listeExamen, ExamenParId, supprimerExamen,updateExamen } from "../controlleurs/examens.js"

const routesExamen = Router()

router.get('/', listeExamen)
.get('/:id', ExamenParId)
.post ('/', ajouterExamen)
.put('/:id', updateExamen)
.delete('/:id', supprimerExamen)