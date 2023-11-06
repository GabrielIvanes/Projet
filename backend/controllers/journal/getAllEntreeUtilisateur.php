<?php
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if(!empty($data -> utilisateurId) ) {
    $utilisateurId = $data -> utilisateurId;

    $sql = "SELECT ENTREE.ID as ENTID, ALIMENT.NOM as ALINOM, CATEGORIE_ALIMENT.NOM as CATNOM, ENTREE.QUANTITE as QUA, ENTREE.DATE as DATE 
    FROM ENTREE 
    JOIN ALIMENT ON ENTREE.ALI_ID = ALIMENT.ID
    JOIN CATEGORIE_ALIMENT ON ALIMENT.CAT_ID = CATEGORIE_ALIMENT.ID
    WHERE ENTREE.UTI_ID = :utilisateurId
    ";

    $request = $pdo->prepare($sql);
    $utilisateurId = htmlspecialchars(strip_tags($utilisateurId));
    $request->bindParam(":utilisateurId", $utilisateurId);

    $request->execute();

    $num = $request->rowCount();

    if ($num > 0) {

        $journal_arr = array();
        $journal_arr["journal"] = array();

        while ($row = $request->fetch(PDO::FETCH_ASSOC)){
        
            extract($row);
        
            $entree_item = array(
                "id"=>$ENTID,
                "aliment"=>$ALINOM,
                "cat"=>$CATNOM,
                "quantite"=>$QUA,
                "date"=>$DATE,

            );
  
            array_push($journal_arr["journal"], $entree_item);
        }
  
        http_response_code(200);
  
        echo json_encode($journal_arr);
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "Aucune entrée trouvé."));
    }
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Le champs demandé n'est pas renseigné."));
}

?>