(function(){
    let DB;
    let idCliente;
    const inputNombre = document.querySelector('#nombre');
    const inputEmail = document.querySelector('#email');
    const inputTelefono = document.querySelector('#telefono');
    const inputEmpresa = document.querySelector('#empresa');

    const formulario = document.querySelector('#formulario');
    
    document.addEventListener('DOMContentLoaded', ()=>{
        conectarDB();

        formulario.addEventListener('submit',actualizarCliente)
        
        const parametrosURL = new URLSearchParams(window.location.search)
        idCliente = parametrosURL.get('id');
        if(idCliente){
            setTimeout(function(){
                obtenerCliente(idCliente);
            },100)
        }
    });
    function obtenerCliente(id){
        const transaction = DB.transaction(['crm'],'readonly');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function(e){
            const cursor = e.target.result;
            if(cursor){
                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value)
                }
            }
        }
        
    }


    function actualizarCliente(e){
        e.preventDefault();
        if( inputNombre.value === '' || inputEmail.value === '' || inputTelefono.value === '' || inputEmpresa.value === '' ) {
            imprimirAlerta('Todos los campos son Obligatorios', 'error')    
            return;
        }

        const clienteActualizado = {
            nombre: inputNombre.value,
            email: inputEmail.value,
            telefono: inputTelefono.value,
            empresa: inputEmpresa.value,
            id: Number(idCliente)
        }

        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.put(clienteActualizado)

        transaction.oncomplete = function(){
            imprimirAlerta('Editado Correctamente');
            setTimeout(function(){
                window.location.href = 'index.html';
            },1500)
        }
        transaction.onerror = function(){
            imprimirAlerta('Error..','error');
        }
        
    }

    function llenarFormulario(datosCliente){
        const {nombre,email,telefono,empresa} = datosCliente;
        inputNombre.value = nombre;
        inputEmail.value = email;
        inputTelefono.value = telefono;
        inputEmpresa.value = empresa;
    }
    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm',1);
    
        abrirConexion.onerror = function(){
            console.log('Hubo un error');
        }
    
        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        }
        
    }
          
}());