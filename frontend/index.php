<?php

require_once('header.php');active_menu('index');
echo '<div class="main-contenu">';
echo '<div class="dashboard">';
    echo '<h1>Dashboard</h1>';
    echo '

    <div class="grid-container">
        <div class="grid-item indicateur">
            <span>Energies</span>
            <div id="energie-chart"></div>
             <span>En kcal / jour</span>
        </div>
        <div class="grid-item indicateur">
            <span>Fruits & légumes</span>
            <div id="fruit-legume-chart"></div>
            <span>Par jour</span>
        </div>
        <div class="grid-item indicateur">
            <span>Produits laitiers</span>
            <div id="produit-laitier-chart"></div>
            <span>Par jour</span>
        </div>
        <div class="grid-item grand filtre">
            <div>Filtre des diagrammes circulaires: </div>
            <form action="" id="filtre-date-camemberts-form" onsubmit="handleFilterDate(event);">
                <input type="date" id="filtre-date-camemberts"/>
                <input type="submit" value="Filtrer"/>
            </form>
        </div>
        <div class="grid-item indicateur">
            <span>Viande, œufs et produits de la pêche</span>
            <div id="viande-oeuf-peche-chart"></div>
            <span>Par jour</span>
        </div>
        <div class="grid-item indicateur">
            <span>Consommation de sel</span>
            <div id="sel-chart"></div>
            <span>En g / jour</span>
        </div>
        <div class="grid-item indicateur">
            <span>Consommation d\'eau</span>
            <div id="eau-chart"></div>
            <span>En mL / jour</span>
        </div>
        <div class="grid-item grand">
            <div>5 conseils pour un mode de vie plus équilibré: </div>
            <ul>
                <li>Des féculents (céréales et légumineuses) à chaque repas</li>
                <li>De l\'eau à volonté</li>
                <li>Limiter sa consommation de sucre</li>
                <li>Limiter sa consommation de matières grasses</li>
                <li>Au moins l’équivalent de 30 minutes de marche rapide par jour</li>
            </ul>
        </div>
    </div>
    <div class="grid-container-bottom">
        <div class="grid-item recap">
            <div>Récapitulatif des 3 derniers jours</div>
            <div class="filtres-recap">
            </div>
            <hr />
            <div class="grid">
            </div>
        </div>
        <div class="grid-item line-graph">
            <div class="filtres-line-graph"></div>
            <div id="graph-container"></div>
        </div>
    </div>
    
    ';

    echo '<div class="spinner">
    <img src="./imgs/spinner.svg" alt="spinner">
    </div>';


echo '</div>';

require_once('footer.php');
?>