"use client";
import React from "react";
import { useState } from "react";

function AddFoodItem() {
  const [foodData, setFoodData] = useState({
    foodName: "",
    price: "",
    path: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFoodData({
        ...foodData,
        [name]: value
    })
  }

  const handleAddFoodItem = () => {

  }
  return (
    <div className="container">
        <h1>Add Food Item</h1>
      <div className="input-wrapper">
        <input
          type="text"
          name="foodName"
          value={foodData.foodName}
          className="input-field"
          placeholder="enter food name"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="price"
          value={foodData.price}
          className="input-field"
          placeholder="enter price"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="path"
          value={foodData.path}
          className="input-field"
          placeholder="enter image path"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="descritpion"
          value={foodData.description}
          className="input-field"
          placeholder="enter description"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-wrapper">
        <button onClick={handleAddFoodItem}>Add Food</button>
      </div>
    </div>
  );
}

export default AddFoodItem;
