from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import DepartmentGroupSerializer
from django.db import connection

# Create your views here.

@api_view(['GET'])
def getDept(request):
    dept=Dimdepartmentgroup.objects.all()
    serializer=DepartmentGroupSerializer(dept, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def dept(request):
    cursor=connection.cursor()
    cursor.execute('''SELECT d.DepartmentGroupName, COUNT(f.FinanceKey) AS NumberOfPeople
                        FROM [AdventureWorksDW2019].[dbo].[DimDepartmentGroup] d
                        LEFT JOIN [AdventureWorksDW2019].[dbo].[FactFinance] f ON f.DepartmentGroupKey = d.DepartmentGroupKey
                        GROUP BY d.DepartmentGroupName;''')
    result=cursor.fetchall()
    return Response(result)