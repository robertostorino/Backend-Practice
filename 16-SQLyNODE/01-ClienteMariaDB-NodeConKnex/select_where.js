const { options } = require("./options/mysqlconn");
const knex = require('knex')(options);

//  knex.from('usuarios').select("nombre", "edad").where({nombre : 'roberto'})
//  knex.from('usuarios').select("nombre", "edad").whereIn('id', [1, 5, 6, 7])
//  knex.from('usuarios').select("nombre", "edad").whereNot("id", 1)
//  knex.from('usuarios').select("nombre", "edad").whereBetween("id", [4, 6])
//  knex.from('usuarios').select("nombre", "edad").whereNotBetween("id", [4, 6])
knex.from('usuarios').select("nombre", "edad").whereRaw('id = ?', [1])
    .then(rows => {
        for (row of rows) {
            console.log(`${row["nombre"]} tiene ${row["edad"]} vueltas al sol`)
        }
    })
    .catch(err => console.log(err))
    .finally(() => {
        knex.destroy()
    });