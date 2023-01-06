const { options } = require("./options/mysqlconn");
const knex = require('knex')(options);

knex.schema
    .dropTable('people')
        .then(() => console.log('se ha eliminado la tabla correctamente'))
        .catch(err => console.log(err))
        .finally(() => {
            knex.destroy()
});