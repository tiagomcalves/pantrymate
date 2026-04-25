from django.db import models
from django.utils import timezone
import datetime

class Product(models.Model):
    name = models.CharField(max_length=120)
    img = models.CharField(max_length=64)

    def __str__(self):
        return self.name