FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /pokeapp
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk
WORKDIR /app
COPY --from=build /pokeapp/target/pokeapp-0.0.1-SNAPSHOT.jar ./pokeapp.jar
EXPOSE 8080
CMD ["java", "-jar", "pokeapp.jar"]