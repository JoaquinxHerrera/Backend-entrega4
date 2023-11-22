const form = document.querySelector('form')
const inputProduct = document.querySelector('input')
const ulProducts = document.querySelector('ul')

Swal.fire({
    title: "Bienvenido! Ingrese su nombre de usuario",
    input: "text",
    inputLabel: "Tu nombre de usuario",
    inputPlaceholder: "Ingresa su nombre de ususario",
    allowOutsideClick: false

}).then((result)=>{
    if (result.isConfirmed){
        iniciarChat(result.value)
        inputProduct?.focus()
    }
})

function iniciarChat(usuario){
    const socket = io({
        auth:{
            usuario
        }
    })


    form?.addEventListener('submit', event =>{
        event.preventDefault()
        const title = document.getElementById('inputTitle').value;
        const description = document.getElementById('inputDescription').value;
        const code = document.getElementById('inputCode').value;
        const price = document.getElementById('inputPrice').value;
        const stock = document.getElementById('inputStock').value;
        const category = document.getElementById('inputCategory').value;
        const thumbnail = document.getElementById('inputThumbnail').value;


        if (title) {}
        socket.emit('product', {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail
        })
        form.reset()
    })

    socket.on('nuevoUsuario', nuevoUsuario=>{
        Swal.fire({
            text:  nuevoUsuario + ' esta en linea',
            toast: true,
            position: 'top-right'
        })
    })

    socket.on('products', products=>{
        ulProducts.innerHTML = ''
       for (const product of products) {
            const li = document.createElement('li')
            li.innerHTML = `<b>ID: </b> ${product.id} - <b>Title: </b> ${product.title}  - <b>Description: </b> ${product.description} - <b>Code: </b> ${product.code} - <b>Price: </b> ${product.price} - <b>Stock: </b> ${product.stock} - <b>Category: </b> ${product.category}`
            ulProducts?.appendChild(li)
       }
    })
    
    socket.on('usuarioDesconectado', usuarioDesconectado=>{
        Swal.fire({
            text:  usuarioDesconectado + ' se ha desconectado',
            toast: true,
            position: 'top-right'
        })
    })


}


