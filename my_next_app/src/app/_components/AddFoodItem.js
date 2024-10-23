"use client";
import local from "next/font/local";
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
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleAddFoodItem = async () => {
    const { foodName, path, price, description } = foodData;

    try {
      // here we will get the restraunt detail from the local storage ,
      // bcz we want restro id so that we can get to know which particular restro is adding food item
      // and with the help of that same id we can display food items of different different restraunts.

      let restro_id;
      const restrauntData = JSON.parse(localStorage.getItem("restraunt"));
      if (restrauntData) {
        console.log('got the data', restrauntData);
        restro_id = restrauntData._id;
      }

      let data = await fetch("http://localhost:3000/api/food", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          foodName: foodName,
          foodPrice: price,
          foodImgPath: path,
          foodDescription: description,
          restro_id: restro_id,
        }),
      });
      let response = await data.json();
      if (response.success) {
        alert("food item saved ");
      }
    } catch (error) {
        console.log('error while saving', error.message)
    }
  };
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
          name="description"
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
