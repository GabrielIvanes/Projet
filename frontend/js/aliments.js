const tableAliments = $('#table-aliments').DataTable({
  pageLength: 5,
  lengthChange: false,
});

const serverUrlAliment = `${serverUrl}/aliments`;

async function getAllAliments() {
  try {
    const reponse = await $.ajax({
      url: `${serverUrlAliment}/getAllAliments.php`,
      method: 'GET',
      dataType: 'json',
    });

    return reponse.aliments;
  } catch (err) {
    console.error(err);
  }
}

async function getAllCat() {
  try {
    const reponse = await $.ajax({
      url: `${serverUrlAliment}/getAllCat.php`,
      method: 'GET',
      dataType: 'json',
    });
    return reponse.categories;
  } catch (err) {
    console.error(err);
  }
}

async function createAliment(nom, categorie_id) {
  const data = {
    nom,
    categorie_id,
  };

  try {
    await $.ajax({
      url: `${serverUrlAliment}/createAliment.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });

    $('#nom-aliment').val('');
    $('#categorie-select').val('');
    createTbody();
  } catch (err) {
    console.error(err);
  }
}

async function deleteAliment(id) {
  const data = {
    id_aliment: id,
  };

  try {
    await $.ajax({
      url: `${serverUrlAliment}/deleteAliment.php`,
      method: 'DELETE',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    createTbody();
  } catch (err) {
    console.error(err);
  }
}

async function updateAliment(id, nom, categorie_id) {
  const data = {
    id: id,
    categorie_id: categorie_id,
    nom: nom,
  };

  try {
    await $.ajax({
      url: `${serverUrlAliment}/updateAliment.php`,
      method: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });

    $('.form-group input[type="submit"]').val('Ajouter');
    $('#nom-aliment').val('');
    $('#categorie-select').val('');
    createTbody();
  } catch (err) {
    console.error(err);
  }
}

async function getOneAliment(id) {
  const data = {
    id_aliment: id,
  };

  try {
    const reponse = await $.ajax({
      url: `${serverUrlAliment}/getOneAliment.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    return reponse;
  } catch (err) {
    console.error(err);
  }
}

async function createTbody() {
  tableAliments.clear();

  const aliments = await getAllAliments();
  const categories = await getAllCat();

  await aliments.map(async (aliment) => {
    const catNom = categories.find(
      (categorie) => categorie.id === aliment.categorie_id
    ).nom;

    tableAliments.row.add([
      aliment.id,
      aliment.nom,
      catNom,
      `
        <button onclick="onClickUpdate(event, ${aliment.id});"><i class='fas fa-edit icon'></i></button>
        <button onclick="onClickDelete(event, ${aliment.id});"><i class='fas fa-trash icon'></i></button>`,
    ]);
  });

  tableAliments.draw();
}

async function createOptionsCategories() {
  const select = $(document).find('#categorie-select');
  const categories = await getAllCat();
  if (categories.length > 0) {
    const defaultOption = $('<option>')
      .val('')
      .text('Choisir une catégorie')
      .attr('disabled', 'disabled')
      .attr('selected', 'selected');
    select.append(defaultOption);
    for (const categorie of categories) {
      const option = $('<option>').val(categorie.id).text(categorie.nom);
      select.append(option);
    }
  }
}

function onClickDelete(event, id) {
  event.preventDefault();
  deleteAliment(id);
}

async function onClickUpdate(event, id) {
  event.preventDefault();

  document.cookie = `idUpdateAliment = ${id}`;

  const { _, nom, categorie_id } = await getOneAliment(id);

  $('.form-group input[type="submit"]').val('Modifier');
  $('#nom-aliment').val(nom);
  $('#categorie-select').val(categorie_id);
}

function handleSubmitFormAliment(event) {
  event.preventDefault();

  const nom = $('#nom-aliment').val();
  const categorie_id = $('#categorie-select').val();

  let id = '';

  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === 'idUpdateAliment') {
      id = value;
    }
  }

  if (id !== '') {
    document.cookie = 'idUpdateAliment=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    updateAliment(id, nom, categorie_id);
  } else {
    $(document).find('.form-group input[type="submit"]').text('Ajouter');
    createAliment(nom, categorie_id);
  }
}

$(document).ready(function () {
  createTbody();
  createOptionsCategories();
});
