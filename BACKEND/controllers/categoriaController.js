const { getAllCategorias, addCategoria, deleteCategoria, updateCategoria } = require('../queries/categorias');

// Función para obtener todas las categorías
const getCategorias = async (req, res) => {
  try {
    const categorias = await getAllCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para agregar una nueva categoría
const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    const newCategoria = await addCategoria(nombre, descripcion);
    res.status(201).json(newCategoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para eliminar una categoría
const removeCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCategoria(id);
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para actualizar una categoría
const editCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    const updatedCategoria = await updateCategoria(id, nombre, descripcion);
    res.status(200).json(updatedCategoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exporta las funciones
module.exports = {
  getCategorias,
  createCategoria,
  removeCategoria,
  editCategoria,
};