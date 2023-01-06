// npm i firebase-admin
// npm i @google-cloud/firestore

//  Connection to Firebase

import admin from "firebase-admin";
import fs from 'fs';

//Los módulos solo se pueden importar con js, entonces utilizo filesystem para que lo pueda leer
const serviceAccount = JSON.parse(fs.readFileSync("./db/miproyectofirebase-cc9dd-firebase-adminsdk-pfe1n-219465b1b8.json"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//  Indico que voy a usar el servicio de Firestore

const db = admin.firestore();  // Ahora el objeto db es mi conector a Firestore

//   Me posiciono en la colección 'colores'
const query = db.collection('colores');

const red = await query.add({nombre: 'red'});
const green = await query.add({nombre: 'green'});
const blue = await query.add({nombre: 'blue'});

console.log('colores creados');

const todosloscolores = await query.get();
todosloscolores.forEach(color => {
    console.log(color.data())
});

console.log('get colores');

//  Para acceder a los documentos necesitamos su id,
// por tanto objeto.id
await query.doc(blue.id).update({nombre: 'navy'});

console.log('blue cambiado por navy');

await query.doc(green.id).delete();

console.log('green eliminado');



