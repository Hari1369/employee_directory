# Employee Directory

A CRUD employee directory with a Django REST Framework API and a React, TypeScript, and Vite frontend.

## Project layout

- `backend/`: Django project (`config`) and the `employees` API app.
- `frontend/`: React and TypeScript app served by Vite.
- `db.sqlite3`: leftover database file from the removed starter project. The API currently uses PostgreSQL, configured in `backend/config/settings.py`.

## Requirements

- Python 3.12 or newer
- Node.js and npm
- PostgreSQL running locally

The backend database settings expect a PostgreSQL database named `emp_directory` on `127.0.0.1:5432`. Make sure the database and credentials in `backend/config/settings.py` match your local PostgreSQL setup before migrating.

## Set up the backend

Run these commands from the repository root in WSL/Linux:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Keep this terminal open. The API will be available at `http://localhost:8000`.

On Windows PowerShell, create and activate the virtual environment with:

```powershell
cd backend
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

If PowerShell blocks virtual environment activation, use the WSL/Linux commands above or follow your organization's PowerShell execution policy.

## Set up the frontend

Open a second terminal at the repository root:

```bash
cd frontend
npm ci
npm run dev
```

Open the Vite URL printed in the terminal, normally `http://localhost:5173`. Django CORS is configured to allow that origin. Keep both the Django and Vite terminals running while using the app.

## API endpoints

The API uses no trailing slash on these routes:

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/employees` | List employees |
| `POST` | `/employees` | Create an employee |
| `PUT` | `/employees/{id}` | Replace an employee's fields |
| `DELETE` | `/employees/{id}` | Delete an employee |

Create and update requests use JSON in this shape:

```json
{
	"name": "Avery Morgan",
	"email": "avery@example.com",
	"role": "Engineer"
}
```

You can verify the API is running by opening `http://localhost:8000/employees`; it should return JSON. If the page shows a Django 404, start the server with `backend/manage.py`, not a different Django project.
