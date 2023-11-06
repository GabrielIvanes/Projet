<?php 
require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->utilisateurId) && !empty($data->alimentId) && !empty($data->quantite) && !empty($data->date) ){
    $utilisateurId = $data->utilisateurId;
    $alimentId = $data->alimentId;
    $quantite = $data->quantite;
    $date = $data->date;

    
    $sql = 'INSERT INTO ENTREE(UTI_ID, ALI_ID, QUANTITE, DATE) VALUES(:utilisateurId, :alimentId, :quantite, :date)';

    $request = $pdo->prepare($sql);

    $alimentId = htmlspecialchars(strip_tags($alimentId));
    $utilisateurId = htmlspecialchars(strip_tags($utilisateurId));
    $quantite = htmlspecialchars(strip_tags($quantite));
    $date = htmlspecialchars(strip_tags($date));
        
    $request->bindParam(":alimentId", $alimentId);
    $request->bindParam(":utilisateurId", $utilisateurId);
    $request->bindParam(":quantite", $quantite);
    $request->bindParam(":date", $date);

    if ($request->execute()) {
        http_response_code(201);
  
        echo json_encode(array("message" => "L'entrée dans le journal a été ajoutée."));
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "L'ajout de l'entrée n'est pas possible."));
    }

} else {
    http_response_code(400);

    echo json_encode(array("message" => "Les champs demandés ne sont pas tous renseignés."));
}
?>