"use client";
import local from "next/font/local";
import React from "react";
import { useEffect, useState } from "react";

function FoodItemList() {
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getFoodItems = async () => {
    console.log('get food item api called');
    try {
      setLoading(true);
      const { _id } = JSON.parse(localStorage.getItem("restraunt"));
      const data = await fetch(`http://localhost:3000/api/food/${_id}`);
      const res = await data.json();
      console.log("data from the api", res);

      if (res.success) {
        setFoodItems(res?.result);
        setLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
      console.log("inside use effect");
      getFoodItems();
  }, []);

  const handleDeleteFoodItem = async (item) => {
    const itemId = item._id;
    console.log("id is ----", itemId);

    try {
      const data = await fetch(`http://localhost:3000/api/food/${itemId}`, {
        method: "DELETE",
      });
      const res = await data.json();
      if (res.success) {
        alert(res.message);
        getFoodItems();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log("error occured", error.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <div>Loading items....</div>
      ) : (
        <>
          <div>Here are your Food Items</div>
          <div>
            <table>
              <thead>
                <tr>
                  <td>S.No</td>
                  <td>Item Name</td>
                  <td>Price</td>
                  <td>Image</td>
                  <td>Description</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {foodItems && foodItems?.length
                  ? foodItems?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.name}</td>
                        <td>{item?.price}</td>
                        <td>image</td>
                        <td>{item?.description}</td>
                        <td>
                          <button onClick={() => handleDeleteFoodItem(item)}>
                            Delete
                          </button>
                          <button>Edit</button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default FoodItemList;
