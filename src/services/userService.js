
//4. Editar la informacion de un usuario
//5. Eliminar a un usuario de la DB
const fs = require('fs');
const bcryptjs = require('bcryptjs');

const User = {
    //hacemos referencia al nombre del archivo que queremos utilizar
    fileName: './src/data/user.json',

    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    findAll(){
        return this.getData();
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find((oneUser) => oneUser.id === id);
            return userFound;
    },

    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find((oneUser) => oneUser[field] === text);
        return userFound;
    },

    create: function (userData, img) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData,
            password: bcryptjs.hashSync(userData.password, 10),
            img: img.filename,
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },
    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    },
};

module.exports = User;

// // console.log(User.create({name: 'Pía', apellido:"Torino", email:"ptorino@gmail.com"}));
