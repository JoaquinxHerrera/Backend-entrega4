import express from 'express'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web.router.js'
import { Server } from 'socket.io'
import { pm } from './services/ProductsManager.js'
import { apiRouter } from './routers/api.router.js'



const app = express()
app.engine('handlebars', handlebars.engine())

const PORT = 8080
const server = app.listen (PORT, ()=>{
    console.log(`servidor escuchando en puerto ${PORT}`)
})

const websocketServer = new Server(server)
app.use ((req, res, next) => {
    res['notificarNuevoProducto'] = async () => {
        websocketServer.emit(
            'products',
            await pm.getProducts()
        )
    }
    next()
})
app.use ((req, res, next) => {
    res['notificarEliminacionProducto'] = async () => {
        websocketServer.emit(
            'products',
            await pm.deleteProduct()
        )
    }
    next()
})

app.use('/static', express.static('./static'))
app.use('/', webRouter)
app.use('/api', apiRouter)

websocketServer.on('connection', async (socket)=>{
    console.log('Se conecto: ' + socket.handshake.auth.usuario)
    socket.broadcast.emit('nuevoUsuario', socket.handshake.auth.usuario)

    socket.emit(
        'products',
       await pm.getProducts()
    )

    socket.on('product', async product=>{
        await pm.addProduct(product)
        websocketServer.emit(
            'products',
            await pm.getProducts()
        )
    })

    socket.on('disconnecting', ()=>{
        // console.log('Se ha desconectado: ' + socket.handshake.auth.usuario)
        socket.broadcast.emit('usuarioDesconectado', socket.handshake.auth.usuario)
    })
    
})



