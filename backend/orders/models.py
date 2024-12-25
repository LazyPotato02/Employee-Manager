from django.db import models


# Create your models here.


class Orders(models.Model):
    order_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    done_quantity = models.IntegerField(default=0)
