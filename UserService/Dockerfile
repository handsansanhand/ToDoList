# Use a multi-stage build for caching

FROM maven:3.9.3-eclipse-temurin-17 as builder
WORKDIR /app

#copy only the files needed for dependency caching first
COPY pom.xml .
COPY src ./src

#download dependencies only (caches if pom.xml unchanged)
RUN mvn clean package -DskipTests

#stage 2: Run stage
FROM eclipse-temurin:17-jre-alpine

#expose the port your app listens on
EXPOSE 8081

#copy the jar from builder stage (adjust if you build outside Docker)
COPY --from=builder /app/target/*.jar app.jar

# Run the jar
ENTRYPOINT ["java","-jar","/app.jar"]
