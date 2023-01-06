const { options } = require("./options/mysqlconn");
const knex = require('knex')(options);

//Selecciono todos los nombres y los ordeno alfabeticamente en orden descendente
knex.from('usuarios').select("nombre", "edad").orderBy('nombre', 'desc')
    .then(rows => {
        for (row of rows) {
            console.log(`${row["nombre"]} tiene ${row["edad"]} vueltas al sol`)
        }
    })
    .catch(err => console.log(err))
    .finally(() => {
        knex.destroy()
    });