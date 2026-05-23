# SpringDataRest — Magasin des Voitures

**Author:** Abdelalime Lahbib

---

## Description

A full-stack web application for managing a car dealership (**Magasin des Voitures**).

- **Backend:** Spring Boot 4 REST API with Spring Data JPA, Spring Data REST, and Spring Security
- **Frontend:** React 18 SPA with Bootstrap 5, React Router v7, and Axios
- **Database:** MySQL 8.0
- **Containerization:** Docker & Docker Compose
- **Orchestration:** Kubernetes via Minikube

Features include full CRUD operations on cars (Voitures): add, list, edit, and delete.

---

## Prerequisites

- Java 25 (Eclipse Temurin recommended)
- Maven 3.9+
- Node.js 18+ and npm
- Docker Desktop
- Minikube
- kubectl

---

## Option 1 — Run with Docker Compose

### 1. Start the MySQL Docker container

```bash
docker run -d -p 3307:3306 --name mysqldb \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=miola \
  mysql:8.0
```

### 2. Start the Spring Boot backend

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

### Or use Docker Compose

```bash
mvn clean package -DskipTests
docker-compose up -d --build
```

API available at: `http://localhost:9090/api`

---

## Option 2 — Deploy with Kubernetes (Minikube)

### 1. Start Minikube

```bash
minikube start
```

### 2. Load MySQL image into Minikube

```bash
docker pull mysql:8.0
minikube image load mysql:8.0
```

### 3. Point Docker to Minikube and build the Spring Boot image

```bash
eval $(minikube docker-env)
mvn clean package -DskipTests
docker build -t springboot-crud-k8s:1.0 .
```

### 4. Deploy ConfigMap, Secrets, MySQL and Spring Boot

```bash
kubectl apply -f mysql-configMap.yaml
kubectl apply -f mysql-secrets.yaml
kubectl apply -f db-deployment.yaml
kubectl apply -f app-deployment.yaml
```

### 5. Watch pods until all Running

```bash
kubectl get pods -w
```

### 6. Get the service URL

```bash
minikube service springboot-crud-svc --url
```

Test at: `http://127.0.0.1:XXXXX/api/voitures`

### 7. Open Kubernetes Dashboard (optional)

```bash
minikube dashboard
```

### Stop Minikube when done

```bash
minikube stop
minikube delete
```

---

## Kubernetes Architecture

| Resource | Description |
|---|---|
| `db-deployment.yaml` | MySQL pod + PersistentVolumeClaim + ClusterIP Service |
| `app-deployment.yaml` | Spring Boot pod (3 replicas) + NodePort Service |
| `mysql-configMap.yaml` | Non-sensitive config (DB host, DB name) |
| `mysql-secrets.yaml` | Sensitive credentials (username, password) in base64 |

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
├── db-deployment.yaml           # Kubernetes MySQL deployment
├── app-deployment.yaml          # Kubernetes Spring Boot deployment
├── mysql-configMap.yaml         # Kubernetes ConfigMap
├── mysql-secrets.yaml           # Kubernetes Secrets
├── Dockerfile
├── docker-compose.yml
└── pom.xml
```
