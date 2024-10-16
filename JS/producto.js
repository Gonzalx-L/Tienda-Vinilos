function subir(){
    let cantidad=document.getElementById('cantidad');
    let cantidadnueva=parseInt(cantidad.value);
    cantidad.value=cantidadnueva+1;
}
function bajar(){
    let cantidad=document.getElementById('cantidad');
    let cantidadnueva=parseInt(cantidad.value);
    if(cantidadnueva>1){
        cantidad.value=cantidadnueva-1;
    }
}
/*Funcion boton del lado A y B*/
function activateButton(button) {
    const btnA = document.getElementById('btnLadoA');
    const btnB = document.getElementById('btnLadoB');

    if (button === 'A') {
        btnA.classList.add('active');
        btnB.classList.remove('active');
    } else if (button === 'B') {
        btnA.classList.remove('active');
        btnB.classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    activateButton('A');
});