import { pool } from "../database/database.js";

export const registrararticulo = async (req,res)=>{
    try {
        let info= req.body;
        let sql=" insert into articulos (nombre,tipo,estado) values(?,?,1)";
        const[rows]=await pool.query(sql,[info.nombre,info.tipo])
        if (rows.affectedRows) {
           return res.status(200).json({message:"Articulo Registrado Exitosamente"});
        }else{
           return res.status(401).json({message:"N ose registro el Articulo"});
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}
export const getArticulos = async (req,res)=>{
    try {
        let sql="select * from articulos where estado = 1";
        const[rows]=await pool.query(sql);
        if (rows.length>0) {
            return res.status(200).json(rows);
        }else{
            return res.status(401).json({message:"No se encontraron articulos"});
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}
export const BuscarArticulos = async (req,res)=>{
    try {
       let id= req.params.iden
       let sql="select * from articulos where idarticulo =? and estado=1";
       const[rows]= await pool.query(sql,[id]);
       if (rows.length>0) {
        return res.status(200).json(rows);
    }else{
        return res.status(401).json({message:"No se encontraron este articulo"});
    }

    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
        
    }
}
export const actualizarArticulo = async (req,res)=>{
    try {
        let info = req.body;
        let id=req.params.iden;
        let sql = "update articulos set nombre = ?, tipo = ? where idarticulo = ? and estado = 1";
        const [rows]=await pool.query(sql,[info.nombre,info.tipo,id]);
        if (rows.affectedRows) {
            return res.status(200).json({message:"Articulo Actualizado Exitosamente"});
        }else{
            return res.status(401).json({message:"No se actualizo el Articulo"});
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}
export const eliminarArticulos = async (req,res)=>{
    try {
        let id = req.params.iden;
        let sql = "update articulos set estado = 0 where idarticulo=?";
        const [rows]=await pool.query(sql,[id]);
        if (rows.affectedRows) {
            return res.status(200).json({message:"Articulo eliminado Exitosamente"});
        }else{
            return res.status(401).json({message:"No se elimino el articulo"});
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`}) 
    }
}