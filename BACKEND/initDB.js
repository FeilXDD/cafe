const db = require('./config/database');

//Crear tabla Categorias
db.run(`
  CREATE TABLE IF NOT EXISTS Categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla Categorias:', err.message);
  } else {
    console.log('Tabla Categorias creada correctamente.');
  }
});

//Crear tabla Productos
db.run(`
  CREATE TABLE IF NOT EXISTS Productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio REAL NOT NULL CHECK (precio >= 0),
    categoriaId INTEGER,
    FOREIGN KEY (categoriaId) REFERENCES Categorias(id)
      ON DELETE SET NULL
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla Productos:', err.message);
  } else {
    console.log('Tabla Productos creada correctamente.');
  }
});

//Función para insertar datos iniciales
const insertarDatosIniciales = () => {
  db.serialize(() => {
    //Insertar categorías iniciales
    db.run(`
      INSERT INTO Categorias (nombre, descripcion)
      SELECT 'Cafés', 'Variedad de cafés calientes y fríos.'
      WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE nombre = 'Cafés')
    `);
    db.run(`
      INSERT INTO Categorias (nombre, descripcion)
      SELECT 'Tés', 'Tés calientes y fríos de diferentes sabores.'
      WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE nombre = 'Tés')
    `);

    //Insertar productos iniciales
    db.run(`
      INSERT INTO Productos (nombre, descripcion, precio, categoriaId)
      SELECT 'Café Americano', 'Café negro preparado con agua caliente.', 2.5, 
             (SELECT id FROM Categorias WHERE nombre = 'Cafés')
      WHERE NOT EXISTS (SELECT 1 FROM Productos WHERE nombre = 'Café Americano')
    `);
    db.run(`
      INSERT INTO Productos (nombre, descripcion, precio, categoriaId)
      SELECT 'Café Latte', 'Café espresso con leche vaporizada.', 3.5, 
             (SELECT id FROM Categorias WHERE nombre = 'Cafés')
      WHERE NOT EXISTS (SELECT 1 FROM Productos WHERE nombre = 'Café Latte')
    `);
  });
  console.log('Datos iniciales insertados correctamente.');
};

//Crear tabla Carritos
db.run(`
  CREATE TABLE IF NOT EXISTS Carritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clienteId TEXT NOT NULL, -- Identificador único del cliente (puede ser un UUID o similar)
    productoId INTEGER NOT NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    FOREIGN KEY (productoId) REFERENCES Productos(id)
      ON DELETE CASCADE
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla Carritos:', err.message);
  } else {
    console.log('Tabla Carritos creada correctamente.');
  }
});

// Crear tabla Pedidos
db.run(`
  CREATE TABLE IF NOT EXISTS Pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clienteId TEXT NOT NULL,
    estado TEXT NOT NULL DEFAULT 'pendiente', -- Estados: pendiente, completado
    fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla Pedidos:', err.message);
  } else {
    console.log('Tabla Pedidos creada correctamente.');
  }
});

// Crear tabla Detalles de Pedidos
db.run(`
  CREATE TABLE IF NOT EXISTS DetallesPedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pedidoId INTEGER NOT NULL,
    productoId INTEGER NOT NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    FOREIGN KEY (pedidoId) REFERENCES Pedidos(id)
      ON DELETE CASCADE,
    FOREIGN KEY (productoId) REFERENCES Productos(id)
      ON DELETE CASCADE
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla DetallesPedidos:', err.message);
  } else {
    console.log('Tabla DetallesPedidos creada correctamente.');
  }
});

// Ejecutar la función para insertar datos iniciales
insertarDatosIniciales();