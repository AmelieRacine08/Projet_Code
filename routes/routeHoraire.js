// fonction permettant de creer des routes
import {Router} from "express"
import { ajouterHoraire, listeHoraire, HoraireParId, supprimerHoraire,updateHoraire} from "../controlleurs/horaires.js"
import { verifierToken } from "../auth/autorisation.js"

const routesHoraire = Router()

//Application de la validation et de la l'authentification (seule listeHoraire et HoraireParId n'on pas besoin d'authentification)
routesHoraire.get('/', listeHoraire);
routesHoraire.get('/:id', HoraireParId)
routesHoraire.post ('/', ajouterHoraireValidation, verifierToken, ajouterHoraire)
routesHoraire.put('/:id', updateHoraireValidation, verifierToken, updateHoraire)
routesHoraire.delete('/:id', verifierToken,supprimerHoraire)

export default routesHoraire
