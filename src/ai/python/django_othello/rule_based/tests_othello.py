import unittest
from nose.tools import ok_, eq_
import othello


class TestOthello(unittest.TestCase):

    ebw = 'ebw'

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_decord_board_initial(self):

        s_list = ['eeeeeeee',
                  'eeeeeeee',
                  'eeeeeeee',
                  'eeewbeee',
                  'eeebweee',
                  'eeeeeeee',
                  'eeeeeeee',
                  'eeeeeeee']
        s = ''.join(s_list)
        borad = othello.decode_board(s)
        for i in range(8):
            for j in range(8):
                eq_(TestOthello.ebw[borad[i][j]], s_list[i][j])

    def test_decord_board_01(self):
        s_list = ['eebeeeee',
                  'eeeweeee',
                  'eeeeeeee',
                  'eeewbbee',
                  'eeebwwee',
                  'eeeewebe',
                  'eeeeweee',
                  'weeeeeeb']
        s = ''.join(s_list)
        borad = othello.decode_board(s)
        for i in range(8):
            for j in range(8):
                eq_(TestOthello.ebw[borad[i][j]], s_list[i][j])
