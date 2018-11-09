-- CREAR LA BASE DE DATOS
CREATE DATABASE tiendaonline;
USE tiendaonline;

-- CREAR TABLA DE USUARIOS
CREATE TABLE usuarios
(	id			INTEGER			NOT NULL AUTO_INCREMENT,
	email		VARCHAR(200)	NOT NULL,
	contrasena	VARCHAR(1000)	NOT NULL,
	CONSTRAINT pk_usuarios PRIMARY KEY (id)
);
CREATE UNIQUE INDEX idx_usuarios ON usuarios(email);

-- CREAR TABLA DE PRODUCTOS
CREATE TABLE productos
(	id			INTEGER			NOT NULL AUTO_INCREMENT,
	imagen		VARCHAR(60)		NOT NULL,
	nombre		VARCHAR(60)		NOT NULL,
	precio		DECIMAL(18,0)	NOT NULL,
	disponible	INTEGER			NOT NULL,
	CONSTRAINT pk_eventos PRIMARY KEY(id)
);
CREATE UNIQUE INDEX idx_productos ON productos(nombre);

CREATE TABLE pedidos
(
	id			INTEGER			NOT NULL AUTO_INCREMENT,
	id_usuario	INTEGER			NOT NULL,
	id_producto	INTEGER			NOT NULL,
	cantidad	INTEGER			NOT NULL,
	CONSTRAINT pk_pedidos PRIMARY KEY(id)
);

ALTER TABLE pedidos ADD CONSTRAINT fk_pedidos_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE pedidos ADD CONSTRAINT fk_pedidos_productos FOREIGN KEY(id_producto) REFERENCES productos(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE VIEW v_productos AS
	SELECT	productos.id,
			productos.imagen,
			productos.nombre,
			productos.precio,
			productos.disponible - (CASE WHEN EXISTS(SELECT 1 FROM pedidos WHERE productos.id = pedidos.id_producto) THEN (SELECT SUM(pedidos.cantidad) FROM pedidos WHERE productos.id = pedidos.id_producto) ELSE 0 END) AS disponible
	FROM	productos
	WHERE	(productos.disponible - (CASE WHEN EXISTS(SELECT 1 FROM pedidos WHERE productos.id = pedidos.id_producto) THEN (SELECT SUM(pedidos.cantidad) FROM pedidos WHERE productos.id = pedidos.id_producto) ELSE 0 END)) > 0;

CREATE USER 'tiendaonline_user'@'localhost' IDENTIFIED BY '12345';
GRANT SELECT, INSERT, UPDATE, DELETE ON tiendaonline.* TO 'tiendaonline_user'@'localhost';

INSERT INTO usuarios (email, contrasena) VALUES ('usuario@usuario.com', '12345');
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('aguacate.jpg', 'Aguacate', 2000, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('ajo.jpg', 'Ajo', 300, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('almendras.jpg', 'Almendras', 1000, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('arandanos.jpg', 'Arandanos', 3250, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('brocoli.png', 'Brocoli', 2345, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('calabaza.jpg', 'Calabaza', 5400, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('canela.jpg', 'Canela', 200, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('cebolla.jpg', 'Cebolla', 500, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('fresa.jpg', 'Fresa', 3000, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('kiwi.jpg', 'Kiwi', 4050, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('limon.jpg', 'limon', 100, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('lychee.jpg', 'Lychee', 500, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('maiz.jpg', 'Maiz', 450, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('manzana.jpg', 'Manzana', 600, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('naranja.jpg', 'Naranja', 400, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('pasta.jpg', 'Pasta', 1000, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('pimienta.jpg', 'Pimienta', 1250, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('repollo.jpg', 'Repollo', 680, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('tomate.jpg', 'Tomate', 250, 100);
INSERT INTO productos (imagen, nombre, precio, disponible) VALUES('zanahoria.jpg', 'Zanahoria', 300, 100);
