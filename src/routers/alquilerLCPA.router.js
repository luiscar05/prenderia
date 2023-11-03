import * as AlquilerController from "../controller/alquilerLCPA.controller.js";
import { validadToken } from "../controller/autenticacionLCPA.controller.js";
import { Router } from "express";

const alquilerRouter = Router();
alquilerRouter.post("/registrar",validadToken,AlquilerController.registroAlquiler);
alquilerRouter.get("/listar",AlquilerController.ListarAlquiler);
alquilerRouter.get("/buscar/:iden",AlquilerController.BuscarAlquiler);
alquilerRouter.put("/actualizar/:iden",validadToken,AlquilerController.actualizar);
alquilerRouter.delete("/eliminar/:iden",AlquilerController.eliminarAlquiler)

export default alquilerRouter;
