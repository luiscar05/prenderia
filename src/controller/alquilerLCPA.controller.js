import { pool } from "../database/database.js";
export const registroAlquiler = async (req,res)=>{
    try {
        
            let info = req.body;
            
            let busqueda = "SELECT * FROM articulos WHERE idarticulo=? AND estado = 1";
            const [permiso] = await pool.query(busqueda, [info.articulo]);
        
            if (permiso.length > 0) {
                parseFloat(info.interes);
                let sql = "INSERT INTO alquiler (valor, fecha, meses, descripcion, interes, cliente, articulo) VALUES (?, NOW(), ?, ?, ?, ?, ?)";
                const [rows] = await pool.query(sql, [info.valor, info.meses, info.descripcion, info.interes, info.cliente, info.articulo]);
        
                if (rows.affectedRows) {
                    return res.status(200).json({ message: "Alquiler realizado exitosamente" });
                } else {
                    return res.status(401).json({ message: "Error al alquilar el producto" });
                }
            } else {
                return res.status(400).json({ message: "Articulo no Existente o no disponible para alquilar" });
            }    
        
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }  
}
export const actualizar = async(req,res)=>{
    try {
        let info = req.body;
        let id= req.params.iden
            let busqueda = "SELECT * FROM articulos WHERE idarticulo=? AND estado = 1";
            const [permiso] = await pool.query(busqueda, [info.articulo]);
        
            if (permiso.length > 0) {
                let sql = "update alquiler set valor = ?, meses = ? , descripcion = ? , interes = ? , cliente = ? , articulo = ? where idalquiler = ?";
                const [rows] = await pool.query(sql, [info.valor, info.meses, info.descripcion, info.interes, info.cliente, info.articulo,id]);
        
                if (rows.affectedRows) {
                    return res.status(200).json({ message: "Alquiler actualizado exitosamente" });
                } else {
                    return res.status(401).json({ message: "Error al actualizar el alquiler" });
                }
            } else {
                return res.status(400).json({ message: "Articulo no Existente o no disponible para alquilar" });
            }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}

export const ListarAlquiler = async (req,res)=>{
    try {
        let sql="select * from alquiler"
        const[rows]=await pool.query(sql);
        if (rows.length>0) {
            return res.status(200).json(rows)
            
        }else{
            return res.status(401).json({message:"No se encontraron alquileres"})
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}
export const BuscarAlquiler = async (req,res)=>{
    try{
        let id = req.params.iden
        let sql="select * from alquiler where idalquiler = ? "
        const[rows]=await pool.query(sql,[id]);
        if (rows.length>0) {
            return res.status(200).json(rows);
            
        }else{
            return res.status(401).json({message:"No hay registro de este alquiler"})
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}
export const eliminarAlquiler = async (req,res)=>{
    try {
        let id= req.params.iden;
        let sql = "Delete  from alquiler where idalquiler= ?";
        const[rows]=await pool.query(sql,[id]);
        if (rows.affectedRows) {
            return res.status(200).json({
                messsage: "Alquiler eliminado exitosamente"
            })
        }else{
            return res.status(400).json({
                messsage: "Alquiler no se elimino"
            })
        }
    } catch (error) {
        return res.status(500).json({message:`error en el sistema ${error}`})
    }
}