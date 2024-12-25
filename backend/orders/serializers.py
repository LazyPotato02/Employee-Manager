from rest_framework import serializers

from orders.models import Orders


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'
        read_only_fields = ['id']

    def create(self, validated_data):
        return Orders.objects.create(**validated_data)