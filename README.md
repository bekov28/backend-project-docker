# backend-project-docker

💫 A dockerized full stack todo application that uses a NodeJS backend, a PostgreSQL database and JWT Authentification.

This todo backend application consists of three sub-projects.

👋 In the first project, I built a basic server application and render the client data from the server side. Also, used REST Client for Client Emulation.

🙌 In the second todo application, where I tried to do a sign-up and login application with modern backend technoligies, such as bcryptjs, jsonwebtoken and express.js to authentificate users for signup and allowing them to login. Also, by using jsonwebtoken, saved the token to localStorage to persist customer's login and todo information. By using bcryptjs, I refreshened my skills to encrypt users' passwords. Also, for DB, I used SQLite of Node.js, a fast lightweight DB for quick database queries. For this I followed @smoljames youtube tutorial to enhance my understanding and really a lot how to use SQLite in a real backend project.

🏆 In the third and last project, by following the tutorial, I used Prisma ORM for PostgreSQL queries and migrated the project to Docker, by creating Dockerfile and configuring docker-compose.yml.

-Challenges I faced:
While following the tutorial I faced mainly two challenges on my way to complete the project:

- first, the tutorial was old enough and I faced some legacy and version issues. For instance, as of the end of 2025, Prisma has made a major change with an update of 7.2.0 which is the most recent version. Yet, the tutorial was using 5 something version. At the end, I successfully upgraded the Prisma version to the latest one after fixing the errors in correlation with newer Prisma setup and made some additional configurations in prisma.config.ts file.

- second, another biggest issue I encountered was to run the Docker. The tutorial was using 3.0 version of Docker and I used the 3.8 last version of it to successfully run Docker container. Initially, Docker was not running as expected due to Prisma often was failing in Docker. For this, after some investigation, I moved env("DATABASE_URL") url datasource from schema.prisma (which was the old way) to prisma.config.ts (7.2.0 version requires this) and successfully synced database with schema.
