from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from materials.models import Materials
from materials.serializers import MaterialSerializer


# Create your views here.
class MaterialsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        employees = Materials.objects.all()
        serializer = MaterialSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MaterialSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SingleMaterialView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        try:
            employee = Materials.objects.get(pk=id)
        except Materials.DoesNotExist:
            return Response({"error": "Material not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = MaterialSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            employee = Materials.objects.get(pk=id)
        except Materials.DoesNotExist:
            return Response({"error": "Material not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = MaterialSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            employee = Materials.objects.get(pk=id)
        except Materials.DoesNotExist:
            return Response({"error": "Material not found"}, status=status.HTTP_404_NOT_FOUND)
        employee.delete()
        return Response({"message": "Material deleted."}, status=status.HTTP_204_NO_CONTENT)