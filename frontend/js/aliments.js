const serverUrlAliment = `${serverUrl}/aliments`;
let tableAliments = '';

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

async function getAllNutriments() {
  try {
    const reponse = await $.ajax({
      url: `${serverUrlAliment}/getAllNutriments.php`,
      method: 'GET',
      dataType: 'json',
    });
    return reponse.nutriments;
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
    const reponse = await $.ajax({
      url: `${serverUrlAliment}/createAliment.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    alimentId = reponse.alimentId;
    $('#nom-aliment').val('');
    $('#categorie-select').val('');
    createRelationAlimentNutriment(alimentId);
  } catch (err) {
    console.error(err);
  }
}

async function createRelationAlimentNutriment(alimentId) {
  const nutriments = await getAllNutriments();

  for (const nutriment of nutriments) {
    let nutrimentInput = '';
    if (nutriment.nom === 'Protéines') {
      nutrimentInput = $('#proteines-aliment');
    } else {
      nutrimentInput = $(`#${nutriment.nom.toLowerCase()}-aliment`);
    }
    if (nutrimentInput.val()) {
      const data = {
        alimentId: alimentId,
        nutrimentId: nutriment.id,
        quantite: nutrimentInput.val(),
      };

      try {
        await $.ajax({
          url: `${serverUrlAliment}/createRelationAlimentNutriment.php`,
          method: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
        });
        nutrimentInput.val('');
        changementAlimentContenu();
      } catch (err) {
        console.error(err);
      }
    }
  }
  createTBody();
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
    createTBody();
  } catch (err) {
    console.error(err);
  }
}

