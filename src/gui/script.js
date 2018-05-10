'use strict';
var gameState = {
    board: undefined,
    turn: undefined,
    wasPassed: false,
    log: []
};

(function () {
    var N = 8;
    var EMPTY = "empty";
    var WHITE = "white";
    var BLACK = "black";
    var COLUMNS = "abcdefgh";
    var ROWS = "12345678";
    var diffs = [
        [- 1, - 1], [- 1, 0], [- 1, 1],
        [0, - 1], [0, 1],
        [1, - 1], [1, 0], [1, 1]];

    main();

    function main() {
        reset();
    }

    function reset() {
        gameState.board = initializeBoard();
        gameState.turn = BLACK;
        gameState.wasPassed = false;
        gameState.log
        drawBoard(gameState.board, BLACK);
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

    function getCellID(x, y) {
        return 'cell_' + x + '_' + y;
    }

    function drawBoard() {
        var board = gameState.board;
        var turn = gameState.turn;


        var table = document.createElement('table');
        table.id = 'game-table';
        var tbody = table.createTBody();

        for (let y = -1; y < N; y++) {
            let tr = document.createElement('tr');
            for (let x = -1; x < N; x++) {
                if (0 <= y && 0 <= x) {
                    let td = document.createElement('td');
                    td.id = getCellID(x, y);
                    td.classList.add('cell');
                    td.classList.add(board[[x, y]]);

                    var canclick = canPutStone(x, y);
                    if (canclick) {
                        td.classList.add('clickable');
                    }
                    td.onclick = () => cellClicked(x, y);
                    var stone = document.createElement('span');
                    stone.classList.add('stone');
                    td.appendChild(stone);
                    tr.appendChild(td);
                }
                else {
                    let th = document.createElement('th');
                    if (x >= 0) {
                        th.textContent = COLUMNS[x];
                    }
                    else if (y >= 0) {
                        th.textContent = ROWS[y];
                    }
                    tr.appendChild(th);
                }
            }
            tbody.appendChild(tr);
        }

        var gboard = document.getElementById("game-board");
        gboard.innerHTML = '';
        gboard.appendChild(table);
        document.getElementById("next-color").innerHTML = '<span class="stone ' + turn + '"></span>';
        document.getElementById("record").innerText = gameState.log.join('\n');
    }

    /**
     * @param {object} board
     * @param {string} turn
     * @param {boolean} wasPassed 
     * @param {number} x
     * @param {number} y 
     */
    function canPutStone(x, y) {
        if (gameState.board[[x, y]] != EMPTY) {
            return false;
        }
        return checkFlipCells(x, y, false).length > 0;
    }


    function listFlipCells(x, y) {
        return checkFlipCells(x, y, true);
    }
    function checkFlipCells(x, y, isListup) {
        var listFlips = [];
        for (const diff of diffs) {
            if (x + diff[0] < 0 || x + diff[0] >= N || y + diff[1] < 0 || y + diff[1] >= N)
                continue;

            var idx = [x + diff[0], y + diff[1]];
            var nabor = gameState.board[idx];
            if (nabor != EMPTY && nabor != gameState.turn) {
                // 先まで見て自分の色がある
                while (idx[0] >= 0 && idx[0] < N && idx[1] >= 0 && idx[1] < N) {
                    idx = [idx[0] + diff[0], idx[1] + diff[1]];
                    if (gameState.board[idx] == gameState.turn) {
                        if (!isListup) {
                            listFlips.push(idx);
                            return listFlips;
                        }
                        var idx2 = [x + diff[0], y + diff[1]];
                        while (idx2[0] != idx[0] || idx2[1] != idx[1]) {
                            listFlips.push(idx2);
                            idx2 = [idx2[0] + diff[0], idx2[1] + diff[1]];
                        }
                        break;
                    }
                    if (gameState.board[idx] == EMPTY) {
                        break;
                    }
                }
            }
        }
        return listFlips;
    }

    /**
     * 指し手がなければtrue
     */
    function checkPass() {
        for (let x = 0; x < N; x++) {
            for (let y = 0; y < N; y++) {
                if (canPutStone(x, y)) {
                    return false;
                }
            }
        }
        return true;
    }

    function endGame() {
        var score = calcScore();
        document.getElementById("winner").innerText = score[BLACK] > score[WHITE] ? BLACK : score[BLACK] < score[WHITE] ? WHITE : "draw";
    }
    function calcScore() {
        var score = {}
        score[BLACK] = 0;
        score[WHITE] = 0;
        for (let x = 0; x < N; x++) {
            for (let y = 0; y < N; y++) {
                if (gameState.board.hasOwnProperty([x, y])) {
                    const element = gameState.board[[x, y]];
                    if (element != EMPTY) {
                        score[element] += 1;
                    }
                }

            }
        }
        return score;

    }

    function step(x, y) {
        flipStones(x, y);
        gameState.log.push([x, y, gameState.turn]);
        gameState.turn = gameState.turn == BLACK ? WHITE : BLACK;
        if (checkPass()) {
            gameState.log.push(["pass", gameState.turn]);
            gameState.turn = gameState.turn == BLACK ? WHITE : BLACK;
            if (gameState.wasPassed) {
                endGame();
                return;
            }
            gameState.wasPassed = true;
        }
    }

    function flipStones(x, y) {
        gameState.board[[x, y]] = gameState.turn;
        listFlipCells(x, y).forEach(idx => {
            gameState.board[idx] = gameState.turn;
        });

    }
    function cellClicked(x, y) {
        console.log(x, ",", y)
        if (!document.getElementById(getCellID(x, y)).classList.contains('clickable')) return;
        step(x, y);
        drawBoard();
        return;
    }


})();