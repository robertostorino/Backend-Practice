const { options } = require("./options/mysqlconn");
const knex = require('knex')(options);

knex.schema.table('accounts', table => {
    table.string('last_name')
    table.renameColumn('profile', "The_Profile")
    table.dropColumn('profileb')
})
.then(() => console.log('se ha alterado la tabla correctamente'))
    .catch(err => console.log(err))
    .finally(() => {
        knex.destroy()
    });