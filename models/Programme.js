// Amener les types de donnees
import { DataTypes } from 'sequelize';

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele programme

const Programme = database.define(`Programme`,{
    nom_du_programme:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    date_de_debut:{
        type:DataTypes.DATEONLY,
        allowNull: false
    },
    date_de_fin:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
})

export default Programme