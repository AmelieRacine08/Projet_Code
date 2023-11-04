// fonction permettant de creer des routes

import {Router} from "express"
import { ajouterProgramme, listeProgramme, ProgrammeParId, supprimerProgramme, updateProgramme } from "../controlleurs/programmes.js"

const routesProgramme = Router()

router.get('/', listeProgramme)
.get('/:id', ProgrammeParId)
.post ('/', ajouterProgramme)
.put('/:id', updateProgramme)
.delete('/:id', supprimerProgramme)