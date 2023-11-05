// Amener les types de donnees
import { DataTypes } from 'sequelize';

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele role

const Role = database.define(`Rôle`,{
    categorie:{
        type: DataTypes.STRING, 
        allowNull:false
    }
})

export default Role