//importa la query de categorias para poder utilizarla en el controlador
const { getAllCategorias } = require('../queries/categorias')  

//funcion asincronica que obtiene todas las categorias de la base de datos
// y las devuelve en un objeto json con un status 200 si todo sale bien
// y si no se devuelve un mensaje de error con un status 500
//usando el metodo req y res de express ya que es el metodo req el que se encarga
//de recibir la peticion del cliente y el metodo res el que se encarga de enviar la respuesta
const getCategorias = async (req, res) => {
  try {
    const categorias = await getAllCategorias() 
    res.status(200).json(categorias) 
  } catch (error) {
    res.status(500).json({ message: error.message }) 
  }
} 

//exporta el modulo para que pueda ser utilizado en otro archivo
module.exports = {
  getCategorias,
} 