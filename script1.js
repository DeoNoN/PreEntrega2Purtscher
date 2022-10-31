// let listaBombones = [
//     {tipo: 'suizo', precio: 700, stock: 34, img: ''},
//     {tipo: 'negro', precio: 200, stock: 20, img: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
//     {tipo: 'blanco', precio: 150, stock: 33, img: 'https://images.pexels.com/photos/1854664/pexels-photo-1854664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
// ]

// ---------------------------Variables---------------------------

//Capturo elemento HTML (No corresponde a la evaluacion de la segunda entrega)
let catalogo = document.getElementById("catalogo")

//Arrays de stock y carro
let listaBombones = []
let carro = []

//Variables de navegacion de menu
let opcion
let menu = true

//Variables de control de carro
let compra
let unidades
let eliminar

//Auxiliar de texto
let plantilla

// ---------------------------Funciones---------------------------

//Funcion constructora de stock
class bombon {

    constructor (tipo, precio, stock, img) {

        this.tipo = tipo.toLowerCase()
        this.precio = precio
        this.stock = stock
        this.img = img
    }
}

//Suma subtotal
function sumaCarro() {
    var sumaC = 0

    for (const producto of carro) {

        sumaC = sumaC + producto.precio * producto.cantidad
    }

    return sumaC
}
 
//control de stock
function actualizaStock(item, diff) {
    listaBombones = listaBombones.map((producto) => {

        if (producto.tipo == item) {

            return {

                tipo: producto.tipo,
                precio: producto.precio,
                stock: +producto.stock + +diff,
                img: producto.img
            }
        }

        return producto
    })
}

// ------------------------------------------------------------
// ---------------------------Codigo---------------------------
// ------------------------------------------------------------

//Creacion de objetos en catalogo
listaBombones.push(new bombon ('negro', 300, 30, 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'))
listaBombones.push(new bombon ('blanco', 200, 25, 'https://images.pexels.com/photos/1854664/pexels-photo-1854664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'))
listaBombones.push(new bombon('suizo', 450, 10, 'https://images.pexels.com/photos/10270060/pexels-photo-10270060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'))

//Creacion de tarjetas HTML (Queda fuera de la evaluacion)
for (const producto of listaBombones) {

    let tarjeta = document.createElement('div')
    tarjeta.className = 'tarjeta'

    tarjeta.innerHTML = `<h3>Chocolate ${producto.tipo}</h3>
                        <p>Precio: $${producto.precio}<br>stock = ${producto.stock}</p>
                        <img
                        src="${producto.img}"
                        alt="Imagen de muestra de un chocolate" width="250px" height="200px"
                        >`

    catalogo.append(tarjeta)
}

// ---------------------------Menu de navegacion---------------------------
while (menu == true) {

    //Selector de opciones
    opcion = prompt('Bienvenido a "Date el gusto", seleccione una opción: Catalogo, Comprar, Carro, Eliminar, Confirmar, Salir.').toLowerCase()

    switch (opcion) {

        case 'catalogo':

            plantilla = 'Catálogo: '
            for (const producto of listaBombones) {

                plantilla = `${plantilla} ${producto.tipo}: stock - ${producto.stock} unidades, precio - $${producto.precio} ||`
            }

            alert(plantilla)

            break

        case 'comprar':

            compra = prompt('¿Que producto desea comprar?').toLowerCase()

            // Filtro de existencia
            if (listaBombones.some((producto) => producto.tipo === compra) == false) {

                alert('El articulo escogido no existe')
                break
            }

            unidades = prompt('¿Cuantas unidades?')

            // Filtro de exceso de stock
            if (unidades > listaBombones.find((producto) => producto.tipo === compra).stock) {

                alert('Excede la cantidad de stock disponible.')
                break
            } else if (unidades <= 0) {

                alert('El valor ingresado es incorrecto.')
                break
            }

            // Actualizar el carro de compras
            carro = carro.concat(listaBombones.map((producto) => {

                return {
                    tipo: producto.tipo,
                    precio: producto.precio,
                    cantidad: unidades
                }

            }).find((producto) => producto.tipo === compra))

            // Actualizar el valor del stock disponible
            actualizaStock(compra, unidades * -1)

            break

        case 'carro':

            // Filtro de carro vacio
            if (carro.length == 0) {

                alert('Usted no tiene productos en su carro.')
                break
            }

            // Mostrar productos en el carro
            plantilla = 'Su carro de compra contiene | '
            for (const producto of carro) {

                plantilla = `${plantilla} ${producto.cantidad} ${producto.tipo} |`
            }

            alert(plantilla)

            break

        case 'eliminar':

            // Filtro de carro vacio
            if (carro.length == 0) {

                alert('Usted no tiene productos en su carro.')
                break
            }

            eliminar = prompt('¿Que producto de su carro desea eliminar?').toLowerCase()

            // Filtro de existencia
            if (carro.some((producto) => producto.tipo === eliminar) == false) {

                alert('El articulo escogido no existe')
            } else {

                // Actualizar el valor del stock disponible
                actualizaStock(eliminar, carro.find((producto) => producto.tipo === eliminar).cantidad)

                carro.splice(carro.indexOf(carro.find((producto) => producto.tipo === eliminar)), 1)
            }

            break

        case 'confirmar':

            // Filtro de carro vacio
            if (carro.length == 0) {

                alert('Usted no tiene productos en su carro.')
                break
            }

            // Confirmacion de compra, en caso positivo deriva para "case: salir"
            if (prompt(`El total es de $${sumaCarro()} ($${sumaCarro() * 1.22} con IVA incluido), para confirmar ingrese SI.`).toLowerCase() == 'si') {

                alert('Muchas gracias por elegir Date el gusto.')
                menu = false
            } else {

                break
            }
            
        case 'salir':

            menu = false
            break

        default:
            alert('No ha escogido una de las opciones.')
    }
} 