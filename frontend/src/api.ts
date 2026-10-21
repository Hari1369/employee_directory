import axios from "axios";
import type { EmployeeInput } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
});

export const getEmployees = () => api.get("/employees");

export const createEmployee = (data: EmployeeInput) => api.post("/employees", data);

export const updateEmployee = (id: number, data: EmployeeInput) =>
  api.put("/employees/" + id, data);

export const deleteEmployee = (id: number) => api.delete("/employees/" + id);