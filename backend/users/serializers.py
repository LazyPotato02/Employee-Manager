# from rest_framework import serializers
# from django.contrib.auth.models import User
# from rest_framework.validators import UniqueValidator
#
#
# class UserRegistrationSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(
#         required=True,
#         validators=[
#             UniqueValidator(
#                 queryset=User.objects.all(),
#                 message="A user with this email already exists."
#             )
#         ]
#     )
#     password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
#
#     class Meta:
#         model = User
#         fields = ['username','email', 'first_name', 'last_name', 'password', 'password2']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }
#
#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password": "Password fields didn't match."})
#         return attrs
#
#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             first_name=validated_data['first_name'],
#             last_name=validated_data['last_name'],
#             password=validated_data['password']
#         )
#         return user
