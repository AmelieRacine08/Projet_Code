// Amener les types de donnees
import { DataTypes } from "sequelize";

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele programme

export const Programme = database.define(`Programme`,{
    programme_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nom_du_programme:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    date_de_début:{
        type:DataTypes.DATEONLY,
        allowNull: false
    },
    date_de_fin:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
})