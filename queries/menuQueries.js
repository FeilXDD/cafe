const supabase = require('../config/database');

// Obtener todos los productos del menú
const getAllProductos = async () => {
    try {
        const { data, error } = await supabase
            .from('Menu')
            .select('*');
        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
};

// Obtener un producto por ID
const getProductoById = async (id) => {
    try {
        const { data, error } = await supabase
            .from('Menu')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
};

// Crear un nuevo producto
const createProducto = async (name, description, price, categoria_id, image_url, ingredients, available) => {
    try {
      const { data, error } = await supabase
        .from('Menu')
        .insert([{ name, description, price, categoria_id, image_url, ingredients, available }])
        .select(); // Retorna el registro insertado
  
      if (error) throw error;
      return data[0];
    } catch (error) {
      throw error;
    }
  };

// Actualizar un producto
const updateProducto = async (id, name, description, price, category, image_url, ingredients, available) => {
    try {
        const { data, error } = await supabase
            .from('Menu')
            .update({ name, description, price, category, image_url, ingredients, available })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    } catch (error) {
        throw error;
    }
};

// Eliminar un producto
const deleteProducto = async (id) => {
    try {
        const { error } = await supabase
            .from('Menu')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    } catch (error) {
        throw error;
    }
};

// Obtener productos por categoría
const getProductosByCategoria = async (categoria) => {
    try {
        const { data, error } = await supabase
            .from('Menu')
            .select('*')
            .eq('category', categoria);
        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    getProductosByCategoria,
};