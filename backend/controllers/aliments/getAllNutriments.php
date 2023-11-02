<?php 
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$sql = 'SELECT * FROM NUTRIMENT';

$request = $pdo->prepare($sql);

$request->execute();

$num = $request->rowCount();

if ($num > 0) {
    
    $nutriments_arr = array();
    $nutriments_arr["nutriments"] = array();

    while ($row = $request->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
        
        $nutriment_item = array(
            "id"=>$ID,
            "nom"=>$NOM,

        );
  
        array_push($nutriments_arr["nutriments"], $nutriment_item);
    }
  
    http_response_code(200);
  
    echo json_encode($nutriments_arr);
} else {
    http_response_code(400);
    echo json_encode(array("message"=> "Aucun nutriment trouvé."));
}


?>