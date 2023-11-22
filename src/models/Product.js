function notNull(valor, etiqueta){
    if (valor === null || valor === undefined || valor === ""){
        throw new Error(`${etiqueta} value can't be null`)
    }
    return valor;
}

export class Product {
    #price
    #title

    constructor({id, title, description, code, price, status=true, stock, category, thumbnail=[]}) {
        this.id = notNull(id, 'id')
        if (typeof title !== 'string') {
            throw new Error('Title should be a string');
        }
        this.#title = notNull(title, 'title');
        this.description = notNull(description, 'description')
        this.code = notNull(code, 'code')
        if(isNaN(parseFloat(price)) || parseFloat(price) <= 0){
            throw new Error ('The price should be higher than 0')
        } 
        this.#price = parseFloat(price, 'price')
        if(isNaN(parseFloat(stock)) || parseFloat(stock) < 0){
            throw new Error ('The stock should not be negative')
        } 
        this.status=status
        this.stock = parseFloat(stock, 'stock')
        this.category=notNull(category, 'category')
        if (thumbnail && (!Array.isArray(thumbnail) || !thumbnail.every(item => typeof item === 'string'))) {
            throw new Error('Thumbnails should be an array of strings');
        }
        this.thumbnail = thumbnail, 'thumbnail'
    }

    toPOJO() {
        return{
            id: this.id,
            title: this.#title,
            description: this.description,
            code: this.code,
            price: this.#price,
            status: this.status,
            stock: this.stock,
            category: this.category,
            thumbnail: this.thumbnail
        }
        
    }
}