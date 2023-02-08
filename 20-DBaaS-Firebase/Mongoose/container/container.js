import mongoose from 'mongoose';
// const models = require("../models/models")
import models from "../model/schema/chatModel";

mongoose.connect("mongodb+srv://coderhouse:coderhouse@miprimercluster.jrovqqz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MongoDB Connected');
    }
});


class Container {

    async add(data){
        const dataAdd = new models(data)
        const add = await dataAdd.save()
        return add
    }

    async get(id){
        if (id) {
            const data = await models.findById(id)
            return data
        }
        else{
            const data = await models.find()
            return data
        }
    }

    async update(id, data){
        const update = await models.updateOne({_id: id}, data)
        return update
    }
    
    async delete(id){
        const deelete = await models.deleteOne({_id : id})
        return deelete
    }
    
    async getChat(){
        const data = await modelsChat.find({}, {_id:0, __v:0})
        return data
    }

    async addChat(data){
        const dataAdd = new modelsChat(data)
        const add = await dataAdd.save()
        return add
    }
}

module.exports = Container;