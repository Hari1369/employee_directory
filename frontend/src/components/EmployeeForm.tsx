import { useEffect, useState } from "react";
import type { Employee, EmployeeInput } from "../types";

type Props = {
  editing: Employee | null;
  onSubmit: (data: EmployeeInput) => void;
  onCancel: () => void;
};

export default function EmployeeForm({ editing, onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setEmail(editing.email);
      setRole(editing.role);
    } else {
      setName("");
      setEmail("");
      setRole("");
    }
  }, [editing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: name, email: email, role: role });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editing ? "Edit Employee" : "Add Employee"}</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-blue">
        {editing ? "Update" : "Add"}
      </button>

      {editing && (
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}