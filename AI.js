/**
 * Shogi Engine AI
 */
function AI(game, loopCount = 0) {
	// The game is passed in, the AI will make a move for whatever players turn it is.
	console.log(`AI Playing for ${game.turn}`);

	// choose piece
	var pieces = ['king', 'gold', 'silver', 'knight', 'lance', 'rook', 'bishop', 'pawn'];
	do {
		var index = Math.floor(Math.random() * 8);
		var piece = pieces[index];
	
		while (game.pieces[game.turn][piece].length == 0) {
			index = Math.floor(Math.random() * 8);
			piece = pieces[index];
		}
		do {
			if (game.pieces[game.turn][piece].length == 1) {
				index = 0;
			} else {
				index = Math.floor(Math.random() * game.pieces[game.turn][piece].length);
			}
		} while (game.pieces[game.turn][piece][index] == undefined)
		piece = game.pieces[game.turn][piece][index];

		var start = piece.position;
		var x = 0;
		
		if (game.turn == 'white') {
			var end = start + 9;
		} else {
			var end = start - 9;
		}
	} while (game.board.position[end] != undefined && x++ < 10);
	
	if (x = 11) {
		console.log("Could not make a move within the execution limit");
		return {result: false, error: 'Coult not make a move within the execution limit'};
	}
	
	// Do the move
	console.log("AI Move", start, end);
	var move = game.board.move.call(game.board, game.turn, start, end);
	
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
	} else if (move.result == false) {
		if (loopCount < 10) {
			return this.AI(game, ++loopCount);
		} else {
			return {result: false, error: move.error, extra: `Sorry, it looks like the engine is overwhelmed, try again; but if the issue continues - make a 'random' move for the engine?`};
		}
	}
	return {result: true, start: start, end: end, taken: move.taken};
}

module.exports = {
	AI: AI
};