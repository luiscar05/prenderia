import { pool } from "../database/database.js";
export const registrarIntereses = async (req,res)=>{
    try {
        let info= req.body
    let sql="insert into intereses (mes,fecha,valor,alquiler) values (?, now(), ? , ?)"
    const [rows]=await pool.query(sql,[info.mes,info.valor,info.alquiler])
    if (rows.affectedRows) {
       return res.status(200).json({message:"Interes registrado exitosamente"}) 
    } else {
        return res.status(200).json({message:"No se registro el interes"})       
    }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}
export const actualizarIntereses = async(req,res)=>{
    try {
        let info= req.body
        let id = req.params.iden
        let sql="update intereses set mes = ?, valor = ? , alquiler = ? where idinteres = ?"
        const [rows]=await pool.query(sql,[info.mes,info.valor,info.alquiler,id])
        if (rows.affectedRows) {
        return res.status(200).json({message:"Interes registrado exitosamente"}) 
        } else {
            return res.status(200).json({message:"No se registro el interes"})       
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}
export const listarInteres = async (req,res)=>{
    try {
        let sql = "select * from intereses";
        const [rows]=await pool.query(sql);
        if (rows.length>0) {
            return res.status(200).json(rows)
        }else{
            return res.status(401).json({message: "No se encontraron intereses"})
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}
export const buscarInterese = async (req,res)=>{
    try {
        let id= req.params.iden
        let sql = "select * from intereses where idinteres = ?";
        const [rows]=await pool.query(sql,[id]);
        if (rows.length>0) {
            return res.status(200).json(rows)
        }else{
            return res.status(401).json({message: "No se encontraron intereses"})
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}
export const eliminarIntereses = async(req,res)=>{
    try {
        let id= req.params.iden
        let sql = "delete from intereses where idinteres = ?";
        const [rows]=await pool.query(sql,[id]);
        if (rows.affectedRows) {
            return res.status(200).json({message:"Interese Eliminado Exitosamente"})
        }else{
            return res.status(401).json({message: "No se elimino el interes"})
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }

}