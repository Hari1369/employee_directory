from rest_framework import status
from rest_framework.test import APITestCase

from .models import Employee


class EmployeeApiTests(APITestCase):
	def setUp(self):
		self.employee = Employee.objects.create(
			first_name="Avery Morgan",
			email="avery@example.com",
			job_role="Engineer",
		)

	def test_get_employees(self):
		response = self.client.get("/employees")

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data[0]["name"], "Avery Morgan")
		self.assertEqual(response.data[0]["role"], "Engineer")

	def test_post_employee(self):
		response = self.client.post(
			"/employees",
			{"name": "Jordan Lee", "email": "jordan@example.com", "role": "Designer"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertTrue(Employee.objects.filter(first_name="Jordan Lee").exists())

	def test_put_employee(self):
		response = self.client.put(
			f"/employees/{self.employee.id}",
			{"name": "Avery Lee", "email": "avery@example.com", "role": "Lead"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.employee.refresh_from_db()
		self.assertEqual(self.employee.first_name, "Avery Lee")
		self.assertEqual(self.employee.job_role, "Lead")

	def test_delete_employee(self):
		response = self.client.delete(f"/employees/{self.employee.id}")

		self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
		self.assertFalse(Employee.objects.filter(id=self.employee.id).exists())
