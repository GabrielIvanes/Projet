<?php

require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
if(!empty($data->id) && !empty($data->email) && !empty($data->nom_utilisateur) && 
isset($data->sexe) && !empty($data->poids) && !empty($data->taille) && !empty($data->age) && !empty($data->pratique_sportive)){
        
    $id = $data->id;
    $email = $data->email;
    $nom_utilisateur = $data->nom_utilisateur;
    $sexe = $data->sexe;
    $poids = $data->poids;
    $taille = $data->taille;
    $age = $data->age;
    $pratique_sportive = $data->pratique_sportive;

    $sql = 'UPDATE UTILISATEUR SET PRA_ID = :pratique_sportive, NOM_UTILISATEUR = :nom_utilisateur, EMAIL = :email, SEXE = :sexe, AGE = :age, POIDS = :poids, TAILLE = :taille WHERE ID = :id';

    $request = $pdo->prepare($sql);

    $id = htmlspecialchars(strip_tags($id));
    $pratique_sportive = htmlspecialchars(strip_tags($pratique_sportive));
    $nom_utilisateur = htmlspecialchars(strip_tags($nom_utilisateur));
    $email = htmlspecialchars(strip_tags($email));
    $sexe = htmlspecialchars(strip_tags($sexe));
    $age = htmlspecialchars(strip_tags($age));
    $poids = htmlspecialchars(strip_tags($poids));
    $taille = htmlspecialchars(strip_tags($taille));
        
        
    $request->bindParam(":id", $id);
    $request->bindParam(":pratique_sportive", $pratique_sportive);
    $request->bindParam(":nom_utilisateur", $nom_utilisateur);
    $request->bindParam(":email", $email);
    $request->bindParam(":sexe", $sexe);
    $request->bindParam(":age", $age);
    $request->bindParam(":poids", $poids);
    $request->bindParam(":taille", $taille);

    if ($request->execute()) {
        http_response_code(200);
  
        echo json_encode(array("message" => "L'utilisateur $nom_utilisateur a été modifié."));
    } else {
        http_response_code(503);
  
        echo json_encode(array("message" => "La modification de l'utilisateur n'est pas possible."));
    }

} else {
    http_response_code(400);
    
    echo json_encode(array("message"=> "id: $data->id, email: $data->email, nom user: $data->nom_utilisateur, sexe: $data->sexe, poids: $data->poids, taille: $data->taille, age: $data->age, pra: $data->pratique_sportive"));

    // echo json_encode(array("message" => "Les champs demandés ne sont pas tous renseignés."));
}

?>