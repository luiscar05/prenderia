import * as AlquilerController from "../controller/alquilerLCPA.controller.js";
import { Router } from "express";

const alquilerRouter = Router();
alquilerRouter.post("/registrar",AlquilerController.registroAlquiler);
alquilerRouter.get("/listar",AlquilerController.ListarAlquiler);
alquilerRouter.get("/buscar/:iden",AlquilerController.BuscarAlquiler);
alquilerRouter.put("/actualizar/:iden",AlquilerController.actualizar);
alquilerRouter.delete("/eliminar/:iden",AlquilerController.eliminarAlquiler)

export default alquilerRouter;
