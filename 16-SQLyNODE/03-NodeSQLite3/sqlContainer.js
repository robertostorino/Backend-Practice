//  Container
import knex from 'knex';

export class ClienteSQL {

    // El constructor recibe las options
    constructor(options) {
        // al instanciar esta clase, el constructor utiliza la conexión con options
        this.knex = knex(options);
    }

    crearTabla() {
        // Si la tabla existe, entonces la elimina
        return this.knex.schema.dropTableIfExists('articulos')
            .finally( () => {
                //  Crea la tabla artículos, con sus columnas y tipos
                return this.knex.schema.createTable('articulos', table => {
                    table.increments('id').primary()
                    table.string('nombre', 15).notNullable()
                    table.string('codigo', 10).notNullable()
                    table.float('precio')
                    table.integer('stock')

                })
            })
    }

    insertarArticulos(articulos) {
        return this.knex('articulos').insert(articulos)
    }

    //Muestra todos los artículos
    /** 
     * this.knex().from('articulos).select('*')
     * es lo mismo que this.knex('articulos').select('*')
     *  */ 
    listarArticulos() {
        return this.knex('articulos').select('*')
    }

    // Recibe un id de artículo y lo elimina de la tabla artículos
    borrarArticulos(id) {
        return this.knex('articulos').where('id', '=', id).del()
    }

    //  Actualiza el stock de un artículo
    actualizarStock(stock, id) {
        return this.knex.from('articulos').where('id', '=', id).update({stock: stock})
    }

    //cierra la conexión
    close() {
        this.knex.destroy()
    }

};

export default ClienteSQL;