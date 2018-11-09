<?php

// ACTIVAR CORS
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}
//

require('database.php');
$con = new ConectorBD();
$post = json_decode($_POST['data']);
if ($con->initConexion()=='OK'){
  if ($resultado = $con->consultar(['usuarios'], ['*'], "email = '".$post->{'usuario'}."' AND contrasena = '".$post->{'contrasena'}."'")){
    if ($resultado->num_rows > 0) {
      $fila = $resultado->fetch_assoc();
      $response['msg'] = "OK";
      $response['id'] = $fila['id'];
    }else {
      $response['msg'] = "Usuario no autorizado";
    }
  }else {
    $response['msg'] = "Error al consultar el usuario";
  }
}else {
  $response['msg'] = "Se presentó un error en la conexión";
}

header("HTTP/1.1 200 OK");
echo json_encode($response);
 ?>
