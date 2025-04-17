const output = document.querySelector("#output");

window.addEventListener("mousemove", (e) => {
  let positionX = e.clientX;
  let positionY = e.clientY;

  output.innerHTML = `
  <div>
    <p>X:<span>${positionX}</span></p>
    <p>Y:<span>${positionY}</span></p>
  </div>
  `;
});
