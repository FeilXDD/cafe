const productoQueries = require('../queries/productos.js');

exports.getProductosByCategoria = async (req, res) => {
  const { categoriaId } = req.params;
  try {
    const productos = await productoQueries.getProductosByCategoria(categoriaId);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProducto = async (req, res) => {
  const { nombre, descripcion, precio, categoriaId } = req.body;
  try {
    const id = await productoQueries.createProducto(nombre, descripcion, precio, categoriaId);
    res.status(201).json({ id, nombre, descripcion, precio, categoriaId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoriaId } = req.body;
  try {
    await productoQueries.updateProducto(id, nombre, descripcion, precio, categoriaId);
    res.json({ message: 'Producto actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await productoQueries.deleteProducto(id);
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};