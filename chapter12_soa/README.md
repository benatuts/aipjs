# Chapter 12: Team shopping list with service-oriented archictecture

This project is sample code used for design exercises.

For clarity, this project does not include error handling. Production ready code should include error handling.

## Usage instructions

1. `npm install`
2. Ensure that no server is running on port 3000, 3001 or 3002
4. `npm start` to build and start the process layer on port 3000
5. `npm run shopping_list_service` to run the shopping list service on port 3001
6. `npm run notification_service` to run the notification service on port 3002
7. Open your browser to http://localhost:3000/
8. Optional: use `npm run watch` in another terminal window to automatically rebuild the frontend when any changes are detected in the React code
