// Amener les types de donnees
import { DataTypes } from "sequelize";

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele cours

export const Cours = database.define(`Cours`,{
    cours_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nom_du_cours:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    salle_du_cours:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    credits:{
        type: DataTypes.INTEGER, 
        allowNull:false
    }
})