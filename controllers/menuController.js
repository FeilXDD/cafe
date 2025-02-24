const queries = require('../queries/menuQueries.js');

// Obtener todos los productos del menú
exports.getMenu = async (req, res) => {
    try {
        const menu = await queries.getAllProductos();
        res.status(200).json(menu);
    } catch (error) {
        console.error('Error al obtener el menú:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un producto del menú por ID
exports.getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await queries.getProductoById(id);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        console.error('Error al obtener producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.createProducto = async (req, res) => {
    try {
      const { name, description, price, categoria_id, image_url, ingredients } = req.body;
  
      // Validar campos obligatorios
      if (!name || !price || !categoria_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
  
      // Validar tipo de datos
      if (typeof price !== 'number') {
        return res.status(400).json({ error: 'El precio debe ser un número' });
      }
  
      // Crear el producto
      const nuevoProducto = await queries.createProducto(name, description, price, categoria_id, image_url, ingredients, true);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error('Error al crear producto:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

// Actualizar un producto del menú
exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, image_url, ingredients, available } = req.body;

        const productoActualizado = await queries.updateProducto(id, name, description, price, category, image_url, ingredients, available);

        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(productoActualizado);
    } catch (error) {
        console.error('Error al actualizar producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un producto del menú
exports.deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await queries.deleteProducto(id);

        if (!eliminado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener productos por categoría
exports.getProductosByCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const productos = await queries.getProductosByCategoria(categoria);

        if (!productos || productos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos para esta categoría' });
        }

        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};