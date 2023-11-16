// fonction permettant de creer des routes
import {Router} from "express"
import {ajouterExamen, listeExamen, ExamenParId, supprimerExamen,updateExamen} from "../controlleurs/examens.js"
import { verifierToken } from "../auth/autorisation.js";

const routesExamen = Router()

//Application de la validation et de la l'authentification (seule listeExamen et ExamenParId n'on pas besoin d'authentification)
routesExamen.get('/', listeExamen);
routesExamen.get('/:id', ExamenParId)
routesExamen.post ('/', ajouterExamenValidation, verifierToken, ajouterExamen)
routesExamen.put('/:id', updateExamenValidation, verifierToken, updateExamen)
routesExamen.delete('/:id', verifierToken, supprimerExamen)

export default routesExamen
