/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/4geeks.ico";

let timer = 0;

window.onload = function() {
  timer = timerCard();
  changeCard();

  document.querySelector("#change").addEventListener("click", changeCard);
  document.querySelector("#width").addEventListener("input", changeSize);
  document.querySelector("#height").addEventListener("input", changeSize);

  document.querySelector("#card").addEventListener("click", changeCardAndTime);
};

const numGenerator = max => Math.floor(Math.random() * max);

/**
 * Cambia los valores de la carta de forma aleatoria
 */
function changeCard() {
  const palos = ["♦", "♥", "♠", "♣"];
  const numeros = ["A", 2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K"];

  let top = document.querySelector("#top");
  let bottom = document.querySelector("#bottom");
  let palo = numGenerator(palos.length);

  document.querySelector("#num").innerText =
    numeros[numGenerator(numeros.length)];

  top.innerHTML = bottom.innerHTML = palos[palo];

  if (palo == 0 || palo == 1) {
    top.parentElement.classList.add("red");
  } else {
    top.parentElement.classList.remove("red");
  }
}

/**
 * Crea un intervalo para que la carta se cambie automaticamente
 * @returns Id del intervalo actual
 */
function timerCard() {
  return setInterval(() => {
    changeCard();
  }, 10000);
}

/**
 * Cambia el tamaño de la carta segun el número introducido  viewport
 * @param {InputEvent} input Es el actual input que se modifica
 */
function changeSize(input) {
  let prop = "height";
  let type = "vh";
  const style = document.querySelector(".card").style;

  if (input.target.id === "width") {
    prop = input.target.id;
    type = "vw";
  }
  style[prop] = input.target.value + type;
  let vw = style.width.substring(0, style.width.length - 2);

  style.fontSize = vw / 3.33 + "vh";
}

/**
 * Borra el actual temporizador, cambia la carta y pone un nuevo temporizador
 */
function changeCardAndTime() {
  clearInterval(timer);
  changeCard();
  timer = timerCard();
}
