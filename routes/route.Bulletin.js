// fonction permettant de creer des routes

import {Router} from "express"
import {ajouterBulletin, listeBulletin, BulletinParId, supprimerBulletin,updateBulletin } from "../controlleurs/bulletins.js"

const routesBulletin = Router()

router.get('/', listeBulletin)
.get('/:id', BulletinParId)
.post ('/', ajouterBulletin)
.put('/:id', updateBulletin)
.delete('/:id', supprimerBulletin)