const supabase = require('../config/database');

// Obtener todos los carritos
const getAllCarritos = async () => {
    try {
        const { data, error } = await supabase
            .from('Carrito')
            .select('*');
        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
};

// Obtener carrito por ID de usuario
const getCarritoByUserId = async (user_id) => {
    try {
        const { data, error } = await supabase
            .from('Carrito')
            .select('*')
            .eq('user_id', user_id);
        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
};

// Agregar un producto al carrito
const addToCarrito = async (user_id, product_id, quantity, customizations) => {
    try {
        const { data, error } = await supabase
            .from('Carrito')
            .insert([{ user_id, product_id, quantity, customizations }])
            .select();
        if (error) throw error;
        return data[0];
    } catch (error) {
        throw error;
    }
};

// Actualizar un producto en el carrito
const updateCarritoItem = async (id, quantity, customizations) => {
    try {
        const { data, error } = await supabase
            .from('Carrito')
            .update({ quantity, customizations })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    } catch (error) {
        throw error;
    }
};

// Eliminar un producto del carrito
const deleteCarritoItem = async (id) => {
    try {
        const { error } = await supabase
            .from('Carrito')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllCarritos,
    getCarritoByUserId,
    addToCarrito,
    updateCarritoItem,
    deleteCarritoItem,
};