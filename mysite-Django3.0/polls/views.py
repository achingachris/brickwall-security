from django.shortcuts import render
from django.http import HttpResponse

def HelloWorld(request):
    return HttpResponse("Ohh Hey I will not use that Hello World crap, lets stick to OOOh!!! It is working")