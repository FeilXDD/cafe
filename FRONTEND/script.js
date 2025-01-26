// URL base del backend
const API_URL = 'http://localhost:3000/api';

// Elementos del DOM
const categoriaForm = document.getElementById('categoriaForm');
const categoriasList = document.getElementById('categoriasList');

// Función para cargar y mostrar las categorías
async function cargarCategorias() {
  try {
    const response = await fetch(`${API_URL}/categorias`);
    if (!response.ok) {
      throw new Error('Error al cargar las categorías');
    }
    const categorias = await response.json();

    // Limpiar la lista antes de agregar las categorías
    categoriasList.innerHTML = '';

    // Mostrar las categorías en la lista
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

// Función para agregar una nueva categoría
async function agregarCategoria(event) {
  event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;

  try {
    const response = await fetch(`${API_URL}/categorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, descripcion }),
    });

    if (!response.ok) {
      throw new Error('Error al agregar la categoría');
    }

    // Limpiar el formulario
    categoriaForm.reset();

    // Recargar la lista de categorías
    cargarCategorias();
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudo agregar la categoría');
  }
}

// Evento para enviar el formulario
categoriaForm.addEventListener('submit', agregarCategoria);

// Cargar las categorías al iniciar la página
cargarCategorias();