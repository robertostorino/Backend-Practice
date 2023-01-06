const { options } = require("./options/mysqlconn");
const knex = require('knex')(options);

knex.from('usuarios').select("nombre", "edad").where('id', '>', '3')
    .then(rows => {
        for (row of rows) {
            console.log(`${row["nombre"]} tiene ${row["edad"]} vueltas al sol`)
        }
    })
    .catch(err => console.log(err))
    .finally(() => {
        knex.destroy()
    });

/**
 * knex.destroy => desconecta de la base de datos
 * 
 * rows es un tipo de objeto mapa (clave, valor)
 */