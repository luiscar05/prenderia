import express  from "express";
import bodyParser from 'body-parser';
import * as validatorRouter from "./src/routers/validadorLCPA.router.js";
import clienteLCPArouter from "./src/routers/clientesLCPA.router.js";
import ArticulosRouter from "./src/routers/articulosLCPA.router.js";
import alquilerRouter from "./src/routers/alquilerLCPA.router.js";
import InteresesRouter from "./src/routers/interesesLCPA.router.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.set('view engine','ejs');
app.set('views', './views');

app.use("/",validatorRouter.validadorRouterLCPA)
app.use("/api/clientes",clienteLCPArouter)
app.use("/api/articulo",ArticulosRouter);
app.use("/api/alquiler",alquilerRouter);
app.use("/api/interese",InteresesRouter)


app.listen(5000,()=>{
    console.log("Servidor ejecutandose ne el puerto 5000");
})