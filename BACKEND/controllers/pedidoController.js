const pedidoQueries = require('../queries/pedidos');
const carritoQueries = require('../queries/carrito');

//exporta una funcion que me pide clienteId, si lo trae me crea el pedido llamando a la funcion crearpedido
//me obtiene el pedido con sus productos
//me agrega el contenido del carrito al pedido(me busca el carrito por id cliente me agrega el id del producto y la cantidad)
//me lo asocia me diante el id del pedido y me agrega el contenido del pedido
//me vacia el carrito
exports.realizarPedido = async (req, res) => {
  const { clienteId } = req.body;
  try {
    const pedidoId = await pedidoQueries.crearPedido(clienteId);
    const carrito = await carritoQueries.obtenerCarritoPorCliente(clienteId);
    const detalles = carrito.map(({ productoId, cantidad }) => ({ productoId, cantidad }));
    await pedidoQueries.agregarDetallesPedido(pedidoId, detalles);
    await carritoQueries.vaciarCarrito(clienteId);
    res.status(201).json({ message: 'Pedido realizado correctamente.', pedidoId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//exporta una funcion que me trae todos los pedidos
exports.obtenerPedidosPendientes = async (req, res) => {
  try {
    const pedidos = await pedidoQueries.obtenerPedidosPendientes();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//exporta una funcion que pide el id de pedido y lo quita de los pedidos pendientes
exports.marcarPedidoComoCompletado = async (req, res) => {
  const { pedidoId } = req.params;
  try {
    await pedidoQueries.marcarPedidoComoCompletado(pedidoId);
    res.json({ message: 'Pedido marcado como completado.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};