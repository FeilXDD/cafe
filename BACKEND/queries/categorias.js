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

//esporta el modulo para que pueda ser utilizado en otro archivo
module.exports = {
  getAllCategorias,
} 