# To-Do App

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

---

### Project Description

On this application you can:

- Register by creating an account.
- Login using your credentials.
- Create tasks by adding their title.
- Mark your tasks as completed.
- Update the tasks that are not marked as completed yet.
- Delete the tasks that have been marked as completed.

---

### Installation

Verify if you have [Yarn](https://yarnpkg.com/getting-started/install) installed on your machine by running:

```
yarn --version
```

Verify if you have [Docker](https://www.docker.com/) installed on your machine by running:

```
docker --version
```

Once the repository is downloaded, place into the project folder and run the following command to install all the necessary dependencies:

```
yarn
```

Run the Docker daemon. If you are using a Unix based OS, you might need to add `sudo` keyword at the beginning of the comand. Alternatively, you can use the [Docker Desktop Application](https://www.docker.com/products/docker-desktop/) to run the container.

```
docker-compose up -d
```

Now, you will have to create an `.env` file at the root of the project, and inside create the following variables:

```
# port
BACKEND_PORT=5001

# database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=to-do-api

# jwt secret
JWT_SECRET=supersecret

# frontend port
FRONTEND_PORT=http://localhost:5173
```

Finally, use the following command to run the project:

```
yarn start:dev
```

**In order for the application to work completely as intended, the Frontend application needs to be up and running. You can download the Frontend code from this [GitHub Repository]**(https://github.com/salvadorperezm/to-do-app).
