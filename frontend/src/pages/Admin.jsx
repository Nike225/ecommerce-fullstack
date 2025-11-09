import React, {useState} from "react";
import API from "../api";
export default function Admin(){
  const [form,setForm] = useState({name:'', description:'', price:0, stock:0, category:''});
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await API.post("/products/", form);
      alert("Created product: "+res.data.id);
    }catch(err){
      alert(err.response?.data?.detail || "Failed (need admin)");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admin - Create Product</h2>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 border rounded" required />
        <input placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="w-full p-2 border rounded" />
        <input type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:parseFloat(e.target.value)})} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form, stock:parseInt(e.target.value)})} className="w-full p-2 border rounded" required />
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="w-full p-2 border rounded" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Create Product</button>
      </form>
    </div>
  );
}
