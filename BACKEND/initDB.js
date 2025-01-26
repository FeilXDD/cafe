const db = require('./config/database') 

// Crear la tabla de categorías
db.run(`
  CREATE TABLE IF NOT EXISTS Categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla Categorias:', err) 
  } else {
    console.log('Tabla Categorias creada correctamente.') 
  }
}) 

// Crear la tabla de productos
db.run(`
  CREATE TABLE IF NOT EXISTS Productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio REAL NOT NULL,
    categoriaId INTEGER,
    FOREIGN KEY (categoriaId) REFERENCES Categorias(id)
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla Productos:', err) 
  } else {
    console.log('Tabla Productos creada correctamente.') 
  }
}) 

// Insertar datos iniciales
db.serialize(() => {
  db.run(`
    INSERT INTO Categorias (nombre, descripcion)
    VALUES ('Cafés', 'Variedad de cafés calientes y fríos.')
  `) 
  db.run(`
    INSERT INTO Categorias (nombre, descripcion)
    VALUES ('Tés', 'Tés calientes y fríos de diferentes sabores.')
  `) 

  db.run(`
    INSERT INTO Productos (nombre, descripcion, precio, categoriaId)
    VALUES ('Café Americano', 'Café negro preparado con agua caliente.', 2.5, 1)
  `) 
  db.run(`
    INSERT INTO Productos (nombre, descripcion, precio, categoriaId)
    VALUES ('Café Latte', 'Café espresso con leche vaporizada.', 3.5, 1)
  `) 
}) 

console.log('Datos iniciales insertados correctamente.') 