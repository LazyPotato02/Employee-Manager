from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Use cookies for token retrieval
        raw_token = request.COOKIES.get('access_token')
        if raw_token is None:
            return None  # No authentication
        try:
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        except Exception:
            return None