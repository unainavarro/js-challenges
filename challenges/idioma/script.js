const langButtons = document.querySelectorAll("[data-language]");
const textsToChange = document.querySelectorAll("[data-section]");

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    fetch(`lang/${button.dataset.language}.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        textsToChange.forEach((element) => {
          const section = element.dataset.section;
          const value = element.dataset.value;

          element.innerHTML = data[section][value];
        });
      });
  });
});
