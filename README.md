# POKEAPP

## Demo Video

A [Demo video](to be continued...) gives insight in the
functions of the application.

### Your companion to the world of Pokemon

Pokeapp is a Spring and React powered web app that lets you discover new Pokemon, save them to your Pokedex, and test
your knowledge by playing Who's That Pokemon.

## Features

1. **Discover Pokemon**: Search for Pokemon by name.
2. **Pokedex Management**: Add Pokemon to your personal Pokedex(favorite Pokemons).
3. **Game Mode**: Test your knowledge by playing Who's That Pokemon.

## Deploying POKEAPP

### 1. **Using Docker (Recommended)**

#### Prerequisites:

- To Install **Docker Desktop**, download
  from [Docker Desktop Downloads](https://www.docker.com/products/docker-desktop/)

#### Steps:

1. Navigate to the root directory (where `docker-compose.yml` is located).
2. Run the following command:
    ```bash
    docker-compose up --build
3. Open a web browser and go to:
   http://localhost:5173/

### 2. **Manual Installation and Running**

#### Backend:

1. Ensure **Java 21** and **Maven** are installed on your system.
    - To install Java, download it
      from [Java Downloads](https://www.oracle.com/java/technologies/javase-downloads.html).
    - Install Maven from [Maven Downloads](https://maven.apache.org/download.cgi).
2. Navigate to the backend folder:
   ```bash
   cd backend/pokeapp
3. Build the backend:
   ```bash
   mvn clean install
4. Run the backend application:
   ```bash
   mvn spring-boot:run

#### Frontend:

1. Ensure **Node.js** and **npm** are installed.
    - To install Node.js and npm, download from [Node.js Downloads](https://nodejs.org/).

2. Navigate to the frontend folder:
   ```bash
   cd frontend
3. Install dependencies:
   ```bash
   npm install
4. Start the frontend development server:
   ```bash
   npm run dev
5. Open a web browser and go to:
   http://localhost:5173/

## Testing

The tests for the backend can be found in `backend/pokeapp/src/test/java`. Run `PokemonControllerTest.java` and
`UserControllerTest.java` to test each controller individually.