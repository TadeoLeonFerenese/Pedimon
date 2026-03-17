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
  ivs = "";
  movHuevo = "";
  constructor(nombre, Tipo, url_img, stock, precio, ivs, movHuevo) {
    this.nombre = nombre;
    this.Tipo = Tipo;
    this.url_img = url_img;
    this.stock = stock;
    this.precio = precio;
    this.ivs = ivs;
    this.movHuevo = movHuevo;
  }
}

var pokemon1 = new Pokemon(`charizard`, `fuego`, "./img/Chorizard.png", 3, 1200, "6x31 Perfetos", "Danza Dragón, Enfado");
var pokemon2 = new Pokemon(`pikachu`, `Electrico`, "./img/Pikachu.png", 3, 350, "6x31 Perfetos", "Sorpresa, Placaje Eléc.");
var pokemon3 = new Pokemon(`Squirtle`, `Agua`, "./img/vamo a calmarno.png", 3, 450, "6x31 Perfetos", "Esfera Aural, Salpicar");
var pokemon4 = new Pokemon(`Venasaur`, `Hoja`, "./img/venusaur.png", 3, 800, "5x31 (0 Atq)", "Gigadrenado, Drenadoras");
var pokemon5 = new Pokemon(`Totodile`, `Agua`, "./img/totodile.png", 3, 500, "6x31 Perfetos", "Danza Dragón, Puño Hielo");
var pokemon6 = new Pokemon(`Typhlosion`, `Fuego`, "./img/typhlosion.png", 3, 750, "5x31 (0 Atq)", "Estallido, Paranormal");

inventario = [];

inventario.push(pokemon1);
inventario.push(pokemon2);
inventario.push(pokemon3);
inventario.push(pokemon4);
inventario.push(pokemon5);
inventario.push(pokemon6);

miCompra = [];

function renderizarCatalogo() {
  let html = "";
  for (let index = 0; index < inventario.length; index++) {
    const p = inventario[index];
    html += `
      <div class="Buycard">
          <img class="img-pokeball" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball">
          <h2>${p.nombre}</h2>
          <img class="img-buycard" src="${p.url_img}" alt="${p.nombre}">
          <div class="pokemon-stats">
              <p class="pokemon-price">$${p.precio}.00</p>
              <p><strong>IVS:</strong> ${p.ivs}</p>
              <p><strong>Mov. Huevo:</strong> ${p.movHuevo}</p>
          </div>
          <button class="Boton" onclick="agragarAlCarrito('${p.nombre}')">COMPRAR</button>
      </div>
    `;
  }
  document.getElementById("catalog-container").innerHTML = html;
}

renderizarCatalogo();

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
  let htmlSection3 = "";
  let total = 0;

  for (let index = 0; index < miCompra.length; index++) {
    // HTML para el desplegable de navegación (Súper vistoso)
    html += `
      <li class="liBuy">
        <div class="liBuy-info">
          <img width="50px" src="${miCompra[index].url_img}" style="image-rendering: pixelated;"/>
          <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 2px;">
            <span class="liBuy-name" style="font-family: 'Press Start 2P', cursive; font-size: 10px;">${miCompra[index].nombre}</span>
            <span style="font-size: 11px; color: #64748b;">${miCompra[index].ivs}</span>
          </div>
        </div>
        <span class="liBuy-price" style="font-family: 'Press Start 2P', cursive; font-size: 11px;">$${miCompra[index].precio}</span>
      </li>
    `;
    
    // HTML para la Sección 3 (Cart Section)
    htmlSection3 += `
      <li class="cart-item">
        <div class="cart-item-info">
          <img src="${miCompra[index].url_img}" width="30">
          <span>- ${miCompra[index].nombre}</span>
        </div>
        <span class="cart-item-price">$${miCompra[index].precio}</span>
      </li>
    `;
    total += miCompra[index].precio;
  }

  document.getElementById("carrito").innerHTML = html;

  // Si hay items, agregar el botón de Pagar al final del desplegable
  if (miCompra.length > 0) {
    const btnPagar = document.createElement("button");
    btnPagar.className = "btn-pay-dropdown";
    btnPagar.innerText = "PAGAR";
    btnPagar.onclick = finalizarCompra;
    document.getElementById("carrito").appendChild(btnPagar);
  }

  document.getElementById("cart-items-list").innerHTML = htmlSection3;
  document.getElementById("cart-total-value").innerText = `$${total}`;
  
  actualizarBadgeCarrito();
}

function finalizarCompra() {
  if (miCompra.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  // Guardar carrito en localStorage para la página de checkout
  localStorage.setItem('pedimon_carrito', JSON.stringify(miCompra));
  window.location.href = 'checkout.html';
}

function actualizarBadgeCarrito() {
  const badge = document.getElementById("cart-count");
  const totalItems = miCompra.length;
  
  if (totalItems > 0) {
    badge.innerText = totalItems;
    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  }
}

function reproducirSonidoPokemon() {
  const pokemonIds = [1, 4, 7, 25, 150, 94, 149, 143, 6, 89, 130, 248, 3, 2, 65, 95, 38, 136, 135, 134, 133, 131];
  const randomId = pokemonIds[Math.floor(Math.random() * pokemonIds.length)];
  const audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${randomId}.ogg`);
  audio.volume = 0.5;
  audio.play().catch(e => console.log("Error reproduciendo sonido:", e));
}
