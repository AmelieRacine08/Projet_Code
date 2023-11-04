import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import dotenv from 'dotenv'
import database from "./connexion.js"

import { ajouterUtilisateur, listeUtilisateur, UtilisateurParId, supprimerUtilisateur,updateUtilisateur } from './controlleurs/utilisateurs.js'
import { ajouterRole, listeRole, RoleParId, supprimerRole, updateRole } from './controlleurs/roles.js'
import { ajouterProgramme, listeProgramme, ProgrammeParId, supprimerProgramme, updateProgramme } from './controlleurs/programmes.js'
import { ajouterHoraire, listeHoraire, HoraireParId, supprimerHoraire,updateHoraire } from './controlleurs/horaires.js'
import { ajouterExamen, listeExamen, ExamenParId, supprimerExamen,updateExamen } from './controlleurs/examens.js'
import { ajouterCour, listeCour, CourParId, supprimerCour,updateCour } from './controlleurs/cours.js'
import { ajouterBulletin, listeBulletin, BulletinParId, supprimerBulletin,updateBulletin } from './controlleurs/bulletins.js'

import routesUtilisteur from './routes/routeUtilisateur.js'
import routesRole from './routes/routeRole.js'
import routesProgramme from './routes/routeProgramme.js'
import routesHoraire from './routes/routeHoraire.js'
import routesExamen from './routes/routeExamen.js'
import routesCour from './routes/routeCour.js'
import routesBulletin from './routes/route.Bulletin.js'
import routerAuth from './routes/routeAuth.js'

database.sync()

const { PORT } = dotenv.config().parsed
const app = express()
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/salutation',(req,res)=>{
    res.send('Bonjour!')
})

app.get('/utilisateurs', listeUtilisateur)
app.post('/utilisateurs', ajouterUtilisateur)
app.put('/utilisateurs/:id', updateUtilisateur)
app.delete('/utilisateurs/:id', supprimerUtilisateur)
app.get('/utilisateurs/:id', UtilisateurParId)

app.get('/roles', listeRole)
app.post('/roles', ajouterRole)
app.put('/roles/:id', updateRole)
app.delete('/roles/:id', supprimerRole)
app.get('/roles/:id', RoleParId)

app.get('/programmes', listeProgramme)
app.post('/programmes', ajouterProgramme)
app.put('/programmes/:id', updateProgramme)
app.delete('/programmes/:id', supprimerProgramme)
app.get('/programmes/:id', ProgrammeParId)

app.get('/horaires', listeHoraire)
app.post('/horaires', ajouterHoraire)
app.put('/horaires/:id', updateHoraire)
app.delete('/horaires/:id', supprimerHoraire)
app.get('/horaires/:id', HoraireParId)

app.get('/examens', listeExamen)
app.post('/examens', ajouterExamen)
app.put('/examens/:id', updateExamen)
app.delete('/examens/:id', supprimerExamen)
app.get('/examens/:id', ExamenParId)

app.get('/cours', listeCour)
app.post('/cours', ajouterCour)
app.put('/cours/:id', updateCour)
app.delete('/cours/:id', supprimerCour)
app.get('/cours/:id', CourParId)

app.get('/bulletins', listeBulletin)
app.post('/bulletins', ajouterBulletin)
app.put('/bulletins/:id', updateBulletin)
app.delete('/bulletins/:id', supprimerBulletin)
app.get('/bulletins/:id', BulletinParId)


//Utilisation des routes

app.use('/utilisateurs', routesUtilisteur)
app.use('/roles', routesRole)
app.use('/programmes', routesProgramme)
app.use('/horaires', routesHoraire)
app.use('/examens', routesExamen)
app.use('/cours', routesCour)
app.use('/bulletins', routesBulletin)



//Login
app.use('/login', routerAuth)


app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`))