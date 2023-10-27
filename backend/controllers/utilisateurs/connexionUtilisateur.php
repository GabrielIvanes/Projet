<?php

require_once('../../init_pdo.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $email = $data->email;
    $password = $data->password;

    $sql = 'SELECT * FROM UTILISATEUR WHERE EMAIL = :email AND PASSWORD = :password';

    $request = $pdo->prepare($sql);

    $email = htmlspecialchars(strip_tags($email));
    $password = htmlspecialchars(strip_tags($password));

    $request->bindParam(":email", $email);
    $request->bindParam(":password", $password);

    $request->execute();

    $num = $request->rowCount();

    if ($num > 0) {
        $row = $request->fetch(PDO::FETCH_ASSOC);
        extract($row);

        http_response_code(201);
  
        echo json_encode(array("message" => "L'utilisateur $ID a été trouvé.", "id" => $ID));
    } else {
        http_response_code(400);
        
        echo json_encode(array("message"=> "Mauvais email ou mot de passe."));
    }
}

?>