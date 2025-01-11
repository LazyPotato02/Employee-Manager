from django.urls import path

from orders.views import OrdersView, SingleOrderView, StartOrderView

urlpatterns = [
    path('', OrdersView.as_view(), name='orders'),
    path('<int:id>', SingleOrderView.as_view(), name='single-order'),
    path('getStartOrder/<str:order_name>/', StartOrderView.as_view(), name='single-order-update'),
]
