from django.urls import path
from .views import LogoutView, LoginView, verify_session

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('verify', verify_session, name='verify_session'),
    # path('register/', RegisterView.as_view(), name='register'),
]
