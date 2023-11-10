<?php
require_once('header.php');active_menu('aliments');
echo '<div class="main-contenu">';

echo '<div class="aliments">';
echo '<h1>Aliments</h1>';
 echo' 
  <div class="display table-wrapper">
    <table id="table-aliments">
        <thead>
            <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Catégorie</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <button onclick="handleAllAlimentButton();">Ajouter un aliment</button>
  </div>
    <div class="ajout-aliment">
        <h2>Ajouter un aliment</h2>
        <form action="" id="formAddAliment" onsubmit="handleSubmitFormAliment(event);">
            <div class="form-group">
                <label for="nom">Nom: </label>
                <input type="text" id="nom-aliment" name="nom" placeholder="Nom de l\'aliment ..." maxLength="35" required>
            </div>
            <div class="form-group" id="categorie">
                <label for="categorie">Catégorie: </label>
                <select name="categorie" id="categorie-select" required>
                </select>
            </div>
            <div class="form-group isLiquide-form">
                <div for="isLiquide">Aliment liquide: </div>
                <input type="checkbox" id="isLiquide-aliment" name="isLiquide">
            </div>
            <div class="form-group-row">
                <div class="form-group">
                    <label for="energie">Energie (en kcal): </label>
                    <input type="text" id="energie-aliment" name="energie" placeholder="pour 100 g" maxLength="5" pattern="^\d+(\.\d+)?$">
                </div>
                <div class="form-group">
                    <label for="gras">Gras (en g): </label>
                    <input type="text" id="gras-aliment" name="gras" placeholder="pour 100 g" maxLength="5" pattern="^\d+(\.\d+)?$">
                </div>
            </div>
            <div class="form-group-row">
                <div class="form-group">
                    <label for="sucre">Sucre (en g): </label>
                    <input type="text" id="sucres-aliment" name="sucre" placeholder="pour 100 g" maxLength="5" pattern="^\d+(\.\d+)?$">
                </div>
                <div class="form-group">
                    <label for="sel">Sel (en g): </label>
                    <input type="text" id="sel-aliment" name="sel" placeholder="pour 100 g" maxLength="5" pattern="^\d+(\.\d+)?$">
                </div>
            </div>
            <div class="form-group-row">
                <div class="form-group">
                    <label for="fibre">Fibres (en g): </label>
                    <input type="text" id="fibres-aliment" name="fibre" placeholder="pour 100 g" maxLength="5" pattern="^\d+(\.\d+)?$">
                </div>
                <div class="form-group">
                    <label for="proteines">Protéines (en g): </label>
                    <input type="text" id="proteines-aliment" name="proteines" placeholder="pour 100 g" maxLength="5" pattern="^\d+(\.\d+)?$">
                </div>
            </div>
            <div class="form-group">
                <label for=fer">Fer (en g): </label>
                <input type="text" id="fer-aliment" name="fer" placeholder="pour 100 g" maxLength="5" pattern="^\d+(\.\d+)?$">
            </div>
            <div class="form-group">
                <input type="submit" value="Ajouter">
            </div>
        </form>
        <div class="retour" onclick="retour();">Retour</div>
  </div>

   <div class="verification-suppression-aliment">
    <div>Êtes vous sûr de vous supprimer cet aliment ?<br/>Cela entraînera la suppression des entrées du journal comportant cet aliment.</div>
   <div>
        <button class="annuler-suppression-aliment" onclick="handleVerificationDeleteAliment(\'annuler\');">Annuler</button>
        <button class="valider-suppression-aliment" onclick="handleVerificationDeleteAliment(\'valider\');">Je suis sûr</button>
    </div>
    </div>
  
  
</div>
';

require_once('footer.php');
?>