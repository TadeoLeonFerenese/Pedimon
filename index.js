const navToggle = document.querySelector(".nav-toggle");
const navUL = document.querySelector(".ulBuy");

navToggle.addEventListener("click", () => {
  navUL.classList.toggle("ulBuy-visible");
});
