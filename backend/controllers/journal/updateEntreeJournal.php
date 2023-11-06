<?php

require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->entreeId) && !empty($data->alimentId) && !empty($data->quantite) && !empty($data->date)) {

    $entreeId = $data->entreeId;
    $alimentId = $data->alimentId;
    $quantite = $data->quantite;
    $date = $data->date;

    $sql = 'UPDATE ENTREE SET ALI_ID = :alimentId, QUANTITE = :quantite, DATE = :date WHERE ID = :entreeId';

    $request = $pdo->prepare($sql);

    $entreeId = htmlspecialchars(strip_tags($entreeId));
    $alimentId = htmlspecialchars(strip_tags($alimentId));
    $quantite = htmlspecialchars(strip_tags($quantite));
    $date = htmlspecialchars(strip_tags($date));
        
    $request->bindParam(':entreeId', $entreeId);
    $request->bindParam(':alimentId', $alimentId);
    $request->bindParam(':quantite', $quantite);
    $request->bindParam(':date', $date);

    if ($request->execute()) {
        http_response_code(200);
  
        echo json_encode(array("message" => "L'entrée $entreeId a été modifiée."));
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "La modification de l'entrée n'est pas possible."));
    }

} else {
    http_response_code(400);

    echo json_encode(array("message" => "Les champs demandés ne sont pas tous renseignés."));
}

?>