// Amener les types de donnees
import { DataTypes } from "sequelize"

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele cours

const Cour = database.define(`Cours`,{
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
    }},
    {timestamps: false}
    )

export default Cour



