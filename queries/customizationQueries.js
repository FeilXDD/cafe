const supabase = require('../config/database');

// Obtener todas las personalizaciones
const getAllCustomizations = async () => {
    try {
        const { data, error } = await supabase
            .from('Customizations')
            .select('*');
        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
};

// Obtener personalizaciones por ID de producto
const getCustomizationsByMenuId = async (menu_id) => {
    try {
        const { data, error } = await supabase
            .from('Customizations')
            .select('*')
            .eq('menu_id', menu_id);
        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
};

// Crear una nueva personalización
const createCustomization = async (menu_id, name, options) => {
    try {
        const { data, error } = await supabase
            .from('Customizations')
            .insert([{ menu_id, name, options }])
            .select();
        if (error) throw error;
        return data[0];
    } catch (error) {
        throw error;
    }
};

// Actualizar una personalización
const updateCustomization = async (id, menu_id, name, options) => {
    try {
        const { data, error } = await supabase
            .from('Customizations')
            .update({ menu_id, name, options })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    } catch (error) {
        throw error;
    }
};

// Eliminar una personalización
const deleteCustomization = async (id) => {
    try {
        const { error } = await supabase
            .from('Customizations')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllCustomizations,
    getCustomizationsByMenuId,
    createCustomization,
    updateCustomization,
    deleteCustomization,
};