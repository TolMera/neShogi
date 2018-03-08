var neshogi = {
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
		if (is_NaN(handicap)) {
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
					this.pieces.white.hand.push(new pawn());
					this.pieces.white.hand.push(new pawn());
					this.pieces.white.hand.push(new pawn());
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
	},
	
	placePieces() {
		// Black king is position 77 (heaven? lol)
		var tpb = this.pieces.black;
		tpb.king[0].position = 77;
		tpb.rook[0].position = 65;
		tpb.bishop[0].position = 71;
		tpb.gold[0].position = 76;
		tpb.gold[1].position = 78;
		tpb.silver[0].position = 75;
		tpb.silver[1].position = 79;
		tpb.knight[0].position = 74;
		tpb.knight[1].position = 80;
		tpb.lance[0].position = 73;
		tpb.lance[1].position = 81;
		for (var i = 0; i < tpb.pawn.length; i++) {
			tpb.pawn[i].position = 55 + i;
		}

		var tpw = this.pieces.white;
		tpw.king[0].position = 5;
		tpw.rook[0].position = 17;
		tpw.bishop[0].position = 11;
		tpw.gold[0].position = 4;
		tpw.gold[1].position = 6;
		tpw.silver[0].position = 3;
		tpw.silver[1].position = 7;
		tpw.knight[0].position = 2;
		tpw.knight[1].position = 8;
		tpw.lance[0].position = 1;
		tpw.lance[1].position = 9;
		for (var i = 0; i < tpw.pawn.length; i++) {
			tpw.pawn[i].position = 19 + i;
		}
	}
};

var board = {
	// piece	(origin)	movement	destination	(promotion)
	move(start, end) {
		var piece = this.board[start];
		delete(this.board[start]);
		if (this.board[end] != undefined) {
			var taken = this.board[end];
		}
		this.board[end] = piece;
		
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

var pieces = {
	king:	[new king()],
	rook:	[new rook()],
	bishop:	[new bishop()],
	gold:	[new gold(), new gold()],
	silver:	[new silveR(), new silver()],
	knight:	[new knight(), new knight()],
	lance:	[new lance(), new lance()],
	pawn:	[
		new pawn(),
		new pawn(),
		new pawn(),
		new pawn(),
		new pawn(),
		new pawn(),
		new pawn(),
		new pawn(),
		new pawn()
	],
	hand: [
		// This is where I will store 'pieces in hand'
	]
}

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