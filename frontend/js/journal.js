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
  console.log(journal);
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

function convertToEnglishDateYearAndMonth(dateFr) {
  const [jour, mois, annee] = dateFr.split('/');
  return `${annee}-${mois}`;
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

async function createOptionsCategoriesFiltre() {
  const select = $(document).find('.list-categories-filtre');
  const categories = await getAllCat();
  if (categories.length > 0) {
    const defaultOption = $('<option>')
      .val('')
      .text('Choisir une catégorie')
      .attr('disabled', 'disabled')
      .attr('selected', 'selected');
    select.append(defaultOption);
    for (const categorie of categories) {
      const option = $('<option>')
        .val(categorie.nom)
        .text(categorie.nom)
        .on('click', function () {
          filtreCategorie(categorie.nom);
        });
      select.append(option);
    }
  }
}

function clearActiveFiltre() {
  $('.filtres-date-wrapper > div').removeClass('active-filtre');
}

function filtreDate(filtre, event) {
  clearActiveFiltre();
  event.target.classList.add('active-filtre');
  let selectedDate = '';
  switch (filtre) {
    case 'ajd':
      selectedDate = convertToEnglishDate(new Date().toLocaleDateString());
      tableJournal.column(4).search(selectedDate, true, false).draw();
      break;
    case 'semaine':
      today = new Date();
      const unJourAvant = convertToEnglishDate(
        new Date(today.setDate(today.getDate() - 1)).toLocaleDateString()
      );
      const deuxJourAvant = convertToEnglishDate(
        new Date(today.setDate(today.getDate() - 1)).toLocaleDateString()
      );
      const troisJourAvant = convertToEnglishDate(
        new Date(today.setDate(today.getDate() - 1)).toLocaleDateString()
      );
      const quatreJourAvant = convertToEnglishDate(
        new Date(today.setDate(today.getDate() - 1)).toLocaleDateString()
      );
      const cinqJourAvant = convertToEnglishDate(
        new Date(today.setDate(today.getDate() - 1)).toLocaleDateString()
      );
      const sixJourAvant = convertToEnglishDate(
        new Date(today.setDate(today.getDate() - 1)).toLocaleDateString()
      );
      const septJourAvant = convertToEnglishDate(
        new Date(today.setDate(today.getDate() - 1)).toLocaleDateString()
      );
      today = convertToEnglishDate(new Date().toLocaleDateString());
      tableJournal
        .column(4)
        .search(
          today +
            '|' +
            unJourAvant +
            '|' +
            deuxJourAvant +
            '|' +
            troisJourAvant +
            '|' +
            quatreJourAvant +
            '|' +
            cinqJourAvant +
            '|' +
            sixJourAvant +
            '|' +
            septJourAvant,
          true,
          false
        )
        .draw();
      break;
    case 'mois':
      selectedDate = convertToEnglishDateYearAndMonth(
        new Date().toLocaleDateString()
      );
      tableJournal.column(4).search(selectedDate, true, false).draw();
      break;
    case 'annee':
      selectedDate = new Date().getFullYear();

      tableJournal.column(4).search(selectedDate, true, false).draw();
      break;
    case 'tout':
      tableJournal.column(4).search(selectedDate, true, false).draw();
      break;
  }
}

function filtreCategorie() {
  const catNom = $('.list-categories-filtre').val();
  tableJournal.column(2).search(catNom, true, false).draw();
}

function clearFiltres() {
  clearActiveFiltre();
  tableJournal.column(4).search('', true, false).draw();
  $('.filtres-date-wrapper div:last-child').addClass('active-filtre');
  tableJournal.column(2).search('', true, false).draw();
  $('.list-categories-filtre').val('');
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
  createOptionsCategoriesFiltre();

  $(document).on('click', function (event) {
    if (!input.is(event.target) && !divAutocomplete.is(event.target)) {
      divAutocomplete.hide();
    }
  });
});
