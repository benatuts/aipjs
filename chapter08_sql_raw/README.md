# Chapter 8: Shopping list with the direct PostgreSQL driver

This project is sample code to demonstrate Express and the PostgreSQL driver.

## Usage instructions

1. `npm install`
2. If you have not created a PostgreSQL database, initialize one with `npm run initdb`
3. Ensure the PostgreSQL server is running on localhost (`npm run postgres`)
4. `npm start` to start the server
5. Open your browser to http://localhost:3000/items and http://localhost:3000/total

In addition, the following commands will directly update or query the database:

* `npm run schema` will load the database schema into PostgreSQL
* `npm run sample_data` will load sample data into PostgreSQL
* `npm run sample_queries` will execute queries directly on the PostgreSQL database
* `npm run drop` will drop all tables created by `npm run schema`
