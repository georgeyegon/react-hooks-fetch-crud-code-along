// src/components/ShoppingList.js
import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchedItems = [
      { id: 1, name: "Yogurt", category: "Dairy", isInCart: false },
      { id: 2, name: "Pomegranate", category: "Produce", isInCart: false },
      { id: 3, name: "Ice Cream", category: "Dessert", isInCart: false },
    ];
    setItems(fetchedItems);
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function addItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function deleteItem(id) {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  }

  function toggleCartStatus(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isInCart: !item.isInCart } : item
      )
    );
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={addItem} />
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onDelete={deleteItem} onToggleCartStatus={toggleCartStatus} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
