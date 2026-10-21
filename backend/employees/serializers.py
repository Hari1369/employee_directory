from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="first_name")
    role = serializers.CharField(source="job_role")

    class Meta:
        model = Employee
        fields = ["id", "name", "email", "role", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at"]