from django.db import models


class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=150, unique=True)
    job_role = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "employees"
        ordering = ["-created_at"]