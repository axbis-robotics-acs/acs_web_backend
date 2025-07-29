<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">ACS Web Backend</h1>

<p align="center">
  A NestJS-based web backend project for the AXBIS Robotics ACS (Autonomous Control System).
</p>

### 🛠️ Core Stack & Key Technologies

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-E83823?style=flat-square)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)
![MQTT](https://img.shields.io/badge/MQTT-660066?style=flat-square&logo=eclipsemosquitto&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=pm2&logoColor=white)

### 💾 Database & Cache

![MariaDB](https://img.shields.io/badge/MariaDB-10.10-003545?style=flat-square&logo=mariadb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7.2.4-DC382D?style=flat-square&logo=redis&logoColor=white)

### 🔍 Logging & Monitoring (ELK Stack)

![Elasticsearch](https://img.shields.io/badge/Elasticsearch-7.17-005571?style=flat-square&logo=elasticsearch&logoColor=white)
![Logstash](https://img.shields.io/badge/Logstash-7.17-005571?style=flat-square&logo=logstash&logoColor=white)
![Kibana](https://img.shields.io/badge/Kibana-7.17-005571?style=flat-square&logo=kibana&logoColor=white)

##  Description

This repository contains the ACS web backend server, built with the [Nest.js](https://nestjs.com/) framework. It uses **Docker Compose** to run the application, database, and all other services together in a containerized environment.

## Prerequisites

To run this project, the following must be installed on your system:

-   [Docker](https://www.docker.com/products/docker-desktop/)
-   [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Getting Started (with Docker)

1.  **Clone the repository**
    ```bash
    $ git clone https://github.com/axbis-robotics-acs/acs_web_backend.git
    $ cd acs_web_backend
    ```

2.  **Run Docker Containers**
    Use the following command to build and run all services in the background. The `--build` flag rebuilds the images if the `Dockerfile` has changed.

    ```bash
    $ docker-compose up --build -d
    ```
    Once the application is running, you can access it at the `PORT` specified in your `.env` file (defaults to `3000`).

3.  **Check running containers**
    ```bash
    $ docker-compose ps
    ```

4.  **Stop containers**
    ```bash
    $ docker-compose down
    ```

## Applying Code Changes in Development

When the Docker containers are running, you can update the application with your code changes using the following command. This command builds your TypeScript code and updates the shared volume, allowing the container to restart the app automatically.

```bash
# To apply local file changes to the container
$ npm run build
```

## 💻 Local Development (without Docker)

If you prefer to develop directly on your local machine, follow these steps. Note: you will need to install and run external services like databases separately.

## Prerequisites
-    [Node.js](https://nodejs.org/) (v18.x 이상 권장)
-    [npm](https://www.npmjs.com/)

2.  **Install dependencies**
    ```bash
    $ npm install
    ```

3.  **Run the application**
    ```bash
    $ npm run start
    ```


## License
This project is licensed under the MIT License.
