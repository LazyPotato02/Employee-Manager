from django.urls import path

from employees.views import EmployeesView, SingleEmployeeView

urlpatterns =[
    path('', EmployeesView.as_view(), name='employees'),
    path('<int:id>', SingleEmployeeView.as_view(), name='single-employee'),

]
