// fonction permettant de creer des routes
import {Router} from "express"
import {ajouterBulletin, listeBulletin, BulletinParId, supprimerBulletin,updateBulletin } from "../controlleurs/bulletins.js"
import { verifierToken } from "../auth/autorisation.js";

const routesBulletin = Router()

//Application de la validation et de la l'authentification (seule listeBulletin et BulletinParId n'on pas besoin d'authentification)
routesBulletin.get('/', listeBulletin);
routesBulletin.get('/:id', BulletinParId)
routesBulletin.post ('/', ajouterBulletinValidation, verifierToken, ajouterBulletin)
routesBulletin.put('/:id', updateBulletinValidation, verifierToken, updateBulletin)
routesBulletin.delete('/:id', verifierToken, supprimerBulletin)
    
export default routesBulletin