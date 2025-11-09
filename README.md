# E-Commerce Web Application

### Overview  
This project is a **full-stack e-commerce web application** built with **FastAPI**, **React**, and **SQLite**.  
It demonstrates secure authentication, RESTful API design, database management, and frontend integration —  
providing a complete example of a modern web system architecture.

---

## Features

- **Authentication and Authorization**
  - User registration and login with JWT tokens  
  - Role-based access control (Admin / Customer)  
  - Secure password hashing using bcrypt  

- **E-Commerce Core**
  - Product management (create, update, delete, list) for Admins  
  - Shopping cart and order placement for Customers  
  - Order history and payment simulation  

- **Technical Highlights**
  - FastAPI backend with SQLAlchemy ORM  
  - React frontend (Vite + TailwindCSS)  
  - SQLite database  
  - CORS configuration for API communication  
  - Dockerized backend and frontend for containerized deployment  

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React, Vite, TailwindCSS, Axios |
| **Backend** | FastAPI, SQLAlchemy, Pydantic |
| **Database** | SQLite |
| **Authentication** | JWT + bcrypt |
| **DevOps** | Docker, Uvicorn |

---

## Project Structure

```
ecommerce-fullstack/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── routes/
│   │   │   ├── users.py
│   │   │   ├── products.py
│   │   │   └── orders.py
│   │   ├── utils/
│   │   │   ├── hashing.py
│   │   │   └── jwt_handler.py
│   │   ├── ecommerce.db
│   ├── requirements.txt
│   └── seed_products.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Orders.jsx
│   │   ├── api.js
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Backend Setup

1. **Create and Activate Virtual Environment**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate    # (Windows)
   # or
   source venv/bin/activate  # (macOS/Linux)
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Backend Server**
   ```bash
   uvicorn app.main:app --reload
   ```
   API available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)  
   Swagger docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Frontend available at: [http://localhost:3000](http://localhost:3000)

---

## Admin Configuration

1. **Register a User**  
   Use `/users/register` in Swagger or frontend registration form.  

2. **Promote to Admin**
   ```python
   import sqlite3
   conn = sqlite3.connect("backend/app/ecommerce.db")
   cur = conn.cursor()
   cur.execute("UPDATE users SET role='admin' WHERE email='test@example.com';")
   conn.commit()
   conn.close()
   ```

3. **Login to Get Token**  
   Use `/users/login` and copy the `access_token`.

4. **Seed Product Data**
   ```bash
   python backend/seed_products.py
   ```

---

## Validation Checklist

- [x] User registration and login verified  
- [x] JWT authentication functioning correctly  
- [x] Admin product management functional  
- [x] Customer cart and order flows validated  
- [x] Frontend–backend communication successful  
- [x] CORS and role-based access controls tested  

---

## Future Enhancements

- Payment gateway integration (Stripe/Razorpay sandbox)  
- Product image uploads (S3/Cloudinary)  
- Admin dashboard with analytics  
- Migrate SQLite to PostgreSQL for production  
- CI/CD setup with GitHub Actions  

