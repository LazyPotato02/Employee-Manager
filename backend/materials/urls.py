from django.urls import path

from materials.views import MaterialsView, SingleMaterialView

urlpatterns = [
    path('', MaterialsView.as_view(), name='materials'),
    path('<int:id>', SingleMaterialView.as_view(), name='single-material'),
]
