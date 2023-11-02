<?php 
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->alimentId) && !empty($data->nutrimentId) && !empty($data->quantite)) {
    $alimentId = $data->alimentId;
    $nutrimentId = $data->nutrimentId;
    $quantite = $data->quantite;
   
    
    $sql = 'INSERT INTO CONTIENT(NUT_ID, ALI_ID, QUANTITE) VALUES(:nutrimentId, :alimentId, :quantite)';

    $request = $pdo->prepare($sql);

    $alimentId = htmlspecialchars(strip_tags($alimentId));
    $nutrimentId = htmlspecialchars(strip_tags($nutrimentId));
    $quantite = htmlspecialchars(strip_tags($quantite));
        
    $request->bindParam(":nutrimentId", $nutrimentId);
    $request->bindParam(":alimentId", $alimentId);
    $request->bindParam(":quantite", $quantite);

    if ($request->execute()) {   
        http_response_code(201);
  
        echo json_encode(array("message" => "L'aliment $alimentId a été relié au nutriment $alimentId avec une quantité de $quantite."));
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "L'ajout de la relation n'est pas possible."));
    }

} else {
    http_response_code(400);

    echo json_encode(array("message" => "Les champs demandés ne sont pas tous renseignés."));
}
?>