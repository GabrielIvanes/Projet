function creationPieChart(total, accompli, pieChartBalise) {
  const pourcentageAccompli = (accompli / total) * 100;
  const pourcentageRestant = 100 - pourcentageAccompli;

  let color = '';
  if (pieChartBalise !== 'viande-oeuf-peche-chart') {
    if (pourcentageAccompli <= 34) {
      if (pieChartBalise === 'sel-chart') color = '#34a853';
      else color = '#d3212c';
    } else if (pourcentageAccompli > 34 && pourcentageAccompli <= 67)
      color = '#ff980e';
    else {
      if (pieChartBalise === 'sel-chart') color = '#d3212c';
      else color = '#34a853';
    }
  } else {
    if (pourcentageAccompli <= 25) {
      color = '#d3212c';
    } else if (pourcentageAccompli > 25 && pourcentageAccompli <= 50) {
      color = '#ff980e';
    } else color = '#34a853';
  }

  const width = 230;
  const height = 55;
  const radius = Math.min(width, height) / 2;

  // Créez un élément SVG pour le graphique camembert
  const svg = d3
    .select(`#${pieChartBalise}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Créez un groupe (g) pour le graphique camembert
  const g = svg
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  // Définissez les couleurs pour le camembert (accompli et restant)
  const colors = d3.scaleOrdinal([color, '#e0e0e0']);

  // Données pour le graphique camembert
  const data = [
    { label: 'Accompli', value: pourcentageAccompli },
    { label: 'Restant', value: pourcentageRestant },
  ];

  // Créez un arc pour chaque portion du graphique camembert
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  // Créez un "g" pour chaque portion du graphique
  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.value);

  const path = g
    .selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', (d) => colors(d.data.label));

  g.append('circle')
    .attr('r', radius * 0.75) // Ajustez la taille du cercle central selon vos besoins
    .attr('fill', 'white');
  // Ajoutez un texte au centre du graphique pour afficher le pourcentage accompli
  g.append('text')
    // .text(`${pourcentageAccompli.toFixed(1)}%`)
    .text(
      pieChartBalise === 'energie-chart'
        ? `${accompli}`
        : `${accompli}/${total}`
    )
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('fill', 'black');
}

function createLineChart(data) {
  // Sélectionnez la div graph-container où vous voulez afficher le graphique.
  const container = d3.select('#graph-container');

  // Créez un tableau contenant les noms uniques de nutriments pour générer une ligne par nutriment.
  const nutriments = [...new Set(data.map((d) => d.NUTRIMENT_NOM))];

  // Créez une échelle de couleurs pour les différentes lignes du graphique.
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  // Créez un SVG pour le graphique avec des marges et des dimensions.
  const margin = { top: 10, right: 40, bottom: 20, left: 70 };
  const width = 800;
  const height = 240;

  const svg = container
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'line-chart')
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Créez une échelle pour l'axe des X (mois).
  const xScale = d3
    .scalePoint()
    .domain(data.map((d) => d.MOIS))
    .range([0, width]);

  // Créez une échelle pour l'axe des Y (quantité de nutriment).
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => +d.QUANTITE)])
    .nice()
    .range([height, 0]);

  // Créez un axe des X.
  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // Créez un axe des Y.
  svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

  svg
    .select('.x-axis')
    .selectAll('path')
    .style('stroke', 'black')
    .style('stroke-width', 1);
  svg
    .select('.y-axis')
    .selectAll('path')
    .style('stroke', 'black')
    .style('stroke-width', 1);

  // Ajoutez l'étiquette de l'axe Y en dehors de la boucle.
  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '20px') // Ajustez cette valeur pour décaler vers la gauche
    .style('text-anchor', 'middle')
    .text('Nutriments (en g)');

  // Créez une ligne pour chaque nutriment.
  const line = d3
    .line()
    .x((d) => xScale(d.MOIS))
    .y((d) => yScale(d.QUANTITE));

  nutriments.forEach((nutriment, index) => {
    const nutrimentData = data.filter((d) => d.NUTRIMENT_NOM === nutriment);

    svg
      .append('path')
      .datum(nutrimentData)
      .attr('class', 'line')
      .attr('d', line)
      .style('stroke', colorScale(index))
      .style('stroke-width', 2)
      .style('fill', 'none');
  });

  const legendGroup = svg
    .append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width - 100}, 20)`); // Ajustez la position de la légende

  // Créez un groupe pour chaque nutriment et ajoutez un cercle coloré et du texte
  nutriments.forEach((nutriment, index) => {
    const yOffset = index * 20; // Ajustez la séparation entre les éléments de la légende
    const color = colorScale(index); // Obtenez la couleur associée au nutriment

    legendGroup
      .append('circle')
      .attr('cx', 0)
      .attr('cy', yOffset)
      .attr('r', 5) // Ajustez la taille du cercle
      .style('fill', color);

    legendGroup
      .append('text')
      .attr('x', 15) // Ajustez la position du texte par rapport au cercle
      .attr('y', yOffset)
      .text(nutriment);
  });
}

