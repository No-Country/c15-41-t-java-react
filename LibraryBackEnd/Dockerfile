FROM maven:3.9-eclipse-temurin-17-alpine as build
# Set the working directory
WORKDIR /app

# Copy the app source code
COPY src src/
COPY pom.xml ./

RUN mvn clean install -DskipTests

FROM eclipse-temurin:17-jre-alpine

VOLUME /tmp
EXPOSE 8080

ARG JAR_FILE=/app/target/*.jar
COPY --from=build ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
