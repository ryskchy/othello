from django.shortcuts import render
from django.http import JsonResponse
from . import othello


def left_top(request):
    # TODO 合法手の中から左上のマスを選択するロジックを実装
    return JsonResponse({"cell": "c4", "color": "black"})
