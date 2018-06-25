from django.shortcuts import render
from django.http import JsonResponse
from . import othello


def left_top(request):
    # TODO 合法手の中から左上のマスを選択するロジックを実装
    data = {"is_passed": False,
            "cell": "c4",
            "color": "black"
            }
    return JsonResponse(data)
