const { default: knex } = require("knex")

( async () => {
    try {
        console.log('--> Borramos todos los usuarios')
        await knex('usuarios').del()

        console.log('--> Insertamos usuarios')
        await knex('usuarios').insert(usuarios)

        console.log('--> Leemos todos los usuarios')
        let rows = await knex.from('usuarios').select("*")
            for (row of rows) console.log(`${row['id']} ${row['nombre']} ${row['edad']}`);
        
        console.log('--> Insertamos un usuario más')
        await knex('usuarios').insert({ nombre: 'oliver', apellido: 'atom', edad: '36'})

        console.log('->> Leemos los usuarios actualizados')
        rows = await knex.from('usuarios').select("*")
        for (row of rows) console.log(`${row['id']} ${row['nombre']} ${row['edad']}`);
        
    } catch (error) {
        
    } finally {
        knex.destroy();
    }
})