<?php 
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


if(isset($_GET['aliment'])) {
    $aliment = $_GET['aliment'];

    $sql = "SELECT ALIMENT.ID as ALIID, ALIMENT.NOM as ALINAME, CATEGORIE_ALIMENT.NOM as CATNAME FROM ALIMENT 
    INNER JOIN CATEGORIE_ALIMENT ON ALIMENT.CAT_ID = CATEGORIE_ALIMENT.ID 
    WHERE ALIMENT.NOM LIKE '%$aliment%' LIMIT 20;";

    $request = $pdo->prepare($sql);

    $request->execute();

    $num = $request->rowCount();

    if ($num > 0) { 
        $aliments_arr = array();
        $aliments_arr["aliments"] = array();

        while ($row = $request->fetch(PDO::FETCH_ASSOC)){
            
            extract($row);
            
            $aliment_item = array(
                "id"=>$ALIID,
                "nom"=>$ALINAME,

            );
    
            array_push($aliments_arr["aliments"], $aliment_item);
        }
        
        http_response_code(200);
  
        echo json_encode($aliments_arr);
    } else {
        http_response_code(400);
        
        echo json_encode(array("message"=> "Aucun aliment trouvé."));
    }

} 
?>