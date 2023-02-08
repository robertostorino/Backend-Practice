import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     title: { type: String, require: true, minLength: 1, maxLength: 40 },
//     price: { type: Number, require: true },
//     stock: { type: Number, require: true },
//     thumbnail: { type: String, require: true, minLength: 1, maxLength: 100 },
//     timestamp: { type: String, require: true },
// });

// const productosCollection = 'products';
const messagesCollection = 'chat';

const schemaChat = new mongoose.Schema({
    author:
        {
            email: String,
            nombre: String,
            apellido: String,
            edad: Number,
            alias: String,
            avatar: String
        },
    text: String,
    fyh: String,
    id: Number
})

// const chatSchema = new mongoose.Schema({
//     author: {
//         mail: { type: String, require: true },
//         name: { type: String, require: true },
//         surname: { type: String, require: true },
//         age: { type: Number, require: true },
//         alias: { type: String, require: true },
//         avater: { type: String, require: true },
//     },
//     message: {
//         dateAndTime: { type: String, require: true },
//         text: { type: String, require:true},
//         id: {type: Number, require: true}
//     }
// });

export const models = mongoose.model( messagesCollection, schemaChat );
// const mongoProduct = mongoose.model(productosCollection, productSchema);
// const mongoMessage = mongoose.model(messagesCollection, messageSchema);

// export {
//     // mongoProduct,
//     mongoMessage
// }
