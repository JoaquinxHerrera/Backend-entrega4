import { Router, json } from "express";
import { pm } from "../services/ProductsManager.js";

export const apiRouter = Router()
apiRouter.use(json())

apiRouter.post('/products', async (req, res)=> {
    try{
        const product = req.body
        await pm.addProduct(product)
        res['notificarNuevoProducto']()
        res.status(201).json()
    }catch(error){
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})

apiRouter.delete('/products/:id', async(req,res) =>{
    try{
        const productId = parseInt(req.params.id)
        await pm.deleteProduct(productId)
        res['notificarNuevoProducto']()
        res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
    }catch(error){
        res.status(400).json({
            status: 'error',
            message: error.message 
        });
    }
})