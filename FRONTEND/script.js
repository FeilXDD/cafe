// URL base del backend
const API_URL = 'http://localhost:3000/api';

const categoriasList = document.getElementById('categoriasList');

// Función para cargar y mostrar las categorías
async function cargarCategorias() {
  try {
    const response = await fetch(`${API_URL}/categorias`);
    if (!response.ok) {
      throw new Error('Error al cargar las categorías');
    }
    const categorias = await response.json();

    categoriasList.innerHTML = '';

    categorias.forEach(categoria => {
      const li = document.createElement('li');
      li.textContent = `${categoria.nombre}: ${categoria.descripcion || 'Sin descripción'}`;
      categoriasList.appendChild(li);
    });
    
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudieron cargar las categorías');
  }
}

// Cargar las categorías al iniciar la página
cargarCategorias();