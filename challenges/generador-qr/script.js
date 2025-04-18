const imgBox = document.querySelector("#img-box");
const qrImage = document.querySelector("#qr-image");
const inputText = document.querySelector("#input-text");
const btnGenerateQr = document.querySelector("#btn-generate-qr");

btnGenerateQr.addEventListener("click", () => {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${inputText.value}`;

  if (inputText.value.length > 0) {
    qrImage.src = url;
    qrImage.classList.remove("hidden");
    imgBox.classList.add("show-img");
  } else {
    inputText.classList.add("error");

    setTimeout(() => {
      inputText.classList.remove("error");
    }, 1000);
  }
});
