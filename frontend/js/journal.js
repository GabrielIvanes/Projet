const serverUrlJournal = `${serverUrl}/journal`;
const tableJournal = $('#table-journal').DataTable({
  pageLength: 5,
  lengthChange: false,
  columns: [
    { data: 'Id' },
    { data: 'Aliment' },
    { data: 'Catégorie' },
    { data: 'Quantité' },
    { data: 'Date' },
    { data: 'Opérations' },
  ],
});

async function createTBodyJournal() {
  tableJournal.clear();
  const journal = await getAllEntreeUtilisateur();
  journal.map((entree) => {
    tableJournal.row.add({
      Id: entree.id,
      Aliment: entree.aliment,
      Catégorie: entree.cat,
      Quantité: entree.quantite,
      Date: add1Hour(entree.date),
      Opérations: `
            <button class="operations" onclick="onClickUpdateJournal(event, ${entree.id});"><i class='fas fa-edit icon'></i></button>
            <button class="operations" onclick="onClickDeleteJournal(event, ${entree.id});"><i class='fas fa-trash icon'></i></button>`,
    });
  });
  tableJournal.draw();
}

function add1Hour(date) {
  date = new Date(date);
  date.setHours(date.getHours() + 1);

  const datePart = convertToEnglishDate(date.toLocaleDateString());
  const heurePart = date.toLocaleTimeString();
  const [heure, minute, _] = heurePart.split(':');

  return `${datePart} ${heure}:${minute}`;
}

function remove1Hour(date) {
  date = new Date(date);
  date.setHours(date.getHours() - 1);

  const datePart = convertToEnglishDate(date.toLocaleDateString());
  const heurePart = date.toLocaleTimeString();
  const [heure, minute, _] = heurePart.split(':');

  return `${datePart} ${heure}:${minute}`;
}

async function getAutocompleteAliment(mot) {
  try {
    const reponse = await $.ajax({
      url: `${serverUrlJournal}/getAutocompleteAliment.php?aliment=${mot}`,
      method: 'GET',
      dataType: 'json',
    });
    return reponse.aliments;
  } catch (err) {
    console.error(err);
  }
}

async function createDivAutocomplete() {
  const input = $('#aliments-input');
  const divAutocomplete = $('#list-aliment');

  divAutocomplete.html('');

  const aliments = await getAutocompleteAliment(input.val());

  if (aliments.length === 0) {
    divAutocomplete.hide();
  } else {
    for (const aliment of aliments) {
      const div = $('<div>')
        .text(aliment.nom)
        .on('click', function (event) {
          choisirAliment(event);
        })
        .attr('data-id', aliment.id)
        .attr('data-cat', aliment.categorie);
      divAutocomplete.append(div);
    }
  }
}

function choisirAliment(event) {
  const aliment = event.target;
  const input = $('#aliments-input');
  input
    .val(aliment.textContent)
    .attr('data-id', aliment.getAttribute('data-id'))
    .attr('data-cat', aliment.getAttribute('data-cat'));
}

function handleSubmitFormJournal(event) {
  event.preventDefault();

  let entreeId = '';

  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === 'idUpdateEntree') {
      entreeId = value;
    }
  }

  const alimentId = $('#aliments-input').attr('data-id');
  const quantite = $('#quantite-aliment-journal').val();
  const date = $('#date-aliment-journal').val();

  if (entreeId !== '') {
    document.cookie = 'idUpdateEntree=; Max-Age=0';
    updateEntreeJournal(entreeId, alimentId, quantite, date);
  } else {
    createEntreeJournal(alimentId, quantite, date);
  }
}

function convertToEnglishDate(dateFr) {
  const [jour, mois, annee] = dateFr.split('/');
  return `${annee}-${mois}-${jour}`;
}

