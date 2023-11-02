<?php 
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->alimentId) ) {
    $alimentId = $data->alimentId;

    $sql = "DELETE FROM CONTIENT WHERE ALI_ID = :alimentId";

    $request = $pdo->prepare($sql);
    $alimentId = htmlspecialchars(strip_tags($alimentId));
    $request->bindParam(":alimentId", $alimentId);

    if ($request->execute()) {
         http_response_code(200);
  
        echo json_encode(array("message" => `les nutriments de l'aliment numéro $alimentId ont bien été supprimés.`));
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "La suppression des nutriments n'est pas possible."));
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Le champ demandé n'est pas renseigné."));
}
  
?>