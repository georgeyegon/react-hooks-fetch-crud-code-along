// src/components/Item.js
import React from "react";

function Item({ item, onDelete, onToggleCartStatus }) {
  return (
    <li>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className="add" onClick={() => onToggleCartStatus(item.id)}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button className="remove" onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  );
}

export default Item;
