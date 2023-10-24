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
        </ul>
    </nav>
    ';
    
}


    
?>