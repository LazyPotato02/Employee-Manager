from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api-auth/', include('rest_framework.urls')),
    path('auth/', include('users.urls'), name='register'),
    path('employee/', include('employees.urls'), name='employee'),
    path('orders/', include('orders.urls'), name='orders'),
    path('materials/', include('materials.urls'), name='orders'),
    path('cells/', include('cells.urls'), name='cells'),
]
