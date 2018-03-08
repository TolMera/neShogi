const express = require('express')
const app = express()

const engine = require('./engine.js');

var games = {};

app.all('/', (req, res) => {
	res.send(`
		Your input will be echoed below for testing purposes
		neshogi is an engine with API interface accessed via HTTP
		To start a game against the engine, access '/newGame'
		To make a move, access '/move/$game/$startSquare/$endSquare'
		To undo a move, access '/undo/$game'
		Games end automatically when Checkmate occurs, or the game has become 'inactive'
		
		Good luck playing` + 
		JSON.stringify(req.params)
	);
});

app.all('/newGame', (req, res) => {
	var time = new Date().getTime();
	games[time] = new neshogi();
	console.log("New Game Started", Object.keys(games).length, "Current Games");
	res.send(JSON.stringify({gameId: time}));
});

app.all('/move', (req, res) => {
});

app.all('/undo', (res, res) => {
});

app.listen(3000, () => console.log('Port 3000 open for connections'))
