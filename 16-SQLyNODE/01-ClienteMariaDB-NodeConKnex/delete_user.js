const { options } = require("./options/mysqlconn");
const knex = require('knex')(options);

//  knex('usuarios').where({ id: 3}).del()
knex('usuarios').where('id', '<', '5').del()
    .then(() => console.log('usuario eliminado correctamente'))
    .catch(err => console.log(err))
    .finally(() => {
        knex.destroy()
    });