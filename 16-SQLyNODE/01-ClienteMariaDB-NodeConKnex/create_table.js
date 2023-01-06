const { options } = require("./options/mysqlconn");
const knex = require('knex')(options);

knex.schema.createTable('accounts', table => {
    table.increments('id')
    table.string('account_name')
    table.integer('age')
    table.float('experience')
    table.decimal('balance', 8, 2)
    table.boolean('is_admin')
    table.date('birthday')
    table.time('created_at')
    table.timestamp('created_at_time').defaultTo(knex.fn.now())
    table.json('profile')
    table.jsonb('profileb')
    table.uuid('id-uuid').primary()
    table.unique('email')
    table.unique(['email', 'company_id'])
    table.dropUnique('company_id')
    table.foreign('company_id').references('companies.id')

    table.integer('user_id')
        .unsigned()
        .references('users.id')
})
.then(() => console.log('se ha creado la tabla correctamente'))
    .catch(err => console.log(err))
    .finally(() => {
        knex.destroy()
    });