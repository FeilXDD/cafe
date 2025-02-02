const express = require('express');
const cors = require('cors');
const categoriaController = require('./controllers/categoriaController'); // Importa el controlador
const db = require('./config/database');
require('./initDB'); // Inicializa la base de datos

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get('/api/categorias', categoriaController.getCategorias); // Obtener todas las categorías
app.post('/api/categorias', categoriaController.createCategoria); // Crear una nueva categoría
app.delete('/api/categorias/:id', categoriaController.removeCategoria); // Eliminar una categoría
app.put('/api/categorias/:id', categoriaController.editCategoria); // Actualizar una categoría

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});