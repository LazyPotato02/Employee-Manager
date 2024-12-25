from django.db import models

from cells.models import Cell


# Create your models here.


class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    cell = models.ForeignKey(Cell, on_delete=models.CASCADE, related_name="employees")
    def str(self):
        return f'{self.first_name} {self.last_name}'