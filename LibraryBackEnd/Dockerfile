FROM maven:3.9-eclipse-temurin-17-alpine as build

# Set the working directory
WORKDIR /app

# Copy the app source code
COPY src src/
COPY pom.xml ./

RUN mvn clean compile

FROM eclipse-temurin:17-jre-alpine

VOLUME /tmp
EXPOSE 8080

ARG DEPENDENCY=/app/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java","-cp","app:app/lib/*","c15-41-t-java-react.library.LibraryApplication"]
