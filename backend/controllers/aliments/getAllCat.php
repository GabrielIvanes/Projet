<?php 
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$sql = 'SELECT * FROM CATEGORIE_ALIMENT';

$request = $pdo->prepare($sql);

$request->execute();

$num = $request->rowCount();

if ($num > 0) {
    
    $categories_arr = array();
    $categories_arr["categories"] = array();

    while ($row = $request->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
        
        $categorie_item = array(
            "id"=>$ID,
            "nom"=>$NOM,

        );
  
        array_push($categories_arr["categories"], $categorie_item);
    }
  
    http_response_code(200);
  
    echo json_encode($categories_arr);
} else {
    http_response_code(400);
    echo json_encode(array("message"=> "Aucune catégorie trouvée."));
}


?>