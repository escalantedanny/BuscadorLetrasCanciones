import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formularioBusqueda.addEventListener('submit', (e) => {
   e.preventDefault();

   const artista = document.querySelector('#artista').value,
         cancion = document.querySelector('#cancion').value;

   if (artista === '' || cancion === ''){
       // el usuario deja los campos vacios y muestra un error
       UI.divMensaje.innerHTML = 'Ambos campos son obligatorios';
       UI.divMensaje.classList.add('error');
       setTimeout( () => {
           UI.divMensaje.innerHTML = '';
           UI.divMensaje.classList.remove('error');
       },3000)
   } else {
       // traemos la informacion con la API
       const api = new API(artista, cancion);
       api.consultarAPI()
           .then(data => {
               if(data.respuesta.lyrics){
                    // la cancion si existe
                   const letra = data.respuesta.lyrics;
                   UI.divResultado.textContent = letra;
               }else{
                   // la cancion no existe
                   UI.divMensaje.innerHTML = 'No existe letra de la cancion Pueba con otra busqueda';
                   UI.divMensaje.classList.add('error');
                   setTimeout( () => {
                       UI.divMensaje.innerHTML = '';
                       UI.divMensaje.classList.remove('error');
                       UI.formularioBusqueda.reset();
                       UI.divResultado.innerHTML = '';
                   },3000)
               }
           });
    }
});