async function deleteNutrimentsAliment(alimentId) {
  const data = {
    alimentId,
  };
  try {
    await $.ajax({
      url: `${serverUrlAliment}/deleteNutrimentsAliment.php`,
      method: 'DELETE',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
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
    updateRelationAlimentNutriment(id);
  } catch (err) {
    console.error(err);
  }
}

async function updateRelationAlimentNutriment(alimentId) {
  const nutriments = await getAllNutriments();

  for (const nutriment of nutriments) {
    let nutrimentInput = '';
    if (nutriment.nom === 'Protéines') {
      nutrimentInput = $('#proteines-aliment');
    } else {
      nutrimentInput = $(`#${nutriment.nom.toLowerCase()}-aliment`);
    }
    if (nutrimentInput.val()) {
      const nutrimentsAliment = await getNutrimentsAliment(alimentId);
      let isExisting = false;
      if (nutrimentsAliment) {
        if (
          nutrimentsAliment.find(
            (nutrimentAliment) => nutrimentAliment.nutrimentId === nutriment.id
          )
        )
          isExisting = true;
      }

      const data = {
        alimentId: alimentId,
        nutrimentId: nutriment.id,
        quantite: nutrimentInput.val(),
      };
      try {
        const reponse = await $.ajax({
          url: `${serverUrlAliment}/${
            isExisting ? 'update' : 'create'
          }RelationAlimentNutriment.php`,
          method: 'PUT',
          data: JSON.stringify(data),
          contentType: 'application/json',
        });
        console.log(reponse);
        nutrimentInput.val('');
      } catch (err) {
        console.error(err);
      }
    }
  }
  $('.aliments .form-group input[type="submit"]').val('Ajouter');
  $('#nom-aliment').val('');
  $('#categorie-select').val('');
  createTBody();
  changementAlimentContenu();
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

async function getNutrimentsAliment(alimentId) {
  const data = {
    alimentId,
  };
  try {
    const reponse = await $.ajax({
      url: `${serverUrlAliment}/getNutrimentsAliment.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    return reponse.contient;
  } catch (err) {
    console.error(err);
  }
}

// async function addOneElementTBody(alimentId) {
//   const aliment = await getOneAliment(alimentId);
//   const nutriments = await getAllNutriments();
//   const nutrimentsOfAliment = await getNutrimentsAliment(alimentId);

//   const nutrimentsCol = await Promise.all(
//     nutriments.map(async (nutriment) => {
//       if (nutrimentsOfAliment) {
//         const nutrimentOfAliment = nutrimentsOfAliment.find(
//           (nutrimentOfAliment) =>
//             nutrimentOfAliment.nutrimentId === nutriment.id
//         );
//         return nutrimentOfAliment ? nutrimentOfAliment.quantite : '';
//       } else {
//         return '';
//       }
//     })
//   );

//   tableAliments.rows.add([
//     aliment.id,
//     aliment.nom,
//     catNom,
//     ...nutrimentsCol,
//     `
//         <button onclick="onClickUpdateAliment(event, ${aliment.id});"><i class='fas fa-edit icon'></i></button>
//         <button onclick="onClickDeleteAliment(event, ${aliment.id});"><i class='fas fa-trash icon'></i></button>`,
//   ]);

//   tableAliments.draw();
// }

async function createTBody() {
  if (tableAliments === '') {
    await createHeadOfTable();

    tableAliments = $('#table-aliments').DataTable({
      pageLength: 5,
      lengthChange: false,
    });
  }

  tableAliments.clear();

  try {
    const aliments = await getAllAliments();
    const categories = await getAllCat();
    const nutriments = await getAllNutriments();

    const rows = await Promise.all(
      aliments.map(async (aliment) => {
        const catNom = categories.find(
          (categorie) => categorie.id === aliment.categorie_id
        ).nom;

        const nutrimentsOfAliment = await getNutrimentsAliment(aliment.id);

        const nutrimentsCol = await Promise.all(
          nutriments.map(async (nutriment) => {
            if (nutrimentsOfAliment) {
              const nutrimentOfAliment = nutrimentsOfAliment.find(
                (nutrimentOfAliment) =>
                  nutrimentOfAliment.nutrimentId === nutriment.id
              );
              return nutrimentOfAliment ? nutrimentOfAliment.quantite : '';
            } else {
              return '';
            }
          })
        );

        return [
          aliment.id,
          aliment.nom,
          catNom,
          ...nutrimentsCol,
          `
            <button class="operations" onclick="onClickUpdateAliment(event, ${aliment.id});"><i class='fas fa-edit icon'></i></button>
            <button class="operations" onclick="onClickDeleteAliment(event, ${aliment.id});"><i class='fas fa-trash icon'></i></button>`,
        ];
      })
    );

    tableAliments.rows.add(rows).draw();
  } catch (error) {
    console.error(error);
  }
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

async function createHeadOfTable() {
  const nutriments = await getAllNutriments();

  const thead = $('#table-aliments thead tr');

  for (const nutriment of nutriments) {
    const th = $('<th>').text(nutriment.nom);
    thead.append(th);
  }

  const th = $('<th>').text('Opérations');
  thead.append(th);
}

function onClickDeleteAliment(event, id) {
  event.preventDefault();
  $('.verification-suppression-aliment').css('display', 'flex');
  $('.table-wrapper').css('display', 'none');
  document.cookie = `alimentIdDelete=${id}`;
}

async function handleVerificationDeleteAliment(verification) {
  const cookies = document.cookie.split(';');
  let alimentId = '';

  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === 'alimentIdDelete') {
      alimentId = value;
    }
  }
  document.cookie = 'alimentIdDelete=; Max-Age=0';
  if (verification === 'valider') {
    await deleteEntreesAliment(alimentId);
    await deleteNutrimentsAliment(alimentId);
    await deleteAliment(alimentId);
  }
  $('.verification-suppression-aliment').css('display', 'none');
  $('.table-wrapper').css('display', 'flex');
}

async function onClickUpdateAliment(event, id) {
  event.preventDefault();

  document.cookie = `idUpdateAliment=${id}`;

  const { _, nom, categorie_id } = await getOneAliment(id);

  const nutriments = await getAllNutriments();

  for (const nutriment of nutriments) {
    const nutrimentsAliment = await getNutrimentsAliment(id);

    if (nutrimentsAliment) {
      const nutrimentAliment = nutrimentsAliment.find(
        (nutrimentOfAliment) => nutrimentOfAliment.nutrimentId === nutriment.id
      );

      if (nutrimentAliment) {
        if (nutriment.nom === 'Protéines') {
          $('#proteines-aliment').val(nutrimentAliment.quantite);
        } else {
          $(`#${nutriment.nom.toLowerCase()}-aliment`).val(
            nutrimentAliment.quantite
          );
        }
      }
    }
  }
  $('.aliments h2').text('Modifier un aliment');
  $('.aliments .form-group input[type="submit"]').val('Modifier');
  $('#nom-aliment').val(nom);
  $('#categorie-select').val(categorie_id);
  changementAlimentContenu();
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
    document.cookie = 'idUpdateAliment=; Max-Age=0';
    updateAliment(id, nom, categorie_id);
  } else {
    createAliment(nom, categorie_id);
  }
}

async function retour() {
  document.cookie = 'idUpdateAliment=; Max-Age=0';

  const nutriments = await getAllNutriments();
  for (const nutriment of nutriments) {
    let nutrimentInput = '';
    if (nutriment.nom === 'Protéines') {
      nutrimentInput = $('#proteines-aliment');
    } else {
      nutrimentInput = $(`#${nutriment.nom.toLowerCase()}-aliment`);
    }
    nutrimentInput.val('');
  }
  $('#nom-aliment').val('');
  $('#categorie-select').val('');
  changementAlimentContenu();
}

function handleAllAlimentButton() {
  $('.aliments h2').text('Ajouter un aliment');
  $(document)
    .find('.aliments .form-group input[type="submit"]')
    .text('Ajouter');
  changementAlimentContenu();
}

$(document).ready(function () {
  createTBody();
  createOptionsCategories();
});
