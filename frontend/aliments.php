<?php

require_once('header.php');active_menu('aliments');
echo '<div class="main-contenu">';

echo '<div class="aliments">';
echo '<h1>Aliments</h1>';
 echo' 
  <table id="table-aliments">
      <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nom</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Opérations</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
  </table>
  <div class="ajout-aliment">
    <h2>Ajouter un aliment</h2>
    <form action="" id="formAddAliment" onsubmit="handleSubmitFormAliment(event);">
        <div class="form-group">
            <label for="nom">Nom: </label>
            <input type="text" id="nom-aliment" name="nom" placeholder="Nom de l\'aliment ..." required>
        </div>
        <div class="form-group" id="categorie">
            <label for="categorie">Catégorie: </label>
            <select name="categorie" id="categorie-select" required>
            </select>
        </div>
        <div class="form-group">
            <input type="submit" value="Ajouter">
        </div>
    </form>
  </div>
  
</div>
';

require_once('footer.php');
?>