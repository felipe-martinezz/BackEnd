import fs from "fs"

class Contenedor {
    constructor(path){
        this.path = path
    }

    //Traer todos los productos
    getAll = async() => {
        try {
            if(fs.existsSync(this.path)) {
                let info = await fs.promises.readFile(this.path, "utf-8")
                let products = JSON.parse(info)
                return products
            }else {
                console.log
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Agregar productos
    save = async(title,price,thumbnail) => {
        let producto = {
            title: title,
            price: price,
            thumbnail: thumbnail
        }

        let stock = await this.getAll()
        try {
            if(stock.length === 0) {
                producto.id = 0
                stock.push(producto)
                await fs.promises.writeFile(this.path, JSON.stringify(stock,null,"\t"))
            }else {
                producto.id = stock[stock.length-1].id+1
                stock.push(producto)
                await fs.promises.writeFile(this.path, JSON.stringify(stock,null,"\t"))
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Traer por id
        getById = async(number) => {
           let stock = await this.getAll()
           try {
                let filter = stock.find(e => e.id == number)
                return filter
           } catch (error) {
               console.log(error)
           }
        }     

        //Borrar por id
        deleteById = async(number) => {
            let stock = await this.getAll()
            try {
                let filter = stock.filter(product => product.id != number)
                await fs.promises.writeFile(this.path, JSON.stringify(stock,null,"\t"))
            } catch (error) {
                console.log(error)
            }
        }

        //Borrar el archivo
        deleteAll = async() => {
            try {
                await fs.promises.writeFile(this.path,JSON.parse("[]"))
            } catch (error) {
                console.log(error)
            }
        }
}

let path = new Contenedor ("productos.json")

//Agregar Productos
//path.save('CAMISETA GOLDEN STATE WARRIORS CITY 2021/2022','2790','https://cdn.shopify.com/s/files/1/0567/6639/8509/products/GSWNegra_480x480.jpg?v=1644344617');
//path.save('CAMISETA MEMPHIS GRIZZLIES 2021/2022', '2790','https://cdn.shopify.com/s/files/1/0567/6639/8509/products/52df31e160af14b5e4ad8950f8ae1508_480x480.jpg?v=1656439416');
//path.save('CAMISETA LOS SUNS LOCAL 2020/2021', '2790', 'https://cdn.shopify.com/s/files/1/0567/6639/8509/products/gdgdgd_480x480.jpg?v=1644345207')

//Trayendo Producto por id
//path.getById(2).then(val=> console.log(val))

//Borrar por id
//path.deleteById(2)

//Borrar todo
//path.deleteAll()