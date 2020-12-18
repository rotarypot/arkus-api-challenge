## Setup del projecto BackEnd
Este proyecto esta basado en Nodejs, mongoDB y utiliza Docker para gestionar un container donde se aloja todo el backend.
Las dependencias se manejan por medio de  [NPM](https://www.npmjs.com/get-npm) , así que necesitas tenerlo instalado globalmente.
Tambien es necesario [Docker Desktop](https://www.docker.com/products/docker-desktop) para tener el runtime de Docker necesario para el container.

### Setup del API Backend
El backend esta corriendo en NodeJs por lo que necesitas instalar el [runtime de NodeJS](https://nodejs.org/en/download/) en tu sistema.

Mongo por su parte es instalado automáticamente por medio de docker-compose :

    docker-compose up

Una vez que está levantado el container Docker donde estará corriendo MongoDB, puedes instalar las dependencias del backend NodeJS navegando en la terminal a la carpeta donde se encuentre el backend y ejecutar el comando :

    npm i

Y luego levantar el servidor de NodeJS con :

    npm start

