import * as interesRouter from "../controller/interesesLCPA.controller.js";
import { Router } from "express";


const InteresesRouter = Router();

InteresesRouter.post("/registrar",interesRouter.registrarIntereses);
InteresesRouter.get("/listar",interesRouter.listarInteres);
InteresesRouter.get("/buscar/:iden",interesRouter.buscarInterese);
InteresesRouter.put("/actualizar/:iden",interesRouter.actualizarIntereses);
InteresesRouter.delete("/eliminar/:iden",interesRouter.eliminarIntereses);

export default InteresesRouter;