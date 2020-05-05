from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return render(request,'home.html')

def samar(request):
    return render(request,'samar.html')

def bataan(request):
    return render(request,'bataan.html')

def haiyan(request):
    return render(request,'inundation_haiyan.html')

def tacloban(request):
    return render(request,'tacloban.html')
    
def about(request):
    return HttpResponse('<h1>Storm Surge About</h1>')