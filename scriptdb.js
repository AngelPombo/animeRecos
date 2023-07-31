"use strict";

const {createDBconnection} = require('./src/database/db');

require('dotenv').config();

const dbName = process.env.DATABASE;

async function createDB() {

  let connection;

  try {
    connection = await createDBconnection();
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

    await connection.query(`USE ${dbName}`);


    //USERS
    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS users(
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            user_name VARCHAR(30) UNIQUE NOT NULL,
            email VARCHAR(256) UNIQUE NOT NULL,
            pwd VARCHAR(100) NOT NULL,
            avatar VARCHAR(100),
            biography VARCHAR(500),
            link_twitter VARCHAR(200),
            link_youtube VARCHAR(200),
            link_insta VARCHAR(200),
            link_ttv VARCHAR(200),
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            active_user BOOLEAN DEFAULT FALSE,
            user_role ENUM("admin", "user") DEFAULT "user" NOT NULL,
            user_badge ENUM("Genin","Chūnin","Jōnin","ANBU","Sannin","Kage") DEFAULT "Genin" NOT NULL,
            reg_code CHAR(36),
            deleted BOOLEAN DEFAULT FALSE,
            last_auth_update DATETIME,
            recover_code CHAR(36),
            banned BOOLEAN DEFAULT FALSE,
            reports INT DEFAULT 0
        );
        `
    );

    //ENTRIES
    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS entries(
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            banned BOOLEAN DEFAULT FALSE,
            reports INT DEFAULT 0,
            last_update DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            edited BOOLEAN DEFAULT FALSE,
            title VARCHAR(100) NOT NULL,
            content VARCHAR(1000) NOT NULL,
            anime_character VARCHAR (100),
            category ENUM(
                "recomendaciones", "teorías", "fanArt",
                "opennings", "cosplays", "memes"
            ) NOT NULL,
            genre ENUM(
                "acción", "aventura", "deportes",
                "comedia", "drama", "fantasía",
                "musical","romance", "ciencia ficción",
                "sobrenatural", "thriller", "terror",
                "psicológico", "infantil", "otros"
            ) NOT NULL,
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        `
    );

    //PHOTOS
    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS photos(
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            photo_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            entry_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (entry_id) REFERENCES entries(id)
        );
        `
    );

    //VIDEOS
    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS videos(
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            video_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            entry_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (entry_id) REFERENCES entries(id)
        );
        `
    );

    //COMENTS
    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS coments(
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            coment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            content VARCHAR(500) NOT NULL,
            banned BOOLEAN DEFAULT FALSE,
            reports INT UNSIGNED DEFAULT 0,
            edited BOOLEAN DEFAULT FALSE,
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            entry_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (entry_id) REFERENCES entries(id)
        );
        `
    );

    //VOTES
    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS votes(
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            vote_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            vote_entry BOOLEAN DEFAULT FALSE,
            vote_coment BOOLEAN DEFAULT FALSE,
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            entry_id INT UNSIGNED,
            FOREIGN KEY (entry_id) REFERENCES entries(id),
            coment_id INT UNSIGNED,
            FOREIGN KEY (coment_id) REFERENCES coments(id)
        );
        `
    );

    //INCIDENCES
    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS incidences(
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            type_incidence ENUM(
                "acoso", "incitación al odio", "contenido sexual",
                "apología del terrorismo", "estafa", "suplantación de identidad",
                "otros"
            )NOT NULL,
            content VARCHAR(380),
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            entry_id INT UNSIGNED,
            FOREIGN KEY (entry_id) REFERENCES entries(id),
            coment_id INT UNSIGNED,
            FOREIGN KEY (coment_id) REFERENCES coments(id)
        );
        `
    );

    console.log(`Si no existía una base de datos con el mismo nombre, se ha creado ${dbName} y sus correspondientes tablas`);

  }catch(e){

    console.log(e);

  }finally{

/*     if (connection){
      connection.release();
    } */

    process.exit();

  }

}

createDB();
