const queries = require('../queries/usuarioQueries');

// Controlador para el login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar que se proporcionen correo electrónico y contraseña
    if (!email || !password) {
      return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios' });
    }

    // Verificar las credenciales del usuario
    const user = await queries.verifyUser(email, password);

    // Si no se encuentra el usuario o las credenciales son incorrectas
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Devolver el rol del usuario para usarlo en el frontend
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};