/**
 * BUG LIST:  When new engine.engin();  Board is not new object, it's a shared object...
 */
const express = require('express')
const app = express()
const cors = require('cors');

const engine = require('./engine.js');
const AI = require('./AI.js');

var games = {};

app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.all('/', (req, res) => {
	res.send(`
		Your input will be echoed below for testing purposes
		neshogi is an engine with API interface accessed via HTTP
		To start a game against the engine, access '/newGame/$handicapLevel[0-16]'
		To make a move, access '/move/$game/$player/$startSquare/$endSquare'
		To place a piece, access '/place/$game/$player/$piece/$square'
		To make Engine Move, access '/engine/$game'
		To undo a move, access '/undo/$game'
		To check whos turn it is, access '/turn/$game'
		
		To read the board, access '/read/$game'
		Games end automatically when Checkmate occurs, or the game has become 'inactive'
		
		Good luck playing` +
		JSON.stringify(req.params)
	);
});

app.all('/newGame*', (req, res) => {
	var bits = req.path.split('/');
	
	var time = new Date().getTime();
	while (games[time] != undefined) {
		// Make sure it's unique
		time--;
	}
	
	games[time] = new engine.engine();
	var game = games[time];
	var create = game.create.call(game, bits[2] || 0);
	
	if (create.result == false) delete games[time];
	
	console.log("New Game Started (handicap: " + (bits[2] || 0) + ")", Object.keys(games).length, "Current Games");
	res.send(JSON.stringify({gameId: time}));
});	

app.all('/read*', (req, res) => {
	var bits = req.path.split('/');

	if (games[bits[2]] != undefined) {
		console.log(`Read on ${bits[2]}`);
		
		var game = games[bits[2]];
		return res.send(JSON.stringify(game.readBoard.call(game)));
	}
	return res.send(JSON.stringify({result: false, error: 'No Game with that ID'}));
});

app.all('/move*', (req, res) => {
	var bits = req.path.split('/');

	if (games[bits[2]] != undefined) {
		var game = games[bits[2]];
		console.log(`Move on game ${bits[2]}`);
		
		if (game.turn == bits[3]) {
			var move = game.board.move.call(game.board, bits[3], bits[4], bits[5]);
			if (move.result == true) {
				if (move.taken != undefined) {
					// Save taken piece if exists
					switch (game.turn) {
						case 'white':
							// game.pieces['white'].hand.push(new (move.taken.name.toLowerCase())());
							game.pieces['black'][move.taken.name.toLowerCase()].forEach((item, index) => {
								console.log(item, move.taken);
								if (item.position == move.taken.position) {
									// Is this the same object?
									game.pieces['black'][move.taken.name.toLowerCase()].splice(index,1);
								}
							});
						break;
						case 'black':
							// game.pieces['black'].hand.push(new (move.taken.name.toLowerCase())());
							game.pieces['white'][move.taken.name.toLowerCase()].forEach((item, index) => {
								console.log(item, move.taken);
								if (item.position == move.taken.position) {
									// Is this the same object?
									game.pieces['white'][move.taken.name.toLowerCase()].splice(index,1);
								}
							});
						break;
						default:
							console.log("Error removing piece from board");
						break;
					}
				}
				// Next players turn
				game.nextTurn.call(game);
			}
			return res.send(JSON.stringify(move));
		} else {
			return res.send(JSON.stringify({result: false, error: 'It is ' + game.turn + '\'s turn'}));
		}
	}
	return res.send(JSON.stringify({result: false, error: 'No Game with that ID'}));
});

app.all('/place*', (req, res) => {
	// To place a piece, access '/place/$game/$player/$piece/$square'
	var bits = req.path.split('/');
	
	if (games[bits[2]] != undefined) {
		var game = games[bits[2]];
		if (game.turn == bits[3]) {
			var ret = game.board.place.call(game.board, bits[3], bits[4], bits[5]);
			
			if (ret.result == true) game.nextTurn.call(game);
			return res.send(JSON.stringify(ret));
		} else {
			return {result: false, error: 'It is ' + game.turn + '\'s turn'};
		}
	}
	return res.send(JSON.stringify({result: false, error: 'No Game with that ID'}));
});

app.all('/undo*', (req, res) => {
	
});

app.all('/turn*', (req, res) => {
	var bits = req.path.split('/');
	
	if (games[bits[2]] != undefined) {
		var game = games[bits[2]];
		if (game == undefined) {
			res.send(JSON.stringify({result: false, error: 'Game not found'}));
		} else {
			res.send(JSON.stringify({result: true, turn: game.turn}));
		}
	} else {
		res.send(JSON.stringify({result: false, error: 'No Game ID provided'}));
	}
});

app.all('/engine*', (req, res) => {
	var bits = req.path.split('/');
	
	if (games[bits[2]] != undefined) {
		var game = games[bits[2]];
		if (game == undefined) {
			res.send(JSON.stringify({result: false, error: 'Game not found'}));
		} else {
			// This is where the Engine AI needs to be attached, it will need to chose a move now...
			var ret = AI.AI(game);
			res.send(JSON.stringify(ret));
		}
	} else {
		res.send(JSON.stringify({result: false, error: 'No Game ID provided'}));
	}
});

app.listen(3000, () => console.log('Port 3000 open for connections'))