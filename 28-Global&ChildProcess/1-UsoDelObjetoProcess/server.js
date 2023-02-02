/**
 * Enunciado
 * Realizar una app en Node.js que permita recibir como parámetros una cantidad ilimitada de números,
 * con los cuales debe confeccionar el siguiente objeto.
 * 
 * {
 *    datos: {
 *      numeros: [los, números, ingresados],
 *      promedio: (el promedio entre ellos),
 *      max: (valor máximo),
 *      min: (valor mínimo),
 *      ejecutable: (nombre del ejecutable),
 *      pid: (process id)
 *    }
 * }
 * 
 * En caso de ingresar un número no válido, se creará un objeto de error con el siguiente formato:
 * 
 * {
 *    error: {
 *            descripcion: 'error de tipo',
 *            numeros: [array, de, entrada],    // ej. [1,2,'pepe',4,true]
 *            tipos: [array, con, tipos, de, entrada]  //ej. [number, number, string, number, boolean]
 *          }
 * }
 * 
 * En este caso de error, la app saldrá con código de error -5
 * 
 * Si no ingresó ningún número, el objeto error serà:
 * 
 * {
 *      error: {
 *          descripcion: 'entrada vacía'
 *      }
 * }
 * 
 * la app saldrá con código de error -4
 * 
 * En los casos de error se presentará en consola el código antes de finalizar
 */

// Recibo en una constante los argumentos de process
const args = process.argv
const numbers = args.slice(2)   //le corto el runtime y el nombre del archivo, así me quedo con el resto

process.on("exit", code => {
  if(code){
    console.log("saliendo con el codigo " + code)
  }else{
    console.log("salio sin errores")
  }
})

process.on("uncaughtException", error => {
  console.log(error)
  switch (error.descripcion) {
    case 'entrada vacia': return process.exit(-4)
    case 'error de tipo': return process.exit(-5)
  }
})

//Valido  números
function validateNumbers(numbers){
  //valida que se hay ingresado algo
  if(numbers.length == 0){
    throw {descripcion: 'entrada vacia'}
  }
  
  //Recorre el array de numbers y verifica uno por uno si es tipo Number
  for(const numb of numbers){
    const val = Number(numb)
    
    //Si no es un número
    if(isNaN(val)){
      throw{
        descripcion: 'error de tipo',
      	numeros: numbers,
        tipos: numbers.map(n => isNaN(n) ? typeof n : 'number')
      }
    }
  }
}
  
function avg(numbers){    
  let total = 0
  
  for(const num of numbers){
    const val = Number(num)   // viene un "12" y lo quiero así 12. Entonces lo casteo a Number (lo fuerzo a que venga tipo Number)
    
    total += val
  }
  
  return total / numbers.length
}
  
validateNumbers(numbers)

// con split ('/') divido el array en /. 
//Con pop() remuevo el último elemento del array y lo devuelvo
// process.execPath -> me da el string del ejecutable:  ej: /d/Cursos/Coder House/Desarollo Web Full Stack/Backend/PrácticaDeCursada/28-Global&ChildProcess/1-UsoDelObjetoProcess
// con pop() me devuelve: '1-UsoDelObjetoProcess'
const datos = {
  numeros: numbers,
  promedio: avg(numbers),
  max: Math.max(...numbers),
  min: Math.min(...numbers),
  ejecutable: process.execPath.split('/').pop(),
  pid: process.pid
}
  
console.log(datos)
  
  
// // Extra:

// 'Directorio actual de trabajo:' + process.cwd();
// 'Id del proceso:' + process.pid();
// 'Version de Node' + process.version();
// 'Título del proceso:' + process.title();
// 'Sistema operativo:' + process.platform();
// 'Uso de la memoria:' + process.memoryUsage();