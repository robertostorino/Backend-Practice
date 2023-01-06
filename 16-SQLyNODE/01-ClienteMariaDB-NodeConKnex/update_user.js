const { options } = require("./options/mysqlconn");
const knex = require('knex')(options);

knex('usuarios').where({id: 3}).update({nombre: "Kun"})
    .then(() => console.log('registro actualizado correctamente'))
    .catch(err => console.log(err))
    .finally(() => {
        knex.destroy()
    });