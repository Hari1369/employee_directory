export type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

export type EmployeeInput = {
  name: string;
  email: string;
  role: string;
};