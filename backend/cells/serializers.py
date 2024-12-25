from rest_framework import serializers

from cells.models import Cell


class CellSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cell
        fields = '__all__'
        read_only_fields = ['id']

    def create(self, validated_data):
        return Cell.objects.create(**validated_data)