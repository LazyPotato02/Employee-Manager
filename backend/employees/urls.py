from django.urls import path

from employees.views import EmployeesView, SingleEmployeeView, GetEmployeesFromCellsView

urlpatterns =[
    path('', EmployeesView.as_view(), name='employees'),
    path('<int:id>', SingleEmployeeView.as_view(), name='single-employee'),
    path('cell-employees/<int:cell_id>', GetEmployeesFromCellsView.as_view(), name='employees-from-cell'),

]
