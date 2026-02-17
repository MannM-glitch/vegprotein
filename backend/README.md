# VegProtein Backend

FastAPI backend for VegProtein - a plant-based protein tracking application.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# Windows
.\venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

5. Run the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get access token
- `GET /api/auth/me` - Get current user info

### Users
- `GET /api/users/me` - Get user profile
- `PATCH /api/users/me` - Update user profile
- `GET /api/users/me/stats` - Get user statistics

### Protein Logs
- `POST /api/protein-logs` - Log protein intake
- `GET /api/protein-logs` - Get all protein logs
- `GET /api/protein-logs/today` - Get today's summary
- `GET /api/protein-logs/weekly` - Get weekly summary
- `DELETE /api/protein-logs/{id}` - Delete a log

### Foods
- `GET /api/foods` - List foods (with search/filter)
- `GET /api/foods/categories` - Get food categories
- `GET /api/foods/top-protein` - Get top protein foods
- `GET /api/foods/{id}` - Get specific food
- `POST /api/foods/seed` - Seed sample foods (dev)

### Stores
- `GET /api/stores` - List stores
- `GET /api/stores/nearby` - Find nearby stores
- `GET /api/stores/{id}` - Get specific store
- `POST /api/stores/seed` - Seed sample stores (dev)

## Database

By default, the app uses SQLite for development. For production, configure PostgreSQL in the `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost:5432/vegprotein
```

## Quick Start (Dev)

After starting the server, seed the database with sample data:
```bash
curl -X POST http://localhost:8000/api/foods/seed
curl -X POST http://localhost:8000/api/stores/seed
```
