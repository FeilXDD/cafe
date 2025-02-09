const db = require('../config/database');

// Obtener todas las categorías
const getAllCategorias = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Categorias', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Obtener una categoría por ID
const getCategoriaById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Categorias WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Crear una nueva categoría
const createCategoria = (nombre, descripcion) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Categorias (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion],
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

// Actualizar una categoría
const updateCategoria = (id, nombre, descripcion) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE Categorias SET nombre = ?, descripcion = ? WHERE id = ?',
      [nombre, descripcion, id],
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

// Eliminar una categoría
const deleteCategoria = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Categorias WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};