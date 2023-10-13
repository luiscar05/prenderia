import express  from "express";
import bodyParser from 'body-parser';
import * as validatorRouter from "./src/routers/validadorLCPA.router.js";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.set('view engine','ejs');
app.set('views', './views');

app.use("/",validatorRouter.validadorRouterLCPA);

app.listen(5000,()=>{
    console.log("Servidor ejecutandose ne el puerto 5000");
})