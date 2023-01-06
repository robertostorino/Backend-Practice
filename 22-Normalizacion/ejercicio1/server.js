import { normalize, schema } from "normalizr";

//Objeto sin normalizar

const empresa = {
    id: "1000",
    nombre: "Coderhouse",
    gerente: {
        id: "2",
        nombre: "Pedro",
        apellido: "Mei",
        DNI: "20442639",
        direccion: "CABA 457",
        telefono: "1567811544"
    },
    encargado: {
        id: "3",
        nombre: "Pablo",
        apellido: "Blanco",
        DNI: "20442640",
        direccion: "CABA 458",
        telefono: "1567811545"
    },
    empleados: [
        {
            id: "1",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543"
        },
        {
            id: "2",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20442639",
            direccion: "CABA 457",
            telefono: "1567811544"
        },
        {
            id: "3",
            nombre: "Pablo",
            apellido: "Blanco",
            DNI: "20442640",
            direccion: "CABA 458",
            telefono: "1567811545"
        },
        {
            id: "4",
            nombre: "Ana",
            apellido: "Rojo",
            DNI: "20442641",
            direccion: "CABA 459",
            telefono: "1567811546"
        },
        {
            id: "5",
            nombre: "Lucia",
            apellido: "Sorbo",
            DNI: "20442642",
            direccion: "CABA 460",
            telefono: "1567811547"
        },
        {
            id: "6",
            nombre: "Jose",
            apellido: "Pieres",
            DNI: "20442643",
            direccion: "CABA 461",
            telefono: "1567811548"
        },
        {
            id: "7",
            nombre: "Maria",
            apellido: "Lopez",
            DNI: "20442644",
            direccion: "CABA 462",
            telefono: "1567811549"
        }
    ]
}

// Definimos schemas

//  Los datos sobre el empleado se almacenarán en el objeto 'empleado'
const empleado = new schema.Entity('empleado');

//  Los datos sobre el organigrama se almacenarán en el objeto 'organigrama'
const organigrama = new schema.Entity('organigrama', {
    gerente: empleado,
    encargado: empleado,
    empleados: [empleado]
});

//  Guardo el tamaño del organigrama
const tamanoOrganigrama = JSON.stringify(empresa).length


// //    normalizar

console.log('objeto normalizado');

//  Crea datos normalizados a partir del objeto 'empresa' con esquema 'organigrama'
const orgNormalizado = normalize(empresa, organigrama);
//  Imprimo el objeto normalizado
print(orgNormalizado);

//  Guardo el tamaño del organigrama normalizado
const tamanoOrganigramaNorm = JSON.stringify(orgNormalizado).length;


//  Muestro original y normalizado
console.log('longitud del objeto original: ' + tamanoOrganigrama);
console.log('longitud del objeto normalizado: ' + tamanoOrganigramaNorm);




//  utils
import util from 'util';

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
};
