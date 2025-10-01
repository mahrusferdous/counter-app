# start Redis server

To start the server, run the following command in the terminal:

```bash
redis-server
```

This will start the Redis server on the default port (6379). You can then connect to the server using a Redis client or library in your application.

# stop Redis server

To stop the Redis server, you can use the following command in the terminal:

```bash
redis-cli shutdown
```

# Set up PostgreSQL database

```bash
CREATE DATABASE counterdb;
\c counterdb;

CREATE TABLE IF NOT EXISTS user_counters (
  uid TEXT PRIMARY KEY,
  count INTEGER DEFAULT 0
);
```

# Run the backend server

```bash
nodemon server.js
```

# Backend API Endpoints
