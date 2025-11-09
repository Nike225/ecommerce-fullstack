import React, {useEffect, useState} from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

export default function Products(){
  const [products,setProducts]=useState([]);
  useEffect(()=>{ fetchProducts() }, []);

  const fetchProducts = async ()=>{
    const res = await API.get("/products/");
    setProducts(res.data);
  };

  const addToCart = async (p)=>{
    // add as immediate order (demo). For persistent cart implement separate cart endpoint.
    try{
      await API.post("/orders/", { items: [{ product_id: p.id, quantity: 1 }] });
      alert("Added to cart (order created). Visit Orders page.");
    }catch(err){
      alert(err.response?.data?.detail || "Add failed. Login first?");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
      </div>
    </div>
  );
}
