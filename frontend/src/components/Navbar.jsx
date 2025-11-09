import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const logout = ()=>{ localStorage.removeItem("token"); navigate("/login"); }
  return (
    <nav className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold text-lg">MyStore</Link>
          <Link to="/products" className="text-sm">Products</Link>
        </div>
        <div className="flex items-center space-x-4">
          {!token ? (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </>
          ) : (
            <>
              <Link to="/cart" className="text-sm">Cart</Link>
              <Link to="/orders" className="text-sm">Orders</Link>
              <button onClick={logout} className="text-sm">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
