// Obtener productos de la API

const carrito = new Carrito();

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://jsonblob.com/api/1303098329104506880')
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then(data => {
        console.log(data);
        cargarTabla(data.products);
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });




    function cargarTabla(productos){
        const tablaProductos = document.getElementById("tabla-productos");
    
        productos.forEach(producto => {
            const tr = document.createElement('tr');
            
            const tdId       = document.createElement('td');
            tdId.textContent = producto.id;

            const tdNombre       = document.createElement('td');
            tdNombre.textContent = producto.title;
    
            const tdPrecio       = document.createElement('td');
            tdPrecio.textContent = `${producto.currency || "$"} ${producto.price !== undefined ? producto.price.toFixed(2) : "0.00"}`;
    
            const btnAñadir = document.createElement('button');
            btnAñadir.classList.add('añadir');
            btnAñadir.setAttribute('data-title', producto.title);
            btnAñadir.setAttribute('data-precio', producto.price);
            btnAñadir.textContent = 'Añadir al carrito';

            btnAñadir.addEventListener('click', () => {
                carrito.actualizarUnidades(producto.title, 1, producto.price);
                actualizarTotal();
                console.log(carrito.obtenerCarrito());
            });

            const tdAccion = document.createElement('td');
            tdAccion.appendChild(btnAñadir);

            const imgEliminar = document.createElement('img');
            imgEliminar.src = 'assets/img/papelera.png'; 
            imgEliminar.alt = 'Eliminar';
            imgEliminar.classList.add('eliminar');
            imgEliminar.setAttribute('data-title', producto.title);
            imgEliminar.style.cursor = 'pointer'; 

            imgEliminar.addEventListener('click', (event) => {
                const title = event.target.getAttribute('data-title');
                carrito.actualizarUnidades(title, -1); // Restar 1 unidad del producto
                actualizarTotal(); // Actualizar el total después de eliminar
            });

            tdAccion.appendChild(imgEliminar);
            tr.append(tdId, tdNombre, tdPrecio, tdAccion);
            tablaProductos.appendChild(tr);
    
            
        });

        function actualizarTotal() {
            const listaCarrito = document.getElementById('lista-carrito');
            listaCarrito.innerHTML = '';
    
            for (let title in carrito.productos) {
                const { price, quantity } = carrito.productos[title];            
                const li = document.createElement('li');
                li.textContent = `${title} (x${quantity}) - Precio: ${carrito.currency} ${price.toFixed(2)}`;
                listaCarrito.appendChild(li);
            }
    
            
          
            const totalProducto = document.getElementById('total');
            totalProducto.textContent = `Total: ${carrito.currency} ${carrito.obtenerCarrito().total}`;
        }

    }
    
    
    

})