<?php 
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->entreeId) ) {
    $entreeId = $data->entreeId;

    $sql = "DELETE FROM ENTREE WHERE ID = :entreeId";

    $request = $pdo->prepare($sql);
    $entreeId = htmlspecialchars(strip_tags($entreeId));
    $request->bindParam(":entreeId", $entreeId);

    if ($request->execute()) {
         http_response_code(200);
  
        echo json_encode(array("message" => `l'entree numéro $entreeId a bien été supprimée.`));
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "La suppression de l'entrée n'est pas possible."));
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Le champ demandé n'est pas renseigné."));
}
  
?>