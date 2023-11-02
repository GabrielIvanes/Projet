<?php
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->alimentId) ) {
    $alimentId = $data->alimentId;

    $sql = "SELECT * FROM CONTIENT WHERE ALI_ID = :alimentId";

    $request = $pdo->prepare($sql);
    $alimentId = htmlspecialchars(strip_tags($alimentId));
    $request->bindParam(":alimentId", $alimentId);

    $request->execute();

    $num = $request->rowCount();

    if ($num > 0) {

        $contient_arr = array();
        $contient_arr["contient"] = array();

        while($row = $request->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            
            $nutriment_item = array(
            "nutrimentId" => $NUT_ID,
            "quantite" => $QUANTITE,
            );
            
            array_push($contient_arr["contient"], $nutriment_item);
        
        }
        
        http_response_code(200);
  
        echo json_encode($contient_arr);
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "Aucun nutriment trouvé pour l'aliment $alimentId."));
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Le champs demandé n'est pas renseigné."));
}

?>