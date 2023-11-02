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
    $('#nom-utilisateur').val('');
    $('#password-inscription').val('');
    $('input[name="sexe"]').prop('checked', false);
    $('#poids').val('');
    $('#taille').val('');
    $('#age').val('');
    $('input[name="pratique-sportive"]').prop('checked', false);

    $('.inscription-wrapper').css('display', 'none');
    $('.connexion-wrapper').css('display', 'flex');
  } catch (err) {
    if (
      err.responseText &&
      err.responseText.includes("pour la clef 'utilisateur.EMAIL_IX'")
    ) {
      $('.inscription-wrapper .error-message').text('Email déjà utilisé');
    } else {
      $('.inscription-wrapper .error-message').text('');
    }
  }
}

async function updateUtilisateur(
  id,
  pratique_sportive,
  nom_utilisateur,
  email,
  sexe,
  age,
  poids,
  taille
) {
  const data = {
    id,
    pratique_sportive,
    nom_utilisateur,
    email,
    sexe,
    age,
    poids,
    taille,
  };

  try {
    await $.ajax({
      url: `${serverUrlUser}/updateUtilisateur.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });

    displayParamUtilisateur(id);
    $('.inscription-wrapper .form-group.password').css('display', 'block');
    $('.inscription-wrapper .form-group.password').prop('required', true);
    $('.inscription-wrapper input[type="submit"]').val('Sinscrire');
    $('.inscription-wrapper').css('display', 'none');
    $('.connexion-wrapper').css('display', 'none');
    $('.parametre-wrapper').css('display', 'flex');
  } catch (err) {
    console.error(err);
  }
}

async function deleteUtilisateur() {
  const data = {
    id_utilisateur: JSON.parse(window.localStorage.getItem('idUserImm')),
  };

  try {
    await $.ajax({
      url: `${serverUrlUser}/deleteUtilisateur.php`,
      method: 'DELETE',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });

    seDeconnecter();
  } catch (err) {
    console.error(err);
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
    displayParamUtilisateur(id);
    $('#email-connexion').val('');
    $('#password-connexion').val('');
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

    return reponse.utilisateur;
  } catch (err) {
    seDeconnecter();
    console.error(err);
  }
}

async function displayParamUtilisateur(id) {
  const utilisateur = await paramUtilisateur(id);

  const pratiqueSportive = await getAllPratiqueSportive();

  $('.inscription-wrapper').css('display', 'none');
  $('.connexion-wrapper').css('display', 'none');
  $('.parametre-wrapper').css('display', 'flex');

  $('.parametre .email').text(utilisateur.EMAIL);
  $('.parametre .nom-utilisateur').text(utilisateur.NOM_UTILISATEUR);
  $('.parametre .sexe').text(
    parseInt(utilisateur.SEXE) === 0 ? 'Masculin' : 'Féminin'
  );
  $('.parametre .poids').text(`${utilisateur.POIDS} kg`);
  $('.parametre .taille').text(`${utilisateur.TAILLE} cm`);
  $('.parametre .age').text(`${utilisateur.AGE} ans`);

  $('.parametre .pratique-sportive').text(
    pratiqueSportive.find((prat) => prat.id === utilisateur.PRA_ID).nom
  );
  $('.nav-user-bottom').css('display', 'block');
  $('.nav-user-nom').text(utilisateur.NOM_UTILISATEUR);
}

function seDeconnecter() {
  window.localStorage.clear('idUserImm');
  $('.inscription-wrapper').css('display', 'none');
  $('.connexion-wrapper').css('display', 'flex');
  $('.parametre-wrapper').css('display', 'none');
  $('.nav-user-bottom').css('display', 'none');
}

function goBackToLogIn() {
  $('.inscription-wrapper').css('display', 'none');
  $('.connexion-wrapper').css('display', 'flex');
  $('.parametre-wrapper').css('display', 'none');
  $('.nav-user-bottom').css('display', 'none');
  $('.retour').css('display', 'none');
}

function handleSubmitFormUtilisateur(event) {
  event.preventDefault();

  const jsonId = window.localStorage.getItem('idUserImm');

  const email = $('#email-inscription').val();
  const nom_utilisateur = $('#nom-utilisateur').val();
  const password = $('#password-inscription').val();
  const sexe = $('input[name="sexe"]:checked').val();
  const poids = $('#poids').val();
  const taille = $('#taille').val();
  const age = $('#age').val();
  const pratique_sportive = $('input[name="pratique-sportive"]:checked').val();

  if (jsonId) {
    const id = JSON.parse(jsonId);
    updateUtilisateur(
      id,
      pratique_sportive,
      nom_utilisateur,
      email,
      sexe,
      age,
      poids,
      taille
    );
  } else {
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
}

function handleConnexionFormUtilisateur(event) {
  event.preventDefault();

  const email = $('#email-connexion').val();
  const password = $('#password-connexion').val();

  connexionUtilisateur(email, password);
}

async function handleModifierParamUtilisateur() {
  const id = JSON.parse(window.localStorage.getItem('idUserImm'));

  const utilisateur = await paramUtilisateur(id);

  $('.inscription-wrapper #email-inscription').val(utilisateur.EMAIL);
  $('.inscription-wrapper #nom-utilisateur').val(utilisateur.NOM_UTILISATEUR);
  $(
    `.inscription-wrapper input[name="sexe"][value='${utilisateur.SEXE}']`
  ).prop('checked', true);

  $('.inscription-wrapper .form-group.password input').prop('required', false);
  $('.inscription-wrapper .form-group.password').css('display', 'none');

  $('.inscription-wrapper #poids').val(`${utilisateur.POIDS}`);
  $('.inscription-wrapper #taille').val(`${utilisateur.TAILLE}`);
  $('.inscription-wrapper #age').val(`${utilisateur.AGE}`);
  $(
    `.inscription-wrapper input[name="pratique-sportive"][value='${utilisateur.PRA_ID}']`
  ).prop('checked', true);

  $('.inscription-wrapper > h1').text(
    "Modifier les paramètres de l'utilisateur"
  );
  $('.inscription-wrapper input[type="submit"]').val('Modifier');
  $('.inscription-wrapper').css('display', 'flex');
  $('.connexion-wrapper').css('display', 'none');
  $('.parametre-wrapper').css('display', 'none');
  $('.retour').css('display', 'none');
}

$(document).ready(function () {
  const id = window.localStorage.getItem('idUserImm');

  if (id) {
    displayParamUtilisateur(JSON.parse(id));
  } else {
    goBackToLogIn();
  }
});
