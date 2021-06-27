const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');
const redirect = 0;

cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => {
        compra.eliminarProducto(e)
    });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => {
        compra.obtenerEvento(e)
    });
    carrito.addEventListener('keyup', (e) => {
        compra.obtenerEvento(e)
    });


}

function procesarCompra() {
    // e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2000
        })
    } else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: true,
            timer: 15000
        })
    } else {
        localStorage.clear();
        Swal.fire({
            title: 'Su pedido',
            text: 'esta en proceso',
            text: 'y llegara en unos momentos',
            showConfirmButton: true,
            timer: 15000
        }).then((result) => {
            if (result.isConfirmed) {
             
                location.href = "Menu.html"
              }
            })
     
     


    }

    function redireccionar() {
        location.href = "Menu.html"
    }

}