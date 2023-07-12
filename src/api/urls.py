from django.urls import path
from . import views


urlpatterns = [
    path('deptTest/', views.getDept),
    path('dept/', views.dept),
    path('deptFinance/', views.deptFinance),
    path('sales/', views.sales),
]