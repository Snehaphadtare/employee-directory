
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Testing the Node & Postgres connection 
app.get("/", (req, res) => {
    res.send("Employee Directory API is running");
});

// GET: Fetch all employees
app.get("/employees", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM employees ORDER BY id"
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to fetch employees" });
    }
});

// POST req to add an employee
app.post("/employees", async (req, res) => {
    try {
        const { name, email, role } = req.body;

        if (!name?.trim() || !email?.trim() || !role?.trim()) {
            return res.status(400).json({
                error: "Name, email and role are required"
            });
        }

        const result = await pool.query(
            "INSERT INTO employees (name, email, role) VALUES ($1, $2, $3) RETURNING *",
            [name.trim(), email.trim(), role.trim()]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to add employee" });
    }
});

// PUT req to update an employee
app.put("/employees/:id", async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const { id } = req.params;

        if (!name?.trim() || !email?.trim() || !role?.trim()) {
            return res.status(400).json({
                error: "Name, email and role are required"
            });
        }

        const result = await pool.query(
            "UPDATE employees SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *",
            [name.trim(), email.trim(), role.trim(), id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to update employee" });
    }
});

// DELETE to remove an employee
app.delete("/employees/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM employees WHERE id = $1 RETURNING *",
            [req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to delete employee" });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
