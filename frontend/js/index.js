const serverUrl = 'http://localhost/IDAW/Projet/backend/controllers';
// Permet de modifier la visibilité du mot de passe
function formUserEyeClick() {
  const input = $(document).find('.password-input');
  const icon = $(document).find('.password i');

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

function changementProfilContenu() {
  const connexion = $(document).find('.connexion-wrapper');
  const inscription = $(document).find('.inscription-wrapper');

  if (connexion.css('display') === 'none') {
    connexion.css('display', 'flex');
    inscription.css('display', 'none');
    $('.retour').css('display', 'none');
  } else {
    $('.inscription-wrapper input[type="submit"]').text("S'inscrire");
    connexion.css('display', 'none');
    inscription.css('display', 'flex');
    $('.retour').css('display', 'block');
  }
}

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
