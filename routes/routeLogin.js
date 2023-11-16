import {Router} from "express"
import { login } from "../controlleurs/login"

const routeLogin = Router()

routeLogin.post('/login',login)