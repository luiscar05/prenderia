import { pool } from "../database/database.js";

export const PagoInteresUser= async(req,res)=>{
    try {
        
        let info=req.body;
        const sql= `SELECT cl.nombres, i.alquiler, ar.nombre as articulo, i. mes, i. valor
        FROM intereses  i
        JOIN alquiler ON alquiler = idalquiler
        JOIN clientes cl ON cliente = identificacion
        JOIN articulos ar ON articulo = idarticulos
        where identificacion =?`;

       const [rows]= await pool.query(sql,[info.id]) 
        
        if (rows.length>0) {
            return res.status(200).json(rows)
        }else{
            return res.status(400).json({message:'No se encontraron Intereses Pagos'});
        }   
    } catch (error) {
        return res.status(500).json({mesage:`Error en el sistema ${error}`});
    }
}


export const interesPagos = async (req,res)=>{
    try {
       const sql=`SELECT YEAR(fecha) AS anio, MONTHNAME(fecha) AS mes,sum(valor) 
       FROM intereses`;
       const [rows]=await pool.query(sql);
       if (rows.length>0) {
        return res.status(200).json(rows)
       }else{
        return res.status(400).json({message:"no hay intereses pagos"})
       }
    } catch (error) {
        return res.status(500).json({mesage:`Error en el sistema ${error}`});
    }
}
export const interesPendientes = async (req,res)=>{
    try {
        let info = req.body
        const sql = `select cl.nombres, ar.nombre ,((al.meses)-(count(i.mes)))as meses_Pendientes,cast((((al.valoralquier*al.meses*al.interes)+(al.valoralquier))-(sum(i.valor))) AS DECIMAL(10, 0)) as valor_Pendiente
        FROM intereses  i
        JOIN alquiler al ON alquiler = idalquiler
        JOIN clientes cl ON cliente = identificacion
        JOIN articulos ar ON articulo = idarticulos
        where idalquiler=2`;
        const[rows]= await pool.query(sql,info.id)
        if (rows.length>0) {
            return res.status(200).json(rows)
        }else{
            return res.status(400).json({message:"no hay intereses pagos"})
        }
    } catch (error) {
        return res.status(500).json({mesage:`Error en el sistema ${error}`}); 
    }
}