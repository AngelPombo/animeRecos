const express = require('express');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const path = require('path');

const userRouter = require('../src/router/userRouter');
const entryRouter = require('../src/router/entriesRouter');

const server = express();

server.use(express.urlencoded({extended: false})); //encargado de gestionar todos los datos que vienen por el form
server.use(express.json());
server.use(morgan('dev'));
server.use(fileupload());

/* const staticDir = path.join(__dirname,'uploads');

server.use(express.static(staticDir));

createStaticDir(staticDir); */

//server.use(userRouter);
server.use(entryRouter);

server.use((err, _req, res, _next) => {
    console.log("ERROR: " + err.message);
    res.status(err.code ?? 500);
    res.send("Oops! Ha ocurrido un error :/");
});

server.use((_req, res) => {
    res.status(404);
    res.send("Página no encontrada");
});

module.exports = server;