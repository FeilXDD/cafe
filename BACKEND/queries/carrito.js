const db = require('../config/database');

// Agregar producto al carrito pide id cliente,  id producto y cantidad
const agregarProductoAlCarrito = (clienteId, productoId, cantidad) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Carritos (clienteId, productoId, cantidad) VALUES (?, ?, ?)',
      [clienteId, productoId, cantidad],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

//obtiene el carrito de un cliente pide el id del cliente para traer todo su pedido
const obtenerCarritoPorCliente = (clienteId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT c.id, p.nombre, p.precio, c.cantidad 
       FROM Carritos c
       JOIN Productos p ON c.productoId = p.id
       WHERE c.clienteId = ?`,
      [clienteId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

//vacia el carrito del cliente y pide el id del cliente
const vaciarCarrito = (clienteId) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Carritos WHERE clienteId = ?', [clienteId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  agregarProductoAlCarrito,
  obtenerCarritoPorCliente,
  vaciarCarrito,
};