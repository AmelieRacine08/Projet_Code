// Amener les types de donnees
import { DataTypes } from "sequelize";

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele bulletin

export const Bulletin = database.define(`Bulletin`,{
    bulletin_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    moyenne:{
        type: DataTypes.DECIMAL(5,2), 
        allowNull:false
    }
})