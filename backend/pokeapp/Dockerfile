# Stage 1: Build Spring Boot JAR
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /pokeapp
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run Spring Boot App
FROM openjdk:21-jdk
WORKDIR /app
COPY --from=build /pokeapp/target/*.jar ./pokeapp.jar
EXPOSE 8080
CMD ["java", "-jar", "pokeapp.jar"]
