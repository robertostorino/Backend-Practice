import mongoose from "mongoose";

//Le pasé el user y password en la URL
const URL = "mongodb+srv://coderhouse:coderhouse@miprimercluster.jrovqqz.mongodb.net/?retryWrites=true&w=majority"

export const connection = mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// console.log("conectados correctamente");
