from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["id", "first_name", "email", "job_role", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at"]