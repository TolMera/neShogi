function engine() {
	// Node Engine Shogi - By Bjorn D. Macintosh (2018)
	// 20180308 - Starting new Shogi Engine
	
	/**
	 * Init the class.
	 */
	this.create = function(handicap) {
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
		this.board = new board();
		
		// handicap is applied to the white
		this.pieces = {
			white: new pieces(),
			black: new pieces()
		};
		this.pieces.white.player = 'white';
		this.pieces.black.player = 'black';
		
		this.placePieces();
		
			
		if (this.handicap == 0) {
			// Black	先手	sente	no pieces omitted, but shitate always goes first
		}
		else if (this.handicap == 1) {
			// Lance	香落ち	kyō ochi	left lance
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
		}
		else if (this.handicap == 2) {
			// Bishop	角落ち	kaku ochi	bishop
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
		}
		else if (this.handicap == 3) {
			// Rook	飛車落ち	hisha ochi	rook
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
		}
		else if (this.handicap == 4) {
			// Rook–Lance	飛香落ち	hi-kyō ochi	rook, left lance
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.lance[0].position] = undefined;
			delete this.pieces.white.lance[0];
		}
		else if (this.handicap == 5) {
			// 2-Piece	二枚落ち	ni-mai ochi	rook, bishop
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
		}
		else if (this.handicap == 6) {
			// 3-Piece	三枚落ち	san-mai ochi	rook, bishop, right lance
			this.board.position[this.pieces.white.rook[0].position] = undefined;
			delete this.pieces.white.rook[0];
			this.board.position[this.pieces.white.bishop[0].position] = undefined;
			delete this.pieces.white.bishop[0];
			this.board.position[this.pieces.white.lance[1].position] = undefined;
			delete this.pieces.white.lance[1];
		}
		else if (this.handicap == 7) {
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
			this.pieces.white.hand.push(new pawn('white'));
			this.pieces.white.hand.push(new pawn('white'));
			this.pieces.white.hand.push(new pawn('white'));
		}
		else if (this.handicap == 15) {
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
	};
	
	this.nextTurn = function() {
		switch (this.turn) {
			case 'white': this.turn = 'black'; break;
			case 'black': this.turn = 'white'; break;
		}
	}
	
	this.placePieces = function() {
		this.pieces.black.create.call(this.pieces.black, 'black');
		// Black king is position 77 (heaven? lol)
		this.board.position[77] = this.pieces.black.king[0];
		this.pieces.black.king[0].position = 77;
		this.board.position[71] = this.pieces.black.rook[0];
		this.pieces.black.rook[0].position = 71;
		this.board.position[65] = this.pieces.black.bishop[0];
		this.pieces.black.bishop[0].position = 65;
		this.board.position[76] = this.pieces.black.gold[0];
		this.pieces.black.gold[0].position = 76;
		this.board.position[78] = this.pieces.black.gold[1];
		this.pieces.black.gold[1].position = 78;
		this.board.position[75] = this.pieces.black.silver[0];
		this.pieces.black.silver[0].position = 75;
		this.board.position[79] = this.pieces.black.silver[1];
		this.pieces.black.silver[1].position = 79;
		this.board.position[74] = this.pieces.black.knight[0];
		this.pieces.black.knight[0].position = 74;
		this.board.position[80] = this.pieces.black.knight[1];
		this.pieces.black.knight[1].position = 80;
		this.board.position[73] = this.pieces.black.lance[0];
		this.pieces.black.lance[0].position = 73;
		this.board.position[81] = this.pieces.black.lance[1];
		this.pieces.black.lance[1].position = 81;
		for (var i = 0; i < this.pieces.black.pawn.length; i++) {
			this.board.position[55 + i] = this.pieces.black.pawn[i];
			this.pieces.black.pawn[i].position = 55 + i;
		}

		this.pieces.white.create.call(this.pieces.white, 'white');
		this.board.position[5] = this.pieces.white.king[0];
		this.pieces.white.king[0].position = 5;
		this.board.position[11] = this.pieces.white.rook[0];
		this.pieces.white.rook[0].position = 11;
		this.board.position[17] = this.pieces.white.bishop[0];
		this.pieces.white.bishop[0].position = 17;
		this.board.position[4] = this.pieces.white.gold[0];
		this.pieces.white.gold[0].position = 4;
		this.board.position[6] = this.pieces.white.gold[1];
		this.pieces.white.gold[1].position = 6;
		this.board.position[3] = this.pieces.white.silver[0];
		this.pieces.white.silver[0].position = 3;
		this.board.position[7] = this.pieces.white.silver[1];
		this.pieces.white.silver[1].position = 7;
		this.board.position[2] = this.pieces.white.knight[0];
		this.pieces.white.knight[0].position = 2;
		this.board.position[8] = this.pieces.white.knight[1];
		this.pieces.white.knight[1].position = 8;
		this.board.position[1] = this.pieces.white.lance[0];
		this.pieces.white.lance[0].position = 1;
		this.board.position[9] = this.pieces.white.lance[1];
		this.pieces.white.lance[1].position = 9;
		for (var i = 0; i < this.pieces.white.pawn.length; i++) {
			this.board.position[19 + i] = this.pieces.white.pawn[i];
			this.pieces.white.pawn[i].position = 19 + i;
		}
	}
	
	this.readBoard = function() {
		return this.board.position;
	}
};

