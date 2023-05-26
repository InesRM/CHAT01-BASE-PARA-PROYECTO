const bcrypt = require('bcryptjs');
const path = require('path');
const fs=require('fs');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function getFilePath(file) {
    // if (!file) throw new Error('File is required');
    const path = file.path.split('\\');
    const fileName = path.pop();
    const folder= path.pop();
    path.shift();
    console.log(path);
    // return path.join('/')+'/'+folder+'/'+fileName;
    return `/${folder}/${fileName}`;
    
}

function unlinkFile(file) {
    try{
        if (!path) throw new Error('No hay imagen a eliminar');
        fs.unlinkSync(`./src/uploads/${file}`);
    }catch(error){
       console.log(error);
    }
}

module.exports={
    hashPassword,
    getFilePath,
    unlinkFile
}
