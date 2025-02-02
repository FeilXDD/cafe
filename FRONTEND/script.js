// URL base del backend
const API_URL = 'http://localhost:3000/api';

const categoriasList = document.getElementById('categoriasList');
const categoriaForm = document.getElementById('categoriaForm');

// Función para cargar y mostrar las categorías
async function cargarCategorias() {
  try {
    const response = await fetch(`${API_URL}/categorias`);
    if (!response.ok) {
      throw new Error('Error al cargar las categorías');
    }
    const categorias = await response.json();
    categoriasList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas categorías

    categorias.forEach(categoria => {


      // Crear la tarjeta de la categoría
      const card = document.createElement('li');
      card.className = 'categoria-card';

      // Imagen de la categoría (puedes usar una imagen predeterminada o dinámica)
      const img = document.createElement('img');
      img.src = 'https://th.bing.com/th/id/OIP.3jOLKFwMNxHYenQHHN9GgQHaHa?rs=1&pid=ImgDetMain'; // Reemplaza con la URL de la imagen real
      img.alt = categoria.nombre;

      // Contenido de la tarjeta
      const content = document.createElement('div');
      content.className = 'content';

      const title = document.createElement('h3');
      title.textContent = categoria.nombre;

      const description = document.createElement('p');
      description.textContent = categoria.descripcion || 'Sin descripción';

      // Botones de acciones
      const actions = document.createElement('div');
      actions.className = 'actions';

      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.className = 'btn-editar';
      btnEditar.onclick = () => {
        document.getElementById('nombre').value = categoria.nombre;
        document.getElementById('descripcion').value = categoria.descripcion || '';
        categoriaForm.dataset.categoriaId = categoria.id; // Guardar el ID de la categoría a editar
      };

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.className = 'btn-eliminar';
      btnEliminar.onclick = async () => {
        try {
          const deleteResponse = await fetch(`${API_URL}/categorias/${categoria.id}`, {
            method: 'DELETE',
          });
          if (!deleteResponse.ok) {
            throw new Error('Error al eliminar la categoría');
          }
          alert('Categoría eliminada correctamente');
          cargarCategorias(); // Recargar la lista después de eliminar
        } catch (error) {
          console.error('Error:', error);
          alert('No se pudo eliminar la categoría');
        }
      };

      const btnVerProductos = document.createElement('button');
      btnVerProductos.textContent = 'Ver Productos';
      btnVerProductos.className = 'btn-ver-productos';
      btnVerProductos.onclick = () => {
        alert(`Mostrando productos de la categoría: ${categoria.nombre}`);
        // Aquí puedes redirigir a otra página o mostrar los productos
      };

      actions.appendChild(btnEditar);
      actions.appendChild(btnEliminar);
      actions.appendChild(btnVerProductos);

      // Agregar elementos a la tarjeta
      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(actions);

      card.appendChild(img);
      card.appendChild(content);

      // Agregar la tarjeta a la lista
      categoriasList.appendChild(card);
    });
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudieron cargar las categorías');
  }
}

// Cargar las categorías al iniciar la página
cargarCategorias();

// Manejador del formulario para agregar o actualizar una categoría
categoriaForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitar que el formulario recargue la página

  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const categoriaId = categoriaForm.dataset.categoriaId;

  try {
    let response;
    if (categoriaId) {
      // Si hay un ID, estamos editando una categoría existente
      response = await fetch(`${API_URL}/categorias/${categoriaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, descripcion }),
      });
    } else {
      // Si no hay ID, estamos creando una nueva categoría
      response = await fetch(`${API_URL}/categorias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, descripcion }),
      });
    }

    if (!response.ok) {
      throw new Error('Error al guardar la categoría');
    }

    alert(categoriaId ? 'Categoría actualizada correctamente' : 'Categoría agregada correctamente');
    categoriaForm.reset(); // Limpiar el formulario
    delete categoriaForm.dataset.categoriaId; // Eliminar el ID de edición
    cargarCategorias(); // Recargar la lista después de agregar/editar
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudo guardar la categoría');
  }
});