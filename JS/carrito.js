//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Funcion de aparecer y desaparecer carrito
function CarritoAD() {
    if (carritoVisible==false) {
        hacerVisibleCarrito();
    } else {
        ocultarCarrito();
    }
}

//Esperemos que la pagina cargue todas las imagenes 
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    //Agregamos funcionalidad a los boton de eliminar carrito
    var btnEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < btnEliminarItem.length; i++) {
        var button = btnEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //Agrego funcionabilidad al boton de sumar cantidad
    var btnSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < btnSumarCantidad.length; i++) {
        var button = btnSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //Agrego funcionalidad al boton de restar cantidad
    var btnRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < btnRestarCantidad.length; i++) {
        var button = btnRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Agregamos funcionalidad al boton de agregar carrito desde tienda
    var btnAgregarcarritoTienda = document.getElementsByClassName('add-btn');
    for (var i = 0; i < btnAgregarcarritoTienda.length; i++) {
        var button = btnAgregarcarritoTienda[i];
        button.addEventListener('click', agregarAlCarritoClicktienda);
    }

    //Agregamos funcionalidad al boton de agregar carrito desde producto
    var btnAgregarcarritoProducto = document.getElementsByClassName('add-cart-btn');
    for (var i = 0; i < btnAgregarcarritoProducto.length; i++) {
        var button = btnAgregarcarritoProducto[i];
        button.addEventListener('click', agregarAlCarritoClickProducto);
    }

    //Agregamos funcionalidad al boton de comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClick)

}

function actualizarCantidadDeVinilos() {
    var items = document.getElementsByClassName('carrito-item-cantidad');
    var cantidadTotal = 0;
  
    for (var i = 0; i < items.length; i++) {
      cantidadTotal += parseInt(items[i].value);
    }
  
    document.getElementById('cart-count').innerText = cantidadTotal;
  }

function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
    actualizarCantidadDeVinilos();
}

function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
        actualizarCantidadDeVinilos();
    }
}

function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();
    actualizarCantidadDeVinilos();
}

function agregarItemCarritoProducto(titulo, precio, imagenSrc, cantidad) {
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Controlamos que el item que intenta ingresar no se encuentre actualmente en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    console.log(nombresItemsCarrito);
    for (var i = 0; i < nombresItemsCarrito.length; i++) {        
        if (nombresItemsCarrito[i].innerText.trim().toLowerCase() === titulo.trim().toLowerCase()) {            
            alert("El vinilo ya se encuentra en el carrito");            
            return;        
        }    
    }
    

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="${cantidad}" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Agregamos cada funcionalidad a cada Item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    // Actualizamos total
    actualizarTotalCarrito();
}

function agregarItemCarritoTienda(titulo, precio, imagenSrc, cantidad) {
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Controlamos que el item que intenta ingresar no se encuentre actualmente en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    console.log(nombresItemsCarrito);
    for (var i = 0; i < nombresItemsCarrito.length; i++) {        
        if (nombresItemsCarrito[i].innerText.trim().toLowerCase() === titulo.trim().toLowerCase()) {            
            alert("El vinilo ya se encuentra en el carrito");            
            return;        
        }    
    }
    

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="${cantidad}" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Agregamos cada funcionalidad a cada Item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    // Actualizamos total
    actualizarTotalCarrito();
}

function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';
}

function ocultarCarrito() {
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '-100%';
    carrito.style.opacity = '0';
    carritoVisible = false;
}

function actualizarTotalCarrito() {
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //Quitamos el simbolo de la moneda y separamos el precio por el punto
        var precio = parseFloat(precioElemento.innerText.replace('S/', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad)
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'S/' + total.toLocaleString("es");
}

//Funciona
function pagarClick() {
    alert("Gracias por su Compra");
    //Elimino todos los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    actualizarCantidadDeVinilos();
}
  
//Funciona
function agregarAlCarritoClicktienda(event) {
    // Evita que el clic en el botón active el enlace
    event.stopPropagation();
    event.preventDefault();
    var button = event.target;
    var item = button.closest('.card');
    var titulo = item.getElementsByClassName('card-title')[0].innerText;
    var precio = item.getElementsByClassName('card-prec')[0].innerText;
    var img = item.getElementsByClassName('card-img-top')[0].src;
    agregarItemCarritoTienda(titulo, precio, img, 1);
    actualizarCantidadDeVinilos();
}

//Funciona
function agregarAlCarritoClickProducto(event) {
    var button = event.target;
    var item = button.closest('.contenido-producto');
    var titulo = item.getElementsByClassName('name-disco')[0].innerText;
    var precio = item.getElementsByClassName('precio-unitario')[0].innerText;
    var cantidad = item.getElementsByClassName('cantidad')[0].value;
    var imagenSrc = item.getElementsByClassName('img-fluid')[0].src;
    agregarItemCarritoProducto(titulo, precio, imagenSrc, cantidad);
    actualizarCantidadDeVinilos();
}
