import React from "react";
import { Link } from "react-router-dom";
export default function Home(){
  return (
    <div className="text-center mt-8">
      <h1 className="text-3xl font-bold">Welcome to MyStore</h1>
      <p className="mt-4">A demo e-commerce frontend connected to your FastAPI backend.</p>
      <div className="mt-6">
        <Link to="/products" className="bg-blue-600 text-white px-4 py-2 rounded">Browse Products</Link>
      </div>
    </div>
  );
}
