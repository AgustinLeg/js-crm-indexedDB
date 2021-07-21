function imprimirAlerta(mensaje,tipo){
    const divMensaje = document.createElement('div');

    divMensaje.classList.add('mx-auto','max-w-lg','text-center','px-4','py-3','rouded','mt-6');
    divMensaje.textContent = mensaje;

    if(tipo === 'error') {
        divMensaje.classList.add('bg-red-100','border','border-red-400','text-red-700','alerta');
        
   } else {
        divMensaje.classList.add('bg-green-100','border','border-green-400','text-green-700');
   }
    
    if(!document.querySelector('.alerta')){

        formulario.insertBefore(divMensaje,formulario.querySelector('input[type="submit"]'))
    }

    setTimeout(() => {
        divMensaje.remove();
    }, 3000);
}