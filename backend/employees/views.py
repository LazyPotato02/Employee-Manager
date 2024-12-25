from cgi import logfp

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from employees.models import Employee
from employees.serializers import EmployeeSerializer


# Create your views here.


class EmployeesView(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        employees = Employee.objects.all()
        for employee in employees:
            employee.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class SingleEmployeeView(APIView):
    def get(self, request,id):
        employee = Employee.objects.filter(pk=id)
        if not employee:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EmployeeSerializer(employee, many=True)
        return Response(serializer.data)
