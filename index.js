const correct = document.querySelectorAll(".correct");
const mauvais = document.querySelectorAll(".mauvais");
const valider = document.querySelector(".valider");

// comptabilisateur de point
let point = 0;

correct.forEach((correct) => {
  let clicked = false;
  correct.addEventListener("click", (e) => {
    const parentBoite = e.target.parentNode; // Sélectionne la boîte parent
    const reponse = parentBoite.querySelector(".reponse");

    if (clicked === false) {
      reponse.style.display = "block";
      reponse.style.background = "lightgreen";
      clicked = true;
      point++;
      // Désactive les deux boutons (VRAI et FAUX)
      parentBoite.querySelectorAll("button").forEach((button) => {
        button.disabled = true;
      });
    }
  });
});
mauvais.forEach((mauvais) => {
  let clicked = false;
  mauvais.addEventListener("click", (e) => {
    const parentBoite = e.target.parentNode; // Sélectionne la boîte parent
    const reponse = parentBoite.querySelector(".reponse");

    if (!clicked) {
      reponse.style.display = "block";
      reponse.style.background = "rgb(255, 129, 129)";
      clicked = true;

      // Désactive les deux boutons (VRAI et FAUX)
      parentBoite.querySelectorAll("button").forEach((button) => {
        button.disabled = true;
      });
    }
  });
});

valider.addEventListener("click", () => {
  note.classList.add('show');
  note.textContent = point + " sur 19";
});

