const express = require('express');
const cors = require('cors');
require('./initDB');
const categoriaController = require('./controllers/categoriaController');
const productoController = require('./controllers/productoController');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

//endpoints para categorías
app.get('/categorias', categoriaController.getAllCategorias);
app.post('/categorias', categoriaController.createCategoria);
app.put('/categorias/:id', categoriaController.updateCategoria);
app.delete('/categorias/:id', categoriaController.deleteCategoria);

//endpoints para productos
app.get('/categorias/:categoriaId/productos', productoController.getProductosByCategoria);
app.post('/productos', productoController.createProducto);
app.put('/productos/:id', productoController.updateProducto);
app.delete('/productos/:id', productoController.deleteProducto);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});