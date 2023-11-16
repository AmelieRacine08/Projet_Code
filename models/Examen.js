// Amener les types de donnees
import { DataTypes } from 'sequelize';

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele examen

const Examen = database.define(`Examen`,{
    matiere:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    date_examen:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    horaire_de_debut:{
        type: DataTypes.TIME, 
        allowNull:false
    },
    horaire_de_fin:{
        type: DataTypes.TIME, 
        allowNull:false
    },
    salle_examen:{
        type: DataTypes.STRING, 
        allowNull:false
    }},
    {timestamps: false}
    )

export default Examen