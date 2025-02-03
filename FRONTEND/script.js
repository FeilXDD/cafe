// URL base del backend
const API_URL = 'http://localhost:3000/api';

const categoriasList = document.getElementById('categoriasList');
const categoriaForm = document.getElementById('categoriaForm');

// Función para cargar y mostrar las categorías
async function cargarCategorias() {
  try {
    //trae las categorias
    const response = await fetch(`${API_URL}/categorias`);
    //valida si hay un error
    if (!response.ok) {
      throw new Error('Error al cargar las categorías');
    }

    //parse la respuesta
    const categorias = await response.json();
    
    //vacia lo que hay en el formulario
    categoriasList.innerHTML = ''; 

    //carga todas las categorias
    categorias.forEach(categoria => {


      //Crear la tarjeta de la categoria
      const card = document.createElement('li');
      card.className = 'categoria-card';

      //Imagen de la categoría 
      const img = document.createElement('img');
      img.src = 'https://th.bing.com/th/id/OIP.3jOLKFwMNxHYenQHHN9GgQHaHa?rs=1&pid=ImgDetMain'; // Reemplaza con la URL de la imagen real
      img.alt = categoria.nombre;

      //Contenido de la tarjeta
      const content = document.createElement('div');
      content.className = 'content';

      //Nombre de la categoria
      const title = document.createElement('h3');
      title.textContent = categoria.nombre;

      //Descripcion de la categoria
      const description = document.createElement('p');
      description.textContent = categoria.descripcion || 'Sin descripción';

      // Botones de acciones
      const actions = document.createElement('div');
      actions.className = 'actions';

      //Creamos los botones
      const btnEditar = document.createElement('button');
      
      //Boton editar  
      btnEditar.textContent = 'Editar';
      btnEditar.className = 'btn-editar';

      // al momento de dar click sobre el boton me va a rellenar los campos del formulario 
      btnEditar.onclick = () => {
        document.getElementById('nombre').value = categoria.nombre;
        document.getElementById('descripcion').value = categoria.descripcion || '';

        //me guarda el ID que se esta modificando y se carga ña modificacion
        categoriaForm.dataset.categoriaId = categoria.id; 
      };

      //Boton eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.className = 'btn-eliminar';
      
      //hace una peticion para eliminar la categoria mediante el id y si es exitosa me sale una alerta diciendo que fue
      //exitosa y me recarga las categorias y si no me muestra un alerta diciendo que fallo
      btnEliminar.onclick = async () => {
        try {
          const deleteResponse = await fetch(`${API_URL}/categorias/${categoria.id}`, {
            method: 'DELETE',
          });
          if (!deleteResponse.ok) {
            throw new Error('Error al eliminar la categoría');
          }
          alert('Categoría eliminada correctamente');
          cargarCategorias();
        } catch (error) {
          console.error('Error:', error);
          alert('No se pudo eliminar la categoría');
        }
      };

      //Boton para ir a otra paguina 
      //esta en pruebas solo arroja un alert y trae el nombre de la categoria
      const btnVerProductos = document.createElement('button');
      btnVerProductos.textContent = 'Ver Productos';
      btnVerProductos.className = 'btn-ver-productos';
      btnVerProductos.onclick = () => {
        alert(categoria.nombre);
      };
      
      //me agrega los botones a la tarjeta
      actions.appendChild(btnEditar);
      actions.appendChild(btnEliminar);
      actions.appendChild(btnVerProductos);

      //me agrega elementos a la tarjeta
      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(actions);

      //me agrega la imagen y el contenido en un div
      card.appendChild(img);
      card.appendChild(content);

      // Agregar la tarjeta a la lista
      categoriasList.appendChild(card);
    });

    //si no se pudo cargar las categorias me arroja un error
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudieron cargar las categorías');
  }
}

// Cargar las categorías al iniciar la página
cargarCategorias();

//formulario para agregar o actualizar una categoría
categoriaForm.addEventListener('submit', async (event) => {
  //no deja que la paguina se recarge
  event.preventDefault(); 

  //obtiene los valores en el formulario y me valida si hay un id
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const categoriaId = categoriaForm.dataset.categoriaId;

  try {

    let response;
    // si hay un id enviamos una solicitud para modificar por el id
    if (categoriaId) {
      
      response = await fetch(`${API_URL}/categorias/${categoriaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, descripcion }),
      });
      //si no hay realizamos una solicitud para crearla
    } else {
      response = await fetch(`${API_URL}/categorias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, descripcion }),
      });
    }

    //verifica si procede la solicitud
    if (!response.ok) {
      throw new Error('Error al guardar la categoría');
    }

    //se muestra una alerta se limpia el formulario y se elimina el id si existe y recarga las categorias
    alert(categoriaId ? 'Categoría actualizada correctamente' : 'Categoría agregada correctamente');
    categoriaForm.reset(); 
    delete categoriaForm.dataset.categoriaId; 
    cargarCategorias(); 
  
    //muestra un error si falla 
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudo guardar la categoría');
  }
});