const { hashPassword } = require("../utils/auth")

module.exports = {
    get: (con, callback) => {
        con.query('SELECT * FROM users', callback)
    },

    getById: (con, id, callback) => {
        con.query(`SELECT * from users WHERE id = ${id}`, callback)
    },

    getByEmail: (con, email, callback) => {
        con.query(`SELECT * from users WHERE email = '${email}'`, callback)
    },

    create: (con, data, callback) => {
        con.query(`INSERT into users SET
        firstName='${data.firstName}',
        lastName='${data.lastName}', 
        email='${data.email}', 
        password='${hashPassword(data.password)}',
        roleId='${typeof data.roleId !== 'undefined' ? data.roleId : 2}',
        img='${data.img}',
        active='${typeof data.active !== 'undefined' ? data.active :1}'
        `, callback)
    },

    update: (con, data, callback) => {
        con.query(`UPDATE users SET
        firstName='${data.firstName}',
        lastName='${data.lastName}', 
        email='${data.email}', 
        password='${hashPassword(data.password)}',
        roleId='${data.roleId}',
        img='${data.img}',
        active='${typeof data.active !== 'undefined' ? data.active :1}'
        WHERE id = ${data.id}
        `, callback)
        
    },
}
