// Amener les types de donnees
import { DataTypes } from "sequelize";

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele etudiant

export const Etudiant = database.define(`Etudiant`,{
    nom:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    prenom:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    dateNaissance:{
        type:DataTypes.DATEONLY
    },
    email:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    motPasse:{
        type: DataTypes.STRING, 
        allowNull:false
    }
})