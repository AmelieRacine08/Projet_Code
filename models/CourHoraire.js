// Amener les types de donnees
import { DataTypes } from 'sequelize';

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele programmeCours

const CourHoraire = database.define(`ProgrammeCours`,{
    cour_id:{
        type: DataTypes.INTEGER, 
        allowNull:false
    },
    horaire_id:{
        type: DataTypes.INTEGER, 
        allowNull:false
    }
})

export default CourHoraire