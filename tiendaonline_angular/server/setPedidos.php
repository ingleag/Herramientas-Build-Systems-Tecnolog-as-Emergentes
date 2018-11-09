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

$error = "";
$post = json_decode($_POST['data']);

if ($con->initConexion()=='OK'){

    for($i=0; $i < count($post); $i++){
        $datos['id_usuario'] = $post[$i]->idUsuario;
        $datos['id_producto'] = $post[$i]->id;
        $datos['cantidad'] = $post[$i]->unidadCompra;

        if ($con->insertData('pedidos', $datos)) {
        }else{
            $error = "Error al insertar el Pedido";
            $i = count($post) + 1;
        }
    }

    $con->cerrarConexion();
}else {
    $error = "Se presentó un error en la conexión";
}

if ($error == "") {
    $response['msg'] = "OK";
}else{
    $response['msg'] = $error;
}

header("HTTP/1.1 200 OK");
echo json_encode($response);

?>