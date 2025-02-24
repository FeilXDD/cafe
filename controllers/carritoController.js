const queries = require('../queries/carritoQueries.js');

// Obtener todos los carritos
exports.getCarritos = async (req, res) => {
    try {
        const carritos = await queries.getAllCarritos();
        res.status(200).json(carritos);
    } catch (error) {
        console.error('Error al obtener carritos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener carrito por ID de usuario
exports.getCarritoByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const carrito = await queries.getCarritoByUserId(user_id);

        if (!carrito || carrito.length === 0) {
            return res.status(404).json({ error: 'No se encontró el carrito para este usuario' });
        }

        res.status(200).json(carrito);
    } catch (error) {
        console.error('Error al obtener carrito por ID de usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Agregar un producto al carrito
exports.addToCarrito = async (req, res) => {
    try {
        const { user_id, product_id, quantity, customizations } = req.body;

        if (!user_id || !product_id || !quantity) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevoItem = await queries.addToCarrito(user_id, product_id, quantity, customizations);
        res.status(201).json(nuevoItem);
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar un producto en el carrito
exports.updateCarritoItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, customizations } = req.body;

        const itemActualizado = await queries.updateCarritoItem(id, quantity, customizations);

        if (!itemActualizado) {
            return res.status(404).json({ error: 'Producto en el carrito no encontrado' });
        }

        res.status(200).json(itemActualizado);
    } catch (error) {
        console.error('Error al actualizar producto en el carrito:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un producto del carrito
exports.deleteCarritoItem = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await queries.deleteCarritoItem(id);

        if (!eliminado) {
            return res.status(404).json({ error: 'Producto en el carrito no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado del carrito correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};