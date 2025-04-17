document.addEventListener('DOMContentLoaded', () => {
  const boites  = document.querySelectorAll('.boite');
  const valider = document.querySelector('.valider');
  const note    = document.getElementById('note');
  let resetBtn; // on le créera dynamiquement

  // Réaffiche une question selon ce qui est en localStorage
  function renderQuestion(boite, idx) {
    const stored = localStorage.getItem('q' + idx);
    if (!stored) return;
    const reponse = boite.querySelector('.reponse');
    reponse.style.display    = 'block';
    reponse.style.background = stored === 'correct'
      ? 'lightgreen'
      : 'rgb(255,129,129)';
    boite.querySelectorAll('button').forEach(btn => btn.disabled = true);
  }

  // Initialisation au chargement
  boites.forEach((boite, idx) => renderQuestion(boite, idx));

  // Gestion des clics VRAI / FAUX
  boites.forEach((boite, idx) => {
    const btnVrai = boite.querySelector('.correct');
    const btnFaux = boite.querySelector('.mauvais');
    const reponse = boite.querySelector('.reponse');
    let clicked   = false;

    function handleAnswer(isCorrect) {
      if (clicked) return;
      clicked = true;
      reponse.style.display    = 'block';
      reponse.style.background = isCorrect
        ? 'lightgreen'
        : 'rgb(255,129,129)';
      btnVrai.disabled = btnFaux.disabled = true;
      localStorage.setItem('q' + idx, isCorrect ? 'correct' : 'wrong');
    }

    btnVrai.addEventListener('click', () => handleAnswer(true));
    btnFaux.addEventListener('click', () => handleAnswer(false));
  });

  // Création et insertion du bouton Réinitialiser
  function createResetButton() {
    resetBtn = document.createElement('button');
    resetBtn.textContent = 'Réinitialiser';
    resetBtn.className   = 'valider'; // reprend le style du bouton Valider
    resetBtn.style.marginTop = '10px';
    resetBtn.addEventListener('click', () => {
      // Vide le localStorage
      boites.forEach((_, idx) => localStorage.removeItem('q' + idx));
      // Réinitialise l'affichage
      boites.forEach(boite => {
        const reponse = boite.querySelector('.reponse');
        reponse.style.display = 'none';
        boite.querySelectorAll('button').forEach(btn => btn.disabled = false);
      });
      // Masque note et resetBtn
      note.classList.remove('show');
      note.textContent = '';
      resetBtn.remove();
    });
    // Insère juste après la note
    note.insertAdjacentElement('afterend', resetBtn);
  }

  // Clic sur Valider : calcule le score, affiche la note et le bouton Réinit
  valider.addEventListener('click', () => {
    let totalCorrect = 0;
    boites.forEach((_, idx) => {
      if (localStorage.getItem('q' + idx) === 'correct') {
        totalCorrect++;
      }
    });
    note.classList.add('show');
    note.textContent = `${totalCorrect} sur ${boites.length}`;
    // si le bouton Réinit n'existe pas encore, on le crée
    if (!resetBtn) createResetButton();
  });
});
