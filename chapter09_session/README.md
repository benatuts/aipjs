# Chapter 9: Demonstration of Express sessions

This project is sample code used for design exercises.

Some aspects of the project intentionally violate good design practices to facilitate class discussions.

Note that the authentication logic in this project does not check a username/password. Visiting http://localhost:3000/login is assumed to instantly log in the user.

## Usage instructions

1. `npm install`
2. `npm start` to start the server
3. Open your browser to http://localhost:3000/ 
4. Stop the server (e.g., press Control-C)
5. `npm run login` to start the server with a login endpoint (login demonstrates how sessions should be regenerated on login)
6. Open your browser to http://localhost:3000/ or http://localhost:3000/login

Hint: Check the cookies in your browser's development console.
