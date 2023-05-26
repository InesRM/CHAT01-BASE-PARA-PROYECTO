const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/db');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);

require('dotenv').config();
const { API_VERSION, API_NAME } = process.env;

const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

//importar rutas
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/messages');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('src/uploads'));


app.use((req, res, next) => {
    req.io = io;
    req.con = dbConnection;
    next();
});


//exponer ruta

const basePath = `/${API_NAME}/${API_VERSION}`;

app.use(basePath, userRoutes);
app.use(basePath, messageRoutes);

io.on('connection', (socket) => {

    socket.on('typing', (data) => {
        io.emit('listening', data);
    });

    socket.on('disconnect', () => {
        console.log('usuario desconectado');
    });
}
);

module.exports = httpServer;
