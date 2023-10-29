<?php 
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id_aliment) ) {
    $id = $data->id_aliment;

    $sql = "DELETE FROM ALIMENT WHERE ID = :id";

    $request = $pdo->prepare($sql);
    $id = htmlspecialchars(strip_tags($id));
    $request->bindParam(":id", $id);

    if ($request->execute()) {
         http_response_code(200);
  
        echo json_encode(array("message" => `L'aliment numéro $id a bien été supprimé.`));
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "La suppression de l'aliment n'est pas possible."));
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Le champs demandé n'est pas renseigné."));
}
  
?>