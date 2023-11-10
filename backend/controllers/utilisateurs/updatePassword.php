<?php

require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
if(!empty($data->utilisateurId) && !empty($data->new_password)){
    
    $id = $data->utilisateurId;
    $new_password = $data->new_password;


    $sql = 'UPDATE UTILISATEUR SET PASSWORD = :new_password WHERE ID = :id';

    $request = $pdo->prepare($sql);

    $id = htmlspecialchars(strip_tags($id));
    $new_password = htmlspecialchars(strip_tags($new_password));
        
        
    $request->bindParam(":id", $id);
    $request->bindParam(":new_password", $new_password);

    if ($request->execute()) {
        http_response_code(200);
  
        echo json_encode(array("message" => "Le mot de passe de l'utilisateur $id a été modifié."));
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "La modification du mot de passe n'est pas possible."));
    }

} else {
    http_response_code(400);

    echo json_encode(array("message" => "Les champs demandés ne sont pas tous renseignés."));
}

?>