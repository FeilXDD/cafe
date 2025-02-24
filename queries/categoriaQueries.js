const supabase = require('../config/database');

// Obtener todas las categorías
const getAllCategorias = async () => {
  try {
    const { data, error } = await supabase
      .from('Categorias')
      .select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Obtener una categoría por ID
const getCategoriaById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('Categorias')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Crear una nueva categoría
const createCategoria = async (nombre, descripcion, url_img) => {
  try {
    const { data, error } = await supabase
      .from('Categorias')
      .insert([{ nombre, descripcion, url_img }])
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar una categoría
const updateCategoria = async (id, nombre, descripcion, url_img) => {
  try {
    const { data, error } = await supabase
      .from('Categorias')
      .update({ nombre, descripcion, url_img })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Eliminar una categoría
const deleteCategoria = async (id) => {
  try {
    const { error } = await supabase
      .from('Categorias')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};