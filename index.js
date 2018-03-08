const express = require('express')
const app = express()

const engine = require('./engine.js');

var games = {};

app.all('/', (req, res) => {
	res.send(`
		Your input will be echoed below for testing purposes
		neshogi is an engine with API interface accessed via HTTP
		To start a game against the engine, access '/newGame/$handicapLevel[0-16]'
		To make a move, access '/move/$game/$startSquare/$endSquare'
		To place a piece, access '/place/$game/$piece/$square'
		To make Engine Move, access '/engine/$game'
		To undo a move, access '/undo/$game'
		
		To read the board, access '/read/$game'
		Games end automatically when Checkmate occurs, or the game has become 'inactive'
		
		Good luck playing` + 
		JSON.stringify(req.params)
	);
});

app.all('/newGame*', (req, res) => {
	var time = new Date().getTime();
	games[time] = Object.create(engine.neshogi);
	games[time].create();
	
	console.log("New Game Started", Object.keys(games).length, "Current Games");
	res.send(JSON.stringify({gameId: time}));
});

app.all('/read*', (req, res) => {
	var bits = req.path.split('/');
	console.log(Object.keys(games));
	console.log(bits);
	if (games[bits[2]] != undefined) {
		var game = games[bits[2]];
		return res.send(JSON.stringify(game.readBoard()));
	}
	return res.send(JSON.stringify({result: false, error: 'No Game with that ID'}));
});

app.all('/move*', (req, res) => {
});

app.all('/undo*', (req, res) => {
});

app.listen(3000, () => console.log('Port 3000 open for connections'))