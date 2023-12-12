import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import dotenv from 'dotenv'
import database from "./connexion.js"

import routesUtilisteur from './routes/routeUtilisateur.js'
import routesRole from './routes/routeRole.js'
import routesProgramme from './routes/routeProgramme.js'
import routesHoraire from './routes/routeHoraire.js'
import routesExamen from './routes/routeExamen.js'
import routesCour from './routes/routeCour.js'
import routesBulletin from './routes/route.Bulletin.js'
import routerAuth from './routes/routeAuth.js'

//database.sync({})

const syncDatabase = async () => {
    await database.sync({});
  }
  
  syncDatabase();

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