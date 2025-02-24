const queries = require('../queries/categoriaQueries.js');

// Obtener todas las categorías
exports.getCategorias = async (req, res) => {
  try {
    const categorias = await queries.getAllCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener una categoría por ID
exports.getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await queries.getCategoriaById(id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.status(200).json(categoria);
  } catch (error) {
    console.error('Error al obtener categoría:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear una nueva categoría
exports.createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, url_img } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
    }

    const nuevaCategoria = await queries.createCategoria(nombre, descripcion, url_img);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error('Error al crear categoría:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar una categoría
exports.updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, url_img } = req.body;

    const categoriaActualizada = await queries.updateCategoria(id, nombre, descripcion, url_img);

    if (!categoriaActualizada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.status(200).json(categoriaActualizada);
  } catch (error) {
    console.error('Error al actualizar categoría:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar una categoría
exports.deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminado = await queries.deleteCategoria(id);

    if (!eliminado) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};