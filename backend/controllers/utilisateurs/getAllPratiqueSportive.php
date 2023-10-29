<?php
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$sql = 'SELECT * FROM PRATIQUE_SPORTIVE';

$request = $pdo->prepare($sql);

$request->execute();

$num = $request->rowCount();

if ($num > 0) {
    
    $pratique_sportive_arr = array();
    $pratique_sportive_arr["pratique_sportive"] = array();

    while ($row = $request->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
        
        $pratique_sportive_item = array(
            "id" => $ID,
            "nom" => $NOM,

        );
  
        array_push($pratique_sportive_arr["pratique_sportive"], $pratique_sportive_item);
    }
  
    http_response_code(200);
  
    echo json_encode($pratique_sportive_arr);
} else {
    http_response_code(400);
    echo json_encode(array("message"=> "Aucune pratique sportive trouvée."));
}

?>