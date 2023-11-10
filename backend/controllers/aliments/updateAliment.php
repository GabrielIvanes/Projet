<?php

require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && !empty($data->nom) && !empty($data->categorie_id) && isset($data->isLiquide)) {

    $id = $data->id;
    $nom = $data->nom;
    $categorie_id = $data->categorie_id;
    $isLiquide = $data->isLiquide ? 1 : 0;

    $sql = 'UPDATE ALIMENT SET NOM = :nom, CAT_ID = :categorie_id, ISLIQUIDE = :isLiquide WHERE ID = :id';

    $request = $pdo->prepare($sql);

    $id = htmlspecialchars(strip_tags($id));
    $nom = htmlspecialchars(strip_tags($nom));
    $categorie_id = htmlspecialchars(strip_tags($categorie_id));
    $isLiquide = htmlspecialchars(strip_tags($isLiquide));
        
    $request->bindParam(':id', $id);
    $request->bindParam(':nom', $nom);
    $request->bindParam(':categorie_id', $categorie_id);
    $request->bindParam(':isLiquide', $isLiquide);

    if ($request->execute()) {
        http_response_code(200);
  
        echo json_encode(array("message" => "L'aliment $nom a été modifié."));
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "La modification de l'aliment n'est pas possible."));
    }

} else {
    http_response_code(400);

    echo json_encode(array("message" => "Les champs demandés ne sont pas tous renseignés."));
}

?>