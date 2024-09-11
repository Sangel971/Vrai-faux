const correct = document.querySelectorAll(".correct");
const mauvais = document.querySelectorAll(".mauvais");
const reponse = document.querySelector(".reponse");
let point = 0;

correct.forEach((correct) => {
  correct.addEventListener("click", (e) => {
    const reponse = e.target.parentNode.querySelector(".reponse");
    reponse.style.display = "block";
    reponse.style.background = "lightgreen";
    point++;
  });
});
mauvais.forEach((mauvais) => {
  mauvais.addEventListener("click", (e) => {
    const reponse = e.target.parentNode.querySelector(".reponse");
    reponse.style.display = "block";
    reponse.style.background = "rgb(255, 129, 129)";
  });
});

console.log(point);
