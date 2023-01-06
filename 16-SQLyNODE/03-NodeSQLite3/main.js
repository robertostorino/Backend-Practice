import { options } from "./options/SQLite3conn.js"
import ClienteSQL from "./sqlContainer.js"

// Instancio mi cliente y le paso las options de conexión
const sql = new ClienteSQL(options);

sql.crearTabla()
    .then( () => {
        console.log("1- tabla creada")

        const articulos = [
            { nombre: 'leche', codigo: 'AB-11', precio: 90.56, stock: 30},
            { nombre: 'harina de avena', codigo: 'RB-21', precio: 100.56, stock: 30},
            { nombre: 'ddl', codigo: 'DD-12', precio: 80, stock: 30},
            { nombre: 'fideos', codigo: 'FS-71', precio: 290.56, stock: 30},
            { nombre: 'crema', codigo: 'CB-11', precio: 190.56, stock: 30}
        ]

        return sql.insertarArticulos(articulos)
    })
    .then( () => {
        console.log('2- articulos insertados')

        return sql.listarArticulos()
    })
    .then((articulos) => {
        console.log(articulos)
        console.log('3- artículos listados')

        return sql.borrarArticulos(3)
    })
    .then( () => {
        console.log('4- artículo 3 borrado')

        return sql.actualizarStock(0, 2)
    })
    .then( () => {
        console.log('5- stock actualizado')

        return sql.listarArticulos()
    })
    .then( (articulos) => {
        console.log(articulos)

        console.log('resultado final')
    })
    .catch(err => console.log(err))
    .finally( () => {
        sql.close()
    })

