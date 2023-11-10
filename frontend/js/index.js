const serverUrl = 'http://localhost/IDAW/Projet/backend/controllers';
// Permet de modifier la visibilité du mot de passe
function formUserEyeClick(place) {
  const input = $(document).find(`.${place} .password-input`);
  let icon = '';
  icon = $(document).find(`.${place} .password i`);
  if (place.includes('old') || place.includes('new'))
    icon = $(document).find(`.${place}.password i`);
  else icon = $(document).find(`.${place} .password i`);

  if (input.attr('type') === 'password') {
    input.attr('type', 'text');
    icon.removeClass('fa-eye');
    icon.addClass('fa-eye-slash');
  } else {
    input.attr('type', 'password');
    icon.removeClass('fa-eye-slash');
    icon.addClass('fa-eye');
  }
}

// Permet de modifier le contenu de la page Profil
function changementProfilContenu() {
  const connexion = $(document).find('.connexion-wrapper');
  const inscription = $(document).find('.inscription-wrapper');
  if (connexion.css('display') === 'none') {
    connexion.css('display', 'flex');
    inscription.css('display', 'none');
  } else {
    $('.inscription-wrapper input[type="submit"]').text("S'inscrire");
    connexion.css('display', 'none');
    inscription.css('display', 'flex');
  }
}

// Permet de modifier le contenu de la page Aliment
function changementAlimentContenu() {
  const ajoutAliment = $(document).find('.aliments .ajout-aliment');
  const datatableAliment = $(document).find('.aliments .table-wrapper');

  if (datatableAliment.css('display') === 'none') {
    datatableAliment.css('display', 'flex');
    ajoutAliment.css('display', 'none');
  } else {
    datatableAliment.css('display', 'none');
    ajoutAliment.css('display', 'flex');
  }
}

// Permet de modifier le contenu de la page Journal
function changementJournalContenu() {
  const ajoutJournal = $(document).find('.journal .ajout-journal');
  const datatableJournal = $(document).find('.journal .table-journal-wrapper');
  const filtres = $('.filtres');

  if (datatableJournal.css('display') === 'none') {
    datatableJournal.css('display', 'flex');
    ajoutJournal.css('display', 'none');
    filtres.css('display', 'flex');
  } else {
    datatableJournal.css('display', 'none');
    filtres.css('display', 'none');
    ajoutJournal.css('display', 'flex');
  }
}
