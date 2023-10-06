import express  from "express";
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.set('view engine','ejs');
app.set('views', './views');

app.listen(5000,()=>{
    console.log("Servidor ejecutandose ne el puerto 5000");
})