const { options } = require('./options/mysqlconn.js');
const knex = require ('knex')(options);

// es como hacer =>      knex(options);

const usuarios = [
    {nombre: 'roberto', apellido: 'storino', edad: 36, email: 'rober@gmail.com'},
    {nombre: 'leonel', apellido: 'messi', edad: 35, email: 'el10@gmail.com'},
    {nombre: 'cristiano', apellido: 'ronaldo', edad: 38, email: 'cr7@gmail.com'}
];

knex('usuarios').insert(usuarios)
    .then(() => console.log('se ingresaron correctamente'))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy()
    });