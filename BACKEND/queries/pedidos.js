const db = require('../config/database');

//crea un pedido y pide el id del cliente
const crearPedido = (clienteId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Pedidos (clienteId) VALUES (?)',
      [clienteId],
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

//agrega los productos y pide la cantidad el id del producto y el id del pedido
const agregarDetallesPedido = (pedidoId, detalles) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      'INSERT INTO DetallesPedidos (pedidoId, productoId, cantidad) VALUES (?, ?, ?)'
    );
    detalles.forEach(({ productoId, cantidad }) => {
      stmt.run([pedidoId, productoId, cantidad], (err) => {
        if (err) {
          reject(err);
        }
      });
    });
    stmt.finalize(() => resolve());
  });
};

//obtiene todos los pedidos pendientes
const obtenerPedidosPendientes = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT p.id, p.clienteId, p.estado, p.fechaCreacion 
       FROM Pedidos p
       WHERE p.estado = 'pendiente'`,
      [],
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

//elimina el pedido de la lista de pedidos pendientes y pide el id del pedido
const marcarPedidoComoCompletado = (pedidoId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE Pedidos SET estado = "completado" WHERE id = ?',
      [pedidoId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports = {
  crearPedido,
  agregarDetallesPedido,
  obtenerPedidosPendientes,
  marcarPedidoComoCompletado,
};