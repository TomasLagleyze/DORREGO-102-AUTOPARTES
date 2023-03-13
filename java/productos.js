//JS BASE DEL PROYECTO - CLASE + OBJETOS + ARRAY + LOCAL STORAGE
class Producto {
    constructor(id, marca, modelo, lado, precio, imagen, categoria, cantidad) {
        this.id = id
        this.marca = marca
        this.modelo = modelo
        this.lado = lado
        this.precio = precio
        this.imagen = imagen
        this.categoria = categoria
        this.cantidad = cantidad
    }

    mostrarInfoOpticas() {
        console.log(`La marca es ${marca}, el modelo es ${modelo}, del lado ${lado} y su precio es ${precio}`)
    }
}

// const opticas1 = new Producto(1, "Chevrolet", "Corsa-Classic", "izq", 35000, "OPTICAS-CHEVROLET-CORSA-CLASSIC.jpg", "Opticas", cantidad = 1)
// const opticas2 = new Producto(2, "Chevrolet", "Cruze", "der", 55000, "OPTICAS-CHEVROLET-CRUZE-LD.jpg", "Opticas", cantidad = 1)
// const opticas3 = new Producto(3, "Chevrolet", "Onix", "izq", 45000, "OPTICAS-CHEVROLET-ONIX-LS-2013-2016.jpg", "Opticas", cantidad = 1)
// const opticas4 = new Producto(4, "Fiat", "Palio", "izq", 15000, "OPTICAS-FIAT-PALIO-12-20.jpg", "Opticas", cantidad = 1)
// const opticas5 = new Producto(5, "Ford", "Ecosport", "der", 50000, "OPTICAS-FORD-ECOSPORT-KINETIC-2013-2016.jpg", "Opticas", cantidad = 1)
// const opticas6 = new Producto(6, "Ford", "Focus", "izq", 45000, "OPTICAS-FORD-FOCUS-08-13.jpg", "Opticas", cantidad = 1)
// const opticas7 = new Producto(7, "Volkswagen", "Gol", "izq", 30000, "OPTICAS-VW-GOL-1999-2005.jpg", "Opticas", cantidad = 1)
// const opticas8 = new Producto(8, "Volkswagen", "Polo", "der", 12000, "OPTICAS-VW-POLO.jpg", "Opticas", cantidad = 1)
// const paragolpe1 = new Producto(9, "Ford", "Ka", "-", 25000, "PARAGOLPE-DEL-FORD-KA-16-18.jpg", "Paragolpes", cantidad = 1)

let arrayDeposito = {
    data: []
}

const cargarDeposito = async () => {
    const response = await fetch("productos.json")
    const data = await response.json()
    console.log(data)
    for (let producto of data) {
        let productoNuevo = new Producto(producto.id, producto.marca, producto.modelo, producto.lado, producto.precio, producto.imagen, producto.categoria, producto.cantidad)
        arrayDeposito.data.push(productoNuevo)
    }
    localStorage.setItem("deposito", JSON.stringify(arrayDeposito))
}

if (localStorage.getItem("deposito")) {
    arrayDeposito = JSON.parse(localStorage.getItem("deposito"))
} else {
    console.log("Armado de stock de productos")
    cargarDeposito()

}

console.log(arrayDeposito)



// // LOCAL STORAGE + JSON
// localStorage.setItem("deposito", JSON.stringify(arrayDeposito.data))
// let deposito = JSON.parse(localStorage.getItem("deposito"))
// console.log(deposito)


// opticas1, opticas2, opticas3, opticas4, opticas5, opticas6, opticas7, opticas8, paragolpe1