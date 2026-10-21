import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "./api";
import type { Employee, EmployeeInput } from "./types";
import "./App.css";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data
      ? JSON.stringify(error.response.data)
      : error.message;
  }

  return error instanceof Error ? error.message : fallback;
}

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [error, setError] = useState("");

  // GET all employees
  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      setError(getErrorMessage(err, "Could not load employees."));
    }
  };

  // Runs once when the page opens
  useEffect(() => {
    loadEmployees();
  }, []);

  // POST (add) or PUT (update)
  const handleSubmit = async (data: EmployeeInput) => {
    try {
      setError("");
      if (editing) {
        await updateEmployee(editing.id, data);
      } else {
        await createEmployee(data);
      }
      setEditing(null);
      loadEmployees();
    } catch (err) {
      setError(getErrorMessage(err, "Save failed."));
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      setError("");
      await deleteEmployee(id);
      await loadEmployees();
    } catch (err) {
      setError(getErrorMessage(err, "Could not delete employee."));
    }
  };

  return (
    <div className="container">
      <h1>Employee Manager</h1>

      {error && <div className="error">{error}</div>}

      <EmployeeForm
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />

      <EmployeeTable
        employees={employees}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
}