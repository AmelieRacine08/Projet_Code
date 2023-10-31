//Importer tous les modeles

import Utilisateur from "./Utilisateur.js";
import Role from "./Role.js";
import Programme from "./Programme.js";
import Bulletin from "./Bulletin.js";
import Cour from "./Cour.js";
import Examen from "./Examen.js";
import Horaire from "./Horaire.js";

//Ajouter table supplementaire n-n??????

//Appliquer les relations (associations)
Utilisateur.hasOne(Role)
Role.hasMany(Utilisateur)

Utilisateur.hasOne(Bulletin)
Bulletin.hasOne(Utilisateur)

Utilisateur.hasOne(Programme)
Programme.hasMany(Utilisateur)

Programme.belongsToMany(Cour)
Cour.belongsToMany(Programme)

Cours.hasMany(Examen)
Examen.hasOne(Cour)

Cour.belongsToMany(Horaire)
Horaire.belongsToMany(Cour)

export {Utilisateur, Role, Programme, Bulletin, Cour, Examen, Horaire }