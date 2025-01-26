//importar el módulo de sqlite3 que es la base de datos que vamos a utilizar
//y .verbose(): Habilita mensajes detallados en la consola
const sqlite3 = require('sqlite3').verbose() 

//creamos un constructor de la base de datos en memoria 
//con el valor ':memory:' indica que la base de datos se creará en memoria
//y hacemos un callback para verificar si se conecta correctamente o no
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err) 
  } else {
    console.log('Conexión a SQLite en memoria establecida correctamente.') 
  }
}) 

// exporta la conexion a la base de datos
module.exports = db 