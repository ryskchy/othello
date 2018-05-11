"""[summary] general othello classed and functions.
"""

from enum import IntEnum
import numpy as np

N = 8
COLUMNS = "abcdefgh"
ROWS = "12345678"


class CellState(IntEnum):
    Empty = 0
    BLack = 1
    White = 2


CHAR_TO_NUM = {
    'e': 0,
    'b': 1,
    'w': 2
}


class GameState(object):

    def __init__(self, board, turn):
        self.board = board
        self.turn = turn


class NextStone(object):

    def __init__(self, isPass, cell, color):
        self.isPass = isPass
        self.cell = cell
        self.color = color


def decode_board(sboard: str):

    return np.array([CHAR_TO_NUM[i] for i in sboard], dtype=np.int8).reshape(N, N)


def check_flip_cells(board: np.ndarray, x, y, isListUp=False):

    pass
