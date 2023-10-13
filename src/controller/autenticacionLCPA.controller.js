import { pool } from "../database/database.js";
import Jwt  from "jsonwebtoken";

export const Validator= async(req,res)=>{
    try {
        let info = req.body;
        
        let sql ="SELECT identificacion, nombres FROM clientes WHERE identificacion = ? AND password = ?";
        console.log(info.identificacion)
        console.log(info.contrasena)
        const[rows]=await pool.query(sql,[info.identificacion, info.contrasena]);

        
        if (rows.legth>0) {
            let token=jws.sign({user:rows}, process.env.AUT_SECRET,{expires:process.env.AUT_EXPIRE});
            return res.status(200).json({TOKEN:token,message:"usuario Autorizado"});
        }else{
            res.status(401).json({
                "status":401,
                "message":" usuario no encontrado"
                });
        }
    } catch (error) {
        res.status(500).json({message:`error en el sistema ${error}`})
    }
}
export const validadToken=async(req,res,next)=>{
    let token_usuario=req.headers['token'];
    if (!token_usuario) {
        return res.status(401).json({message:"Se requiere el token"})
    }else{
        const decoded=Jwt.verify(token_usuario,process.env.AUT_SECRET,(error,decoded)=>{
            if (error) {
                return res.status(401).json({message:"Token invalido",autorizado:false})
            }else{
                /* return res.status(200).json({message:"Token Autorizado",autorizado:true}) */
                next();
            }
        })
    }
}