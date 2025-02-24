const queries = require('../queries/usuarioQueries.js');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await queries.getAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await queries.getUsuarioById(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    try {
        const { name, email, password_hash, role, phone, address } = req.body;

        if (!name || !email || !password_hash || !role) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevoUsuario = await queries.createUsuario(name, email, password_hash, role, phone, address);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password_hash, role, phone, address } = req.body;

        const usuarioActualizado = await queries.updateUsuario(id, name, email, password_hash, role, phone, address);

        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(usuarioActualizado);
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await queries.deleteUsuario(id);

        if (!eliminado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};