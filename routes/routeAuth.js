import { Router } from "express";
import { login } from "../auth/loginControlleur.js";

const router = Router()

router.post('/',login)

export default router