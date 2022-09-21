from rest_framework.response import Response
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import viewsets, status
from employee.models import Employee
from employee.serializers import EmployeeSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def employee_list(request):
    if request.method == 'GET':
        global employee
        employee = Employee.objects.all()
        EmployeeFirstName = request.GET.get('employeeFirstName', None)
        if EmployeeFirstName is not None:
            employee = Employee.filter(title__icontains=EmployeeFirstName)

        employee_serializer = EmployeeSerializer(employee, many=True)
        return Response(employee_serializer.data)

    elif request.method == 'POST':
        employee_data = JSONParser().parse(request)
        employee_serializer = EmployeeSerializer(data=employee_data)

        if employee_serializer.is_valid():
            employee_serializer.save()
            return Response(employee_serializer.data, status=status.HTTP_201_CREATED)
        return Response(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Employee.objects.all().delete()
        return Response({'message': 'employees were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@ api_view(['GET', 'PUT', 'DELETE'])
def employee_detail(request, pk):
    try:
        global employee
        employee = Employee.objects.get(pk=pk)
    except employee.DoesNotExist:
        return Response({'message': 'The Employee does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        employee_serializer = EmployeeSerializer(employee)
        return Response(employee_serializer.data)

    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employee_serializer = EmployeeSerializer(employee, data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return Response(employee_serializer.data)
        return Response(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        employee.delete()
        return Response({'message': 'employee was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
