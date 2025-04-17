const result = document.querySelector("#result");

window.addEventListener("keydown", (e) => {
  result.innerHTML = `
  La tecla pulsada es <h2>${e.key}</h2>
  <p>Su código es: ${e.code}</p>
  `;
});
