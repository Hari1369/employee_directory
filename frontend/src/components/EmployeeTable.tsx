import type { Employee } from "../types";

interface Props {
  employees: Employee[];
  onEdit: (e: Employee) => void;
  onDelete: (id: number) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete }: Props) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Created</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {employees.length === 0 && (
            <tr><td colSpan={6}>No employees yet.</td></tr>
          )}
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.role}</td>
              <td>{new Date(e.created_at).toLocaleDateString()}</td>
              <td>
                <button className="btn" onClick={() => onEdit(e)}>Edit</button>
                <button className="btn danger" onClick={() => onDelete(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}