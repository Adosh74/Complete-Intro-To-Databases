# SQL

SQL is a standard language for storing, manipulating and retrieving data in databases.

## PostgreSQL

PostgreSQL is a powerful, open source object-relational database system. And it is the most database used by javascript developers.

### Installation

```bash
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d --rm postgres:13.0
```

### Connect to PostgreSQL

```bash
docker exec -it -u postgres my-postgres psql
```

### PostgreSQL Shell Commands

```sql
\l -- List all databases
\c database_name -- Connect to a database
\dt -- List all tables
\d table_name -- Describe a table
\? -- List all commands available in the shell
\h -- List all SQL commands can be used in the shell 
```

### Create a Database

```sql
CREATE DATABASE message_boards; -- Create a database called message_boards
```

### Create a Table

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 25 ) UNIQUE NOT NULL, 
    email VARCHAR ( 50 ) UNIQUE NOT NULL,
    full_name VARCHAR ( 100 ) NOT NULL,
    last_login TIMESTAMP,
    created_on TIMESTAMP NOT NULL
);
-- Create a table called users with the following columns
--- user_id: an integer column that is the primary key and auto-incremented
--- username: a string column that is unique and not null
--- email: a string column that is unique and not null
--- full_name: a string column that is not null
--- last_login: a timestamp column for recording the last login time
--- created_on: a timestamp column that is not null


INSERT INTO users (username, email, full_name, created_on) 
VALUES ('shebl74', 'mohamedshebla@gmail.com', 'Mohamed Shebl', now());
-- insert new raw into the users table

SELECT * FROM users;
-- select everything from the users table 
```

### Query Data in PostgreSQL

> First copy all sql commands from [data](./sample-postgresql.sql) file and paste it in the terminal to create the tables and insert data.

#### Select

```sql
SELECT * FROM users;
-- select all columns from the users table

SELECT username, email FROM users;
-- select only the username and email columns from the users table
```

#### Limit

```sql
SELECT * FROM users LIMIT 2;
-- select only the first 2 rows from the users table
```

#### Where

```sql
SELECT * FROM users WHERE user_id = 500;
-- select all columns from the users table where the user_id is 500

SELECT username, email, full_name FROM users WHERE last_login IS NULL LIMIT 10;
-- select the username, email, and full_name columns from the users table where the last_login is null and limit the result to 10 rows

SELECT user_id, username, email, created_on, last_login FROM users WHERE last_login IS NULL AND created_on < now() - interval '6 months' LIMIT 10;
-- select the user_id, username, email, created_on, and last_login columns from the users table where user never logged in and created the account more than 6 months ago and limit the result to 10 rows
```

#### Order By

```sql
SELECT user_id, email, created_on FROM users ORDER BY created_on LIMIT 10;
-- select the user_id, email, and created_on columns from the users table and order the result by the created_on column and limit the result to 10 rows

SELECT user_id, email, created_on FROM users ORDER BY created_on DESC LIMIT 10;
-- select the user_id, email, and created_on columns from the users table and order the result by the created_on column in descending order and limit the result to 10 rows

SELECT user_id, email, created_on FROM users ORDER BY created_on ASC LIMIT 10;
-- select the user_id, email, and created_on columns from the users table and order the result by the created_on column in ascending order and limit the result to 10 rows
```

#### Count

```sql
SELECT COUNT(*) FROM users;
-- count the number of rows in the users table

SELECT count(last_login) FROM users;
-- count the number of rows in the users table where the user logged in before
```

#### Update Data in PostgreSQL

```sql
UPDATE users SET last_login = now() WHERE user_id = 1 RETURNING *;
-- update the last_login column for the user with user_id 1 to the current timestamp (now) and return the updated row
```

#### Delete Data in PostgreSQL

```sql
DELETE FROM users WHERE user_id = 100 RETURNING *;
-- delete the user with user_id 100 and return the deleted row
```
