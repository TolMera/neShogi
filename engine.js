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
		
		if (this.handicap != 0) {
			switch (this.handicap) {
				case 0:
					// Black	先手	sente	no pieces omitted, but shitate always goes first
				break;
				case 1:
					// Lance	香落ち	kyō ochi	left lance
					delete this.pieces.white.lance[0];
				break;
				case 2:
					// Bishop	角落ち	kaku ochi	bishop
					delete this.pieces.white.bishop[0];
				break;
				case 3:
					// Rook	飛車落ち	hisha ochi	rook
					delete this.pieces.white.rook[0];
				break;
				case 4:
					// Rook–Lance	飛香落ち	hi-kyō ochi	rook, left lance
					delete this.pieces.white.rook[0];
					delete this.pieces.white.lance[0];
				break;
				case 5:
					// 2-Piece	二枚落ち	ni-mai ochi	rook, bishop
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
				break;
				case 6:
					// 3-Piece	三枚落ち	san-mai ochi	rook, bishop, right lance
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
					delete this.pieces.white.lance[1];
				break;
				case 7:
					// 4-Piece	四枚落ち	yon-mai ochi	rook, bishop, both lances
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
					delete this.pieces.white.lance[0];
					delete this.pieces.white.lance[1];
				break;
				case 8:
					// 5-Piece	五枚落ち	go-mai ochi	rook, bishop, both lances, either knight
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
					delete this.pieces.white.lance[0];
					delete this.pieces.white.lance[1];
					delete this.pieces.white.knight[(new Date().getTime % 2)];
				break;
				case 9:
					// 6-Piece	六枚落ち	roku-mai ochi	rook, bishop, both lances, both knights
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
					delete this.pieces.white.lance[0];
					delete this.pieces.white.lance[1];
					delete this.pieces.white.knight[0]
					delete this.pieces.white.knight[1];
				break;
				case 10:
					// 7-Piece	七枚落ち	nana-mai ochi	rook, bishop, both lances, both knights, left silvers
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
					delete this.pieces.white.lance[0];
					delete this.pieces.white.lance[1];
					delete this.pieces.white.knight[0]
					delete this.pieces.white.knight[1];
					delete this.pieces.white.silver[0];
				break;
				case 11:
					// 8-Piece	八枚落ち	hachi-mai ochi	rook, bishop, both lances, both knights, both silvers
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
					delete this.pieces.white.lance[0];
					delete this.pieces.white.lance[1];
					delete this.pieces.white.knight[0]
					delete this.pieces.white.knight[1];
					delete this.pieces.white.silver[0];
					delete this.pieces.white.silver[1];
				break;
				case 12:
					// 9-Piece	九枚落ち	kyū-mai ochi	rook, bishop, both lances, both knights, both silvers, left gold
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
					delete this.pieces.white.lance[0];
					delete this.pieces.white.lance[1];
					delete this.pieces.white.knight[0]
					delete this.pieces.white.knight[1];
					delete this.pieces.white.silver[0];
					delete this.pieces.white.silver[1];
					delete this.pieces.white.gold[0];
				break;
				case 13:
					// 10-Piece	十枚落ち	jū-mai ochi	rook, bishop, both lances, both knights, both silvers, both golds
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
					delete this.pieces.white.lance[0];
					delete this.pieces.white.lance[1];
					delete this.pieces.white.knight[0]
					delete this.pieces.white.knight[1];
					delete this.pieces.white.silver[0];
					delete this.pieces.white.silver[1];
					delete this.pieces.white.gold[0];
					delete this.pieces.white.gold[1];
				break;
				case 14:
					// Three Pawns	歩三兵	fu sanbyō	all pieces except king and three pawns in hand
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
					delete this.pieces.white.lance[0];
					delete this.pieces.white.lance[1];
					delete this.pieces.white.knight[0]
					delete this.pieces.white.knight[1];
					delete this.pieces.white.silver[0];
					delete this.pieces.white.silver[1];
					delete this.pieces.white.gold[0];
					delete this.pieces.white.gold[1];
					for (var i = 0; i < this.pieces.white.pawn.length; i++) {
						delete this.pieces.white.pawn[i];
					}
					this.pieces.white.hand.push(Object.assign({}, pawn));
					this.pieces.white.hand.push(Object.assign({}, pawn));
					this.pieces.white.hand.push(Object.assign({}, pawn));
				break;
				case 15:
					// Naked King	裸玉	hadaka gyoku	all pieces except king
					delete this.pieces.white.rook[0];
					delete this.pieces.white.bishop[0];
					delete this.pieces.white.lance[0];
					delete this.pieces.white.lance[1];
					delete this.pieces.white.knight[0]
					delete this.pieces.white.knight[1];
					delete this.pieces.white.silver[0];
					delete this.pieces.white.silver[1];
					delete this.pieces.white.gold[0];
					delete this.pieces.white.gold[1];
					for (var i = 0; i < this.pieces.white.pawn.length; i++) {
						delete this.pieces.white.pawn[i];
					}
				break;
				default:
					return {
						result: false,
						error: 'Handicap is loo large or too small'
					}
				break;
			}
		}
		console.log(this);
	},
	
	placePieces() {
		this.pieces.black.create(this.player);
		// Black king is position 77 (heaven? lol)
		this.board[77] = this.pieces.black.king[0];
		this.pieces.black.king[0].position = 77;
		this.board[65] = this.pieces.black.rook[0];
		this.pieces.black.rook[0].position = 65;
		this.board[71] = this.pieces.black.bishop[0];
		this.pieces.black.bishop[0].position = 71;
		this.board[76] = this.pieces.black.gold[0];
		this.pieces.black.gold[0].position = 76;
		this.board[78] = this.pieces.black.gold[1];
		this.pieces.black.gold[1].position = 78;
		this.board[75] = this.pieces.black.silver[0];
		this.pieces.black.silver[0].position = 75;
		this.board[79] = this.pieces.black.silver[1];
		this.pieces.black.silver[1].position = 79;
		this.board[74] = this.pieces.black.knight[0];
		this.pieces.black.knight[0].position = 74;
		this.board[80] = this.pieces.black.knight[1];
		this.pieces.black.knight[1].position = 80;
		this.board[73] = this.pieces.black.lance[0];
		this.pieces.black.lance[0].position = 73;
		this.board[81] = this.pieces.black.lance[1];
		this.pieces.black.lance[1].position = 81;
		for (var i = 0; i < this.pieces.black.pawn.length; i++) {
			this.board[55 + i] = this.pieces.black.pawn[i];
			this.pieces.black.pawn[i].position = 55 + i;
		}

		this.pieces.white.create(this.player);
		this.board[5] = this.pieces.white.king[0];
		this.pieces.white.king[0].position = 5;
		this.board[17] = this.pieces.white.rook[0];
		this.pieces.white.rook[0].position = 17;
		this.board[11] = this.pieces.white.bishop[0];
		this.pieces.white.bishop[0].position = 11;
		this.board[4] = this.pieces.white.gold[0];
		this.pieces.white.gold[0].position = 4;
		this.board[6] = this.pieces.white.gold[1];
		this.pieces.white.gold[1].position = 6;
		this.board[3] = this.pieces.white.silver[0];
		this.pieces.white.silver[0].position = 3;
		this.board[7] = this.pieces.white.silver[1];
		this.pieces.white.silver[1].position = 7;
		this.board[2] = this.pieces.white.knight[0];
		this.pieces.white.knight[0].position = 2;
		this.board[8] = this.pieces.white.knight[1];
		this.pieces.white.knight[1].position = 8;
		this.board[1] = this.pieces.white.lance[0];
		this.pieces.white.lance[0].position = 1;
		this.board[9] = this.pieces.white.lance[1];
		this.pieces.white.lance[1].position = 9;
		for (var i = 0; i < this.pieces.white.pawn.length; i++) {
			this.board[19 + i] = this.pieces.white.pawn[i];
			this.pieces.white.pawn[i].position = 19 + i;
		}
	},
	
	readBoard() {
		return this.board;
	}
};

