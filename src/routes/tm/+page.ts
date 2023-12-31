import type { PageLoad } from "../$types";
import { tmReadable } from "../../stores/tmStore";

// Función para obtener objetos aleatorios sin repetición
function obtenerObjetosAleatorios(array: Array<object>, cantidad:number) {
    if (cantidad > array.length) {
      console.error("La cantidad solicitada es mayor que la longitud del array");
      return null;
    }
  
    // Copia el array para no modificar el original
    var arrayCopiado = array.slice();
  
    // Almacena los objetos seleccionados aleatoriamente
    var objetosAleatorios = [];
  
    for (var i = 0; i < cantidad; i++) {
      // Genera un índice aleatorio basado en la longitud del array copiado
      var indiceAleatorio = Math.floor(Math.random() * arrayCopiado.length);
  
      // Agrega el objeto aleatorio a la lista y elimínalo del array copiado
      objetosAleatorios.push(arrayCopiado.splice(indiceAleatorio, 1)[0]);
    }
  
    return objetosAleatorios;
  }


let tm_mb;

export const load: PageLoad =  ({ params, url }) =>{
    const obtenerMiembros = tmReadable.subscribe((item) =>{

    tm_mb = item;
    });
    obtenerMiembros();


    let slugObtenido = (url.pathname);
    let partes = slugObtenido.split('/');
    let palabra = partes[partes.length - 1]; // Obtener la última parte
    let palabrasSeparadas = palabra.split('-');

    
    let pathFinal = palabrasSeparadas.map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');

    
    return {
        page:{  path: pathFinal, },
    dataJSON: tm_mb,
    // experiencias: experiencias
} 
}