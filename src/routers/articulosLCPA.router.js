import * as ArticuloLCPA from "../controller/articulosLCPA.controller.js";
import { validadToken } from "../controller/autenticacionLCPA.controller.js";
import { Router } from "express";

const ArticuloLCPArouter = Router();

ArticuloLCPArouter.post("/resgistro",validadToken,ArticuloLCPA.registrararticulo);
ArticuloLCPArouter.get("/listar",ArticuloLCPA.getArticulos);
ArticuloLCPArouter.get("/buscar/:iden",ArticuloLCPA.BuscarArticulos);
ArticuloLCPArouter.put("/actualizar/:iden",validadToken,ArticuloLCPA.actualizarArticulo);
ArticuloLCPArouter.put("/eliminar/:iden",validadToken,ArticuloLCPA.eliminarArticulos)

export default ArticuloLCPArouter;
