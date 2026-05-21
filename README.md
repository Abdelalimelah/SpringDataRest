# SpringDataRest — Magasin des Voitures

**Author:** Abdelalime Lahbib

---

## Description

A full-stack web application for managing a car dealership (**Magasin des Voitures**).

- **Backend:** Spring Boot 4 REST API with Spring Data JPA, Spring Data REST, and Spring Security
- **Frontend:** React 18 SPA with Bootstrap 5, React Router v7, and Axios
- **Database:** MySQL (via Docker container)
- **Containerization:** Docker & Docker Compose

Features include full CRUD operations on cars (Voitures): add, list, edit, and delete.

---

## Prerequisites

- Java 25 (Eclipse Temurin recommended)
- Maven 3.9+
- Node.js 18+ and npm
- Docker Desktop

---

## How to Start

### 1. Start the MySQL Docker container

```bash
docker run -d -p 3307:3306 --name mysqldb \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=miola \
  mysql
```

### 2. Start the Spring Boot backend

In IntelliJ, go to **Run > Edit Configurations** and add the following VM options:

```
-DMYSQL_USER=root -DMYSQL_PASSWORD=root -DMYSQL_PORT=3307
```

Then build and run:

```bash
mvn clean package -DskipTests
java -DMYSQL_USER=root -DMYSQL_PASSWORD=root -DMYSQL_PORT=3307 -jar target/SpringDataRest-0.0.1-SNAPSHOT.jar
```

The API will be available at: `http://localhost:8082/api`

### 3. Start the React frontend

```bash
cd src/main/webapp/reactjs
npm install
npm start
```

The app will open at: `http://localhost:3000`

---

## Or start everything with Docker Compose

```bash
mvn clean package -DskipTests
docker-compose up -d --build
```

The API will be available at: `http://localhost:9090/api`

---

## Project Structure

```
SpringDataRest/
├── src/
│   ├── main/
│   │   ├── java/org/SpringDataRest/
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── modele/          # JPA entities (Voiture, Proprietaire)
│   │   │   ├── repository/      # Spring Data repositories
│   │   │   └── config/          # Security configuration
│   │   ├── resources/
│   │   │   └── application.properties
│   │   └── webapp/reactjs/      # React frontend
├── Dockerfile
├── docker-compose.yml
└── pom.xml
```
