const inputTextarea = document.querySelector("#input-textarea");
const characterCount = document.querySelector("#character-count");
const wordCount = document.querySelector("#word-count");

inputTextarea.addEventListener("input", () => {
  characterCount.textContent = inputTextarea.value.length;

  wordCount.textContent = inputTextarea.value
    .trim()
    .split(/\s+/)
    .filter((item) => item.length > 0).length;
});