var board = {
	// piece	(origin)	movement	destination	(promotion)
	move(player, start, end) {
		if (start < 1 || start > 81 || end < 1 || end > 81) {
			return {result: false, error: 'Piece moved off board'};
		}
		
		var piece = this.board[start];
		if (this.board[end] != undefined) {
			if (this.board[end].player != player) {
				var taken = this.board[end];
			} else {
				return {result: false, error: 'Player attempted to take their own piece?'};
			}
		}
		this.board[end] = piece;
		
		// Only make changes to the piece when we are past error returns.
		taken.player = player;
		this.pieces[player].hand.push(taken); // Into player hand
		delete(this.board[start]);
		
		// Return the piece that was taken from the board.
		return {result: true, taken: taken};
	},
	
	place(position, piece) {
		if (this.board[position] == undefined) {
			this.board[position] = piece;
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
}
var rook = {
	name: 'Rook',
	position: -1,
	promoted:	false
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
		this.king =	[Object.assign({player: player}, king)],
		this.rook =	[Object.assign({player: player}, rook)],
		this.bishop =	[Object.assign({player: player}, bishop)],
		this.gold =	[Object.assign({player: player}, gold), Object.assign({player: player}, gold)],
		this.silver =	[Object.assign({player: player}, silver), Object.assign({player: player}, silver)],
		this.knight =	[Object.assign({player: player}, knight), Object.assign({player: player}, knight)],
		this.lance =	[Object.assign({player: player}, lance), Object.assign({player: player}, lance)],
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
		],
		this.hand = [
			// This is where I will store 'pieces in hand'
		]
	}
}

module.exports = {
	neshogi: engine
}