async function getAllEntreeParDate(utilisateurId, date) {
  try {
    const data = {
      utilisateurId,
      date,
    };
    const reponse = await $.ajax({
      url: `${serverUrlJournal}/getAllEntreeUtilisateurJour.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    return reponse.journal;
  } catch (err) {
    console.error(err);
  }
}

async function getQuantiteNutrimentAliment(nutrimentId, alimentId) {
  try {
    const data = {
      alimentId,
      nutrimentId,
    };
    const reponse = await $.ajax({
      url: `${serverUrlAliment}/getQuantiteNutrimentAliment.php`,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    return reponse.quantite;
  } catch (err) {
    console.error(err);
    return 0;
  }
}

// Date peut être un jour comme un mois ou une année
async function getQuantiteNutrimentParDate(utilisateurId, nutrimentId, date) {
  let totalQuantiteNutriment = 0;
  const entreesParDate = await getAllEntreeParDate(utilisateurId, date);
  if (entreesParDate !== undefined && entreesParDate.length > 0) {
    for (const entree of entreesParDate) {
      console.log(entree);
      const quantiteNutrimentAliment = await getQuantiteNutrimentAliment(
        nutrimentId,
        entree.alimentId
      );
      console.log(quantiteNutrimentAliment);
      console.log(typeof quantiteNutrimentAliment);
      console.log(entree.quantite);
      console.log(typeof entree.quantite);

      totalQuantiteNutriment +=
        (parseFloat(entree.quantite) * parseFloat(quantiteNutrimentAliment)) /
        100;
      console.log(totalQuantiteNutriment);
    }

    return totalQuantiteNutriment;
  } else {
    return 0;
  }
}

async function getQuantiteCategorieParDate(utilisateurId, categorieId, date) {
  let totalQuantiteCategorie = 0;
  const entreesParDate = await getAllEntreeParDate(utilisateurId, date);
  console.log(entreesParDate);
  if (entreesParDate !== undefined && entreesParDate.length > 0) {
    for (const entree of entreesParDate) {
      console.log(entree);
      const aliment = await getOneAliment(entree.alimentId);
      console.log(aliment);
      console.log(aliment.categorie_id);
      console.log(typeof aliment.categorie_id);
      console.log(categorieId);
      console.log(typeof categorieId);
      console.log(entree.quantite);
      console.log(typeof entree.quantite);
      if (aliment.categorie_id === categorieId) {
        totalQuantiteCategorie += parseFloat(entree.quantite);
      }
      console.log(totalQuantiteCategorie);
    }
    return totalQuantiteCategorie;
  } else {
    return 0;
  }
}

function getNomMois(numeroMois) {
  const date = new Date(2000, numeroMois - 1, 1);
  return date.toLocaleString('fr-FR', { month: 'long' });
}

// Permet de modifier les valeurs ainsi que le filtre actif du graphique en ligne
function handleClickYearFilter(event) {
  const year = parseInt(event.target.textContent);
  const utilisateurId = JSON.parse(window.localStorage.getItem('idUserImm'));

  createAllChart(utilisateurId, year);
}

// Permet de modifier les valeurs ainsi que le filtre actif du recap
function handleClickDateFilter(event) {
  const date = event.target.textContent;
  const year = new Date().getFullYear();
  const utilisateurId = JSON.parse(window.localStorage.getItem('idUserImm'));
  createDivRecap(utilisateurId, `${year}-${date}`);
}

// Permet de créer la div grid avec le recap des nutriments
async function createDivRecap(utilisateurId, date) {
  const filtresDateRecap = $('.filtres-recap');
  filtresDateRecap.html('');
  $('.grid-item.recap .grid').html('');
  console.log(date);
  const dateToday = new Date();
  // Construction des filtres pour le récap
  for (let i = 2; i >= 0; i--) {
    const dateRecap = new Date(dateToday);

    dateRecap.setDate(dateToday.getDate() - i);

    const day = String(dateRecap.getDate()).padStart(2, '0');
    const month = String(dateRecap.getMonth() + 1).padStart(2, '0');

    const div = $('<div>')
      .text(`${month}-${day}`)
      .on('click', function (event) {
        handleClickDateFilter(event);
      });

    if (convertToEnglishDate(dateRecap.toLocaleDateString()) === date) {
      div.addClass('active-recap');
    }

    filtresDateRecap.append(div);
  }

  const nutriments = await getAllNutriments();
  const divRecap = $('.grid-item.recap .grid');
  for (const nutriment of nutriments) {
    const divLabel = $('<div>').text(nutriment.nom);
    const quantiteNutrimentParJour = await getQuantiteNutrimentParDate(
      utilisateurId,
      nutriment.id,
      date
    );
    const divValeur = $('<div>').text(quantiteNutrimentParJour.toFixed(1));
    if (nutriment.nom === 'Energie') {
      divValeur.addClass('val-kcal');
    } else {
      divValeur.addClass('val-g');
    }
    divRecap.append(divLabel);
    divRecap.append(divValeur);
  }
}

// Permet de créer tous les graphiques du tableau de bord avec un spinner pendant la création
async function createAllChart(utilisateurId, anneeChoisie) {
  const energie = await getBesoinEnergetiqueJournalier();

  $('.dashboard .spinner').css('display', 'flex');
  $('.dashboard .grid-container').css('display', 'none');
  $('.dashboard .grid-container-bottom').css('display', 'none');

  const data = [];

  const year = new Date().getFullYear();

  const today = convertToEnglishDate(new Date().toLocaleDateString());

  const filtresNutrimentsGraph = $('.filtres-line-graph');

  // Reset des graphiques et des filtres
  filtresNutrimentsGraph.html('');
  $('#energie-chart').html('');
  $('#fruit-legume-chart').html('');
  $('#produit-laitier-chart').html('');
  $('#viande-oeuf-peche-chart').html('');
  $('#sel-chart').html('');
  $('#eau-chart').html('');
  $('#graph-container').text('');

  // Construction des filtres pour le graphique en ligne
  for (let i = parseInt(year - 2); i <= parseInt(year); i++) {
    const div = $('<div>')
      .text(i)
      .on('click', function (event) {
        handleClickYearFilter(event);
      });
    if (i === anneeChoisie) {
      div.addClass('active-year');
    }
    filtresNutrimentsGraph.append(div);
  }

  for (let i = 1; i <= 12; i++) {
    const mois = i < 10 ? `0${i}` : `${i}`;
    const date = `${anneeChoisie}-${mois}`;
    const entreeDate = await getAllEntreeParDate(utilisateurId, date);
    if (entreeDate !== undefined) {
      const nutriments = await getAllNutriments();
      for (const nutriment of nutriments) {
        if (nutriment.nom !== 'Energie') {
          const quantiteNutrimentParMois = await getQuantiteNutrimentParDate(
            utilisateurId,
            nutriment.id,
            date
          );
          const dataObject = {
            NUTRIMENT_NOM: nutriment.nom,
            MOIS: getNomMois(parseInt(mois)),
            QUANTITE: quantiteNutrimentParMois.toFixed(2),
          };
          data.push(dataObject);
        }
      }
    }
  }

  let nutrimentSelId = 0;
  let nutrimentEnergieId = 0;

  const nutriments = await getAllNutriments();

  for (const nutriment of nutriments) {
    switch (nutriment.nom) {
      case 'Sel':
        nutrimentSelId = nutriment.id;
        break;
      case 'Energie':
        nutrimentEnergieId = nutriment.id;
        break;
    }
  }

  // Sel

  const quantiteSelJour = await getQuantiteNutrimentParDate(
    utilisateurId,
    nutrimentSelId,
    today
  );

  // Energie

  const quantiteEnergieJour = await getQuantiteNutrimentParDate(
    utilisateurId,
    nutrimentEnergieId,
    today
  );

  // Fruits - Légumes

  let categorieFruitId = 0;
  let categorieLegumeId = 0;

  let categorieFromageId = 0;
  let categorieLaitId = 0;
  let categorieYahourtId = 0;

  let categorieViandeId = 0;
  let categorieVolailleId = 0;
  let categorieOeufId = 0;
  let categoriePoissonId = 0;

  let categorieEauId = 0;

  const categories = await getAllCat();

  for (const categorie of categories) {
    switch (categorie.nom) {
      case 'Fruits':
        categorieFruitId = categorie.id;
        break;
      case 'Légumes':
        categorieLegumeId = categorie.id;
        break;
      case 'Fromages':
        categorieFromageId = categorie.id;
        break;
      case 'Lait':
        categorieLaitId = categorie.id;
        break;
      case 'Yahourts':
        categorieYahourtId = categorie.id;
        break;
      case 'Viandes hors volailles':
        categorieViandeId = categorie.id;
        break;
      case 'Volailles':
        categorieVolailleId = categorie.id;
        break;
      case 'Oeufs':
        categorieOeufId = categorie.id;
        break;
      case 'Poissons':
        categoriePoissonId = categorie.id;
        break;
      case 'Eau':
        categorieEauId = categorie.id;
        break;
    }
  }

  const quantiteLegumeJour = await getQuantiteCategorieParDate(
    utilisateurId,
    categorieFruitId,
    today
  );
  const quantiteFruitJour = await getQuantiteCategorieParDate(
    utilisateurId,
    categorieLegumeId,
    today
  );
  const quantiteFruitLegumeJour = (
    (quantiteLegumeJour + quantiteFruitJour) /
    90
  ).toFixed(1);
  // https://www.mangerbouger.fr/l-essentiel/les-recommandations-sur-l-alimentation-l-activite-physique-et-la-sedentarite/augmenter/augmenter-les-fruits-et-legumes

  // // Produits laitiers

  const quantiteFromageJour = await getQuantiteCategorieParDate(
    utilisateurId,
    categorieFromageId,
    today
  );
  const quantiteLaitJour = await getQuantiteCategorieParDate(
    utilisateurId,
    categorieLaitId,
    today
  );
  const quantiteYahourtJour = await getQuantiteCategorieParDate(
    utilisateurId,
    categorieYahourtId,
    today
  );

  const quantiteProduitLaitierJour = (
    quantiteFromageJour / 30 +
    quantiteLaitJour / 150 +
    quantiteYahourtJour / 125
  ).toFixed(1);
  // https://www.ameli.fr/assure/sante/themes/alimentation-adulte/alimentation-adulte-types-aliments/produits-laitiers

  // Viandes - Oeufs - Poissons

  const quantiteViandeJour = await getQuantiteCategorieParDate(
    utilisateurId,
    categorieViandeId,
    today
  );
  const quantiteVolailleJour = await getQuantiteCategorieParDate(
    utilisateurId,
    categorieVolailleId,
    today
  );
  const quantiteOeufJour = await getQuantiteCategorieParDate(
    utilisateurId,
    categorieOeufId,
    today
  );
  const quantitePecheJour = await getQuantiteCategorieParDate(
    utilisateurId,
    categoriePoissonId,
    today
  );
  const quantiteViandeOeufPecheJour = (
    (quantiteViandeJour + quantiteVolailleJour) / 125 +
    quantiteOeufJour / 52.5 +
    quantitePecheJour / 100
  ).toFixed(1);

  // Eau
  const quantiteEauJour = await getQuantiteCategorieParDate(
    utilisateurId,
    categorieEauId,
    today
  );
  console.log(today);
  console.log(quantiteEauJour);
  console.log(quantiteFruitLegumeJour);
  console.log(quantiteProduitLaitierJour);
  console.log(quantiteViandeOeufPecheJour);

  creationPieChart(
    energie.toFixed(1),
    quantiteEnergieJour.toFixed(1),
    'energie-chart'
  );

  const utilisateur = await paramUtilisateur(utilisateurId);

  creationPieChart(5, quantiteFruitLegumeJour, 'fruit-legume-chart'); // https://www.mangerbouger.fr/l-essentiel/les-recommandations-sur-l-alimentation-l-activite-physique-et-la-sedentarite/augmenter/augmenter-les-fruits-et-legumes
  creationPieChart(
    parseInt(utilisateur.AGE) < 18 ? 3 : 2,
    quantiteProduitLaitierJour,
    'produit-laitier-chart'
  ); // https://www.mangerbouger.fr/l-essentiel/les-recommandations-sur-l-alimentation-l-activite-physique-et-la-sedentarite/aller-vers/aller-vers-une-consommation-de-produits-laitiers-suffisante-mais-limitee
  creationPieChart(2, quantiteViandeOeufPecheJour, 'viande-oeuf-peche-chart');
  creationPieChart(5, quantiteSelJour.toFixed(1), 'sel-chart'); // https://www.mangerbouger.fr/l-essentiel/les-recommandations-sur-l-alimentation-l-activite-physique-et-la-sedentarite/reduire/reduire-les-produits-sales-et-le-sel
  creationPieChart(1500, quantiteEauJour, 'eau-chart');

  createDivRecap(utilisateurId, today);

  $('.dashboard .spinner').css('display', 'none');
  $('.dashboard .grid-container').css('display', 'grid');
  $('.dashboard .grid-container-bottom').css('display', 'grid');
  if (data.length !== 0) createLineChart(data);
  else
    $('#graph-container').text(`Pas de données pour l'année ${anneeChoisie}`);
}

$(document).ready(async function () {
  const utilisateurIdJSON = window.localStorage.getItem('idUserImm');
  if (utilisateurIdJSON) {
    const year = new Date().getFullYear();
    const utilisateurId = JSON.parse(utilisateurIdJSON);
    createAllChart(utilisateurId, year);
  }
});
