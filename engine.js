var engine = {
	// Node Engine Shogi - By Bjorn D. Macintosh (2018)
	// 20180308 - Starting new Shogi Engine
	
	/**
	 * Init the class.
	 */
	create(handicap) {
		if (handicap != undefined) {
			handicap = new Number(handicap);
		} else {
			handicap = 0;
		}
		if (isNaN(handicap)) {
			return {result: false, error: 'handicap was not a number'};
		}
		this.handicap = handicap;
		
		// new Board
		this.board = Object.assign({}, board);
		
		// handicap is applied to the white
		this.pieces = {
			white: Object.assign({player: 'white'}, pieces),
			black: Object.assign({player: 'black'}, pieces)
		};
		
		this.placePieces();
		
		console.log(this.handicap);
			
		if (this.handicap == 0) {
			console.log('handicap ' + 0);
			// Black	先手	sente	no pieces omitted, but shitate always goes first
		}
		else if (this.handicap == 1) {
			console.log('handicap ' + 1);
			// Lance	香落ち	kyō ochi	left lance
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
		}
		else if (this.handicap == 2) {
			console.log('handicap ' + 2);
			// Bishop	角落ち	kaku ochi	bishop
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
		}
		else if (this.handicap == 3) {
			console.log('handicap ' + 3);
			// Rook	飛車落ち	hisha ochi	rook
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
		}
		else if (this.handicap == 4) {
			console.log('handicap ' + 4);
			// Rook–Lance	飛香落ち	hi-kyō ochi	rook, left lance
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
		}
		else if (this.handicap == 5) {
			console.log('handicap ' + 5);
			// 2-Piece	二枚落ち	ni-mai ochi	rook, bishop
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
		}
		else if (this.handicap == 6) {
			console.log('handicap ' + 6);
			// 3-Piece	三枚落ち	san-mai ochi	rook, bishop, right lance
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
		}
		else if (this.handicap == 7) {
			console.log('handicap ' + 7);
			// 4-Piece	四枚落ち	yon-mai ochi	rook, bishop, both lances
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
		}
		else if (this.handicap == 8) {
			console.log('handicap ' + 8);
			// 5-Piece	五枚落ち	go-mai ochi	rook, bishop, both lances, either knight
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
			this.board.position[this.pieces.white.knight[(new Date().getTime % 2)].position] = undefined;
			delete this.pieces.white.knight[(new Date().getTime % 2)];
		}
		else if (this.handicap == 9) {
			console.log('handicap ' + 9);
			// 6-Piece	六枚落ち	roku-mai ochi	rook, bishop, both lances, both knights
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
			this.board.position[this.pieces.white.knight[0].position] = undefined;
			delete this.pieces.white.knight[0];
			this.board.position[this.pieces.white.knight[1].position] = undefined;
			delete this.pieces.white.knight[1];
		}
		else if (this.handicap == 10) {
			console.log('handicap ' + 10);
			// 7-Piece	七枚落ち	nana-mai ochi	rook, bishop, both lances, both knights, left silvers
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
			this.board.position[this.pieces.white.knight[0].position] = undefined;
			delete this.pieces.white.knight[0];
			this.board.position[this.pieces.white.knight[1].position] = undefined;
			delete this.pieces.white.knight[1];
			this.board.position[this.pieces.white.silver[0].position] = undefined;
			delete this.pieces.white.silver[0];
		}
		else if (this.handicap == 11) {
			console.log('handicap ' + 11);
			// 8-Piece	八枚落ち	hachi-mai ochi	rook, bishop, both lances, both knights, both silvers
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
			this.board.position[this.pieces.white.knight[0].position] = undefined;
			delete this.pieces.white.knight[0];
			this.board.position[this.pieces.white.knight[1].position] = undefined;
			delete this.pieces.white.knight[1];
			this.board.position[this.pieces.white.silver[0].position] = undefined;
			delete this.pieces.white.silver[0];
			this.board.position[this.pieces.white.silver[1].position] = undefined;
			delete this.pieces.white.silver[1];
		}
		else if (this.handicap == 12) {
			console.log('handicap ' + 12);
			// 9-Piece	九枚落ち	kyū-mai ochi	rook, bishop, both lances, both knights, both silvers, left gold
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
			this.board.position[this.pieces.white.knight[0].position] = undefined;
			delete this.pieces.white.knight[0];
			this.board.position[this.pieces.white.knight[1].position] = undefined;
			delete this.pieces.white.knight[1];
			this.board.position[this.pieces.white.silver[0].position] = undefined;
			delete this.pieces.white.silver[0];
			this.board.position[this.pieces.white.silver[1].position] = undefined;
			delete this.pieces.white.silver[1];
			this.board.position[this.pieces.white.gold[0].position] = undefined;
			delete this.pieces.white.gold[0];
		}
		else if (this.handicap == 13) {
			console.log('handicap ' + 13);
			// 10-Piece	十枚落ち	jū-mai ochi	rook, bishop, both lances, both knights, both silvers, both golds
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
			this.board.position[this.pieces.white.knight[0].position] = undefined;
			delete this.pieces.white.knight[0];
			this.board.position[this.pieces.white.knight[1].position] = undefined;
			delete this.pieces.white.knight[1];
			this.board.position[this.pieces.white.silver[0].position] = undefined;
			delete this.pieces.white.silver[0];
			this.board.position[this.pieces.white.silver[1].position] = undefined;
			delete this.pieces.white.silver[1];
			this.board.position[this.pieces.white.gold[0].position] = undefined;
			delete this.pieces.white.gold[0];
			this.board.position[this.pieces.white.gold[1].position] = undefined;
			delete this.pieces.white.gold[1];
		}
		else if (this.handicap == 14) {
			console.log('handicap ' + 14);
			// Three Pawns	歩三兵	fu sanbyō	all pieces except king and three pawns in hand
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
			this.board.position[this.pieces.white.knight[0].position] = undefined;
			delete this.pieces.white.knight[0];
			this.board.position[this.pieces.white.knight[1].position] = undefined;
			delete this.pieces.white.knight[1];
			this.board.position[this.pieces.white.silver[0].position] = undefined;
			delete this.pieces.white.silver[0];
			this.board.position[this.pieces.white.silver[1].position] = undefined;
			delete this.pieces.white.silver[1];
			this.board.position[this.pieces.white.gold[0].position] = undefined;
			delete this.pieces.white.gold[0];
			this.board.position[this.pieces.white.gold[1].position] = undefined;
			delete this.pieces.white.gold[1];
			for (var i = 0; i < this.pieces.white.pawn.length; i++) {
				this.board.position[this.pieces.white.pawn[i].position] = undefined;
				delete this.pieces.white.pawn[i];
			}
			this.pieces.white.hand.push(Object.assign({player: 'white'}, pawn));
			this.pieces.white.hand.push(Object.assign({player: 'white'}, pawn));
			this.pieces.white.hand.push(Object.assign({player: 'white'}, pawn));
		}
		else if (this.handicap == 15) {
			console.log('handicap ' + 15);
			// Naked King	裸玉	hadaka gyoku	all pieces except king
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
			this.board.position[this.pieces.white.knight[0].position] = undefined;
			delete this.pieces.white.knight[0];
			this.board.position[this.pieces.white.knight[1].position] = undefined;
			delete this.pieces.white.knight[1];
			this.board.position[this.pieces.white.silver[0].position] = undefined;
			delete this.pieces.white.silver[0];
			this.board.position[this.pieces.white.silver[1].position] = undefined;
			delete this.pieces.white.silver[1];
			this.board.position[this.pieces.white.gold[0].position] = undefined;
			delete this.pieces.white.gold[0];
			this.board.position[this.pieces.white.gold[1].position] = undefined;
			delete this.pieces.white.gold[1];
			for (var i = 0; i < this.pieces.white.pawn.length; i++) {
				this.board.position[this.pieces.white.pawn[i].position] = undefined;
				delete this.pieces.white.pawn[i];
			}
		}

		if (handicap > 15 || handicap < 0) {
			return {
				result: false,
				error: 'Handicap is loo large or too small'
			}
		}
		
		this.turn = 'black';
		
		return {result: true};
	},
	
	nextTurn() {
		switch (this.turn) {
			case 'white': this.turn = 'black'; break;
			case 'black': this.turn = 'white'; break;
		}
	},
	
	placePieces() {
		this.pieces.black.create('black');
		// Black king is position 77 (heaven? lol)
		this.board.position[76] = this.pieces.black.king[0];
		this.pieces.black.king[0].position = 76;
		this.board.position[64] = this.pieces.black.rook[0];
		this.pieces.black.rook[0].position = 64;
		this.board.position[70] = this.pieces.black.bishop[0];
		this.pieces.black.bishop[0].position = 70;
		this.board.position[75] = this.pieces.black.gold[0];
		this.pieces.black.gold[0].position = 75;
		this.board.position[77] = this.pieces.black.gold[1];
		this.pieces.black.gold[1].position = 77;
		this.board.position[74] = this.pieces.black.silver[0];
		this.pieces.black.silver[0].position = 74;
		this.board.position[78] = this.pieces.black.silver[1];
		this.pieces.black.silver[1].position = 78;
		this.board.position[73] = this.pieces.black.knight[0];
		this.pieces.black.knight[0].position = 73;
		this.board.position[79] = this.pieces.black.knight[1];
		this.pieces.black.knight[1].position = 79;
		this.board.position[72] = this.pieces.black.lance[0];
		this.pieces.black.lance[0].position = 72;
		this.board.position[80] = this.pieces.black.lance[1];
		this.pieces.black.lance[1].position = 80;
		for (var i = 0; i < this.pieces.black.pawn.length; i++) {
			this.board.position[54 + i] = this.pieces.black.pawn[i];
			this.pieces.black.pawn[i].position = 54 + i;
		}

		this.pieces.white.create('white');
		this.board.position[4] = this.pieces.white.king[0];
		this.pieces.white.king[0].position = 4;
		this.board.position[16] = this.pieces.white.rook[0];
		this.pieces.white.rook[0].position = 16;
		this.board.position[10] = this.pieces.white.bishop[0];
		this.pieces.white.bishop[0].position = 10;
		this.board.position[3] = this.pieces.white.gold[0];
		this.pieces.white.gold[0].position = 3;
		this.board.position[5] = this.pieces.white.gold[1];
		this.pieces.white.gold[1].position = 5;
		this.board.position[2] = this.pieces.white.silver[0];
		this.pieces.white.silver[0].position = 2;
		this.board.position[6] = this.pieces.white.silver[1];
		this.pieces.white.silver[1].position = 6;
		this.board.position[1] = this.pieces.white.knight[0];
		this.pieces.white.knight[0].position = 1;
		this.board.position[7] = this.pieces.white.knight[1];
		this.pieces.white.knight[1].position = 7;
		this.board.position[0] = this.pieces.white.lance[0];
		this.pieces.white.lance[0].position = 0;
		this.board.position[8] = this.pieces.white.lance[1];
		this.pieces.white.lance[1].position = 8;
		for (var i = 0; i < this.pieces.white.pawn.length; i++) {
			this.board.position[18 + i] = this.pieces.white.pawn[i];
			this.pieces.white.pawn[i].position = 18 + i;
		}
	},
	
	readBoard() {
		return this.board.position;
	}
};