async function getOneEntree(entreeId) {
  const data = {
    entreeId,
  };
  try {
    const reponse = await $.ajax({
      url: `${serverUrlJournal}/getOneEntree.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    return reponse;
  } catch (err) {
    console.error(err);
  }
}

async function onClickUpdateJournal(event, entreeId) {
  event.preventDefault();
  document.cookie = `idUpdateEntree=${entreeId}`;

  const { _, alimentId, alimentNom, quantite, date } = await getOneEntree(
    entreeId
  );

  $('.journal > h1').text('Modifier une entrée');
  $('.journal input[type="submit"]').val('Modifier');

  $('#aliments-input').val(alimentNom);
  $('#aliments-input').attr('data-id', alimentId);
  $('#quantite-aliment-journal').val(quantite);
  $('#date-aliment-journal').val(add1Hour(date));
  changementJournalContenu();
}

async function updateEntreeJournal(entreeId, alimentId, quantite, dateHeure) {
  $('.error-journal').text('');
  if (!isDateBeforeNow(dateHeure)) {
    try {
      const data = {
        entreeId,
        alimentId,
        quantite,
        date: remove1Hour(dateHeure),
      };
      await $.ajax({
        url: `${serverUrlJournal}/updateEntreeJournal.php`,
        method: 'PUT',
        data: JSON.stringify(data),
        contentType: 'application/json',
      });
      $('.journal > h1').text('Journal');
      $('#aliments-input').val('');
      $('#aliments-input').removeAttr('data-id');
      $('#quantite-aliment-journal').val('');
      $('.journal > h1').text('Journal');
      $('#date-aliment-journal').val('');
      createTBodyJournal();
      changementJournalContenu();
    } catch (err) {
      console.error(err);
    }
  } else {
    $('.error-journal').text(
      "Vous ne pouvez pas donner une date ultérieure à aujourd'hui"
    );
  }
}

function onClickDeleteJournal(event, entreeId) {
  event.preventDefault();
  deleteEntreeJournal(entreeId);
}

async function deleteEntreeJournal(entreeId) {
  const data = {
    entreeId,
  };
  try {
    await $.ajax({
      url: `${serverUrlJournal}/deleteEntreeJournal.php`,
      method: 'DELETE',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    createTBodyJournal();
  } catch (err) {
    console.error(err);
  }
}

function isDateBeforeNow(date) {
  const today = new Date();
  const todayDatePart = today.toLocaleDateString();
  const todayDatePartEnglish = convertToEnglishDate(todayDatePart);
  const todayHeurePart = today.toLocaleTimeString();

  date = new Date(date);
  const datePart = date.toLocaleDateString();
  const datePartEnglish = convertToEnglishDate(datePart);
  const heurePart = date.toLocaleTimeString();

  if (
    datePartEnglish < todayDatePartEnglish ||
    (datePart === todayDatePart && heurePart <= todayHeurePart)
  ) {
    return false;
  } else {
    return true;
  }
}

async function createEntreeJournal(alimentId, quantite, dateHeure) {
  $('.error-journal').text('');
  const utilisateurIdJson = window.localStorage.getItem('idUserImm');

  if (!isDateBeforeNow(dateHeure)) {
    if (utilisateurIdJson) {
      const data = {
        utilisateurId: JSON.parse(utilisateurIdJson),
        alimentId,
        quantite,
        date: dateHeure,
      };

      try {
        await $.ajax({
          url: `${serverUrlJournal}/createEntreejournal.php`,
          method: 'POST',
          dataType: 'json',
          data: JSON.stringify(data),
          contentType: 'application/json',
        });
        $('#aliments-input').val('');
        $('#quantite-aliment-journal').val('');
        $('#date-aliment-journal').val('');
        changementJournalContenu();
        createTBodyJournal();
      } catch (err) {
        console.error(err);
      }
    } else {
      $('.error-journal').text("Veuillez d'abord vous connecter");
    }
  } else {
    $('.error-journal').text(
      "Vous ne pouvez pas donner une date ultérieure à aujourd'hui"
    );
  }
}

async function getAllEntreeUtilisateur() {
  try {
    const data = {
      utilisateurId: JSON.parse(window.localStorage.getItem('idUserImm')),
    };

    const reponse = await $.ajax({
      url: `${serverUrlJournal}/getAllEntreeUtilisateur.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    return reponse.journal;
  } catch (err) {
    console.error(err);
  }
}

function retourJournal() {
  document.cookie = 'idUpdateEntree=; Max-Age=0';
  $('.journal > h1').text('Journal');
  $('#aliments-input').val('');
  $('#aliments-input').attr('data-id', '');
  $('#quantite-aliment-journal').val('');
  $('#date-aliment-journal').val('');
  changementJournalContenu();
}

function addOneEntree() {
  $('.journal > h1').text('Ajouter une entrée');
  $('.journal input[type="submit"]').val('Ajouter');
  changementJournalContenu();
}

$(document).ready(function () {
  // const selectedDate = '2023-11';
  // tableJournal.column(3).search(selectedDate, true, false).draw();
  const input = $('#aliments-input');
  const divAutocomplete = $('#list-aliment');
  input.on('input', function () {
    divAutocomplete.show();
    createDivAutocomplete();
  });
  const utilisateurIdJSON = window.localStorage.getItem('idUserImm');
  if (utilisateurIdJSON) {
    createTBodyJournal();
  }
  $(document).on('click', function (event) {
    if (!input.is(event.target) && !divAutocomplete.is(event.target)) {
      divAutocomplete.hide();
    }
  });
});
