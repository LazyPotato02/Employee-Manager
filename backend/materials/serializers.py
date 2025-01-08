from rest_framework import serializers

from materials.models import Materials


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materials
        fields = '__all__'
        read_only_fields = ['id']

    def create(self, validated_data):
        return Materials.objects.create(**validated_data)