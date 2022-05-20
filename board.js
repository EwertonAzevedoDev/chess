// Set chess board indexes
var chess_board = []
var columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
var lines = ['1', '2', '3', '4', '5', '6', '7', '8']

//set pieces
var pieces = ['p', 'n', 'b', 'r', 'q', 'k']
var pieces_color = ['w', 'b']
var pieces_name = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king']
var pieces_symbol = ['♙', '♘', '♗', '♖', '♕', '♔']
var pieces_value = [1, 3, 3, 5, 9, 1000]

//set pieces position
var white_pawns_position = ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2']
var white_rooks_position = ['a1', 'h1']
var white_knights_position = ['b1', 'g1']
var white_bishop_position = ['c1', 'f1']
var white_queen_position = ['d1']
var white_king_position = ['e1']
var black_pawns_position = ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7']
var black_rooks_position = ['a8', 'h8']
var black_knights_position = ['b8', 'g8']
var black_bishop_position = ['c8', 'f8']
var black_queen_position = ['d8']
var black_king_position = ['e8']

//Set each piece into object
var pieces_obj = function (color, name, symbol, value) {
    this.color = color
    this.name = name
    this.symbol = symbol
    this.value = value
}
var set_pieces = function () {
    console.log('Setting pieces')
    var pieces_list = []
    for (var i = 0; i < pieces_color.length; i++) {
        for (var j = 0; j < pieces.length; j++) {
            pieces_list.push(new pieces_obj(pieces_color[i], pieces_name[j], pieces_symbol[j], pieces_value[j]))
        }
    }
    return pieces_list
}
var pieces_list = set_pieces()

//Set chess board
console.log('Setting chess board')
lines.forEach(function (line, i) {
    var color = 'w'
    if (i % 2 == 0) {
        color = 'b'
    }
    columns.forEach(function (column, j) {
        chess_board[column + line] = {
            color: color,
            piece: '',
            name: '',
            symbol: '',
            value: 0,
            position: column + line
        }

        if (color == 'w') {
            color = 'b'
        } else {
            color = 'w'
        }
    })
})
lines.reverse()

console.table(pieces_list)

//Set initial white pieces position on the board
console.log('Setting initial pieces position')
var place_white_pieces = function () {
    for (var i = 0; i < white_pawns_position.length; i++) {
        chess_board[white_pawns_position[i]].piece = pieces_list[0]
    }
    for (var i = 0; i < white_rooks_position.length; i++) {
        chess_board[white_rooks_position[i]].piece = pieces_list[3]
    }
    for (var i = 0; i < white_knights_position.length; i++) {
        chess_board[white_knights_position[i]].piece = pieces_list[1]
    }
    for (var i = 0; i < white_bishop_position.length; i++) {
        chess_board[white_bishop_position[i]].piece = pieces_list[2]
    }
    for (var i = 0; i < white_queen_position.length; i++) {
        chess_board[white_queen_position[i]].piece = pieces_list[4]
    }
    for (var i = 0; i < white_king_position.length; i++) {
        chess_board[white_king_position[i]].piece = pieces_list[5]
    }
}
place_white_pieces()
//Set initial black pieces position on the board
var place_black_pieces = function () {
    for (var i = 0; i < black_pawns_position.length; i++) {
        chess_board[black_pawns_position[i]].piece = pieces_list[6]
    }
    for (var i = 0; i < black_rooks_position.length; i++) {
        chess_board[black_rooks_position[i]].piece = pieces_list[9]
    }
    for (var i = 0; i < black_knights_position.length; i++) {
        chess_board[black_knights_position[i]].piece = pieces_list[7]
    }
    for (var i = 0; i < black_bishop_position.length; i++) {
        chess_board[black_bishop_position[i]].piece = pieces_list[8]
    }
    for (var i = 0; i < black_queen_position.length; i++) {
        chess_board[black_queen_position[i]].piece = pieces_list[10]
    }
    for (var i = 0; i < black_king_position.length; i++) {
        chess_board[black_king_position[i]].piece = pieces_list[11]
    }
}
place_black_pieces()

//Place pieces on the board
var attach_piece_to_board = function () {
    console.log('Attaching pieces to the board')
    Object.keys(chess_board).forEach(function (key) {
        var piece = chess_board[key].piece
        if (piece != '') {
            chess_board[key].name = piece.name
            chess_board[key].symbol = piece.symbol
            chess_board[key].value = piece.value
        }
    })
}
attach_piece_to_board()

console.table(chess_board)

