from os import path
import sys
sys.path.append(path.dirname(path.dirname(
    path.dirname(path.abspath(__file__)))))
from django.shortcuts import render
from django.http import JsonResponse
import othello


def left_top(request):
    # TODO 合法手の中から左上のマスを選択するロジックを実装
    return JsonResponse({"cell": "4c", "color": "black"})
