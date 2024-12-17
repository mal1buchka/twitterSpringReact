FROM openjdk:17-jdk-alpine
LABEL authors="malibuchka"
COPY target/Vasya.jar .
ENTRYPOINT ["java", "-Xms1024m", "-Xmx1500m", "-jar", "Vasya.jar"]