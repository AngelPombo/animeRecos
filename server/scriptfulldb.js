"use strict";

const {createDBconnection} = require('./src/database/db');

require('dotenv').config();

const dbName = process.env.DATABASE;

async function createDB() {

    let connection;

    try {
    connection = await createDBconnection();

    await connection.query(`DROP DATABASE IF EXISTS ${dbName}`);
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

    await connection.query(`USE ${dbName}`);


    //USERS
    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS users(
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            user_name VARCHAR(40) UNIQUE NOT NULL,
            email VARCHAR(256) UNIQUE NOT NULL,
            pwd VARCHAR(512) NOT NULL,
            avatar VARCHAR(100),
            biography VARCHAR(3000),
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
            banned BOOLEAN DEFAULT FALSE            
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
            last_update DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            edited BOOLEAN DEFAULT FALSE,
            title VARCHAR(100) NOT NULL,
            content VARCHAR(10000) NOT NULL,
            anime_character VARCHAR (100),
            category ENUM(
                "Recomendaciones", "Teorías", "FanArt",
                "Openings", "Cosplays", "Memes"
            ) NOT NULL,
            genre ENUM(
                "Acción", "Aventura", "Deportes",
                "Comedia", "Drama", "Fantasía",
                "Musical","Romance", "Ciencia-ficción",
                "Sobrenatural", "Thriller", "Terror",
                "Psicológico", "Infantil"
            ) NOT NULL,
            video_url VARCHAR(3000),
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
            photo VARCHAR (1000),
            photo_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            entry_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (entry_id) REFERENCES entries(id)
        );
        `
    );

    //COMMENTS
    await connection.query(
        `
        CREATE TABLE IF NOT EXISTS comments(
            id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
            comment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            content VARCHAR(5000) NOT NULL,
            banned BOOLEAN DEFAULT FALSE,
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
            vote_comment BOOLEAN DEFAULT FALSE,
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            entry_id INT UNSIGNED,
            FOREIGN KEY (entry_id) REFERENCES entries(id),
            comment_id INT UNSIGNED,
            FOREIGN KEY (comment_id) REFERENCES comments(id)
        );
        `
    ); 

    //REPORTS
    await connection.query(
    `
    CREATE TABLE IF NOT EXISTS reports(
        id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        report_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        report_entry BOOLEAN DEFAULT FALSE,
        report_comment BOOLEAN DEFAULT FALSE,
        report_user INT DEFAULT NULL,
        report_type ENUM(
            "acoso", "incitacion al odio", "contenido sexual",
            "apologia del terrorismo", "estafa", "suplantacion de identidad",
            "otros"
        )NOT NULL,
        report_content VARCHAR(2000),
        user_id INT UNSIGNED,
        FOREIGN KEY (user_id) REFERENCES users(id),
        entry_id INT UNSIGNED,
        FOREIGN KEY (entry_id) REFERENCES entries(id),
        comment_id INT UNSIGNED,
        FOREIGN KEY (comment_id) REFERENCES comments(id)
    );
    `
    );

    //---INSERTS

    //USERS
    await connection.query(
        `
        INSERT INTO users VALUES (1,'Grelito','angelpombo.92@gmail.com','5c8f0da6c28368a3eedb9d27b22a26463b0ab2db4471a4ab2b84c77e366fd723ffc208bb775014d882c1f2c51a24066399d50e749bbd5163f7f54376248e6073','eb4a3b09-652e-4ba1-ab17-a4b73d982855_d4uhk72-2e39edd4-8e55-46d9-8616-58a737de5e12.jpg','Forte coma un carballo duro como a pedra tu voluntad mis manos imagina si tuviera un arma de verdad te encantaria saber de donde saco todo este ingenio pues bien te lo voy a comentar es mi intelecto no puede detenerse mucha gente intenta pararlo pero no se puede es como escribir este texto sin poner ninguna coma es la locomotora que funciona sin carbón chucuchu no para no para sigues caminando y no paras de ver vagones pero donde termina este tren? es la pregunta sin responder que existe en el universo planteada desde siempre un debate que existe en tu subconsciente sin que te llegues ni a percatar que locura si quieres saber más acerca de esto no intentes consultarlo porque no encontrarás información vives en la matrix, es como FOK, PUTO MILEURISTA PANZA PANZA deja de leer y ponte a hacer burpees','https://linkdetwitter.es','https://www.youtube.com/watch?v=0hwDNGOReiU&list=RD0hwDNGOReiU&start_radio=1&ab_channel=COLORS','chegouoanxoomellordomundo','www.twitch.tv/grelito','2023-09-06 21:04:02',1,'user','Kage',NULL,0,'2023-09-15 12:57:11','0efa2904-55ed-4d2e-96c9-35b1c35153e8',0),(2,'luis','lacibeira@gmail.com','b541e112b34725049d5ac687a1249205901170be432fde2b8edf5a26ba5df09bfcd0448bd5566fba45b65d25da5060a818c88d1a9355437f57e51551ad83d158','8d8c5fcc-255e-4dcd-b6f3-7e6a681c624e_5a73dd56f3a98a015da640f4cf7e0965aea10a5ar1-500-488v2_00.jpg','Esta es la primera biografía de la animeRecos ',NULL,NULL,NULL,NULL,'2023-09-06 21:05:26',1,'user','Kage',NULL,0,NULL,NULL,0),(3,'eysharis','eyshariscode@outlook.es','1a38bfa8032bdeb66ec63341b17fcf73944a635bf04a902bb49cabca560c9379b2f7953a806f64fc4afd03bc17729fe68b94862336f817ca57ae8826be9d0b59','74008d76-4ec4-4170-b9ab-d18248bac245_avatarantia.jpg','uwu','https://quepesada.es','','','','2023-09-06 21:07:10',1,'user','Sannin',NULL,0,NULL,NULL,0),(4,'Martin','angelpombocode@gmail.com','af17de79203a1d60d561ad0a255b19e09dcfcde8c10c6637b8e112ffaf073e580441293d2a5272dc3ab83f9bfab37b0505226fca19af99258602f2ab77fb4652','5dc85d23-fc16-400c-9637-e1782c7909d8_11033.jpg','ME ENCANTA STREET FIGHTER ALV','','','','','2023-10-05 12:20:55',1,'user','ANBU',NULL,0,NULL,NULL,0);
        `
    );

    //ENTRIES
    await connection.query(
        `
        INSERT INTO entries VALUES (1,'2023-09-06 21:12:32',0,'2023-10-25 13:14:11',1,'Lovely Complex','trata de una chica alta (170cm de altura) Koizumi Risa y un chico bajito (156cm de altura) Otani Atsushi ambos son compañeros de clases y son tratados como el duo de comedia (All Hanshin Kyojin) por no llevarse muy bien, ambos tienen problemas para encontrar pareja y deciden ayudarse pero nada resulta como ellos quiere, con el pasar del tiempo se van transformando en un duo amoroso, no sera facil para ambos aceptar sus sentiemientos.Se van a divertir mucho con la serie tiene momentos comicos y romanticos, si no les basta la serie lean el manga y vean el live action.',NULL,'Recomendaciones','Romance',NULL,1),(2,'2023-09-06 21:14:57',0,'2023-09-06 21:14:57',0,'Claymore','Claymore es una de las mejores y poderosas historias en el anime y manga. Prefiero el manga porque no pasa de moda. Hace no mucho quise verla de nuevo y la animación ya se me hizo vieja y parca, aunque será por los 12 años de existencia jaja No sé, no me pasa con GTO o con FMA, pero definitivamente la historia de las Claymore me perturba. Recomedada 100%',NULL,'Recomendaciones','Aventura',NULL,1),(3,'2023-09-06 21:15:31',0,'2023-09-06 21:15:30',0,'Karekano','Karekano es increíble, el anime es muy divertido y el manga muy intenso, como dices se cumple todo lo esperado y hay finales felices por doquier. es una gran elección para ser el mejor shoujo.Yo diría que Nana  es la mejor de este genero, pero creo que es mas Josei y no se si cuente así que diré que la que mas me gusta es Bokura ga Ita. Me gusta como es todo agridulce, y creo que hay momentos de mucha miel pero también momentos tristes, ademas de ser una historia muy realista y creo que la música del anime le quedo muy bien',NULL,'Recomendaciones','Aventura',NULL,1),(4,'2023-09-06 21:17:00',0,'2023-10-25 13:13:35',1,'11 eyes','Pasó un tiempo importante desde que vi 11 eyes. Hasta donde me acuerdo, me habían gustado mucho los nombres de los enemigos, que eran los pecados capitales en latín (por ejemplo, Superbia). En esta serie corta de animé (y novela visual), todo parece una metáfora de algo más, aunque no se define si es así. Queda la duda al final. Como historia, tiene peleas con poderes. Destaca mucho en el ambiente el color rojo, porque todo se vuelve anormalmente rojo. Así que es algo distinto y como es breve, te lo podrías permitir sin riesgo de que te guste o no',NULL,'Recomendaciones','Aventura',NULL,1);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (5,'2023-09-06 21:18:04',0,'2023-09-06 21:18:03',0,'Chobits','Ésta es una historia de amor. Pero no cualquier historia. Se trata sobre un animé donde los robots forman parte de la sociedad y hasta se producen para ser la pareja perfecta de seres humanos. Sin embargo, ya desde el principio se deja claro que este tipo de relaciones generan problemas porque, después de formar un lazo afectivo con ellos,  los robots se rompen y las empresas no continúan fabricando las piezas para modelos más viejos. Incluso puede pasar que se les borre la memoria o algo asi. En este marco, el protagonista se encuentra una robot afuera del lugar que alquila y resulta todo un misterio de dónde salió. Aunque va descubriendo que no es tampoco como cualquier otro robot. Asi, le toma cariño pero al mismo tiempo le surgen preguntas. ¿Cuáles  serán las respuestas que ecpliquen este misterio? Si no lo viste, ¡no te lo pierdas! Sin duda, te va a encantar si te gusta el romance.',NULL,'Recomendaciones','Romance',NULL,1),(6,'2023-09-06 21:18:57',0,'2023-10-25 13:13:04',1,'Release that witch','Aunque técnicamente no sea un manga, al tratarse de una obra de origen chino, ello no evita que se encuentre entre los mejores isekai. La historia se aleja de los clichés del género y aporta personajes con cierta profundidad, que tienden a evolucionar con el paso de los capítulos. Como único punto negativo, diría que el poco fanservice que hay en la serie es del todo innecesario y no aporta nada, pero bueno, ya sabemos cómo funciona este género...Nuestro protagonista es transportado a otro mundo en el que deberá competir contra otros 4 herederos a la corona por hacerse con el trono. Para ello, deberá desarrollar sus dominios en el aspecto económico mejor que sus rivales. Se le encomienda la peor de todas las ciudades del reino: ¿será capaz de llevar a cabo sus planes o por el contrario, morirá miserablemente?',NULL,'Recomendaciones','Acción',NULL,1);
        
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (7,'2023-09-06 21:19:32',0,'2023-09-06 21:19:31',0,'Isekai Yakkyoku','¿Qué ocurriría si un químico farmacéutico investigador muriese y reencarnase en un mundo fantástico medieval en el que la medicina está atrasadísima? ¡Pues que intentaría revolucionarlo por completo! Acompaña a nuestro protagonista en su intento por hacer de este nuevo mundo que le ha dado otra oportunidad, un lugar mejor y digno en el que vivir.  Probablemente uno de mis favoritos, por no decir el que más. No tiene fanservice, ¡aleluya! Y la historia es muy interesante, a pesar de que los personajes sean bastante planos.',NULL,'Recomendaciones','Fantasía',NULL,1),(8,'2023-09-06 21:20:12',0,'2023-10-25 13:15:06',1,'A returners magic should be special','El mundo ha sido destruido, está perdido. Nuestro protagonista lo sabe y fallece en el último intento por evitar lo inevitable. No obstante, por alguna razón desconocida, es enviado al pasado, a una época en la que aún el mundo marchaba a la perfección y no se había producido el apocalipsis. Aún conserva sus recuerdos y ahora podrá incidir en el destino de todos los compañeros y compañeras que cayeron por el camino. Ahora podrá cambiar el mundo. No es una mala historia, quizá el protagonista esté muy overpowered y no termine de convencerme cómo evoluciona (sobre todo el ritmo al que lo hace, muy lentamente), pero lo cierto es que no tiene una historia mala y los personajes son entrañables. Una lectura interesante cuanto menos..',NULL,'Recomendaciones','Acción',NULL,1),(9,'2023-09-06 21:21:00',0,'2023-09-06 21:21:00',0,'Nihonkoku Shoukan','¿Y si Japón fuera teletransportado a un mundo fantástico? Sí, como lo has oído, todo un país transportado a otro mundo. Esta historia se centra en las relaciones que entablan los japoneses con los países de este mundo fantástico medieval. Una historia llena de política, intrigas, guerras y relaciones internacionales. Muy interesante, aporta una perspectiva distinta y por lo general, más madura al género de los isekai. Se aleja del fanservice, lo cual es algo que se agradece.',NULL,'Recomendaciones','Drama',NULL,1);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (10,'2023-09-06 21:23:30',0,'2023-10-25 13:21:23',1,'Attack on Titan','Attack on Titan sigue pisando fuerte desde su estreno hace alrededor de nueve años. La trama de esta serie gira alrededor de los titanes, los cuales amenazan la seguridad y libertad de los humanos que residen tras las murallas. Su protagonista, Eren Jaeger, se une a las tropas de de exploración y combate para hacer frente a los titanes, y así vengar a su fallecida madre. Su temporada final está en camino para este 2023 y, desde la propuesta original de su primera temporada, la narrativa ha evolucionado y tomado increíbles giros de guion. Es, sin duda, una obra maestra que no os podéis perder.',NULL,'Recomendaciones','Acción',NULL,2),(11,'2023-09-06 21:23:44',0,'2023-09-06 21:23:44',0,'Fullmetal Alchemist: Brotherhood','El gran líder de los rankings y notas perfectas: Fullmetal Alchemist es el shounen por excelencia. Brotherhood, de hecho, se trata de la segunda adaptación que este manga recibe, y ambas series son queridas por los fans aún a día de hoy. La trama gira en torno a dos hermanos, Edward Elric y Alphonse Elric, los cuales intentan hacer uso de la alquimia para traer de vuelta a su madre. No obstante, este experimento fracasa, y en el proceso Edward pierde su brazo y Alphonse acaba sellado en una armadura antigua. Tras esta tragedia, se aventuran para encontrar una forma de recuperar sus cuerpos.','Edward Elric','Recomendaciones','Aventura','',2),(12,'2023-09-06 21:24:01',0,'2023-09-06 21:24:00',0,'One-Punch Man','En su debut, One-Punch Man arrasó con su increíble animación e hilarante enfoque en las historias de superhéroes. Está protagonizada por un hombre con poderes inimaginables, Saitama, capaz de vencer a todos sus adversarios de un solo puñetazo. Esto se debe gracias a su entrenamiento que, desgraciadamente, le arrebató todo el cabello.','','Recomendaciones','Acción','',2);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (13,'2023-09-06 21:24:14',0,'2023-10-25 13:19:58',1,'Demon Slayer','Otro bombazo reciente, Demon Slayer nos cuenta la historia de Tanjiro y su hermana Nezuko, los únicos supervivientes de su familia tras un ataque de un grupo de demonios. Asimismo, Nezuko sufre las consecuencias del ataque y se ve convertida en un demonio poco a poco. Tras estos sucesos, en busca de venganza, Tanjiro decide convertirse en cazador de demonios y buscar la manera de curar a su hermana. Desde su primera temporada, esta serie ha estado en boca de todo el mundo, y su reciente película ha logrado batir records inimaginables.',NULL,'Recomendaciones','Ciencia-ficción',NULL,2),(14,'2023-09-06 21:24:30',0,'2023-09-06 21:24:29',0,'Kaguya-sama: Love Is War','La guerra de amor e ingenio entre dos genios: Kaguya-sama: Love is War se centra en el romance entre Miyuki Shirogane, el presidente del consejo estudiantil, y Kaguya Shinomiya, su mano derecha. En esta hilarante comedia romántica, estos dos personajes idearán situaciones para forzar que el otro confiese sus sentimientos, y quien caiga primero perderá “la guerra”. La tercera temporada de esta gran comedia romántica alcanzó su fin hace poco, y prevee una película en el futuro. Sin duda, es de las mejores obras de su género','Miyuki Shirogane','Recomendaciones','Romance','',2),(15,'2023-09-06 21:24:42',0,'2023-09-06 21:24:42',0,'Fruits Basket','Su cuarta temporada ha amasado una gran fama, colocándose incluso en el primer puesto del ranking de MyAnimeList durante algún tiempo. La historia gira en torno a una estudiante llamada Tooru Honda, la cual pasa a vivir con algunos miembros de la rama familiar Souma tras la muerte de su madre. Es durante este tiempo que descubre un gran secreto: esta familia sufre una maldición donde los miembros familiares se convertirán en un animal del Zodiaco chino si son abrazados por alguien del sexo opuesto.','Tooru Honda','Recomendaciones','Romance','',2);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (16,'2023-09-06 21:24:55',0,'2023-10-25 13:18:23',1,'Assassination Classroom','Los estudiantes de la clase 3-E de la secundaria Kunugigaoka no tienen un esperanzador futuro académico por delante: han sido apartados de la rama principal de su escuela y son tratados como inferiores. Sin embargo, un día sus vidas se ven volcadas cuando el monstruo ultra veloz, Koro-sensei, toma el cargo de la clase. Este profesor les propone un desafío: si consiguen matarle antes de un año, no destruirá la Tierra y concederá una recompensa de 10 billones a sus estudiantes. Esta comedia repleta de comedia y acción es sin duda un shounen que no os podéis perder.',NULL,'Recomendaciones','Comedia',NULL,2),(17,'2023-09-06 21:25:14',0,'2023-10-25 13:19:15',1,'Haikyuu!!','Shouyou Hinata está maravillado por la naturaleza del voleibol. Su estatura juega en contra, pero su objetivo de jugar profesionalmente algún día le da fuerzas para seguir adelante. En su nuevo equipo, se da cuenta que uno de sus nuevos compañeros se trata del prodigio que le machacó en su temprana juventud, y deberá poner sus diferencias aparte para que el equipo pueda funcionar como una sola unidad. Haikyuu!! es de los mayores hits de spokon de los últimos años, y sus diferentes temporadas merecen la pena.',NULL,'Recomendaciones','Deportes',NULL,2),(18,'2023-09-06 21:28:36',0,'2023-09-06 21:28:36',0,'Dead Parade','Hacía bastante tiempo que no caía en las redes de un anime. Me empezaba a dar la sensación de que el género se estaba alejando de mis perspectivas hasta que, por una recomendación, caí en las garras de ‘Death Parade’. Así, me he reencontrado con un género que tenía abandonado y rezo por una segunda temporada de esta maravilla. Y hasta aquí puedo decir sin caer en los tan temidos SPOILERS. Si vais a verla, dejad de leer aquí. ------ Podríamos definir ‘Death Parade’ como un anime encargado de filosofar sobre la vida y la muerte y sobre todo lo que transcurre una vez que nuestra existencia en la Tierra llega a su fin. No os dejéis engañar por su primer episodio, el más sangriento de los doce y que puede recordar a la saga ‘Saw’. Sorprendentemente, el hilo argumental principal de ‘Death Parade’ nos reserva mucho más y un maravilloso y original mundo por descubrir.He quedado maravillado por esta visión del “más allá”, repleta de jueces y de personas parecidas a dioses.',NULL,'Recomendaciones','Psicológico',NULL,3);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (19,'2023-09-06 21:29:47',0,'2023-10-25 13:03:25',1,'Mushishi','Y no me gusta mucho usar la palabra poesía para referirme a series o películas, pues cuando lo veo suelo pensar que es una pedantería innecesaria. Pero lo cierto es que no encuentro nada mejor para definir esta serie, que prescinde de una trama compleja y vertebrada para convertir cada capítulo en una simple y emotiva historia caracterizada siempre por su artística belleza y por lograr llegar a lo más hondo del espectador.El planteamiento es muy simple: Ginko es un Mushisi, experto en Mushis, unas misteriosas criaturas que la mayoría de humanos no pueden ver pero que están ahí y suelen alterar sus vidas sin que éstos lo sepan. Ginko viaja por Japón investigando más sobre estas criaturas a la vez que ayuda a quellos a los que les han causado problemas. Y cada capítulo será un caso distinto y sin relación con los anteriores..',NULL,'Recomendaciones','Sobrenatural',NULL,3),(20,'2023-09-06 21:30:49',0,'2023-10-25 13:05:34',1,'No Game No Life','La historia está protagonizada por Sora y Shiro, hermano y hermana, que son muy famosos en todo Internet como NEETs y hikikomoris que se pasan el día jugando a videojuegos, tanto que son una leyenda. Los dos consideran el mundo real como “un juego malo”. Un día, un chico llamado “Dios” les invoca a otro mundo. Allí, Dios ha prohibido las guerras y declara que en el mundo todo se decidirá mediante juegos, incluso cuáles serán las fronteras entre países.',NULL,'Recomendaciones','Ciencia-ficción',NULL,3);

        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (21,'2023-09-06 21:32:14',0,'2023-10-25 13:02:03',1,'Death Note','Lo único que se me ocurre para poder ofrecer una crítica constructiva de esta serie es explicar el porqué de la calificación que le otorgo (10 - Excelente). Hace dos días que la terminé de ver y he querido esperar un poco antes de dar mi opinión para no dejarme llevar por las emociones más inmediatas. A primera vista es una serie que se merece un 10 porque tiene la capacidad de atrapar a un amplio abanico de público al margen de sus preferencias de género, puede no gustarte nada el anime y adorar esta serie, puede no gustarte nada la intriga y el misterio y quedar atrapado por la serie sin remedio alguno. ¿Cómo logra esto? Pues, la respuesta es sencilla: con un argumento que te hace protagonista de alguna manera porque te obliga a reflexionar gracias a la magistral forma en que la serie nos ofrece la dicotomía entre el bien y el mal, la justicia y la injusticia, lo divino y lo diabólico. ',NULL,'Recomendaciones','Psicológico',NULL,3),(22,'2023-09-06 21:33:13',0,'2023-09-06 21:33:12',0,'Deadman Wonderland','Antes de nada, aclaro que el título que antecede a esta crítica lo entenderán aquellos que hayan escuchado el excelente opening de este anime. De la manida premisa de un crimen no cometido parte esta irregular serie, pero para la ocasión de una de las formas más brutales que puedan imaginarse: un niño es acusado de asesinar a todos sus compañeros de clase. Pese a un inicio que hace augurar un seinen interesante, pronto todo se queda en agua de borrajas, o en un shonen con bastante gore.',NULL,'Recomendaciones','Terror',NULL,3);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (23,'2023-09-06 21:35:06',0,'2023-09-06 21:35:06',0,'Elfen Lied','Elfen Lied es una obra imprescindible. Una historia donde la belleza y la crueldad se fusionan en perfecta armonía para brindarnos una experiencia inolvidable que se guarda en la retina y en el corazón por siempre. Una relato cruel, lleno de horrores y esperanza. Personajes entrañables y bien desarrollado a través de sus 14 episodios. Una banda sonora inolvidable encabezada por la magnífica Lilium. Cada elemento que la conforma está perfectamente ejecutado y ensamblado. Una anime que, sin duda, todos deberían ver, aún a pesar de su gran carga de material violento. En definitiva, Elfen Lied es un producto que grita calidad y que seguirá trascendiendo a través de los años como ejemplo del porqué miles de personas alrededor del mundo gustamos de la animación japonesa y que puede competir ante cualquier otra propuesta de entretenimiento, llámese película, libro, manga, o serie de televisión. Excelente.',NULL,'Recomendaciones','Psicológico',NULL,3),(24,'2023-09-06 21:36:24',0,'2023-10-25 13:06:43',1,'Mirai Nikki','Un principio interesante aunque algo confuso, lo suficiente como para servir la intriga en bandeja de plata y mantenerla. Ahora bien, el avance de la trama es torpe, los personajes se extremizan sin motivo aparente, el desenlace se resuelve en una clase de tópicos amorosos que el espectador no puede entender, como el personaje de Yukki en general, que resulta estúpido en su pretensión de existencialismo rancio, pues constantemente se haya en debates internos sobre cuestiones que son bastante claras per se. Los únicos personajes reseñables, a mi entender, por su coherencia en el anime son: Akise Aru y Uryuu Minene. ',NULL,'Recomendaciones','Psicológico',NULL,3);
        `
    );
        

    await connection.query(
        `
        INSERT INTO entries VALUES (25,'2023-09-07 17:54:58',0,'2023-10-25 12:35:27',1,'la cara de tu padre cuando',' le preguntas que hay de comer y va a responder comida',NULL,'Memes','Infantil',NULL,2),(26,'2023-09-11 09:31:09',0,'2023-10-25 12:34:03',1,'Dia 1 de vuelta a clase...','cuanto queda?',NULL,'Memes','Infantil',NULL,2),(28,'2023-09-11 10:55:39',0,'2023-10-25 12:32:07',1,'L gigachad',' ',NULL,'FanArt','Psicológico',NULL,2),(29,'2023-09-11 10:56:52',0,'2023-10-25 12:31:28',1,'Deku',' ',NULL,'FanArt','Aventura',NULL,2),(30,'2023-09-11 10:58:18',0,'2023-10-25 12:27:47',1,'Zerotwo',' ',NULL,'FanArt','Psicológico',NULL,2),(32,'2023-09-11 11:53:18',0,'2023-10-25 12:23:01',1,'Familia pokemon',' ',NULL,'Cosplays','Aventura',NULL,2),(33,'2023-09-11 11:54:07',0,'2023-10-25 12:22:28',1,'Orochimaru',' ',NULL,'Cosplays','Aventura',NULL,2),(34,'2023-09-11 12:02:58',0,'2023-10-25 12:21:21',1,'Inuyasha',' ',NULL,'Cosplays','Fantasía',NULL,2),(35,'2023-09-12 09:50:13',0,'2023-10-25 12:50:34',1,'la vida','es dura',NULL,'Memes','Infantil',NULL,1),(36,'2023-09-12 10:58:42',0,'2023-09-12 11:11:30',0,'linkin park lee','pelos como escarpias',NULL,'Openings','Aventura','https://www.youtube.com/watch?v=VgDgWzBL7s4&ab_channel=AlejandroRAR',1),(37,'2023-09-12 10:59:30',0,'2023-09-12 11:03:26',0,'atravesei','unha nube brillante atravesei',NULL,'Openings','Aventura','https://www.youtube.com/watch?v=8OQT9eW8ylE&ab_channel=BaldrikRock',1),(38,'2023-09-12 11:24:33',0,'2023-09-12 11:24:32',0,'Gargamel','Me da la sensacion, quiero pensar, que he oido por ahí que Gargamel tenía algo con pitufina, alguien confirma o desmiente¿',NULL,'Teorías','Infantil',NULL,1),(39,'2023-09-12 11:27:28',0,'2023-09-12 11:27:28',0,'Asuma sensei','Hay quien dice que Asuma no está muerto, se fue a una isla con 2pac y michael jackson a clavarse unos cojonudos de nicotina, ¿opiniones?',NULL,'Teorías','Aventura',NULL,1),(40,'2023-09-12 11:28:20',0,'2023-09-12 11:28:19',0,'Doctor Granudo','Si el perro del doctor granudo estaba muerto ¿como podía ladrar? es posible que estuviera vivo como Asuma, (soy el del post de Asuma)',NULL,'Teorías','Infantil',NULL,1);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (41,'2023-09-12 11:30:13',0,'2023-09-12 11:30:12',0,'¿Qué es el One Piece?','Después de más de 25 años de historia y una legión de fans gigantesca, aún no se ha proporcionado una respuesta oficial a una de las cuestiones más teorizadas en el mundo del anime. ¿Qué es realmente el One Piece? este tesoro mencionado desde el principio de la serie, fue dejado por Gol D. Roger en la última isla del Grand Line llamada Raftel (o Laugh Tale).A pesar de esto, la comunidad y los fanáticos han creado varias teorías sobre lo que puede ser este tesoro. No obstante, existe una que destaca por encima de todas por ser la más razonable. Según esta teoría, el One Piece es físico y existe de una manera muy especial, tal y como lo ha mencionado Barbablanca.',NULL,'Teorías','Infantil',NULL,1),(42,'2023-09-12 11:33:17',0,'2023-09-12 11:33:17',0,'¿Está L muerto de verdad?',' En el minuto 14 segundo 25 del capítulo 35 de death note se ve una tarta a medio comer en el fragmento de la esquina inferior derecha, lo que da a pensar que L puede seguir clavandose unas cojonudas diabéticas de fresa y nata, por lo que creo que seguramente esté con Asuma, 2Pac, Michael Jackson y el perro del Doctor Granudo en el islote de enfrente de la pajarería de Transilvania ¿bancan? (Soy el del Post de Asuma y del Doctor Granudo)',NULL,'Teorías','Thriller',NULL,1),(48,'2023-10-05 12:16:54',0,'2023-10-05 12:16:54',0,'Me encanta esta canción','Que motivada llevo con este anime, EL PEQUEÑO GIGANTE MACHO!',NULL,'Openings','Deportes','https://www.youtube.com/watch?v=lIPAFL84jIo&ab_channel=sh-shoyo',1),(49,'2023-10-05 12:17:51',0,'2023-10-05 12:17:51',0,'Mi opening favorito','Mi opening favorito de todos los tiempos',NULL,'Openings','Psicológico','https://www.youtube.com/watch?v=kNyR46eHDxE&ab_channel=StarkProductions',1),(50,'2023-10-05 12:18:43',0,'2023-10-05 12:18:43',0,'Junto a nuestros digimooooooooooooooon','hasta librar la tierra, DE LAS RUEDAS NEGRAAAAAAAS',NULL,'Openings','Infantil','https://www.youtube.com/watch?v=UXwunDD5Lm8&ab_channel=PGMProjects',1),(51,'2023-10-05 12:24:16',0,'2023-10-05 12:24:15',0,'Blue bird','Mejor opening de la historia para el mejor anime de la historia',NULL,'Openings','Aventura','https://www.youtube.com/watch?v=o-hzTmeCqN0&ab_channel=meena%E2%99%A1',4);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (52,'2023-10-05 12:25:23',0,'2023-10-05 12:25:22',0,'Siempre triste','Pero buena rolita para pilotar el EVA',NULL,'Openings','Psicológico','https://www.youtube.com/watch?v=bNBzOiavw_4&ab_channel=meena%E2%99%A1',4),(53,'2023-10-05 12:26:52',0,'2023-10-05 12:26:51',0,'PLUS ULTRA!','☺',NULL,'Openings','Aventura','https://www.youtube.com/watch?v=v1YojYU5nPQ&ab_channel=CrunchyrollDubs',4),(54,'2023-10-05 12:32:27',0,'2023-10-25 12:49:53',1,'Aquí no hay quien Shinji','Los que entienden entendieron ',NULL,'Memes','Psicológico',NULL,4),(55,'2023-10-05 12:34:34',0,'2023-10-25 12:48:07',1,'Vegetta MDRL','Los duros usan Motorola',NULL,'Memes','Comedia',NULL,4),(56,'2023-10-05 12:35:47',0,'2023-10-25 12:47:50',1,'Igualito que mi colegio','Que peligro Jiraiya',NULL,'Memes','Aventura',NULL,4),(57,'2023-10-05 12:36:43',0,'2023-10-25 12:46:51',1,'Inosuke on drugs','Que le pasa en la cara al carnal',NULL,'Cosplays','Aventura',NULL,4),(58,'2023-10-05 12:37:38',0,'2023-10-25 12:45:42',1,'Nezuwu','uwu',NULL,'Cosplays','Aventura',NULL,4),(59,'2023-10-05 12:38:36',0,'2023-10-25 12:45:28',1,'PortGas D Ace','Así de fachero lucía mi cosplay en la convención de Perú, puntuén',NULL,'Cosplays','Aventura',NULL,4),(60,'2023-10-05 12:39:35',0,'2023-10-25 12:45:11',1,'Equipo 7!','Muy bien caracterizados estos carnales, les falta Kakashi!',NULL,'Cosplays','Infantil',NULL,4),(61,'2023-10-05 12:40:51',0,'2023-10-25 12:39:45',1,'Genial esta clase!','Me encanta el maestro EraserHead!',NULL,'Cosplays','Aventura',NULL,4),(65,'2023-10-05 12:48:22',0,'2023-10-25 12:13:58',1,'Increible cosplay de Jinx!','Alguien más juega lol¿? Me encanta este cosplay y este personaje, aún recuerdo la cinemática de cuando salió, fue increíble GET JINXED LOL',NULL,'Cosplays','Fantasía',NULL,3),(67,'2023-10-05 12:50:13',0,'2023-10-25 12:15:08',1,'Couple Goals','Que cutes, uwu',NULL,'Cosplays','Romance',NULL,3),(68,'2023-10-05 12:51:56',0,'2023-10-05 12:51:55',0,'Elfen Lied','Genial anime',NULL,'Openings','Fantasía','https://www.youtube.com/watch?v=aTMHUnoIY10&ab_channel=Dusza_Torpedowej_Dziewczyny',3),(69,'2023-10-05 12:56:49',0,'2023-10-05 12:56:48',0,'Parasyte Opening','Shinichiiiiiiiiii',NULL,'Openings','Ciencia-ficción','https://www.youtube.com/watch?v=Rm8UjBAS3cs&ab_channel=Shiroyasha',3);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (72,'2023-10-05 13:00:28',0,'2023-10-25 12:15:41',1,'Eren Chibi uwu','Genial ilustración de Eren chiquito!',NULL,'FanArt','Aventura',NULL,3),(74,'2023-10-05 13:02:41',0,'2023-10-05 13:02:41',0,'Teoría sobre el One Piece','Esta teoría es una mis preferidas y, aunque principio me llegó por un buen amigo mío y no terminó de convencerme; más tarde comprobé que el usuario newworldartur también creó un vídeo increíble defendiéndola y ahí mis dudas quedaron despejadas. En ella se dice que el One Piece es una botella del sake de Binks, una bebida que lleva apareciendo en la serie desde el principio y que siempre se encarga de unir a la gente y provocar risas???. Por supuesto la explicación es larguísima y tendría que explayarme demasiado para exponerla, pero si lo pensáis un poco tiene todo el sentido; el sake aparece en muchísimas escenas importantes de la serie, es el tesoro perfecto para un pirata de verdad y es algo que tiene un gran significado: la idea de que el gran tesoro sea tomarte un vaso de sake con tus amigos y reir mientras habláis de vuestras aventuras???',NULL,'Teorías','Aventura',NULL,3),(75,'2023-10-05 13:03:20',0,'2023-10-05 13:03:19',0,'Otra teoría sobre el One Piece','Otra teoría interesante va ligada al supuesto sueño de Luffy (que compartiría con Joy Boy y Roger). Joy Boy habría ideado un plan maestro para destruir la Red Line a través de las Armas Ancestrales y con el objetivo de unificar todos los mares??? Tras eso montaría la mayor fiesta de la historia de la humanidad, reuniendo en un mismo lugar a seres de todas las razas con el único objetivo de beber, cantar y reír. Además si la Red Line desapareciese sucederían cosas que tendrían mucho sentido: nacería el All Blue (el sueño de Sanji), los Gyojin regresarían a la superficie con el Noah porque su reino quedaría arrasado, el Gobierno Mundial caería derrotado...?? Roger descubrió este plan en Laugh Tale y se rió a carcajadas al parecerle una idea maravillosa, pero por desgracia él no pudo llevarla a cabo por llegar demasiado pronto y por la enfermedad que iba a acabar con su vida?⌛',NULL,'Teorías','Aventura',NULL,3);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (76,'2023-10-05 13:04:12',0,'2023-10-05 13:04:11',0,'Última teoría sobre One Piece','El youtuber El Quinto Emperador elaboró una interesante teoría hace un par de años en la que sugirió que el One Piece pudiese ser una canción dividida en varias partes?La canción es El Sake de Binks, pero la parte que todos conocemos tan sólo sería un fragmento.¡El One sería la historia completa del Sake de Binks, una canción dividida en tres partes: 
        Parte 1: la canción del Sake de Binks que todos conocen
        Parte 2: extractos repartidos por todo el mundo en diferentes Poneglyphs
        Parte 3: el tesoro que hay en Laugh Tale y que narraría la historia del Siglo Vacío
        Al unir todo esto nos quedaría la historia completa del Sake de Binks, una canción que cuenta TODA la historia del Siglo Vacío, y por eso mismo el Gobierno Mundial teme que alguien pueda descubrirla?',NULL,'Teorías','Aventura',NULL,3),(77,'2023-10-05 13:14:32',0,'2023-10-05 13:14:32',0,'Jiraiya no está muerto','La muerte de Jiraiya es algo que los fans nunca podemos superar. Por lo tanto, al ver a Kashin Koji con asombrosas similitudes con Jiraiya, no podíamos dejar de esperar que fuera un nuevo avatar del Toadsage. Las cosas se pusieron aún más interesantes cuando Kashin Koji sacó técnicas directamente del arsenal de Jiraiya, incluida la invocación de Rasengan y Toad. Si eso no es suficiente, el chakra de Koji no activó el sistema de seguridad de Konoha confirmando que su chakra es familiar. Esto a su vez encendió a los fanáticos del anime para que presentaran teorías de fanáticos, que posteriormente resultaron ser ciertas.
        Kashin Koji es el clon de Jiraiya
        Kashin Koji fue inicialmente un agente doble que se infiltró en Kara con el único propósito de acabar con Isshiki Otsutsuki. Perdió su máscara mientras luchaba contra Jigen, y se ve exactamente idéntico al joven Jiraiya. Las marcas de ojos rojos y un lunar en la nariz hacen obvio que Koji tiene que estar relacionado de alguna manera con Jiraiya. Además, el Capítulo 47 del manga de Boruto confirmó que Koji es un clon artificial de Jiraiya hecho por Amado.',NULL,'Teorías','Aventura',NULL,4);
        
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (80,'2023-10-05 13:23:11',0,'2023-10-05 13:23:11',0,'Comerse el dedo de Sukuna','Itadori consumió el dedo de Sukuna y entró en la oscuridad del mundo Jujutsu de su libre albedrío, ¿verdad? Al menos eso es lo que pensamos hasta que Kenjaku fue introducido en la historia. Es un hechicero malvado del pasado que sobrevivió tanto tiempo cambiando de un cuerpo a otro. En este momento, reside en el cuerpo sin vida de Suguru Geto. Mientras que en algunos de los paneles de flashback, vimos a la madre de Itadori con puntos de sutura en la cabeza, lo que confirma que es un recipiente de Kenjaku. Itadori Yuji después de comer Sukuna Finger. Por lo tanto, creo que Kenjaku teniendo un hijo con Itadori Jin (el padre de Yuji) es otro de sus intentos de crear un híbrido humano-maldición. Esto ata todo en una red misteriosa. Desde la fuerza sobrehumana de Yuji hasta convertirse en el recipiente perfecto de Sukuna, todo estaba de acuerdo con el plan de Kenjaku. Además, en los juegos de Culling en curso, Itadori fue identificado como participante incluso antes de cruzar una barrera. Inmediatamente infiere que esto sucedió debido a la presencia de Sukuna dentro de él. Ahora, todos los prerregistrados están de acuerdo con los contratos hechos por Kenjaku, lo que confirma que Itadori consumir el dedo maldito no fue una coincidencia. Más bien, el plan maestro de Kenjaku es traer de vuelta al Rey de las Maldiciones y aprovechar sus poderes a través del recipiente perfecto que creó.',NULL,'Teorías','Psicológico',NULL,4);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (81,'2023-10-05 13:27:55',0,'2023-10-05 13:27:55',0,'Teoría sobre Eren','La historia de Eren Yeager comenzó cuando él se despertó con una terrible pesadilla en un día soleado. Las lágrimas rodaron por sus mejillas, y lo único que recordaba era el pelo corto de Mikasa. Muchos fanáticos opinaron que él fue testigo de los eventos futuros en ese sueño, pero no prestamos mucha atención. Sin embargo, tuvimos que reconsiderar la teoría ya que Eren murió a manos de Mikasa, y todas las cosas horribles con las que soñaba realmente le sucedieron. Eren despertando de la pesadilla. Se dice con razón que todo en Attack on Titan está atado en un bucle de tiempo sin fin. El sueño que vio ese día fue mucho más que cualquier profecía. En el Capítulo 138, vimos a Eren soñando con los días de su infancia en sus momentos finales, donde Mikasa dijo, «Nos vemos luego …» Curiosamente, escuchó exactamente las mismas palabras en su primer sueño, confirmando así que ambos sueños están conectados de alguna manera. En palabras simples, Eren muere en el presente para despertar en su pasado con todos sus recuerdos perdidos, y el ciclo continúa.',NULL,'Teorías','Acción',NULL,2),(82,'2023-10-05 13:28:16',0,'2023-10-05 13:28:16',0,'Otra teoría sobre Eren','Desde el ataque de Liberio, la acción de Eren comenzó a no tener sentido. Dejó de preocuparse por las vidas humanas y pasó a erradicar a todos los que estaban fuera del muro. Esto suena loco, ¿verdad? Sin embargo, los fanáticos de Yeagerist defendieron a su ídolo alegando que las acciones de Eren eran un movimiento de sacrificio para reunir al mundo convirtiéndose en una amenaza mayor. Muchos predijeron que Eren perdería voluntariamente la pelea cuando llegue el momento.¡Eren Yeager en Liberio¡ Esta teoría sesgada finalmente resulta ser cierta. Para alguien que tenía los poderes del Titán fundador, no hay forma de que Eren haya sido derrotado. Podría haber convertido a todos los eldianos repugnantes en titanes, pero no lo hizo. En el fondo, aceptó su destino de morir en manos de Mikasa.',NULL,'Teorías','Acción',NULL,2),(83,'2023-10-05 13:30:03',0,'2023-10-05 13:30:03',0,'Saitama!','One puuuuuuuuuuuunch!',NULL,'Openings','Aventura','https://www.youtube.com/watch?v=erQURy_Ys5Y&ab_channel=TriaxFx',2);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (84,'2023-10-05 13:33:32',0,'2023-10-05 13:33:32',0,'Teoría sobre Vegetta','Vegeta seguía diciendo que coincidiría con el Ultra Instinto de Goku a su manera. Nunca, por una vez, intentó recurrir al movimiento característico de Angel que implica movimientos corporales autónomos. Mantener el corazón fresco y calmado simplemente no es el fuerte de Vegeta. Continuó con sus explosivas sesiones de entrenamiento donde Beerus le enseñó el movimiento característico de los Hakaishins. En su reciente pelea contra Granolah, se le ocurrió una transformación llamativa, Ultra Ego, basada en la técnica Hakai. Esto es algo sobre lo que los fanáticos han estado especulando durante años.',NULL,'Teorías','Acción',NULL,2),(85,'2023-10-05 13:34:08',0,'2023-10-05 13:34:07',0,'Dos animes en el mismo mundo','Con solo echar un vistazo al tráiler de Weathering With You, muchos fanáticos opinaron que está ambientado en el mismo mundo que Your Name. Sin embargo, la mayoría se negó a creerlo hasta que Taki y Mitsuha hicieron sus cameos en la película, confirmando así la teoría. Makoto Shinkai presentará otra película en el otoño de 2022, Suzume no Tojimari, y los fanáticos esperan que la película se desarrolle en el mismo mundo nuevamente. Obviamente, la trama no se relacionará de ninguna manera. Pero el hecho de que las películas estén ambientadas en un mundo común abre la posibilidad de que aparezcan rostros familiares.',NULL,'Teorías','Romance',NULL,2),(86,'2023-10-05 13:34:39',0,'2023-10-05 13:34:38',0,'La cuarta mancha de Luffy','La cuarta marcha de Luffy es como el Ultra Instinto de Goku. Todos lo vimos venir siglos antes de que realmente llegara. Sin duda, es el mayor potenciador de Luffy que jamás haya recibido. No solo lo ayudó a mantenerse al día con la fuerza cada vez mayor de su enemigo, sino que también aumentó su velocidad, resistencia y resistencia en gran medida. Durante años, Luffy siguió cambiando entre Gear segundo y Gear tercero, pero los fanáticos nunca abandonaron sus esperanzas de ver el cuarto. La espera valió la pena, ya que el encendido cuenta como uno de los momentos más grandes de One Piece de todos los tiempos. Cuarta marcha de Luffy',NULL,'Teorías','Aventura',NULL,2);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (87,'2023-10-05 13:36:15',0,'2023-10-05 13:36:14',0,'Light Yagami se convierte en Shinigami después de la muerte','Una de las muchas condiciones para usar Death Note establece que el usuario no irá ni al cielo ni al infierno. Fue entonces cuando a los fanáticos del anime se les ocurrieron teorías de fanáticos que resultaron ser ciertas. Se dio que Light moriría al final de la serie, la pregunta era si se convertiría en un shinigami. Dadas las reglas de la nota de muerte, ¿puedes pensar en un lugar que no sea el cielo, el infierno o la tierra? Sí, el reino Shinigami. A los fanáticos se les ocurrieron teorías de que todos los Shinigamis alguna vez fueron humanos que intentaron explotar los poderes de Death Note.  Light Yagami como Shinigami  Fue al final de Death Note Relight donde vimos a un Shinigami sin nombre con sorprendentes similitudes con Light. Tenía una corbata roja alrededor de la frente, al igual que el uniforme de la escuela secundaria de Light, junto con un abrigo y una bolsa de mensajero similares. El Shinigami no identificado le arrojó a Ryuk una manzana como solía dar Light. Light debe haber perdido sus recuerdos después de reencarnarse, y es por eso que sentía curiosidad por la historia de Ryuk (su propio pasado). Sin embargo, no esperó a que Ryuk completara su narración como si ya supiera el final.',NULL,'Teorías','Acción',NULL,1),(88,'2023-10-05 13:39:11',0,'2023-10-05 13:40:43',1,'Todoroki y Dabi hermanos?','Ojos azules, voluntad inquebrantable y poderes de incineración inigualables, todo en Dabi insinuaba que podría estar relacionado de alguna manera con la familia Todoroki. Siempre tuvimos nuestras dudas, pero el Capítulo 252 de My Hero Academia confirmó que la verdadera identidad de Dabi es Toya Todoroki, el hijo mayor de Endeavour. Endeavour se encuentra a sí mismo responsable de lo que le sucedió a Toya, y debe haber creado el monstruo que vemos en Dabi. Todo tiene sentido por el hecho de que Dabi guarda un gran rencor hacia Endeavour y su familia.',NULL,'Teorías','Acción',NULL,1);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (89,'2023-10-05 13:49:12',0,'2023-10-25 13:10:49',1,'Full Metal Alchemist: Brotherhood','Toca temas muy interesantes como la moral, el concepto de dios, la religión y la ciencia. Tiene un elenco de personajes muy interesante, junto con algunas subtramas que nutren mucho la historia. El sistema de alquimia es interesante y la banda sonora me gusta.',NULL,'Recomendaciones','Acción',NULL,1),(90,'2023-10-05 13:51:13',0,'2023-10-05 13:51:13',0,'Death Note','Cuando Light Yagami, estudiante japonés, se adueña de un cuaderno misterioso, descubre que tiene la facultad de matar a cualquiera cuyo nombre escriba en el cuaderno.
        El enfrentamiento entre Light y L, es una de las mejores dinámicas/rivalidades que puede ofrecer el medio, su choque de ideales y métodos contrastan muy bien.',NULL,'Recomendaciones','Psicológico',NULL,1),(91,'2023-10-05 13:51:47',0,'2023-10-25 13:12:14',1,'Hunter X Hunter','La serie inicia con Gon Freecs, quien aspira a convertirse en un Hunter, junto a sus amigos, para encontrar a su padre. (la sinopsis no le hace justicia, pero quiero evitar spoilers)
        El mejor sistema de poder que vi en mi vida. Su sistema, funcionamiento y creatividad le aportan mucho a la serie, hacen de cada enfrentamiento algo único. La mayoría de los arcos son buenos, tiene buena banda sonora. Un elenco de personajes del carajo, sobre todo la calidad que tiene de antagonistas.',NULL,'Recomendaciones','Fantasía',NULL,1),(92,'2023-10-05 13:52:33',0,'2023-10-05 13:52:33',0,'Attack on Titan','Después de que su aldea es destruida y su madre asesinada por una raza de monstruos llamados Titanes, Eren Jaeger jura limpiar el mundo de esta amenaza que pone en peligro a la humanidad. Una construcción de mundo bastante interesante, rodeada de un halo de misterio. Tiene una buena cuota de política y por sobre todo, momentos de epicidad. Para mi, tiene algunos personajes bastante destacables.',NULL,'Recomendaciones','Acción',NULL,4);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (93,'2023-10-05 13:53:18',0,'2023-10-25 13:17:30',1,'Vinland Saga','Tras el asesinato de su padre, Thorfinn se une a la banda de su asesino, Askeladd, para planear su venganza. (la sinopsis no le hace justicia, pero quiero evitar spoilers) Es una historia increíble, con muy buen desarrollo de personajes, toca temas muy elementales como la vida, el amor y la muerte de una forma muy natural. Tiene muchos momentos memorables; el único ““problema”” es la barrera del lenguaje, todos hablan japonés pero no todos son del mismo pais y eso puede ser un poco raro en algunos momentos específicos. Pd, la banda sonora es muy linda.',NULL,'Recomendaciones','Aventura',NULL,2),(94,'2023-10-05 13:54:00',0,'2023-10-25 13:00:35',1,'Jujutsu Kaisen','Todos los seres vivos emanan una energía llamada Energía Maldita, que brota de las emociones negativas que fluyen naturalmente por el cuerpo. Como resultado, liberan continuamente esta Energía Maldita, lo que da lugar a que surjan las Maldiciones. Los hechiceros se encargan de mantener a ralla a las maldiciones. Esta historia comienza con Itadori Yuji, quien ingiere una parte de una antigua maldición y debe juntar las otras partes para exorcisar esta amenaza. Hoy por Hoy, es el Shonen de peleas por excelencia, con una historia simple pero bien ejecutada; con un ritmo acelerado, pero no se siente que tengan prisa por avanzar, simplemente no para . Excelentes enfrentamientos, con un sistema de poder muy bien organizado y creativo. Tiene muy buenos personajes y se ve de puta madre.',NULL,'Recomendaciones','Fantasía',NULL,3),(95,'2023-10-05 13:55:01',0,'2023-10-25 13:09:01',1,'Chainsaw Man','Denji es un joven atrapado en la pobreza extrema, que trabaja para saldar una deuda con los Yakuza trabajando como cazador de demonios, con la ayuda de Pochita, su fiel compañero canino.Rompe muchas convenciones del genero, desde las motivaciones y actitudes de Denji como protagonista, la narrativa o los temas que toca. El soundtrack es épico y el aspecto visual es excelente. El resto del elenco es muy bueno. Super recomendable, pero a tener paciencia con las fechas.',NULL,'Recomendaciones','Acción',NULL,1);

        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (96,'2023-10-05 13:55:37',0,'2023-10-05 13:55:37',0,'Aoashi','Es la historia de Ashito Aoi, un estudiante de secundaria de la prefectura de Ehime. Es un pibe que ama el football y tiene un talento muy crudo para el deporte. Es descubierto por el scout Tatsuya Fukuda, quien le ofrece la oportunidad en el mundo del football.Cuenta con un enfoque muy realista hacia el deporte, desde los conceptos futbolísticos que explican e implementan, hasta visualmente. Es refrescante ver un anime de deporte fuera del ambiente convencional escolar, acá lo que esta en juego es una carrera profesional y se nota.',NULL,'Recomendaciones','Deportes',NULL,4),(97,'2023-10-05 13:59:09',0,'2023-10-05 13:59:08',0,'Blue Lock','Tras su eliminación del mundial de Football, Japón se encuentra estancado futbolísticamente. El deseo del pais Nipón por alcanzar la gloria, los lleva a implementar un nuevo y riguroso programa de entrenamiento para encontrar al próximo delantero de la selección nacional. Trescientos jugadores de secundaria se enfrentan entre sí por el puesto, pero solo uno puede ser el nuevo astro. A diferencia de Ao Ashi, esta serie esta del lado mas anime del deporte en cuanto a realismo (al estilo Super campeones). En cambio, centra su atención en otros aspectos del deporte mas enfocado en el atleta, tales como el ego o la ambición, y en general busca desglosar al football de otra manera. Pd, en mi opinión, el manga es mejor, pero el anime viene bien.',NULL,'Recomendaciones','Deportes',NULL,3),(98,'2023-10-05 13:59:55',0,'2023-10-25 13:16:54',1,'Cowboy Bebop','Cuenta la historia de un grupo de cazarrecompensas que en 2071 viaja por todo el sistema solar a la búsqueda de misiones con la que aumentar su fortuna. (o algo así, claramente la serie es mas interesante). Se maneja por una variedad de géneros de una manera impecable, puede pasar de ser noir, a blaxploitation, o un scfi-western de un capitulo a otro. La muisca es sublime, el elenco principal es muy bueno y tiene historias interesantes. En resumen, un puto clásico.',NULL,'Recomendaciones','Ciencia-ficción',NULL,2);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (99,'2023-10-05 14:03:05',0,'2023-10-25 12:20:09',1,'Gigachad','Mi madre literal',NULL,'Memes','Comedia',NULL,2),(100,'2023-10-05 14:04:21',0,'2023-10-25 12:51:23',1,'Durete','En uno llevas ramen a clase y en otro chaleco antibalas',NULL,'Memes','Comedia',NULL,1),(101,'2023-10-05 14:06:37',0,'2023-10-25 12:38:50',1,'Clasicazo','no ganaban para lápidas',NULL,'Memes','Aventura',NULL,4),(102,'2023-10-05 14:08:22',0,'2023-10-25 12:11:39',1,'El que entendió entendió','Olmaito',NULL,'Memes','Comedia',NULL,3),(103,'2023-10-05 14:33:44',0,'2023-10-25 12:52:50',1,'Itachi friendly fire','Itachi GOAT',NULL,'Memes','Comedia',NULL,1),(104,'2023-10-05 16:40:29',0,'2023-10-05 16:40:28',0,'¡A por todas Makunouchi!','La mejor opening para el mejor campeón!',NULL,'Openings','Deportes','https://www.youtube.com/watch?v=n7Mt-vvPQSQ&ab_channel=p777pdc',3);
        `
    );

    await connection.query(
        `
        INSERT INTO entries VALUES (105,'2023-10-25 12:07:23',0,'2023-10-25 12:56:18',1,'Sailor Moon','Pretty Soldier Sailor Moon (美少女戦士セーラームーン Bishōjo Senshi Sērā Mūn ?), conocida como Sailor Moon, es una serie de manga escrita e ilustrada por Naoko Takeuchi en diciembre de 1991. El manga se hizo particularmente famoso por volver a popularizar con gran éxito el subgénero de las chicas mágicas, y sus elementos sentai consiguieron que la aceptación también fuese masiva entre el sector masculino, generalmente menos interesado en este tipo de historias. Fue publicada en la revista japonesa Nakayoshi "Amigas íntimas" de la editorial Kodansha entre 1992 y 1997 y recopilada en 18 tankōbon (volúmenes). En principio, Naoko Takeuchi publicó la historia corta Codename wa Sailor V "Nombre en clave Sailor V" en la revista Run-Run de la misma editorial. La historia gustó tanto que enseguida se hizo la propuesta de realizar una serie de anime. Sin embargo, la autora prefirió añadir más personajes y una trama más sólida. Así surgió la serie Bishōjo Senshi Sailor Moon, secuela de Codename wa Sailor V, que comenzó a publicarse paralelamente y acabó primando sobre esta (la cual finalmente pasó a ser de carácter irregular e incluso fue concluida después de Sailor Moon). En 1997, la licencia del manga fue adquirida y traducida al inglés en los EE. UU. por la editorial Mixx, que más tarde cambiaría su nombre por el de TOKYOPOP. Esto también posibilitó su publicación en México a través del Grupo Editorial Vid, donde fue comercializado junto a la serie Magic Knight Rayearth en una revista dual, MixxZine. Sin embargo, ninguno de los dos mangas fueron publicados en su totalidad. En España la historia fue íntegramente publicada por la editorial Glénat.',NULL,'Recomendaciones','Acción',NULL,3);
        `
    );

    //PHOTOS
    await connection.query(
        `
        INSERT INTO photos VALUES (33,'ea64c80c-4197-44aa-9c31-a7d82e2c442b_memeallmight.jpg','2023-10-25 12:11:38',102),(35,'f60be62d-b80c-4bc0-b76c-3b57b093cc5c_jinxcosplay.webp','2023-10-25 12:13:15',65),(36,'42a98d6f-1ffe-47e0-9d6b-a4d67ea3977b_59180609b241ea4f95e62b08acff8219.jpg','2023-10-25 12:15:07',67),(38,'c4c02929-2c26-45a5-b0ab-3cca2fe1c542_49e067174444945.Y3JvcCw2NjksNTIzLDY0Miw0Njc.png','2023-10-25 12:15:40',72),(42,'82a8b38b-b1b4-416d-847c-e0c6c0045971_75jx81.jpg','2023-10-25 12:20:09',99),(43,'281678ca-6dfc-44bd-9012-ffa407f46741_6di0s32n28x71.jpg','2023-10-25 12:21:20',34),(45,'43ebd801-d721-4cef-990e-a76a807eda90_orochimaru_cosplay__1_by_zuanquan_da9xey9-fullview.jpg','2023-10-25 12:22:28',33),(46,'aec86cfb-45c6-4927-ba41-fd03d7b49870_8c120cd56b10c875511defd11fb88b1a.jpg','2023-10-25 12:23:01',32),(47,'ac881f2e-21d8-4de8-bf16-a9f17e783ddb_El1WUJJXUAAwZ0P.jfif','2023-10-25 12:27:47',30),(48,'0d50cb12-d606-4296-9c80-969a7ba8533f_dcc018fc1a0144ac3a9028c9f504dd97.jpg','2023-10-25 12:31:28',29),(49,'bdfd2954-303f-42bc-a766-a2467c361fe8_4f1a30a6a3a26d8be87d9a724ae572bc.jpg','2023-10-25 12:32:06',28),(50,'384cb3d7-9c71-48d2-a59d-780ffc29c097_d20.png','2023-10-25 12:34:03',26);
        `
    );

    await connection.query(
        `
        INSERT INTO photos VALUES (51,'018e9b24-9d2e-4d9e-9985-2c3fcb7dcbd0_1656473044.0987_Y3UVY8_n.jpg','2023-10-25 12:35:14',25),(55,'d615b03b-2d31-4781-b104-6a273fe1e72d_fotos_entretenimiento_12092013_memesdragonball_01.jpg','2023-10-25 12:38:33',101),(57,'746e8bfa-60d6-4f80-8894-3159950b208a_cosplay-aizawa-1584358305.jpg','2023-10-25 12:39:45',61),(58,'67b28ce6-d0bf-4daa-8b06-044e916ab7f6_1540496199108.jpg','2023-10-25 12:45:11',60),(59,'28b3f9f2-d7c3-4e54-a857-31dc571cb26e_leonchiro.webp','2023-10-25 12:45:27',59),(60,'8859a1b9-919a-4cc2-a8c2-11ab313bcedc_rBVaV10cPiWAX49pAAYFUnEzDVQ249.jpg','2023-10-25 12:45:42',58),(61,'06862f74-d72d-4d98-9d2f-da15c73562a8_il_fullxfull.4768431109_1m7j.avif','2023-10-25 12:46:51',57),(63,'4ebc28d8-8dda-41fb-ab4c-d13ba5f9ec0d_46d75a257b4780af44b3fb043af9d80d.jpg','2023-10-25 12:47:49',56),(64,'0e18b615-36ba-4bfe-b068-5395a0ffbd30_calle-para-siempre-v0-1azz823dwwy91.webp','2023-10-25 12:48:06',55),(67,'5bb43307-362b-4d4b-bbaf-35ad8cc293e6_ilrdwV0dLM-18HFYuIvwmThDqnHGfvf2xBMXek4mtA8.png','2023-10-25 12:49:52',54),(68,'6a3bca38-3265-4d93-b12c-4663e0707dd0_knucklesmeme.jpg','2023-10-25 12:50:33',35),(70,'fc003a56-564d-48c6-862e-fb1f8e996aa3_32549295._SY540_.jpg','2023-10-25 12:51:23',100),(73,'c5a23fce-937f-432d-bcb2-85e4aac270b6_bfeaed6bff8db6866563feebaa488700.jpg','2023-10-25 12:52:49',103),(74,'696e2730-a7e1-4d76-9fe9-7b8fb7d7d474_sailormoon1.jpg','2023-10-25 12:56:17',105),(75,'507514c5-4f65-4875-a3b4-71063fad4b49_sailormoon2.jpg','2023-10-25 12:56:18',105),(76,'9136739a-6bd2-426f-a09b-bfbdc86e1078_sailormoon3.jpg','2023-10-25 12:56:18',105),(77,'38b3c0e1-f603-44a8-91dd-72f61b100693_jujutsu-kaisen-shibuya-6506064167cfc.jpg','2023-10-25 13:00:35',94),(78,'619b8284-1588-4c3c-8990-3ae85cf5eb55_840_560.jpeg','2023-10-25 13:00:35',94);
        `
    );

    await connection.query(
        `
        INSERT INTO photos VALUES (79,'cb788679-b0e2-497c-80c2-62f5fea7c1bb_10-cosas-que-debes-saber-sobre-Death-Note-antes-de-que-se-estrene-la-pelicula.jpg','2023-10-25 13:02:03',21),(80,'63e78457-e8db-4dfe-8327-a5faf8204ac8_YKY6OLM6M5HQREHBXTSBLXMDRU.jpg','2023-10-25 13:02:03',21),(81,'fa56e97e-b683-4171-8528-73ca4c3ff841_L.jpg','2023-10-25 13:02:03',21),(82,'5892d576-a2aa-4b0f-b6de-370aec816f33_599723f2a6ff42f5e5ca0986ce66d2d7.jpg','2023-10-25 13:02:46',19),(83,'dbfe1ece-ab1c-4b7f-8318-1274fa26643f_mushishi.jpg','2023-10-25 13:03:25',19),(84,'0b63f7e7-4301-411b-aa1f-242ac32300db_Mushishi_Serie_de_TV-542643428-large.jpg','2023-10-25 13:03:25',19),(85,'73c9f003-aaf4-4862-9ba7-07af3aaa19c6_6e4dd558-5c67-465f-be02-abc5226900bb.jfif','2023-10-25 13:05:14',20),(87,'fea1713c-8d14-44bb-86cb-82fe67f59616_img60646ccef1c246.50941699.jpg','2023-10-25 13:05:33',20),(88,'857928f8-2f16-4f4e-af47-08116ce445b9_HD-wallpaper-mirai-nikki-yuno-mirai-yuno-anime-nikki.jpg','2023-10-25 13:06:43',24),(89,'57b16779-2e7b-4660-b894-845ef38f4c39_Mirai-Nikki-yandere-Yuno-Gasai.jpg','2023-10-25 13:06:43',24),(90,'e69b769b-3686-4c1b-a552-bc70d59aff6e_mirai-nikki-1000x600.jpg','2023-10-25 13:06:43',24),(91,'269a6460-97f5-49e1-a934-af9eff4cacf9_Chainsaw-Man-2-5e29efd-e1678805821841.jpeg','2023-10-25 13:09:00',95),(92,'756b4c57-82fa-4a03-ba3c-270c03179f13_5052cc19bebfdc4ce3c67a45c4140f19.jpg','2023-10-25 13:09:00',95),(93,'70b5c59b-066c-4534-8985-64b2753aae07_YeK1qkA.jpg','2023-10-25 13:09:00',95),(94,'cd20f168-7ec1-43e3-9d80-03c773acdf62_fullmetal-alchemist-theme-5.jpg','2023-10-25 13:10:49',89),(95,'d172a2ee-8de6-4c1b-8cee-613767e86cb7_thumb-1920-19537.jpg','2023-10-25 13:10:49',89);
        `
    );

    await connection.query(
        `
        INSERT INTO photos VALUES (96,'75929929-7a41-47d3-ad2c-b3301ff09649_4JL4Q4E7BJLM5MGVA4L5AQYEWU.avif','2023-10-25 13:12:13',91),(97,'a9bdbfee-76d3-4cfd-a20d-533ccd197715_artworks-58Y4CBrvLClgBjFn-Z68UrQ-t500x500.jpg','2023-10-25 13:12:13',91),(98,'0734fcb6-d189-4010-a2f0-47fa0a867af2_16668854930436.jpg','2023-10-25 13:12:13',91),(99,'da9d67be-a395-4c99-ba68-9c8253e39c86_00032-hassakuHentaiModel_v13_1522666583.png','2023-10-25 13:13:04',6),(100,'4a8ea592-8654-4dd0-9ea1-98de896eedf0_Manga-Cover-Claire-6-min.png','2023-10-25 13:13:04',6),(101,'738413d3-bfc9-4118-a98c-8e2eda60bc5c_11eyes_sdag_kukuri_cg7.jpg','2023-10-25 13:13:34',4),(102,'0b84c5b0-5609-4d04-99b7-adf5b3df93b4_97c6207482e17847c568c5b70fc049c1.jpg','2023-10-25 13:14:10',1),(103,'99807cc8-64bf-4241-82aa-cfa6d7c59823_MV5BNzViODgxNDEtNDhmNi00YTBmLTk4ZTctMzlhY2U0NTQ0ZDMxXkEyXkFqcGdeQXVyNTc0NjY1ODk@._V1_.jpg','2023-10-25 13:14:10',1),(104,'156f981d-b84c-42a0-99bc-bd1b3f5a117f_returners-magic-char-pv.jpg','2023-10-25 13:15:06',8),(105,'2d0cb4a2-d789-45f7-9231-9f4b8f8061c2_a-returners-magic-should-be-special-30886.jpg','2023-10-25 13:15:06',8),(107,'5905a357-60cb-4f35-893f-8ce327a399a1_18-facts-about-spike-spiegel-cowboy-bebop-1693698279.jpg','2023-10-25 13:16:33',98),(108,'9a0fff18-9fde-43b6-9aee-9ef080408442_Spike-Spiegel.jpg','2023-10-25 13:16:33',98),(109,'146598cd-317b-4f6e-bf42-da2c50b98233_55306ec6b24b9854a44e695a7f44fda36e8edb238c23318e0e45ea041b60e516.jpg','2023-10-25 13:17:29',93),(110,'c300b97e-5c1e-4607-bafe-fdcfed206089_1366_2000.jpeg','2023-10-25 13:17:29',93);
        `
    );

    await connection.query(
        `
        INSERT INTO photos VALUES (111,'94fbe70d-ea97-4e5e-87df-e4f4c6702805_xassassination-classroom-blu-ray-edicion-coleccionistas-a4.jpg.pagespeed.ic.dogdITjPtc.jfif','2023-10-25 13:18:23',16),(112,'caf2bf94-2b87-40cd-95da-44e5bdb69f16_77a83265202aa1951343e0015b8ac172471e622dd974d5f2c41763d8f4d45e42.png','2023-10-25 13:18:23',16),(113,'c668ad8b-b821-48a1-a41e-29f305e16dab_unnamed.png','2023-10-25 13:19:14',17),(114,'f6c70c70-56d9-421f-a5e0-93578f4b40fa_840_560 (1).jpeg','2023-10-25 13:19:14',17),(115,'09e0fefb-54fe-4457-98de-6731ce63dbd8_WJMURIY3SZCFJPWQM6JYI7XWEA.jpg','2023-10-25 13:19:14',17),(116,'a1a60029-d7e0-4b9b-9c44-3ae4f47ffb8e_1330846.png','2023-10-25 13:19:57',13),(117,'73d12198-ffa1-4134-a128-bf717738c41c_nezuko-kimetsu-no-yaiba.1687294888.0615.jpg','2023-10-25 13:19:57',13),(118,'7275bd7e-7327-4040-a612-7d270b4f048d_SUO6HJ7M7RG4VPOFJ5WWWNSVVE.jfif','2023-10-25 13:21:22',10),(119,'4403424e-7df0-445a-9586-9c120fe116b7_eren-forma-titan.jpg','2023-10-25 13:21:22',10),(120,'1a00d9af-fb01-4a0b-ae22-3adcb59db02f_thumb-1920-1328670.jpeg','2023-10-25 13:21:22',10);
        `
    );

    //COMMENTS
    await connection.query(
        `
        INSERT INTO comments VALUES (1,'2023-10-05 12:23:13','Gran anime pero el doblaje latino es mejor',0,0,4,50),(2,'2023-10-05 12:27:05','TEMBO TEMBO!',0,0,4,48),(3,'2023-10-05 12:27:35','Nunca lo había pensado, me encantó el anime!',0,0,4,24),(4,'2023-10-05 12:27:51','El Knuckles de Uganda soy yo literal',0,0,4,35),(5,'2023-10-05 12:28:01','Plus Ultra!',0,0,4,29),(6,'2023-10-05 12:28:21','Family Goals!',0,0,4,32),(7,'2023-10-05 12:28:51','No estoy muy convencido de que la pajarería de Transilvania sea un anime amigo',0,0,4,40),(8,'2023-10-05 12:29:24','Estás como una cabra, pero gran pérdida la de Asuma, junto con Jiraiya, top3 momentos tristes de Naruto',0,0,4,39),(9,'2023-10-05 12:29:42','Excelente recomendación, tengo que verlo!',0,0,4,23),(10,'2023-10-05 12:29:59','Mi anime favorito, totalmente de acuerdo con la puntuación!',0,0,4,21),(11,'2023-10-05 12:30:13','Una pena que no llegara a terminar :(',0,0,4,20),(12,'2023-10-05 12:30:36','Nunca pensé que me fuera a gustar tanto un anime de deporte, es genial!',0,0,4,17),(13,'2023-10-05 12:30:56','Koro-sensei te queremos! Final super emotivo 100% recomendado!',0,0,4,16),(14,'2023-10-05 12:41:57','Buenísima, pedazo artista!',0,0,4,30),(15,'2023-10-05 12:42:07','Como le gustaba la tarta al jodío!',0,0,4,28),(16,'2023-10-05 12:43:08','No me perdería ni una clase de Filosofía!',0,0,3,56),(17,'2023-10-05 12:43:19','Que cuteee',0,0,3,30),(18,'2023-10-05 12:43:37','Este Todoroki deja mucho que desear! XD',0,0,3,61),(19,'2023-10-05 12:43:52','No eres tu ni de broma!',0,0,3,59),(20,'2023-10-05 12:44:09','Full crowl! Me encanta Boku no Hero',0,0,3,29),(21,'2023-10-05 12:45:31','Pero esta entrada que es?',0,0,3,40),(22,'2023-10-05 12:45:46','Lo mató el tabaco sin duda',0,0,3,39),(23,'2023-10-05 12:50:43','Uno de mis animes favoritos de siempre, que gran canción ♥',0,0,3,52),(24,'2023-10-05 12:51:07','Increíble jajajaja',0,0,3,54),(26,'2023-10-05 13:05:30','Shiniiiiiiiiiiiiiiiiiiiiiiiiichi',0,0,4,69),(27,'2023-10-05 13:05:57','Gran teoría, ¿Quién no disfruta de un poquito de bebercio con los carnales?',0,0,4,74),(28,'2023-10-05 13:06:33','Interesante teoría, aunque me quedo con la del sake!',0,0,4,75),(29,'2023-10-05 13:06:57','Grandes aportes sobre teorías eysharis, me mantengo a la espera de más contenido!',0,0,4,76),(30,'2023-10-05 13:07:11','¿Qué anime es?',0,0,4,67);
        `
    );

    await connection.query(
        `
        INSERT INTO comments VALUES (32,'2023-10-05 13:07:38','Poco duraría tan chiquito en un mundo de titanes XD',0,0,4,72),(33,'2023-10-05 13:08:18','Genial cosplay, yo no juego lol pero si alguien juega street fighter que me agregue!',0,0,4,65),(34,'2023-10-05 13:24:08','Increíble, tenemos más pruebas de esto? :O',0,0,3,77),(36,'2023-10-05 13:28:29','Dios! Sería increíble!',0,0,2,77),(37,'2023-10-05 13:29:01','Genial teoría, lo importante nunca es la meta siempre es el viaje!',0,0,2,74),(38,'2023-10-05 13:31:22','Genial cosplay, PD: Yo llevo un montón sin jugar al lol y menos mal, saca lo peor de cada uno! jajajaja',0,0,2,65),(39,'2023-10-05 13:31:52','Dios mío no reconozco ni a la mitad! jaja',0,0,2,61),(40,'2023-10-05 13:32:07','Muy buena recomendación!',0,0,2,24),(41,'2023-10-05 13:32:18','Un verdadero 10!',0,0,2,21),(42,'2023-10-05 13:32:32','Está en mi lista de pendientes!',0,0,2,23),(43,'2023-10-05 13:32:46','Pinta muy interesante me lo apunto',0,0,2,19),(44,'2023-10-05 13:35:31','Me flipa el anime, un concepto genial',0,0,1,83),(45,'2023-10-05 13:36:30','Vegetta es el mejor!',0,0,1,84),(46,'2023-10-05 13:37:15','Me quedo loco',0,0,1,77),(47,'2023-10-05 13:37:36','A ver quien es el bonito que se salta la clase de religión!',0,0,1,56),(48,'2023-10-05 13:37:56','Me flipa, tengo hasta un tatuaje del número 12!',0,0,1,24),(52,'2023-10-05 13:39:43','No me lo puedo creer',0,0,1,81),(53,'2023-10-05 13:39:57','Si esto es cierto me rapo',0,0,1,85),(54,'2023-10-05 13:40:33','Vaya caboulo parece un llavero jajaja',0,0,1,72),(55,'2023-10-05 13:55:51','Este me lo vi, es increíble 100% recomendado!',0,0,4,89),(56,'2023-10-05 13:56:04','Ya hay otro post recomendándolo!',0,0,4,90),(57,'2023-10-05 13:56:13','Pero genial anime!',0,0,4,90),(58,'2023-10-05 13:56:26','En mi lista de pendientes! increíble pinta',0,0,4,91),(59,'2023-10-05 13:56:38','Me encantó!',0,0,4,94),(60,'2023-10-05 13:56:48','De los mejores actuales en mi opinión!',0,0,4,95),(61,'2023-10-05 13:57:29','Buenísimo',0,0,3,89),(62,'2023-10-05 13:57:40','De mis favs! pero ya hay otro post recomendándolo!',0,0,3,90),(63,'2023-10-05 13:57:49','Genial historia!',0,0,3,91),(64,'2023-10-05 13:58:01','No lo terminé todavía, pero lo que llevo visto es genial',0,0,3,92),(65,'2023-10-05 13:58:10','No lo conozco! apuntado',0,0,3,93);
        `
    );

    await connection.query(
        `
        INSERT INTO comments VALUES (66,'2023-10-05 13:58:22','Lo tengo pendiente me lo han recomendado mil veces!',0,0,3,95),(67,'2023-10-05 13:58:36','No lo conocía, para la lista de pendientes que va!',0,0,3,96),(68,'2023-10-05 14:00:03','Espectacular',0,0,2,89),(69,'2023-10-05 14:00:16','Me flipa',0,0,2,91),(70,'2023-10-05 14:00:32','A ver si lo terminan de una vez!',0,0,2,92),(71,'2023-10-05 14:00:41','Muy bueno',0,0,2,94),(72,'2023-10-05 14:00:56','100% recomendable',0,0,2,95),(73,'2023-10-05 14:01:24','No me gustan mucho los animes de deportes, pero los hay que sorprenden quizás le de una oportunidad',0,0,2,96),(74,'2023-10-05 14:01:43','Me encantó',0,0,2,97),(75,'2023-10-05 14:04:45','Buenísimo jajaja grande jojos',0,0,1,99),(76,'2023-10-05 14:34:27','Más fuerte que el vinagre o más acabado que el tifus',0,0,1,102),(77,'2023-10-05 14:35:03','Dentro de nada estamos en 2071 y todavía no se puede viajar por el sistema solar jajaja Pero gran anime',0,0,1,98),(78,'2023-10-05 14:35:21','Donde te sentaste Itachi',0,0,4,103),(79,'2023-10-05 14:36:57','Fire in the hole! ',0,0,2,103),(80,'2023-10-05 16:41:20','Me flipó este anime y las películas son geniales!',0,0,4,104),(81,'2023-10-05 16:41:42','¡VAMOS IPPO! ¡DEMPSEY ROOOOOOOOOOOOOOOOOOOOOOOOOOOOLL!',0,0,1,104),(82,'2023-10-05 16:44:24','Como dijo antes de morir "Lo siento, Sasuke, ésta es la última vez".',0,0,1,103);
        `
    );

    //VOTES
    await connection.query(
        `
        INSERT INTO votes VALUES (1,'2023-10-25 13:22:06',1,0,2,103,NULL),(2,'2023-10-25 13:22:12',1,0,2,105,NULL),(3,'2023-10-25 13:22:17',1,0,2,72,NULL),(4,'2023-10-25 13:22:21',1,0,2,97,NULL),(6,'2023-10-25 13:22:34',1,0,2,30,NULL),(7,'2023-10-25 13:22:45',1,0,2,65,NULL),(8,'2023-10-25 13:22:49',1,0,2,96,NULL),(9,'2023-10-25 13:22:53',1,0,2,95,NULL),(10,'2023-10-25 13:22:57',1,0,2,98,NULL),(11,'2023-10-25 13:23:00',1,0,2,83,NULL),(12,'2023-10-25 13:23:04',1,0,2,87,NULL),(13,'2023-10-25 13:23:09',1,0,2,88,NULL),(14,'2023-10-25 13:23:13',1,0,2,61,NULL),(15,'2023-10-25 13:23:21',1,0,2,92,NULL),(16,'2023-10-25 13:23:26',1,0,2,90,NULL),(17,'2023-10-25 13:23:31',1,0,2,24,NULL),(18,'2023-10-25 13:23:47',1,0,1,103,NULL),(19,'2023-10-25 13:23:51',1,0,1,98,NULL),(20,'2023-10-25 13:23:54',1,0,1,104,NULL),(21,'2023-10-25 13:23:57',1,0,1,83,NULL),(22,'2023-10-25 13:24:02',1,0,1,95,NULL),(23,'2023-10-25 13:24:06',1,0,1,30,NULL),(24,'2023-10-25 13:24:13',1,0,1,61,NULL),(25,'2023-10-25 13:24:17',1,0,1,69,NULL),(26,'2023-10-25 13:24:25',1,0,1,90,NULL),(27,'2023-10-25 13:24:30',1,0,1,24,NULL),(28,'2023-10-25 13:24:35',1,0,1,87,NULL),(29,'2023-10-25 13:24:46',1,0,4,103,NULL),(30,'2023-10-25 13:24:51',1,0,4,104,NULL),(31,'2023-10-25 13:24:55',1,0,4,98,NULL),(32,'2023-10-25 13:25:02',1,0,4,95,NULL),(33,'2023-10-25 13:25:07',1,0,4,30,NULL),(34,'2023-10-25 13:25:12',1,0,4,61,NULL),(35,'2023-10-25 13:25:16',1,0,4,94,NULL),(36,'2023-10-25 13:25:21',1,0,4,24,NULL),(37,'2023-10-25 13:25:26',1,0,4,84,NULL),(38,'2023-10-25 13:25:52',1,0,3,103,NULL),(39,'2023-10-25 13:25:57',1,0,3,98,NULL),(40,'2023-10-25 13:26:03',1,0,3,72,NULL),(41,'2023-10-25 13:26:07',1,0,3,30,NULL),(42,'2023-10-25 13:26:11',1,0,3,61,NULL),(43,'2023-10-25 13:26:15',1,0,3,104,NULL),(44,'2023-10-25 13:26:24',1,0,3,91,NULL),(45,'2023-10-25 13:26:29',1,0,3,90,NULL),(46,'2023-10-25 13:27:58',1,0,3,88,NULL),(47,'2023-10-25 13:28:06',1,0,3,24,NULL),(48,'2023-10-25 13:28:22',1,0,3,105,NULL);
        `
    )
    

    console.log(`Si  existía una base de datos con el mismo nombre, se ha eliminado. Además, se ha creado una nueva base de datos "${dbName}" y sus correspondientes tablas con datos de prueba.`);

    }catch(e){

        console.log(e);

    }finally{

        if (connection){
            connection.release();
        }

        process.exit();

    }

}

createDB();