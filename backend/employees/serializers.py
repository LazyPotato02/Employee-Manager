from rest_framework import serializers

from employees.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        read_only_fields = ['id']

    def create(self, validated_data):
        return Employee.objects.create(**validated_data)