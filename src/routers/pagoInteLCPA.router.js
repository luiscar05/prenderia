import * as PagoInteresControler from '../controller/pagoInteLCPA.controller.js'
import { Router } from 'express'

const PagosInteresUserRouter = Router();


PagosInteresUserRouter.post('/intereses/User',PagoInteresControler.PagoInteresUser)
PagosInteresUserRouter.get('/intereses/pagos',PagoInteresControler.interesPagos)

export default PagosInteresUserRouter