//CARRITO 
//const carrito
const contenedorCarrito = document.getElementById("carrito-contenedor")

//vaciar carrito
const botonVaciar = document.getElementById('vaciar-carrito')

botonVaciar.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
})
//carrito precio total
const precioTotal = document.getElementById('precioTotal')


//JSON & STORAGE
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    actualizarCarrito()
  }
})

//CARDS DE PRODUCTOS
for (let i of arrayDeposito.data) {
  //CARD
  let card = document.createElement("div");
  card.classList.add("card", i.categoria, "hide");
  //IMG DIV
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  //IMG TAG
  let imagen = document.createElement("img");
  imagen.setAttribute("src", i.imagen);
  imgContainer.appendChild(imagen);
  card.appendChild(imgContainer);
  //CONTAINER
  let container = document.createElement("div");
  container.classList.add("container");
  //MARCA PRODUCTO
  let productoMarca = document.createElement("h5");
  productoMarca.classList.add("marca");
  productoMarca.innerText = i.marca.toUpperCase()
  container.appendChild(productoMarca);
  //MODELO PRODUCTO
  let productoModelo = document.createElement("h6");
  productoModelo.classList.add("modelo");
  productoModelo.innerText = i.modelo.toUpperCase()
  container.appendChild(productoModelo);
  //LADO PRODUCTO
  let productoLado = document.createElement("h7");
  productoLado.classList.add("lado");
  productoLado.innerText = i.lado.toUpperCase()
  container.appendChild(productoLado);
  //precio
  let precio = document.createElement("h8");
  precio.innerText = " $" + i.precio;
  container.appendChild(precio);
  //BOTON CARRITO
  let botonCarrito = document.createElement("button");
  botonCarrito.classList.add("boton-compras");
  botonCarrito.setAttribute("id", i.id);
  botonCarrito.innerText = "Agregar al carrito";
  container.appendChild(botonCarrito)

  botonCarrito.addEventListener('click', () => {
    agregarAlCarrito(i.id)
  })

  card.appendChild(container)
  document.getElementById("deposito").appendChild(card);
}
let carrito = []

const agregarAlCarrito = (prodId) => {

  const existe = carrito.some(prod => prod.id === prodId)

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === prodId) {
        prod.cantidad++
      }
    })
  } else {



    const item = arrayDeposito.data.find((prod) => prod.id === prodId)
    carrito.push(item)

actualizarCarrito()

  }

  


  //LIBRERIA SWEET ALERT

  Swal.fire({
    title: "Ha agregado un producto :D",
    text: `El producto ha sido agregado`,
    icon: "info",
    confirmButtonText: 'Entendido',
    confirmButtonColor: "green",
    timer: 3000
})
}
//CARRITO PARTE 2

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  actualizarCarrito()
}

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = ""

  carrito.forEach((prod) => {
    const div = document.createElement('div')
    div.className = ('productoEnCarrito')
    div.innerHTML = `
    <p>${prod.marca}</p>
    <p>${prod.modelo}</p>
    <p>Precio:$${prod.precio}</p>
    <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
    <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><img class="logo-eliminar" src="./logo/LOGO-ELIMINAR.png" alt=""></button>
    `

    contenedorCarrito.appendChild(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))

  })

  contadorCarrito.innerText = carrito.length
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}

// 

//BARRA DE BUSQUEDA

//PARAMETRO ASIGNADO AL BOTON
function filterProductos(value) {
  //CODIGO DE BOTONES
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });


  //SELECCIONANDO TODAS LAS CARDS
  let elements = document.querySelectorAll(".card");

  elements.forEach((element) => {

    if (value == "todos") {
      element.classList.remove("hide");
    } else {
      //CHEQUEO SI EL ELEMENTO CONTIENE LA CATEGORIA
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
}

//BOTON DE BUSQUEDA
document.getElementById("search").addEventListener("click", () => {
  //inicializaciones
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".marca");
  let cards = document.querySelectorAll(".card");

  //recorrido de elementos
  elements.forEach((element, index) => {
    //chequeando si el texto incluye el valor de busqueda
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //cards encontradas
      cards[index].classList.remove("hide");
    } else {
      //cards ocultas
      cards[index].classList.add("hide");
    }
  });
});


window.onload = () => {
  filterProductos("todos");
};



// JS MODO OSCURO O MODO CLARO
let modoOscuro

if (localStorage.getItem("modoOscuro")) {
  modoOscuro = localStorage.getItem("modoOscuro")
  console.log(modoOscuro)
} else {
  console.log("Entra por primera vez")
  localStorage.setItem("modoOscuro", false)
  modoOscuro = localStorage.getItem("modoOscuro")
}


if (modoOscuro == "true") {
  document.body.classList.add("darkMode")
} else {
  document.body.classList.remove("darkMode")
}


let botonDarkMode = document.getElementById("botonDarkMode")

let botonLightMode = document.getElementById("botonLightMode")

botonDarkMode.addEventListener("click", () => {
  console.log("btn oscuro funciona")
  document.body.classList.add("darkMode")
  localStorage.setItem("modoOscuro", true)
})

botonLightMode.addEventListener("click", () => {
  console.log("btn claro funciona")
  document.body.classList.remove("darkMode")
  localStorage.setItem("modoOscuro", false)
})

