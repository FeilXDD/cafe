const db = require('../config/database');

// Obtener todos los productos de una categoría
const getProductosByCategoria = (categoriaId) => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM Productos WHERE categoriaId = ?',
      [categoriaId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

// Crear un nuevo producto
const createProducto = (nombre, descripcion, precio, categoriaId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Productos (nombre, descripcion, precio, categoriaId) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, precio, categoriaId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Actualizar un producto
const updateProducto = (id, nombre, descripcion, precio, categoriaId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, categoriaId = ? WHERE id = ?',
      [nombre, descripcion, precio, categoriaId, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

// Eliminar un producto
const deleteProducto = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Productos WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getProductosByCategoria,
  createProducto,
  updateProducto,
  deleteProducto,
};