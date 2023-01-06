import { normalize, denormalize, schema } from "normalizr";

// Al importarlos de esta forma, utilizo destructuring. 
//  Me permite trabajarlos directamente sin tener que hacer:
//  
//  import normilizr from 'normalizr'
//  const normalize = normalizr.normalize;
//  const denormalize = normalizr.denormalize;
//  const schema = normalizr.schema;

//Objeto
const holding = {
    id: "1",
    empresas: [
        {
            id: "1",
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
        },
        {
            id: "2",
            nombre: "BackendHouse",
            gerente: {
                id: "6",
                nombre: "Jose",
                apellido: "Pieres",
                DNI: "20442643",
                direccion: "CABA 461",
                telefono: "1567811548"
            },
            encargado: {
                id: "5",
                nombre: "Lucia",
                apellido: "Sorbo",
                DNI: "20442642",
                direccion: "CABA 460",
                telefono: "1567811547"
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
            },
            {
                id: "8",
                nombre: "Lucio",
                apellido: "Garcia",
                DNI: "20442645",
                direccion: "CABA 463",
                telefono: "1567811550"
                }
            ]
        },
        {
            id: "3",
            nombre: "MilkHouse",
            gerente: {
                id: "9",
                nombre: "Diego",
                apellido: "Sojo",
                DNI: "20442646",
                direccion: "CABA 464",
                telefono: "1567811551"
            },
            encargado: {
                id: "8",
                nombre: "Lucio",
                apellido: "Garcia",
                DNI: "20442645",
                direccion: "CABA 463",
                telefono: "1567811550"
            },
            empleados: [
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
            },
            {
                id: "9",
                nombre: "Diego",
                apellido: "Sojo",
                DNI: "20442646",
                direccion: "CABA 464",
                telefono: "1567811551"
            }
            ]
        }      
    ]
}

/////////       DEFINIR SCHEMAS      /////////

//  Los datos sobre el empleado se almacenarán en el objeto 'empleado'
const empleado = new schema.Entity('empleado');

//  Los datos sobre el organigrama se almacenarán en el objeto 'organigrama'
const organigrama = new schema.Entity('organigrama', {
    gerente: empleado,
    encargado: empleado,
    empleados: [empleado]
});

//  Los datos sobre la empresa se almacenarán en el objeto 'empresas'
const empresas = new schema.Entity('empresas', {
    empresas: [organigrama]
});

    //  utils
    import util from 'util';

    function print(objeto) {
        console.log(util.inspect(objeto, false, 12, true))
    };

//  NORMALIZADO
//  Primer parámetro: el nombre del objeto
//  Segundo Parámetro: el nombre del esquema => empresas
const objNormalizado = normalize(holding, empresas);
print(objNormalizado);

//  DESNORMALIZAR
//  Primer parámetro: el resultado del objeto normalizado
//  Segundo parámetro: el schema
//  Tercer parámetro: las entidades del objeto normalizado
const objDenormalizado = denormalize(objNormalizado.result, empresas, objNormalizado.entities);
print(objDenormalizado);

//  LENGTH

const lengthObjetoOriginal = JSON.stringify(holding).length;
const lengthObjNormalizado = JSON.stringify(objNormalizado).length;
const lengthObjDenormalizado = JSON.stringify(objDenormalizado).length;

//  CALCULO DE PORCENTAJE

const porcentajeCompresion = ( original, normalizado ) => {
    return 100 - ( (100 * normalizado) / original )
}


//  IMPRESIONES

console.log('-----OBJETO ORIGINAL-----');
console.log('Longitud del objeto original: ' + lengthObjetoOriginal +'\n');

console.log('-----OBJETO NORMALIZADO-----');
console.log('Longitud del objeto normalizado: ' + lengthObjNormalizado +'\n');

console.log('-----OBJETO DENORMALIZADO-----');
console.log('Longitud del objeto denormalizado: ' + lengthObjDenormalizado +'\n');

console.log('-----PORCENTAJE DE COMPRESION-----');
console.log('Porcentaje de compresión: ' + porcentajeCompresion(lengthObjetoOriginal, lengthObjNormalizado) +'%');