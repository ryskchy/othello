'use strict';
// (function () {
var N = 8;
var bb = null;
var EMPTY = "empty";
var WHITE = "white";
var BLACK = "black";

main();

function main() {
    bb = initializeBoard();
    drawBoard(bb, BLACK);
}

function initializeBoard() {
    var board = {};

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            board[[i, j]] = EMPTY;
        }
    }
    var half = N >> 1;
    board[[half - 1, half - 1]] = WHITE;
    board[[half, half]] = WHITE;
    board[[half, half - 1]] = BLACK;
    board[[half - 1, half]] = BLACK;
    return board;
}

function drawBoard(board, turn) {
    bb = board;
    var ss = [];
    var columns = "abcdefgh";
    var rows = "12345678";


    ss.push('<table id="game-table">');
    for (let y = -1; y < N; y++) {

        ss.push('<tr>');
        for (let x = -1; x < N; x++) {
            if (0 <= y && 0 <= x) {
                ss.push('<td class="cell');
                ss.push(' ');
                ss.push(board[[x, y]]);
                if (CanPutStone(board, turn, x, y)) {

                    ss.push(' clickable')
                }
                ss.push('"');
                ss.push('id="cell_');
                ss.push(x);
                ss.push('_');
                ss.push(y);
                ss.push('"');
                ss.push('>');
                ss.push('<span class="stone"></span>');
                ss.push('</td>');
            }
            else if (x >= 0 && y == -1) {
                ss.push('<th>' + columns[x] + "</th>");
            } else if (x == -1 && y >= 0) {
                ss.push('<th>' + rows[y] + "</th>");
            } else {
                ss.push('<th></th>');
            }
        }
        ss.push('</tr>');
    }
    ss.push('</table>');
    document.getElementById("game-board").innerHTML = ss.join('');
    document.getElementById("next-color").innerHTML = '<span class="stone ' + turn + '"></span>';
}

/**
 * @param {object} board
 * @param {string} turn
 * @param {boolean} wasPassed 
 * @param {number} i
 * @param {number} j 
 */
function CanPutStone(board, turn, i, j) {
    if (board[[i, j]] != EMPTY) {
        return false;
    }

    var diffs = [
        [- 1, - 1], [- 1, 0], [- 1, 1],
        [0, - 1], [0, 1],
        [1, - 1], [1, 0], [1, 1]];
    for (const diff of diffs) {
        if (i + diff[0] < 0 || i + diff[0] >= N || j + diff[1] < 0 || j + diff[1] >= N)
            continue;

        var idx = [i + diff[0], j + diff[1]];
        var nabor = board[idx];
        if (nabor != EMPTY && nabor != turn) {
            // 先まで見て自分の色がある
            while (idx[0] >= 0 && idx[0] < N && idx[1] >= 0 && idx[1] < N) {
                idx = [idx[0] + diff[0], idx[1] + diff[1]];
                if (board[idx] == turn) {
                    return true;
                }
                if (board[idx] == EMPTY) {
                    break;
                }
            }
        }
    }
    return false;
}

function setClickableCells(board, turn, wasPassed) {
    var table = document.getElementById("game-table");
    if (table == undefined) {
        return -1;
    }
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
        }
        const element = array[i];

    }
}


// })();