async function getBesoinEnergetiqueJournalier(idJSON) {
  if (idJSON) {
    const id = JSON.parse(idJSON);
    const utilisateur = await paramUtilisateur(id);
    let besoinEnergetiqueJournalier = 0;
    if (parseInt(utilisateur.SEXE) === 0) {
      besoinEnergetiqueJournalier =
        66 +
        13.7 * utilisateur.POIDS +
        5 * utilisateur.TAILLE -
        6.5 * utilisateur.AGE;
    } else {
      besoinEnergetiqueJournalier =
        655 +
        9.6 * utilisateur.POIDS +
        1.8 * utilisateur.TAILLE -
        4.7 * utilisateur.AGE;
    }

    switch (utilisateur.PRA_ID) {
      case 1:
        besoinEnergetiqueJournalier *= 1.2;
        break;
      case 2:
        besoinEnergetiqueJournalier *= 1.4;
        break;
      case 3:
        besoinEnergetiqueJournalier *= 1.6;
        break;
      case 4:
        besoinEnergetiqueJournalier *= 1.8;
        break;
    }
    return besoinEnergetiqueJournalier;
  }
}

$(document).ready(async function () {
  const idJSON = window.localStorage.getItem('idUserImm');
  if (idJSON) {
    const besoinEnergetiqueJournalier = await getBesoinEnergetiqueJournalier(
      idJSON
    );
    const div = $('.besoin-energetique-journalier');
    div.text(`${besoinEnergetiqueJournalier.toFixed(1)} kcal`);
  }
});
