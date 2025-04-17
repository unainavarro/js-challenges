const btn = document.querySelector(".btn");
const container = document.querySelector(".container");

// Función para crear una caja con un color aleatorio
function createBox() {
  const box = document.createElement("div");
  const color = randomHexColorCode();
  box.classList.add("box");
  box.style.backgroundColor = color;
  box.textContent = color; // Usa textContent en lugar de innerHTML por seguridad
  return box;
}

// Generar 9 cajas y añadirlas al contenedor
for (let i = 0; i < 9; i++) {
  container.appendChild(createBox());
}

// Asignar el evento al botón
btn.addEventListener("click", addColor);

// Generar un código de color hexadecimal aleatorio
function randomHexColorCode() {
  const chars = "0123456789abcdef";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * chars.length)];
  }

  return color;
}

// Cambiar los colores de las cajas al hacer clic en el botón
function addColor() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    const newColor = randomHexColorCode();
    box.style.backgroundColor = newColor;
    box.textContent = newColor; // Actualizar el texto del color
  });
}
