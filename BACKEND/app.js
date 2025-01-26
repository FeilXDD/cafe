const express = require('express')
const cors = require('cors')
const categoriaController = require('./controllers/categoriaController')
const db = require('./config/database')

//Inicializar la base de datos
require('./initDB')

const app = express()
// habilita la comunicacion entre el frontend y el backend
app.use(cors())
//ayuda a parsear las peticiones que vienen desde el cliente
app.use(express.json())

// enpoint para obtener todas las categorias 
//le damos la ruta /api/categorias y le pasamos la funcion getCategorias
app.get('/api/categorias', categoriaController.getCategorias)

// Iniciar el servidor
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
}) 