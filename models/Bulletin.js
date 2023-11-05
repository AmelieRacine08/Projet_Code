// Amener les types de donnees
import { DataTypes } from 'sequelize';

//Amener la connexion a la base de donnees
import database from "../connexion.js"

//Creation du  modele bulletin

const Bulletin = database.define(`Bulletin`,{
    moyenne:{
        type: DataTypes.DECIMAL(5,2), 
        allowNull:false
    }
})

export default Bulletin