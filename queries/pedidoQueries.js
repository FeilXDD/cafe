const supabase = require('../config/database');

// Obtener todos los pedidos
const getAllPedidos = async () => {
    try {
        const { data, error } = await supabase
            .from('Pedidos')
            .select('*');
        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
};

// Obtener un pedido por ID
const getPedidoById = async (id) => {
    try {
        const { data, error } = await supabase
            .from('Pedidos')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
};

// Crear un nuevo pedido
const createPedido = async (user_id, total, status) => {
    try {
      const { data, error } = await supabase
        .from('Pedidos')
        .insert([{ user_id, total, status }])
        .select(); // Retorna el registro insertado
  
      if (error) throw error;
      return data[0];
    } catch (error) {
      throw error;
    }
  };
  
  // Agregar items al pedido
  const addPedidoItem = async (pedido_id, product_id, quantity, customizations) => {
    try {
      const { data, error } = await supabase
        .from('Pedido_Items')
        .insert([{ pedido_id, product_id, quantity, customizations }])
        .select();
  
      if (error) throw error;
      return data[0];
    } catch (error) {
      throw error;
    }
  };
// Actualizar el estado de un pedido
const updatePedidoStatus = async (id, status) => {
    try {
        const { data, error } = await supabase
            .from('Pedidos')
            .update({ status })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    } catch (error) {
        throw error;
    }
};


// Eliminar un pedido
const deletePedido = async (id) => {
    try {
        const { error } = await supabase
            .from('Pedidos')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedidoStatus,
    deletePedido,
    addPedidoItem,
};