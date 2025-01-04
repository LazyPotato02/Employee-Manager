from django.db import models

from cells.models import Cell


class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    cell = models.ForeignKey(
        Cell,
        on_delete=models.SET_NULL,
        related_name="employees",
        null=True,
        blank=True
    )
    def str(self):
        return f'{self.first_name} {self.last_name}'