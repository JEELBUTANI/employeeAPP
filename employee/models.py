from django.db import models


class Employee(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeFirstName = models.CharField(max_length=50)
    EmployeeLastNAme = models.CharField(max_length=50)
    EmployeeEmail = models.EmailField(max_length=30)
    EmployeeContact = models.BigIntegerField()
