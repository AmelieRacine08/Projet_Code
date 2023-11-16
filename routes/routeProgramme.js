// fonction permettant de creer des routes
import {Router} from "express"
import { ajouterProgramme, listeProgramme, ProgrammeParId, supprimerProgramme, updateProgramme } from "../controlleurs/programmes.js"
import { verifierToken } from "../auth/autorisation.js"
import {ajouterProgrammeValidation, updateProgrammeValidation} from "../validations/ProgrammeValidation.js"


const routesProgramme = Router()

//Application de la validation et de la l'authentification (seule listeProgramme et ProgrammeParId n'on pas besoin d'authentification)
routesProgramme.get('/', listeProgramme);
routesProgramme.get('/:id', ProgrammeParId)
routesProgramme.post ('/', ajouterProgrammeValidation, verifierToken, ajouterProgramme)
routesProgramme.put('/:id', updateProgrammeValidation, verifierToken, updateProgramme)
routesProgramme.delete('/:id', verifierToken, supprimerProgramme)

export default routesProgramme
