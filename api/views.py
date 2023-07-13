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
                        GROUP BY d.DepartmentGroupName
                        order by COUNT(f.FinanceKey) desc ;''')
    result=cursor.fetchall()
    return Response(result)

@api_view(['GET'])
def deptFinance(request):
    cursor=connection.cursor()
    cursor.execute('''SELECT
                        DDG.DepartmentGroupName,
                        SUM(FF.Amount) AS TotalAmount
                        FROM
                        AdventureWorksDW2019.dbo.FactFinance AS FF
                        JOIN
                        AdventureWorksDW2019.dbo.DimDepartmentGroup AS DDG
                        ON
                        FF.DepartmentGroupKey = DDG.DepartmentGroupKey
                        GROUP BY
                        DDG.DepartmentGroupName
                        ORDER BY SUM(FF.Amount) desc;''')
    result=cursor.fetchall()
    return Response(result)

@api_view(['GET'])
def sales(request):
    cursor=connection.cursor()
    cursor.execute('''SELECT YEAR(OrderDate) AS Year, SUM(SalesAmount) AS TotalSales
                        FROM [AdventureWorksDW2019].[dbo].[FactInternetSales]
                        GROUP BY YEAR(OrderDate)
                        ORDER BY YEAR(OrderDate) ASC;''')
    result=cursor.fetchall()
    return Response(result)

@api_view(['GET'])
def country(request):
    cursor=connection.cursor()
    cursor.execute('''SELECT g.FrenchCountryRegionName AS Country, COUNT(c.CustomerKey) AS CustomerCount
                        FROM AdventureWorksDW2019.dbo.DimCustomer c
                        JOIN AdventureWorksDW2019.dbo.DimGeography g ON c.GeographyKey = g.GeographyKey
                        GROUP BY g.FrenchCountryRegionName
                        ORDER BY CustomerCount ASC;''')
    result=cursor.fetchall()
    return Response(result)

@api_view(['GET'])
def CACountry(request):
    cursor=connection.cursor()
    cursor.execute('''SELECT DG.FrenchCountryRegionName,
                        SUM(FIS.SalesAmount) AS TotalAmount
                        FROM
                        AdventureWorksDW2019.dbo.FactInternetSales AS FIS
                        JOIN
                        AdventureWorksDW2019.dbo.DimSalesTerritory AS DST
                        ON
                        FIS.SalesTerritoryKey = DST.SalesTerritoryKey
                        JOIN
                        AdventureWorksDW2019.dbo.DimGeography AS DG
                        ON
                        DST.SalesTerritoryKey = DG.SalesTerritoryKey
                        GROUP BY
                        DG.FrenchCountryRegionName
                        ORDER BY SUM(FIS.SalesAmount) asc;''')
    result=cursor.fetchall()
    return Response(result)
