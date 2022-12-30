# Space News - Backend

## How to Install and Run the Project

Start PostgreSQL with Docker:

```sh
docker-compose up -d
```

Install dependencies:

```sh
yarn install
```

Run database migrations:

```sh
yarn migrate:dev
```

Use a script to fill the database

```sh
yarn autofill
```

Start the API in development mode.

```sh
yarn dev
```

Run the tests in watch mode.

```sh
yarn test:watch
```