var board = {
	
	// move history
	history: [],
	position: {},
	
	// piece	(origin)	movement	destination	(promotion)
	move(player, start, end) {
		if (start < 1 || start > 81 || end < 1 || end > 81) {
			return {result: false, error: 'Piece moved off board'};
		}
		
		var piece = this.position[start];
		if (this.position[end] != undefined) {
			if (this.position[end] != undefined && this.position[end].player != player) {
				var taken = this.position[end];
			} else {
				return {result: false, error: 'Player attempted to take their own piece?'};
			}
		}
		this.position[end] = piece;
		piece.position = end;
		
		// Only make changes to the piece when we are past error returns.
		if (taken != undefined) taken.player = player;
		delete(this.position[start]);

		// Add the move to the history, so we can rewind - replay - product move sheet
		this.history.push([player, start, end]);
		
		// Return the piece that was taken from the board.
		return {result: true, taken: taken};
	},
	
	place(player, position, piece) {
		if (this.position[position] == undefined) {
			this.position[position] = piece;
			piece.position = position;
			 
			// Add drop to history
			this.history.push([position, piece]);
		
			return {result: true};
		} else {
			return {result: false};
		}
	}
}

// Piece and Pieces
var king = {
	name: 'King',
	position: -1,
	promoted:	false
	// ,
	// legal:	[10, 9, 8, 1, -1, -8, -9, -10]
}
var rook = {
	name: 'Rook',
	position: -1,
	promoted:	false
	// ,
	// legal: [
	// 	// Moves vertical (up)
	// 	9, 18, 27, 36, 45, 54, 63, 72, 81,
	// 	// Moves vertical (down)
	// 	-9, -18, -27, -36, -45, -54, -63, -72, -81,
	// 	// Moves horizontal (left)
	// 	-1, -2, -3, -4, -5, -6, -7, -8, -9,
	// 	// Moves horizontal (right)
	// 	1, 2, 3, 4, 5, 6, 7, 8, 9
	// ]
}
var bishop = {
	name: 'Bishop',
	position: -1,
	promoted:	false
}
var gold = {
	name: 'Gold',
	position: -1,
	promoted:	false
}
var silver = {
	name: 'Silver',
	position: -1,
	promoted:	false
}
var knight = {
	name: 'Knight',
	position: -1,
	promoted:	false
}
var lance = {
	name: 'Lance',
	position: -1,
	promoted:	false
}
var pawn = {
	name: 'Pawn',
	position: -1,
	promoted:	false
}

var pieces = {
	create(player) {
		this.king =	[Object.assign({player: player}, king)];
		this.rook =	[Object.assign({player: player}, rook)];
		this.bishop =	[Object.assign({player: player}, bishop)];
		this.gold =	[Object.assign({player: player}, gold), Object.assign({player: player}, gold)];
		this.silver =	[Object.assign({player: player}, silver), Object.assign({player: player}, silver)];
		this.knight =	[Object.assign({player: player}, knight), Object.assign({player: player}, knight)];
		this.lance =	[Object.assign({player: player}, lance), Object.assign({player: player}, lance)];
		this.pawn =	[
			Object.assign({player: player}, pawn),
			Object.assign({player: player}, pawn),
			Object.assign({player: player}, pawn),
			Object.assign({player: player}, pawn),
			Object.assign({player: player}, pawn),
			Object.assign({player: player}, pawn),
			Object.assign({player: player}, pawn),
			Object.assign({player: player}, pawn),
			Object.assign({player: player}, pawn)
		];
		this.hand = [
			// This is where I will store 'pieces in hand'
		];
	}
}

module.exports = {
	neshogi: engine
}