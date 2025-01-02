from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cells.models import Cell
from cells.serializers import CellSerializer


# Create your views here.
class CellsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = Cell.objects.all()
        serializer = CellSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CellSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SingleCellView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            employee = Cell.objects.get(pk=id)
        except Cell.DoesNotExist:
            return Response({"error": "Cell not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CellSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            employee = Cell.objects.get(pk=id)
        except Cell.DoesNotExist:
            return Response({"error": "Cell not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CellSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            employee = Cell.objects.get(pk=id)
        except Cell.DoesNotExist:
            return Response({"error": "Cell not found"}, status=status.HTTP_404_NOT_FOUND)
        employee.delete()
        return Response({"message": "Cell deleted."}, status=status.HTTP_204_NO_CONTENT)
