import * as ClienteLCPA from "../controller/clientesLCPA.controller.js";
import {validadToken}from "../controller/autenticacionLCPA.controller.js"
import { Router } from "express";


const clienteLCPArouter = Router();

clienteLCPArouter.post("/registro",validadToken,ClienteLCPA.RegistroUsuarioLCPA);
clienteLCPArouter.get("/listar",ClienteLCPA.getUsuarios);
clienteLCPArouter.get("/buscar/:iden",ClienteLCPA.BuscarUsuario);
clienteLCPArouter.delete("/eliminar/:iden",validadToken,ClienteLCPA.eliminarCLiente);
clienteLCPArouter.put("/actualizar/:iden",validadToken,ClienteLCPA.actualizarCliente);

export default clienteLCPArouter