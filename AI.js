/**
 * Shogi Engine AI
 */
function AI(game) {
	// The game is passed in, the AI will make a move for whatever players turn it is.
	console.log(`AI Playing for ${game.turn}`);

	// Engine play
	// this.defenses = this.defenseMap(game);
	// choose piece
	var pieces = ['king', 'gold', 'silver', 'knight', 'lance', 'rook', 'bishop', 'pawn'];
	do {
		var index = Math.floor(Math.random() * 8);
		var piece = pieces[index];
	
		while (game.pieces[game.turn][piece].length == 0) {
			index = Math.floor(Math.random() * 8);
			piece = pieces[index];
		}
		index = Math.floor(Math.random() * game.pieces[game.turn][piece].length);
		piece = game.pieces[game.turn][piece][index];
		
		var start = piece.position;
		var x = 0;
		
		if (game.turn == 'white') {
			var end = start + 9;
		} else {
			var end = start - 9;
		}
	} while (game.board.position[end] != undefined && x++ < 10);
	
	if (x == 10) {
		console.log("Could not make a move within the execution limit");
	}
	
	// Do the move
	console.log("AI Move", start, end);
	var move = game.board.move.call(game.board, game.turn, start, end);

	if (move.result == false) {
		return {result: false, error: move.error, extra: `Sorry, it looks like the engine is overwhelmed, try again; but if the issue continues - make a 'random' move for the engine?`};
	} else if (move.result == true) {
		// Save taken piece if exists
		if (move.taken != undefined) {
			// Player took opponent piece, put in hand
			game.pieces[game.turn].hand.push(move.taken);
		}
		
		// Next player
		game.nextTurn.call(game);
		return {result: true, start: start, end: end, taken: move.taken};
	}
	
	this.defenseMap = function() {
		map = [];
		return map;
	}
}

module.exports = {
	AI: AI
};