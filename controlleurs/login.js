import { Utilisateur } from "../models/Utilisateur"

export const login = async(req,res)=>{
    const{ nom_utilisateur, motPasse} = req.body
    if(!nom_utilisateur) return res.status(404).json({message:"Nom utilisateur requis!"})
try{
    const usager = await Utilisateur.findOne({where:{nom_utilisateur}})
    
    if(!usager) return res.status(404).json({message:"Cet utilisateur n'existe pas"})
    const verifierMotPasse = bcrypt.compareSync(motPasse,Utilisateur.motPasse)

    if(!verifierMotPasse) return res.status(401).json({message:"Le mot de passe est incorrect"})

    let payload = {id:usager.id}
    let token = jwt.sign(payload, jwtOption.secretOrKey)
    res.status(200).json({data:usager,token})

}catch(error){
    res.status(401).json({message:error.message})
}
    
}