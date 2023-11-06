<?php 
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->categorie_id) && !empty($data->nom)){
    $catId = $data->categorie_id;
    $nom = $data->nom;
    
    
    $sql = 'INSERT INTO ALIMENT(CAT_ID, NOM) VALUES(:categorie_id, :nom)';

    $request = $pdo->prepare($sql);

    $catId = htmlspecialchars(strip_tags($catId));
    $nom = htmlspecialchars(strip_tags($nom));
        
    $request->bindParam(":categorie_id", $catId);
    $request->bindParam(":nom", $nom);

    if ($request->execute()) {

        $alimentIdCréé = $pdo->lastInsertId();
        
        http_response_code(201);
  
        echo json_encode(array("message" => "L'aliment $nom a été ajouté.", "alimentId" => $alimentIdCréé));
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "L'ajout de l'aliment n'est pas possible."));
    }

} else {
    http_response_code(400);

    echo json_encode(array("message" => "Les champs demandés ne sont pas tous renseignés."));
}
?>