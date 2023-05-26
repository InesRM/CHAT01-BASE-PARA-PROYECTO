const User = require('../models/user');
const { getFilePath, unlinkFile } = require('../utils/auth');
const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');
module.exports = {
    index: (req, res) => {
        User.get(req.con, (err, rows) => {
            if (err) {
                res.status(500).json({ response: 'error', message: 'Error retrieving users', error: err })
            } else {
                res.status(200).json({ response: 'success', message: 'Users retrieved successfully', rows }) //data:rows
            }

        })
    },

    store: (req, res) => {
        req.body.img = "";
        if (req.files.img) {
            req.body.img = getFilePath(req.files.img);
        }

        User.create(req.con, req.body, (err, rows) => {
            if (err) {
            unlinkFile(req.body.img);
                res.status(500).json({ response: 'ha ourrido un error' })
            } else {
                res.status(200).json({ response: rows })
            }
        })
    },

    login: (req, res) => {
        const { email, password } = req.body;
        User.getByEmail(req.con, email, (error, row) => {
            if (error){
                res.status(500).send
                ({
                    response:'Ha ocurrido un error',
                })
            }else{
                
                if (!row) return res.status(404).send({response:'Usuario o contraseña incorrectos'});
               
                const userData = row[0];
                // delete userData.password;    
                console.log(userData);

                bcrypt.compare(password, userData.password, (error, check) =>{
                    if (error) return res.status(500).send({response:'Ha ocurrido un error'});
                    if (!check) return res.status(404).send({response:'Usuario o contraseña incorrectos'});
                    if (!userData.active) return res.status(404).send({response:'Usuario inactivo'});
                    delete userData.password;
                    console.log(error, check);
                    res.status(200).send({
                        response:{
                            token:createAccessToken(userData),
                            refresh:createRefreshToken(userData),
                        }
                    });
                });


            }      

    });
}






}




