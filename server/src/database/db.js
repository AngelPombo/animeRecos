const mysql = require('mysql2/promise');
require('dotenv').config({override: true});

const {HOST, USER, PASSWORD, DATABASE} = process.env;

let pool;

const getDB = async () => {
    if(!pool){
        pool = mysql.createPool({
            connectionLimit: 10,
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        });
    }

    return await pool.getConnection();
};

const createDBconnection = async () => {
    if(!pool){
        pool = mysql.createPool({
            connectionLimit: 10,
            host: HOST,
            user: USER,
            password: PASSWORD
        });
    }

    return await pool.getConnection();
};

module.exports = {
    getDB,
    createDBconnection
}