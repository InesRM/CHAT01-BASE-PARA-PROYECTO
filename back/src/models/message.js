module.exports = {
    get: (con, callback) => {
        con.query(`SELECT content, messages.id as 
        id, userId, date, firstName, lastName FROM messages 
        INNER JOIN users ON messages.userId = users.id`, callback);
    },

    getById: (con, id, callback) => {
        con.query(`SELECT * from messages WHERE id = ${id}`, callback)
    },


    create: (con, data, callback) => {
        con.query(`INSERT into messages SET
        content='${data.content}',
        userId='${data.userId}'
        `, callback)
    },

    destroy: (con, id, callback) => {
        con.query(`DELETE FROM messages WHERE id = ${id}`, callback)
    },
}
