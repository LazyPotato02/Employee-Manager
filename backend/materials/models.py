from django.db import models


# Create your models here.


class Materials(models.Model):
    material_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
