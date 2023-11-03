import { pool } from "../database/database.js";
export const registrarIntereses = async (req,res)=>{
    try {
        let info= req.body
        
        //conocer el mes el mes de pago de cada interes
        const [mesResult] = await pool.query('SELECT mes FROM intereses WHERE alquiler = ?', info.id);
        console.log(mesResult);
        let mesesIn=0;
        if(mesResult.length > 0){
            mesesIn = mesResult.length + 1;  
            
        }else{
            mesesIn = mesResult.length + 1;  
        } 

        console.log(mesesIn)
         
        // conocer todos los datos del alquiler
        let sql="select * from alquiler where idalquiler = ? ";
        const[alquiler]= await pool.query(sql,[info.id])
        if (alquiler.length>0) {
            /* let interes = "select * from intereses where idinteres = ?";
            const[interesData]=await pool.query(interes,info.id);
            if(interesData.length==0){
                interesData[0]=0 */




                /* SELECT cl.nombres, i.alquiler, ar.nombre as articulo, i. mes, i. valor
FROM intereses  i
JOIN alquiler ON alquiler = idalquiler
JOIN clientes cl ON cliente = identificacion
JOIN articulos ar ON articulo = idarticulo
where identificacion= 1083869916; */
            if ( mesesIn== alquiler[0].meses) {
                return res.status(400).json({message:"El alticulo ya no tiene cuentas pendientes"})
            }else{
                //proceso para insertar datos de interes donde solo con el id del alquiler realizo el proceso
                let intereses=alquiler[0].interes;
                let valor= alquiler[0].valor;
                let interesSimple=(valor*intereses)*alquiler[0].meses 
                let total=(valor+interesSimple)/alquiler[0].meses
                let insetInteres='INSERT INTO intereses (mes, fecha, valor, alquiler) VALUES (?, CURRENT_DATE(), ?, ?)';
                const[interes]= await pool.query(insetInteres,[mesesIn,total,info.id]);
                if (interes.affectedRows) {
                    // proceso para conocer el ultimo dato registrado segun id y comprara si aun puedo pagar o ya no 
                    console.log("Registrado exitosamente");
                }else{
                    console.log("No se registró exitosamente"); 
                }  
            }
        }else{
            return res .status(400).json({message:"No se encuenta el alquiler"+ alquiler.id})
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