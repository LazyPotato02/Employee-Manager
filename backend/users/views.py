from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
# from users.serializers import UserRegistrationSerializer


# class RegisterView(APIView):
#     def post(self, request):
#         serializer = UserRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             # Generate tokens
#             refresh = RefreshToken.for_user(user)
#
#             # Set cookies
#             response = Response({
#                 "message": "User registered successfully",
#                 "access": str(refresh.access_token),
#                 "refresh": str(refresh),
#             }, status=status.HTTP_201_CREATED)
#
#             response.set_cookie(
#                 key='access_token',
#                 value=str(refresh.access_token),
#                 httponly=True,
#                 secure=False,  # Set to True in production (HTTPS)
#                 samesite='Lax',
#             )
#             response.set_cookie(
#                 key='refresh_token',
#                 value=str(refresh),
#                 httponly=True,
#                 secure=False,  # Set to True in production (HTTPS)
#                 samesite='Lax',
#             )
#             return response
#
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            response = Response({
                "message": "Login successful",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)

            # Set tokens in cookies
            response.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,
                secure=True,  # Set to True for HTTPS
                samesite='None',
                max_age=60 * 60 * 24 * 7,
            )
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,  # Set to True for HTTPS
                samesite='None',
                max_age=60 * 60 * 24 * 7,
            )
            return response
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_session(request):
    print(request)
    return Response({'loggedIn': True}, status=200)