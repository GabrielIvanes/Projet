const serverUrlUser = `${serverUrl}/utilisateurs`;

async function createUtilisateur(
  pratique_sportive,
  nom_utilisateur,
  email,
  password,
  sexe,
  age,
  poids,
  taille
) {
  const data = {
    pratique_sportive,
    nom_utilisateur,
    email,
    password,
    sexe,
    age,
    poids,
    taille,
  };

  try {
    await $.ajax({
      url: `${serverUrlUser}/createUtilisateur.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });

    $('#email-inscription').val('');
    $('#nom_utilisateur').val('');
    $('#password-inscription').val('');
    $('input[name="sexe"]').prop('checked', false);
    $('#poids').val('');
    $('#taille').val('');
    $('#age').val('');
    $('input[name="pratique-sportive"]').prop('checked', false);

    $('.inscription-wrapper').css('display', 'none');
    $('.connexion-wrapper').css('display', 'flex');
  } catch (err) {
    console.log(err.reponseText);
    if (err.reponseText.includes("pour la clef 'utilisateur.EMAIL_IX'")) {
      $('.inscription-wrapper .error-message').text('Email déjà utilisé');
    } else {
      $('.inscription-wrapper .error-message').text(err.message);
    }
  }
}

async function connexionUtilisateur(email, password) {
  try {
    const data = {
      email,
      password,
    };

    const reponse = await $.ajax({
      url: `${serverUrlUser}/connexionUtilisateur.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    const id = reponse.id;
    window.localStorage.setItem('idUserImm', id);
    paramUtilisateur(id);
    $('.inscription-wrapper').css('display', 'none');
    $('.connexion-wrapper').css('display', 'none');
    $('.parametre-wrapper').css('display', 'flex');
  } catch (err) {
    console.error(err);
  }
}

async function getAllPratiqueSportive() {
  try {
    const reponse = await $.ajax({
      url: `${serverUrlUser}/getAllPratiqueSportive.php`,
      method: 'GET',
      dataType: 'json',
    });
    return reponse.pratique_sportive;
  } catch (err) {
    console.error(err);
  }
}

async function paramUtilisateur(id) {
  try {
    const data = {
      id,
    };
    const reponse = await $.ajax({
      url: `${serverUrlUser}/paramUtilisateur.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });

    const {
      AGE: age,
      EMAIL: email,
      ID: _,
      NOM_UTILISATEUR: nom_utilisateur,
      PASSWORD: password,
      POIDS: poids,
      PRA_ID: pratique_sportive_id,
      SEXE: sexe,
      TAILLE: taille,
    } = reponse.utilisateur;

    const pratiqueSportive = await getAllPratiqueSportive();

    $('.inscription-wrapper').css('display', 'none');
    $('.connexion-wrapper').css('display', 'none');
    $('.parametre-wrapper').css('display', 'flex');

    $('.parametre .email').text(email);
    $('.parametre .nom_utilisateur').text(nom_utilisateur);
    $('.parametre .sexe').text(sexe === 0 ? 'Masculin' : 'Féminin');
    $('.parametre .poids').text(`${poids} kg`);
    $('.parametre .taille').text(`${taille} cm`);
    $('.parametre .age').text(`${age} ans`);

    $('.parametre .pratique-sportive').text(
      pratiqueSportive.find((prat) => prat.id === pratique_sportive_id).nom
    );
    $('.nav-user-bottom').css('display', 'block');
    $('.nav-user-nom').text(nom_utilisateur);
  } catch (err) {
    console.error(err);
    seDeconnecter();
  }
}

function handleSubmitFormUtilisateur(event) {
  event.preventDefault();

  const email = $('#email-inscription').val();
  const nom_utilisateur = $('#nom_utilisateur').val();
  const password = $('#password-inscription').val();
  const sexe = $('input[name="sexe"]:checked').val();
  const poids = $('#poids').val();
  const taille = $('#taille').val();
  const age = $('#age').val();
  const pratique_sportive = $('input[name="pratique-sportive"]:checked').val();

  createUtilisateur(
    pratique_sportive,
    nom_utilisateur,
    email,
    password,
    sexe,
    age,
    poids,
    taille
  );
}

function handleConnexionFormUtilisateur(event) {
  event.preventDefault();

  const email = $('#email-connexion').val();
  const password = $('#password-connexion').val();

  connexionUtilisateur(email, password);
}

function seDeconnecter() {
  window.localStorage.clear('idUserImm');
  $('.inscription-wrapper').css('display', 'none');
  $('.connexion-wrapper').css('display', 'flex');
  $('.parametre-wrapper').css('display', 'none');
  $('.nav-user-bottom').css('display', 'none');
}

function gobackToLogIn() {
  $('.inscription-wrapper').css('display', 'none');
  $('.connexion-wrapper').css('display', 'flex');
  $('.parametre-wrapper').css('display', 'none');
  $('.nav-user-bottom').css('display', 'none');
  $('.retour').css('display', 'none');
}

$(document).ready(function () {
  const id = window.localStorage.getItem('idUserImm');

  if (id) {
    paramUtilisateur(JSON.parse(id));
  } else {
    gobackToLogIn();
  }
});
