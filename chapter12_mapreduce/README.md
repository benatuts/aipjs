# Chapter 12: Demonstration of MapReduce principles

This project demonstrates an underlying principle of MapReduce. It is not a full MapReduce implementation.

Some aspects of the project intentionally violate good design practices to facilitate class discussions.

## Usage instructions

1. `npm install`
2. `npm run server1` to start the first worker on port 3001
3. `npm run server2` in a new tab/window to start the second worker on port 3002
4. `npm run server3` in a new tab/window to start the third worker on port 3003
5. `npm start` in a new tab/window to start the MapReduce-style business process layer API on port 3000
6. Open your browser to http://localhost:3000/total
