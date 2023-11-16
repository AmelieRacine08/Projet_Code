// Amener les types de donnees
import { DataTypes } from 'sequelize';

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele programmeCours

const ProgrammeCour = database.define(`ProgrammeCours`,{
    programme_id:{
        type: DataTypes.INTEGER, 
        allowNull:false
    },
    cour_id:{
        type: DataTypes.INTEGER, 
        allowNull:false
    }},
    {timestamps: false}
    )

export default ProgrammeCour