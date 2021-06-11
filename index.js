const navToggle = document.querySelector(".nav-toggle");
const navUL = document.querySelector(".ulBuy");

navToggle.addEventListener("click", () => {
  navUL.classList.toggle("ulBuy-visible");
});

class Pokemon {
  nombre = "";
  Tipo = "";
  url_img = "";
  stock = 0;
  precio = 0;
  constructor(nombre, Tipo, url_img, stock, precio) {
    this.nombre = nombre;
    this.Tipo = Tipo;
    this.url_img = url_img;
    this.stock = stock;
    this.precio = precio;
  }
}

var pokemon1 = new Pokemon(`charizard`, `fuego`, "./img/Chorizard.png", 3, 160);
var pokemon2 = new Pokemon(`pikachu`, `Electrico`, "./img/Pikachu.png", 3, 100);
var pokemon3 = new Pokemon(
  `Squirtle`,
  `Agua`,
  "./img/vamo a calmarno.png",
  3,
  100
);
var pokemon4 = new Pokemon(`Venasaur`, `Hoja`, "./img/venusaur.png", 3, 160);
var pokemon5 = new Pokemon(`Totodile`, `Agua`, "./img/totodile.png", 3, 100);
var pokemon6 = new Pokemon(
  `Typhlosion`,
  `Fuego`,
  "./img/typhlosion.png",
  3,
  160
);

inventario = [];

inventario.push(pokemon1);
inventario.push(pokemon2);
inventario.push(pokemon3);
inventario.push(pokemon4);
inventario.push(pokemon5);
inventario.push(pokemon6);

miCompra = [];

function agragarAlCarrito(nombre) {
  let pokemon;

  for (let index = 0; index < inventario.length; index++) {
    if (inventario[index].nombre == nombre) {
      if (inventario[index].stock == 0) {
        alert("Sin Stock");
      } else {
        inventario[index].stock--;
        pokemon = inventario[index];
        miCompra.push(pokemon);
        AgregarAlaVista();
      }
      break;
    }
  }
}

function AgregarAlaVista() {
  let html = "";
  for (let index = 0; index < miCompra.length; index++) {
    html += `<li class="liBuy"> <img width="20px"  src="${miCompra[index].url_img}"/> ${miCompra[index].nombre} x $${miCompra[index].precio}</li>`;
  }
  document.getElementById("carrito").innerHTML = html;
}
