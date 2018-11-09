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
$buscar = $_POST['data'];
if (strlen($buscar) > 0){
  $buscar = $buscar;
}else{
  $buscar = "";
}
if ($con->initConexion()=='OK'){
  if ($resultado = $con->consultar(['v_productos'], ['*'], "nombre like '%".$buscar."%'")){
    $i=0;
    while ($fila = $resultado->fetch_assoc()) {
      $response['productos'][$i]['id'] = $fila['id'];
      $response['productos'][$i]['imagen'] = $fila['imagen'];
      $response['productos'][$i]['nombre'] = $fila['nombre'];
      $response['productos'][$i]['precio'] = $fila['precio'];
      $response['productos'][$i]['disponible'] = $fila['disponible'];
      $i++;
    }
    $response['msg'] = "OK";
  }else {
    $response['msg'] = "Error al consultar los eventos";
  }
}else {
  $response['msg'] = "Se presentó un error en la conexión";
}

echo json_encode($response);


 ?>
