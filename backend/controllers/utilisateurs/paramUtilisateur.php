<?php

require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $id = $data->id;

    $sql = 'SELECT * FROM UTILISATEUR WHERE ID = :id';

    $request = $pdo->prepare($sql);

    $id = htmlspecialchars(strip_tags($id));

    $request->bindParam(":id", $id);

    $request->execute();

    $num = $request->rowCount();

    if ($num > 0) {
        $row = $request->fetch(PDO::FETCH_ASSOC);
        extract($row);

        http_response_code(201);
  
        echo json_encode(array("message" => "L'utilisateur $ID a été trouvé.", "utilisateur" => $row));
    } else {
        http_response_code(400);
        
        echo json_encode(array("message"=> "Aucun utilisateur trouvé."));
    }
}

?>