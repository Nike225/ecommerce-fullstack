import React, {useEffect, useState} from "react";
import API from "../api";
export default function Orders(){
  const [orders, setOrders] = useState([]);
  useEffect(()=>{ fetchOrders() }, []);
  const fetchOrders = async ()=>{
    try{
      const res = await API.get("/orders/");
      setOrders(res.data);
    }catch(err){
      console.error(err);
      alert("Please login to view orders.");
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      <div className="mt-4 space-y-3">
        {orders.length===0 ? <p>No orders found.</p> : orders.map(o=>(
          <div key={o.id} className="bg-white p-3 rounded shadow">
            <div>Order #{o.id} - ${o.total_amount} - {o.status}</div>
            <ul className="mt-2">
              {o.items.map((it, idx)=> <li key={idx}>Product {it.product_id} × {it.quantity} @ ${it.price}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
