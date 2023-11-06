<?php
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->entreeId) ) {
    $entreeId = $data->entreeId;

    $sql = "SELECT ENTREE.ID as ENTID, ENTREE.ALI_ID as ALIID, ENTREE.QUANTITE as QUANTITE, ENTREE.DATE as DATE, ALIMENT.NOM as ALINOM
    FROM ENTREE 
    JOIN ALIMENT ON ENTREE.ALI_ID = ALIMENT.ID
    WHERE ENTREE.ID = :entreeId";


    $request = $pdo->prepare($sql);
    $entreeId = htmlspecialchars(strip_tags($entreeId));
    $request->bindParam(":entreeId", $entreeId);

    $request->execute();

    $num = $request->rowCount();

    if ($num > 0) {

        $row = $request->fetch(PDO::FETCH_ASSOC);
        extract($row);

       $entree_item = array(
            "id"=>$ENTID,
            "alimentId"=>$ALIID,
            "alimentNom"=>$ALINOM,
            "quantite"=>$QUANTITE,
            "date"=>$DATE

        );
        
        http_response_code(200);
  
        echo json_encode($entree_item);
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "Aucun entree trouvé."));
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Le champs demandé n'est pas renseigné."));
}

?>