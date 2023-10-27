<?php

function active_menu($currentPageId) {

    $myMenu = array(
        'index' => '<i class="fa-solid fa-chart-line"></i>Tableau de bord',
        'journal' => '<i class="fa-solid fa-scroll"></i>Journal',
        'aliments' => '<i class="fa-solid fa-utensils"></i>Aliments',
        'profil' => '<i class="fa-regular fa-user"></i>Profil'
    );

    echo '
    <nav class="side-bar">
        <h1>IMangerMieux</h1>
        <ul>
        ';
    foreach($myMenu as $pageId => $pageLabel) {
        if ($pageId === $currentPageId) {
            echo '<li><a href="'.$pageId.'.php" class="active">'.$pageLabel.'</a></li>';
        } else {
            echo '<li><a href="'.$pageId.'.php">'.$pageLabel.'</a></li>';
        }
    }
echo '
<<<<<<< HEAD
<nav class="side-bar">
    <h1>IMangerMieux</h1>
    <ul>
        <li><a href="#"><i class="fa-solid fa-chart-line"></i>Tableau de bord</a></li>
        <li><a href="journal.php"><i class="fa-solid fa-scroll"></i>Journal</a></li>
        <li><a href="aliments.php"><i class="fa-solid fa-utensils"></i>Aliments</a></li>
        <li><a href="profil.php"><i class="fa-regular fa-user"></i>Profil</a></li>
    </ul>
</nav>
';
=======
        </ul>
    </nav>
    ';
    
}


    
>>>>>>> a68b89cf8a8d7f59924255be0ad1796a14813f2e
?>