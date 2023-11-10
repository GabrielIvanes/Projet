<?php
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->alimentId) && !empty($data->nutrimentId)) {
    $alimentId = $data->alimentId;
    $nutrimentId = $data->nutrimentId;

    $sql = "SELECT QUANTITE FROM CONTIENT WHERE ALI_ID = :alimentId AND NUT_ID = :nutrimentId";

    $request = $pdo->prepare($sql);
    $alimentId = htmlspecialchars(strip_tags($alimentId));
    $nutrimentId = htmlspecialchars(strip_tags($nutrimentId));
    $request->bindParam(":alimentId", $alimentId);
    $request->bindParam(":nutrimentId", $nutrimentId);

    $request->execute();

    $num = $request->rowCount();

    if ($num > 0) { 
        $row = $request->fetch(PDO::FETCH_ASSOC);
        extract($row);
        
        http_response_code(200);
  
        echo json_encode(array("quantite" => $QUANTITE)); 
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "Pas de relation entre le nutriment $nutrimentId et l'aliment $alimentId"));
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Les champs demandés ne sont pas renseignés."));
}

?>