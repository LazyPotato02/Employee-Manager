from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from orders.models import Orders
from orders.serializers import OrderSerializer


# Create your views here.
class OrdersView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        employees = Orders.objects.all()
        serializer = OrderSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SingleOrderView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        try:
            employee = Orders.objects.get(pk=id)
        except Orders.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            employee = Orders.objects.get(pk=id)
        except Orders.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            employee = Orders.objects.get(pk=id)
        except Orders.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        employee.delete()
        return Response({"message": "Employee deleted."}, status=status.HTTP_204_NO_CONTENT)