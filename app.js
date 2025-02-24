require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./config/database'); 
const usuarioController = require('./controllers/usuarioController.js');
const menuController = require('./controllers/menuController.js');
const customizationController = require('./controllers/customizationController.js');
const carritoController = require('./controllers/carritoController.js');
const pedidoController = require('./controllers/pedidoController.js');
const categoriaController = require('./controllers/categoriaController.js');
const authController = require('./controllers/authController.js');

const app = express();
const PORT = process.env.PORT || 4002;

// Middlewares
app.use(cors());
app.use(express.json());

// ---------------------
// Endpoints para Usuarios
// ---------------------
// Obtener todos los usuarios
app.get('/api/usuarios', usuarioController.getUsuarios);

// Obtener un usuario por ID
app.get('/api/usuarios/:id', usuarioController.getUsuarioById);

// Crear un nuevo usuario
app.post('/api/usuarios', usuarioController.createUsuario);

// Actualizar un usuario
app.put('/api/usuarios/:id', usuarioController.updateUsuario);

// Eliminar un usuario
app.delete('/api/usuarios/:id', usuarioController.deleteUsuario);

// ---------------------
// Endpoints para Menú
// ---------------------
// Obtener todos los productos del menú
app.get('/api/menu', menuController.getMenu);

// Obtener un producto del menú por ID
app.get('/api/menu/:id', menuController.getProductoById);

// Crear un nuevo producto en el menú
app.post('/api/menu', menuController.createProducto);

// Actualizar un producto del menú
app.put('/api/menu/:id', menuController.updateProducto);

// Eliminar un producto del menú
app.delete('/api/menu/:id', menuController.deleteProducto);

// Obtener productos por categoría
app.get('/api/menu/categoria/:categoria', menuController.getProductosByCategoria);

// ---------------------
// Endpoints para Customizations
// ---------------------
// Obtener todas las personalizaciones
app.get('/api/customizations', customizationController.getCustomizations);

// Obtener personalizaciones por ID de producto
app.get('/api/customizations/menu/:menu_id', customizationController.getCustomizationsByMenuId);

// Crear una nueva personalización
app.post('/api/customizations', customizationController.createCustomization);

// Actualizar una personalización
app.put('/api/customizations/:id', customizationController.updateCustomization);

// Eliminar una personalización
app.delete('/api/customizations/:id', customizationController.deleteCustomization);

// ---------------------
// Endpoints para Carrito
// ---------------------
// Obtener todos los carritos
app.get('/api/carrito', carritoController.getCarritos);

// Obtener carrito por ID de usuario
app.get('/api/carrito/usuario/:user_id', carritoController.getCarritoByUserId);

// Agregar un producto al carrito
app.post('/api/carrito', carritoController.addToCarrito);

// Actualizar un producto en el carrito
app.put('/api/carrito/:id', carritoController.updateCarritoItem);

// Eliminar un producto del carrito
app.delete('/api/carrito/:id', carritoController.deleteCarritoItem);

// ---------------------
// Endpoints para Pedidos
// ---------------------
// Obtener todos los pedidos
app.get('/api/pedidos', pedidoController.getPedidos);

// Obtener un pedido por ID
app.get('/api/pedidos/:id', pedidoController.getPedidoById);

// Crear un nuevo pedido
app.post('/api/pedidos', pedidoController.createPedido);

// Actualizar el estado de un pedido
app.put('/api/pedidos/:id', pedidoController.updatePedidoStatus);

// Eliminar un pedido
app.delete('/api/pedidos/:id', pedidoController.deletePedido);



// Endpoint para el login
app.post('/api/login', authController.login);


// Endpoints para categorías
app.get('/api/categorias', categoriaController.getCategorias); // Obtener todas las categorías
app.get('/api/categorias/:id', categoriaController.getCategoriaById); // Obtener una categoría por ID
app.post('/api/categorias', categoriaController.createCategoria); // Crear una nueva categoría
app.put('/api/categorias/:id', categoriaController.updateCategoria); // Actualizar una categoría
app.delete('/api/categorias/:id', categoriaController.deleteCategoria); // Eliminar una categoría


app.get('/api/test-connection', async (req, res) => {
    try {
        const { data, error } = await supabase.from('Usuarios').select('*').limit(1);
        if (error) throw error;

        res.status(200).json({ message: 'Conexión exitosa con Supabase', data });
    } catch (error) {
        console.error('Error al conectar con Supabase:', error.message);
        res.status(500).json({ error: 'Error al conectar con Supabase' });
    }
});

// ---------------------
// Iniciar servidor
// ---------------------
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});