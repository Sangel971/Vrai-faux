document.addEventListener('DOMContentLoaded', () => {
  const boites = document.querySelectorAll('.boite');
  const valider = document.querySelector('.valider');
  const note = document.getElementById('note');
  
  // Helper to render one question according to stored answer
  function renderQuestion(boite, idx) {
    const stored = localStorage.getItem('q' + idx);
    if (!stored) return;               // no answer yet
    const reponse = boite.querySelector('.reponse');
    // show and color
    reponse.style.display = 'block';
    reponse.style.background = (stored === 'correct') 
      ? 'lightgreen' 
      : 'rgb(255,129,129)';
    // disable both buttons
    boite.querySelectorAll('button').forEach(btn => btn.disabled = true);
  }
  
  // Initial rendering from localStorage
  boites.forEach((boite, idx) => {
    renderQuestion(boite, idx);
  });
  
  // Attach listeners to each question’s buttons
  boites.forEach((boite, idx) => {
    const btnVrai  = boite.querySelector('.correct');
    const btnFaux  = boite.querySelector('.mauvais');
    const reponse  = boite.querySelector('.reponse');
    let clicked    = false;  // local guard, but we also rely on disabled
    
    function handleAnswer(isCorrect) {
      if (clicked) return;
      clicked = true;
      // display the explanation
      reponse.style.display = 'block';
      reponse.style.background = isCorrect 
        ? 'lightgreen' 
        : 'rgb(255,129,129)';
      // disable both
      btnVrai.disabled = btnFaux.disabled = true;
      // store the answer
      localStorage.setItem('q' + idx, isCorrect ? 'correct' : 'wrong');
    }
    
    btnVrai.addEventListener('click', () => handleAnswer(true));
    btnFaux.addEventListener('click', () => handleAnswer(false));
  });
  
  // “Valider” shows the total from stored answers
  valider.addEventListener('click', () => {
    let totalCorrect = 0;
    boites.forEach((_, idx) => {
      if (localStorage.getItem('q' + idx) === 'correct') {
        totalCorrect++;
      }
    });
    note.classList.add('show');
    note.textContent = `${totalCorrect} sur ${boites.length}`;
  });
});
