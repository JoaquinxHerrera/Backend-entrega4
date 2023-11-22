import Router from 'express'
import { pm } from '../services/ProductsManager.js'

export const webRouter = Router()

webRouter.get('/realtimeproducts', (req,res)=>{
    res.render('realTimeProducts.handlebars', {titulo: 'Real Time Products'})
})

webRouter.get('/admin', (req,res)=>{
    res.render('admin.handlebars', {titulo: 'Admin'})
})

webRouter.get('/', async(req,res) =>{
    const products = await pm.getProducts()
    res.render('home.handlebars', {products})
})