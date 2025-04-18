const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".create-btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";

  assignEventsToNotes();
}
showNotes();

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Crear una nueva nota
createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");

  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");

  img.src = "img/delete.png";
  img.className = "delete-btn";

  notesContainer.appendChild(inputBox).appendChild(img);
  assignEventsToNotes();
  updateStorage();
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

function assignEventsToNotes() {
  notes = document.querySelectorAll(".input-box");
  notes.forEach((nt) => {
    nt.onkeyup = function () {
      updateStorage();
    };
  });
}
