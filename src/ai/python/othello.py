"""[summary] general othello classed and functions.
"""

from enum import IntEnum
import numpy as np

N = 8
COLUMNS = "abcdefgh"
ROWS = "12345678"

_nabor = 9

# 上下左右斜めのインデックスを作る
DIFFS = np.zeros([_nabor, 2], dtype=np.int8)
DIFFS[:, 0] = np.arange(_nabor, dtype=np.int8) // 3 - 1
DIFFS[:, 1] = np.arange(_nabor, dtype=np.int8) % 3 - 1
DIFFS = DIFFS[np.arange(_nabor) != 4]


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


def _check_flip_cells(board: np.ndarray, x: int, y: int, color: int, is_list_up: bool = False):

    if board[x, y] != 0:
        return None
    nabors = DIFFS + (x, y)  # 周辺8マスのインデックス配列
    nabor_cells = board[nabors[:, 0], nabors[:, 1]]
    is_flipable_nabor = nabor_cells == (3 - color)
    if not is_list_up:
        return is_flipable_nabor.any()
    directions = DIFFS[is_flipable_nabor]  # 敵の石が置いてあるマスとの差分
    flippable_indices = np.array([], dtype=np.int8).reshape(0, 2)
    for dxy in directions:  # TODO for文使わない実装
        count = 2
        nxy = (x, y) + dxy * count
        while((nxy >= 0) & (nxy < N)).all():
            if board[nxy] == CellState.Empty:
                break
            if board[nxy] == color:
                flippable_indices = np.r_[flippable_indices,
                                          np.arange(1, count, dtype=np.int8)
                                          [:, np.newaxis]*dxy]
                break

            count += 1
    return flippable_indices


def can_put_stone(board: np.ndarray, x: int, y: int, color: int):
    return bool(_check_flip_cells(board, x, y, color, False))


def list_flip_cells(board: np.ndarray, x: int, y: int, color: int):
    return _check_flip_cells(board, x, y, color, True)
