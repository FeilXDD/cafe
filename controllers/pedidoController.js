const queries = require('../queries/pedidoQueries.js');

// Obtener todos los pedidos
exports.getPedidos = async (req, res) => {
    try {
        const pedidos = await queries.getAllPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un pedido por ID
exports.getPedidoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await queries.getPedidoById(id);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.status(200).json(pedido);
    } catch (error) {
        console.error('Error al obtener pedido:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear un nuevo pedido
exports.createPedido = async (req, res) => {
  try {
    const { user_id, total, status, items } = req.body;

    if (!user_id || !total || !status || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear el pedido
    const nuevoPedido = await queries.createPedido(user_id, total, status);

    // Agregar los items del pedido
    for (const item of items) {
      await queries.addPedidoItem(nuevoPedido.id, item.product_id, item.quantity, item.customizations);
    }

    res.status(201).json({ message: 'Pedido creado correctamente', pedido: nuevoPedido });
  } catch (error) {
    console.error('Error al crear pedido:', error.message);
    res.status(500).json({ error: error.message }); // Devuelve el mensaje de error específico
  }
};
// Actualizar el estado de un pedido
exports.updatePedidoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const pedidoActualizado = await queries.updatePedidoStatus(id, status);

        if (!pedidoActualizado) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.status(200).json(pedidoActualizado);
    } catch (error) {
        console.error('Error al actualizar estado del pedido:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un pedido
exports.deletePedido = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await queries.deletePedido(id);

        if (!eliminado) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.status(200).json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar pedido:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};