//Importer tous les modeles

import {Utilisateur} from "./Utilisateur.js"
import Role from "./Role.js";
import Programme from "./Programme.js";
import Bulletin from "./Bulletin.js";
import Cour from "./Cour.js";
import Examen from "./Examen.js";
import Horaire from "./Horaire.js";

//Appliquer les relations (associations)
Utilisateur.hasOne(Role)
Role.hasMany(Utilisateur)

Utilisateur.hasOne(Bulletin)
Bulletin.hasOne(Utilisateur)

Utilisateur.hasOne(Programme)
Programme.hasMany(Utilisateur)

Programme.belongsToMany(Cour, { through: 'ProgrammeCour'})
Cour.belongsToMany(Programme, { through: 'ProgrammeCour'})

Cour.hasMany(Examen)
Examen.hasOne(Cour)

Cour.belongsToMany(Horaire, { through: 'CourHoraire'})
Horaire.belongsToMany(Cour, { through: 'CourHoraire'})

export {Utilisateur, Role, Programme, Bulletin, Cour, Examen, Horaire }