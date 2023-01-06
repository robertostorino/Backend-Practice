import { faker } from "@faker-js/faker";
faker.locale = 'es';  //Configuro faker en español

function generarUsuario(){
    return {
        nombre: faker.name.firstName(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        imagen: faker.image.avatar()
    }
};

export { generarUsuario };