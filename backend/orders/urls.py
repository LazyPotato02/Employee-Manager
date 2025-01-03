from django.urls import path

from orders.views import OrdersView, SingleOrderView

urlpatterns = [
    path('', OrdersView.as_view(), name='orders'),
    path('<int:id>/', SingleOrderView.as_view(), name='single-order'),
]
