//Importer tous les modeles

import {Utilisateur} from "./Utilisateur.js"
import Role from "./Role.js";
import Programme from "./Programme.js";
import Bulletin from "./Bulletin.js";
import Cour from "./Cour.js";
import Examen from "./Examen.js";
import Horaire from "./Horaire.js";

//Appliquer les relations (associations)
Role.hasMany(Utilisateur)
Utilisateur.belongsTo(Role)

Utilisateur.hasOne(Bulletin)
Bulletin.belongsTo(Utilisateur)

Utilisateur.belongsTo(Programme)
Programme.hasMany(Utilisateur)

Programme.belongsToMany(Cour, { through: 'ProgrammeCour'})
Cour.belongsToMany(Programme, { through: 'ProgrammeCour'})

// Revoir la relation entre ces tables encore
Cour.hasMany(Examen)
Examen.belongsTo(Cour)

Cour.belongsToMany(Horaire, { through: 'CourHoraire'})
Horaire.belongsToMany(Cour, { through: 'CourHoraire'})

export {Utilisateur, Role, Programme, Bulletin, Cour, Examen, Horaire }