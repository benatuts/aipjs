# Chapter 8: Shopping list with direct MongoDB access

This project is sample code to demonstrate Express and the native MongoDB driver.

## Usage instructions

1. `npm install`
2. Ensure the MongoDB server is running on localhost (`npm run mongod`)
3. `npm start` to start the server
4. Open your browser to http://localhost:3000/items and http://localhost:3000/total

In addition, `npm run sample_data` will load sample data into MongoDB and `npm run sample_queries` will use the `mongo` client to execute queries directly on the MongoDB database.
