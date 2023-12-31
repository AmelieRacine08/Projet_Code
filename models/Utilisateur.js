// Amener les types de donnees
import { DataTypes } from 'sequelize'

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele utilisateur

const Utilisateur = database.define(`Utilisateur`,{
    nom:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    prenom:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    dateNaissance:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    photo:{
        type: DataTypes.BLOB("long"), 
        allowNull:true
    },
    numeroTelephone:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    email:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    motPasse:{
        type: DataTypes.STRING, 
        allowNull:false
    }},
    {timestamps: false}
)

export {Utilisateur}