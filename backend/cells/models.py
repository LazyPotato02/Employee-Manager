from django.db import models

# Create your models here.

class Cell(models.Model):
    name = models.CharField(max_length=100)
