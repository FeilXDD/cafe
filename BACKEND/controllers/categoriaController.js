const categoriaQueries = require('../queries/categorias.js');

exports.getAllCategorias = async (req, res) => {
  try {
    const categorias = await categoriaQueries.getAllCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const id = await categoriaQueries.createCategoria(nombre, descripcion);
    res.status(201).json({ id, nombre, descripcion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    await categoriaQueries.updateCategoria(id, nombre, descripcion);
    res.json({ message: 'Categoría actualizada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    await categoriaQueries.deleteCategoria(id);
    res.json({ message: 'Categoría eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};