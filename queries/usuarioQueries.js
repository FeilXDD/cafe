const supabase = require('../config/database');

// Obtener todos los usuarios
const getAllUsuarios = async () => {
  try {
    const { data, error } = await supabase
      .from('Usuarios')
      .select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('Usuarios')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo usuario
const createUsuario = async (name, email, password_hash, role, phone, address) => {
  try {
    const { data, error } = await supabase
      .from('Usuarios')
      .insert([{ name, email, password_hash, role, phone, address }])
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar un usuario
const updateUsuario = async (id, name, email, password_hash, role, phone, address) => {
  try {
    const { data, error } = await supabase
      .from('Usuarios')
      .update({ name, email, password_hash, role, phone, address })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Eliminar un usuario
const deleteUsuario = async (id) => {
  try {
    const { error } = await supabase
      .from('Usuarios')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    throw error;
  }
};

// Verificar credenciales de un usuario
const verifyUser = async (email, password) => {
  try {
    const { data, error } = await supabase
      .from('Usuarios')
      .select('*')
      .eq('email', email)
      .eq('password_hash', password)
      .single();

    if (error) throw error;
    return data; // Retorna el usuario si las credenciales son válidas
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  verifyUser, // Exportar la función para verificar credenciales
};