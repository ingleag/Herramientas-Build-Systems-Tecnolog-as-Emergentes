const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    'I received your POST request. This is what you sent me: ${req.body.post}',
  );
});

app.post('/api/login', (req, res) => {
  var usu = req.body.usuario.toString();
  var pass = req.body.contrasena.toString();
  
  if (usu.length > 0 && pass.length > 0){}else{
    return 'Los datos de usuario y contraseña son Obligatorios!!!';
  };
  
  conectar();
  con.query("select *, 'OK' msg from usuarios WHERE email = '" + usu + "' and contrasena = '" + pass + "'", function(err, result, fields)
  {
    if (err) throw err;
    if (result.length > 0){}else{
      result = [{"msg":"Usuario no autorizado"}];
    };
    res.json(result);
  });
});

app.post('/api/productos', (req, res) => {
  nombre = req.body.articulo.toString();
  conectar();
  if (nombre.length > 0){}else{nombre = "";};
  con.query("SELECT *, CONCAT('img/',imagen)  as img FROM v_productos WHERE nombre like '%" + nombre + "%'", function (err, result, fields) {
      if (err) throw err;
      res.json(result);
  });
});

app.post('/api/setpedido', (req, res) => {
  var idUsuario = 0;
  var idProducto = 0;
  var cantidad = 0;

  for (i = 0; i < req.body.length; i++){
    
    idUsuario = req.body[i].idUsuario;
    idProducto = req.body[i].idProducto;
    cantidad = req.body[i].unidadCompra;
    
    if (idUsuario > 0 && idProducto > 0 && cantidad > 0){
      conectar();
      con.query("insert into pedidos(id_usuario, id_producto, cantidad) value(" + idUsuario + "," + idProducto + "," + cantidad + ")", function(err, result, fields)
      {
        if (err) throw err;
        console.log(result);
      });
    }
  }
  res.json([{"msg":"OK"}]);
});

app.listen(port, () => console.log('Listening on port ${port}'));

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "tiendaonline_user",
    password: "12345",
    database: "tiendaonline"
});

function conectar(){
  con.connect(function(err) {
      if (err){
          console.log(err);
          return false;
          //throw err;
      }
      console.log("Conectado!");
  });
  return true;
}
