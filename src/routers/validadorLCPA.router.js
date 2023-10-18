import * as validadorControllerLCPA from "../controller/autenticacionLCPA.controller.js";
import { Router } from "express";


export const validadorRouterLCPA=Router();


validadorRouterLCPA.post("/validacion",validadorControllerLCPA.Validator)

export default validadorRouterLCPA;