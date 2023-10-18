import { pool } from "../database/database.js";

export const RegistroUsuarioLCPA = async (req,res)=>{
    try {
        let info = req.body;
        let sql ="INSERT INTO clientes (identificacion, nombres, direccion, telefono, fecha_nac, password) VALUES (?, ?, ?, ?, ?, ?)";
        const[rows]=await pool.query(sql,[info.identificacion,info.nombres,info.direccion,info.telefono,info.fecha_nac,info.contrasena]);
        if(rows.affectedRows){
            return res.status(200).json({
                message:"Cliente registrado Exitosamente"
            })
        }else{
            return res.status(401).json({
                message:"No Fue posible registrar al cliente"
            })
        }  
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    } 
}
export const getUsuarios = async(req,res)=>{
    try {
        let sql="select * from clientes";
    const [rows]=await pool.query(sql);
    if (rows.length>0) {
        return res.status(200).json(rows);
    }else{
        return res.status(401).json({
            message:"No se encontraron clientes"
        })
    }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
        
    }
}
export const BuscarUsuario = async (req,res) => {
    try {
        let id=req.params.iden
        let sql="select * from clientes where identificacion=?"
        const[rows]=await pool.query(sql,[id])
        if (rows.length>0) {
            return res.status(200).json(rows);
        }else{
            return res.status(401).json({
                message:"No se encontraron clientes"
            })
        } 
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    } 
}

export const eliminarCLiente= async (req,res)=>{
   try {
        let id = req.params.iden
        let sql="delete from clientes where identificacion=?"
        const[rows]=await pool.query(sql,[id])
        if (rows.affectedRows) {
            return res.status(200).json({message: "Eliminado Exitosamente"});
        }else{
            return res.status(401).json({
                message:"No FUe posible elimianar cliente"
            })
        } 
   } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`}) 
   }
}
export const actualizarCliente = async (req,res)=>{
    try {
        let info = req.body;
        let id= req.params.iden
        let sql = "UPDATE clientes SET identificacion = ?, nombres = ?, direccion = ?, telefono = ?, fecha_nac = ?, password = ?  WHERE identificacion = ?";
      
        const[rows]= await pool.query(sql,[info.identificacion,info.nombres,info.direccion,info.telefono,info.fecha_nac,info.password,id]);
        if(rows.affectedRows){
            return res.status(200).json({message: "CLiente actualizado con exito"});
        }else{
            return res.status(401).json({
                message:"No fue posible actualizar cliente"
            })  
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`}) 
    }
}