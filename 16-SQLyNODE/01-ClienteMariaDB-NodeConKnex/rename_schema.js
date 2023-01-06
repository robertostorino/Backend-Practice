const { options } = require("./options/mysqlconn");
const knex = require('knex')(options);

knex.schema
    .renameTable('persons', 'people')
.then(() => console.log('se ha cambiado el nombre de la tabla correctamente'))
.catch(err => console.log(err))
.finally(() => {
    knex.destroy()
});