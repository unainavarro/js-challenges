const monedas = document.querySelectorAll(".moneda");
const hucha = document.getElementById("hucha");
const totalElement = document.querySelector(".total");

function permitirSoltar(event) {
  event.preventDefault();
  hucha.classList.add("drag-over");
}

function soltarMoneda(event) {
  event.preventDefault();
  hucha.classList.remove("drag-over");

  const valorMoneda = parseFloat(event.dataTransfer.getData("text"));

  let total = parseFloat(totalElement.textContent);
  total += valorMoneda;

  totalElement.textContent = total.toFixed(2);
}

monedas.forEach((moneda) => {
  moneda.addEventListener("dragstart", (event) => {
    const valorMoneda = moneda.getAttribute("data-valor");
    event.dataTransfer.setData("text", valorMoneda);
  });
});
