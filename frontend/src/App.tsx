
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

const API_URL = "http://localhost:5000/employees";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const filteredEmployees = employees.filter((employee) =>
  employee.name.toLowerCase().includes(search.toLowerCase())
);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>(API_URL);
      setEmployees(response.data);
      setError("");
    } catch {
      setError("Could not load employees. Check that the backend is running.");
    }
  };

  useEffect(() => {
  const loadEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>(API_URL);
      setEmployees(response.data);
      setError("");
    } catch {
      setError("Could not load employees. Check that the backend is running.");
    }
  };

  loadEmployees();
}, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const employee = { name, email, role };

      if (editId !== null) {
        await axios.put(`${API_URL}/${editId}`, employee);
      } else {
        await axios.post(API_URL, employee);
      }

      setName("");
      setEmail("");
      setRole("");
      setEditId(null);
      setError("");
      await fetchEmployees();
    } catch {
      setError("Could not save employee. Please try again.");
    }
  };

  const handleEdit = (employee: Employee) => {
    setName(employee.name);
    setEmail(employee.email);
    setRole(employee.role);
    setEditId(employee.id);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchEmployees();
    } catch {
      setError("Could not delete employee. Please try again.");
    }
  };

  const cancelEdit = () => {
    setName("");
    setEmail("");
    setRole("");
    setEditId(null);
    setError("");
  };

  return (
    <main className="container">
      <header className="page-header">
        <p className="eyebrow">PEOPLE MANAGEMENT</p>
        <p className="subtitle">
          Manage your team members in one place.
        </p>
      </header>

      <section className="panel">
        <h2>{editId !== null ? "Edit Employee" : "Add New Employee"}</h2>

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="role">Job role</label>
            <input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              {editId !== null ? "Update Employee" : "Add Employee"}
            </button>

            {editId !== null && (
              <button
                type="button"
                className="secondary-button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {error && <p className="error-message">{error}</p>}

      <section className="panel">
        <div className="list-header">
          <div>
            <h2>Team Members</h2>
          </div>
          <span className="count">
  {employees.length} {employees.length === 1 ? "employee" : "employees"}
</span>


<div className="search-box">
  <input
    type="text"
    placeholder="Search employees by name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-state">
                    {search
  ? "No employees match your search."
  : "No employees yet. Add your first employee above."}
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td className="employee-name">{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>
                      <span className="role-badge">{employee.role}</span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(employee)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer>Employee Directory · Built with React, Express & PostgreSQL</footer>
    </main>
  );
}

export default App;
