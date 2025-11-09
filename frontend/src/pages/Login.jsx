import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const form = new URLSearchParams();
      form.append("username", email);
      form.append("password", password);
      const res = await API.post("/users/login", form);
      localStorage.setItem("token", res.data.access_token);
      navigate("/products");
    }catch(err){
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded" required />
        {error && <div className="text-red-600">{error}</div>}
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
