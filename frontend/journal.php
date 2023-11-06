<?php

require_once('header.php');active_menu('journal');
echo '<div class="main-contenu">';

echo '<div class="journal">';
echo '<h1>Journal</h1>';

echo '<div class="filtres"></div>';
echo' 
  <div class="table-journal-wrapper">
    <table id="table-journal">
        <thead>
            <tr>
                <th>Id</th>
                <th>Aliment</th>
                <th>Catégorie</th>
                <th>Quantité</th>
                <th>Date</th>
                <th>Opérations</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <button onclick="addOneEntree();">Ajouter une entrée</button>
  </div>';    

echo '
<div class="ajout-journal">
    <form action="" id="formJournal" onsubmit="handleSubmitFormJournal(event);">
        <div class="form-group">
            <label for="aliments">Aliment: </label>
            <input  autocomplete="off" id="aliments-input" name="aliments" placeholder="Aliments ..." required>
            <div id="list-aliment"></div>
        </div>
        <div class="form-group">
            <label for="quantite-aliment-journal">Quantité: </label>
            <input type="text" id="quantite-aliment-journal" name="quantite-aliment-journal" placeholder="Quantité ..." required>
        </div>
        <div class="form-group">
            <label for="date-aliment-journal">Date: </label>
            <input type="datetime-local" id="date-aliment-journal" name="date-aliment-journal" required>
        </div>
        <div class="form-group">
            <input type="submit" value="Ajouter">
        </div>
    </form>
    <div class="error-journal"></div>
    <div class="retour" onclick="retourJournal();">Retour</div>
</div>';

echo '</div>';

require_once('footer.php');
?>