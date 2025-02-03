const db = require('../config/database')  // ruta de la conexion hacia la bd

//funcion asincronica que desvuelve una promesa, cuando se resuelva la promesa se devolvera un array 
// con todas las categorias dentro de un funcion llamada resolve pero si falla 
// se devolvera un error dentro de la funcion reject 
const getAllCategorias = async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Categorias', (err, rows) => {
      if (err) {
        reject(err) 
      } else {
        resolve(rows) 
      }
    }) 
  }) 
} 

//función para agregar una nueva categoría pide como parametros el nombre y la descripcion de la categoria
const addCategoria = async (nombre, descripcion) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Categorias (nombre, descripcion) VALUES (?, ?)', 
      [nombre, descripcion], 
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, nombre, descripcion });
        }
      }
    );
  });
};


//función para eliminar una categoría por ID 
const deleteCategoria = async (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Categorias WHERE id = ?', [id], function(err) {
      if (err) {
        reject(err)
      } else {
        resolve({ id })
      }
    })
  })
}


//función para actualizar una categoría por ID pidendo como parametros el id, nombre y descripcion de la categoria
const updateCategoria = async (id, nombre, descripcion) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE Categorias SET descripcion = ? nombre = ? WHERE id = ?', [descripcion, nombre, id], function(err) {
      if (err) {
        reject(err)
      } else {
        resolve({ id, nombre, descripcion })
      }
    })
  })
}

//exporta el modulo para que pueda ser utilizado en otro archivo
module.exports = {
  getAllCategorias,
  addCategoria,
  deleteCategoria,
  updateCategoria,
}