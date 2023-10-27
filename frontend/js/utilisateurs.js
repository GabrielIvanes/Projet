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
    console.log(err.responseText);
    if (err.responseText.includes("pour la clef 'utilisateur.EMAIL_IX'")) {
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

    const response = await $.ajax({
      url: `${serverUrlUser}/connexionUtilisateur.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });

    console.log(response);
  } catch (err) {
    console.error(err);
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
