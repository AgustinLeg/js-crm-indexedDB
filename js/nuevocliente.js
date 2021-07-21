(function(){
    let DB;
    const formulario = document.querySelector('#formulario');

    
    document.addEventListener('DOMContentLoaded',()=>{
        conectarDB();
        formulario.addEventListener('submit',validarCliente);
    })


    
    function validarCliente(e){
        e.preventDefault();
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        
        if( nombre.value === '' || email.value === '' || telefono.value === '' || empresa.value === '' ) {
            imprimirAlerta('Todos los campos son Obligatorios', 'error')
    
            return;
        }
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }
       crearNuevoCliente(cliente)
    
       
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

    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(['crm'],'readwrite');
    
        const objectStore = transaction.objectStore('crm');
    
        objectStore.add(cliente);
    
        transaction.onerror= () =>{
            imprimirAlerta('Hubo un error','error');
        }
        transaction.oncomplete = ()=>{
            console.log('cliente agregada')
    
            imprimirAlerta('Agregado Correctamente');
            
            setTimeout(() => {
                window.location.href = 'index.html'
        
            }, 1500);
        }
    }

}())



