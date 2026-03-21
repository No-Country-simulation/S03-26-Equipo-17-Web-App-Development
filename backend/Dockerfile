# Etapa 1: Build con Java 21
FROM maven:3.9.6-eclipse-temurin-21-jammy AS build
WORKDIR /app

# Copiamos solo el contenido que está dentro de la carpeta backend
COPY . .

# Damos permisos de ejecución al wrapper y construimos el .jar
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Etapa 2: Runtime (Esta es la que hace que "despierte" rápido)
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copiamos solo el JAR resultante de la etapa anterior (pesa muy poco)
COPY --from=build /app/target/*.jar app.jar

EXPOSE 7860

ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=7860"]