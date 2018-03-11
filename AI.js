/**
 * Shogi Engine AI
 */
function AI(game) {
	// The game is passed in, the AI will make a move for whatever players turn it is.
	console.log(`AI Playing for ${game.turn}`);

	// Engine play
	
	// Do the move
	var move = game.board.move.call(game.board, game.turn, start, end);
	
	if (move.result == true) {
		// Save taken piece if exists
		if (ret.taken != undefined) {
			// Player took opponent piece, put in hand
			game.pieces[game.turn].hand.push(ret.taken);
		}
		
		// Next player
		game.nextTurn.call(game);
		return {result: true, start: start, end: end, taken: move.taken};
	} else {
		return {result: false, error: move.error, extra: `Sorry, it looks like the engine is overwhelmed, try again; but if the issue continues - make a 'random' move for the engine?`};
	}
}

module.exports = {
	AI: AI
};