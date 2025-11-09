import React from "react";

export default function ProductCard({product, onAdd}){
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm">{product.description}</p>
      <div className="flex items-center justify-between mt-2">
        <div>
          <div className="text-lg font-bold">${product.price}</div>
          <div className="text-xs text-gray-500">Stock: {product.stock}</div>
        </div>
        <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={()=>onAdd(product)}>Add</button>
      </div>
    </div>
  );
}
