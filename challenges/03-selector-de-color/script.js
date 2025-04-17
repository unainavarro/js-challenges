const colorPicker = document.querySelector("#color-picker");
const body = document.querySelector("body");

colorPicker.addEventListener("input", () => {
  body.style.background = colorPicker.value;
});
