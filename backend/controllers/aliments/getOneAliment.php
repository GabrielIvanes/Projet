<?php
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id_aliment) ) {
    $id = $data->id_aliment;

    $sql = "SELECT * FROM ALIMENT WHERE ID = :id";

    $request = $pdo->prepare($sql);
    $id = htmlspecialchars(strip_tags($id));
    $request->bindParam(":id", $id);

    $request->execute();

    $num = $request->rowCount();

    if ($num > 0) {

        $row = $request->fetch(PDO::FETCH_ASSOC);
        extract($row);

       $aliment_item = array(
            "id"=>$ID,
            "categorie_id"=>$CAT_ID,
            "nom"=>$NOM,
            "isLiquide"=>$ISLIQUIDE

        );
        
        http_response_code(200);
  
        echo json_encode($aliment_item);
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "Aucun aliment trouvé."));
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Le champs demandé n'est pas renseigné."));
}

?>