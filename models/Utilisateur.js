// Amener les types de donnees
import { DataTypes } from "sequelize";

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele etudiant

export const Utilisateur = database.define(`Utilisateur`,{
    prenom:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    nom:{
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