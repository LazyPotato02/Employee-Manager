from django.urls import path

from employees.views import EmployeesView, SingleEmployeeView, GetEmployeesFromCellsView, BulkUpdateEmployeesView

urlpatterns =[
    path('', EmployeesView.as_view(), name='employees'),
    path('<int:id>', SingleEmployeeView.as_view(), name='single-employee'),
    path('cellemployees/<int:cell_id>', GetEmployeesFromCellsView.as_view(), name='employees-from-cell'),
    path('bulk-update', BulkUpdateEmployeesView.as_view(), name='bulk-update-employees'),

]
