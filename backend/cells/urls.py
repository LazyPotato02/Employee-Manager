from django.urls import path

from cells.views import CellsView, SingleCellView

urlpatterns =[
    path('', CellsView.as_view(), name='cells'),
    path('<int:id>', SingleCellView.as_view(), name='single-cell'),

]
