const Message = require('../models/message');

module.exports = {
    index: (req, res) => {

       _getMessages(req, res);
    },

    store: (req, res) => {
       Message.create(req.con, req.body, (err) => {
            if (err) {
                res.status(500).send({ response: 'ha ourrido un error' })
            } else {
                _getMessages(req, res);
            }
        })
    },

    destroy: (req, res) => {
        const { id } = req.params;
       
        Message.destroy(req.con, id, (err, rows) => {
            if (err) {
                res.status(500).json({ response: 'ha ourrido un error' })
            } else {
                _getMessages(req, res);
            }
        })
    },

    }

function _getMessages(req, res){

    Message.get(req.con, (err, rows) => {
        if (err) {
            res.status(500).send({response:'ha ocurrido un error'})

        } else {
            const {io}=req;
            io.emit('messages', rows);
            res.status(200).json({ response:rows }) //data:rows
        }

    })

}