function board() {
	// move history
	this.history = [];
	this.position = {};

	// simple
	this.legal = {
		king: [10, 9, 8, 1, -1, -8, -9, -10],
		gold: [10, 9, 8, 1, -1, -9],
		silver: [10, 9, 8, -8, -10],
		knight: [19, 17],
		lance: [9, 18, 27, 36, 45, 54, 63, 72, 81],
		pawn: [9],
		// complex
		rook: [
			9, 18, 27, 36, 45, 54, 63, 72,
			-9, -18, -27, -36, -45, -54, -63, -72,
			1, 2, 3, 4, 5, 6, 7, 8,
			-1, -2, -3, -4, -5, -6, -7, -8
		],
		bishop: [
			10, 20, 30, 40, 50, 60, 70, 80,
			-10, -20, -30, -40, -50, -60, -70, -80,
			8, 16, 24, 32, 40, 48, 56, 66,
			-8, -16, -24, -32, -40, -48, -56, -66
		]
	}
	this.legal.silverP = this.legal.gold;
	this.legal.knightP = this.legal.gold;
	this.legal.lanceP = this.legal.gold;
	this.legal.pawnP = this.legal.gold;
	this.legal.rookP = this.legal.rook;
	this.legal.rookP.push(10, 8, -8, -10);
	this.legal.bishopP = this.legal.bishop;
	this.legal.bishopP.psuh(-9, 9, -1, 1);
	
	// piece	(origin)	movement	destination	(promotion)
	this.move = function (player, start, end) {
		if (start < 1 || start > 81 || end < 1 || end > 81) {
			return {result: false, error: 'Piece moved off board'};
		}
		
		var piece = this.position[start];
		if (piece == undefined) {
			return {result: false, error: 'There was no piece in that position?'};
		}

		// check this is a legal move
		if (this.legalMove(piece, player, start, end) == false) {
			return {result:	false, error: 'Player attemped an illegal move'};
		}
		// Check if a piece is being taken
		if (this.position[end] != undefined) {
			if (this.position[end] != undefined && this.position[end].player != player) {
				var taken = this.position[end];
			} else {
				return {result: false, error: 'Player attempted to take their own piece?'};
			}
		}
		this.position[end] = piece;
		piece.position = end;
		
		// remove the piece from the board
		delete(this.position[start]);

		// Add the move to the history, so we can rewind - replay - product move sheet
		this.history.push([player, start, end]);
		
		// Return the piece that was taken from the board.
		return {result: true, taken: taken};
	}
	
	this.place = function(player, position, piece) {
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

	this.legalMove = function(piece, player, start, end) {
		for (move of this.legal[piece.name.toLowerCase()]) {
			if (player == 'white') {
				if (start + move == end) return true;
			} else if (player == 'black') {
				if (start - move == end) return true;
			} else {
				console.log("Bug detected!");
			}
		}
		return false;
	}
}

// Piece and Pieces
var king = function(player) {
	this.name =		'King',
	this.position =	-1,
	this.promoted =	false,
	this.player = player
}
var rook = function(player) {
	this.name =		'Rook',
	this.position =	-1,
	this.promoted =	false,
	this.player = player
}
var bishop = function(player) {
	this.name =		'Bishop',
	this.position =	-1,
	this.promoted =	false,
	this.player = player
}
var gold = function(player) {
	this.name =		'Gold',
	this.position =	-1,
	this.promoted =	false,
	this.player = player
}
var silver = function(player) {
	this.name =		'Silver',
	this.position =	-1,
	this.promoted =	false,
	this.player = player
}
var knight = function(player) {
	this.name =		'Knight',
	this.position =	-1,
	this.promoted =	false,
	this.player = player
}
var lance = function(player) {
	this.name =		'Lance',
	this.position =	-1,
	this.promoted =	false,
	this.player = player
}
var pawn = function(player) {
	this.name =		'Pawn',
	this.position =	-1,
	this.promoted =	false,
	this.player = player
}

var pieces = function() {
	this.create = function(player) {
		this.king =		[new king(player)];
		this.rook =		[new rook(player)];
		this.bishop =	[new bishop(player)];
		this.gold =		[new gold(player), new gold(player)];
		this.silver =	[new silver(player), new silver(player)];
		this.knight =	[new knight(player), new knight(player)];
		this.lance =	[new lance(player), new lance(player)];
		this.pawn =	[
			new pawn(player),
			new pawn(player),
			new pawn(player),
			new pawn(player),
			new pawn(player),
			new pawn(player),
			new pawn(player),
			new pawn(player),
			new pawn(player)
		];
		this.hand = [
			// This is where I will store 'pieces in hand'
		];
	}
}

module.exports = {
	engine: engine,
	board: 	board,
	pieces:	pieces,
	king:	king,
	rook:	rook,
	bishop:	bishop,
	gold:	gold,
	silver:	silver,
	knight:	knight,
	lance:	lance,
	pawn:	pawn
}