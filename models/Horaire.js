// Amener les types de donnees
import { DataTypes } from 'sequelize';

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele horaire

const Horaire = database.define(`Horaire`,{
    jour_de_semaine:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    horaire_de_debut:{
        type: DataTypes.TIME, 
        allowNull:false
    },
    horaire_de_fin:{
        type: DataTypes.TIME, 
        allowNull:false
    }
})

export default Horaire