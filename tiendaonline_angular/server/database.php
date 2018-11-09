<?php

class ConectorBD
{
  private $host = 'localhost';
  private $user = 'tiendaonline_user';
  private $password = '12345';
  private $database = 'tiendaonline';
  private $conexion;

  // Iniciar la conexion con la base de datos
  function initConexion(){
    $this->conexion = new mysqli($this->host, $this->user, $this->password, $this->database);
    if ($this->conexion->connect_error) {
      return "Error:" . $this->conexion->connect_error;
    }else {
      return "OK";
    }
  }

  // Cerrar la conexion a la base de datos
  function cerrarConexion(){$this->conexion->close();}

  // Ejecutar SQL en la base de datos
  function ejecutarQuery($query){return $this->conexion->query($query);}

  // Insertar Datos en la Base de datos
  function insertData($tabla, $data){
    $sql = 'INSERT INTO '.$tabla.' (';
    $i = 1;
    foreach ($data as $key => $value) {
      $sql .= $key;
      if ($i<count($data)) {
        $sql .= ', ';
      }else $sql .= ')';
      $i++;
    }
    $sql .= ' VALUES (';
    $i = 1;
    foreach ($data as $key => $value) {
      $sql .= "'".$value."'";
      if ($i<count($data)) {
        $sql .= ', ';
      }else $sql .= ');';
      $i++;
    }

    return $this->ejecutarQuery($sql);
  }

  // Actualizar registros en la Base de datos
  function actualizarRegistro($tabla, $data, $condicion){
    $sql = 'UPDATE '.$tabla.' SET ';
    $i=1;
    foreach ($data as $key => $value) {
      $sql .= $key.'='."'".$value."'";
      if ($i<sizeof($data)) {
        $sql .= ', ';
      }else $sql .= ' WHERE '.$condicion.';';
      $i++;
    }
    return $this->ejecutarQuery($sql);
  }

  // Eliminar Registros en la Base de datos
  function eliminarRegistro($tabla, $condicion){
    $sql = "DELETE FROM ".$tabla." WHERE ".$condicion.";";
    return $this->ejecutarQuery($sql);
  }

  // Consultar registros en la base de Datos
  function consultar($tablas, $campos, $condicion = ""){
    $sql = "SELECT ";
    $keys = array_keys($campos);
    $ultima_key = end($keys);
    foreach ($campos as $key => $value) {
      $sql .= $value;
      if ($key!=$ultima_key) {
        $sql.=", ";
      }else $sql .=" FROM ";
    }

    $keys = array_keys($tablas);
    $ultima_key = end($keys);
    foreach ($tablas as $key => $value) {
      $sql .= $value;
      if ($key!=$ultima_key) {
        $sql.=", ";
      }else $sql .= " ";
    }

    if ($condicion == "") {
      $sql .= ";";
    }else {
      $sql .= " WHERE ".$condicion.";";
    }

    return $this->ejecutarQuery($sql);
  }

}

?>
