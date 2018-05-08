'use strict';
(function () {
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

    function drawBoard(board, player) {
        bb = board;
        var ss = [];
        var columns = "abcdefgh";
        var rows = "12345678";

        ss.push('<table>');
        for (let y = -1; y < N; y++) {
            ss.push('<tr>');
            for (let x = -1; x < N; x++) {
                if (0 <= y && 0 <= x) {
                    ss.push('<td class="cell');
                    ss.push(' ');
                    ss.push(board[[x, y]]);
                    ss.push('">');
                    ss.push('<span class="disc"></span>');
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
        document.getElementById("next-color").innerHTML = '<span class="disc ' + player + '"></span>';
    }

    /**
     * @param {object} board
     * @param {string} player
     * @param {boolean} wasPassed 
     * @param {number} i
     * @param {number} j 
     */
    function CanPutStone(board, player, i, j) {
        var target = board[[i, j]];
        if (target != EMPTY) {
            return false;
        }

        var diffs = [
            [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
            [i, j - 1], , [i, j + 1],
            [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]];
        diffs.forEach(diff => {
            if (!(diff[0] < 0 || diff[0] >= N || diff[1] < 0 || diff[1] >= N)) {
                var nabor = board[diff];
                if (nabor != EMPTY && nabor != player) {
                    // 先まで見て自分の色がある
                }
            }

        });

        return false;
    }

})();