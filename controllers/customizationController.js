const queries = require('../queries/customizationQueries.js');

// Obtener todas las personalizaciones
exports.getCustomizations = async (req, res) => {
    try {
        const customizations = await queries.getAllCustomizations();
        res.status(200).json(customizations);
    } catch (error) {
        console.error('Error al obtener personalizaciones:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener personalizaciones por ID de producto
exports.getCustomizationsByMenuId = async (req, res) => {
    try {
        const { menu_id } = req.params;
        const customizations = await queries.getCustomizationsByMenuId(menu_id);

        if (!customizations || customizations.length === 0) {
            return res.status(404).json({ error: 'No se encontraron personalizaciones para este producto' });
        }

        res.status(200).json(customizations);
    } catch (error) {
        console.error('Error al obtener personalizaciones por ID de producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear una nueva personalización
exports.createCustomization = async (req, res) => {
    try {
        const { menu_id, name, options } = req.body;

        if (!menu_id || !name || !options) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevaPersonalizacion = await queries.createCustomization(menu_id, name, options);
        res.status(201).json(nuevaPersonalizacion);
    } catch (error) {
        console.error('Error al crear personalización:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar una personalización
exports.updateCustomization = async (req, res) => {
    try {
        const { id } = req.params;
        const { menu_id, name, options } = req.body;

        const personalizacionActualizada = await queries.updateCustomization(id, menu_id, name, options);

        if (!personalizacionActualizada) {
            return res.status(404).json({ error: 'Personalización no encontrada' });
        }

        res.status(200).json(personalizacionActualizada);
    } catch (error) {
        console.error('Error al actualizar personalización:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar una personalización
exports.deleteCustomization = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await queries.deleteCustomization(id);

        if (!eliminado) {
            return res.status(404).json({ error: 'Personalización no encontrada' });
        }

        res.status(200).json({ message: 'Personalización eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar personalización:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};