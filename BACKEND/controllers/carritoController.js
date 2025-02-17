const carritoQueries = require('../queries/carrito');

//exporta la funcion  y pide el clienteId, productoId, cantidad, si trae todo llama la funcion que agrega el producto al carrito
exports.agregarProductoAlCarrito = async (req, res) => {
  const { clienteId, productoId, cantidad } = req.body;
  try {
    await carritoQueries.agregarProductoAlCarrito(clienteId, productoId, cantidad);
    res.status(201).json({ message: 'Producto agregado al carrito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//exporta la funcion y pide clienteId , si trae el parametro llama a la funcion que me trae el carrito
exports.obtenerCarritoPorCliente = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const carrito = await carritoQueries.obtenerCarritoPorCliente(clienteId);
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//exporta la funcion y pide clienteId , si trae el parametro llama a la funcion que me vacia lo que hay dentro del carrito el carrito
exports.vaciarCarrito = async (req, res) => {
  const { clienteId } = req.params;
  try {
    await carritoQueries.vaciarCarrito(clienteId);
    res.json({ message: 'Carrito vaciado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};