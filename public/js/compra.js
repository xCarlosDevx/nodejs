const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const direccion = document.getElementById('direccion');
const subtotal = document.getElementById('subtotal');
const igv = document.getElementById('igv');
const total = document.getElementById('total');
const redirect = 0;

cargarEventos();

function cargarEventos() {
  document.addEventListener(
    'DOMContentLoaded',
    compra.leerLocalStorageCompra()
  );

  //Eliminar productos del carrito
  carrito.addEventListener('click', (e) => {
    compra.eliminarProducto(e);
  });

  compra.calcularTotal();

  //cuando se selecciona procesar Compra
  procesarCompraBtn.addEventListener('click', procesarCompra);

  carrito.addEventListener('change', (e) => {
    compra.obtenerEvento(e);
  });
  carrito.addEventListener('keyup', (e) => {
    compra.obtenerEvento(e);
  });
}

function procesarCompra() {
  // e.preventDefault();
  if (compra.obtenerProductosLocalStorage().length === 0) {
    Swal.fire({
      title: 'Oops...',
      text: 'No hay productos, selecciona alguno',
      showConfirmButton: false,
      timer: 2000,
    });
  } else if (!cliente.value || !direccion.value) {
    Swal.fire({
      title: 'Oops...',
      text: 'Ingrese todos los campos requeridos',
      showConfirmButton: true,
      timer: 15000,
    });
  } else {
    const productos = JSON.parse(localStorage.getItem('productos'));
    const user = JSON.parse(localStorage.getItem('user_with_token'));
    let bodyRequest = {
      pedidos: productos,
      direccion: direccion.value,
    };

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/pedidos');
      xhr.setRequestHeader('x-auth-token', user.token);
      xhr.setRequestHeader('content-type', 'application/json')
      xhr.onload = function () {
        let response = JSON.parse(this.response);
        if (response.status == 'error') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.msg}`.toUpperCase(),
          });
        }
        localStorage.removeItem('productos');
        Swal.fire({
          title: 'Su pedido',
          text: 'esta en proceso',
          text: 'y llegara en unos momentos',
          showConfirmButton: true,
          timer: 15000,
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = 'Menu.html';
          }
        });
      };
      xhr.send(JSON.stringify(bodyRequest));
    } catch (error) {
      console.log(error);
    }
  }

  function redireccionar() {
    location.href = 'Menu.html';
  }
}