//Render board
var show_board = function () {
    console.log('Renderging the board')
    var board = ''
    var board_div = document.getElementById('board')
    board_div.innerHTML = ''

    lines.forEach(function (line) {
        columns.forEach(function (column) {
            if(chess_board[column + line].piece != ''){
                board += '<div class="square ' + chess_board[column + line].color +'-square" id="' + chess_board[column + line].position + '"><div data-position="'+ chess_board[column + line].piece.name + column + line+'" data-color="'+ chess_board[column + line].piece.color +'" data-name="'+ chess_board[column + line].piece.name +'" data-symbol="'+ chess_board[column + line].piece.symbol +'" data-value="'+ chess_board[column + line].piece.value +'" class="piece '+ chess_board[column + line].piece.color +'-piece" id="piece">' + chess_board[column + line].symbol + '</div></div>'
            } else {
                board += '<div class="square ' + chess_board[column + line].color +'-square" id="' + chess_board[column + line].position + '" onclick="drop_piece('+ chess_board[column + line].position +')"></div>'
            }
        })
        board += '\n'
    })

    board_div.innerHTML = board
}

var save_positions = function () {
    console.log('Saving positions')
    var spot_divs = document.getElementsByClassName('square')    
    Array.from(spot_divs).forEach(function (spot) {        
        if(spot.firstChild != null){
            chess_board[spot.id].piece = new pieces_obj(spot.firstChild.dataset.color, spot.firstChild.dataset.name, spot.firstChild.dataset.symbol, spot.firstChild.dataset.value)  
            chess_board[spot.id].name = spot.firstChild.dataset.name
            chess_board[spot.id].symbol = spot.firstChild.dataset.symbol
            chess_board[spot.id].value = spot.firstChild.dataset.value
        }else{
            chess_board[spot.id].piece = ''
            chess_board[spot.id].name = ''
            chess_board[spot.id].symbol = ''
            chess_board[spot.id].value = 0            
        }
    })
    console.table(chess_board)
}

//Invert board
var board_reverse = function () {  
    console.log('Inverting pieces')
    lines.reverse()
    columns.reverse()    
    show_board()
    set_select_piece_onclick()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//rotate the board
var board_rotate = async function () {  
    console.log('Rotating the board')  
    var board_div = document.getElementById('board')
    var table_div = document.getElementById('table')
    var place_div = document.getElementById('place')
    var body = document.getElementsByTagName('body')[0]
    var piece_span = document.getElementsByClassName('piece')
    for (var i = 0; i < piece_span.length; i++) {
        piece_span[i].classList.toggle('popOutPiece')
    }

    body.classList.toggle('changebackground')
    place_div.classList.toggle('zoom')
    await sleep(500);
    board_div.classList.toggle('invert')
    table_div.classList.toggle('popLeft')
    await sleep(1550);
    board_reverse();
    board_div.classList.toggle('invert')
    table_div.classList.toggle('popLeft')
    place_div.classList.toggle('zoom')
    await sleep(400);
    body.classList.toggle('changebackground')
}



var selected_piece = ''

var select_piece_to_move = async function (piece) {
    console.log('Selected piece ' + piece)    
    var piece_div = document.querySelector('[data-position="'+ piece +'"]')
    if(selected_piece == ''){        
        piece_div.classList.toggle('selected')
        selected_piece = piece
        await sleep(400);
        piece_div.style.transform = 'scale3d(1.5, 1.5, 1.5)'
    }else{
        if(selected_piece == piece){
            piece_div.classList.toggle('selected')
            piece_div.style.transform = 'scale3d(1, 1, 1)'
            selected_piece = ''
        }else{
            var last_piece_div = document.querySelector('[data-position="'+ selected_piece +'"]')        
            last_piece_div.classList.toggle('selected')
            last_piece_div.style.transform = 'scale3d(1, 1, 1)'
            piece_div.classList.toggle('selected')
            selected_piece = piece   
            await sleep(400);
            piece_div.style.transform = 'scale3d(1.5, 1.5, 1.5)'
        }    
    } 
}

var refresh_board = function () {
    console.log('Refreshing board')
    Object.keys(chess_board).forEach(function (key) {
        var spot_div = document.getElementById(key)
        if(spot_div.innerHTML == ''){
            spot_div.setAttribute('onclick', 'drop_piece(' + key + ')')
        }        
    })
}

var drop_piece = function (position) {
    console.log('Dropping piece')
    if(selected_piece != ''){
        var piece_div = document.querySelector('[data-position="'+ selected_piece +'"]')
        piece_div.classList.toggle('selected')
        selected_piece = ''
        piece_div.style.transform = 'scale3d(1, 1, 1)'        
        position.appendChild(piece_div)
        position.removeAttribute('onclick')       
    }else{
        console.log('No piece selected')
    }
    save_positions()
    refresh_board()
    
}

var set_select_piece_onclick = async function () {
    console.log('Setting onclick')
    await sleep(500);
    console.log('Good to go')
    var piece_span = document.getElementsByClassName('piece')
    for (var i = 0; i < piece_span.length; i++) {
        piece_span[i].setAttribute('onclick', 'select_piece_to_move("' + piece_span[i].getAttribute('data-position') + '")')         
    }
}

set_select_piece_onclick()





