# NoticiasColaborativasAnime

Para crear base de datos antes de ejecutar el programa utiliza el comando **node scriptdb.js**


DESCRIPCIÓN
Implementar una API que permita gestionar noticias colaborativas, estilo reddit o menéame,
donde los usuarios puedan registrarse y publicar una noticia en una serie de categorías
temáticas fijas.

USUARIOS ANÓNIMOS
● - Visualizar la lista de últimas noticias --> /last-entries
- ● Visualizar una única noticia completa --> /entry/:idEntry
- ○ Filtrado las noticias por género y categoría
-     - /entries/genre/:genre
-     - /entries/:category
- 
- ● Visualizar entradas más votadas por categoría --> /top-rated/:category
- 
- ● Login (Email y Password) --> /login
- 
- ● Registro: -->/new-user
- ○ Nombre
- ○ Email
- ○ Password
- 
- USUARIOS REGISTRADOS --> NECESARIO AUTH ( /users/validate/:regCode) 
- ● Lo mismo que los anónimos
- ● Publicar una nueva noticia 
-     - /entry
-     - /entries/:idEntry/photos
-     - /entry/:idEntry
-     - /entries/:idEntry/photos/:idPhoto
- 
- ● Editar una noticia publicada por el mismo usuario --> /edit-entry/:idEntry
- ● Borrar una noticia publicada por el usuario --> /entry/:idEntry
- ○ Gestión del perfil de usuario (Nombre, Email, Biografía, Foto, ...) 
-     - /edit-profile/:idUser
-     - /users/:idUser/password
-     - /users/recover-password
-     - /users/reset-password
-     - /users/:idUser
-     
- ○ Votar positivamente otras noticias y comentarios
-     - /entries/:idEntry/votes
-     - /entries/:idEntry/votes/:idComment
- 
- ○ Reportar usuarios, noticias y comentarios
-     - /users/:idUser/report
-     - /entries/:idEntry/report
-     - /entries/:idEntry/report/:idComment
- 
- USUARIOS ADMIN
- ● Bannear entradas, usuarios y comentarios
-     - /entries/:idEntry/comments/:idComment/bann
-     - /entries/:idEntry/bann
- 
- ● Acceder a reportes totales.
-     - /users/total-reports/:idUser
-     - /entries/total-reports/:idEntry
-     - /entries/total-reports/:idEntry/comments/:idComment


