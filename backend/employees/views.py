from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cells.models import Cell
from employees.models import Employee
from employees.serializers import EmployeeSerializer


# Create your views here.


class EmployeesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SingleEmployeeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            employee = Employee.objects.get(pk=id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            employee = Employee.objects.get(pk=id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            employee = Employee.objects.get(pk=id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        employee.delete()
        return Response({"message": "Employee deleted."}, status=status.HTTP_204_NO_CONTENT)


class GetEmployeesFromCellsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, cell_id):
        try:
            employees = Employee.objects.filter(cell_id=cell_id)
            serializer = EmployeeSerializer(employees, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

from django.shortcuts import get_object_or_404

class BulkUpdateEmployeesView(APIView):
    def put(self, request):
        if not isinstance(request.data, list):
            return Response({"error": "Expected a list of employee updates."}, status=status.HTTP_400_BAD_REQUEST)

        errors = []
        for employee_data in request.data:
            try:
                employee = Employee.objects.get(id=employee_data['id'])

                if employee_data['cell'] == "0":
                    employee.cell = None
                else:
                    employee.cell = get_object_or_404(Cell, id=employee_data['cell'])

                employee.save()
            except Employee.DoesNotExist:
                errors.append(f"Employee with id {employee_data['id']} not found.")
            except Cell.DoesNotExist:
                errors.append(f"Cell with id {employee_data['cell']} not found.")
            except KeyError:
                errors.append("Invalid data format for employee update.")

        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Employees updated successfully"}, status=status.HTTP_200_OK)
